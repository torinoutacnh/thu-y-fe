//
import React, { useState, useEffect, useRef } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Table, Button, Input, Descriptions, PageHeader, Radio } from "antd";
import { ApiRoute } from "Api/ApiRoute";
//
import { Button, Form, Input, Modal, Radio } from "antd";
import { ApiRoute } from "Api";
import { RoleType, SexType, UserModel } from "Components/Shared/Models/User";
//
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
import { useParams } from "react-router-dom";



const UpdateAnimal = () => {

  const { setLoading } = useLoading();
  const { user } = useAuth();
  const [animalUpdate, setAnimalUpdate] = useState<AnimalModel>();
  const [listsAnimal, setListAnimal] = useState<AnimalModel[]>([]);
  const { id } = useParams();

  const navigate = useNavigate();
  const [form] = Form.useForm();

  const page = {
    pageNumber: 0,
    pageSize: 1000,
    id: id

  }
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  notification.config({
    placement: "topRight",
    bottom: 50,
    duration: 3,
    rtl: true,
    maxCount: 1000
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
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    setLoading(true);
    fetch(process.env.REACT_APP_API.concat(ApiRoute.getanimals), {
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


        setAnimalUpdate(data.data[0])

        form.setFieldsValue({
          id: data.data[0].id,
          name: data.data[0].name,
          description: data.data[0].description,
          dayAge: data.data[0].dayAge,
          sex: data.data[0].sex,
          pricing: data.data[0].pricing
        })


      })
      .catch((error) => console.log(error))
      .finally(() => {

        setLoading(false);

      });
  }, [page.pageSize, page.pageNumber])
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const onFinishUpdate = () => {

    // console.log("update finish", form.getFieldsValue())

    setLoading(true);
    fetch(process.env.REACT_APP_API.concat(ApiRoute.updateAnimal), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer ".concat(user.token),
      },
      body: JSON.stringify(form.getFieldsValue()),
    })
      .then((res) => {
        return res.json();
        // console.log(">>>> res", res)
      })
      .then((data) => {

        navigate(RouteEndpoints.animal.basepath)
        openNotificationWithIcon(
          "success",
          "SUCCESS",
          `Cập nhật thông tin động vật thành công`
        );

      })
      .catch((error) => {
        console.log(error)
        openNotificationWithIcon(
          "error",
          "ERROR",
          `Cập nhật thông tin thất bại, vui lòng kiểm tra lại thông tin`
        );
        setLoading(false);
      })



  }
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



  //
  return (
    <>

      {/* {console.log("update data >>>>>>>>", animalUpdate)} */}

      <Form
        id="update-animal-form"
        layout="vertical"
        form={form}


      >
        <Form.Item>
          <b>Cập nhật thông tin động vật</b>
        </Form.Item>

        <Form.Item

          label={"ID"}
          name={"id"}
          rules={[
            {
              required: true,
              message: "Nhập tên động vật!",
              type: "string",
            },
          ]}
        >

          <Input disabled={true} />
        </Form.Item>

        <Form.Item
          label={"Tên động vật"}
          name={"name"}
          rules={[
            {
              required: true,
              message: "Nhập tên động vật!",
              type: "string",
            },
          ]}
        >

          <Input />
        </Form.Item>

        <Form.Item
          label={"Mô tả"}
          name={"description"}
          rules={[
            {
              required: true,
              message: "Nhập mô tả!",
              type: "string",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label={"Tuổi"}
          name={"dayAge"}
          rules={[
            {
              required: true,
              message: "Nhập tuổi!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label={"Giới tính"}
          name={"sex"}
          rules={[
            {
              required: true,
              message: "Chọn giới tính!",
            },
          ]}
        >
          <Radio.Group>
            {Object.values(AnimalSexType).map((key, idx) => {
              const val = AnimalSexType[key as any];
              if (!isNaN(Number(val)))
                return (
                  <Radio key={idx} value={val}>
                    {AnimalSexType[val as any]}
                  </Radio>
                );
            })}
          </Radio.Group>
        </Form.Item>

        <Form.Item
          label={"Giá kiểm dịch"}
          name={"pricing"}
          rules={[
            {
              required: true,
              message: "Nhập giá kiểm dịch!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Button type="primary" onClick={() => { navigate(RouteEndpoints.animal.basepath) }}>
          Quay lại
        </Button>

        &nbsp;&nbsp;&nbsp;&nbsp;

        <Button type="primary" onClick={() => onFinishUpdate()}>
          Cập nhật
        </Button>


      </Form>

    </>

  );
};

export default UpdateAnimal;