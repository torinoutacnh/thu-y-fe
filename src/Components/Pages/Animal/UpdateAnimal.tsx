import React, { useState, useEffect, useRef } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Table, Button, Input, Descriptions, PageHeader, Radio } from "antd";
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
    fetch(process.env.REACT_APP_API.concat(AnimalApiRoute.update), {
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
          `C???p nh???t th??ng tin ?????ng v???t th??nh c??ng`
        );

      })
      .catch((error) => {
        console.log(error)
        openNotificationWithIcon(
          "error",
          "ERROR",
          `C???p nh???t th??ng tin th???t b???i, vui l??ng ki???m tra l???i th??ng tin`
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
          <b>C???p nh???t th??ng tin ?????ng v???t</b>
        </Form.Item>

        <Form.Item

          label={"ID"}
          name={"id"}
          rules={[
            {
              required: true,
              message: "Nh???p t??n ?????ng v???t!",
              type: "string",
            },
          ]}
        >

          <Input disabled={true} />
        </Form.Item>

        <Form.Item
          label={"T??n ?????ng v???t"}
          name={"name"}
          rules={[
            {
              required: true,
              message: "Nh???p t??n ?????ng v???t!",
              type: "string",
            },
          ]}
        >

          <Input />
        </Form.Item>

        <Form.Item
          label={"M?? t???"}
          name={"description"}
          rules={[
            {
              required: true,
              message: "Nh???p m?? t???!",
              type: "string",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label={"Tu???i"}
          name={"dayAge"}
          rules={[
            {
              required: true,
              message: "Nh???p tu???i!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label={"Gi???i t??nh"}
          name={"sex"}
          rules={[
            {
              required: true,
              message: "Ch???n gi???i t??nh!",
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
          label={"Gi?? ki???m d???ch"}
          name={"pricing"}
          rules={[
            {
              required: true,
              message: "Nh???p gi?? ki???m d???ch!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Button type="primary" onClick={() => { navigate(RouteEndpoints.animal.basepath) }}>
          Quay l???i
        </Button>

        &nbsp;&nbsp;&nbsp;&nbsp;

        <Button type="primary" onClick={() => onFinishUpdate()}>
          C???p nh???t
        </Button>


      </Form>

    </>

  );
};

export default UpdateAnimal;