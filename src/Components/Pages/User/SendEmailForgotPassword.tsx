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

export function SendEmailForgotPassword() {
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

    const onFinishForgotPassword = () => {


        setLoading(true)
        setVisible(false)
        fetch(process.env.REACT_APP_API.concat(UserApiRoute.forgotPassword), {
            method: "POST",
            headers: {
                "Content-Type": "application/json"

            },
            body: JSON.stringify(form.getFieldsValue()),
        })
            .then((res) => res.json())
            .then((data) => {

                console.log("forgot password message >>>>>>", data.message);
                openNotificationWithIcon("success", "Kiểm tra email để được hướng dẫn đặt lại mật khẩu");

            })
            .catch((error) => {
                console.log("change password error >>>>>>", error);
                openNotificationWithIcon(
                    "error",
                    "Tài khoản không tồn tại"
                );
            })
            .finally(() => {
                form.resetFields()
                setLoading(false);
            });


        // console.log("account >>>>>>>", form.getFieldsValue())

    }
    ///////////////////////////////////////////////////////
    return (
        <>
            <a onClick={showModal}>
                Quên mật khẩu
            </a>
            <Modal
                title="Nhập tên tài khoản"
                visible={visible}
                confirmLoading={confirmLoading}
                onCancel={() => setVisible(false)}
                onOk={onFinishForgotPassword}
                okText="Xác nhận"
                cancelText="Hủy bỏ"
            >
                <Form
                    id="forgot_password-form"
                    layout="vertical"
                    form={form}
                    onFinish={onFinishForgotPassword}
                >
                    {/* /////////////////////////////////////////// */}
                    <Form.Item
                        label={"Tên tài khoản"}
                        name={"account"}
                        rules={[
                            {
                                required: true,
                                message: "Nhập tên tài khoản!",
                                type: "string",
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