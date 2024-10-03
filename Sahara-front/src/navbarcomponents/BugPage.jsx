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

    useEffect(() => {
        refetch();
    }, [refetch]);

    if (error) return <div>Error loading bugs: {error.message}</div>;

    return (
        <div>
            <div className="container2">               
                <AddBug onAddBug={refetch} /> 
            </div>
            <div className="table-wrapper">
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
            {bugIdToDelete !== null && (
                <DeleteBug
                    bugIdToDelete={bugIdToDelete}
                    onCancel={() => setBugIdToDelete(null)} 
                    onConfirm={() => {
                        refetch(); 
                        setBugIdToDelete(null); 
                    }}
                />
            )}
            {showUpdateDialogue && bugToUpdate && (
                <UpdateBug
                    bug={bugToUpdate}
                    onCancel={() => setShowUpdateDialogue(false)}
                    onUpdateSuccess={() => {
                        refetch(); 
                        setShowUpdateDialogue(false);
                        setBugToUpdate(null);
                    }}
                />
            )}
        </div>
    );
};

export default BugPage;
