import { Button, notification, Space, Table } from "antd";
import { IconType } from "antd/lib/notification";
import { ColumnsType } from "antd/lib/table";
import { FormApiRoute, ReportApiRoute } from "Api";
import { quarantineEndpoints } from "Components/router/QuarantineRoutes";
import { ReportType } from "Components/Shared/Form/Define/FormInterface";
import {
  AttrsToColumns,
  ReportsToSource,
} from "Components/Shared/Form/Define/FormMapping";
import { FormModel } from "Components/Shared/Models/Form";
import { useAuth } from "Modules/hooks/useAuth";
import { useLoading } from "Modules/hooks/useLoading";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "../../../../Static/css/antd-override.css";

const MapTable = ({ reportType }: { reportType: ReportType }) => {
  const [form, setForm] = useState<FormModel>();
  const [columns, setColumns] = useState<ColumnsType<any>>([]);
  const [datasource, setDatasource] = useState<any[]>([]);
  const navigate = useNavigate();

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
          console.log(data.data);

          const src = ReportsToSource(data.data);
          setDatasource(src);
        })
        .catch((error) => console.log(error))
        .finally(() => setLoading(false));
    }
  };

  const editAction = (id: string) => {
    const params = { id: id };
    const path =
      quarantineEndpoints.updatereport.concat("?") +
      new URLSearchParams(params);
    navigate(path);
  };

  const mapFormAction = (id: string, code: ReportType) => {
    const params = { id: id, code: code };
    const path =
      quarantineEndpoints.createreport.concat("?") +
      new URLSearchParams(params as any);
    navigate(path);
  };

  const openNotification = (
    message: string,
    type: IconType,
    onClose?: any,
    body?: string
  ) => {
    notification.open({
      duration: 2.5,
      message: message,
      description: body,
      type: type,
      onClose: onClose,
    });
  };

  const deleteAction = (id: string) => {
    if (user) {
      setLoading(true);
      fetch(process.env.REACT_APP_API.concat(ReportApiRoute.delete), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer ".concat(user.token),
        },
        body: JSON.stringify({ id }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.data) {
            openNotification("Xóa thành công", "success");
            getReports();
          }
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
      cols.push({
        title: "Xử lý",
        key: "action",
        fixed: "right",
        align: "center",
        width: 100,
        render: (record) => (
          <>
            <Space className="space-media">
              {reportType === ReportType["ĐK-KDĐV-001"] && (
                <Button
                  onClick={() =>
                    mapFormAction(record.id, ReportType["CN-KDĐV-UQ"])
                  }
                  type="link"
                >
                  Tạo form 7
                </Button>
              )}
              <Button onClick={() => editAction(record.id)} type="link">
                Cập nhật
              </Button>
              <Button
                onClick={() => deleteAction(record.id)}
                type="link"
                danger
              >
                Xóa
              </Button>
            </Space>
          </>
        ),
      });
      setColumns(cols);
    }
    getReports();
  }, [form?.id]);

  return (
    <>
      <Table
        size="small"
        columns={columns}
        rowKey={"key"}
        dataSource={datasource}
        scroll={{ x: "100%" }}
      />
    </>
  );
};

export { MapTable };
