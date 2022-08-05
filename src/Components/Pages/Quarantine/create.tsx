import React, { useEffect, useState } from "react";
import { RenderForm } from "Components/Shared/Form";
import { useAuth } from "Modules/hooks/useAuth";
import { ApiRoute, FormApiRoute, ReportApiRoute } from "Api";
import { FormModel, ReportModel } from "Components/Shared/Models/Form";
import {
  QuarantineReportType,
  ReportType,
} from "Components/Shared/Form/Define/FormInterface";
import { useLoading } from "Modules/hooks/useLoading";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function CreateQuarantineReportPage() {
  const [form, setForm] = useState<FormModel>();
  const { user } = useAuth();
  const { setLoading } = useLoading();

  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");
  const id = searchParams.get("id");
  const navigate = useNavigate();

  if (!code || !QuarantineReportType[Number(code)]) {
    navigate("/not-found", { replace: true });
  }

  useEffect(() => {
    if (user && code) {
      setLoading(true);
      const search = { code: ReportType[Number(code)], refReportId: id };
      fetch(
        process.env.REACT_APP_API.concat(FormApiRoute.getform, "?") +
          new URLSearchParams(search as any),
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
  }, [user?.userId, code, id]);

  return (
    <>
      {form && (
        <RenderForm
          form={form}
          submitmethod={"POST"}
          reportType={Number(code)}
        />
      )}
    </>
  );
}
