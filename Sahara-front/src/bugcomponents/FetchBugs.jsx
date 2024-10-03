import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:8085/bugs';

const useFetchBugs = () => {
    const [items, setItems] = useState([]);
    const [error, setError] = useState(null);

    const fetchBugs = async () => {
        try {
            const response = await axios.get(API_URL);
            setItems(response.data);
        } catch (error) {
            setError(error);
        }
    };

    useEffect(() => {
        fetchBugs();
    }, []);

    return { items, error, refetch: fetchBugs };
};

export default useFetchBugs;
