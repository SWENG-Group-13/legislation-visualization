import './App.css';
import Timeline from './Timeline.js';

var dummy = [
  { title: "Appropriation Act 2021", start: 2010, end: 2021, events: []},
  { title: "Health Act 2021", start: 2006, end: 2016, events: [] },
  { title: "Health Insurance Act 2021", start: 2009, end: 2018, events: []},
  { title: "Health and Criminal Justice Act 2021", start: 2014, end: 2022,
    events: [
      {start: 2016, content: "Stage 1"},
      {start: 2017, content: "Stage 2"},
      {start: 2018, content: "Stage 3"},
      {start: 2019, content: "Stage 4"}
    ]},
  { title: "Social Welfare Act 2021", category: "people", start: 2008, end: 2022, 
    events: [
      {start: 2010, content: "Stage 1"},
      {start: 2014, content: "Stage 2"},
      {start: 2017, content: "Stage 3"}
    ]},
  { title: "House of the Oireachtas Commission Act 2021", category: "people", start: 2001, end: 2010,
    events: [
      {start: 2007, content: "Stage 1"},
      {start: 2008, content: "Stage 2"},
      {start: 2009, content: "Stage 3"}
    ] },
  { title: "Tenancies Act 2021", category: "people", start: 2018, end: 2022, events: []}
]

function App() {
  return (
    <div className="App">
      <Timeline data={dummy}/>
    </div>
  );
}

export default App;
