import { Route, Routes } from "react-router-dom";
import Healthcheck from "./pages/ServerStatus/ServerHealthCheck";
import ReportExamplePage from "./pages/dummyPage/reportExamplePage";
import ReportPage from "./pages/ReportPage/ReportPage";

function App() {
  return (
    <Routes>
      <Route path='/server-status' Component={Healthcheck} />
      <Route path='/report-dummy' Component={ReportExamplePage} />
      <Route path='/report-page' Component={ReportPage} />
    </Routes>
  );
}

export default App;
