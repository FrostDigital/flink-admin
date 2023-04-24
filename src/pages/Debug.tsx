import { Button, PageHeader, Skeleton, Space, Table, Input } from "antd";
import { Link, useHistory, useParams } from "react-router-dom";

import {
  PauseOutlined,
  CaretRightOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import { useEffect } from "react";
import { useState } from "react";
import { apiClient } from "../utils/api";
import { ManagementUser } from "../schemas/ManagementUser";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { User } from "../schemas/User";
import request from "../schemas/Debug";

type userListState = request[];
const initalState: userListState = [];

export const Debug = () => {
  const { moduleId } = useParams<{ moduleId: string }>();

  const modules = useSelector((state: RootState) => state.modules);
  const module = modules.all.find((p) => p.id === moduleId);
  const moduleName = module?.title;

  const [requests, setRequests] = useState(initalState);
  const [loading, setLoading] = useState<boolean>(true);
  const [enabled, setEnabled] = useState<boolean>(false);

  const fetchData = async () => {
    setLoading(true);
    const client = new apiClient();
    const debugRes = await client.getDebug(moduleId);

    setRequests(debugRes.requests);
    setEnabled(debugRes.enabled);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [moduleId]);

  const columns: any = [
    {
      title: "Start",
      dataIndex: "start",
      key: "start",
      render: (text: string, record: ManagementUser) => (
        <Space size="middle">{text}</Space>
      ),
    },
    {
      title: "Method",
      dataIndex: "method",
      key: "method",
    },
    {
      title: "Path",
      dataIndex: "path",
      key: "path",
    },

    {
      title: "Headers",
      dataIndex: "headers",
      key: "headers",
      render: (text: any, record: ManagementUser) =>
        typeof text == "object" ? JSON.stringify(text) : text,
    },
    {
      title: "Body",
      dataIndex: "body",
      key: "body",
      render: (text: any, record: ManagementUser) =>
        typeof text == "object" ? JSON.stringify(text) : text,
    },
    {
      title: "Response",
      dataIndex: "response",
      key: "response",
    },
  ];

  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      {loading ? (
        <Skeleton></Skeleton>
      ) : (
        <>
          <PageHeader
            className="site-page-header"
            ghost={false}
            title={moduleName}
            subTitle={enabled ? "Logging active" : "Disabled"}
            extra={[
              enabled && (
                <Space key="1">
                  <Button
                    type="primary"
                    icon={<PauseOutlined />}
                    key="2"
                    onClick={async () => {
                      const client = new apiClient();
                      await client.setDebugDisabled(moduleId);
                      setEnabled(false);
                    }}
                  >
                    Stop
                  </Button>
                </Space>
              ),
              !enabled && (
                <Space key="2">
                  <Button
                    type="primary"
                    danger
                    icon={<CaretRightOutlined />}
                    key="2"
                    onClick={async () => {
                      const client = new apiClient();
                      await client.setDebugEnabled(moduleId);
                      setEnabled(true);
                    }}
                  >
                    Record
                  </Button>
                </Space>
              ),
              <Space key="3">
                <Button
                  type="primary"
                  icon={<ReloadOutlined />}
                  key="2"
                  onClick={() => {
                    fetchData();
                  }}
                >
                  Refresh
                </Button>
              </Space>,
            ]}
          ></PageHeader>

          <Table rowKey="start" dataSource={requests} columns={columns} />
        </>
      )}
    </Space>
  );
};
