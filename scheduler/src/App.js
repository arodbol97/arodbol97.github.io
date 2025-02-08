import './App.css';
import Header from './components/header';
import Month from './components/month';
import React, { useState, useEffect } from 'react';

function App() {    
  const [comp, setComp] = useState(<Month date={new Date()}/>);
  const [title, setTitle] = useState('Scheduler 3000');

  const handleComponentChange = (component) => {
    setComp(component);
  }; 

  useEffect(() => {   
  }, [comp]);

  return (
    <div className="App">
      <Header handleComponentChange={handleComponentChange} title={title}/>      
      
      {React.cloneElement(comp, {handleComponentChange, setTitle})}
    </div>
  );
}

export default App;
