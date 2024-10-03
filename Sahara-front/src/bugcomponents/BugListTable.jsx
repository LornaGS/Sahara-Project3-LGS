import React, { useState, useEffect } from 'react';
import useFetchBugs from './FetchBugs';

const BugListTable = ({ onUpdate, onDelete }) => {
  const { items: bugs, error, refetch } = useFetchBugs();
  const [shouldRefetch, setShouldRefetch] = useState(false); 

 
  useEffect(() => {
    if (shouldRefetch) {
      refetch(); 
      setShouldRefetch(false);  
    }
  }, [shouldRefetch, refetch]);

  const handleUpdate = (bug) => {
    onUpdate(bug);  
    setShouldRefetch(true); 
  };

  const handleDelete = (bugId) => {
    onDelete(bugId);  
    setShouldRefetch(true);  
  };

  if (error) {
    return <p>Error fetching bugs: {error.message}</p>;
  }

  return (
    <div>
      {bugs.length === 0 ? (
        <p>No bugs available</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Description</th>
              <th>Priority</th>
              <th>Status</th>
              <th>Assignee</th>
              <th>Date Reported</th>
              <th>Reporter</th>
              <th>Update Bug</th>
              <th>Delete Bug</th>
            </tr>
          </thead>
          <tbody>
            {bugs.map(bug => (
              <tr key={bug.id}>
                <td>{bug.id}</td>
                <td>{bug.title}</td>
                <td>{bug.description}</td>
                <td>{bug.priority}</td>
                <td>{bug.status}</td>
                <td>{bug.assignee}</td>
                <td>{bug.dateReported}</td>
                <td>{bug.reporter}</td>
                <td>
                  <button onClick={() => handleUpdate(bug)}>Update Bug</button>
                </td>
                <td>
                  <button onClick={() => handleDelete(bug.id)}>Delete Bug</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default BugListTable;
