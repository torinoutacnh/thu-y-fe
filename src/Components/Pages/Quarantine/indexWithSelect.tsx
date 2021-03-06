import { ReportApiRoute } from "Api";
import { useAuth } from "Modules/hooks/useAuth";
import React, { useState, useEffect, useRef } from "react";

import { getKeyThenIncreaseKey } from "antd/lib/message";
import {
  Button,
  Layout,
  notification,
  PageHeader,
  Select,
  Space,
  Table,
} from "antd";
import { FileAddOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useLoading } from "Modules/hooks/useLoading";
import { abattoirEndpoints } from "Components/router/AbattoirRoutes";
import { ColumnsType } from "antd/lib/table";
import moment from "moment";
import { quarantineEndpoints } from "Components/router/QuarantineRoutes";
import useWindowSize from "Modules/hooks/useWindowSize";
import { IconType } from "antd/lib/notification";
import { ReportModel } from "Components/Shared/Models/Form";
import {
  QuarantineReportType,
  ReportType,
} from "Components/Shared/Form/Define/FormInterface";

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

const ReportPage = () => {
  const [reports, setReports] = useState<QuarantineReportModel[]>();
  const [columns, setColumns] = useState({ columns: [], resColumns: [] });
  const [reportType, setReportType] = useState(1);
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
      fetch(
        process.env.REACT_APP_API.concat(
          ReportApiRoute.listRegisterQuarantineAnimal,
          "?"
        ) + new URLSearchParams({ userId: user.userId }),
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
            openNotification("X??a th??nh c??ng", "success");
          }
          console.log(data);
        })
        .catch((error) => console.log(error))
        .finally(() => setLoading(false));
    }
  };

  const columns1: ColumnsType<QuarantineReportModel> = [
    {
      title: "STT",
      dataIndex: "stt",
      key: getKey(),
      sorter: (a, b) => a.stt - b.stt,
    },
    {
      title: "Ch??? l?? m???",
      dataIndex: "ownerName",
      key: getKey(),
    },
    {
      title: "?????a ch???",
      dataIndex: "address",
      key: getKey(),
    },
    {
      title: "N??i xu???t ph??t",
      dataIndex: "startPlace",
      key: getKey(),
    },
    {
      title: "N??i ?????n",
      dataIndex: "endPlace",
      key: getKey(),
    },
    {
      title: "Ng?????i ki???m d???ch",
      dataIndex: "quarantiner",
      key: getKey(),
    },
    {
      title: "S??? l?????ng",
      dataIndex: "time",
      key: getKey(),
      sorter: (a, b) => a.amount - b.amount,
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
                    quarantineEndpoints.updatereport.replace(
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
          </>
        );
      },
    },
  ];

  const resColumns1: ColumnsType<QuarantineReportModel> = [
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
              <td>{record.ownerName}</td>
            </tr>
            <tr>
              <th>?????a ch??? :</th>
              <td>{record.address}</td>
            </tr>
            <tr>
              <th>N??i xu???t ph??t :</th>
              <td>{record.startPlace}</td>
            </tr>
            <tr>
              <th>N??i ?????n :</th>
              <td>{record.endPlace}</td>
            </tr>
            <tr>
              <th>Ng?????i ki???m d???ch :</th>
              <td>{record.quarantiner}</td>
            </tr>
            <tr>
              <th>S??? l?????ng :</th>
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

  const GetColumns = (reportType: ReportType) => {
    switch (reportType) {
      case ReportType["CN-KD??V-UQ"]:
        return { columns: columns1, resColumns: resColumns1 };
      default:
        return { columns: [], resColumns: [] };
    }
  };

  useEffect(() => {
    setColumns(GetColumns(reportType));
    getReports();
  }, [reportType]);

  return (
    <>
      <PageHeader
        title="B??o c??o ki???m d???ch"
        extra={[
          <Button
            key={getKeyThenIncreaseKey()}
            icon={<FileAddOutlined />}
            type="primary"
            onClick={() => {
              navigate(
                quarantineEndpoints.createreport.concat("?") +
                  new URLSearchParams({ reporttype: reportType } as any)
              );
            }}
          >
            T???o b??o c??o
          </Button>,
        ]}
      />
      <Layout>
        <label style={{ padding: "10px" }}>Lo???i b??o c??o</label>
        <Select onChange={(val) => setReportType(val)} value={reportType}>
          {Object.values(QuarantineReportType).map((key, idx) => {
            const val = QuarantineReportType[key as any];
            if (!isNaN(Number(val)))
              return (
                <Select.Option key={idx} value={val}>
                  {QuarantineReportType[val as any]}
                </Select.Option>
              );
          })}
        </Select>
      </Layout>
      <Table
        columns={windowSize.width > 768 ? columns.columns : columns.resColumns}
        rowKey={"reportId"}
        dataSource={reports}
      />
    </>
  );
};

export { ReportPage };
