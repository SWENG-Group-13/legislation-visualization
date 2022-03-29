import React from "react";
import "./App.css";
import Calendar from "./Components/Calendar.js";
import DirectedGraph from "./Components/DirectedGraph.js";
import "react-toggle/style.css";
import { Content } from "Components/Content";
import { setUpChart, TimelineChart } from "Components/TimelineChart";
import { WideContent } from "Components/WideContent";
import HeaderLogo from "./propylon-logo-long.webp";

function App() {

	const fetchData = () => {
		let date_start = document.getElementById("start").value;
		let date_end = document.getElementById("end").value;
		const url = "https://api.oireachtas.ie/v1/legislation?date_start=" + date_start + "&date_end=" + date_end + "-" + getLastDayOfMonth(date_end) + "T23:59:59.999"

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
					dummy2.push({ name: title, group: "bill" });
					for (let j = 0; j < data.results[i].bill.sponsors.length; j++) {
						if (data.results[i].bill.sponsors[j].sponsor.by.showAs)
							dummy2.push({ name: data.results[i].bill.sponsors[j].sponsor.by.showAs, group: "td" });
						if (data.results[i].bill.sponsors[j].sponsor.by.showAs)
							dummy3.push({ source: data.results[i].bill.sponsors[j].sponsor.by.showAs, target: title });
					}
				}

				setVal(dummy);
				setVal2({ nodes: dummy2, links: dummy3 })
				console.log(dummy2);
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

	function getCurrentMonth() {
		let today = new Date()
		let mm = today.getMonth() + 1 //January is 0
		let yyyy = today.getFullYear()

		if (mm < 10) mm = '0' + mm
		return (yyyy + '-' + mm)
	}

	function getLastDayOfMonth(date) {
		let year = parseInt(date.substring(0, 4))
		let month = parseInt(date.substring(5))
		let lastDay = new Date(year, month, 0)
		return lastDay.getDate()
	}

	const [val, setVal] = React.useState([]);
	const [val2, setVal2] = React.useState({ nodes: [], links: [] });
	const [graphChosen, setGraphChosen] = React.useState(0);

	return (
		<div style={{ paddingTop: "4.5rem" }}>
			<header>
				<span>
					<img
						src={
							HeaderLogo
						}
						alt='Propylon Logo'
					/>
				</span>
				<form onSubmit={fetchData}>
					<div>
						<label for="start">Select range for data: </label>
						<input type="month" id="start" name="start" required={true} min="1950-01" max={getCurrentMonth()} defaultValue="2020-01"></input>
						<label for="end"> to </label>
						<input type="month" id="end" name="end" required={true} min="1950-01" max={getCurrentMonth()} defaultValue={getCurrentMonth()}></input>
						<label for="submit"> </label>
						<input type="button" id="submit" value="Fetch" onClick={fetchData}></input>
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
					<DirectedGraph data={val2} />
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