import { useEffect, useState } from "react";
import { useAuth } from "Modules/hooks/useAuth";
import { FormApiRoute, ReportApiRoute } from "Api";
import { useSearchParams } from "react-router-dom";
import { RenderForm, ReportType } from "Components/Shared/reports";
import { FormModel, ReportModel } from "Components/Shared/Models/Form";
import { useLoading } from "Modules/hooks/useLoading";

export default function UpdateQuarantineReportPage() {
  const [form, setForm] = useState<FormModel>();
  const [report, setReport] = useState<ReportModel>();
  const { user } = useAuth();
  const [searchParams] = useSearchParams();
  const { setLoading } = useLoading();

  const id = searchParams.get("id");

  useEffect(() => {
    if (user?.token && report?.formId) {
      fetch(
        process.env.REACT_APP_API.concat(FormApiRoute.getform, "?") +
          new URLSearchParams({ code: report.formId }),
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
  }, [user.token, report?.formId]);

  useEffect(() => {
    if (id && user?.token) {
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
  }, [id, user?.token]);

  useEffect(() => {
    form?.id && report?.id ? setLoading(false) : setLoading(true);
  }, [form?.id, report?.id]);

  return (
    <>
      {form && report && (
        <RenderForm
          form={form}
          reportvalue={report}
          submitmethod={"POST"}
          reportType={ReportType[form?.formCode as any] as any}
        />
      )}
    </>
  );
}
