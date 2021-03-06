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
import { Form, Modal, Select, notification, Space } from "antd";
import { useParams } from "react-router-dom";
import { AllocateModel } from "Components/Shared/Models/Allocate";



const UpdateAllocate = () => {

  const { setLoading } = useLoading();
  const { user } = useAuth();
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
    fetch(process.env.REACT_APP_API.concat(RouteEndpoints.myAllocate), {
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

        console.log("data", data.data[0])

        form.setFieldsValue({
          id: data.data[0].id,
          userId: data.data[0].userId,
          receiptId: data.data[0].receiptId,
          amount: data.data[0].amount,
          userName: data.data[0].userName,
          codeName: data.data[0].codeName,
          codeNumber: data.data[0].codeNumber,
          receiptName: data.data[0].receiptName
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

    console.log("update finish >>>> ", form.getFieldsValue())

    // setLoading(true);
    // fetch(process.env.REACT_APP_API.concat(AnimalApiRoute.update), {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: "Bearer ".concat(user.token),
    //   },
    //   body: JSON.stringify(form.getFieldsValue()),
    // })
    //   .then((res) => {
    //     return res.json();
    //     // console.log(">>>> res", res)
    //   })
    //   .then((data) => {

    //     navigate(RouteEndpoints.animal.basepath)
    //     openNotificationWithIcon(
    //       "success",
    //       "SUCCESS",
    //       `C???p nh???t th??ng tin ?????ng v???t th??nh c??ng`
    //     );

    //   })
    //   .catch((error) => {
    //     console.log(error)
    //     openNotificationWithIcon(
    //       "error",
    //       "ERROR",
    //       `C???p nh???t th??ng tin th???t b???i, vui l??ng ki???m tra l???i th??ng tin`
    //     );
    //     setLoading(false);
    //   })



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
          label={"id"}
          name={"id"}
          rules={[
            {
              required: true,
              message: "Nh???p s??? l?????ng",
              type: "string"
            }
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label={"userId"}
          name={"userId"}
          rules={[
            {
              required: true,
              message: "Nh???p s??? l?????ng",
              type: "string"
            }
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label={"receiptId"}
          name={"receiptId"}
          rules={[
            {
              required: true,
              message: "Nh???p s??? l?????ng",
              type: "string"
            }
          ]}
        >
          <Input />
        </Form.Item>




        <Form.Item
          label={"S??? l?????ng"}
          name={"amount"}
          rules={[
            {
              required: true,
              message: "Nh???p s??? l?????ng"

            },
            {
              message: "Bao g???m c??c s??? 0-9!",
              pattern: new RegExp("[0-9]"),
            },
          ]}

        >
          <Input />
        </Form.Item>


        <Form.Item
          label={"T??n m?? h??a ????n"}
          name={"codeName"}
          rules={[
            {
              required: true,
              message: "Nh???p s??? l?????ng",
              type: "string"
            }
          ]}

        >
          <Input />
        </Form.Item>



        <Form.Item
          label={"S??? m?? h??a ????n"}
          name={"codeNumber"}
          rules={[
            {
              required: true,
              message: "Nh???p s??? l?????ng",
              type: "string"
            }
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

export default UpdateAllocate;