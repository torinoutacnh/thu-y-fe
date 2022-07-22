import React, { useState, useEffect, useRef } from "react";
import { PlusOutlined, EditOutlined, DeleteOutlined, LockOutlined } from "@ant-design/icons";
import { Table, Button, Input, Descriptions, PageHeader, Space, notification, Form, Modal } from "antd";
import { ApiRoute, UserApiRoute } from "Api";
import { useAuth } from "Modules/hooks/useAuth";
import { ColumnsType } from "antd/lib/table";
import { RouteEndpoints } from "Components/router/MainRouter";
import { UserModel, RoleType, SexType } from "Components/Shared/Models/User";
import { Link, useNavigate } from "react-router-dom";
import { useLoading } from "Modules/hooks/useLoading";
import useWindowSize from "Modules/hooks/useWindowSize";
import { getKeyThenIncreaseKey } from "antd/lib/message";
import { staffEndpoints } from "Components/router/StaffRoutes";

export function ChangePassword() {
    const [visible, setVisible] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const { setLoading } = useLoading();
    const [form] = Form.useForm();
    const { user } = useAuth();

    const showModal = () => {
        setVisible(true);
    };

    const Cancel = () => {
        form.resetFields();
        setVisible(false);
    };

    ///////////////////////////////////////////////////////
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
    ///////////////////////////////////////////////////////


    const checkConfirmPassword = () => {
        if (form.getFieldValue("password") === form.getFieldValue("confirmPassword")) {
            return true
        }

        form.setFields([
            {
                name: 'confirmPassword',
                errors: ['Xác nhận mật khẩu không khớp'],
            },
        ]);
        return false
    }

    const checkLengthPassword = () => {



        if (form.getFieldValue("password").length >= 6) {

            return true
        }
        form.setFields([
            {
                name: 'password',
                errors: ['Mật khẩu tối thiểu 6 ký tự'],
            },
        ]);
        return false
    }

    const messageSucces = "Password change successful, you can now login"
    const success = "success"
    const error = "error"
    const titleSuccess = "Thay đổi mật khẩu thành công"
    const titleError = "Mật khẩu cũ không chính xác"


    const onFinshChangePassword = () => {
        if (checkLengthPassword() === false) return
        if (checkConfirmPassword() === false) return

        setLoading(true)
        setVisible(false)
        fetch(process.env.REACT_APP_API.concat(UserApiRoute.changePassword), {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer ".concat(user.token),
            },
            body: JSON.stringify(form.getFieldsValue()),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log("change password message >>>>>>", data.message);
                let s1: NotificationType, s2: string
                if (data.message === messageSucces) {
                    s1 = success
                    s2 = titleSuccess
                }
                else {
                    s1 = error
                    s2 = titleError
                }

                openNotificationWithIcon(s1, s2);

            })
            .catch((error) => {
                console.log("change password error >>>>>>", error);
                openNotificationWithIcon(
                    "error",
                    "Thay đổi mật khẩu thất bại"
                );
            })
            .finally(() => {
                form.resetFields()
                setLoading(false);
            });


        // console.log("password >>>>>>>", form.getFieldsValue())

    }
    ///////////////////////////////////////////////////////
    return (
        <>
            <a onClick={showModal}>
                Đổi mật khẩu
            </a>
            <Modal
                title="Đổi mật khẩu"
                visible={visible}
                confirmLoading={confirmLoading}
                onCancel={() => setVisible(false)}
                onOk={onFinshChangePassword}
                okText="Xác nhận"
                cancelText="Hủy bỏ"
            >
                <Form
                    id="change_password-form"
                    layout="vertical"
                    form={form}
                    onFinish={onFinshChangePassword}
                >
                    {/* /////////////////////////////////////////// */}
                    <Form.Item
                        label={"Mật khẩu cũ"}
                        name={"oldPassword"}
                        rules={[
                            {
                                required: true,
                                message: "Nhập mật khẩu cũ!",
                                type: "string",
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        label={"Mật khẩu mới"}
                        name={"password"}
                        rules={[
                            {
                                required: true,
                                message: "Nhập mật khẩu mới!",
                                type: "string",
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        label={"Xác nhận mật khẩu mới"}
                        name={"confirmPassword"}
                        rules={[
                            {
                                required: true,
                                message: "Nhập xác nhận mật khẩu!",
                                type: "string",
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        label={"Tài khoản"}
                        name={"account"}
                        rules={[
                            {
                                type: "string",
                            },
                        ]}
                        initialValue={user.account}

                    >
                        <Input disabled={true} />
                    </Form.Item>



                    {/* /////////////////////////////////////////// */}
                </Form>
            </Modal>

        </>
    )
}