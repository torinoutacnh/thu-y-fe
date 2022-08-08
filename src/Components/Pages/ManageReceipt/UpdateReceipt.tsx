import { useState, useEffect } from "react";
import { Button, Input } from "antd";
import { useAuth } from "Modules/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useLoading } from "Modules/hooks/useLoading";
import { Form, notification } from "antd";
import { useParams } from "react-router-dom";
import { ManageReceiptRoute } from "Api";
import { ReceiptModel } from "Components/Shared/Models/Receipt";

const UpdateReceipt = (props: any) => {
  const { setLoading } = useLoading();
  const { user } = useAuth();
  const [receiptrUpdate, setReceiptUpdate] = useState<ReceiptModel>();
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
          `Cập nhật thông tin hóa đơn thành công`
        );
      })
      .catch((error) => {
        console.log(error);
        openNotificationWithIcon(
          "error",
          "ERROR",
          `Cập nhật thông tin thất bại, vui lòng kiểm tra lại thông tin`
        );
        setLoading(false);
      });
  };

  return (
    <>
      <Form id="update-receipt-form" layout="vertical" form={form}>
        <Form.Item>
          <b>Cập nhật thông tin hóa đơn</b>
        </Form.Item>
        <Form.Item
          label={"ID"}
          name={"id"}
          rules={[
            {
              required: true,
              message: "Nhập tên hóa đơn!",
              type: "string",
            },
          ]}
        >
          <Input disabled={true} />
        </Form.Item>
        <Form.Item
          label={"Tên hóa đơn"}
          name={"name"}
          rules={[
            {
              required: true,
              message: "Nhập tên hóa đơn!",
              type: "string",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={"Tên mã hóa đơn"}
          name={"codeName"}
          rules={[
            {
              required: true,
              message: "Nhập tên mã hóa đơn!",
              type: "string",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={"Số trang"}
          name={"page"}
          rules={[
            {
              required: true,
              message: "Nhập số trang!",
            },
            {
              message: "Bao gồm các số 0-9!",
              pattern: new RegExp("[0-9]"),
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={"Số mã hóa đơn"}
          name={"codeNumber"}
          rules={[
            {
              required: true,
              message: "Nhập số mã hóa đơn!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={"Ngày hiệu lực"}
          name={"effectiveDate"}
          rules={[
            {
              required: true,
              message: "Nhập ngày hiệu lực!",
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

export default UpdateReceipt;
