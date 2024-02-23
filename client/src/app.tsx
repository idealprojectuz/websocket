import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" Component={Login} />
        <Route path="*" Component={Home} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
