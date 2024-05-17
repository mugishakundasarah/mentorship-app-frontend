import { useMutation, useQuery } from "@apollo/client";
import { Table, Button, notification } from "antd";
import { GET_ALL_MENTORS, REQUEST_TO_BE_MENTOR } from "../graphql";
import AppLayout from "../components/Layout";

const MentorsPage = () => {
  const {
    loading,
    error,
    data,
    refetch: refetchMentors,
  } = useQuery(GET_ALL_MENTORS);
  const [requestToBeMentor] = useMutation(REQUEST_TO_BE_MENTOR);
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
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Button type="primary" onClick={() => requestSession(record.id)}>
          Request Session
        </Button>
      ),
    },
  ];

  const requestSession = (mentorId) => {
    alert(`Requesting session with mentor ID: ${mentorId}`);
    // Add logic to handle the session request, e.g., navigate to a request form or send a request via API.
  };

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
        >
          Request to be a Mentor
        </Button>
        <Table
          columns={columns}
          dataSource={data.allMentors}
          rowKey="id"
          loading={loading}
        />
      </div>
    </AppLayout>
  );
};

export default MentorsPage;
