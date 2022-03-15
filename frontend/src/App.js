import React from 'react';
import './App.css';
import Calendar from './Components/Calendar.js';
import Timeline from './Components/Timeline.js'

function App() {

  const [val,setVal] = React.useState([]);

  const fetchData = () => {

    const url = "https://api.oireachtas.ie/v1/legislation?date_end=2020"

    fetch(url)
        .then(response => response.json())
        .then(data => {

            const dummy = [
                // data here
            ]

            for(let i = 0; i < data.results.length; i++) {
                let title = data.results[i].bill.shortTitleEn;
                for(let j = 0; j < data.results[i].bill.stages.length; j++) {
                    dummy.push({title:title,stage:j+1,date:new Date(data.results[i].bill.stages[j].event.dates[0]["date"])});
                }
            }

            setVal(dummy);
            console.log(dummy);
        })
  }
  
  return (
    <div className="App">
      <h1>Demonstration</h1>
      <form>
        <input type="button" value="Fetch" onClick={fetchData}></input>
      </form>
      <Timeline data={val}/>
      <Calendar data={val}/>
    </div>
  );
}

export default App;