import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./modules/sign-up";
import Login from "./modules/login";
import Main from "./modules/main";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AlertProvider } from "./contexts/AlertContext/AlertProvider";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <AlertProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </BrowserRouter>
      </AlertProvider>
    </QueryClientProvider>
  );
}

export default App;
