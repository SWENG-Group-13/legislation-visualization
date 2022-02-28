import React from 'react';


function Calendar() {
    getCalendar(2020);
    return (
      <div className="Calendar">

      </div>
    );
  }

  function getCalendar(year){
    const legislationUrl = 'https://api.oireachtas.ie/v1/legislation?date_start='+year+'-01-01&date_end='+year+'-12-31&limit=100';
    fetch(legislationUrl)
      .then(response => response.json())
      .then(data => {
        //console.log(data);
        return data;
      });
  }
  
  export default Calendar;