import {
  Form,
  Space,
  Select,
  Input,
  Button,
  Radio,
  Checkbox,
  Row,
  Modal,
} from "antd";
import {
  MinusCircleOutlined,
  PlusOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import { AnimalPaging, AnimalModel } from "Components/Shared/Models/Animal";
import React, { useEffect, useRef, useState } from "react";
import { ApiRoute } from "Api/ApiRoute";
import { useAuth } from "Modules/hooks/useAuth";
import { ReportModel } from "Components/Shared/Models/Form";
import { useLoading } from "Modules/hooks/useLoading";
import form, { FormInstance } from "antd/lib/form";

const AnimalFields = (props: {
  report?: ReportModel;
  mainFormRef: FormInstance;
}) => {
  const [report, setReport] = useState<ReportModel>(props.report);
  const [searchAnimal, setSearchAnimal] = useState<AnimalPaging>({
    pageNumber: 0,
    pageSize: 200,
  });
  const [animals, setAnimals] = useState<AnimalModel[]>([]);
  const { user } = useAuth();
  const { setLoading } = useLoading();
  const [showAddAnimal, setShowAddAnimal] = useState<boolean>(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const keyRef = useRef(0);
  const getkey = () => {
    keyRef.current = keyRef.current + 1;
    return keyRef.current;
  };

  const [form] = Form.useForm<AnimalModel>();
  const Cancel = () => {
    form.resetFields();
    setShowAddAnimal(false);
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

  const AddAnimal = (add: any) => {
    return;
  };

  const SaveAnimalList = () => {
    return;
  };

  return (
    <Form.Item
      label="Danh sách động vật"
      labelCol={{ span: 24 }}
      style={{ paddingRight: 30 }}
      shouldUpdate={(prevValues, curValues) =>
        prevValues.listAnimals !== curValues.listAnimals
      }
    >
      <Form.List name={"listAnimals"}>
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
                      {...field}
                      key={getkey()}
                      label="Động vật"
                      style={{ width: 150 }}
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
                {report ? (
                  <>
                    <Button
                      type="dashed"
                      onClick={() => setShowAddAnimal(true)}
                      block
                      icon={<PlusOutlined />}
                    >
                      Thêm động vật
                    </Button>
                    <Modal
                      title="Thêm vé"
                      visible={showAddAnimal}
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
                          AddAnimal(add);
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
                            {animals.map((item) => (
                              <Select.Option key={item.id} value={item.id}>
                                {item.name}
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
                      onClick={SaveAnimalList}
                      block
                      icon={<SaveOutlined />}
                    >
                      Lưu danh sách động vật
                    </Button>
                  </>
                ) : (
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}
                  >
                    Thêm động vật
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

export { AnimalFields };
