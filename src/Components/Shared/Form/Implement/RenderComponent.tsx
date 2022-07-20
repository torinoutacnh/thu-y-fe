import {
  Input,
  Col,
  Form,
  Button,
  Space,
  Row,
  notification,
  FormInstance,
} from "antd";
import { RenderProps, ReportType } from "../Define/FormInterface";
import React, { useEffect } from "react";
import { useAuth } from "Modules/hooks/useAuth";
import { ReportModel } from "Components/Shared/Models/Form";
import { LeftOutlined, SaveOutlined, PlusOutlined } from "@ant-design/icons";

import { AnimalFields } from "./RenderComponent.Animal";
import { SealFields } from "./RenderComponent.Seal";
import { RenderFormAttrs } from "./RenderComponent.FormAttr";
import { useNavigate } from "react-router-dom";
import { useLoading } from "Modules/hooks/useLoading";
import { ApiRoute, ReportApiRoute } from "Api";
import { quarantineEndpoints } from "Components/router/QuarantineRoutes";
import { abattoirEndpoints } from "Components/router/AbattoirRoutes";
import { IconType } from "antd/lib/notification";

const RenderForm: React.FC<RenderProps> = ({
  form,
  reportvalue,
  submitmethod,
  reportType,
}) => {
  const [formref] = Form.useForm<ReportModel>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { setLoading } = useLoading();

  const openNotification = (
    message: string,
    type: IconType,
    onClose?: any,
    body?: string
  ) => {
    notification.open({
      duration: 2.5,
      message: message,
      description: body,
      type: type,
      onClose: onClose,
    });
  };

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
          console.log(data);
          
          if (!data.data) throw new Error("Thất bại !");
          openNotification("Thành công!", "success");
          if (
            reportType === ReportType["CN-KDĐV-UQ"] ||
            reportType === ReportType["ĐK-KDĐV-001"]
          ) {
            navigate(quarantineEndpoints.home);
          }
          if (reportType === ReportType["NK-001"]) {
            navigate(abattoirEndpoints.home);
          }
        })
        .catch((error) => {
          openNotification(error.message, "error");
          console.log(error);
        })
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
          console.log(data);

          // navigate(quarantineEndpoints.home);
        })
        .catch((error) => console.log(error))
        .finally(() => setLoading(false));
    }
  }

  useEffect(() => {
    if (reportvalue) {
      reportvalue.values.sort((a, b) => a.sort - b.sort);
      formref.resetFields(), [reportvalue];
    }
  }, [reportvalue?.id, form?.id]);

  const TransformReport = (report: ReportModel) => {
    report?.values.sort((a, b) => a.sort - b.sort);
    return report;
  };

  const RenderAnimalAndSealTabs = (
    reportType: ReportType,
    formref: FormInstance<ReportModel>,
    report: ReportModel
  ) => {
    switch (reportType) {
      case ReportType["CN-KDĐV-UQ"]: {
        return (
          <>
            <AnimalFields mainFormRef={formref} report={report} />
            <SealFields mainFormRef={formref} report={report} />
          </>
        );
      }
      case ReportType["ĐK-KDĐV-001"]: {
        return (
          <>
            <AnimalFields mainFormRef={formref} report={report} />
          </>
        );
      }
      case ReportType["NK-001"]: {
        return (
          <>
            <AnimalFields mainFormRef={formref} report={report} />
          </>
        );
      }
      case ReportType["BB-VSTY"]: {
        return <></>;
      }
      default:
        return <></>;
    }
  };

  return (
    <>
      {user && form && (
        <Form
          layout="horizontal"
          title={form.formName}
          onFinish={submit}
          form={formref}
          initialValues={TransformReport(reportvalue)}
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
          {/* <AnimalFields report={reportvalue} mainFormRef={formref} />
          {reportType && reportType === ReportType["CN-KDĐV-UQ"] && (
            <SealFields mainFormRef={formref} report={reportvalue} />
          )} */}
          {RenderAnimalAndSealTabs(reportType, formref, reportvalue)}
          <RenderFormAttrs form={form} />
          <Row align="middle" justify="center">
            <Form.Item>
              <Space>
                <Button
                  icon={<LeftOutlined />}
                  onClick={() => {
                    if (
                      reportType === ReportType["CN-KDĐV-UQ"] ||
                      reportType === ReportType["ĐK-KDĐV-001"]
                    ) {
                      navigate(quarantineEndpoints.home);
                    }
                    if (reportType === ReportType["NK-001"]) {
                      navigate(abattoirEndpoints.home);
                    }
                  }}
                >
                  Trở về
                </Button>
                {reportvalue ? (
                  <Button
                    icon={<SaveOutlined />}
                    type="primary"
                    htmlType="button"
                    onClick={UpdateAttribute}
                  >
                    Cập nhật
                  </Button>
                ) : (
                  <Button
                    icon={<PlusOutlined />}
                    type="primary"
                    htmlType="submit"
                  >
                    Tạo báo cáo
                  </Button>
                )}
              </Space>
            </Form.Item>
          </Row>
        </Form>
      )}
    </>
  );
};

export { RenderForm };
