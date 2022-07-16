import React, { useState, useEffect, useRef } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Table, Button, Input, Descriptions, PageHeader } from "antd";
import { AnimalApiRoute, ApiRoute } from "Api";
import { useAuth } from "Modules/hooks/useAuth";
import { ColumnsType } from "antd/lib/table";
import { RouteEndpoints } from "Components/router/MainRouter";
import { AnimalSexType } from "Components/Shared/Models/Animal";
import { Link, useNavigate } from "react-router-dom";
import { useLoading } from "Modules/hooks/useLoading";
import useWindowSize from "Modules/hooks/useWindowSize";
import { getKeyThenIncreaseKey } from "antd/lib/message";
import { AnimalModel } from "Components/Shared/Models/Animal";
import CreateAnimal from "./CreateAnimal";
import { Form, Modal, Select, notification, Space } from "antd";
import { staffEndpoints } from "Components/router/StaffRoutes";

const AnimalHome = () => {
  const [listsAnimal, setListAnimal] = useState<AnimalModel[]>([]);
  const [page, setPage] = useState({
    pageNumber: 0,
    pageSize: 1000,
  });
  const { user } = useAuth();
  const { setLoading } = useLoading();
  const navigate = useNavigate();
  const windowSize = useWindowSize();

  useEffect(() => {
    setLoading(true);
    fetch(process.env.REACT_APP_API.concat(AnimalApiRoute.getanimals), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer ".concat(user.token),
      },
      body: JSON.stringify(page),
    })
      .then((res) => {
        return res.json();
        // console.log(">>>> res", res)
      })
      .then((data) => {
        setListAnimal(data.data);
        // console.log(">>>> data",data)
      })
      .catch((error) => console.log(error))
      .finally(() => {
        setLoading(false);
      });
  }, [page.pageNumber, page.pageSize]);

  const AnimalColumns: ColumnsType<AnimalModel> = [
    { title: "Tên động vật", dataIndex: "name", key: 1 },
    { title: "Mô tả", dataIndex: "description", key: 2 },
    { title: "Tuổi", dataIndex: "dayAge", key: 3 },
    // { title: "isCar", dataIndex: "isCar", key: 4 },

    // {
    //   title: "Giới tính",
    //   dataIndex: "sex",
    //   key: 7,
    //   render: (value: number) => {
    //     switch (value) {
    //       case SexType["Nam"]: {
    //         return "Nam";
    //       }
    //       case SexType["Nữ"]: {
    //         return "Nữ";
    //       }
    //     }
    //   },
    // },
    {
      title: "Xử lý",
      dataIndex: "",
      key: 5,
      render: (record) => (
        <>
          <Link to={staffEndpoints.updateStaff.replace(":id", record.id)}>
            <Button
              type="link"
              color="blue"
              onClick={() => UpdateAnimalHandler(record)}
            >
              Cập nhật
            </Button>
          </Link>
          <Button
            type="link"
            danger
            onClick={() => deleteAnimalHandler(record.id, record.name)}
          >
            Xóa
          </Button>
        </>
      ),
    },
  ];

  const RenderCard = (props: { data: AnimalModel; idx: number }) => {
    const { data, idx } = props;
    const key = useRef(0);
    const getKey = () => {
      key.current = key.current + 1;
      return key.current;
    };

    // const RenderIsCarRole = (value: RoleType) => {
    //   switch (value) {
    //     case RoleType["Nhân viên"]:
    //       return "Nhân viên";
    //     case RoleType["Quản lý"]:
    //       return "Quản lý";
    //   }
    // };

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
        {/* 
    name: string, 1 
    description: string,2 
   
    dayAge: number,4
    isCar: boolean,5
    Enum: number,6
    pricing: number,7
      */}
        <Descriptions.Item label={"Tên động vật"}>
          {data.name}
        </Descriptions.Item>
        <Descriptions.Item label={"Mô tả"}>
          {data.description}
        </Descriptions.Item>
        <Descriptions.Item label={"Tuổi"}>{data.dayAge}</Descriptions.Item>
        {/* <Descriptions.Item label={"isCar"}>{data.isCar === true ? "Gia cầm" : "Gia súc"}</Descriptions.Item> */}
        <Descriptions.Item label={"pricing"}>{data.pricing}</Descriptions.Item>

        <Descriptions.Item label={"Xử lý"}>
          <>
            {/* <Link to={staffEndpoints.updateStaff.replace(":id", data.id)}> */}
            <Button type="link" color="blue">
              Cập nhật
            </Button>
            {/* </Link> */}
            <Button
              type="link"
              danger
              onClick={() => deleteAnimalHandler(data.id, data.name)}
            >
              Xóa
            </Button>
          </>
        </Descriptions.Item>
      </Descriptions>
    );
  };

  //////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////
  notification.config({
    placement: "topRight",
    bottom: 50,
    duration: 2,
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
  //////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////

  const deleteAnimalHandler = (idAnimal: string, name: string) => {
    // setLoading(true);
    const animalDelete = {
      id: idAnimal,
    };

    setLoading(true);
    fetch(process.env.REACT_APP_API.concat(AnimalApiRoute.delete), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer ".concat(user.token),
      },
      body: JSON.stringify(animalDelete),
    })
      .then((res) => {
        return res.json();
        // console.log(">>>> res", res)
      })
      .then((data) => {
        // setListAnimal(data.data)
        openNotificationWithIcon(
          "success",
          "Xóa động vật",
          `Xóa ${name} thành công`
        );
        // toast.success("Xóa thành công");
        console.log(">>>> Delete animal ok");

        setPage({ ...page, pageSize: page.pageSize - 1 });
      })
      .catch((error) => {
        console.log(">>>> Delete error");
        openNotificationWithIcon(
          "error",
          "Xóa động vật",
          "Xóa động vật thất bại"
        );
      });
  };

  const UpdateAnimalHandler = (animal: object) => {
    console.log("update ", animal);
  };
  return (
    <>
      {/* {console.log(">>> list animal render", listsAnimal)} */}
      <PageHeader
        title="Quản lý động vật"
        extra={[<CreateAnimal key={getKeyThenIncreaseKey()} />]}
      />
      {listsAnimal && windowSize && (
        <div className="table-content-report">
          {windowSize.width >= 1024 ? (
            <Table
              locale={{ emptyText: "Không động vật!" }}
              columns={AnimalColumns}
              rowKey={"id"}
              dataSource={listsAnimal}
            />
          ) : (
            listsAnimal.map((x, idx) => (
              <RenderCard data={x} key={getKeyThenIncreaseKey()} idx={idx} />
            ))
          )}
        </div>
      )}

      {/* ///////////////////////////////////////////////////////////////// */}

      {/* ///////////////////////////////////////////////////////////////// */}
    </>
  );
};

export default AnimalHome;
