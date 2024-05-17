import { useMutation, useQuery } from "@apollo/client";
import { Table, Button, notification } from "antd";
import { GET_ALL_MENTORS, REQUEST_SESSION, REQUEST_TO_BE_MENTOR } from "../graphql";
import AppLayout from "../components/Layout";
import { useState } from "react";
import { jwtDecode } from "jwt-decode";

const MentorsPage = () => {
  const token = localStorage.getItem("token");
  const decoded = token && jwtDecode(token);
  const role = decoded.role;
  const {
    loading,
    error,
    data,
    refetch: refetchMentors,
  } = useQuery(GET_ALL_MENTORS);
  const [requestToBeMentor] = useMutation(REQUEST_TO_BE_MENTOR);
  const [loadingButtons, setLoadingButtons] = useState({});
  const [requestSessionMutation] = useMutation(REQUEST_SESSION);
  const handleRequestToBeMentor = async () => {
    try {
      await requestToBeMentor();
      notification.success({
        message: "Success",
        description: "You have successfully requested to be a mentor.",
      });
      refetchMentors();
    } catch (e) {
      notification.error({
        message: "Error",
        description: e.message,
      });
    }
  };

  const requestSession = async (mentorId) => {
    try {
      const mentorIdInt = parseInt(mentorId);

      setLoadingButtons((prevLoadingButtons) => ({
        ...prevLoadingButtons,
        [mentorId]: true,
      }));

      await requestSessionMutation({
        variables: {
          mentorId: mentorIdInt
        }
      });
      notification.success({
        message: "Success",
        description: "Session request sent successfully."
      });
      refetchMentors();
    } catch (error) {
      notification.error({
        message: "Error",
        description: error.message
      })
    } finally {
      // Reset loading state after the request is complete
      setLoadingButtons((prevLoadingButtons) => ({
        ...prevLoadingButtons,
        [mentorId]: false,
      }));
    }
  };

  const renderRequestSessionButton = (mentorId) => {
    const isLoading = loadingButtons[mentorId];
    return (
      <Button type="primary" loading={isLoading} onClick={() => requestSession(mentorId)}>
        Request Session
      </Button>
    );
  };

  const columns = [
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName",
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "lastName",
    },
    {
      title: "Expertise",
      dataIndex: "expertise",
      key: "expertise",
    },
  ];

  const columnsWithActions = [
    ...columns,
    {
      title: "Action",
      key: "action",
      render: (text, record) => renderRequestSessionButton(record.id),
    },
  ]

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <AppLayout>
      <div className="flex flex-col gap-4 mx-4">
        <h1>Mentors</h1>
        <Button
          type="primary"
          onClick={handleRequestToBeMentor}
          className="self-end"
          disabled={role == "mentor"}
        >
          Request to be a Mentor
        </Button>
        <Table
          columns={columnsWithActions}
          dataSource={data.allMentors}
          rowKey="id"
          loading={loading}
        />
      </div>
    </AppLayout>
  );
};

export default MentorsPage;
