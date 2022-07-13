import { Form, Space, Select, Input, Button, Radio, Checkbox, Row } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { AnimalPaging, AnimalModel } from "Components/Shared/Models/Animal";
import React, { useEffect, useRef, useState } from "react";
import { ApiRoute } from "Api/ApiRoute";
import { useAuth } from "Modules/hooks/useAuth";
import { ReportModel } from "Components/Shared/Models/Form";
import { useLoading } from "Modules/hooks/useLoading";

const AnimalFields = (props: { report?: ReportModel }) => {
  const [searchAnimal, setSearchAnimal] = useState<AnimalPaging>({
    pageNumber: 0,
    pageSize: 200,
  });
  const [animals, setAnimals] = useState<AnimalModel[]>([]);
  const { user } = useAuth();
  const { setLoading } = useLoading();
  const keyRef = useRef(0);
  const getkey = () => {
    keyRef.current = keyRef.current + 1;
    return keyRef.current;
  };

  useEffect(() => {
    if (searchAnimal) {
      setLoading(true);
      fetch(process.env.REACT_APP_API.concat(ApiRoute.getanimals), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer ".concat(user.token),
        },
        body: JSON.stringify(searchAnimal),
      })
        .then((res) => res.json())
        .then((data) => {
          setAnimals(data.data);
        })
        .catch((error) => console.log(error))
        .finally(() => setLoading(false));
    }
  }, [searchAnimal.pageNumber, searchAnimal.pageSize]);

  return (
    <Form.Item
      label="Danh sách động vật"
      labelCol={{ span: 24 }}
      wrapperCol={{ span: 24 }}
      style={{ paddingRight: 30 }}
    >
      <Form.List name={"listAnimals"} initialValue={[]}>
        {(fields, { add, remove }) => {
          return (
            <>
              {fields.map((field) => (
                <Space key={field.key} size="large" align="center">
                  <>
                    <Form.Item
                      noStyle
                      shouldUpdate={(prevValues, curValues) =>
                        prevValues.listAnimals !== curValues.listAnimals
                      }
                    >
                      {() => (
                        <Form.Item
                          {...field}
                          key={getkey()}
                          label="Động vật"
                          style={{ width: 200 }}
                          name={[field.name, "animalId"]}
                          rules={[
                            {
                              required: true,
                              message: "Chọn loại động vật!",
                            },
                          ]}
                        >
                          <Select>
                            {animals.map((item) => (
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
                      key={getkey()}
                      label="Số lượng"
                      name={[field.name, "amount"]}
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
                      <Input type={"number"} />
                    </Form.Item>
                    <Form.Item
                      {...field}
                      key={getkey()}
                      name={[field.name, "isCar"]}
                      initialValue={false}
                      valuePropName="checked"
                      label={"Xe"}
                    >
                      <Checkbox name="isCar" />
                    </Form.Item>
                    <Form.Item key={getkey()}>
                      <MinusCircleOutlined onClick={() => remove(field.name)} />
                    </Form.Item>
                  </>
                </Space>
              ))}

              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                >
                  Thêm động vật
                </Button>
              </Form.Item>
            </>
          );
        }}
      </Form.List>
    </Form.Item>
  );
};

export { AnimalFields };
