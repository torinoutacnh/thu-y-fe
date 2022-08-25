import { useState } from "react";
import { Button, Col, Input, Row, Space } from "antd";
import { useAuth } from "Modules/hooks/useAuth";
import { useLoading } from "Modules/hooks/useLoading";
import { Form, Modal, notification } from "antd";
import { ManageReceiptRoute } from "Api";
import { useNavigate, useSearchParams } from "react-router-dom";
import { manageReceiptEndpoints } from "Components/router/routes";
import { RouteEndpoints } from "Components/router";
import { AllocateModel } from "Components/Shared/Models/Allocate";
import "../ManageReceipt/modal.scss"
import useWindowSize from "Modules/hooks/useWindowSize";

export function CreateReceiptReport(props: any) {
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();
  const { user } = useAuth();
  const { setLoading } = useLoading();
  const navigate = useNavigate();

  const dataAllocate: AllocateModel = props.dataAllocate

  notification.config({
    placement: "topRight",
    bottom: 50,
    duration: 3,
    rtl: true,
  });
  type NotificationType = "success" | "info" | "warning" | "error";
  const openNotificationWithIcon = (type: NotificationType, title: string) => {
    notification[type]({
      message: title,
    });
  };

  function getCurrentDateTime() {
    const tzoffset = new Date().getTimezoneOffset() * 60000; //offset in milliseconds
    const localISOTime = new Date(Date.now() - tzoffset).toISOString();
    const mySqlDT = localISOTime;
    return mySqlDT;
  }

  const CreateReceiptReportFinish = () => {


    const receiptReport = {
      id: "id",
      userId: dataAllocate.userId,
      userName: dataAllocate.userName,
      receiptAllocateId: dataAllocate.id,
      receiptName: dataAllocate.receiptName,
      codeName: dataAllocate.codeName,
      codeNumber: dataAllocate.codeNumber,
      dateUse: getCurrentDateTime(),
      pageUse: form.getFieldValue("pageUse"),
    };

    if (receiptReport.pageUse > dataAllocate.remainPage) {
      alert("Số trang còn lại không đủ để sử dụng")
      return
    }

    // console.log("receiptReport >>>>>>>> ", receiptReport)

    if (user?.token) {
      setVisible(false);
      setLoading(true);
      fetch(
        process.env.REACT_APP_API.concat(
          ManageReceiptRoute.createReceiptReport
        ),
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer ".concat(user.token),
          },
          body: JSON.stringify(receiptReport),
        }
      )
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          console.log("create receiptReport ok >>>>>>> ", data);
          openNotificationWithIcon("success", "Sử dụng hóa đơn thành công");
          form.resetFields();
          props.onClickFinishModal()
          setLoading(false);
        })
        .catch((error) => {
          console.log("create receiptReport error >>>>>>> ", error);
          openNotificationWithIcon("error", "Sử dụng hóa đơn thất bại");
          setLoading(false);
        });
    }
  };
  const windowSize = useWindowSize();

  return (
    <>
      <div className="modal-container" >
        <div className="modal-click-close" onClick={() => { props.onClickHideModal() }}></div>
        <div className="modal-body" style={{ width: windowSize.width > 768 ? "40%" : "90%" }}>

          <Row>
            <Col xs={24} sm={6} md={3} lg={3}></Col>
            <Col xs={24} sm={12} md={16} xl={16}>
              <h3 style={{ marginBottom: "20px", textAlign: "center" }}>Sử dụng hóa đơn: {dataAllocate.receiptName}</h3>
              <Form
                id="create-receipt-report-form"
                layout="vertical"
                form={form}
                onFinish={CreateReceiptReportFinish}
              >
                {/* /////////////////////////////////////////// */}

                <Form.Item
                  label={"Tên hóa đơn sử dụng"}
                  name={"receiptName"}
                  rules={[
                    {
                      required: true,
                      message: "Nhập số lượng",
                      type: "string",
                    },
                  ]}
                  initialValue={dataAllocate.receiptName}
                  hidden={true}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label={"Số trang sử dụng"}
                  name={"pageUse"}
                  rules={[
                    {
                      required: true,
                      message: "Nhập số lượng",
                    },
                    {
                      message: "Bao gồm các số 0-9!",
                      pattern: new RegExp("[0-9]"),
                    },
                  ]}
                >
                  <Input />
                </Form.Item>


                {/* /////////////////////////////////////////// */}
              </Form>
              <Form.Item style={{ marginTop: "10px", }} >
                <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
                  <Space>
                    <Button
                      onClick={() => { props.onClickHideModal() }}
                      danger
                    >
                      Huỷ bỏ
                    </Button>

                    <Button
                      form="create-receipt-report-form"
                      type="primary"
                      loading={confirmLoading}
                      htmlType="submit"
                    >
                      Thêm mới
                    </Button>

                  </Space>
                </div>
              </Form.Item>
            </Col>
            <Col xs={24} sm={6} md={3} lg={3}></Col>
          </Row>

        </div>
      </div>
    </>
  );
}
