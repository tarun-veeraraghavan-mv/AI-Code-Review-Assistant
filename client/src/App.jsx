import { BrowserRouter, Routes, Route } from "react-router-dom";
import TestComp from "./components/TestComp";
import Docs from "./components/Docs";
import Signin from "./components/Signin";
import { AuthProvider } from "./contexts/AuthContext";
import Reports from "./components/Reports";
import Login from "./components/Login";
import ReportList from "./components/ReportList";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<TestComp />} />
          <Route path="/docs" element={<Docs />} />
          <Route path="/report" element={<ReportList />} />
          <Route path="/report/:reportId" element={<Reports />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
