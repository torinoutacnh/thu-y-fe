import React, { useEffect, useState } from "react";
import { useAuth } from "Modules/hooks/useAuth";
import { ApiRoute, FormApiRoute, ReportApiRoute } from "Api";
import { useParams } from "react-router-dom";
import { RenderForm } from "Components/Shared/Form";
import {
  FormModel,
  ReportModel,
  ReportQueryModel,
} from "Components/Shared/Models/Form";
import { ReportType } from "Components/Shared/Form/Define/FormInterface";

export default function UpdateVSYTReportPage() {
  const [form, setForm] = useState<FormModel>();
  const [report, setReport] = useState<ReportModel>();
  const { user } = useAuth();
  const { id } = useParams();

  const search = { code: "BB-VSTY" };
  useEffect(() => {
    if (user?.token && search.code) {
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
        .catch((error) => console.log(error));
    }
  }, [user.token, search.code]);

  useEffect(() => {
    if (id && form && user?.token) {
      fetch(
        process.env.REACT_APP_API.concat(ReportApiRoute.getSingleReport, "?") +
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
          reportType={ReportType["BB-VSTY"]}
        />
      )}
    </>
  );
}
