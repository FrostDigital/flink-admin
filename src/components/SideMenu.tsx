import {
  LogoutOutlined,
  ExclamationCircleOutlined,
  InfoCircleOutlined,
  UsergroupAddOutlined,
  KeyOutlined,
  DatabaseOutlined,
  PlayCircleOutlined,
  AimOutlined,
  NotificationOutlined,
} from "@ant-design/icons";

import { Menu, Modal } from "antd";
import { useSelector } from "react-redux";
import { setLoggedout } from "../store/features/user";
import store from "../store/store";
import { Link } from "react-router-dom";
import { RootState } from "../store/store";

const DoLogout = () => {
  const dispatch = store.dispatch;
  dispatch(setLoggedout());
};

const LogoutAction = () => {
  Modal.confirm({
    title: "Logout?",
    icon: <ExclamationCircleOutlined />,
    content: "Are you sure you wish to logout?",
    okText: "Yes",
    cancelText: "No",
    onOk: DoLogout,
  });
};
export const SideMenu = () => {
  const modules = useSelector((state: RootState) => state.modules);
  let menuItems = modules.all
    .filter((m) => m.ui === "true")
    .map((m) => {
      let icon = <InfoCircleOutlined />;
      switch (m.type) {
        case "USER":
          icon = <UsergroupAddOutlined />;
          break;
        case "MANAGEMENT_USER":
          icon = <KeyOutlined />;
          break;
        case "REPO":
          icon = <DatabaseOutlined />;
          break;
        case "ACTION":
          icon = <PlayCircleOutlined />;
          break;
        case "DEBUG":
          icon = <AimOutlined />;
          break;
        case "NOTIFICATION":
          icon = <NotificationOutlined/> 
      }

      return (
        <Menu.Item key={m.id} icon={icon}>
          <Link to={"/modules/" + m.type.toLocaleLowerCase() + "/" + m.id}>
            {m.title}
          </Link>
        </Menu.Item>
      );
    });

  return (
    <Menu
      defaultSelectedKeys={["1"]}
      mode="inline"
      theme="dark"
      inlineCollapsed={false}
      selectable={false}
    >
      {menuItems}

      <Menu.Item key="logout" onClick={LogoutAction} icon={<LogoutOutlined />}>
        Sign out
      </Menu.Item>
    </Menu>
  );
};
