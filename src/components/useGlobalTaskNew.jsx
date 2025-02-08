import { useState } from "react";
import moment from "moment";

const useGlobalTaskNew = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(moment().format("YYYY-MM"));

  const addTask = async (newTask) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:3001/global-tasks/new', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTask),
      });

      if (!response.ok) {
        throw new Error('Failed to create a new task');
      }

      const [year, month] = currentMonth.split("-");
      await checkAndCreateTasks(year, month);

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

  const checkAndCreateTasks = async (year, month) => {
    try {
      const response = await fetch(`http://localhost:3001/months/checkGlobalTasks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ year, month }),
      });

      if (!response.ok) throw new Error("Failed to check tasks");      
    } catch (err) {
      setError(err.message);
    }
  };

  return { addTask, data, error, loading };
};

export default useGlobalTaskNew;