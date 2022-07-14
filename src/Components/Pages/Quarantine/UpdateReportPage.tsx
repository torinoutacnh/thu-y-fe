import React, { useEffect, useState } from "react";
import { useAuth } from "Modules/hooks/useAuth";
import { ApiRoute } from "Api/ApiRoute";
import { useParams } from "react-router-dom";
import { RenderForm } from "Components/Shared/Form";
import {
  FormModel,
  ReportModel,
  ReportQueryModel,
} from "Components/Shared/Models/Form";
import { ReportType } from "Components/Shared/Form/Define/FormInterface";

export default function UpdateReportPage() {
  const [form, setForm] = useState<FormModel>();
  const [report, setReport] = useState<ReportModel>();
  const { user } = useAuth();
  const { id } = useParams();

  const search = { code: process.env.REACT_APP_CODE_KIEM_DICH };
  useEffect(() => {
    if (user?.token && search.code) {
      fetch(
        process.env.REACT_APP_API.concat(ApiRoute.getform, "?") +
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
        .catch((error) => console.log(error));
    }
  }, [user.token, search.code]);

  useEffect(() => {
    if (id && form && user?.token) {
      fetch(
        process.env.REACT_APP_API.concat(ApiRoute.getSingleReport, "?") +
          new URLSearchParams({ reportId: id }),
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
          console.log(data);
          setReport(data.data);
        })
        .catch((error) => console.log(error));
    }
  }, [form?.attributes, form?.id]);

  return (
    <>
      {form && report && (
        <RenderForm
          form={form}
          reportvalue={report}
          submitmethod={"POST"}
          isQuarantined={ReportType.QuarantineReport}
        />
      )}
    </>
  );
}
