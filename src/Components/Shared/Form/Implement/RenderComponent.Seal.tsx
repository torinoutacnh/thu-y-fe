import { Form, Space, Select, Input, Button, Modal } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { ApiRoute } from "Api/ApiRoute";
import { useAuth } from "Modules/hooks/useAuth";
import { ReportModel, SealValueModel } from "Components/Shared/Models/Form";
import { useLoading } from "Modules/hooks/useLoading";
import { SealModel } from "Components/Shared/Models/Seal";

const SealFields = (props: { report?: ReportModel }) => {
  const [report, setReport] = useState<ReportModel>(props.report);
  const [seals, setSeals] = useState<SealModel[]>([]);
  const { user } = useAuth();
  const { setLoading } = useLoading();
  const [showAddSeal, setShowAddSeal] = useState<boolean>(false);

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
                      title="Basic Modal"
                      visible={showAddSeal}
                      onOk={() => setShowAddSeal(false)}
                      onCancel={() => setShowAddSeal(false)}
                    >
                      <p>Some contents...</p>
                      <p>Some contents...</p>
                      <p>Some contents...</p>
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
