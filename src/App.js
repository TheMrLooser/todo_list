// import './App.css';
import Home from './pages/Home';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignIn from './pages/Auth';

function App() {
  return (
    <BrowserRouter>
    <Routes>
        <Route exact path="/home" element={<Home/>}></Route>
        <Route path={'/'} element={<SignIn/>}></Route>
    </Routes>
 </BrowserRouter>
    
  );
}

export default App;
