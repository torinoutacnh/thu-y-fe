import { Input, Col, Form, Button } from "antd";
import { RenderProps, ReportType } from "../Define/FormInterface";
import React from "react";
import { useAuth } from "Modules/hooks/useAuth";
import { AttributeModel } from "Components/Shared/Models/Form";

import { AnimalFields } from "./RenderComponent.Animal";
import { SealFields } from "./RenderComponent.Seal";
import { RenderFormAttrs } from "./RenderComponent.FormAttr";
import { useNavigate } from "react-router-dom";
import { RouteEndpoints } from "Components/router/MainRouter";
import { useLoading } from "Modules/hooks/useLoading";

const RenderForm: React.FC<RenderProps> = ({
  form,
  reportvalue,
  submitmethod,
  apiRoute,
  isQuarantined,
}) => {
  const [formref] = Form.useForm<any>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { setLoading } = useLoading();

  function submit() {
    console.log(formref.getFieldsValue());
    if (user?.token) {
      setLoading(true);
      fetch(process.env.REACT_APP_API.concat(apiRoute), {
        method: submitmethod,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer ".concat(user.token),
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Request-Method": submitmethod,
        },
        body: JSON.stringify(formref.getFieldsValue()),
      })
        .then((res) => res.json())
        .then((data) => {
          navigate(RouteEndpoints.quarantine.basepath);
        })
        .catch((error) => console.log(error))
        .finally(() => setLoading(false));
    }
  }

  return (
    <>
      {user && form && (
        <Form
          layout="horizontal"
          title={form.formName}
          onFinish={submit}
          form={formref}
          initialValues={reportvalue}
        >
          <Form.Item wrapperCol={{ span: 24 }}>
            <Col>
              <h2>
                {form.formCode} - {form.formNumber}
              </h2>
            </Col>
          </Form.Item>
          <Form.Item name={"formId"} initialValue={form.id} hidden={true} />
          <Form.Item name={"name"} initialValue={form.formName} hidden={true} />
          <Form.Item name={"userId"} initialValue={user.userId} hidden={true} />
          <Form.Item name={"type"} initialValue={0} hidden={true} />
          <AnimalFields report={reportvalue} />
          {isQuarantined && isQuarantined === ReportType.QuarantineReport && (
            <SealFields report={reportvalue} />
          )}
          <RenderFormAttrs form={form} />
          <Form.Item wrapperCol={{ offset: 11 }}>
            <Button type="primary" htmlType="submit">
              Lưu
            </Button>
          </Form.Item>
        </Form>
      )}
    </>
  );
};

export { RenderForm };
