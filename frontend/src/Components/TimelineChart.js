import React, { useEffect } from "react";
import TimelinesChart from "timelines-chart";
const convert = (arr) => {
	arr.sort((a, b) => (a.title === b.title ? 0 : a.title < b.title ? -1 : 1));
	console.log("arr", arr);
	let res = [{ group: "Bills", data: [] }];
	for (let i = 0; i < arr.length - 1; i++) {
		let { title, stage, date } = arr[i];
		let { stage: stage2, date: date2 } = arr[i + 1];
		if (new Date(date).getTime() === new Date(date2).getTime()) {
			let temp = new Date(date);
			temp.setTime(temp.getTime() - 12 * 60 * 60 * 1000);
			date = temp.toString();
		}
		if (stage2 - stage === 1) {
			if (stage === 1) {
				res[0].data.push({
					label: title,
					data: [
						{
							timeRange: [date, date2],
							val: `Stage ${stage} to Stage ${stage + 1}`,
						},
					],
				});
			} else {
				res[0].data[res[0].data.length - 1].data.push({
					timeRange: [date, date2],
					val: `Stage ${stage} to Stage ${stage + 1}`,
				});
			}
		}
	}
	console.log("res ", res);
	return res;
};
export const setUpChart = (data) => {
	const segmentClick = (data) => {
		console.log(data);
	};
	TimelinesChart()
		.rightMargin(100)
		.leftMargin(100)
		.maxHeight(1920)
		.width(window.screen.width - 100)
		.maxLineHeight(17)
		//.topMargin(40)
		.data(convert(data))
		.onSegmentClick(segmentClick)
		.zQualitative(true)(
		// .zColorScale(scale)
		document.getElementById("TimelineChart")
	);
};
export const TimelineChart = () => {
	return <div id='TimelineChart'></div>;
};
