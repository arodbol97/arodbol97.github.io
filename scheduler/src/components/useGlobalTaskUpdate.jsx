import { useState } from "react";
import moment from "moment";

const useGlobalTaskUpdate = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(moment().format("YYYY-MM"));

  const updateTask = async (updatedTask) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:3001/global-tasks/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTask),
      });

      if (!response.ok) {
        throw new Error('Failed to update task');
      }      

      const result = await response.json();
      setData(result);
      return result; 
    } catch (err) {
      setError(err.message);
      throw err; 
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (updatedTask) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:3001/global-tasks/change-status', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTask),
      });

      if (!response.ok) {
        throw new Error('Failed to update task status');
      }      

      const result = await response.json();
      setData(result);
      return result; 
    } catch (err) {
      setError(err.message);
      throw err; 
    } finally {
      setLoading(false);
    }
  };

  return { updateTask, updateStatus, data, error, loading };
};

export default useGlobalTaskUpdate;