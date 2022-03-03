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
        console.log(data);        
        let info = new Map();

        for(let i = 0; i < data.results.length; i++){
          let bill = data.results[i].bill;
          let startDate = bill.debates[bill.debates.length -1].date; //this is the date on which the bill was first debated
          let stage = bill.status;
          let endDate = null;
          if (stage === "Enacted"){
            endDate = bill.act.dateSigned;
          }
          let object = {"startDate" : startDate, "stage" : stage, "endDate": endDate};

          info.set(bill.billNo, object);
        }
        console.log(info);
      });

  }
  
  export default Calendar;