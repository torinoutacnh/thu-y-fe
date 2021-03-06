import React, { useState, useEffect, useRef } from "react";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Table, Button, Input, Descriptions, PageHeader } from "antd";
import AnimalApiRoute from "Api/AnimalApiRoute";
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
import UpdateAnimal from "./UpdateAnimal";

const AnimalHome = () => {
  const [listsAnimal, setListAnimal] = useState<AnimalModel[]>([]);
  const [page, setPage] = useState({
    pageNumber: 0,
    pageSize: 1000,
  });
  const { user } = useAuth();
  const { setLoading } = useLoading();
  const navigate = useNavigate();
  const keyRef = useRef(0);
  const windowSize = useWindowSize();

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
    { title: "T??n ?????ng v???t", dataIndex: "name", key: 1 },
    { title: "M?? t???", dataIndex: "description", key: 2 },
    { title: "Tu???i", dataIndex: "dayAge", key: 3 },
    { title: "Gi?? ki???m d???ch", dataIndex: "pricing", key: 3 },
    {
      title: "X??? l??",
      dataIndex: "",
      key: 5,
      render: (record) => (
        <>
          <Link to={RouteEndpoints.animal.updateAnimal.replace(":id", record.id)}>
            <Button
              type="link"
              color="blue"
              icon={<EditOutlined />}
            // onClick={() => { console.log("id record update", record.id) }}
            >
              C???p nh???t
            </Button>
          </Link>
          <Button
            type="link"
            danger
            onClick={() => deleteAnimalHandler(record.id, record.name)}
            icon={<DeleteOutlined />}
          >
            X??a
          </Button>
        </>
      ),
    },
  ];

  const resColumns: ColumnsType<AnimalModel> = [
    {
      title: "Danh s??ch ?????ng v???t",
      key: getKey(),
      render: (record, key, index) => {
        return (
          <>
            <tr>
              <th>T??n ?????ng v???t :</th>
              <td>{record.name}</td>
            </tr>
            <tr>
              <th>M?? t??? :</th>
              <td>{record.description}</td>
            </tr>
            <tr>
              <th>Tu???i :</th>
              <td>{record.dayAge}</td>
            </tr>
            <tr>
              <th>Gi?? ki???m d???ch :</th>
              <td>{record.pricing}</td>
            </tr>

            <tr>
              <Space>
                <Link to={RouteEndpoints.animal.updateAnimal.replace(":id", record.id)}>
                  <Button
                    type="link"
                    color="blue"
                    // onClick={() => { console.log("id record update", record.id) }}
                    icon={<EditOutlined />}
                  >

                    C???p nh???t
                  </Button>
                </Link>
                <Button
                  type="link"
                  danger
                  onClick={() => deleteAnimalHandler(record.id, record.name)}
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
          "X??a ?????ng v???t",
          `X??a ${name} th??nh c??ng`
        );
        // toast.success("X??a th??nh c??ng");
        console.log(">>>> Delete animal ok");

        setPage({ ...page, pageSize: page.pageSize - 1 });
      })
      .catch((error) => {
        console.log(">>>> Delete error");
        openNotificationWithIcon(
          "error",
          "X??a ?????ng v???t",
          "X??a ?????ng v???t th???t b???i"
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
        title="Qu???n l?? ?????ng v???t"
        extra={[<CreateAnimal key={getKeyThenIncreaseKey()} UpdateAnimalAfterCreate={UpdateAnimalAfterCreate} />]}
      />

      <Table
        columns={windowSize.width > 768 ? AnimalColumns : resColumns}
        rowKey={"reportId"}
        dataSource={listsAnimal}
      />
    </>
  );
};

export default AnimalHome;
