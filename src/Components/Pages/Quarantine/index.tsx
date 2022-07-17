import { ReportApiRoute } from "Api";
import { useAuth } from "Modules/hooks/useAuth";
import React, { useState, useEffect, useRef } from "react";

import { getKeyThenIncreaseKey } from "antd/lib/message";
import { Button, PageHeader, Space, Table } from "antd";
import { FileAddOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useLoading } from "Modules/hooks/useLoading";
import { abattoirEndpoints } from "Components/router/AbattoirRoutes";
import { ColumnsType } from "antd/lib/table";
import moment from "moment";
import { quarantineEndpoints } from "Components/router/QuarantineRoutes";
import useWindowSize from "Modules/hooks/useWindowSize";

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

type DataIndex = keyof QuarantineReportModel;

const QuarantinePage = () => {
  const [reports, setReport] = useState<QuarantineReportModel[]>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { setLoading } = useLoading();
  const keyRef = useRef(0);
  const windowSize = useWindowSize();

  const getKey = () => {
    keyRef.current++;
    return keyRef.current;
  };

  const getReport = () => {
    if (user) {
      setLoading(true);
      fetch(
        process.env.REACT_APP_API.concat(ReportApiRoute.listQuarantine, "?") +
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
                onClick={() =>
                  navigate(
                    quarantineEndpoints.updatereport.replace(
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
                  onClick={() =>
                    navigate(
                      quarantineEndpoints.updatereport.replace(
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
            </tr>
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
      <Table
        columns={windowSize.width > 768 ? columns : resColumns}
        rowKey={"reportId"}
        dataSource={reports}
      />
    </>
  );
};

export { QuarantinePage };
