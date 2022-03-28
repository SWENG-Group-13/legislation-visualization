import React from "react";
import "./App.css";
import Calendar from "./Components/Calendar.js";
import DirectedGraph from "./Components/DirectedGraph.js";
import Toggle from "react-toggle";
import "react-toggle/style.css";
import { Searchbar } from "Searchbar";
import { Content } from "Components/Content";
import { setUpChart, TimelineChart } from "Components/TimelineChart";
import { WideContent } from "Components/WideContent";

function App() {
	//const [val, setVal] = React.useState([]);

	const fetchData = (input) => {
		const url = "https://api.oireachtas.ie/v1/legislation?date_end=" + input;
		//let date_end = parseInt(document.getElementById("end_date").value) + 1
		//const url = "https://api.oireachtas.ie/v1/legislation?date_end=" + date_end

		fetch(url)
			.then((response) => response.json())
			.then((data) => {
				const dummy = [
					// data here
				];

				const dummy2 = [
					// data here too!
				]
	
				const dummy3 = [
					// data here three!
				]

				for (let i = 0; i < data.results.length; i++) {
					let title = data.results[i].bill.shortTitleEn;
					for (let j = 0; j < data.results[i].bill.stages.length; j++) {
						dummy.push({
							title: title,
							stage: j + 1,
							date: new Date(data.results[i].bill.stages[j].event.dates[0]["date"]),
						});
					}
					dummy2.push({name:title,group:"bill"});
					for(let j = 0; j < data.results[i].bill.sponsors.length; j++)
					{
						dummy2.push({name:data.results[i].bill.sponsors[j].sponsor.by.showAs,group:"td"});
						if(data.results[i].bill.sponsors[j].sponsor.by.showAs)
							dummy3.push({source:data.results[i].bill.sponsors[j].sponsor.by.showAs,target:title});
					}
				}

				setVal(dummy);
				setVal2({nodes: dummy2, links: dummy3})
				console.log(dummy);
				setUpChart(dummy);
			});
	};

	const findMatch = (e) => {
		e.preventDefault();

		const searchTerm = document.getElementById("search").value;
		let matchFound = false;
		val.forEach((value) => {
			const { title } = value;
			if (title.includes(searchTerm)) {
				console.log(title);
				matchFound = true;
			}
		});
		if (!matchFound) {
			console.log("No results match your search");
		}
	};

	const swapGraph = () => {
		if (graphChosen === 0) {
			setGraphChosen(1);
		} else {
			setGraphChosen(0);
		}
	};

	const [val, setVal] = React.useState([]);
	const [val2, setVal2] = React.useState({nodes:[],links:[]});
	const [graphChosen, setGraphChosen] = React.useState(0);

	return (
		<div style={{ paddingTop: "4.5rem" }}>
			<header>
				<span>
					<img
						src={
							"https://propylon.com/wp-content/uploads/elementor/thumbs/propylon-logo-324x32-2-pe7hc5jhbq86h8p0tq5dj2o8pus12x6hdoqg7ktwlc.png"
						}
						alt='Propylon Logo'
					/>
				</span>
				<form onSubmit={fetchData}>
					<div>
						<label>
							<Searchbar placeholder='Search Year' onClick={fetchData} />
						</label>
					</div>
				</form>
			</header>

			<div className='flex-wrapper'>
				<WideContent title={"Bills"}>
					<TimelineChart></TimelineChart>
				</WideContent>
				{/* <div className='flex-row'>
					<div className='flex-item'>
						<h2>Graph 1</h2>
						<Timeline data={val} />
						<TimelineChart data={val}></TimelineChart>
					</div>
				</div> */}
			</div>

			<div className='flex-wrapper'>
				{/* <div className='flex-column'>
					<div className='flex-item'>
						<h2>Propylon</h2>
						<img src={require("./propylon.jpg")} alt='Propylon Logo' />
					</div>
				</div> */}
				<Content title={"Sponsorship"}>
					<DirectedGraph data={val2}/>
				</Content>
				<Content title={"Contributions"}>
					<Calendar data={val} />
				</Content>
			</div>
		</div>

		// <div className="App">
		//   <img src={require('./propylon.jpg')} alt="Propylon Logo" />
		//   <h1>Demonstration</h1>

		//   <label>
		//     <Toggle
		//       id='graph-selector'
		//       onChange={swapGraph}
		//       icons={false}
		//     />
		//     <span>Switch graph view</span>
		//   </label>

		//   <form onSubmit={fetchData}>
		//     <label>
		//       Enter end year:<br/>
		//       <input type="text" id="end_year" size="10" maxLength="4"></input>
		//     </label>
		//     <button type="submit">Fetch</button>
		//   </form>

		//   <form onSubmit={findMatch}>
		//     <label>
		//       Search:<br />
		//       <input type="text" id="search" size="18"></input>
		//       <br />
		//     </label>
		//   </form>

		//   {
		//     graphChosen === 0
		//     ? <Timeline data={val}/>
		//     : <Calendar data={val}/>
		//   }
		// </div>
	);
}

export default App;
