import { ApiRoute, FormApiRoute, ReportApiRoute } from "Api";
import { useAuth } from "Modules/hooks/useAuth";
import React, { useState, useEffect, useRef } from "react";

import { getKeyThenIncreaseKey } from "antd/lib/message";
import { RenderReportTable } from "Components/Shared/Form/Implement/FormRender";
import { Button, Input, InputRef, PageHeader, Space, Table } from "antd";
import { FileAddOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { RouteEndpoints } from "Components/router/MainRouter";
import {
  ReportModel,
  FormModel,
  ReportQueryModel,
} from "Components/Shared/Models/Form";
import { useLoading } from "Modules/hooks/useLoading";
import { ConvertDate } from "Utils/DateTimeUtils";
import { quarantineEndpoints } from "Components/router/QuarantineRoutes";
import { abattoirEndpoints } from "Components/router/AbattoirRoutes";
import { ColumnsType, ColumnType } from "antd/lib/table";
import { FilterConfirmProps } from "antd/lib/table/interface";
import { SearchOutlined } from "@ant-design/icons";
import moment from "moment";
import Highlighter from "react-highlight-words";

const Abattoir = () => {
  const [reports, setReports] = useState<ReportModel[]>([]);
  const [form, setForm] = useState<FormModel>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { setLoading } = useLoading();
  const [query, setQuery] = useState<ReportQueryModel>({
    pageNumber: 0,
    pageSize: 500,
    userId: user.userId,
  });
  const [formQuery, setFormQuery] = useState({
    code: process.env.REACT_APP_CODE_GIET_MO,
  });
  useEffect(() => {
    if (user) {
      setLoading(true);
      fetch(
        process.env.REACT_APP_API.concat(FormApiRoute.getform, "?") +
          new URLSearchParams(formQuery),
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
          setForm(data.data);
          setQuery((pre) => {
            pre.formId = data.data.id;
            return pre;
          });
        })
        .catch((error) => console.log(error))
        .finally(() => setLoading(false));
    }
  }, [formQuery.code]);

  useEffect(() => {
    if (form && user?.token && query) {
      setLoading(true);
      fetch(process.env.REACT_APP_API.concat(ReportApiRoute.getreport), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer ".concat(user.token),
        },
        body: JSON.stringify(query),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setReports(data.data);
        })
        .catch((error) => console.log(error))
        .finally(() => setLoading(false));
    }
  }, [
    query.id,
    query.dateEnd,
    query.dateStart,
    query.formId,
    query.pageNumber,
    query.pageSize,
    query.userId,
    form?.attributes,
    form?.id,
  ]);

  return (
    <>
      <PageHeader
        title="Báo cáo giết mổ"
        extra={[
          <Button
            key={getKeyThenIncreaseKey()}
            icon={<FileAddOutlined />}
            type="primary"
            onClick={() => {
              navigate(abattoirEndpoints.createreport);
            }}
          >
            Tạo báo cáo
          </Button>,
        ]}
      />
      {form && reports && (
        <RenderReportTable
          form={form}
          reports={reports.sort((x, y) => {
            const d1 = ConvertDate(x.dateCreated);
            const d2 = ConvertDate(y.dateCreated);
            return d1 > d2 ? d1 : d2;
          })}
        />
      )}
    </>
  );
};

interface AbattoirReportModel {
  reportId?: string;
  reportName?: string;
  stt?: number;
  abattoirOwner?: null;
  medicalStaff?: null;
  time?: string;
  total?: number;
  dead?: number;
  alive?: number;
}

type DataIndex = keyof AbattoirReportModel;

const AbattoirPage = () => {
  const [reports, setReport] = useState<AbattoirReportModel[]>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { setLoading } = useLoading();
  const keyRef = useRef(0);

  const getKey = () => {
    keyRef.current++;
    return keyRef.current;
  };

  const getReport = () => {
    if (user) {
      setLoading(true);
      fetch(
        process.env.REACT_APP_API.concat(ReportApiRoute.animalkilling, "?") +
          new URLSearchParams({ userId: user.userId }),
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
          setReport(data.data);
        })
        .catch((error) => console.log(error))
        .finally(() => setLoading(false));
    }
  };

  useEffect(() => {
    getReport();
  }, [user?.token]);

  const columns: ColumnsType<AbattoirReportModel> = [
    {
      title: "STT",
      dataIndex: "stt",
      key: getKey(),
      sorter: (a, b) => a.stt - b.stt,
    },
    {
      title: "Chủ lò mổ",
      dataIndex: "abattoirOwner",
      key: getKey(),
    },
    {
      title: "Nhân viên kiểm dịch",
      dataIndex: "medicalStaff",
      key: getKey(),
    },
    {
      title: "Tổng nhập",
      dataIndex: "total",
      key: getKey(),
      sorter: (a, b) => a.total - b.total,
    },
    {
      title: "Tổng đã xử lý",
      dataIndex: "dead",
      key: getKey(),
      sorter: (a, b) => a.dead - b.dead,
    },
    {
      title: "Tổng tồn",
      dataIndex: "alive",
      key: getKey(),
      sorter: (a, b) => a.alive - b.alive,
    },
    {
      title: "Ngày báo cáo",
      dataIndex: "time",
      key: getKey(),
      sorter: (a, b) => moment(a.time).diff(moment(b.time)),
      render: (record) => moment(record.time).format("DD/MM/YYYY"),
      // showSorterTooltip: { title: "sắp xếp" },
    },
    {
      title: "Xử lý",
      key: getKey(),
      render: (record) => {
        return (
          <>
            <Space>
              <Button
                onClick={() =>
                  navigate(
                    abattoirEndpoints.updatereport.replace(
                      ":id",
                      record.reportId
                    ),
                    { replace: true }
                  )
                }
                type="link"
              >
                Cập nhật
              </Button>
              <Button type="link" danger>
                Xóa
              </Button>
            </Space>
          </>
        );
      },
    },
  ];

  return (
    <>
      <PageHeader
        title="Báo cáo giết mổ"
        extra={[
          <Button
            key={getKeyThenIncreaseKey()}
            icon={<FileAddOutlined />}
            type="primary"
            onClick={() => {
              navigate(abattoirEndpoints.createreport);
            }}
          >
            Tạo báo cáo
          </Button>,
        ]}
      />
      <Table columns={columns} rowKey={"reportId"} dataSource={reports} />
    </>
  );
};

export { AbattoirPage };
export default Abattoir;
