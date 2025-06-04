import { BrowserRouter, Routes, Route } from "react-router-dom";
import TestComp from "./components/TestComp";
import Docs from "./components/Docs";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TestComp />} />
        <Route path="/docs" element={<Docs />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
