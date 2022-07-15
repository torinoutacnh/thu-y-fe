import React, { useState, useEffect, useRef } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Table, Button, Input, Descriptions, PageHeader } from "antd";
import { ApiRoute, UserApiRoute } from "Api";
import { useAuth } from "Modules/hooks/useAuth";
import { ColumnsType } from "antd/lib/table";
import { RouteEndpoints } from "Components/router/MainRouter";
import { UserModel, RoleType, SexType } from "Components/Shared/Models/User";
import { Link, useNavigate } from "react-router-dom";
import { useLoading } from "Modules/hooks/useLoading";
import useWindowSize from "Modules/hooks/useWindowSize";
import { getKeyThenIncreaseKey } from "antd/lib/message";
import CreateStaff from "./CreateStaff";

const StaffHome = () => {
  const [liststaff, setListStaff] = useState<UserModel[]>([]);
  const [page, setPage] = useState({
    pageIndex: 1,
    pageNumber: 100,
  });
  const { user } = useAuth();
  const { setLoading } = useLoading();
  const navigate = useNavigate();
  const windowSize = useWindowSize();

  useEffect(() => GetStaff, [page.pageIndex, page.pageNumber]);

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
        .then((data) => setListStaff(data.data))
        .catch((error) => console.log(error))
        .finally(() => setLoading(false));
    }
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
      .then((data) => console.log(data))
      .catch((error) => console.log(error))
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
          case RoleType["Nhân viên"]: {
            return "Nhân viên";
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
          <Link to={RouteEndpoints.staff.updateStaff.replace(":id", record.id)}>
            <Button type="link" color="blue">
              Cập nhật
            </Button>
          </Link>
          <Button
            type="link"
            danger
            onClick={() => deleteUserHandler(record.id)}
          >
            Xóa
          </Button>
        </>
      ),
    },
  ];

  const RenderCard = (props: { data: UserModel; idx: number }) => {
    const { data, idx } = props;
    const key = useRef(0);
    const getKey = () => {
      key.current = key.current + 1;
      return key.current;
    };

    const RenderDataRole = (value: RoleType) => {
      switch (value) {
        case RoleType["Nhân viên"]:
          return "Nhân viên";
        case RoleType["Quản lý"]:
          return "Quản lý";
      }
    };
    const RenderSexRole = (value: SexType) => {
      switch (value) {
        case SexType["Nam"]:
          return "Nam";
        case SexType["Nữ"]:
          return "Nữ";
      }
    };

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
        <Descriptions.Item label={"Họ tên"}>{data.name}</Descriptions.Item>
        <Descriptions.Item label={"Tài khoản"}>
          {data.account}
        </Descriptions.Item>
        <Descriptions.Item label={"Địa chỉ"}>{data.address}</Descriptions.Item>
        <Descriptions.Item label={"Email"}>{data.email}</Descriptions.Item>
        <Descriptions.Item label={"Số điện thoại"}>
          {data.phone}
        </Descriptions.Item>
        <Descriptions.Item label={"Chức vụ"}>
          {RenderDataRole(data.role)}
        </Descriptions.Item>
        <Descriptions.Item label={"Giới tính"}>
          {RenderSexRole(data.sex)}
        </Descriptions.Item>
        <Descriptions.Item label={"Xử lý"}>
          <>
            <Link to={RouteEndpoints.staff.updateStaff.replace(":id", data.id)}>
              <Button type="link" color="blue">
                Cập nhật
              </Button>
            </Link>
            <Button
              type="link"
              danger
              onClick={() => deleteUserHandler(data.id)}
            >
              Xóa
            </Button>
          </>
        </Descriptions.Item>
      </Descriptions>
    );
  };

  return (
    <>
      <PageHeader
        title="Quản lý nhân viên"
        extra={[<CreateStaff key={getKeyThenIncreaseKey()} />]}
      />
      {liststaff && windowSize && (
        <div className="table-content-report">
          {windowSize.width >= 1024 ? (
            <Table
              locale={{ emptyText: "Không có báo cáo!" }}
              columns={UserColumns}
              rowKey={"id"}
              dataSource={liststaff}
            />
          ) : (
            liststaff.map((x, idx) => (
              <RenderCard data={x} key={getKeyThenIncreaseKey()} idx={idx} />
            ))
          )}
        </div>
      )}
    </>
  );
};

export default StaffHome;
