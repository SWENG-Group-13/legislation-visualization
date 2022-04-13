import React from "react";
import "./App.css";
import Calendar from "./Components/Calendar.js";
import DirectedGraph from "./Components/DirectedGraph.js";
import SummaryStatistics from "./Components/SummaryStatistics.js"
import "react-toggle/style.css";
import { Content } from "Components/Content";
import { setUpChart, TimelineChart } from "Components/TimelineChart";
import { WideContent } from "Components/WideContent";
import HeaderLogo from "Assets/propylon-logo-long.webp";

function App() {

	const [val, setVal] = React.useState([]);
	const [val2, setVal2] = React.useState({ nodes: [], links: [] });
	const [val3, setVal3] = React.useState([]);
	const [val4, setVal4] = React.useState({});
	const [emptySearch, setEmptySearch] = React.useState(0);

	const fetchData = (useSearch) => {
		let date_start = document.getElementById("start").value;
		let date_end = document.getElementById("end").value;
		const url = "https://api.oireachtas.ie/v1/legislation?limit=100&date_start=" + date_start + "&date_end=" + date_end + "-" + getLastDayOfMonth(date_end) + "T23:59:59.999"

		fetch("https://api.oireachtas.ie/v1/members?date_start=1900-01-01&chamber_id=&date_end=2099-01-01&limit=2000")
			.then((response) => response.json())
			.then((data) => {
				const dummy4 = {
					// politicians and parties
				}
				for(let i = 0; i < data.results.length; i++)
				{
					dummy4[data.results[i].member.fullName] = data.results[i].member.memberships[0].membership.parties[0].party.showAs;
				}
				setVal4(dummy4);
			});

		fetch(url)
			.then((response) => response.json())
			.then((data) => {
				const dummy = [
					// data here
					// title stage and date of bills
				];

				const dummy2 = [
					// data here too!
					// names of bills and politicians
				]

				const dummy3 = [
					// data here three!
					// connections between bills and politicians
				]
				
				const searchTerm = document.getElementById("search").value;
				for (let i = 0; i < data.results.length; i++)
				{
					let title = data.results[i].bill.shortTitleEn;
					let billYear = data.results[i].bill.billYear
					let billNo = data.results[i].bill.billNo
					if(useSearch === false || title.toLowerCase().includes(searchTerm.toLowerCase()))
					{
						for (let j = 0; j < data.results[i].bill.stages.length; j++) {
							dummy.push({
								title: title,
								stage: j + 1,
								date: new Date(data.results[i].bill.stages[j].event.dates[0]["date"]),
								billYear: billYear,
								billNo: billNo,
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
					
				}

				setVal(dummy);
				console.log(val);
				setVal2({ nodes: dummy2, links: dummy3 })
				setUpChart(dummy);

				setVal3(dummy.filter(a => a.date < new Date(date_end) && a.date > new Date(date_start)));
				if(dummy2.length === 0){
					setEmptySearch(1);
				} else {
					setEmptySearch(0);
				}
			});
	};

	document.addEventListener("DOMContentLoaded", function () {
		fetchData();
	});

	function getCurrentMonth() {
		let today = new Date()
		let mm = today.getMonth() + 1 //January is 0
		let yyyy = today.getFullYear()

		if (mm < 10) mm = '0' + mm
		return (yyyy + '-' + mm)
	}

	function getMonthLastYear() {
		let date = getCurrentMonth().split("-")
		date[0] = date[0] - 1
		return (date[0] + '-' + date[1])
	}

	function getLastDayOfMonth(date) {
		let year = parseInt(date.substring(0, 4))
		let month = parseInt(date.substring(5))
		let lastDay = new Date(year, month, 0)
		return lastDay.getDate()
	}

	function handleChangeStart() {
		fetchData(false)
		let date = document.getElementById("start").value;
		document.getElementById("end").setAttribute("min", date);
	}

	function handleChangeEnd() {
		fetchData(false)
		let date = document.getElementById("end").value;
		document.getElementById("start").setAttribute("max", date);
	}

	function handleSearch(e) {
		e.preventDefault()
		fetchData(true)
	}

	const currentMonth = getCurrentMonth();
	const monthLastYear = getMonthLastYear();

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
						<label for="start">Range: </label>
						<input type="month" id="start" name="start" min="1922-10" max={currentMonth}
							defaultValue={monthLastYear} onChange={handleChangeStart}></input>
						<label for="end"> to </label>
						<input type="month" id="end" name="end" min={monthLastYear} max={currentMonth}
							defaultValue={currentMonth} onChange={handleChangeEnd}></input>
					</div>
				</form>
				<div class='space' />
				<form onSubmit={handleSearch}>
					<div>
						<input type="text" id="search" placeholder="Search for bills by name"></input>
					</div>
				</form>
			</header>
			{
				emptySearch === 1
				? <center className='no-match'>There are no bills that match your search.<br/>Try a different search term or increase the date range.</center>
				: <div>
					<div className='flex-wrapper'>
						<WideContent title={"Bills"}>
							<TimelineChart></TimelineChart>
						</WideContent>
					</div>

					<div className='flex-wrapper'>
						<Content title={"Sponsorship"}>
							<DirectedGraph data={val2} />
						</Content>
						<Content title={"Contributions"}>
							<Calendar data={val3}/>
						</Content>
					</div>
					<div className='flex-wrapper'>
						<WideContent title={"Summary Analytics"}>
							<SummaryStatistics data={val2} data2={val4} data3={val}/>
						</WideContent>
					</div>
			</div>
		}
		</div>
	);
}

export default App;