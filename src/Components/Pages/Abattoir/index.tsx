import { ReportApiRoute } from "Api";
import { useAuth } from "Modules/hooks/useAuth";
import React, { useState, useEffect, useRef } from "react";

import { getKeyThenIncreaseKey } from "antd/lib/message";
import { Button, notification, PageHeader, Space, Table } from "antd";
import { FileAddOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useLoading } from "Modules/hooks/useLoading";
import { abattoirEndpoints } from "Components/router/AbattoirRoutes";
import { ColumnsType } from "antd/lib/table";
import moment from "moment";
import useWindowSize from "Modules/hooks/useWindowSize";
import { IconType } from "antd/lib/notification";
import { ReportModel } from "Components/Shared/Models/Form";

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
            openNotification("X??a th??nh c??ng", "success");
          }
          console.log(data);
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
      title: "Ch??? l?? m???",
      dataIndex: "abattoirOwner",
      key: getKey(),
    },
    {
      title: "Nh??n vi??n ki???m d???ch",
      dataIndex: "medicalStaff",
      key: getKey(),
    },
    {
      title: "T???ng nh???p",
      dataIndex: "total",
      key: getKey(),
      sorter: (a, b) => a.total - b.total,
    },
    {
      title: "T???ng ???? x??? l??",
      dataIndex: "dead",
      key: getKey(),
      sorter: (a, b) => a.dead - b.dead,
    },
    {
      title: "T???ng t???n",
      dataIndex: "alive",
      key: getKey(),
      sorter: (a, b) => a.alive - b.alive,
    },
    {
      title: "Ng??y b??o c??o",
      dataIndex: "time",
      key: getKey(),
      sorter: (a, b) => moment(a.time).diff(moment(b.time)),
      render: (record) => moment(record.time).format("DD/MM/YYYY"),
      // showSorterTooltip: { title: "s???p x???p" },
    },
    {
      title: "X??? l??",
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
                C???p nh???t
              </Button>
              <Button type="link" danger>
                X??a
              </Button>
            </Space>
          </>
        );
      },
    },
  ];

  const resColumns: ColumnsType<AbattoirReportModel> = [
    {
      title: "Danh s??ch b??o c??o",
      key: getKey(),
      render: (record, key, index) => {
        return (
          <>
            <tr>
              <th>STT :</th>
              <td>{record.stt}</td>
            </tr>
            <tr>
              <th>Ch??? l?? m??? :</th>
              <td>{record.abattoirOwner}</td>
            </tr>
            <tr>
              <th>Ng?????i ki???m d???ch :</th>
              <td>{record.medicalStaff}</td>
            </tr>
            <tr>
              <th>T???ng nh???p :</th>
              <td>{record.total}</td>
            </tr>
            <tr>
              <th>T???ng ???? x??? l?? :</th>
              <td>{record.dead}</td>
            </tr>
            <tr>
              <th>T???ng t???n :</th>
              <td>{record.alive}</td>
            </tr>
            <tr>
              <th>Ng??y b??o c??o :</th>
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
                  C???p nh???t
                </Button>
                <Button
                  onClick={() => deleteReport(record.reportId)}
                  type="link"
                  danger
                >
                  X??a
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
        title="B??o c??o gi???t m???"
        extra={[
          <Button
            key={getKeyThenIncreaseKey()}
            icon={<FileAddOutlined />}
            type="primary"
            onClick={() => {
              navigate(abattoirEndpoints.createreport);
            }}
          >
            T???o b??o c??o
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
