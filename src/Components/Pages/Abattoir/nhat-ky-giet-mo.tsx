import { ReportApiRoute } from "Api";
import { useAuth } from "Modules/hooks/useAuth";
import React, { useState, useEffect, useRef } from "react";

import { getKeyThenIncreaseKey } from "antd/lib/message";
import { Button, notification, PageHeader, Space, Table } from "antd";
import { FileAddOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useLoading } from "Modules/hooks/useLoading";
import { abattoirEndpoints } from "Components/router/routes";
import { ColumnsType } from "antd/lib/table";
import moment from "moment";
import useWindowSize from "Modules/hooks/useWindowSize";
import { IconType } from "antd/lib/notification";
import { ReportModel } from "Components/Shared/Models/Form";
import { ReportType } from "Components/Shared/reports";

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
  const [reports, setReports] = useState<AbattoirReportModel[]>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { setLoading } = useLoading();
  const keyRef = useRef(0);
  const [page, setPage] = useState({
    pageNumber: 0,
    pageSize: 1000,
  });

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
          (data.data as Array<ReportModel>).sort((a, b) => {
            return moment(a.dateCreated).diff(moment(b.dateCreated));
          });
          setReports(data.data);
        })
        .catch((error) => console.log(error))
        .finally(() => setLoading(false));
    }
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

  useEffect(() => {
    getReport();
  }, [page.pageNumber, page.pageSize]);

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
          setPage({ ...page, pageSize: page.pageSize - 1 });
        })
        .catch((error) => console.log(error))
        .finally(() => setLoading(false));
    }
  };

  useEffect(() => {
    getReport();
  }, [user?.token]);

  const columns: ColumnsType<AbattoirReportModel> = [
    // {
    //   title: "STT",
    //   dataIndex: "stt",
    //   key: getKey(),
    //   sorter: (a, b) => a.stt - b.stt,
    // },
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
      title: "Ngày nhập hàng",
      dataIndex: "time",
      key: getKey(),
      sorter: (a, b) => moment(a.time).diff(moment(b.time)),
      render: (record) => moment(record).format("DD/MM/YYYY"),
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
                onClick={() => {
                  const params = { id: record.reportId };
                  const path =
                    abattoirEndpoints.updatereport.concat("?") +
                    new URLSearchParams(params);
                  navigate(path);
                }}
                type="link"
                icon={<EditOutlined />}
              >
                Cập nhật
              </Button>
              <Button
                onClick={() => deleteReport(record.reportId)}
                type="link"
                danger
                icon={<DeleteOutlined />}
              >
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
            {/* <tr>
              <th>STT :</th>
              <td>{record.stt}</td>
            </tr> */}
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
              <th>Ngày nhập hàng :</th>
              <td>{moment(record.time).format("DD/MM/YYYY")}</td>
            </tr>
            <tr>
              <Space>
                <Button
                  onClick={() => {
                    const params = { id: record.reportId };
                    const path =
                      abattoirEndpoints.updatereport.concat("?") +
                      new URLSearchParams(params);
                    navigate(path);
                  }}
                  type="link"
                  icon={<EditOutlined />}
                >
                  Cập nhật
                </Button>
                <Button
                  onClick={() => deleteReport(record.reportId)}
                  type="link"
                  danger
                  icon={<DeleteOutlined />}
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
              const params = { code: ReportType["NK-001"] };
              const path =
                abattoirEndpoints.createreport.concat("?") +
                new URLSearchParams(params as any);
              navigate(path);
            }}
          >
            Tạo báo cáo
          </Button>,
        ]}
      />
      <Table
        scroll={{ y: "100%" }}
        columns={windowSize.width > 768 ? columns : resColumns}
        rowKey={"reportId"}
        dataSource={reports}
      />
    </>
  );
};

export { AbattoirPage };
