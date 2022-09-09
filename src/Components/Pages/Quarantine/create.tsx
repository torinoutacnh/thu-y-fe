import { useEffect, useState } from "react";
import { RenderForm } from "Components/Shared/reports";
import { useAuth } from "Modules/hooks/useAuth";
import { FormApiRoute } from "Api";
import { FormModel } from "Components/Shared/Models/Form";
import { QuarantineReportType, ReportType } from "Components/Shared/reports";
import { useLoading } from "Modules/hooks/useLoading";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Input, RadioChangeEvent, Row, Radio, Col } from "antd";

export default function CreateQuarantineReportPage() {
  const [form, setForm] = useState<FormModel>();
  const { user } = useAuth();
  const { setLoading } = useLoading();

  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");
  const id = searchParams.get("id");
  const pdf1 = searchParams.get("pdf1");
  const pdf7 = searchParams.get("pdf7");

  const navigate = useNavigate();
  const { Search } = Input
  const [typeF, setTypeF] = useState<string>(ReportType[Number(code)])
  const [numberSearch, setNumberSearch] = useState<string>()


  if (!code || !QuarantineReportType[Number(code)]) {
    navigate("/not-found", { replace: true });
  }

  async function Load() {
    setLoading(true);
    const search = { code: typeF, refReportId: id ?? " ", refReportNumber: numberSearch ?? "" };
    const path =
      process.env.REACT_APP_API.concat(FormApiRoute.getform, "?") +
      new URLSearchParams(search as any);
    const res = await fetch(path, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer ".concat(user.token),
      },
    });

    const data = await res.json();

    if (res.status >= 400) console.log(data.message)

    setForm(data.data);
    console.log("get form >>>> ", data.data);
    setLoading(false)
  }


  useEffect(() => {
    if (user && code) {
      setLoading(true);
      const search = { code: typeF, refReportId: id ?? " ", refReportNumber: numberSearch ?? "" };
      const path =
        process.env.REACT_APP_API.concat(FormApiRoute.getform, "?") +
        new URLSearchParams(search as any);
      fetch(path, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer ".concat(user.token),
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setForm(data.data);
          console.log("get form >>>> ", data.data);

          console.log(data.data, path);
        })
        .catch((error) => console.log(error))
        .finally(() => setLoading(false));
      // Load()
    }
  }, [user?.userId, id, typeF, numberSearch]);

  useEffect(() => {
    setTypeF(ReportType[Number(code)])
  }, [code])


  const onChangeRadioTypeF = (e: RadioChangeEvent) => {
    setForm(null)
    setTypeF(e.target.value as string)
  }

  const onSearch = (value: string) => setNumberSearch(value)


  return (
    <>
      {form && (
        <>
          <Row style={{ marginBottom: "20px" }}>
            <Col xs={24} sm={12} md={12} lg={12} style={{ display: "flex", justifyContent: "center" }}>
              <Radio.Group value={typeF} onChange={(e: RadioChangeEvent) => onChangeRadioTypeF(e)}>
                <Radio value={ReportType[2]}>{ReportType[2]}</Radio>
                <Radio value={ReportType[3]}>{ReportType[3]}</Radio>
                <Radio value={ReportType[1]}>{ReportType[1]}</Radio>
              </Radio.Group>
            </Col>
            <Col xs={24} sm={12} md={12} lg={12} style={{ display: "flex", justifyContent: "center" }}>
              <Search placeholder="Số" onSearch={onSearch} style={{ width: 200 }} />
            </Col>
          </Row>
          <RenderForm
            form={form}
            submitmethod={"POST"}
            reportType={ReportType[typeF]}
            pdf1={pdf1}
            pdf7={pdf7}
          />
        </>
      )}
    </>
  );
}
