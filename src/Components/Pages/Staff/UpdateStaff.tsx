import { Button, Form, Input, Modal, Radio, notification } from "antd";
import { ApiRoute, UserApiRoute } from "Api";
import { staffEndpoints } from "Components/router/StaffRoutes";
import { RoleType, SexType, UserModel } from "Components/Shared/Models/User";
import { useAuth } from "Modules/hooks/useAuth";
import { useLoading } from "Modules/hooks/useLoading";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function UpdateStaff() {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm<UserModel>();
  const { user } = useAuth();
  const { setLoading } = useLoading();
  const { id } = useParams();
  const navigate = useNavigate()

  useEffect(() => {
    if (id && user) {
      setLoading(true);
      fetch(process.env.REACT_APP_API.concat(UserApiRoute.getSingle, "?") + new URLSearchParams({ id: id }), {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer ".concat(user.token),
        },

      })
        .then((res) => res.json())
        .then((data) => {
          // console.log("get user update >>>>> ", data.data)

          const tmp: UserModel = data.data

          form.setFieldsValue({
            id: tmp.id,
            name: tmp.name,
            account: tmp.account,
            phone: tmp.phone,
            email: tmp.email,
            address: tmp.address,
            sex: tmp.sex,
            role: tmp.role,
          })

        })
        .catch((error) => console.log(error))
        .finally(() => {
          setLoading(false);
        });
    }
  }, [id]);

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

  const checkpass = () => {
    const tmp = form.getFieldValue("password")
    if (tmp.length === 0) {
      return true
    }
    return false
  }

  const onFinishUpdate = () => {

    if (checkpass()) return
    if (user) {

      const newUser = {
        id: form.getFieldValue("id"),
        name: form.getFieldValue("name"),
        account: form.getFieldValue("account"),
        password: form.getFieldValue("password"),
        phone: form.getFieldValue("phone"),
        email: form.getFieldValue("email"),
        address: form.getFieldValue("address"),
        sex: form.getFieldValue("sex"),
        role: form.getFieldValue("role")
      }

      setLoading(true);
      fetch(process.env.REACT_APP_API.concat(UserApiRoute.update, "?"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer ".concat(user.token),
        },
        body: JSON.stringify(newUser),
      })
        .then((res) => { return res.json() })
        .then((data) => {
          console.log("update success ", data)
          openNotificationWithIcon("success", "Cập nhật nhân viên thành công")
          form.resetFields();
          navigate(staffEndpoints.home)

        })
        .catch((error) => {
          openNotificationWithIcon("error", "Cập nhật nhân viên thất bại")
          console.log(error)
          setLoading(false);
        })

    }
  }

  return (
    <>
      <Form
        id="update-user-form"
        layout="vertical"
        form={form}
      >
        <Form.Item>
          <b>Cập nhật thông tin nhân viên</b>
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

        <Form.Item
          label="Mật khẩu"
          name="password"
          rules={[
            {
              required: true,
              message: "Nhập mật khẩu!"
            }
          ]}
        >
          <Input.Password
            minLength={6} />
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

        <Button type="primary" onClick={() => { navigate(staffEndpoints.home) }}>
          Quay lại
        </Button>

        &nbsp;&nbsp;&nbsp;&nbsp;

        <Button type="primary" onClick={() => onFinishUpdate()}>
          Cập nhật
        </Button>

      </Form>
    </>
  );
}

export default UpdateStaff;
