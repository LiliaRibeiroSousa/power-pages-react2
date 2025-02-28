import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Contacts from "./pages/UserManagement.jsx";



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Contacts />} />
      </Routes>
    </Router>
  );
}

export default App;
