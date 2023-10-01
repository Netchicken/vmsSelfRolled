import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Switch, Route, Routes, createBrowserRouter, RouterProvider } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/pages/login" element={<Login />} /> */}

        <Route path="/" element={<Home />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="authentication" element={<Auth />} />

        <Route path="/settings" element={<InitialSetup />} />
        <Route path="/console" element={<Console />} />


      </Routes>
    </BrowserRouter>
  );
}

export default App;
