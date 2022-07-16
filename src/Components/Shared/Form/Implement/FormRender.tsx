import { Button, Card, Descriptions, Empty } from "antd";
import { getKeyThenIncreaseKey } from "antd/lib/message";
import Table, { ColumnType } from "antd/lib/table";
import { ReportApiRoute } from "Api";
import { quarantineEndpoints } from "Components/router/QuarantineRoutes";
import {
  FormModel,
  ReportModel,
  AttributeModel,
  ReportValueModel,
} from "Components/Shared/Models/Form";
import { useAuth } from "Modules/hooks/useAuth";
import { useLoading } from "Modules/hooks/useLoading";
import useWindowSize from "Modules/hooks/useWindowSize";
import React, { useRef } from "react";
import { Link } from "react-router-dom";

const RenderReportTable = (props: {
  form: FormModel;
  reports: ReportModel[];
}) => {
  const { form, reports } = props;
  function findAttr(id: string): AttributeModel {
    return form.attributes.find((x) => x.id === id);
  }
  const windowSize = useWindowSize();
  const { setLoading } = useLoading();

  const reportobjs = reports.map((x) => {
    const report: any = {
      id: x.id,
      formid: x.formId,
      userId: x.userId,
      name: x.name,
      key: getKeyThenIncreaseKey(),
    };
    x.values.map((attr) => {
      const formattr = findAttr(attr.attributeId);
      if (formattr?.id) {
        report[formattr.id] = attr.value;
      }
    });
    return report;
  });

  const RenderColumns = (form: FormModel) => {
    const { user } = useAuth();
    const cols = form.attributes
      .sort((x) => x.sortNo)
      .map((attr) => {
        const column: ColumnType<any> = {
          title: attr.name,
          dataIndex: attr.id,
          key: getKeyThenIncreaseKey(),
        };

        return column;
      });

    function deletereport(id: string) {
      if (user) {
        setLoading(true);
        fetch(process.env.REACT_APP_API.concat(ReportApiRoute.delete), {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer ".concat(user.token),
          },
          body: JSON.stringify({ id: id }),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
          })
          .catch((error) => console.log(error))
          .finally(() => setLoading(false));
      }
    }

    if (!cols.find((x) => x.title === "Xử lý")) {
      cols.push({
        title: "Xử lý",
        dataIndex: "",
        key: getKeyThenIncreaseKey(),
        render: (record) => {
          return (
            <>
              <Link
                to={quarantineEndpoints.updatereport.replace(":id", record.id)}
              >
                <Button type="link" color="blue">
                  Cập nhật
                </Button>
              </Link>
              <Button
                type="link"
                danger
                onClick={() => deletereport(record.id)}
              >
                Xóa
              </Button>
            </>
          );
        },
      });
    }
    return cols;
  };

  const RenderCards = (props: { form: FormModel; reportobjs: any[] }) => {
    const { form, reportobjs } = props;
    const key = useRef(0);

    const getKey = () => {
      key.current = key.current + 1;
      return key.current;
    };

    function RenderCard(props: { data: any; idx: number }) {
      const { data, idx } = props;
      const { user } = useAuth();
      function deletereport(id: string) {
        if (user) {
          setLoading(true);
          fetch(process.env.REACT_APP_API.concat(ReportApiRoute.delete), {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer ".concat(user.token),
            },
            body: JSON.stringify({ id: id }),
          })
            .then((res) => res.json())
            .then((data) => {
              console.log(data);
            })
            .catch((error) => console.log(error))
            .finally(() => setLoading(false));
        }
      }
      return (
        <Descriptions
          bordered
          column={{ lg: 2, md: 1, sm: 1, xs: 1 }}
          size={"small"}
          style={{ marginTop: idx === 0 ? 10 : 50 }}
        >
          {form.attributes.map((col) => {
            return (
              <Descriptions.Item
                labelStyle={{
                  color: "white",
                  backgroundColor: "#17202A",
                  width: "40%",
                }}
                contentStyle={{ color: "#17202A", backgroundColor: "#D5D8DC" }}
                key={getKey()}
                label={col.name}
              >
                {data[col.id]}
              </Descriptions.Item>
            );
          })}
          <Descriptions.Item
            labelStyle={{
              color: "white",
              backgroundColor: "#17202A",
              width: "40%",
            }}
            contentStyle={{ color: "#17202A", backgroundColor: "#D5D8DC" }}
            key={getKey()}
            label={"Xử lý"}
          >
            <>
              <Link
                to={quarantineEndpoints.updatereport.replace(":id", data.id)}
              >
                <Button type="link" color="blue">
                  Cập nhật
                </Button>
              </Link>
              <Button type="link" danger onClick={() => deletereport(data.id)}>
                Xóa
              </Button>
            </>
          </Descriptions.Item>
        </Descriptions>
      );
    }
    return (
      <>
        {reportobjs.length > 0 ? (
          reportobjs.map((data, index) => {
            return <RenderCard key={index} data={data} idx={index} />;
          })
        ) : (
          <Empty description={<span>Không có dữ liệu</span>} />
        )}
      </>
    );
  };

  return (
    <>
      {windowSize.width >= 1024 ? (
        <Table
          locale={{ emptyText: "Không có báo cáo!" }}
          dataSource={reportobjs}
          columns={RenderColumns(form)}
          size={"small"}
        />
      ) : (
        <RenderCards form={form} reportobjs={reportobjs} />
      )}
    </>
  );
};

export { RenderReportTable };
