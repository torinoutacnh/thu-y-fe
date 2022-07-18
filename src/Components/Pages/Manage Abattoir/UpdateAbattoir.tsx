import React, { useEffect, useState } from "react";
import { useAuth } from "Modules/hooks/useAuth";
import { ApiRoute, FormApiRoute, ReportApiRoute } from "Api";
import { useParams } from "react-router-dom";
import { RenderForm } from "Components/Shared/Form";
import { ManageAbattoirRoute } from "Api";
import { Button, Form, Input, Modal, Radio } from "antd";
import { PlusOutlined } from "@ant-design/icons";

import {
  FormModel,
  ReportModel,
  ReportQueryModel,
} from "Components/Shared/Models/Form";
import { ReportType } from "Components/Shared/Form/Define/FormInterface";
import { AbattoirModel } from "Components/Shared/Models/Abattoir";
const UpdateAbattoir = (props: any) => {
  const [form, setForm] = useState<FormModel>();
  const [abattoir, setAbattoir] = useState<AbattoirModel>();
  const { user } = useAuth();
  const { id } = useParams();
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const page = {
    pageNumber: 0,
    pageSize: 1000,
    id: id,
  };
  const [formdata] = Form.useForm();

  useEffect(() => GetAbattoir, [page.pageNumber, page.pageSize]);

  const GetAbattoir = () => {
    if (user?.token) {
      fetch(process.env.REACT_APP_API.concat(ManageAbattoirRoute.getAbattoir), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer ".concat(user.token),
        },
        body: JSON.stringify(page),
      })
        .then((res) => {
          console.log(res);
          return res.json();
        })
        .then((data) => {
          console.log(data);
          setAbattoir(data.data);
        })
        .catch((error) => console.log(error));
    }
  };
  console.log("check abatoir", abattoir);
  const showModal = () => {
    setVisible(true);
  };

  const Cancel = () => {
    formdata.resetFields();
    setVisible(false);
  };

  const CreateUser = () => {
    console.log("creatae");
  };

  return <>Not found</>;
};

export default UpdateAbattoir;
