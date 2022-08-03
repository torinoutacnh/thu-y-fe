import { ReportApiRoute } from "Api";
import { useAuth } from "Modules/hooks/useAuth";
import React, { useState, useEffect, useRef } from "react";

import { getKeyThenIncreaseKey } from "antd/lib/message";
import { Button, notification, PageHeader, Space, Table } from "antd";
import { FileAddOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useLoading } from "Modules/hooks/useLoading";
import { ColumnsType } from "antd/lib/table";
import moment from "moment";
import { quarantineEndpoints } from "Components/router/QuarantineRoutes";
import useWindowSize from "Modules/hooks/useWindowSize";
import { IconType } from "antd/lib/notification";
import { ReportModel } from "Components/Shared/Models/Form";
import { ReportType } from "Components/Shared/Form/Define/FormInterface";
import { RoleType } from "Components/Shared/Models/User";

interface QuarantineReportModel {
  reportId?: string;
  reportName?: string;
  stt?: number;
  ownerName?: string;
  address?: string;
  startPlace?: string;
  endPlace?: string;
  quarantiner?: string;
  amount?: number;
}

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

const QuarantinePage = () => {
  const [reports, setReports] = useState<QuarantineReportModel[]>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { setLoading } = useLoading();
  const keyRef = useRef(0);
  const windowSize = useWindowSize();

  const getKey = () => {
    keyRef.current++;
    return keyRef.current;
  };

  const getReports = () => {
    if (user) {
      setLoading(true);
      const api =
        user?.role === RoleType["Quản lý"]
          ? process.env.REACT_APP_API.concat(
              ReportApiRoute.listRegisterQuarantineAnimal
            )
          : process.env.REACT_APP_API.concat(
              ReportApiRoute.listRegisterQuarantineAnimal,
              "?"
            ) + new URLSearchParams({ userId: user.userId });
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
          (data.data as Array<ReportModel>).sort((a, b) => {
            console.log(a.dateCreated, b.dateCreated);

            return -moment(a.dateCreated).diff(moment(b.dateCreated));
          });
          setReports(data.data);
        })
        .catch((error) => console.log(error))
        .finally(() => setLoading(false));
    }
  };

  const deleteReport = (id: string) => {
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
          }
          console.log(data);
        })
        .catch((error) => console.log(error))
        .finally(() => setLoading(false));
    }
  };

  const columns: ColumnsType<QuarantineReportModel> = [
    {
      title: "STT",
      dataIndex: "stt",
      key: getKey(),
      sorter: (a, b) => a.stt - b.stt,
    },
    {
      title: "Chủ lò mổ",
      dataIndex: "ownerName",
      key: getKey(),
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: getKey(),
    },
    {
      title: "Nơi xuất phát",
      dataIndex: "startPlace",
      key: getKey(),
    },
    {
      title: "Nơi đến",
      dataIndex: "endPlace",
      key: getKey(),
    },
    {
      title: "Người kiểm dịch",
      dataIndex: "quarantiner",
      key: getKey(),
    },
    {
      title: "Số lượng",
      dataIndex: "time",
      key: getKey(),
      sorter: (a, b) => a.amount - b.amount,
    },
    {
      title: "Xử lý",
      key: getKey(),
      render: (record) => {
        return (
          <>
            <Space>
              <Button
                onClick={() => {
                  const params = { id: record.reportId };
                  const path =
                    quarantineEndpoints.updatereport.concat("?") +
                    new URLSearchParams(params);
                  navigate(path);
                }}
                type="link"
              >
                Cập nhật
              </Button>
              <Button
                onClick={() => deleteReport(record.reportId)}
                type="link"
                danger
              >
                Xóa
              </Button>
            </Space>
          </>
        );
      },
    },
  ];

  const resColumns: ColumnsType<QuarantineReportModel> = [
    {
      title: "Danh sách báo cáo",
      key: getKey(),
      render: (record, key, index) => {
        return (
          <>
            <tr>
              <th>STT :</th>
              <td>{record.stt}</td>
            </tr>
            <tr>
              <th>Chủ lò mổ :</th>
              <td>{record.ownerName}</td>
            </tr>
            <tr>
              <th>Địa chỉ :</th>
              <td>{record.address}</td>
            </tr>
            <tr>
              <th>Nơi xuất phát :</th>
              <td>{record.startPlace}</td>
            </tr>
            <tr>
              <th>Nơi đến :</th>
              <td>{record.endPlace}</td>
            </tr>
            <tr>
              <th>Người kiểm dịch :</th>
              <td>{record.quarantiner}</td>
            </tr>
            <tr>
              <th>Số lượng :</th>
              <td>{record.amount}</td>
            </tr>
            <tr>
              <Space>
                <Button
                  onClick={() => {
                    const params = { id: record.reportId };
                    const path =
                      quarantineEndpoints.updatereport.concat("?") +
                      new URLSearchParams(params);
                    navigate(path);
                  }}
                  type="link"
                >
                  Cập nhật
                </Button>
                <Button
                  onClick={() => deleteReport(record.reportId)}
                  type="link"
                  danger
                >
                  Xóa
                </Button>
              </Space>
            </tr>
          </>
        );
      },
    },
  ];

  useEffect(() => {
    getReports();
  }, [user.token]);

  return (
    <>
      <PageHeader
        title="Chứng nhận kiểm dịch"
        extra={[
          <Button
            key={getKeyThenIncreaseKey()}
            icon={<FileAddOutlined />}
            type="primary"
            onClick={() => {
              const params = { code: ReportType["CN-KDĐV-UQ"] };
              const path =
                quarantineEndpoints.createreport.concat("?") +
                new URLSearchParams(params as any);
              navigate(path);
            }}
          >
            Tạo báo cáo
          </Button>,
        ]}
      />
      <Table
        columns={windowSize.width > 768 ? columns : resColumns}
        rowKey={"reportId"}
        dataSource={reports}
      />
    </>
  );
};

export default QuarantinePage;
