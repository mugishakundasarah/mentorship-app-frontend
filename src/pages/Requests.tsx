import React from 'react';
import { useQuery, gql } from '@apollo/client';

const GET_ALL_MENTORS = gql`
  query GetAllMentors {
    allMentors {
      id
      firstName
      lastName
      expertise
    }
  }
`;

const MentorsPage = () => {
  const { loading, error, data } = useQuery(GET_ALL_MENTORS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Mentors</h1>
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Expertise</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.allMentors.map(mentor => (
            <tr key={mentor.id}>
              <td>{mentor.firstName}</td>
              <td>{mentor.lastName}</td>
              <td>{mentor.expertise}</td>
              <td>
                <button onClick={() => requestSession(mentor.id)}>Request Session</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  function requestSession(mentorId) {
    alert(`Requesting session with mentor ID: ${mentorId}`);
    // Here you would add logic to handle the session request, e.g., navigate to a request form or send a request via API.
  }
};

export default MentorsPage;
