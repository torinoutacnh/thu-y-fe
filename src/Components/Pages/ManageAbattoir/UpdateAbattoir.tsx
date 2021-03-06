import React, { useState, useEffect, useRef } from "react";
import { Table, Button, Input, Descriptions, PageHeader, Radio } from "antd";
import { useAuth } from "Modules/hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import { useLoading } from "Modules/hooks/useLoading";
import { Form, Modal, Select, notification, Space } from "antd";
import { useParams } from "react-router-dom";
import { ManageAbattoirRoute } from "Api";
import { AbattoirModel } from "Components/Shared/Models/Abattoir";
const UpdateAbattoir = (props: any) => {
  const { setLoading } = useLoading();
  const { user } = useAuth();
  const [abattoirUpdate, setAbattoirUpdate] = useState<AbattoirModel>();
  const [listAbattoir, setListAbattoir] = useState<AbattoirModel[]>([]);
  const { id } = useParams();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const page = {
    pageNumber: 0,
    pageSize: 1000,
    id: id,
  };
  notification.config({
    placement: "topRight",
    bottom: 50,
    duration: 3,
    rtl: true,
    maxCount: 1000,
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
  useEffect(() => {
    setLoading(true);
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
        // console.log(">>>> res", res)
      })
      .then((data) => {
        setAbattoirUpdate(data.data[0]);

        form.setFieldsValue({
          id: data.data[0].id,
          name: data.data[0].name,
          managerName: data.data[0].managerName,
          phone: data.data[0].phone,
          email: data.data[0].email,
          address: data.data[0].address,
        });
      })
      .catch((error) => console.log(error))
      .finally(() => {
        setLoading(false);
      });
  }, [page.pageSize, page.pageNumber]);
  console.log(abattoirUpdate);
  console.log("check form", form);

  const onFinishUpdate = () => {
    // console.log("update finish", form.getFieldsValue())

    setLoading(true);
    fetch(
      process.env.REACT_APP_API.concat(ManageAbattoirRoute.updateAbattoir),
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer ".concat(user.token),
        },
        body: JSON.stringify(form.getFieldsValue()),
      }
    )
      .then((res) => {
        return res.json();
        // console.log(">>>> res", res)
      })
      .then((data) => {
        navigate(ManageAbattoirRoute.Base);
        openNotificationWithIcon(
          "success",
          "SUCCESS",
          `C???p nh???t th??ng tin l?? m??? th??nh c??ng`
        );
      })
      .catch((error) => {
        console.log(error);
        openNotificationWithIcon(
          "error",
          "ERROR",
          `C???p nh???t th??ng tin th???t b???i, vui l??ng ki???m tra l???i th??ng tin`
        );
        setLoading(false);
      });
  };

  return (
    <>
      <Form id="update-abattoir-form" layout="vertical" form={form}>
        <Form.Item>
          <b>C???p nh???t th??ng tin l?? m???</b>
        </Form.Item>
        <Form.Item
          label={"ID"}
          name={"id"}
          rules={[
            {
              required: true,
              message: "Nh???p t??n l?? m???!",
              type: "string",
            },
          ]}
        >
          <Input disabled={true} />
        </Form.Item>
        <Form.Item
          label={"T??n l?? m???"}
          name={"name"}
          rules={[
            {
              required: true,
              message: "Nh???p t??n l?? m???!",
              type: "string",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={"T??n ng?????i qu???n l??"}
          name={"managerName"}
          rules={[
            {
              required: true,
              message: "Nh???p t??n ng?????i qu???n l??!",
              type: "string",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={"S??? ??i???n tho???i"}
          name={"phone"}
          rules={[
            {
              required: true,
              message: "Nh???p s??? ??i???n tho???i!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={"Email"}
          name={"email"}
          rules={[
            {
              required: true,
              message: "Nh???p email",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={"?????a ch???"}
          name={"address"}
          rules={[
            {
              required: true,
              message: "Nh???p ?????a ch???!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Button
          type="primary"
          onClick={() => {
            navigate(ManageAbattoirRoute.Base);
          }}
        >
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

export default UpdateAbattoir;
