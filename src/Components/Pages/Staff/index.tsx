import { useState, useEffect, useRef } from "react";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { Table, Button, Space, notification, PageHeader } from "antd";
import { UserApiRoute } from "Api";
import { useAuth } from "Modules/hooks/useAuth";
import { ColumnsType } from "antd/lib/table";
import { UserModel, RoleType, SexType } from "Components/Shared/Models/User";
import { Link, useNavigate } from "react-router-dom";
import { useLoading } from "Modules/hooks/useLoading";
import useWindowSize from "Modules/hooks/useWindowSize";
import { getKeyThenIncreaseKey } from "antd/lib/message";
import CreateStaff from "./CreateStaff";
import { staffEndpoints } from "Components/router/routes";

const StaffHome = () => {
  const [liststaff, setListStaff] = useState<UserModel[]>([]);
  const [page, setPage] = useState({
    pageIndex: 0,
    pageNumber: 100,
  });
  const { user } = useAuth();
  const { setLoading } = useLoading();
  const navigate = useNavigate();
  const windowSize = useWindowSize();

  notification.config({
    placement: "topRight",
    bottom: 50,
    duration: 3,
    rtl: true,
  });

  type NotificationType = "success" | "info" | "warning" | "error";

  const openNotificationWithIcon = (type: NotificationType, title: string) => {
    notification[type]({
      message: title,
    });
  };

  const GetStaff = () => {
    if (user) {
      setLoading(true);
      fetch(
        process.env.REACT_APP_API.concat(UserApiRoute.getUser, "?") +
        new URLSearchParams(page as any),
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
          setListStaff(data.data);
        })
        .catch((error) => console.log(error))
        .finally(() => setLoading(false));
    }
  };

  const updateAfterCreate = () => {
    setPage({ ...page, pageNumber: page.pageNumber + 1 });
  };

  const deleteUserHandler = (id: string) => {
    setLoading(true);
    fetch(
      process.env.REACT_APP_API.concat(UserApiRoute.delete, "?") +
      new URLSearchParams({ id }),
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer ".concat(user.token),
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        openNotificationWithIcon("success", "Xóa nhân viên thành công");
      })
      .catch((error) => {
        console.log(error);
        openNotificationWithIcon("error", "Xóa nhân viên thất bại");
      })
      .finally(() => GetStaff());
  };

  const UserColumns: ColumnsType<UserModel> = [
    { title: "Họ tên", dataIndex: "name", key: 1 },
    { title: "Tài khoản", dataIndex: "account", key: 2 },
    { title: "Địa chỉ", dataIndex: "address", key: 3 },
    { title: "Email", dataIndex: "email", key: 4 },
    { title: "Số điện thoại", dataIndex: "phone", key: 5 },
    {
      title: "Chức vụ",
      dataIndex: "role",
      key: 6,
      render: (value: number) => {
        switch (value) {
          case RoleType["Nhân viên kiểm dịch"]: {
            return "Nhân viên kiểm dịch";
          }
          case RoleType["Nhân viên lò mổ"]: {
            return "Nhân viên lò mổ";
          }

          case RoleType["Quản lý"]: {
            return "Quản lý";
          }
        }
      },
    },

    {
      title: "Giới tính",
      dataIndex: "sex",
      key: 7,
      render: (value: number) => {
        switch (value) {
          case SexType["Nam"]: {
            return "Nam";
          }
          case SexType["Nữ"]: {
            return "Nữ";
          }
        }
      },
    },
    {
      title: "Xử lý",
      dataIndex: "",
      key: 8,
      render: (record) => (
        <>
          <Link to={staffEndpoints.updateStaff.replace(":id", record.id)}>
            <Button type="link" color="blue" icon={<EditOutlined />}>
              Cập nhật
            </Button>
          </Link>
          <Button
            type="link"
            danger
            onClick={() => deleteUserHandler(record.id)}
            icon={<DeleteOutlined />}
          >
            Xóa
          </Button>
        </>
      ),
    },
  ];

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////
  const keyRef = useRef(0);
  const getKey = () => {
    keyRef.current++;
    return keyRef.current;
  };
  const resColumns: ColumnsType<UserModel> = [
    {
      title: "Danh sách nhân viên",
      key: getKey(),
      render: (record, key, index) => {
        const RenderSexRole = (value: SexType) => {
          switch (value) {
            case SexType["Nam"]:
              return "Nam";
            case SexType["Nữ"]:
              return "Nữ";
          }
        };
        return (
          <>
            <tr style={{ width: "100%" }}>
              <th style={{ width: "30%" }}>Họ tên :</th>
              <td>{record.name}</td>
            </tr>
            <tr style={{ width: "100%" }}>
              <th style={{ width: "30%" }}>Tài khoản :</th>
              <td>{record.account}</td>
            </tr>
            <tr style={{ width: "100%" }}>
              <th style={{ width: "30%" }}>Địa chỉ :</th>
              <td>{record.address}</td>
            </tr>
            <tr style={{ width: "100%" }}>
              <th style={{ width: "30%" }}>Email :</th>
              <td>{record.email}</td>
            </tr>
            <tr style={{ width: "100%" }}>
              <th style={{ width: "30%" }}>Số điện thoại :</th>
              <td>{record.phone}</td>
            </tr>
            <tr style={{ width: "100%" }}>
              <th style={{ width: "30%" }}>Chức vụ:</th>
              <td>{record.role}</td>
            </tr>
            <tr style={{ width: "100%" }}>
              <th style={{ width: "30%" }}>Giới tính :</th>
              <td>{RenderSexRole(record.sex)}</td>
            </tr>
            <tr style={{ width: "100%" }}>
              <th>Xử lí</th>
              <th>
                <Space>
                  <Link to={staffEndpoints.updateStaff.replace(":id", record.id)}>
                    <Button type="link" color="blue" icon={<EditOutlined />}>
                      Cập nhật
                    </Button>
                  </Link>
                  <Button type="link" danger>
                    Xóa
                  </Button>
                </Space>
              </th>
            </tr>
          </>
        );
      },
    },
  ];
  ////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////
  useEffect(() => {
    GetStaff();
  }, [page.pageIndex, page.pageNumber, user.token]);

  return (
    <>
      <PageHeader
        title="Quản lý nhân viên"
        extra={[
          <Button type="primary" icon={<PlusOutlined />} onClick={() => { navigate(staffEndpoints.createStaff) }} key={1}>
            Thêm mới
          </Button>
        ]}
      />

      <Table
        scroll={{ y: "100%" }}
        columns={windowSize.width > 768 ? UserColumns : resColumns}
        rowKey={"id"}
        dataSource={liststaff}
      />
    </>
  );
};

export default StaffHome;
