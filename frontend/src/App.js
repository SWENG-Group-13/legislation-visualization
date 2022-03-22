import React from 'react'
import './App.css'
import Calendar from './Components/Calendar.js'
import Timeline from './Components/Timeline.js'

function App() {

  const fetchData = () => {

    const url = "https://api.oireachtas.ie/v1/legislation?date_end=" + document.getElementById("end_date").value

    fetch(url)
        .then(response => response.json())
        .then(data => {

            const dummy = [
                // data here
            ]

            for(let i = 0; i < data.results.length; i++)
            {
                let title = data.results[i].bill.shortTitleEn;
                for(let j = 0; j < data.results[i].bill.stages.length; j++)
                {
                    dummy.push({title:title,stage:j+1,date:new Date(data.results[i].bill.stages[j].event.dates[0]["date"])});
                }
            }

            setVal(dummy);
            console.log(dummy);
        })
  }

  const [val, setVal] = React.useState([]);

  return (
    <div className="App">
      <h1>Demonstration</h1>
      <form>
        <label>
          Enter end date:<br/>
          <input type="text" id="end_date" size="10" maxLength="4"></input>
        </label>
        <input type="button" value="Fetch" onClick={fetchData}></input>
      </form>
      <Timeline data={val}/>
      <Calendar data={val}/>
    </div>
  );
}

export default App;