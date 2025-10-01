import Home from "./pages/Home";
import Start from "./pages/Start";

function App() {
  const hasData = localStorage.getItem("pkmon-storage");
  const skipStart = true;

  return hasData && skipStart ? <Home /> : <Start />;
}

export default App;
