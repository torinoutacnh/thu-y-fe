import { PageHeader, Button } from "antd";
import { getKeyThenIncreaseKey } from "antd/lib/message";
import { useNavigate } from "react-router-dom";
import { FileAddOutlined } from "@ant-design/icons";
import { MapTable, ReportType } from "Components/Shared/reports";
import { abattoirEndpoints } from "Components/router/routes";

const CNKDSPDV = () => {
  const navigate = useNavigate();
  return (
    <>
      <PageHeader
        title="Giấy chứng nhận kiểm dịch sản phẩm động vật ra khỏi địa bàn cấp tỉnh"
        extra={[
          <Button
            key={getKeyThenIncreaseKey()}
            icon={<FileAddOutlined />}
            type="primary"
            onClick={() => {
              const params = { code: ReportType["CN-KDSPĐV-UQ"] };
              const path =
                abattoirEndpoints.createreport.concat("?") +
                new URLSearchParams(params as any);
              navigate(path);
            }}
          >
            Tạo báo cáo
          </Button>,
        ]}
      />
      <MapTable reportType={ReportType["CN-KDSPĐV-UQ"]} />
    </>
  );
};

export default CNKDSPDV;
