import { PDFViewer } from "@react-pdf/renderer";
import { Button, Modal } from "antd";
import { useEffect, useState } from "react";
import { PrinterOutlined } from "@ant-design/icons";
import { PDF7 } from "../PDF/PDF7";
import { ReportApiRoute } from "Api";
import { ReportModel } from "Components/Shared/Models/Form";
import { useAuth } from "Modules/hooks/useAuth";

export default function PrintPopup(props: { id: string }) {
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [report, setReport] = useState<ReportModel>();
  const { user } = useAuth();
  const { id } = props;

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setVisible(false);
    }, 3000);
  };

  const handleCancel = () => {
    setVisible(false);
  };

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

  return (
    <>
      <Button type="link" onClick={showModal} icon={<PrinterOutlined />}>
        In
      </Button>
      <Modal
        visible={visible}
        title=""
        onOk={handleOk}
        onCancel={handleCancel}
        closable={false}
        width={"96%"}
        bodyStyle={{ height: "100vh", margin: 0, padding: 0 }}
        style={{ top: 20 }}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Return
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={loading}
            onClick={handleOk}
          >
            Submit
          </Button>,
        ]}
      >
        {report && (
          <PDFViewer width={"100%"} height={"100%"} style={{ border: 0 }}>
            <PDF7 />
          </PDFViewer>
        )}
      </Modal>
    </>
  );
}
