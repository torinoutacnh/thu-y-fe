/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { FormModel, RenderForm } from "Components/Shared/Form";
import { useAuth } from "Modules/hooks/useAuth";
import { ApiRoute } from "Api/ApiRoute";
import { ReportModel } from "Components/Shared/Form/FormDefine";
import { ReportQueryModel } from ".";
import { useLocation } from "react-router-dom";

export default function UpdateReportPage() {
    const [form, setForm] = useState<FormModel>();
    const [report, setReport] = useState<ReportModel>();
    const user = useAuth();
    const state = useLocation();
    const { reportId } = state as any;

    const search = { code: "CN-KDĐV-UQ" }
    useEffect(() => {
        if (user?.token && search) {
            fetch(process.env.REACT_APP_API.concat(ApiRoute.getform, "?") + new URLSearchParams(search), {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer '.concat(user.token),
                }
            }).then(res => res.json()).then(data => {
                setForm(data.data);
            }).catch(error => console.log(error));
        }
    }, [user.token, search.code]);

    const query: ReportQueryModel = {
        pageNumber: 0,
        pageSize: 500,
        userId: user.userId,
        id: reportId,
    }

    useEffect(() => {
        if (form && user?.token && query) {
            fetch(process.env.REACT_APP_API.concat(ApiRoute.getreport), {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer '.concat(user.token),
                },
                body: JSON.stringify(query)
            }).then(res => res.json()).then((data) => {
                setReport((data.data as Array<ReportModel>)?.at(0))
            }).catch(error => console.log(error));
        }
    }, [query.id, query.dateEnd, query.dateStart, query.pageNumber, query.pageSize, query.userId, form?.attributes, form?.id])

    return (
        <>
            {form && report && <RenderForm form={form} reportvalue={report} />}
        </>
    );
}