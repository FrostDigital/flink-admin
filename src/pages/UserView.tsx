import {
  Button,
  PageHeader,
  Space,
  message,
  Skeleton,
  Modal,
  Card,
  Descriptions,
} from "antd";
import { useHistory, useParams } from "react-router-dom";
import { show, hide } from "../store/features/loading";

import { apiClient } from "../utils/api";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";

import {
  DeleteOutlined,
  KeyOutlined,
  ExclamationCircleOutlined,
  EditOutlined,
} from "@ant-design/icons";

import { RootState } from "../store/store";
import { ViewUser } from "../schemas/ViewUser";
import { FullUser } from "../schemas/FullUser";

export const UserView = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");
  const [user, setUser] = useState<FullUser>();
  const [viewUser, setViewUser] = useState<ViewUser>();

  const client = new apiClient();

  const { moduleId, userId } =
    useParams<{ moduleId: string; userId: string }>();
  const modules = useSelector((state: RootState) => state.modules);
  const module = modules.all.find((p) => p.id === moduleId);
  const moduleName = module?.title;

  const DeleteUser = () => {
    Modal.confirm({
      title: "Delete user?",
      icon: <ExclamationCircleOutlined />,
      content: "Are you sure you wish to remove this user?",
      okText: "Yes",
      cancelText: "No",
      onOk: DoDeleteUser,
    });
  };
  const DoDeleteUser = async () => {
    dispatch(show());

    await client.userModuleDelete(moduleId, userId);
    message.success("User deleted");
    history.push("/modules/user/" + moduleId);

    dispatch(hide());
  };

  useEffect(() => {
    async function fetchData() {
      const user = await client.userModuleGet(moduleId, userId);
      const viewUser = await client.userModuleGetView(moduleId, userId);
      setUser(user);
      setUsername(user.username);
      setViewUser(viewUser);
      setLoading(false);
    }

    fetchData();
  }, []);

  let buttons = [];
  if (module?.features.includes("edit")) {
    buttons.push(
      <Button
        key="2"
        type="primary"
        icon={<EditOutlined />}
        onClick={() => {
          history.push("/modules/user/" + moduleId + "/edit/" + userId);
        }}
      >
        Edit user
      </Button>
    );
  }
  if (module?.features.includes("delete")) {
    buttons.push(
      <Button
        key="5"
        danger
        type="primary"
        icon={<DeleteOutlined />}
        onClick={DeleteUser}
      >
        Delete
      </Button>
    );
  }

  buttons.push(
    <Button
      key="3"
      type="primary"
      icon={<KeyOutlined />}
      onClick={() => {
        history.push(
          "/modules/user/" + moduleId + "/edit/" + userId + "/password"
        );
      }}
    >
      Change password
    </Button>
  );

  viewUser?.buttons.forEach((b) => {
    if (b.url.startsWith("/")) {
      buttons.push(
        <Button
          key={b.url}
          type="primary"
          onClick={() => {
            history.push(b.url);
          }}
        >
          {b.text}
        </Button>
      );
    } else {
      buttons.push(
        <Button
          key={b.url}
          type="primary"
          onClick={() => {
            window.open(b.url, "_blank");
          }}
        >
          {b.text}
        </Button>
      );
    }
  });

  return (
    <div>
      {loading ? (
        <Skeleton></Skeleton>
      ) : (
        <Space direction="vertical" style={{ width: "100%" }}>
          <PageHeader
            className="site-page-header"
            ghost={false}
            title={moduleName}
            subTitle={"View / " + username}
            onBack={() => history.goBack()}
            extra={buttons}
          ></PageHeader>

          <Card>
            {viewUser?.data && (
              <Descriptions title="User Info" bordered column={1}>
                {Object.keys(viewUser?.data as Object).map((k) => {
                  return (
                    <Descriptions.Item label={k} key={k}>
                      {viewUser?.data[k]}
                    </Descriptions.Item>
                  );
                })}
              </Descriptions>
            )}
          </Card>
        </Space>
      )}
    </div>
  );
};
