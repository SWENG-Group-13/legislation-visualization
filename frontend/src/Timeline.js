const leg_api = "https://api.oireachtas.ie/v1/legislation"

function Timeline() {
    return (
      <div className="Timeline">
        
      </div>
    );
  }

  async function getLegislation() {
    const response = await fetch(leg_api)
    const legislation = await response.json()
    const {results: {counts: {billCount, resultCount}}} = data

    console.log(billCount)
    console.log(resultCount)
  }

  getLegislation().catch(error => {
    console.error(error)
})

  export default Timeline;