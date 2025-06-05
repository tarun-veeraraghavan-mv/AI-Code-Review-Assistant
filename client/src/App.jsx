import { BrowserRouter, Routes, Route } from "react-router-dom";
import TestComp from "./components/TestComp";
import Docs from "./components/Docs";
import Signin from "./components/Signin";
import { AuthProvider } from "./contexts/AuthContext";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<TestComp />} />
          <Route path="/docs" element={<Docs />} />
          <Route path="/signin" element={<Signin />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
