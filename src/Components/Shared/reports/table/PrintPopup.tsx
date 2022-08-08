import { PDFViewer } from "@react-pdf/renderer";
import { Button, Modal } from "antd";
import { useEffect, useState } from "react";
import { PrinterOutlined } from "@ant-design/icons";
import { PDF7 } from "../PDF/PDF7";
import { ReportApiRoute } from "Api";
import { ReportModel } from "Components/Shared/Models/Form";
import { useAuth } from "Modules/hooks/useAuth";
import { ReportType } from "../interfaces/FormInterface";
import { PDF12B } from "../PDF/PDF12B";
import { PDF1 } from "../PDF/PDF1";
import { PDF12D } from "../PDF/PDF12D";

export default function PrintPopup() {
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [report, setReport] = useState<ReportModel>();
  const [id, setId] = useState<string>();
  const { user } = useAuth();

  const showModal = (id: string) => {
    setId(id);
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

  /**Create popup for pdf viewer
   * @param props
   * return pdf base on report type
   */
  const Popup = (props: { reportType: ReportType }) => {
    const { reportType } = props;
    const GetPDF = () => {
      switch (reportType) {
        case ReportType["CN-KDĐV-UQ"]: {
          return <PDF12B report={report} />;
        }
        case ReportType["CN-KDSPĐV-UQ"]: {
          return <PDF12D report={report} />;
        }
        case ReportType["BB-VSTY"]: {
          return <PDF7 report={report} />;
        }
        case ReportType["ĐK-KDĐV-001"]: {
          return <PDF1 />;
        }
      }
    };
    return (
      <>
        <Modal
          visible={visible}
          title=""
          onOk={handleOk}
          onCancel={handleCancel}
          closable={false}
          width={"96%"}
          bodyStyle={{ height: "100vh", margin: 0, padding: 0 }}
          style={{ top: 20 }}
          footer={
            [
              // <Button key="back" onClick={handleCancel}>
              //   Return
              // </Button>,
              // <Button
              //   key="submit"
              //   type="primary"
              //   loading={loading}
              //   onClick={handleOk}
              // >
              //   Submit
              // </Button>,
            ]
          }
        >
          {report && (
            <PDFViewer width={"100%"} height={"100%"} style={{ border: 0 }}>
              <GetPDF />
            </PDFViewer>
          )}
        </Modal>
      </>
    );
  };

  return { showModal, Popup };
}
