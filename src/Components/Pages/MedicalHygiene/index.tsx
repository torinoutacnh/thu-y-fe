import { PageHeader, Button } from "antd";
import { getKeyThenIncreaseKey } from "antd/lib/message";
import { ReportType } from "Components/Shared/Form/Define/FormInterface";
import React from "react";
import { useNavigate } from "react-router-dom";
import { MapTable } from "../../Shared/Form/Define/CustomTable";
import { FileAddOutlined } from "@ant-design/icons";
import { medicalHygieneEndpoints } from "Components/router/MedicalHygieneRoutes";

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
              navigate(medicalHygieneEndpoints.createreport);
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
