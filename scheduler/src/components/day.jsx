import React, { useState } from 'react';
import Task from './task';
import useFetch from "./useFetch";
import NewTaskForm from './newTaskForm'; 

const Day = ({ date, data }) => {    
  const [showForm, setShowForm] = useState(false);   

  const headerStyles = {
      backgroundColor: '#282c34',
      minHeight: '10vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'black',
  };

  const formattedDate = date
    ? date.toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
        .replace(/^\w/, (char) => char.toUpperCase())
        .replace(/(?:^|\s)\w/g, (char) => char.toUpperCase())
    : 'No date provided';
  
  const currentDateOnly = new Date(date);
  currentDateOnly.setHours(0, 0, 0, 0); 
  
  const normalizeTaskDate = (taskDate) => {
    const mysqlDate = new Date(taskDate); 
    mysqlDate.setHours(0, 0, 0, 0); 
    return mysqlDate;
  };
  
  const dayTasks = data?.tasks?.filter(task => {
    const taskDateNormalized = normalizeTaskDate(task.globalTaskDate);
    console.log(normalizeTaskDate(task.globalTaskDate));
    return currentDateOnly.getTime() === taskDateNormalized.getTime();
  });

  return (
    <div>
      {}
      <h1>{formattedDate}</h1>    

      {dayTasks && dayTasks.length > 0 ? (
        <div>
          <h2>Tasks for today:</h2>
          <ul>
            {dayTasks.map((task) => (
              <li key={task.taskId}>
                <span>{task.globalTaskName}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No tasks for today</p>
      )}
      
      <button 
        style={{ backgroundColor: '#007bff', color: 'black', padding: '10px', border: 'none', cursor: 'pointer' }}
        onClick={() => setShowForm(!showForm)}
      >
        {showForm ? "Cancelar" : "Nueva Tarea"}
      </button>
      
      {showForm && <NewTaskForm date={date} />}
    </div>    
  );
};

export default Day;
