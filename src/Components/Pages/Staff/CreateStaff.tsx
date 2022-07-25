import { Button, Form, Input, Modal, Radio, notification } from "antd";
import { ApiRoute, UserApiRoute } from "Api";
import { RoleType, SexType } from "Components/Shared/Models/User";
import { useAuth } from "Modules/hooks/useAuth";
import { PlusOutlined } from "@ant-design/icons";
import React, { useState } from "react";

function CreateStaff(props: any) {
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();
  const { user } = useAuth();

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
    title: string,

  ) => {
    notification[type]({
      message: title,

    });
  };

  const CreateUser = () => {

    const pass1 = form.getFieldValue("password")
    const pass2 = form.getFieldValue("confirmPassword")

    if (pass1 === pass2) {


      if (user) {



        const newUser = {
          name: form.getFieldValue("name"),
          account: form.getFieldValue("account"),
          password: form.getFieldValue("password"),
          confirmPassword: form.getFieldValue("confirmPassword"),
          phone: form.getFieldValue("phone"),
          email: form.getFieldValue("email"),
          address: form.getFieldValue("address"),
          sex: form.getFieldValue("sex"),
          role: form.getFieldValue("role")
        }

        setConfirmLoading(true);
        fetch(process.env.REACT_APP_API.concat(UserApiRoute.register), {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer ".concat(user.token),
          },
          body: JSON.stringify(newUser),
        })
          .then((res) => { return res.json() })
          .then((data) => {
            console.log(data)
            console.log("create user", newUser)
            openNotificationWithIcon("success", "Tạo nhân viên thành công")
            props.updateAfterCreate()
          })
          .catch((error) => {
            console.log(error)
            openNotificationWithIcon("error", "Tạo nhân viên thất bại")
          })
          .finally(() => {
            setVisible(false);
            setConfirmLoading(false);
            form.resetFields();
          });

      }




    }
    else {
      alert("Mật khẩu không khớp!")
    }

  };

  return (
    <>
      <Button type="primary" icon={<PlusOutlined />} onClick={showModal}>
        Thêm mới
      </Button>
      <Modal
        title="Thêm nhân viên"
        visible={visible}
        footer={
          <>
            <Button type="default" htmlType="button" onClick={Cancel}>
              Hủy bỏ
            </Button>

            <Button
              form="create-user-form"
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
          id="create-user-form"
          layout="vertical"
          form={form}
          onFinish={CreateUser}
        >
          <Form.Item
            label={"Tên nhân viên"}
            name={"name"}
            rules={[
              {
                required: true,
                message: "Nhập tên nhân viên!",
                type: "string",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={"Tên tài khoản"}
            name={"account"}
            rules={[
              {
                required: true,
                message: "Nhập tên tài khoản!",
                type: "string",
              },
              {
                message:
                  "Tên tài khoản không dấu gồm 8-20 ký tự và không chứa kí tự đặc biệt!",
                pattern: new RegExp(
                  "^(?=[a-zA-Z0-9._]{8,20}$)(?!.*[_.]{2})[^_.].*[^_.]$"
                ),
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name={"password"}
            label={"Mật khẩu"}
            rules={[
              {
                required: true,
                message: "Nhập mật khẩu!",
                type: "string",
              }
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name={"confirmPassword"}
            label={"Nhập lại mật khẩu"}
            rules={[
              {
                required: true,
                message: "Nhập lại mật khẩu!",
                type: "string",
              }
            ]}
          >
            <Input />
          </Form.Item>


          <Form.Item
            label={"Số điện thoại"}
            name={"phone"}
            rules={[
              {
                required: true,
                message: "Nhập số điện thoại!",
              },
              {
                message: "Số điện thoại không đúng định dạng!",
                pattern: new RegExp("(84|0[3|5|7|8|9])+([0-9]{8})"),
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
                message: "Số email không đúng định dạng!",
                pattern: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item label={"Địa chỉ"} name={"address"}>
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
              {Object.values(SexType).map((key, idx) => {
                const val = SexType[key as any];
                if (!isNaN(Number(val)))
                  return (
                    <Radio key={idx} value={val}>
                      {SexType[val as any]}
                    </Radio>
                  );
              })}
            </Radio.Group>
          </Form.Item>
          <Form.Item
            label={"Chức vụ"}
            name={"role"}
            rules={[
              {
                required: true,
                message: "Chọn chức vụ!",
              },
            ]}
          >
            <Radio.Group>
              {Object.values(RoleType).map((key, idx) => {
                const val = RoleType[key as any];
                if (!isNaN(Number(val)))
                  return (
                    <Radio key={idx} value={val}>
                      {RoleType[val as any]}
                    </Radio>
                  );
              })}
            </Radio.Group>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default CreateStaff;
