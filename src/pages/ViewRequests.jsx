import { useMutation, useQuery } from "@apollo/client";
import { Button, Table, notification } from "antd";
import AppLayout from "../components/Layout";
import { ACCEPT_REQUEST, GET_REQUESTS, REJECT_REQUEST } from "../graphql"; // Define your GraphQL query
import { useState } from "react";
import { jwtDecode } from "jwt-decode";

const ViewRequests = () => {
  const token = localStorage.getItem("token");
  const decoded = token && jwtDecode(token);
  const role = decoded.role;

  const [rejectloadingButtons, setRejectLoadingButtons] = useState({});
  const [acceptLoadingButtons, setAcceptLoadingButtons] = useState({});

  // Define acceptRequest and rejectRequest mutations
  const [acceptRequest] = useMutation(ACCEPT_REQUEST);
  const [rejectRequest] = useMutation(REJECT_REQUEST);

  // Fetch requests data using a GraphQL query
  const { loading, error, data } = useQuery(GET_REQUESTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // Extract requests data from the GraphQL response
  const requests = data.requests; // Adjust this according to your GraphQL response structure

  const handleAcceptRequest = async (requestId) => {
    try {
      await acceptRequest({ variables: { requestId } });
      notification.success({
        message: "Success",
        description: "Request accepted successfully.",
      });
    } catch (error) {
      notification.error({
        message: "Error",
        description: error.message,
      });
    } finally {
      setAcceptLoadingButtons((prevLoadingButtons) => ({
        ...prevLoadingButtons,
        [requestId]: false,
      }));
    }
  };

  const handleRejectRequest = async (requestId) => {
    try {
      await rejectRequest({ variables: { requestId } });
      notification.success({
        message: "Success",
        description: "Request rejected successfully.",
      });
    } catch (error) {
      notification.error({
        message: "Error",
        description: error.message,
      });
    } finally {
      setRejectLoadingButtons((prevLoadingButtons) => ({
        ...prevLoadingButtons,
        [requestId]: false,
      }));
    }
  };

  const columns = [
    // Define your table columns as needed
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Mentor",
      dataIndex: "mentor",
      key: "mentor",
      render: (mentor) => `${mentor.firstName} ${mentor.lastName}`,
    },
    {
      title: "Mentee",
      dataIndex: "mentee",
      key: "mentee",
      render: (mentee) => `${mentee.firstName} ${mentee.lastName}`,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => `${status}`,
    },
  ];

  const columnsWithActions = [
    ...columns,
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <div>
          {record.status == "PENDING" && (
            <>
              <Button
                type="primary"
                loading={acceptLoadingButtons[record.id]}
                onClick={() => {
                  setAcceptLoadingButtons((prevLoadingButtons) => ({
                    ...prevLoadingButtons,
                    [record.id]: true,
                  }));
                  handleAcceptRequest(record.id);
                }}
              >
                Accept
              </Button>
              <Button
                onClick={() => {
                  setRejectLoadingButtons((prevLoadingButtons) => ({
                    ...prevLoadingButtons,
                    [record.id]: true,
                  }));
                  handleRejectRequest(record.id);
                }}
                loading={rejectloadingButtons[record.id]}
              >
                Reject
              </Button>
            </>
          )}
        </div>
      ),
    },
  ];

  return (
    <AppLayout>
      <div>
        <h1>View Requests</h1>
        {/* Render the requests table */}
        <Table
          columns={role == "mentee" ? columns : columnsWithActions}
          dataSource={requests}
          rowKey="id"
          className="mt-3"
        />
      </div>
    </AppLayout>
  );
};

export default ViewRequests;
