import React, { useState, useEffect, useRef } from "react";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Table, Button, Input, Descriptions, PageHeader } from "antd";
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
import { PDFViewer } from "@react-pdf/renderer";
import { PDF12B } from "Components/Shared/Form/PDF/PDF12B";
import { Form, Checkbox, notification, Space, Row } from "antd";
import { ReportApiRoute } from "Api";


export function PrintPDF12B(props: any) {
    const { user } = useAuth();
    const { setLoading } = useLoading();
    const navigate = useNavigate();
    const keyRef = useRef(0);
    const windowSize = useWindowSize();

    useEffect(() => {
        setLoading(true);
        fetch(process.env.REACT_APP_API.concat(ReportApiRoute.getSingleReport, "?")
            + new URLSearchParams({ reportId: "3f8aaa52-b7c6-49bb-9123-6f6e2f7be485" }), {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer ".concat(user.token),
            }
        })
            .then((res) => {
                return res.json();
                // console.log(">>>> res", res)
            })
            .then((data) => {
                console.log(">>>> data", data.data)
            })
            .catch((error) => console.log(error))
            .finally(() => {
                setLoading(false);
            });
    }, [])

    return (

        <>
            {/* <Row align="middle" style={{ height: "100vh" }}>
                <PDFViewer width={"100%"} height={"100%"}>
                    <PDF12B />
                </PDFViewer>
            </Row> */}
        </>

    );


}
