import { Button, Card, Descriptions } from "antd";
import { getKeyThenIncreaseKey } from "antd/lib/message";
import Table, { ColumnType } from "antd/lib/table";
import { ApiRoute } from "Api/ApiRoute";
import { RouteEndpoints } from "Components/router/MainRouter";
import {
  FormModel,
  ReportModel,
  AttributeModel,
  ReportValueModel,
} from "Components/Shared/Models/Form";
import { useAuth } from "Modules/hooks/useAuth";
import useWindowSize from "Modules/hooks/useWindowSize";
import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

const CreateReportModel = (form: FormModel, report?: ReportModel) => {
  const { user } = useAuth();
  const model: ReportModel = {
    id: report?.id,
    name: form.formName,
    userId: user.userId,
    formId: form.id,
    type: 1,
    values: CreateReportValueModel(form.attributes, report?.values),
    listAnimals: [],
    sealTabs: [],
  };

  return model;
};

const CreateReportValueModel = (
  attrs: AttributeModel[],
  values?: ReportValueModel[]
) => {
  function findValue(id: string) {
    return values?.find((x) => x.attributeId === id);
  }

  const attrvalues: ReportValueModel[] = attrs.map((attr) => {
    const reportval: ReportValueModel = {
      attributeId: attr.id,
      value: findValue(attr.id)?.value,
      animalId: findValue(attr.id)?.animalId,
    };
    return reportval;
  });

  return attrvalues;
};

const RenderReportTable = (props: {
  form: FormModel;
  reports: ReportModel[];
}) => {
  const { form, reports } = props;
  function findAttr(id: string): AttributeModel {
    return form.attributes.find((x) => x.id === id);
  }
  const windowSize = useWindowSize();

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

  const columns = RenderColumns(form);

  return (
    <>
      {windowSize.width >= 1024 ? (
        <Table
          locale={{ emptyText: "Không có báo cáo!" }}
          dataSource={reportobjs}
          columns={columns}
          size={"small"}
        />
      ) : (
        <RenderCards form={form} reportobjs={reportobjs} />
      )}
    </>
  );
};

const RenderCards = (props: { form: FormModel; reportobjs: any[] }) => {
  const { form, reportobjs } = props;
  const key = useRef(0);

  const getKet = () => {
    key.current = key.current + 1;
    return key.current;
  };

  function RenderCard(props: { data: any; idx: number }) {
    const { data, idx } = props;

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
              key={getKet()}
              label={col.name}
            >
              {data[col.id]}
            </Descriptions.Item>
          );
        })}
      </Descriptions>
    );
  }
  return (
    <>
      {reportobjs &&
        reportobjs.map((data, index) => {
          return <RenderCard key={index} data={data} idx={index} />;
        })}
    </>
  );
};

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
    fetch(
      process.env.REACT_APP_API.concat(ApiRoute.deleteReport, "?") +
        new URLSearchParams({ id: id }),
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer ".concat(user.token),
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => console.log(error));
    return;
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
              to={RouteEndpoints.quarantine.updatereport.replace(
                ":id",
                record.id
              )}
            >
              <Button type="link" color="blue">
                Cập nhật
              </Button>
            </Link>
            <Button type="link" danger onClick={() => deletereport(record.id)}>
              Xóa
            </Button>
          </>
        );
      },
    });
  }
  return cols;
};

export { CreateReportModel, RenderReportTable, CreateReportValueModel };
