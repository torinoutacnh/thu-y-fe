import { useState, useEffect, useRef } from "react";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { Table, Button, PageHeader } from "antd";
import AnimalApiRoute from "Api/AnimalApiRoute";
import { useAuth } from "Modules/hooks/useAuth";
import { ColumnsType } from "antd/lib/table";
import { Link, useNavigate } from "react-router-dom";
import { useLoading } from "Modules/hooks/useLoading";
import useWindowSize from "Modules/hooks/useWindowSize";
import { getKeyThenIncreaseKey } from "antd/lib/message";
import { AnimalModel } from "Components/Shared/Models/Animal";
import { notification, Space } from "antd";
import { animalEndpoints } from "Components/router/routes";
import { ApiRoute } from "Api";
import { useDownloadFile } from "Modules/hooks/useDownloadFiles";

export const SlaughterRevenue = () => {
    const { user } = useAuth();
    const { setLoading } = useLoading();
    const navigate = useNavigate();
    const tmp = useDownloadFile();

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

    // const doFecthDownloadFile = (fileName: string, stringBody: string) => {
    //     setLoading(true)
    //     fetch(process.env.REACT_APP_API.concat(ApiRoute.excelFiles), {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //             Authorization: "Bearer ".concat(user.token),
    //         },
    //         body: JSON.stringify(stringBody),
    //     })
    //         .then((res) => {
    //             return res.blob()
    //         })
    //         .then(blob => {

    //             openNotificationWithIcon("success", "Đang tải xuống")

    //             const url = window.URL.createObjectURL(blob);
    //             const a = document.createElement("a");
    //             a.style.display = "none";
    //             a.href = url;
    //             // the filename you want
    //             a.download = fileName.concat(".xlsx");
    //             document.body.appendChild(a);
    //             a.click();
    //             window.URL.revokeObjectURL(url);
    //         })
    //         .catch(() => {
    //             openNotificationWithIcon("error", "Tải xuống thất bại")
    //         })
    //         .finally(() => {
    //             setLoading(false)
    //         })
    // }

    return (
        <>
            <h1>Doanh thu giết mổ</h1>
            <button onClick={() => { tmp("DoanhThuGietMo", "string123") }}>Download</button>


        </>
    )

}