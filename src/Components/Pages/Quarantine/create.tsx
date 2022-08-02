import React, { useEffect, useState } from "react";
import { RenderForm } from "Components/Shared/Form";
import { useAuth } from "Modules/hooks/useAuth";
import { ApiRoute, FormApiRoute } from "Api";
import { FormModel } from "Components/Shared/Models/Form";
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

  const [searchParams, setSearchParams] = useSearchParams();
  const code = searchParams.get("code");
  const navigate = useNavigate();

  if (!code) {
    navigate("/not-found", { replace: true });
  }

  if (!QuarantineReportType[code as any]) {
    return <h1>Biểu mẫu không tồn tại hoặc không thuộc chức vụ của bạn</h1>;
  }

  const search = { code: ReportType[Number(code)] };
  useEffect(() => {
    if (user?.token && search) {
      setLoading(true);
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
  }, [user.token, search.code]);

  return (
    <>
      {form && (
        <RenderForm
          form={form}
          submitmethod={"POST"}
          reportType={Number(search.code)}
        />
      )}
    </>
  );
}
