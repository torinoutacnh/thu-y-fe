import { ApiRoute } from "Api/ApiRoute";
import { useAuth } from "Modules/hooks/useAuth";
import React, { useState, useEffect } from "react";

import { getKeyThenIncreaseKey } from "antd/lib/message";
import { RenderReportTable } from "Components/Shared/Form/Implement/FormRender";
import { Button, PageHeader } from "antd";
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

const Quarantine = () => {
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
    code: process.env.REACT_APP_CODE_KIEM_DICH,
  });
  useEffect(() => {
    if (user) {
      setLoading(true);
      fetch(
        process.env.REACT_APP_API.concat(ApiRoute.getform, "?") +
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
      fetch(process.env.REACT_APP_API.concat(ApiRoute.getreport), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer ".concat(user.token),
        },
        body: JSON.stringify(query),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(
            (data.data as Array<ReportModel>).filter(
              (report) => report.formId === form.id
            )
          );
          setReports(
            (data.data as Array<ReportModel>).filter(
              (report) => report.formId === form.id
            )
          );
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
        title="Báo cáo kiểm dịch"
        extra={[
          <Button
            key={getKeyThenIncreaseKey()}
            icon={<FileAddOutlined />}
            type="primary"
            onClick={() => {
              navigate(RouteEndpoints.quarantine.createreport);
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

export default Quarantine;
