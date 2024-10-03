import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import CustomAlert from '../genericcomponents/CustomAlert'; 
import '../CSS/Modal.css'; 

const API_URL = 'http://localhost:8085/bug/remove/';

const DeleteBug = ({ bugIdToDelete, onCancel, onConfirm }) => {
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    useEffect(() => {
        if (bugIdToDelete !== null) {
            setShowConfirmation(true);
        }
    }, [bugIdToDelete]);

    const handleConfirm = async () => {
        try {
            const response = await axios.delete(`${API_URL}${bugIdToDelete}`);
            if (response.status === 200) {
                setAlertMessage(`Bug with ID ${bugIdToDelete} successfully deleted.`);
                onConfirm();  // Trigger the refresh in the parent
            } else {
                setAlertMessage(`Failed to delete the bug with ID ${bugIdToDelete}.`);
            }
        } catch (error) {
            setAlertMessage('Error during deletion.');
        } finally {
            setShowConfirmation(false);
            setShowAlert(true);
        }
    };

    const handleAlertClose = () => {
        setShowAlert(false);
        onCancel();  // Close the modal when alert is closed
    };

    return (
        <>
            {showConfirmation && (
                <Modal
                    isOpen={true}
                    onRequestClose={() => {
                        setShowConfirmation(false);
                        onCancel(); 
                    }}
                    contentLabel="Confirmation Dialog"
                    className="modal"
                    overlayClassName="modal-overlay"
                >
                    <h2>Confirmation</h2>
                    <p>Are you sure you want to delete this bug?</p>
                    <div className="button-group">
                        <button
                            className="confirm-btn"
                            onClick={handleConfirm}
                        >
                            Confirm
                        </button>
                        <button className="cancel-btn" onClick={() => {
                            setShowConfirmation(false);
                            onCancel(); 
                        }}>Cancel</button>
                    </div>
                </Modal>
            )}
            
            {showAlert && (
                <CustomAlert
                    message={alertMessage}
                    onClose={handleAlertClose} 
                />
            )}
        </>
    );
};

export default DeleteBug;
