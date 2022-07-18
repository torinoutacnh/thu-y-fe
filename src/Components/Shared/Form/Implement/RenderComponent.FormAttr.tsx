import { Row, Col, Form, Input, DatePicker } from "antd";
import {
  AttributeModel,
  DataTypes,
  FormModel,
} from "Components/Shared/Models/Form";
import moment from "moment";
import React, { useRef } from "react";

function RenderFormAttrs(props: { form: FormModel }) {
  const { form } = props;
  const keyref = useRef(0);
  return (
    <Row key={keyref.current++}>
      {form.attributes
        .sort((x, y) => x.sortNo - y.sortNo)
        .map((attr, idx) => {
          return (
            <Col
              key={idx}
              lg={8}
              md={12}
              sm={12}
              xs={24}
              style={{ paddingRight: 30 }}
            >
              <Form.Item
                name={["values", idx, "attributeId"]}
                initialValue={attr.id}
                hidden={true}
                shouldUpdate={(prevValues, curValues) =>
                  prevValues.values !== curValues.values
                }
              >
                <Input />
              </Form.Item>
              <Form.Item
                name={["values", idx, "attributeName"]}
                initialValue={attr.name}
                hidden={true}
                shouldUpdate={(prevValues, curValues) =>
                  prevValues.values !== curValues.values
                }
              >
                <Input />
              </Form.Item>
              <RenderControl attr={attr} idx={idx} />
            </Col>
          );
        })}
    </Row>
  );
}

function RenderControl(props: { attr: AttributeModel; idx: number }) {
  const { attr, idx } = props;
  switch (attr.dataType) {
    case DataTypes.TextControl: {
      return (
        <Form.Item
          label={attr.name}
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          name={["values", idx, "value"]}
          shouldUpdate={(prevValues, curValues) =>
            prevValues.values !== curValues.values
          }
          initialValue={null}
        >
          <Input />
        </Form.Item>
      );
    }
    case DataTypes.NumberControl: {
      return (
        <Form.Item
          label={attr.name}
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          name={["values", idx, "value"]}
          shouldUpdate={(prevValues, curValues) =>
            prevValues.values !== curValues.values
          }

          initialValue={""}

          rules={[
            {
              required: true,
              type: "number",

              message: "Sai định dạng!",
              transform: (i) => Number(i),

            },
          ]}
        >
          <Input type={"number"} />
        </Form.Item>
      );
    }
    case DataTypes.DateControl: {
      return (
        <Form.Item
          label={attr.name}
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          name={["values", idx, "value"]}
          shouldUpdate={(prevValues, curValues) =>
            prevValues.values !== curValues.values
          }

          initialValue={moment()}

          getValueProps={(i) => {
            return { value: i ? moment(i) : moment() };
          }}

        >
          <DatePicker format={"DD/MM/YYYY"} />
        </Form.Item>
      );
    }
  }
}

export { RenderFormAttrs };
