import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Access } from "./pages/Access";
import { Home } from "./pages/Home";
import { Toaster } from "react-hot-toast";


export default function App() {
  return (
    <>
      <Toaster position="top-center" richColors />
      <Router>
        <Routes>
          <Route path="/login" element={<Access />} />
          <Route path="/register" element={<Access />} />
          <Route path="/" element={<Home />} />

        </Routes>
      </Router>
    </>
  );
}
