import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Switch, Route, Routes, createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from './components/Home';
import Auth from './components/auth/Auth';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/pages/login" element={<Login />} /> */}

        <Route path="/" element={<Home />} />

        <Route path="authentication" element={<Auth />} />




      </Routes>
    </BrowserRouter>
  );
}

export default App;
