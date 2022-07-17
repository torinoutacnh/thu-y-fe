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
import useWindowSize from "Modules/hooks/useWindowSize";

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

  const windowSize = useWindowSize();

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
                    )
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

  const resColumns: ColumnsType<AbattoirReportModel> = [
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
              <td>{record.abattoirOwner}</td>
            </tr>
            <tr>
              <th>Người kiểm dịch :</th>
              <td>{record.medicalStaff}</td>
            </tr>
            <tr>
              <th>Tổng nhập :</th>
              <td>{record.total}</td>
            </tr>
            <tr>
              <th>Tổng đã xử lý :</th>
              <td>{record.dead}</td>
            </tr>
            <tr>
              <th>Tổng tồn :</th>
              <td>{record.alive}</td>
            </tr>
            <tr>
              <th>Ngày báo cáo :</th>
              <td>{moment(record.time).format("DD/MM/YYYY")}</td>
            </tr>
            <tr>
              <Space>
                <Button
                  onClick={() =>
                    navigate(
                      abattoirEndpoints.updatereport.replace(
                        ":id",
                        record.reportId
                      )
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

export { AbattoirPage };
