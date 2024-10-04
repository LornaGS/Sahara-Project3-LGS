import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:8085/bugs';

const useFetchBugs = () => {
    const [items, setItems] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false); // Loading state

    const fetchBugs = async () => {
        setLoading(true); // Start loading
        setError(null);   // Clear previous errors

        try {
            console.log("Fetching bugs..."); // Log fetching action
            const response = await axios.get(API_URL);
            console.log("Bugs fetched:", response.data); // Log fetched data
            setItems(response.data);
        } catch (error) {
            console.error("Error fetching bugs:", error); // Log error
            setError(error);
        } finally {
            setLoading(false); // End loading
        }
    };

    useEffect(() => {
        fetchBugs();
    }, []);

    return { items, error, loading, refetch: fetchBugs }; // Return loading state
};

export default useFetchBugs;
