import { useState } from "react";

const useTaskNew = () => {
  const [data, setData] = useState(null);
  const [global, setGlobal] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const addTask = async (newTask) => {
    setLoading(true);
    setError(null);

    if (newTask.globalTask === true) {
      setGlobal('global-');
    }

    try {
      const response = await fetch(`http://localhost:3001/${global}tasks/new`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTask),
      });

      if (!response.ok) {
        throw new Error('Failed to create a new task');
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

  return { addTask, data, error, loading };
};

export default useTaskNew;