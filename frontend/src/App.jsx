import { Route, Routes } from "react-router-dom";
import Healthcheck from "./pages/ServerStatus/ServerHealthCheck";
import ReportExamplePage from "./pages/dummyPage/reportExamplePage";

function App() {
  return (
    <Routes>
      <Route path='/server-status' Component={Healthcheck} />
      <Route path='/report' Component={ReportExamplePage} />
    </Routes>
  );
}

export default App;
