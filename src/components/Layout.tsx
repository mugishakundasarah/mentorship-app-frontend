import { Layout, Menu } from "antd";
import { jwtDecode } from "jwt-decode";
import React from "react";
import { Link } from "react-router-dom";
const { Sider, Content } = Layout;

const token = localStorage.getItem("token");
const decoded: any = token && jwtDecode(token as string);
console.log(decoded);

const Sidebar = () => {
  const userRole = decoded?.role;
  return (
    <Sider width={200} className="h-screen">
      <Menu
        mode="inline"
        defaultSelectedKeys={["1"]}
        style={{ height: "100%", borderRight: 0 }}
        activeKey={
          window.location.pathname === "/profile"
            ? "1"
            : window.location.pathname === "/mentors"
            ? "2"
            : window.location.pathname === "/reviews"
            ? "3"
            : window.location.pathname === "/requests"
            ? "4"
            : "1"
        }
      >
        <Menu.Item key="1">
          <Link to="/profile">Profile</Link>
        </Menu.Item>
        {userRole === "mentee" && (
          <>
            <Menu.Item key="2">
              <Link to="/mentors">Mentors</Link>
            </Menu.Item>
            <Menu.Item key="3">
              <Link to="/reviews">Reviews</Link>
            </Menu.Item>
          </>
        )}
        {userRole === "mentor" && (
          <Menu.Item key="4">
            <Link to="/requests">View Requests</Link>
          </Menu.Item>
        )}
      </Menu>
    </Sider>
  );
};

const TopBar = () => {
  return (
    <div className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <h1 className="font-bold text-white flex flex-col items-center">
        WELCOME TO MENTORSHIP: {decoded?.email as string}
      </h1>
      <a
        onClick={() => {
          localStorage.removeItem("token");
          localStorage.removeItem("refresh_token");
          window.location.href = "/login";
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
        <Sidebar />
        <Content className="p-4">{children}</Content>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
