import { PageHeader, Button } from "antd";
import { getKeyThenIncreaseKey } from "antd/lib/message";
import { useNavigate } from "react-router-dom";
import { FileAddOutlined } from "@ant-design/icons";
import { quarantineEndpoints } from "Components/router/routes";
import { MapTable, ReportType } from "Components/Shared/reports";

const RegisterQuarantinePage = () => {
  const navigate = useNavigate();
  return (
    <>
      <PageHeader
        title="Đăng ký kiểm dịch động vật"
        extra={[
          <Button
            key={getKeyThenIncreaseKey()}
            icon={<FileAddOutlined />}
            type="primary"
            onClick={() => {
              const params = { code: ReportType["ĐK-KDĐV-001"] };
              const path =
                quarantineEndpoints.createreport.concat("?") +
                new URLSearchParams(params as any);
              navigate(path);
            }}
          >
            Tạo báo cáo
          </Button>,
        ]}
      />
      <MapTable reportType={ReportType["ĐK-KDĐV-001"]} />
    </>
  );
};

export default RegisterQuarantinePage;
