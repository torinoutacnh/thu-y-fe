import { Row, Col, Form, Input, DatePicker, AutoComplete } from "antd";
import { FormApiRoute } from "Api";
import { publicEndpoints } from "Components/router/PublicRoutes";
import {
  AttributeModel,
  DataTypes,
  FormModel,
} from "Components/Shared/Models/Form";
import { useAuth } from "Modules/hooks/useAuth";
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { transform } from "typescript";

function RenderFormAttrs(props: { attributes: AttributeModel[] }) {
  const { attributes } = props;
  const keyref = useRef(0);
  return (
    <Row key={keyref.current++}>
      {attributes
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
                name={["values", idx, "sort"]}
                initialValue={attr.sortNo}
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
  const { user } = useAuth();
  const navigate = useNavigate();
  const [options, setOptions] = useState<{ value: string }[]>([]);

  if (!user) {
    navigate(publicEndpoints.login, { replace: true });
  }

  useEffect(() => {
    if (attr.dataType === DataTypes.TextControl) {
      fetch(
        process.env.REACT_APP_API.concat(FormApiRoute.getRecoment, "?") +
          new URLSearchParams({ attributeId: attr.id }),
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer ".concat(user.token),
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.data) {
            const transform = data.data.map((val: string) => {
              return { value: val };
            });
            setOptions(transform);
          }
        })
        .catch((error) => console.log(error));
    }
  }, []);

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
          {options ? (
            <AutoComplete options={options} style={{ width: "100%" }} />
          ) : (
            <Input />
          )}
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
          {/* <Input type={"number"} /> */}
          <Input />
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
          getValueProps={(i) => {
            return { value: i ? moment(i) : moment() };
          }}
        >
          <DatePicker
            defaultValue={moment()}
            style={{ width: "100%" }}
            format={"DD/MM/YYYY"}
          />
        </Form.Item>
      );
    }
  }
}

export { RenderFormAttrs };
