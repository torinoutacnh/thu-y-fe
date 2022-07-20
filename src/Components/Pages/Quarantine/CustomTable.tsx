import { Table } from "antd";
import { ColumnsType } from "antd/lib/table";
import { FormApiRoute, ReportApiRoute } from "Api";
import { ReportType } from "Components/Shared/Form/Define/FormInterface";
import {
  AttrsToColumns,
  ReportsToSource,
  ReportToData,
} from "Components/Shared/Form/Define/FormMapping";
import { FormModel, ReportModel } from "Components/Shared/Models/Form";
import { RoleType } from "Components/Shared/Models/User";
import { useAuth } from "Modules/hooks/useAuth";
import { useLoading } from "Modules/hooks/useLoading";
import React, { useEffect, useState } from "react";

const MapTable = ({ reportType }: { reportType: ReportType }) => {
  const [form, setForm] = useState<FormModel>();
  const [columns, setColumns] = useState<ColumnsType<any>>([]);
  const [datasource, setDatasource] = useState<any[]>([]);

  const { user } = useAuth();
  const { setLoading } = useLoading();

  const getForm = () => {
    if (user) {
      setLoading(true);
      const api =
        process.env.REACT_APP_API.concat(FormApiRoute.getform, "?") +
        new URLSearchParams({ code: ReportType[reportType] });
      fetch(api, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer ".concat(user.token),
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (!data.data)
            throw new Error(
              `Không thấy biểu mẫu có mã là ${ReportType[reportType]}`
            );
          setForm(data.data);
        })
        .catch((error) => console.log(error))
        .finally(() => setLoading(false));
    }
  };

  const getReports = () => {
    if (user && form) {
      setLoading(true);
      const api = process.env.REACT_APP_API.concat(ReportApiRoute.getreport);
      fetch(api, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer ".concat(user.token),
        },
        body: JSON.stringify({
          pageNumber: 0,
          pageSize: 1000,
          userId: user.userId,
          formId: form.id,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          const src = ReportsToSource(data.data);
          setDatasource(src);
        })
        .catch((error) => console.log(error))
        .finally(() => setLoading(false));
    }
  };

  useEffect(() => {
    getForm();
  }, [reportType]);

  useEffect(() => {
    if (form) {
      const cols = AttrsToColumns(form?.attributes);
      setColumns(cols);
    }
    getReports();
  }, [form?.id]);

  return (
    <>
      <Table
        columns={columns.slice(0, 8)}
        rowKey={"key"}
        dataSource={datasource}
      />
    </>
  );
};

export { MapTable };
