import { Form, Space, Select, Input, Button } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { AnimalPaging, AnimalModel } from "Components/Shared/Models/Animal";
import React, { useEffect, useState } from "react";
import { ApiRoute } from "Api/ApiRoute";
import { useAuth } from "Modules/hooks/useAuth";
import { ReportModel, SealValueModel } from "Components/Shared/Models/Form";
import { useLoading } from "Modules/hooks/useLoading";

const SealFields = (props: { report?: ReportModel }) => {
  const [searchSeal, setSearchSeal] = useState<AnimalPaging>({
    pageNumber: 0,
    pageSize: 200,
  });
  const [seals, setSeals] = useState<SealValueModel[]>([]);
  const { user } = useAuth();
  const { setLoading } = useLoading();

  useEffect(() => {
    if (searchSeal) {
      setLoading;
      true;
      fetch(process.env.REACT_APP_API.concat(ApiRoute.getanimals), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer ".concat(user.token),
        },
        body: JSON.stringify(searchSeal),
      })
        .then((res) => res.json())
        .then((data) => {
          setSeals(data.data);
        })
        .catch((error) => console.log(error))
        .finally(() => setLoading(false));
    }
  }, [searchSeal.pageNumber, searchSeal.pageSize]);

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
                        name={[field.name, "animalId"]}
                        rules={[
                          {
                            required: true,
                            message: "Chọn loại động vật!",
                          },
                        ]}
                        labelCol={{ span: 12 }}
                        wrapperCol={{ span: 12 }}
                      >
                        <Select style={{ width: 150 }}>
                          {seals.map((item) => (
                            <Select.Option key={item.id} value={item.id}>
                              {item.name}
                            </Select.Option>
                          ))}
                        </Select>
                      </Form.Item>
                    )}
                  </Form.Item>
                  <Form.Item
                    {...field}
                    label="Số lượng"
                    name={[field.name, "amount"]}
                    labelCol={{ span: 12 }}
                    wrapperCol={{ span: 12 }}
                    rules={[
                      {
                        required: true,
                        type: "number",
                        transform(value) {
                          return parseFloat(value);
                        },
                        message: "Hãy điền số lượng!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item>
                    <MinusCircleOutlined onClick={() => remove(field.name)} />
                  </Form.Item>
                </Space>
              ))}

              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                >
                  Thêm vé
                </Button>
              </Form.Item>
            </>
          );
        }}
      </Form.List>
    </Form.Item>
  );
};

export { SealFields };
