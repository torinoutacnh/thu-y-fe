import { Button, Form, Input, Modal, Radio } from "antd";
import { ApiRoute, UserApiRoute } from "Api";
import { RoleType, SexType, UserModel } from "Components/Shared/Models/User";
import { useAuth } from "Modules/hooks/useAuth";
import { useLoading } from "Modules/hooks/useLoading";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function UpdateStaff() {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm<UserModel>();
  const [userval, setUserval] = useState<UserModel>();
  const { user } = useAuth();
  const { setLoading } = useLoading();
  const { id } = useParams();

  useEffect(() => {
    if (id && user) {
      setLoading(true);
      fetch(process.env.REACT_APP_API.concat(UserApiRoute.getUser, "?"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer ".concat(user.token),
        },
        body: JSON.stringify(form.getFieldsValue()),
      })
        .then((res) => res.json())
        .then((data) => console.log(data))
        .catch((error) => console.log(error))
        .finally(() => {
          setLoading(false);
        });
    }
  }, [id]);

  const CreateUser = () => {
    if (user) {
      setConfirmLoading(true);
      fetch(process.env.REACT_APP_API.concat(UserApiRoute.getUser, "?"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer ".concat(user.token),
        },
        body: JSON.stringify(form.getFieldsValue()),
      })
        .then((res) => res.json())
        .then((data) => console.log(data))
        .catch((error) => console.log(error))
        .finally(() => {
          setConfirmLoading(false);
          form.resetFields();
        });
    }
  };

  return (
    <>
      {userval && (
        <Form
          id="create-user-form"
          layout="vertical"
          form={form}
          onFinish={CreateUser}
          initialValues={userval}
        >
          <Form.Item name={"id"} hidden={true}>
            <Input />
          </Form.Item>
          <Form.Item
            label={"T??n nh??n vi??n"}
            name={"name"}
            rules={[
              {
                required: true,
                message: "Nh???p t??n nh??n vi??n!",
                type: "string",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={"T??n t??i kho???n"}
            name={"account"}
            rules={[
              {
                required: true,
                message: "Nh???p t??n t??i kho???n!",
                type: "string",
              },
              {
                message:
                  "T??n t??i kho???n kh??ng d???u g???m 8-20 k?? t??? v?? kh??ng ch???a k?? t??? ?????c bi???t!",
                pattern: new RegExp(
                  "^(?=[a-zA-Z0-9._]{8,20}$)(?!.*[_.]{2})[^_.].*[^_.]$"
                ),
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item initialValue={"12345678"} name={"password"} hidden={true}>
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
              {
                message: "S??? ??i???n tho???i kh??ng ????ng ?????nh d???ng!",
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
                message: "S??? email kh??ng ????ng ?????nh d???ng!",
                pattern: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item label={"?????a ch???"} name={"address"}>
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
            label={"Ch???c v???"}
            name={"role"}
            rules={[
              {
                required: true,
                message: "Ch???n ch???c v???!",
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
          <Form.Item>
            <Button
              form="create-user-form"
              type="primary"
              loading={confirmLoading}
              htmlType="submit"
            >
              Th??m m???i
            </Button>
          </Form.Item>
        </Form>
      )}
    </>
  );
}

export default UpdateStaff;
