import { useState } from "react";
import { Button, Input } from "antd";
import { useAuth } from "Modules/hooks/useAuth";
import { useLoading } from "Modules/hooks/useLoading";
import { Form, Modal, notification } from "antd";
import { ManageReceiptRoute } from "Api";

export function CreateReceiptReport(props: any) {
  const { userId, userName, receiptAllocateId, codeName, codeNumber, remainPage } = props;
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
  const openNotificationWithIcon = (type: NotificationType, title: string) => {
    notification[type]({
      message: title,
    });
  };

  function getCurrentDateTime() {
    const tzoffset = new Date().getTimezoneOffset() * 60000; //offset in milliseconds
    const localISOTime = new Date(Date.now() - tzoffset).toISOString();
    const mySqlDT = localISOTime;
    return mySqlDT;
  }

  const CreateReceiptReportFinish = () => {



    const receiptReport = {
      id: "id",
      userId: userId,
      userName: userName,
      receiptAllocateId: receiptAllocateId,
      receiptName: form.getFieldValue("receiptName"),
      codeName: codeName,
      codeNumber: codeNumber,
      dateUse: getCurrentDateTime(),
      pageUse: form.getFieldValue("pageUse"),
    };

    if (receiptReport.pageUse > remainPage) {
      alert("Số trang còn lại không đủ để sử dụng")
      return
    }

    // console.log("receiptReport >>>>>>>> ", receiptReport)

    if (user?.token) {
      setVisible(false);
      setLoading(true);
      fetch(
        process.env.REACT_APP_API.concat(
          ManageReceiptRoute.createReceiptReport
        ),
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer ".concat(user.token),
          },
          body: JSON.stringify(receiptReport),
        }
      )
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          console.log("create receiptReport ok >>>>>>> ", data);
          window.location.reload();
          openNotificationWithIcon("success", "Sử dụng hóa đơn thành công");
          form.resetFields();
          setLoading(false);
        })
        .catch((error) => {
          console.log("create receiptReport error >>>>>>> ", error);
          openNotificationWithIcon("error", "Sử dụng hóa đơn thất bại");
          setLoading(false);
        });
    }
  };

  return (
    <>
      <span onClick={() => showModal()}>Sử dụng hóa đơn </span>
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
                type: "string",
              },
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
                message: "Nhập số lượng",
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
  );
}
