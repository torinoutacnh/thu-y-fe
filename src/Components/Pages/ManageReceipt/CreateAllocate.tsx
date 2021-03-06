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


export function CreateAllocate(props: any) {

    interface usernameModel {
        value: string
    }

    interface IdModel {
        value: string
        id: string
    }


    const { idReceipt, arrUser, arrId, codeName, codeNumber } = props
    const [visible, setVisible] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [listUsername, setListUsername] = useState<usernameModel[]>(arrUser);
    const [listId, setListId] = useState<IdModel[]>(arrId);
    const navigate = useNavigate()
    const [form] = Form.useForm();
    const { user } = useAuth();
    const { setLoading } = useLoading();
    const [page, setPage] = useState({
        pageIndex: 1,
        pageNumber: 100,
    });

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

    const CreateAllocateFinish = () => {

        const index = listId.findIndex(item => item.value === form.getFieldValue("userName"))
        const selectID = listId[index].id



        const allocate = { ...form.getFieldsValue(), userId: selectID, id: "id" }

        console.log("allocate >>>>>>>> ", allocate)
        // console.log("list user >>>>>>>> ", listUsername)
        // console.log("list id >>>>>>>> ", listId)
        // console.log("select id >>>>>>>> ", selectID)

        if (user?.token) {
            setVisible(false)
            setLoading(true)
            fetch(process.env.REACT_APP_API.concat(ManageReceiptRoute.createAllocateReceipt), {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer ".concat(user.token),
                },
                body: JSON.stringify(allocate),
            })
                .then((res) => {
                    return res.json();
                })
                .then((data) => {
                    console.log("create allocate ok >>>>>>> ", data)
                    openNotificationWithIcon("success", "C???p h??a ????n th??nh c??ng")
                    form.resetFields()
                    navigate(ManageReceiptRoute.Base)
                    setLoading(false)
                })
                .catch((error) => {
                    console.log("create allocate not >>>>>>> ", error)
                    openNotificationWithIcon("error", "C???p h??a ????n th???t b???i")
                    setLoading(false)
                })

        }

    }

    return (
        <>

            <a onClick={() => showModal()}>C???p h??a ????n </a>
            <Modal
                title="C???p h??a ????n"
                visible={visible}
                footer={
                    <>
                        <Button type="default" htmlType="button" onClick={Cancel}>
                            H???y b???
                        </Button>
                        <Button
                            form="create-allocate-form"
                            type="primary"
                            loading={confirmLoading}
                            htmlType="submit"
                        >
                            Th??m m???i
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
                    onFinish={CreateAllocateFinish}
                >
                    {/* /////////////////////////////////////////// */}
                    <Form.Item
                        hidden={true}
                        label={"M?? h??a ????n"}
                        name={"receiptId"}
                        rules={[
                            {
                                required: true,

                                type: "string",
                            },
                        ]}
                        initialValue={idReceipt}
                    >
                        <Input disabled={true} />
                    </Form.Item>

                    <Form.Item
                        label={"T??n h??a ????n c???p ph??t"}
                        name={"receiptName"}
                        rules={[
                            {
                                required: true,
                                message: "Nh???p s??? l?????ng",
                                type: "string"
                            }
                        ]}

                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label={"T??n t??i kho???n"}
                        name={"userName"}
                        rules={[
                            {
                                required: true,

                                type: "string",
                            },
                        ]}

                    >
                        <AutoComplete
                            style={{ width: 200 }}
                            options={listUsername}
                            placeholder="Nh???p ????? t??m ki???m"
                            filterOption={(inputValue, option) =>
                                option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                            }
                        />
                    </Form.Item>


                    <Form.Item
                        label={"S??? l?????ng"}
                        name={"amount"}
                        rules={[
                            {
                                required: true,
                                message: "Nh???p s??? l?????ng"

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
                        hidden={true}
                        label={"T??n m?? h??a ????n"}
                        name={"codeName"}
                        rules={[
                            {
                                required: true,
                                message: "Nh???p s??? l?????ng",
                                type: "string"
                            }
                        ]}
                        initialValue={codeName}

                    >
                        <Input />
                    </Form.Item>



                    <Form.Item
                        hidden={true}
                        label={"S??? m?? h??a ????n"}
                        name={"codeNumber"}
                        rules={[
                            {
                                required: true,
                                message: "Nh???p s??? l?????ng",
                                type: "string"
                            }
                        ]}
                        initialValue={codeNumber}

                    >
                        <Input />
                    </Form.Item>

                    {/* /////////////////////////////////////////// */}
                </Form>
            </Modal>
        </>
    )
}