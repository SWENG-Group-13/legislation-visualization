import React from 'react'
import './App.css'
import Calendar from './Components/Calendar.js'
import Timeline from './Components/Timeline.js'
import Toggle from 'react-toggle'
import "react-toggle/style.css"

function App() {

  //const [val, setVal] = React.useState([]);

  const fetchData = e => {

    e.preventDefault();


    const url = "https://api.oireachtas.ie/v1/legislation?date_end=" + document.getElementById("end_year").value
    //let date_end = parseInt(document.getElementById("end_date").value) + 1
    //const url = "https://api.oireachtas.ie/v1/legislation?date_end=" + date_end

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

  const findMatch = e => {
    e.preventDefault();

    const searchTerm = document.getElementById("search").value
    let matchFound = false
    val.forEach(value => {

      const {title} = value
      if(title.includes(searchTerm))
      {
        console.log(title)
        matchFound = true
      }
    })
    if(!matchFound)
    {
      console.log("No results match your search")
    }
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

      <form onSubmit={fetchData}>
        <label>
          Enter end year:<br/>
          <input type="text" id="end_year" size="10" maxLength="4"></input>
        </label>
        <button type="submit">Fetch</button>
      </form>

      <form onSubmit={findMatch}>
        <label>
          Search:<br />
          <input type="text" id="search" size="18"></input>
          <br />
        </label>
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