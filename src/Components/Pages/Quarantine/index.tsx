import { ApiRoute } from "Api/ApiRoute";
import { FormModel, ReportModel } from "Components/Shared/Form";
import { useAuth } from "Modules/hooks/useAuth";
import React, { useState, useEffect } from "react";

import { getKeyThenIncreaseKey } from "antd/lib/message";
import { CreateMapReportTable } from "Components/Shared/Form/Implement/FormMap";
import { Button, PageHeader } from "antd";
import { FileAddOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
import { RouteEndpoints } from "Components/router/MainRouter";
import { ReportQueryModel } from "Components/Shared/Form/Define/FormInterface";

const Quarantine = () => {
    const [reports, setReports] = useState<ReportModel[]>([]);
    const [form, setForm] = useState<FormModel>();
    const user = useAuth();
    const navigate = useNavigate();

    const query: ReportQueryModel = {
        pageNumber: 0,
        pageSize: 500,
        userId: user.userId,
    }

    const search = { code: "CN-KDĐV-UQ" }
    useEffect(() => {
        fetch(process.env.REACT_APP_API.concat(ApiRoute.getform, "?") + new URLSearchParams(search), {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '.concat(user.token),
            }
        }).then(res => res.json()).then(data => {
            setForm(data.data);
        }).catch(error => console.log(error));
    }, []);

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
                console.log(data);
                setReports(data.data)
            }).catch(error => console.log(error));
        }
    }, [query.id, query.dateEnd, query.dateStart, query.pageNumber, query.pageSize, query.userId, form?.attributes, form?.id])

    return (
        <>
            <PageHeader title="Báo cáo kiểm dịch"
                extra={[
                    <Button
                        key={getKeyThenIncreaseKey()}
                        icon={<FileAddOutlined />}
                        type="primary"
                        onClick={() => {
                            navigate(RouteEndpoints.quarantine.createreport)
                        }}
                    >
                        Tạo báo cáo
                    </Button>,
                ]}
            >
            </PageHeader>
            {form && reports && <CreateMapReportTable form={form} reports={reports.filter(x => x.formId === form.id)} />}
        </>
    )
};

export default Quarantine;