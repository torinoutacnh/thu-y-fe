import React, { useState, useEffect, useRef } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Table, Button, Input, Descriptions, PageHeader, Radio } from "antd";
import AnimalApiRoute from "Api/AnimalApiRoute";
import { useAuth } from "Modules/hooks/useAuth";
import { ColumnsType } from "antd/lib/table";
import { RouteEndpoints } from "Components/router/MainRouter";
import { AnimalSexType } from "Components/Shared/Models/Animal";
import { Link, useNavigate } from "react-router-dom";
import { useLoading } from "Modules/hooks/useLoading";
import useWindowSize from "Modules/hooks/useWindowSize";
import { getKeyThenIncreaseKey } from "antd/lib/message";
import { Form, Modal, Select, notification, Space } from "antd";
import { useParams } from "react-router-dom";
import { UserApiRoute } from "Api";
import { userInfo } from "os";
import { UserModel } from "Components/Shared/Models/User";



export default function UserInfo() {



    const [form] = Form.useForm();
    const { user } = useAuth();
    const { setLoading } = useLoading();
    const [UserData, setUserData] = useState<UserModel[]>()


    useEffect(() => {
        setLoading(true);
        fetch(process.env.REACT_APP_API.concat(UserApiRoute.Base, `?id=${user.userId}`), {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer ".concat(user.token),
            },

        })
            .then((res) => {
                return res.json();
                // console.log(">>>> res", res)
            })
            .then((data) => {

                setUserData([data.data])
                // console.log("api >>>>>> user >>>>>>>", data.data)



            })
            .catch((error) => console.log(error))
            .finally(() => {

                setLoading(false);

            });
    }, [user.userId])


    ///////////////////////////////////////////////////////
    notification.config({
        placement: "topRight",
        bottom: 50,
        duration: 2,
        rtl: true,
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
    /////////////////////////////////////////////////////
    const keyRef = useRef(0);
    const windowSize = useWindowSize();

    const getKey = () => {
        keyRef.current++;
        return keyRef.current;
    };

    const Columns: ColumnsType<UserModel> = [
        {
            title: "Thông tin cá nhân",
            key: getKey(),
            render: (record, key, index) => {
                return (
                    <>
                        <tr>
                            <th>Họ tên:</th>
                            <td>{record.name}</td>
                        </tr>

                        <tr>
                            <th>Tài khoản:</th>
                            <td>{record.account}</td>
                        </tr>

                        <tr>
                            <th>Địa chỉ:</th>
                            <td>{record.address}</td>
                        </tr>

                        <tr>
                            <th>Email:</th>
                            <td>{record.email}</td>
                        </tr>

                        <tr>
                            <th>Số điện thoại:</th>
                            <td>{record.phone}</td>
                        </tr>

                        <tr>
                            <th>Chức vụ:</th>
                            <td>{record.role}</td>
                        </tr>


                    </>
                );
            },
        },
    ];
    ///////////////////////////////////////////////////

    return (
        <>

            {console.log(">>>>>>>user", UserData)}

            <Table

                columns={Columns}
                rowKey={"id"}
                dataSource={UserData}

            />

        </>
    );
}
