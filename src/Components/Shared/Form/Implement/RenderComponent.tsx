import { Input, Col, Form, Button } from "antd";
import { RenderProps, ReportType } from "../Define/FormInterface";
import React, { useEffect } from "react";
import { useAuth } from "Modules/hooks/useAuth";
import {
  AttributeModel,
  ReportModel,
  UpdateReportAttrsModel,
} from "Components/Shared/Models/Form";

import { AnimalFields } from "./RenderComponent.Animal";
import { SealFields } from "./RenderComponent.Seal";
import { RenderFormAttrs } from "./RenderComponent.FormAttr";
import { useNavigate } from "react-router-dom";
import { useLoading } from "Modules/hooks/useLoading";
import { ApiRoute, ReportApiRoute } from "Api";
import { quarantineEndpoints } from "Components/router/QuarantineRoutes";

const RenderForm: React.FC<RenderProps> = ({
  form,
  reportvalue,
  submitmethod,
  isQuarantined,
}) => {
  const [formref] = Form.useForm<ReportModel>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { setLoading } = useLoading();

  function submit() {
    console.log(formref.getFieldsValue());
    if (user?.token) {
      setLoading(true);
      fetch(process.env.REACT_APP_API.concat(ReportApiRoute.create), {
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
          navigate(quarantineEndpoints.home);
        })
        .catch((error) => console.log(error))
        .finally(() => setLoading(false));
    }
  }

  function UpdateAttribute() {
    if (user?.token) {
      setLoading(true);
      fetch(process.env.REACT_APP_API.concat(ReportApiRoute.update), {
        method: submitmethod,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer ".concat(user.token),
        },
        body: JSON.stringify(formref.getFieldsValue()),
      })
        .then((res) => res.json())
        .then((data) => {
          navigate(quarantineEndpoints.home);
        })
        .catch((error) => console.log(error))
        .finally(() => setLoading(false));
    }
  }

  useEffect(() => {
    if (reportvalue) {
      formref.resetFields(), [reportvalue];
    }
  }, [reportvalue?.id, form?.id]);

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
          <Form.Item>
            <h2>
              {form.formCode} - {form.formNumber}
            </h2>
          </Form.Item>
          <Form.Item name={"id"} initialValue={reportvalue?.id} hidden={true}>
            <Input />
          </Form.Item>
          <Form.Item
            name={"reportId"}
            initialValue={reportvalue?.id}
            hidden={true}
          >
            <Input />
          </Form.Item>
          <Form.Item name={"formId"} initialValue={form.id} hidden={true}>
            <Input />
          </Form.Item>
          <Form.Item name={"name"} initialValue={form.formName} hidden={true}>
            <Input />
          </Form.Item>
          <Form.Item name={"userId"} initialValue={user.userId} hidden={true}>
            <Input />
          </Form.Item>
          <Form.Item name={"type"} initialValue={0} hidden={true}>
            <Input />
          </Form.Item>
          <AnimalFields report={reportvalue} mainFormRef={formref} />
          {isQuarantined && isQuarantined === ReportType.QuarantineReport && (
            <SealFields mainFormRef={formref} report={reportvalue} />
          )}
          <RenderFormAttrs form={form} />
          {reportvalue ? (
            <Form.Item wrapperCol={{ offset: 11 }}>
              <Button
                type="primary"
                htmlType="button"
                onClick={UpdateAttribute}
              >
                Cập nhật
              </Button>
            </Form.Item>
          ) : (
            <Form.Item wrapperCol={{ offset: 11 }}>
              <Button type="primary" htmlType="submit">
                Lưu
              </Button>
            </Form.Item>
          )}
        </Form>
      )}
    </>
  );
};

export { RenderForm };
