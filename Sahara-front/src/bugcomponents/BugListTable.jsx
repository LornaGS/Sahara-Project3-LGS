import React, { useState, useEffect } from 'react';
import useFetchBugs from './FetchBugs';
import UpdateBug from './UpdateBug'; 
import DeleteBug from './DeleteBug';  

const BugListTable = ({ onDelete }) => {
  const { items: bugs, error, refetch } = useFetchBugs();
  const [bugToUpdate, setBugToUpdate] = useState(null); 
  const [bugIdToDelete, setBugIdToDelete] = useState(null); 

  const handleUpdate = (bug) => {
    setBugToUpdate(bug);  
  };

  const handleDelete = async (bugId) => {
    setBugIdToDelete(bugId); 
  };

  const handleUpdateSuccess = (updatedBug) => {
    refetch();  
    setBugToUpdate(null);  
  };

  const handleDeleteSuccess = () => {
    refetch();
    setBugIdToDelete(null); 
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
                <td>{new Date(bug.dateReported).toLocaleDateString('en-GB')}</td>
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

      {bugToUpdate && (
        <UpdateBug
          bug={bugToUpdate}
          onCancel={() => setBugToUpdate(null)}
          onUpdateSuccess={handleUpdateSuccess}  
        />
      )}

      {bugIdToDelete && ( 
        <DeleteBug
          bugIdToDelete={bugIdToDelete}
          onCancel={() => setBugIdToDelete(null)}  
          onConfirm={handleDeleteSuccess}  
        />
      )}
    </div>
  );
};

export default BugListTable;
