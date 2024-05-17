import { Layout, Menu } from "antd";
import { jwtDecode } from "jwt-decode";
import React from "react";
const { Sider, Content } = Layout;

const Sidebar = ({ userRole }) => {
  return (
    <Sider width={200} className="h-screen">
      <Menu
        mode="inline"
        defaultSelectedKeys={["1"]}
        style={{ height: "100%", borderRight: 0 }}
      >
        <Menu.Item key="1">Home</Menu.Item>
        <Menu.Item key="2">Profile</Menu.Item>
        {/* {userRole === 'mentor' && <Menu.Item key="3">View Requests</Menu.Item>} */}
        {/* {userRole === 'mentee' && ( */}
        <>
          <Menu.Item key="4">View Mentors</Menu.Item>
          <Menu.Item key="5">Show Reviews</Menu.Item>
        </>
        {/* )} */}
      </Menu>
    </Sider>
  );
};

const TopBar = () => {
  const token = localStorage.getItem("token");
  const decoded: any = jwtDecode(token as string);
  return (
    <div className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <h1 className="font-bold text-white flex flex-col items-center">
        WELCOME TO MENTORSHIP: {decoded?.email as string}
      </h1>
      <a
        onClick={() => {
          localStorage.removeItem("token");
          localStorage.removeItem("refresh_token");
          window.location.href = "/";
        }}
      >
        Logout
      </a>
    </div>
  );
};

const AppLayout = ({ userRole, children }) => {
  return (
    <Layout className="bg-red-500 flex ">
      <TopBar />
      <Layout>
        <Sidebar userRole={userRole} />
        <Content className="p-4">{children}</Content>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
