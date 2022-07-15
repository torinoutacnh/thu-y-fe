import {
  Form,
  Space,
  Select,
  Input,
  Button,
  Modal,
  FormListFieldData,
} from "antd";
import {
  MinusCircleOutlined,
  PlusOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import React, { useEffect, useRef, useState } from "react";
import { ApiRoute, SealTabApiRoute } from "Api/ApiRoute";
import { useAuth } from "Modules/hooks/useAuth";
import { ReportModel, SealValueModel } from "Components/Shared/Models/Form";
import { useLoading } from "Modules/hooks/useLoading";
import { SealModel, UpdateSealTabModel } from "Components/Shared/Models/Seal";
import { AnimalModel } from "Components/Shared/Models/Animal";
import { FormInstance, FormListProps } from "antd/lib/form";

const SealFields = (props: {
  mainFormRef: FormInstance;
  report?: ReportModel;
}) => {
  const { mainFormRef } = props;
  const [report, setReport] = useState<ReportModel>(props.report);
  const [seals, setSeals] = useState<SealModel[]>([]);
  const { user } = useAuth();
  const { setLoading } = useLoading();
  const [showAddSeal, setShowAddSeal] = useState<boolean>(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const keyRef = useRef(0);

  const getKey = () => {
    keyRef.current = keyRef.current + 1;
    return keyRef.current;
  };

  const [form] = Form.useForm<SealModel>();
  const Cancel = () => {
    form.resetFields();
    setShowAddSeal(false);
  };

  const AddSeal = (add: any) => {
    const val = form.getFieldsValue();
    if (user) {
      setConfirmLoading(true);
      fetch(process.env.REACT_APP_API.concat(SealTabApiRoute.create), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer ".concat(user.token),
        },
        body: JSON.stringify(val),
      })
        .then((res) => {
          if (res.status >= 500) throw new Error("Lỗi hệ thống! Thử lại sau.");
          if (res.status >= 400)
            throw new Error(`${res.status} : ${res.statusText}`);
          return res.json();
        })
        .then((data) => {
          if (data.data) {
            val.id = data.data;
            add(val);
          } else throw new Error(data.message);
        })
        .catch((error) => console.log(error))
        .finally(() => {
          setShowAddSeal(false);
          setConfirmLoading(false);
          form.resetFields();
        });
    }
  };

  const deleteTag = (idx: number, remove: any) => {
    if (user) {
      setLoading(true);
      fetch(process.env.REACT_APP_API.concat(SealTabApiRoute.delete), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer ".concat(user.token),
        },
        body: JSON.stringify({
          id: mainFormRef.getFieldValue("sealTabs")[idx].id,
        }),
      })
        .then((res) => {
          if (res.status >= 500) throw new Error("Lỗi hệ thống! Thử lại sau.");
          if (res.status >= 400)
            throw new Error(`${res.status} : ${res.statusText}`);
          return res.json();
        })
        .then((data) => {
          console.log(data);
          remove(idx);
        })
        .catch((error) => console.log(error))
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const SaveSealTab = () => {
    if (user) {
      setLoading(true);
      fetch(process.env.REACT_APP_API.concat(SealTabApiRoute.update), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer ".concat(user.token),
        },
        body: JSON.stringify(mainFormRef.getFieldsValue()),
      })
        .then((res) => {
          if (res.status >= 500) throw new Error("Lỗi hệ thống! Thử lại sau.");
          if (res.status >= 400)
            throw new Error(`${res.status} : ${res.statusText}`);
          return res.json();
        })
        .then((data) => {
          console.log(data);
        })
        .catch((error) => console.log(error))
        .finally(() => {
          setLoading(false);
        });
    }
  };

  useEffect(() => {
    if (user) {
      setLoading;
      true;
      fetch(process.env.REACT_APP_API.concat(ApiRoute.getseals), {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer ".concat(user.token),
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setSeals(data.data);
        })
        .catch((error) => console.log(error))
        .finally(() => setLoading(false));
    }
  }, [user.token, user.userId]);

  return (
    <Form.Item
      label="Danh sách vé"
      labelCol={{ span: 24 }}
      style={{ paddingRight: 30 }}
      shouldUpdate={(prevValues, curValues) =>
        prevValues.sealTabs !== curValues.sealTabs
      }
    >
      <Form.List name={"sealTabs"}>
        {(fields, { add, remove }) => {
          return (
            <>
              {fields.map((field) => (
                <Space
                  key={field.key}
                  style={{ display: "flex", marginBottom: 8 }}
                  align="baseline"
                >
                  <>
                    <Form.Item
                      key={getKey()}
                      {...field}
                      name={"id"}
                      hidden={true}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      {...field}
                      label="Loại vé"
                      key={getKey()}
                      name={[field.name, "sealName"]}
                      rules={[
                        {
                          required: true,
                          message: "Mời chọn loại vé!",
                        },
                      ]}
                    >
                      <Select style={{ width: 150 }}>
                        {seals.map((item) => (
                          <Select.Option key={item.id} value={item.sealName}>
                            {item.sealName}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                    <Form.Item
                      {...field}
                      label="Mã vé"
                      key={getKey()}
                      name={[field.name, "sealCode"]}
                      rules={[
                        {
                          required: true,
                          message: "Hãy điền mã vé!",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                    {report ? (
                      <MinusCircleOutlined
                        onClick={() => deleteTag(field.name, remove)}
                      />
                    ) : (
                      <MinusCircleOutlined onClick={() => remove(field.name)} />
                    )}
                  </>
                </Space>
              ))}

              <Form.Item>
                {report ? (
                  <>
                    <Button
                      type="dashed"
                      onClick={() => setShowAddSeal(true)}
                      block
                      icon={<PlusOutlined />}
                    >
                      Thêm vé
                    </Button>
                    <Modal
                      title="Thêm vé"
                      visible={showAddSeal}
                      onCancel={Cancel}
                      footer={
                        <>
                          <Button
                            type="default"
                            htmlType="button"
                            onClick={Cancel}
                          >
                            Hủy bỏ
                          </Button>
                          <Button
                            form="create-seal-form"
                            type="primary"
                            loading={confirmLoading}
                            htmlType="submit"
                          >
                            Thêm mới
                          </Button>
                        </>
                      }
                    >
                      <Form
                        id="create-seal-form"
                        layout="vertical"
                        form={form}
                        onFinish={() => {
                          AddSeal(add);
                        }}
                        disabled={confirmLoading}
                      >
                        <Form.Item
                          name={"reportTicketId"}
                          initialValue={report.id}
                          hidden={true}
                        >
                          <Input />
                        </Form.Item>
                        <Form.Item name={"id"} hidden={true}>
                          <Input />
                        </Form.Item>
                        <Form.Item
                          label={"Loại vé"}
                          name={"sealName"}
                          rules={[
                            {
                              required: true,
                              message: "Chọn loại vé!",
                            },
                          ]}
                        >
                          <Select>
                            {seals.map((item) => (
                              <Select.Option
                                key={item.id}
                                value={item.sealName}
                              >
                                {item.sealName}
                              </Select.Option>
                            ))}
                          </Select>
                        </Form.Item>
                        <Form.Item
                          label={"Mã vé"}
                          name={"sealCode"}
                          rules={[
                            {
                              required: true,
                              message: "Nhập mã vé!",
                              type: "string",
                            },
                          ]}
                        >
                          <Input />
                        </Form.Item>
                      </Form>
                    </Modal>
                    <Button
                      type="primary"
                      style={{ marginTop: 20 }}
                      onClick={SaveSealTab}
                      block
                      icon={<SaveOutlined />}
                    >
                      Lưu thông tin vé
                    </Button>
                  </>
                ) : (
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}
                  >
                    Thêm vé
                  </Button>
                )}
              </Form.Item>
            </>
          );
        }}
      </Form.List>
    </Form.Item>
  );
};

export { SealFields };
