import React, { useState, useEffect } from 'react';
import useTaskNew from "./useTaskNew";

const NewTaskForm = ({ date }) => {

    const { addTask, error } = useTaskNew();

    const divStyles = {
        display: 'flex',
        flexWrap: 'wrap',
        width: '100%',
        alignItems: 'flex-start'
    };

    const formStyles = {
        width: '100%',
    };

    const labelStyles = {
        color: 'white',
        width: '20%',
        textAlign: 'right',
        paddingRight: '10px',
        marginBottom: '5px'
    };

    const inputStyles = {
        width: 'calc(100% - 0px)',
        marginBottom: '10px',
        boxSizing: 'border-box',
        backgroundColor: 'lightgrey'
    };

    const buttonStyles = {
        width: 'calc(50% - 0px)',
        marginTop: '15px',
        boxSizing: 'border-box',
        color: 'white',
        cursor: 'pointer'
    };

    const titleStyles = {
        border: '5px solid #282c34',
        width: '100%',
        height: '30px',
        color: 'white',
        margin: '10px 0 20px 0',    
        textAlign: 'center',
        backgroundColor: '#007bff'
      };

    const errorStyles = {
        width: '100%',
        textAlign: 'center',
        color: 'red',
        fontSize: '15px',
    };

    const [taskName, setTaskName] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [taskDate, setTaskDate] = useState(date);
    const [taskPoints, setTaskPoints] = useState(100);

    const cancelForm = () => {
        
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        if (name === 'name') {
            setTaskName(value);
        } else if (name === 'description') {
            setTaskDescription(value);
        } else if (name === 'date') {
            setTaskDate(value);
        } else if (name === 'points') {
            setTaskPoints(value);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = {
            taskUser: 1,
            taskName: taskName,
            taskDescription: taskDescription,
            taskDate: taskDate,
            taskPoints: taskPoints,
            globalTask: false,
        };
        
        try {
            await addTask(formData);
        await addTask(formData);
        } catch (error) {
            console.error('Create error: ', error);
            document.getElementById('formError').innerHTML = error.message;
        }
    };

    useEffect(() => {
        return () => {
            cancelForm();
        };
    }, []);

    return (
        <div style={divStyles}>
            <h3 style={titleStyles}>Nueva tarea</h3>
            <form onSubmit={handleSubmit} style={formStyles} id='newForm'>
                <label style={labelStyles}>Nombre:</label>
                <input style={inputStyles} type="text" name="name" value={taskName} maxLength={50} onChange={handleChange} />
                <label style={labelStyles}>Descripción:</label>
                <textarea style={{ ...inputStyles, resize: 'vertical' }} name="description" value={taskDescription} onChange={handleChange}></textarea>
                <label style={labelStyles}>Puntos:</label>
                <input style={inputStyles} type="number" name="points" value={taskPoints} onChange={handleChange} />
                <label style={labelStyles}>Fecha:</label>
                <input style={inputStyles} type="date" name="date" value={taskDate} onChange={handleChange} />
                <button style={{ ...buttonStyles, backgroundColor: 'red', color: 'white', fontWeight: 'bold' }} type="button" onClick={cancelForm}>Cancelar</button>
                <button style={{ ...buttonStyles, backgroundColor: '#007bff', color: 'white', fontWeight: 'bold' }} type="submit">Confirmar</button>
                <span id="formError" style={errorStyles}></span>
            </form>
        </div>
    );
};

export default NewTaskForm;