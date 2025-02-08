import React from 'react';
import { BsCalendarPlusFill, BsPersonSlash } from 'react-icons/bs';
import NewGlobalTaskForm from './newGlobalTaskForm'; 

const Header = ({title, handleComponentChange}) => {    
  const headerStyles = {
      backgroundColor: '#282c34',
      minHeight: '10vh',
      display: 'flex',      
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
  };  

  const buttonStyles = {
    backgroundColor: '#282c34',
    border: '0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '20px',
    color: 'white',
    fontSize: '20px',
    cursor: 'pointer'
  };    

  const handleNewButtonPress = () => {
    handleComponentChange(<NewGlobalTaskForm/>);
  };

  return (
    <header style={headerStyles}>
      <h1>{title}</h1>
      <button style={buttonStyles} onClick={handleNewButtonPress}><BsCalendarPlusFill size={25}/></button>
    </header>
  );
};

export default Header;