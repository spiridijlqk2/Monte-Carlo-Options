import Form from "./Components/Form";
import {useState} from "react";
import Graph from "./Components/Graph";
import {MCAsian} from "./Util/stochasticEuler";


function App() {
  const [data, setData] = useState();



  return (
    <div>
      <Form onChange={formData => {
        setData(formData);
        alert('Option price: ' + MCAsian(formData.data))
      }}></Form>

      <Graph yData={data?.graphData?.yData} xData={data?.graphData?.xData}/>


    </div>
  );
}

export default App;
