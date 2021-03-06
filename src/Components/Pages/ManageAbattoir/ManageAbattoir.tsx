import React, { useState, useEffect, useRef } from "react";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import {
  Table,
  Button,
  Input,
  Descriptions,
  PageHeader,
  notification,
  Space,
} from "antd";
import { ManageAbattoirRoute } from "Api";
import { useAuth } from "Modules/hooks/useAuth";
import { ColumnsType } from "antd/lib/table";
import { Link, useNavigate } from "react-router-dom";
import { useLoading } from "Modules/hooks/useLoading";
import useWindowSize from "Modules/hooks/useWindowSize";
import { getKeyThenIncreaseKey } from "antd/lib/message";
import Createabattoir from "./CreateAbattoir";
import { manageabattoirEndpoints } from "Components/router/ManageAbattoirRoutes";
import { AbattoirModel } from "Components/Shared/Models/Abattoir";
import CreateAbattoir from "./CreateAbattoir";
import UpdateAbattoir from "./UpdateAbattoir";

const ManageAbattoir = () => {
  const [listAbattoir, setListAbattoir] = useState<AbattoirModel[]>([]);
  const [page, setPage] = useState({
    pageNumber: 0,
    pageSize: 1000,
  });
  const keyRef = useRef(0);
  const getKey = () => {
    keyRef.current++;
    return keyRef.current;
  };

  notification.config({
    placement: "topRight",
    bottom: 50,
    duration: 3,
    rtl: true,
  });
  type NotificationType = "success" | "info" | "warning" | "error";
  const openNotificationWithIcon = (
    type: NotificationType,
    title: string,
    message: string
  ) => {
    notification[type]({
      message: title,
      description: message,
    });
  };
  const { user } = useAuth();
  const { setLoading } = useLoading();
  const navigate = useNavigate();
  const windowSize = useWindowSize();

  const GetAbattoir = () => {
    setLoading(true);
    if (user?.token) {
      fetch(process.env.REACT_APP_API.concat(ManageAbattoirRoute.getAbattoir), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer ".concat(user.token),
        },
        body: JSON.stringify(page),
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setListAbattoir(data.data);
        })
        .catch((error) => console.log(error))
        .finally(() => setLoading(false));
    }
  };
  const deleteAbattoirHandler = (idAbattoir: string, name: string) => {
    // setLoading(true);
    const abattoirDelete = {
      id: idAbattoir,
    };

    setLoading(true);
    fetch(process.env.REACT_APP_API.concat(ManageAbattoirRoute.delete), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer ".concat(user.token),
      },
      body: JSON.stringify(abattoirDelete),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        // setListAnimal(data.data)
        openNotificationWithIcon(
          "success",
          "X??a l?? m???",
          `X??a ${name} th??nh c??ng`
        );

        setPage({ ...page, pageSize: page.pageSize - 1 });
      })
      .catch((error) => {
        openNotificationWithIcon("error", "X??a l?? m???", "X??a l?? m??? th???t b???i");
      });
  };
  const AbattoirColumns: ColumnsType<AbattoirModel> = [
    { title: "T??n l?? m???", dataIndex: "name", key: 1 },
    { title: "?????a ch???", dataIndex: "address", key: 2 },
    { title: "T??n ng?????i qu???n l??", dataIndex: "managerName", key: 3 },
    { title: "Email", dataIndex: "email", key: 4 },
    { title: "S??? ??i???n tho???i", dataIndex: "phone", key: 5 },

    {
      title: "X??? l??",
      dataIndex: "",
      key: 8,
      render: (record) => (
        <>
          <Link
            to={manageabattoirEndpoints.updateabattoir.replace(
              ":id",
              record.id
            )}
          >
            <Button type="link" color="blue" icon={<EditOutlined />}>
              C???p nh???t
            </Button>
          </Link>
          <Button
            type="link"
            danger
            icon={<DeleteOutlined />}
            onClick={() => deleteAbattoirHandler(record.id, record.name)}
          >
            X??a
          </Button>
        </>
      ),
    },
  ];

  const resColumns: ColumnsType<AbattoirModel> = [
    {
      title: "Danh s??ch ?????ng v???t",
      key: getKey(),
      render: (record, key, index) => {
        return (
          <>
            <tr>
              <th>T??n l?? m??? :</th>
              <td>{record.name}</td>
            </tr>
            <tr>
              <th>?????a ch??? :</th>
              <td>{record.address}</td>
            </tr>
            <tr>
              <th>T??n ng?????i qu???n l?? :</th>
              <td>{record.managerName}</td>
            </tr>
            <tr>
              <th>Email :</th>
              <td>{record.email}</td>
            </tr>
            <tr>
              <th>S??? ??i???n tho???i :</th>
              <td>{record.phone}</td>
            </tr>

            <tr>
              <Space>
                <Link
                  to={manageabattoirEndpoints.updateabattoir.replace(
                    ":id",
                    record.id
                  )}
                >
                  <Button type="link" color="blue" icon={<EditOutlined />}>
                    C???p nh???t
                  </Button>
                </Link>
                <Button
                  type="link"
                  danger
                  onClick={() => deleteAbattoirHandler(record.id, record.name)}
                  icon={<DeleteOutlined />}
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
  const RenderCard = (props: { data: AbattoirModel; idx: number }) => {
    const { data, idx } = props;

    return (
      <Descriptions
        bordered
        column={{ lg: 2, md: 1, sm: 1, xs: 1 }}
        labelStyle={{
          color: "white",
          backgroundColor: "#17202A",
          width: "40%",
        }}
        contentStyle={{
          color: "#17202A",
          backgroundColor: "#D5D8DC",
        }}
        size={"small"}
        style={{ marginTop: idx === 0 ? 10 : 50 }}
      >
        <Descriptions.Item label={"T??n l?? m???"}>{data.name}</Descriptions.Item>
        <Descriptions.Item label={"?????a ch???"}>{data.address}</Descriptions.Item>
        <Descriptions.Item label={"T??n ng?????i qu???n l??"}>
          {data.managerName}
        </Descriptions.Item>
        <Descriptions.Item label={"Email"}>{data.email}</Descriptions.Item>
        <Descriptions.Item label={"S??? ??i???n tho???i"}>
          {data.phone}
        </Descriptions.Item>

        <Descriptions.Item label={"X??? l??"}>
          <>
            <Link
              to={manageabattoirEndpoints.updateabattoir.replace(
                ":id",
                data.id
              )}
            >
              <Button type="link" color="blue">
                C???p nh???t
              </Button>
            </Link>
            <Button type="link" danger>
              X??a
            </Button>
          </>
        </Descriptions.Item>
      </Descriptions>
    );
  };
  const UpdateAbattoirAfterCreate = () => {
    setPage({ ...page, pageSize: page.pageSize - 1 });
  };

  useEffect(() => {
    GetAbattoir();
  }, [page.pageNumber, page.pageSize, user.token]);

  return (
    <>
      <PageHeader
        title="Qu???n l?? l?? m???"
        extra={[
          <CreateAbattoir
            key={getKeyThenIncreaseKey()}
            UpdateAbattoirAfterCreate={UpdateAbattoirAfterCreate}
          />,
        ]}
      />

      <Table
        locale={{ emptyText: "Kh??ng c?? l?? m???!" }}
        columns={windowSize.width > 768 ? AbattoirColumns : resColumns}
        rowKey={"id"}
        dataSource={listAbattoir}
      />
    </>
  );
};

export default ManageAbattoir;
