import React, { useState, useEffect, useRef } from "react";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Table, Button, Input, Descriptions, PageHeader, Space } from "antd";
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
import { staffEndpoints } from "Components/router/StaffRoutes";

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
      .then((data) => console.log(data))
      .catch((error) => console.log(error))
      .finally(() => GetStaff());
  };

  const UserColumns: ColumnsType<UserModel> = [
    { title: "H??? t??n", dataIndex: "name", key: 1 },
    { title: "T??i kho???n", dataIndex: "account", key: 2 },
    { title: "?????a ch???", dataIndex: "address", key: 3 },
    { title: "Email", dataIndex: "email", key: 4 },
    { title: "S??? ??i???n tho???i", dataIndex: "phone", key: 5 },
    {
      title: "Ch???c v???",
      dataIndex: "role",
      key: 6,
      render: (value: number) => {
        switch (value) {
          case RoleType["Nh??n vi??n ki???m d???ch"]: {
            return "Nh??n vi??n ki???m d???ch";
          }
          case RoleType["Nh??n vi??n l?? m???"]: {
            return "Nh??n vi??n l?? m???";
          }

          case RoleType["Qu???n l??"]: {
            return "Qu???n l??";
          }
        }
      },
    },

    {
      title: "Gi???i t??nh",
      dataIndex: "sex",
      key: 7,
      render: (value: number) => {
        switch (value) {
          case SexType["Nam"]: {
            return "Nam";
          }
          case SexType["N???"]: {
            return "N???";
          }
        }
      },
    },
    {
      title: "X??? l??",
      dataIndex: "",
      key: 8,
      render: (record) => (
        <>
          <Link to={staffEndpoints.updateStaff.replace(":id", record.id)}>
            <Button type="link" color="blue" icon={<EditOutlined />}>
              C???p nh???t
            </Button>
          </Link>
          <Button
            type="link"
            danger
            onClick={() => deleteUserHandler(record.id)}
            icon={<DeleteOutlined />}
          >
            X??a
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
      title: "Danh s??ch nh??n vi??n",
      key: getKey(),
      render: (record, key, index) => {
        const RenderSexRole = (value: SexType) => {
          switch (value) {
            case SexType["Nam"]:
              return "Nam";
            case SexType["N???"]:
              return "N???";
          }
        };
        return (
          <>
            <tr>
              <th>H??? t??n :</th>
              <td>{record.name}</td>
            </tr>
            <tr>
              <th>T??i kho???n :</th>
              <td>{record.account}</td>
            </tr>
            <tr>
              <th>?????a ch??? :</th>
              <td>{record.address}</td>
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
              <th>Ch???c v???:</th>
              <td>{record.role}</td>
            </tr>
            <tr>
              <th>Gi???i t??nh :</th>
              <td>{RenderSexRole(record.sex)}</td>
            </tr>
            <tr>
              <Space>
                <Button
                  // onClick={() =>
                  //   navigate(
                  //     quarantineEndpoints.updatereport.replace(
                  //       ":id",
                  //       record.reportId
                  //     ),
                  //     { replace: true }
                  //   )
                  // }
                  type="link"
                >
                  C???p nh???t
                </Button>
                <Button type="link" danger>
                  X??a
                </Button>
              </Space>
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
        title="Qu???n l?? nh??n vi??n"
        extra={[<CreateStaff key={getKeyThenIncreaseKey()} />]}
      />

      <Table
        columns={windowSize.width > 768 ? UserColumns : resColumns}
        rowKey={"id"}
        dataSource={liststaff}
      />
    </>
  );
};

export default StaffHome;
