import React, { useEffect, useState } from "react";
import { RenderForm } from "Components/Shared/Form";
import { useAuth } from "Modules/hooks/useAuth";
import { ApiRoute, FormApiRoute } from "Api";
import { FormModel } from "Components/Shared/Models/Form";
import { ReportType } from "Components/Shared/Form/Define/FormInterface";
import { useLoading } from "Modules/hooks/useLoading";
import { useParams, useSearchParams } from "react-router-dom";

export default function CreateVSYTReportPage() {
  const [form, setForm] = useState<FormModel>();
  const { user } = useAuth();
  const { setLoading } = useLoading();
  const [searchParams, setSearchParams] = useSearchParams();

  const search = { code: "BB-VSTY" };
  useEffect(() => {
    if (user?.token && search) {
      setLoading(true);
      fetch(
        process.env.REACT_APP_API.concat(FormApiRoute.getform, "?") +
          new URLSearchParams(search),
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer ".concat(user.token),
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          setForm(data.data);
        })
        .catch((error) => console.log(error))
        .finally(() => setLoading(false));
    }
  }, [user.token, search.code]);

  return (
    <>
      {form && (
        <RenderForm
          form={form}
          submitmethod={"POST"}
          reportType={ReportType["BB-VSTY"]}
        />
      )}
    </>
  );
}
