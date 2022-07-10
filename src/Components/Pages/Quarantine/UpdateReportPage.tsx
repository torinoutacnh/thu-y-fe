/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { FormModel, RenderForm, ReportModel } from "Components/Shared/Form";
import { useAuth } from "Modules/hooks/useAuth";
import { ApiRoute } from "Api/ApiRoute";
import { ReportQueryModel } from ".";
import { useParams } from "react-router-dom";

export default function UpdateReportPage() {
    const [form, setForm] = useState<FormModel>();
    const [report, setReport] = useState<ReportModel>();
    const user = useAuth();
    const { id } = useParams();

    const search = { code: "CN-KDĐV-UQ" }
    useEffect(() => {
        if (user?.token && search) {
            fetch(process.env.REACT_APP_API.concat(ApiRoute.getform, "?") + new URLSearchParams(search), {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer '.concat(user.token),
                    //'Access-Control-Allow-Origin': "*",
                    //'Access-Control-Allow-Credentials': 'true'
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
        id: id,
    }

    useEffect(() => {
        if (id && form && user?.token && query) {
            fetch(process.env.REACT_APP_API.concat(ApiRoute.getreport), {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer '.concat(user.token),
                },
                body: JSON.stringify(query)
            }).then(res => res.json()).then((data) => {
                console.log(data);
                setReport((data.data as Array<ReportModel>)?.find(x => x.id === id))
            }).catch(error => console.log(error));
        }
    }, [query.id, query.dateEnd, query.dateStart, query.pageNumber, query.pageSize, query.userId, form?.attributes, form?.id])

    return (
        <>
            {form && report?.values && <RenderForm form={form} reportvalue={report} submitmethod={"POST"} apiRoute={ApiRoute.updatereport} />}
        </>
    );
}