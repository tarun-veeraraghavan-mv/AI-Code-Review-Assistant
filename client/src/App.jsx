import { BrowserRouter, Routes, Route } from "react-router-dom";
import TestComp from "./components/TestComp";
import Docs from "./components/Docs";
import Signin from "./components/auth/Signin";
import { AuthProvider } from "./contexts/AuthContext";
import Reports from "./components/reports/Reports";
import Login from "./components/auth/Login";
import ReportList from "./components/reports/ReportList";
import AppToaster from "./ui/AppToaster";
import Chat from "./components/chat/Chat";

function App() {
  return (
    <AuthProvider>
      <AppToaster />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<TestComp />} />
          <Route path="/docs" element={<Docs />} />
          <Route path="/report" element={<ReportList />} />
          <Route path="/report/:reportId" element={<Reports />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<p>Page not found</p>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
