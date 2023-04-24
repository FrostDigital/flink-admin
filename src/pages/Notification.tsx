import { Button, Card, Form, Input, PageHeader, Select, Skeleton, Space, message } from "antd";
import { useHistory, useParams } from "react-router-dom";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MessagingData, MessagingSegment } from "../schemas/Notification";
import { RootState } from "../store/store";
import { apiClient } from "../utils/api";

import { hide, show } from "../store/features/loading";

const { TextArea } = Input;
const { Option } = Select;

export const Notification = () => {
  const { moduleId } = useParams<{ moduleId: string }>();
  const dispatch = useDispatch();
  const history = useHistory();

  const [form] = Form.useForm();

  const modules = useSelector((state: RootState) => state.modules);
  const module = modules.all.find((p) => p.id === moduleId);
  const moduleName = module?.title;

  const [segments, setSegments] = useState<MessagingSegment[]>([]);
  const [data, setData] = useState<MessagingData[]>([]);

  const [loading, setLoading] = useState<boolean>(true);

  const fetchData = async () => {
    setLoading(true);
    const client = new apiClient();
    const notificationResponse = await client.getNotification(moduleId);

    setSegments(notificationResponse.segments);
    setData(notificationResponse.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [moduleId]);

  const onSegmentChange = (value: string) => {
    form.setFieldsValue({ segment: value });
  };

  const changeDataValue = (key: string, value: string) => {
    let obj: any = {};
    obj[key] = value;
    form.setFieldsValue(obj);
  };

  const onFinish = async (values: any) => {
    dispatch(show());
    const client = new apiClient();
    try {
      await client.sendNotification(moduleId, values);
      message.success("Notification sent");
      history.push("/");
      dispatch(hide());
    } catch (ex) {
      message.error(ex);
      dispatch(hide());
    }
  };

  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      {loading ? (
        <Skeleton></Skeleton>
      ) : (
        <>
          <PageHeader className="site-page-header" ghost={false} title={moduleName} extra={[]}></PageHeader>

          <Card>
            <Form name="basic" labelCol={{ span: 3 }} wrapperCol={{ span: 12 }} onFinish={onFinish} initialValues={{}} form={form}>
              <Form.Item label="Segment" name="segment" rules={[{ required: true, message: "Please select a segment" }]}>
                <Select placeholder="Select segment to send notification to" onChange={onSegmentChange} allowClear>
                  {segments.map((s) => (
                    <Option value={s.id}>{s.description}</Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item label="Subject" name="subject" rules={[{ required: true, message: "Please input the notification subject" }]}>
                <Input />
              </Form.Item>

              <Form.Item label="Body" name="body" rules={[{ required: true, message: "Please input the notification body" }]}>
                <TextArea />
              </Form.Item>

              {data.map((d) => {
                return (
                  <Form.Item label={d.description} name={d.id} key={`data_${d.id}`}>
                    {d.options ? (
                      <Select
                        placeholder="Select segment to send notification to"
                        onChange={(value: string) => {
                          changeDataValue(d.id, value);
                        }}
                        allowClear
                      >
                        {d.options.map((s) => (
                          <Option value={s}>{s}</Option>
                        ))}
                      </Select>
                    ) : (
                      <Input></Input>
                    )}
                  </Form.Item>
                );
              })}

              <Form.Item wrapperCol={{ offset: 3, span: 12 }}>
                <Button type="primary" htmlType="submit">
                  Send
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </>
      )}
    </Space>
  );
};
