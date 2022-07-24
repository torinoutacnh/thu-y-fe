import React, { useState, useEffect, useRef } from "react";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Table, Button, Input, Descriptions, PageHeader, AutoComplete, InputNumber } from "antd";
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
import { ManageReceiptRoute, UserApiRoute } from "Api";
import { UserModel } from "Components/Shared/Models/User";
import { StringGradients } from "antd/lib/progress/progress";
import { type } from "os";
import { managereceiptRoutes } from "Components/router/ManageReceiptRoutes";


export function CreateReceiptReport(props: any) {


  const { userId, userName, receiptAllocateId, codeName, codeNumber } = props
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();
  const { user } = useAuth();
  const { setLoading } = useLoading();


  const showModal = () => {
    setVisible(true);
  };

  const Cancel = () => {
    form.resetFields();
    setVisible(false);
  };

  notification.config({
    placement: "topRight",
    bottom: 50,
    duration: 3,
    rtl: true,
  });
  type NotificationType = "success" | "info" | "warning" | "error";
  const openNotificationWithIcon = (
    type: NotificationType,
    title: string

  ) => {
    notification[type]({
      message: title

    });
  };

  const CreateReceiptReportFinish = () => {

    const d = new Date();

    const year = d.getFullYear();
    const month = d.getMonth() + 1;
    const day = d.getDate();
    const hour = d.getHours()
    const minute = d.getMinutes();
    const second = d.getSeconds()

    const daytime = year + "-" + month + "-" + day



    const receiptReport = {
      id: "id",
      userId: userId,
      userName: userName,
      receiptAllocateId: receiptAllocateId,
      receiptName: form.getFieldValue("receiptName"),
      codeName: codeName,
      codeNumber: codeNumber,
      // dateUse: daytime,
      pageUse: form.getFieldValue("pageUse")
    }


    console.log("receiptReport >>>>>>>> ", receiptReport)


    if (user?.token) {
      setVisible(false)
      setLoading(true)
      fetch(process.env.REACT_APP_API.concat(ManageReceiptRoute.createReceiptReport), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer ".concat(user.token),
        },
        body: JSON.stringify(receiptReport),
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          console.log("create receiptReport ok >>>>>>> ", data)
          window.location.reload();
          openNotificationWithIcon("success", "Sử dụng hóa đơn thành công")
          form.resetFields()
          setLoading(false)
        })
        .catch((error) => {
          console.log("create receiptReport error >>>>>>> ", error)
          openNotificationWithIcon("error", "Sử dụng hóa đơn thất bại")
          setLoading(false)
        })

    }

  }

  return (
    <>

      <a onClick={() => showModal()}>Sử dụng hóa đơn </a>
      <Modal
        title="Sử dụng hóa đơn"
        visible={visible}
        footer={
          <>
            <Button type="default" htmlType="button" onClick={Cancel}>
              Hủy bỏ
            </Button>
            <Button
              form="create-allocate-form"
              type="primary"
              loading={confirmLoading}
              htmlType="submit"
            >
              Thêm mới
            </Button>
          </>
        }
        confirmLoading={confirmLoading}
        onCancel={() => setVisible(false)}
      >
        <Form
          id="create-allocate-form"
          layout="vertical"
          form={form}
          onFinish={CreateReceiptReportFinish}
        >
          {/* /////////////////////////////////////////// */}


          <Form.Item
            label={"Tên hóa đơn sử dụng"}
            name={"receiptName"}
            rules={[
              {
                required: true,
                message: "Nhập số lượng",
                type: "string"
              }
            ]}

          >
            <Input />
          </Form.Item>




          <Form.Item
            label={"Số trang sử dụng"}
            name={"pageUse"}
            rules={[
              {
                required: true,
                message: "Nhập số lượng"

              },
              {
                message: "Bao gồm các số 0-9!",
                pattern: new RegExp("[0-9]"),
              },
            ]}

          >
            <Input />
          </Form.Item>




          {/* /////////////////////////////////////////// */}
        </Form>
      </Modal>
    </>
  )
}