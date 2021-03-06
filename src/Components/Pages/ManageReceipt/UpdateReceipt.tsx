import React, { useState, useEffect, useRef } from "react";
import { Table, Button, Input, Descriptions, PageHeader, Radio } from "antd";
import { useAuth } from "Modules/hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import { useLoading } from "Modules/hooks/useLoading";
import { Form, Modal, Select, notification, Space, DatePicker } from "antd";
import { useParams } from "react-router-dom";
import { ManageReceiptRoute } from "Api";
import { ReceiptModel } from "Components/Shared/Models/Receipt";

const UpdateReceipt = (props: any) => {
  const { setLoading } = useLoading();
  const { user } = useAuth();
  const [receiptrUpdate, setReceiptUpdate] = useState<ReceiptModel>();
  const [listReceipt, setListReceipt] = useState<ReceiptModel[]>([]);
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
    fetch(process.env.REACT_APP_API.concat(ManageReceiptRoute.getReceipt), {
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
        setReceiptUpdate(data.data[0]);

        form.setFieldsValue({
          id: data.data[0].id,
          name: data.data[0].name,
          page: data.data[0].page,
          codeName: data.data[0].codeName,
          codeNumber: data.data[0].codeNumber,
          effectiveDate: data.data[0].effectiveDate,
        });
      })
      .catch((error) => console.log(error))
      .finally(() => {
        setLoading(false);
      });
  }, [page.pageSize, page.pageNumber]);
  const onFinishUpdate = () => {
    // console.log("update finish", form.getFieldsValue())

    setLoading(true);
    fetch(process.env.REACT_APP_API.concat(ManageReceiptRoute.updateReceipt), {
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
        navigate(ManageReceiptRoute.Base);
        openNotificationWithIcon(
          "success",
          "SUCCESS",
          `C???p nh???t th??ng tin h??a ????n th??nh c??ng`
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
      <Form id="update-receipt-form" layout="vertical" form={form}>
        <Form.Item>
          <b>C???p nh???t th??ng tin h??a ????n</b>
        </Form.Item>
        <Form.Item
          label={"ID"}
          name={"id"}
          rules={[
            {
              required: true,
              message: "Nh???p t??n h??a ????n!",
              type: "string",
            },
          ]}
        >
          <Input disabled={true} />
        </Form.Item>
        <Form.Item
          label={"T??n h??a ????n"}
          name={"name"}
          rules={[
            {
              required: true,
              message: "Nh???p t??n h??a ????n!",
              type: "string",
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
              message: "Nh???p t??n m?? h??a ????n!",
              type: "string",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={"S??? trang"}
          name={"page"}
          rules={[
            {
              required: true,
              message: "Nh???p s??? trang!",

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
          label={"S??? m?? h??a ????n"}
          name={"codeNumber"}
          rules={[
            {
              required: true,
              message: "Nh???p s??? m?? h??a ????n!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={"Ng??y hi???u l???c"}
          name={"effectiveDate"}
          rules={[
            {
              required: true,
              message: "Nh???p ng??y hi???u l???c!",
            },
          ]}
        >
          <Input disabled={true} />
          {/* <DatePicker /> */}
        </Form.Item>
        <Button
          type="primary"
          onClick={() => {
            navigate(ManageReceiptRoute.Base);
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

export default UpdateReceipt;
