import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Screens/home';
import Dashboard from './Screens/dashboard';
import Login from './Screens/login';
import Signup from './Screens/signup';
import About from './Screens/about';
import Notfound from './Screens/notfound';
import Calculation from './Screens/calculation';



function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/">
        <Route index element={<Home />} />
        <Route path=":id/dashboard" element={<Dashboard />} />
        <Route path="calculation" element={<Calculation />} />
        <Route path="login" element={<Login />} />
        <Route path="about" element={<About />} />
        <Route path="signup" element={<Signup />} />
        <Route path="*" element={<Notfound />} />
      </Route>
    </Routes>
  </BrowserRouter>
 
  );
}

export default App;
