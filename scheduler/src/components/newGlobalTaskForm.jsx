import React, { useState } from 'react';
import useTaskNew from './useGlobalTaskNew'; 
import Month from './month';

const NewGlobalTaskForm = ({handleComponentChange}) => {
  const { addTask, error } = useTaskNew();

  const [globalTaskName, setGlobalTaskName] = useState('');
  const [globalTaskDescription, setGlobalTaskDescription] = useState('');
  const [globalTaskPoints, setGlobalTaskPoints] = useState(100);
  const [selectedDays, setSelectedDays] = useState([0, 1, 2, 3, 4, 5, 6]); 

  const mainDivStyles = {    
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    height: '90vh'
  };

  const formDivStyles = {
    border: '2px solid grey',
    width: '50%',    
    display: 'flex',
    flexWrap: 'wrap',    
  };

  const fieldsetStyles = {
    border: '0px',
    width: '100%',    
    display: 'flex',
    flexWrap: 'wrap',     
  };

  const legendStyles = {
    fontSize: '22px',
    fontWeight: 'bold'    
  };

  const labelStyles = {
    color: 'black',
    width: '20%',
    textAlign: 'right',    
  };

  const inputStyles = {
    width: '100%',
    marginBottom: '10px',
    backgroundColor: 'lightgrey',    
  };

  const textareaStyles = {
    width: '100%',
    marginBottom: '10px',
    backgroundColor: 'lightgrey',
    resize: 'vertical',    
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'name') {
      setGlobalTaskName(value);
    } else if (name === 'description') {
      setGlobalTaskDescription(value);
    } else if (name === 'points') {
      setGlobalTaskPoints(value);
    } else if (name === 'days') {
      const newSelectedDays = [...selectedDays];
      const day = parseInt(value, 10);
      if (newSelectedDays.includes(day)) {
        newSelectedDays.splice(newSelectedDays.indexOf(day), 1); 
      } else {
        newSelectedDays.push(day); 
      }
      setSelectedDays(newSelectedDays);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();    

    const formData = {
      globalTaskName,
      globalTaskDescription,
      globalTaskPoints,
      globalTaskUser: 1, 
      globalTaskDays: JSON.stringify(selectedDays),
      globalTask: true,
    };

    try {
      await addTask(formData);
      handleComponentChange(<Month/>);
    } catch (error) {
      console.error('Error creating global task:', error);
      document.getElementById('formError').innerHTML = error.message;
    }
  };

  const cancelForm = () => {
    setGlobalTaskName('');
    setGlobalTaskDescription('');
    setGlobalTaskPoints(100);
    setSelectedDays([0, 1, 2, 3, 4, 5, 6]);
    handleComponentChange(<Month/>);
  };

  return (
    <div style={mainDivStyles}>      
      <form onSubmit={handleSubmit} style={formDivStyles} id='newGlobalTaskForm'>
        <fieldset style={fieldsetStyles}>
          <legend style={legendStyles}>Nueva Tarea Global</legend>
          <label style={labelStyles}>Nombre:</label>
          <input
            style={inputStyles}
            type="text"
            name="name"
            value={globalTaskName}
            maxLength={50}
            onChange={handleChange}
          />
          <label style={labelStyles}>Descripción:</label>
          <textarea
            style={textareaStyles}
            name="description"
            value={globalTaskDescription}
            onChange={handleChange}
          />
          <label style={labelStyles}>Puntos:</label>
          <input
            style={inputStyles}
            type="number"
            name="points"
            value={globalTaskPoints}
            onChange={handleChange}
          />
          <div style={{ marginBottom: '10px' }}>
            <label style={{ color: 'black' }}>Seleccionar días:</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'].map((day, index) => (
                <label key={index} style={labelStyles}>
                  <input
                    type="checkbox"
                    name="days"
                    value={(index+1)%7}
                    checked={selectedDays.includes((index+1)%7)}
                    onChange={handleChange}
                  />
                  {day}
                </label>
              ))}
            </div>
          </div>
          <button
            style={{
              width: 'calc(50% - 0px)',
              marginTop: '15px',
              boxSizing: 'border-box',
              backgroundColor: 'red',
              color: 'white',
              fontWeight: 'bold',
            }}
            type="button"
            onClick={cancelForm}
          >
            Cancelar
          </button>
          <button
            style={{
              width: 'calc(50% - 0px)',
              marginTop: '15px',
              boxSizing: 'border-box',
              backgroundColor: '#007bff',
              color: 'white',
              fontWeight: 'bold',
            }}
            type="submit"
          >
            Confirmar
          </button>
          <span id="formError" style={{ width: '100%', textAlign: 'center', color: 'red', fontSize: '15px' }}></span>
        </fieldset>
      </form>
    </div>
  );
};

export default NewGlobalTaskForm;
