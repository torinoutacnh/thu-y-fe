import { Form, Space, Select, Input, Button, Modal } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import React, { useEffect, useRef, useState } from "react";
import { ApiRoute } from "Api/ApiRoute";
import { useAuth } from "Modules/hooks/useAuth";
import { ReportModel, SealValueModel } from "Components/Shared/Models/Form";
import { useLoading } from "Modules/hooks/useLoading";
import { SealModel } from "Components/Shared/Models/Seal";
import { AnimalModel } from "Components/Shared/Models/Animal";

const SealFields = (props: { report?: ReportModel }) => {
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

  const [form] = Form.useForm<AnimalModel>();
  const Cancel = () => {
    form.resetFields();
    setShowAddSeal(false);
  };

  const AddSeal = (add: any) => {
    const val = form.getFieldsValue();
    console.log(val);

    if (user) {
      setConfirmLoading(true);
      fetch(process.env.REACT_APP_API.concat(ApiRoute.createSeal), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer ".concat(user.token),
        },
        body: JSON.stringify(val),
      })
        .then((res) => {
          if (res.status >= 500) throw new Error("System Error!");
          return res.json();
        })
        .then((data) => {
          if (data.data) add(val);
          throw new Error(data.message);
        })
        .catch((error) => console.log(error))
        .finally(() => {
          setShowAddSeal(false);
          setConfirmLoading(false);
          form.resetFields();
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
    >
      <Form.List name={"sealTabs"} initialValue={[]}>
        {(fields, { add, remove }) => {
          return (
            <>
              {fields.map((field) => (
                <Space key={field.key} align="baseline">
                  <Form.Item
                    noStyle
                    shouldUpdate={(prevValues, curValues) =>
                      prevValues.sealTabs !== curValues.sealTabs
                    }
                  >
                    {() => (
                      <Form.Item
                        {...field}
                        label="Loại vé"
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
                    )}
                  </Form.Item>
                  <Form.Item
                    {...field}
                    label="Mã vé"
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
                  <MinusCircleOutlined onClick={() => remove(field.name)} />
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
                      >
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
