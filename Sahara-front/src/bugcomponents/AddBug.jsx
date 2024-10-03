import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import axios from "axios";
import CustomAlert from "../genericcomponents/CustomAlert";
import Modal from "react-modal";
import BugForm from "./BugForm";
import useFetchBugs from "./FetchBugs";

Modal.setAppElement("#root");

const AddBug = ({ onAddBug }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "",
    status: "",
    assignee: "",
    reporter: "",
  });

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(true);

  const { items: existingBugs, error } = useFetchBugs(); 

  useEffect(() => {
    if (error) {
      setAlertMessage("Failed to fetch existing bugs.");
      setIsModalVisible(false);
      setShowAlert(true);
    }
  }, [error]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Form Data to be Submitted:", formData);

 
    if (
      !formData.title ||
      !formData.description ||
      !formData.priority ||
      !formData.status ||
      !formData.assignee ||
      !formData.reporter
    ) {
      setAlertMessage("All fields are required.");
      setIsModalVisible(false);
      setShowAlert(true);
      return;
    }

    const bugExists = existingBugs?.some(
      (b) => b.title.toLowerCase() === formData.title.toLowerCase()
    );

    if (bugExists) {
      setAlertMessage("Bug with this title already exists.");
      setIsModalVisible(false);
      setShowAlert(true);
      return;
    }

    try {
      console.log("Sending POST request with data:", formData);

      const postResponse = await axios.post("http://localhost:8085/bug/add", {
        title: formData.title,
        description: formData.description,
        priority: formData.priority,
        status: formData.status,
        assignee: formData.assignee,
        reporter: formData.reporter,
      });

      const data = postResponse.data;

      console.log("Post Response:", data);

      setAlertMessage(`New Bug Reported. Your Unique ID is ${data.id}`);
      setShowAlert(true);

  
      setFormData({
        title: "",
        description: "",
        priority: "",
        status: "",
        assignee: "",
        reporter: "",
      });
      
      onAddBug();  
      setIsModalOpen(false);  
    } catch (error) {
      console.error("Error reporting bug:", error);
      setAlertMessage("Failed to report bug.");
      setShowAlert(true);
    }
  };

  const closeAlert = () => {
    setShowAlert(false);
    setIsModalVisible(true);
  };

  return (
    <div>
      <button onClick={() => setIsModalOpen(true)} className="AddBug-btn">Report Bug</button>

      {isModalOpen && isModalVisible && (
        <Modal
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          shouldCloseOnOverlayClick={false}
          contentLabel="Report Bug Modal"
          className="modal"
          overlayClassName="modal-overlay"
        >
          <h2>Report Bug</h2>
          <BugForm
            formData={formData}
            onChange={setFormData}
            onSubmit={handleSubmit}
            onCancel={() => setIsModalOpen(false)}
          />
        </Modal>
      )}

      {showAlert && <CustomAlert message={alertMessage} onClose={closeAlert} />}
    </div>
  );
};

AddBug.propTypes = {
  onAddBug: PropTypes.func.isRequired,
};

export default AddBug;
