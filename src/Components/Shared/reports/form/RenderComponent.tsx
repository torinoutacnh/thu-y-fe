import {
  Input,
  Form,
  Button,
  Space,
  Row,
  notification,
  FormInstance,
  Radio,
  RadioChangeEvent,
  Col,
} from "antd";
import { RenderProps, ReportType } from "../interfaces/FormInterface";
import React, { useEffect, useState } from "react";
import { useAuth } from "Modules/hooks/useAuth";
import { ReportModel } from "Components/Shared/Models/Form";
import { LeftOutlined, SaveOutlined, PlusOutlined } from "@ant-design/icons";

import { AnimalFields } from "./RenderComponent.Animal";
import { SealFields } from "./RenderComponent.Seal";
import { RenderFormAttrs } from "./RenderComponent.FormAttr";
import { useNavigate } from "react-router-dom";
import { useLoading } from "Modules/hooks/useLoading";
import { ReportApiRoute } from "Api";
import {
  abattoirEndpoints,
  quarantineEndpoints,
} from "Components/router/routes";
import { IconType } from "antd/lib/notification";
import { LogLEvel } from "Components/Shared/Constant/LogLevel";
import useLog from "Modules/hooks/useLog";



const RenderForm: React.FC<RenderProps> = ({
  form,
  reportvalue,
  submitmethod,
  reportType,
  pdf1,
  pdf7
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

  const loglevel = useLog();

  const RedirectToPageNext = (reportType: ReportType) => {
    switch (reportType) {
      case ReportType["CN-KDĐV-UQ"]: {
        navigate(quarantineEndpoints.dkkd);
        break;
      }
      case ReportType["ĐK-KDĐV-001"]: {

        navigate(quarantineEndpoints.createreport + "?" + new URLSearchParams(
          {
            code: String(ReportType['BB-VSTY']),
            id: pdf1,
            pdf1: pdf1,
            pdf7: pdf7 ?? ""
          }),
          { replace: true });
        break;
      }
      case ReportType["BB-VSTY"]: {

        navigate(quarantineEndpoints.createreport + "?" + new URLSearchParams(
          {
            code: String(ReportType['CN-KDĐV-UQ']),
            id: pdf1,
            pdf1: pdf1,
            pdf7: pdf7
          }),
          { replace: true });
        break;
      }
      case ReportType["NK-001"]: {
        navigate(abattoirEndpoints.nkgm);
        break;
      }
      case ReportType["CN-KDSPĐV-UQ"]: {
        navigate(abattoirEndpoints.cnkdxkdv);
        break;
      }
    }
  };

  function submit() {
    console.log("submit create", formref.getFieldsValue());
    // return;

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
          openNotification("Thành công", "success");

          if (reportType === ReportType['ĐK-KDĐV-001']) {
            pdf1 = data.data
          }
          else if (reportType === ReportType["BB-VSTY"]) {
            pdf7 = data.data
          }
          formref.resetFields()
          console.log("report type", reportType);


          RedirectToPageNext(reportType);
        })
        .catch((error) => {
          openNotification(error.message, "error");
          if (LogLEvel.Dev === loglevel) {
            console.log(error);
          }
        })
        .finally(() => setLoading(false));
    }
  }


  function UpdateAttribute() {
    console.log("submit update",
      formref.getFieldsValue(),
    );
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
        .then((res) => {
          if (res.status >= 400) {
            openNotification("Cập nhật thất bại ", "error");
            throw new Error("error")
          }
          return res.json()
        })
        .then((data) => {
          console.log("update attbs => ", data);
          openNotification("Cập nhật thành công ", "success");
          // navigate(quarantineEndpoints.home);
        })
        .catch((error) => console.log(error))
        .finally(() => setLoading(false));
    }
  }

  useEffect(() => {
    // if (reportvalue) {
    //   reportvalue.values.sort((a, b) => a.sort - b.sort);
    //   formref.resetFields(), [reportvalue];
    // }

    reportvalue?.values.sort((a, b) => a.sort - b.sort);
    formref.resetFields(), [reportvalue];
  }, [reportvalue?.id, form]);

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
      case ReportType["CN-KDSPĐV-UQ"]: {
        return (
          <>
            <AnimalFields mainFormRef={formref} report={report} />
            <SealFields mainFormRef={formref} report={report} />
          </>
        );
      }
      default:
        return <></>;
    }
  };



  return (
    <>
      {user && form && (
        <>


          <Form
            layout="horizontal"
            title={form.formName}
            onFinish={submit}
            form={formref}
            initialValues={TransformReport(reportvalue)}
          >
            <Form.Item>
              <h3 style={{ textAlign: "center" }}>
                {form.formCode} - {form.formNumber}
              </h3>
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
            <Form.Item
              style={{ width: "40%" }}
              label={"Số"}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              name={"serialNumber"}
              initialValue={reportvalue?.serialNumber ?? null}
            >
              <Input />
            </Form.Item>
            {RenderAnimalAndSealTabs(reportType, formref, reportvalue)}
            <RenderFormAttrs form={form} />
            <Row align="middle" justify="center">
              <Form.Item>
                <Space>
                  <Button
                    icon={<LeftOutlined />}
                    onClick={() => {
                      RedirectToPageNext(reportType);
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
        </>
      )}
    </>
  );
};

export default RenderForm;
