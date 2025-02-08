import { useState, useEffect } from "react";
import moment from "moment";

const useCheckMonth = () => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(moment().format("YYYY-MM"));

  const fetchTasks = async (year, month) => {
    setLoading(true);
    setError(null);
    try {      
      const response = await fetch(`http://localhost:3001/months?year=${year}&month=${month}`);
      if (!response.ok) throw new Error("Failed to fetch tasks");

      //await checkAndCreateTasks(year, month);
      const result = await response.json();
      setTasks(result.globalTaskDates || []);
    } catch (err) {
      setError(err.message);
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
      //await fetchTasks(year, month);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    const [year, month] = currentMonth.split("-");    
    fetchTasks(year, month);    
  }, [currentMonth]);

  return { tasks, loading, error, currentMonth, setCurrentMonth, checkAndCreateTasks };
};

export default useCheckMonth;
