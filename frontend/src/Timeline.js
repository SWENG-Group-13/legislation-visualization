const leg_api = "https://api.oireachtas.ie/v1/legislation"

class Bill
{
  constructor(billNo, billType, billYear, status, lastUpdated, longTitleEn)
  {
    this.billNo = billNo;
    this.billType = billType;
    this.billYear = billYear;
    this.status = status;
    this.lastUpdated = lastUpdated;
    this.longTitleEn = longTitleEn;
  }
}

function Timeline() {
  return (
    <div className="Timeline">
        
    </div>
  );
}

async function getLegislation() {

    const response = await fetch(legislation_api)
    const data = await response.json()

    const {results} = data
    let bills = []
    for(let i = 0; i < results.length; i++)
    {
      const {bill: {billNo, billType, billYear, status, lastUpdated, longTitleEn}} = results[i];
      bills[i] = new Bill(billNo, billType, billYear, status, lastUpdated, longTitleEn)
    }

    console.log(bills)
    return bills
}

getLegislation().catch(error => {
  console.error(error)
})

export default Timeline;