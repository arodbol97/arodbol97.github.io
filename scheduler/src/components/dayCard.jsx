import React, { useState, useEffect } from 'react'; 
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import useGlobalTaskUpdate from './useGlobalTaskUpdate';
import Month from './month';

const DayCard = ({ date, data }) => {      

  const [dayTasks, setDayTasks] = useState([]);

  const divStyles = {
      backgroundColor: 'white',
      border: '2px solid black',
      width: 'calc(14.28571428% - 4px)',
      aspectRatio: '1 / 0.5',
      margin: '0px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',      
  };

  const tasksDivStyles = {
    backgroundColor: 'lightgrey',
    width: '100%',
    height: '14%',
    display: 'flex',    
    justifyContent: 'flex-end',
    marginTop: 'auto'
  };

  const taskDivStyles = {    
    width: '20px',
    height: '100%',
    marginLeft: '2px',    
    cursor: 'pointer'
  };

  const {updateStatus, loading} = useGlobalTaskUpdate();

  const formattedDate = date
    ? date.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric' })
      .replace(/^\w/, (char) => char.toUpperCase())
      .replace(/(?:^|\s)\w/g, (char) => char.toUpperCase())
    : 'No date provided';
    

  const handleDayClick = () => {

  };

  const handleTaskClick = async (id, dateId, status) => {    
    switch (status) {
      case 'pending':
        status = 'done';
        break;
      case 'done':
        status = 'failed';
        break;
      case 'failed':
        status = 'justified';
        break;
      case 'justified':
        status = 'pending';
        break;    
      default:
        console.log("Invalid status");
        break;
    }
    await updateStatus({globalTaskId: id, globalTaskDateId: dateId, globalTaskStatus: status});
    
    setDayTasks(prevTasks =>
      prevTasks.map(task =>
        task.globalTaskId === id
          ? { ...task, globalTaskStatus: status }
          : task
      )
    );
  };

  useEffect(() => {   
    if (data?.tasks && date) {
      const filteredTasks = data.tasks.filter(task => {
        const taskDateNormalized = new Date(task.globalTaskDate);
        taskDateNormalized.setHours(0, 0, 0, 0);
  
        const currentDateNormalized = new Date(date);
        currentDateNormalized.setHours(0, 0, 0, 0);
  
        return currentDateNormalized.getTime() === taskDateNormalized.getTime();
      });
      setDayTasks(filteredTasks);
    }
    }, [data, date]);

  return (
    <div style={divStyles}>

      <h3>{formattedDate}</h3>      

      <div style={tasksDivStyles}>
        {dayTasks.map((task) => (
          <div 
            key={task.globalTaskId} 
            style={{
              ...taskDivStyles, 
              backgroundColor: task.globalTaskStatus === 'pending' 
                ? '#1234' 
                : task.globalTaskStatus === 'done' 
                ? 'green' 
                : task.globalTaskStatus === 'failed' 
                ? 'red' 
                : task.globalTaskStatus === 'justified' 
                ? 'orange' 
                : 'grey'
            }} 
            data-tooltip-id={`task-tooltip-${task.globalTaskId}`}
            data-tooltip-content={task.globalTaskName}
            onClick={() => handleTaskClick(task.globalTaskId, task.globalTaskDateId, task.globalTaskStatus)}>
            
            <Tooltip id={`task-tooltip-${task.globalTaskId}`}/>
          </div>
        ))}
      </div>      

    </div>    
  );
};

export default DayCard;
