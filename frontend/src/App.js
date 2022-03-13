import './App.css';
import React from 'react';

function App() {

  const [data, setData] = React.useState(null);
  const [data2, setData2] = React.useState("word");

  React.useEffect(() => {
    setData("hey");
  }, []);

  const handler = e => {
    setData2(e.target.value);
  }

  return (
    <div className="App">
      <h1>{data}</h1>
      <form>
        <label>
          Input?
          <br></br>
          <input
            type="text"
            value={data2}
            onChange={handler}
          ></input>
        </label>
      </form>
      <h2>{data2}</h2>
    </div>
  );
}

export default App;
