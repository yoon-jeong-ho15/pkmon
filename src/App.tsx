import Home from "./pages/Home";
import Start from "./pages/Start";

function App() {
  // const hasData = localStorage.getItem("pkmon_data");
  const skipStart = false;

  return skipStart ? <Home /> : <Start />;
}

export default App;
