import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./modules/sign-up";
import Login from "./modules/login";
import Main from "./modules/main";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
