import React from 'react'
import './App.css'
import Calendar from './Components/Calendar.js'
import Timeline from './Components/Timeline.js'
import Toggle from 'react-toggle'
import "react-toggle/style.css"

function App() {

  const fetchData = () => {

    const url = "https://api.oireachtas.ie/v1/legislation?date_end=" + document.getElementById("end_year").value

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

  const swapGraph = () => {
    if(graphChosen===0){
      setGraphChosen(1)
    } else {
      setGraphChosen(0)
    }
  }

  const [val, setVal] = React.useState([]);
  const [graphChosen, setGraphChosen] = React.useState(0);

  return (
    <div className="App">
      <img src={require('./propylon.jpg')} alt="Propylon Logo" />
      <h1>Demonstration</h1>

      <label>
        <Toggle 
          id='graph-selector'
          onChange={swapGraph}
          icons={false}
        />
        <span>Switch graph view</span>
      </label>
      
      <form>
        <label>
          Enter end year:<br/>
          <input type="text" id="end_year" size="10" maxLength="4"></input>
        </label>
        <input type="button" value="Fetch" onClick={fetchData}></input>
      </form>
      {
        graphChosen === 0
        ? <Timeline data={val}/>
        : <Calendar data={val}/>
      }
    </div>
  );
}

export default App;