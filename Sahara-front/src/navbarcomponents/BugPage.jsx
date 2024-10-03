import React, { useState, useEffect } from 'react';
import AddBug from '../bugcomponents/AddBug';
import UpdateBug from '../bugcomponents/UpdateBug';
import BugListTable from '../bugcomponents/BugListTable';
import DeleteBug from '../bugcomponents/DeleteBug'; 
import '../CSS/AdminPage.css'; 
import '../CSS/Modal.css';
import useFetchBugs from '../bugcomponents/FetchBugs';

const BugPage = () => {
    const { items: bugs, error, refetch } = useFetchBugs();
    const [bugToUpdate, setBugToUpdate] = useState(null);
    const [showUpdateDialogue, setShowUpdateDialogue] = useState(false);
    const [bugIdToDelete, setBugIdToDelete] = useState(null);
    const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'ascending' });

    const requestSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    // Fetch the bug list only on page load and refresh (initial mount)
    useEffect(() => {
        refetch();  // Fetch bugs on component mount (page load or refresh)
    }, []);  // Empty dependency array ensures it only runs on mount

    // If there's an error while fetching bugs
    if (error) return <div>Error loading bugs: {error.message}</div>;

    return (
        <div>
            <div className="container2">               
                {/* Trigger refetch when a new bug is added */}
                <AddBug onAddBug={refetch} /> 
            </div>
            <div className="table-wrapper">
                {/* List bugs, with options to update or delete */}
                <BugListTable
                    bugs={bugs}
                    onUpdate={(bug) => {
                        setBugToUpdate(bug);
                        setShowUpdateDialogue(true);
                    }}
                    onDelete={(id) => setBugIdToDelete(id)} 
                    onRequestSort={requestSort}
                    sortConfig={sortConfig}
                />
            </div>
            {/* Show the delete dialog when bug is selected for deletion */}
            {bugIdToDelete !== null && (
                <DeleteBug
                    bugIdToDelete={bugIdToDelete}
                    onCancel={() => setBugIdToDelete(null)} 
                    onConfirm={() => {
                        refetch();  // Refetch after delete
                        setBugIdToDelete(null); 
                    }}
                />
            )}
            {/* Show the update dialog when bug is selected for update */}
            {showUpdateDialogue && bugToUpdate && (
                <UpdateBug
                    bug={bugToUpdate}
                    onCancel={() => setShowUpdateDialogue(false)}
                    onUpdateSuccess={() => {
                        refetch();  // Refetch after update
                        setShowUpdateDialogue(false);
                        setBugToUpdate(null);
                    }}
                />
            )}
        </div>
    );
};

export default BugPage;
