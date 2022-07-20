import { PageHeader, Button } from "antd";
import { getKeyThenIncreaseKey } from "antd/lib/message";
import { quarantineEndpoints } from "Components/router/QuarantineRoutes";
import { ReportType } from "Components/Shared/Form/Define/FormInterface";
import React from "react";
import { useNavigate } from "react-router-dom";
import { MapTable } from "../../Shared/Form/Define/CustomTable";
import { FileAddOutlined } from "@ant-design/icons";

const MedicalHygiene = () => {
  const navigate = useNavigate();
  return (
    <>
      <PageHeader
        title="Biên bản vệ sinh y tế"
        extra={[
          <Button
            key={getKeyThenIncreaseKey()}
            icon={<FileAddOutlined />}
            type="primary"
            onClick={() => {
              navigate(
                quarantineEndpoints.createreport.concat("?") +
                  new URLSearchParams({
                    reporttype: ReportType["BB-VSTY"],
                  } as any)
              );
            }}
          >
            Tạo báo cáo
          </Button>,
        ]}
      />
      <MapTable reportType={ReportType["BB-VSTY"]} />
    </>
  );
};

export { MedicalHygiene };
