import React, { useEffect, useState } from "react";
import { FormModel, RenderForm } from "Components/Shared/Form";
import { useAuth } from "Modules/hooks/useAuth";
import { ApiRoute } from "Api/ApiRoute";

export default function CreateReportPage() {
    const [form, setForm] = useState<FormModel>();
    const user = useAuth();

    console.log(user);
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
                console.log(data);
                setForm(data.data);
            }).catch(error => console.log(error));
        }
    }, [user.token, search.code]);

    return (
        <>
            {form && <RenderForm form={form} submitmethod={'POST'} />}
        </>
    );
}