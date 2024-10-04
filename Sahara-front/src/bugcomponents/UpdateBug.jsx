import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import CustomAlert from '../genericcomponents/CustomAlert';
import BugForm from './BugForm';
import axios from 'axios';
import '../CSS/Modal.css';

Modal.setAppElement('#root');

const UpdateBug = ({ bug, onCancel, onUpdateSuccess }) => {
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    description: '',
    priority: '',
    status: '',
    reporter: '',
    assignee: ''
  });
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(true);

  useEffect(() => {
    if (bug && bug.id) {
      setFormData({
        id: bug.id,
        title: bug.title || '',
        description: bug.description || '',
        priority: bug.priority || '',
        status: bug.status || '',
        reporter: bug.reporter || '',
        assignee: bug.assignee || ''
      });
    } else {
      console.error("Bug object is missing id or required fields:", bug);
      setAlertMessage('Bug data is missing required fields.');
      setShowAlert(true);
    }
  }, [bug]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.id) {
      setAlertMessage('Failed to update bug due to missing ID.');
      setShowAlert(true);
      return;
    }

    try {
      const response = await axios.patch(`http://localhost:8085/bug/update/${formData.id}`, {
        title: formData.title,
        description: formData.description,
        priority: formData.priority,
        status: formData.status,
        reporter: formData.reporter,
        assignee: formData.assignee,
      });

      if (response.status === 200) {
        setAlertMessage('Bug successfully updated.');
        setShowAlert(true);
        setIsModalVisible(false);
        onUpdateSuccess(formData);  
      } else {
        setAlertMessage('Failed to update bug.');
        setShowAlert(true);
        setIsModalVisible(false);
      }
    } catch (error) {
      console.error('Error updating bug:', error);
      setAlertMessage('Failed to update bug.');
      setShowAlert(true);
      setIsModalVisible(false);
    }
  };

  const closeAlert = () => {
    setShowAlert(false);
    setIsModalVisible(true);
  };

  return (
    <div>
      {isModalVisible && (
        <Modal
          isOpen={true}
          onRequestClose={onCancel}
          contentLabel="Update Bug Modal"
          shouldCloseOnOverlayClick={false}
          className="modal"
          overlayClassName="modal-overlay"
        >
          <h2>Update Bug {formData.id}</h2>
          <BugForm
            formData={formData}
            onChange={setFormData}
            onSubmit={handleSubmit}
            onCancel={onCancel}
            isUpdateMode={true}
          />
        </Modal>
      )}

      {showAlert && (
        <CustomAlert
          message={alertMessage}
          onClose={closeAlert}
        />
      )}
    </div>
  );
};

export default UpdateBug;
