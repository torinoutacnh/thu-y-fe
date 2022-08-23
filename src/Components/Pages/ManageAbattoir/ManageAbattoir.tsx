import { useState, useEffect, useRef } from "react";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Table,
  Button,
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
import { abattoirEndpoints, manageabattoirEndpoints } from "Components/router/routes";
import { AbattoirModel } from "Components/Shared/Models/Abattoir";
import CreateAbattoir from "./CreateAbattoir";

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
          "Xóa lò mổ",
          `Xóa ${name} thành công`
        );

        setPage({ ...page, pageSize: page.pageSize - 1 });
      })
      .catch((error) => {
        openNotificationWithIcon("error", "Xóa lò mổ", "Xóa lò mổ thất bại");
      });
  };
  const AbattoirColumns: ColumnsType<AbattoirModel> = [
    { title: "Tên lò mổ", dataIndex: "name", key: 1 },
    { title: "Địa chỉ", dataIndex: "address", key: 2 },
    { title: "Tên người quản lý", dataIndex: "managerName", key: 3 },
    { title: "Email", dataIndex: "email", key: 4 },
    { title: "Số điện thoại", dataIndex: "phone", key: 5 },

    {
      title: "Xử lý",
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
              Cập nhật
            </Button>
          </Link>
          <Button
            type="link"
            danger
            icon={<DeleteOutlined />}
            onClick={() => deleteAbattoirHandler(record.id, record.name)}
          >
            Xóa
          </Button>
        </>
      ),
    },
  ];

  const resColumns: ColumnsType<AbattoirModel> = [
    {
      title: "Danh sách động vật",
      key: getKey(),
      render: (record, key, index) => {
        return (
          <>
            <tr>
              <th>Tên lò mổ :</th>
              <td>{record.name}</td>
            </tr>
            <tr>
              <th>Địa chỉ :</th>
              <td>{record.address}</td>
            </tr>
            <tr>
              <th>Tên người quản lý :</th>
              <td>{record.managerName}</td>
            </tr>
            <tr>
              <th>Email :</th>
              <td>{record.email}</td>
            </tr>
            <tr>
              <th>Số điện thoại :</th>
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
                    Cập nhật
                  </Button>
                </Link>
                <Button
                  type="link"
                  danger
                  onClick={() => deleteAbattoirHandler(record.id, record.name)}
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
        <Descriptions.Item label={"Tên lò mổ"}>{data.name}</Descriptions.Item>
        <Descriptions.Item label={"Địa chỉ"}>{data.address}</Descriptions.Item>
        <Descriptions.Item label={"Tên người quản lý"}>
          {data.managerName}
        </Descriptions.Item>
        <Descriptions.Item label={"Email"}>{data.email}</Descriptions.Item>
        <Descriptions.Item label={"Số điện thoại"}>
          {data.phone}
        </Descriptions.Item>

        <Descriptions.Item label={"Xử lý"}>
          <>
            <Link
              to={manageabattoirEndpoints.updateabattoir.replace(
                ":id",
                data.id
              )}
            >
              <Button type="link" color="blue">
                Cập nhật
              </Button>
            </Link>
            <Button type="link" danger>
              Xóa
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
        title="Quản lý lò mổ"
        extra={[
          <Button type="primary" icon={<PlusOutlined />} onClick={() => { navigate(abattoirEndpoints.createAbattoi) }} key={1}>
            Thêm mới
          </Button>
        ]}
      />

      <Table
        scroll={{ y: "100%" }}
        locale={{ emptyText: "Không có lò mổ!" }}
        columns={windowSize.width > 768 ? AbattoirColumns : resColumns}
        rowKey={"id"}
        dataSource={listAbattoir}
      />
    </>
  );
};

export default ManageAbattoir;
