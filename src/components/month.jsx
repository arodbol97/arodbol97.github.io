import React, { useState } from "react";
import useCheckMonth from "./useCheckMonth";
import Day from "./day";
import DayCard from "./dayCard";
import moment from "moment";
import "moment/locale/es";

const Month = ({setTitle, handleComponentChange}) => {
  const { tasks, loading, error, currentMonth, setCurrentMonth, checkAndCreateTasks } = useCheckMonth();  
  moment.locale("es");
  setTitle(moment(currentMonth, "YYYY-MM").format("MMMM YYYY").replace(/^\w/, (c) => c.toUpperCase()));  

  const daysInMonth = moment(currentMonth, "YYYY-MM").daysInMonth();
  const daysArray = Array.from({ length: daysInMonth }, (_, i) =>
    moment(currentMonth, "YYYY-MM").date(i + 1).toDate()
  );
  const emptySpacesStart = (daysArray[0].getDay() + 6) % 7;
  const emptySpacesEnd = (7- daysArray[daysArray.length - 1].getDay()) % 7;

  const mainDivStyles = {    
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    height: '90vh'
  };

  const daysDivStyles = {
    border: '2px solid grey',
    width: '90%',
    display: 'flex',
    flexWrap: 'wrap',    
  };

  const emptyDivStyles = {
    background: 'repeating-linear-gradient(45deg, #ccc, #ccc 10px, #eee 10px, #eee 20px)',
    border: '2px solid grey',
    width: 'calc(14.28571428% - 4px)',
    aspectRatio: '1 / 0.5',
    margin: '0px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',      
  };

  return (
    <div style={mainDivStyles}>
      {loading && <p style={{position:'absolute'}}>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      
      <div style={daysDivStyles}>
        {Array.from({ length: emptySpacesStart }).map((_, index) => (
          <div key={`empty-start-${index}`} style={emptyDivStyles} />
        ))}
        {daysArray.map((day) => (
          <DayCard key={day} date={day} data={{ tasks }} handleComponentChange={handleComponentChange} />
        ))}
        {Array.from({ length: emptySpacesEnd }).map((_, index) => (
          <div key={`empty-end-${index}`} style={emptyDivStyles} />
        ))}
      </div>
    </div>
  );
};

export default Month;
