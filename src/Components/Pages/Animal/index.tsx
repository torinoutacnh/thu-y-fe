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
<<<<<<< HEAD
import UpdateAnimal from "./UpdateAnimal";
=======
import { staffEndpoints } from "Components/router/StaffRoutes";
>>>>>>> origin/master

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
  const keyRef = useRef(0);


  const getKey = () => {
    keyRef.current++;
    return keyRef.current;
  };
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const AnimalColumns: ColumnsType<AnimalModel> = [
    { title: "Tên động vật", dataIndex: "name", key: 1 },
    { title: "Mô tả", dataIndex: "description", key: 2 },
    { title: "Tuổi", dataIndex: "dayAge", key: 3 },
    { title: "Giá kiểm dịch", dataIndex: "pricing", key: 3 },
    {
      title: "Xử lý",
      dataIndex: "",
      key: 5,
      render: (record) => (
        <>
<<<<<<< HEAD
          <Link to={RouteEndpoints.animal.updateAnimal.replace(":id", record.id)}>
=======
          <Link to={staffEndpoints.updateStaff.replace(":id", record.id)}>
>>>>>>> origin/master
            <Button
              type="link"
              color="blue"
            // onClick={() => { console.log("id record update", record.id) }}
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

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const resColumns: ColumnsType<AnimalModel> = [
    {
      title: "Danh sách động vật",
      key: getKey(),
      render: (record, key, index) => {
        return (
          <>
<<<<<<< HEAD
            <tr>
              <th>Tên động vật :</th>
              <td>{record.name}</td>
            </tr>
            <tr>
              <th>Mô tả :</th>
              <td>{record.description}</td>
            </tr>
            <tr>
              <th>Tuổi :</th>
              <td>{record.dayAge}</td>
            </tr>
            <tr>
              <th>Giá kiểm dịch :</th>
              <td>{record.pricing}</td>
            </tr>
=======
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
>>>>>>> origin/master

            <tr>
              <Space>
                <Link to={RouteEndpoints.animal.updateAnimal.replace(":id", record.id)}>
                  <Button
                    type="link"
                    color="blue"
                  // onClick={() => { console.log("id record update", record.id) }}
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
              </Space>
            </tr>
          </>
        );
      },
    },
  ];


  ////////////////////////////////////////////NOTIFICATION//////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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





  /////////////////////////////////////////DELETE ANIMAL/////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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





  /////////////////////////////////////////Update after create/////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const UpdateAnimalHandler = (animal: object) => {
    return (
      <UpdateAnimal />
    )
  };


  const UpdateAnimalAfterCreate = () => {
    setPage({ ...page, pageSize: page.pageSize - 1 });
  }

  //////////////////////////////////////////////////// RENDER //////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


  return (
    <>

      <PageHeader
        title="Quản lý động vật"
        extra={[<CreateAnimal key={getKeyThenIncreaseKey()} UpdateAnimalAfterCreate={UpdateAnimalAfterCreate} />]}
      />
      <Table

        columns={windowSize.width > 768 ? AnimalColumns : resColumns}
        rowKey={"id"}
        dataSource={listsAnimal}
      />
    </>
  );
};

export default AnimalHome;
