import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./modules/sign-up";
import Login from "./modules/login";
import Main from "./modules/main";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AlertProvider } from "./contexts/AlertContext/AlertProvider";
import { ProtectedRoute } from "./routes/ProtectedRoute";
import MyBoard from "./modules/my-board";
import OtpVerify from "./modules/otp-verify";
import { ProtectedRouteLogin } from "./routes/ProtectedRouteLogin";
import { ProtectedRouteOtp } from "./routes/ProtectedRouteOtp";
import ForgotPassword from "./modules/forgot-password";
import { GeneralLayout } from "./components";
import NewEvent from "./modules/new-event";

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      mutations: {
        gcTime: Infinity,
      },
      queries: {
        gcTime: 1000 * 60 * 60, // 1 hora
        refetchOnWindowFocus: false,
        retry: false,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <AlertProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<GeneralLayout />}>
              <Route path="/" element={<Main />} />

              <Route element={<ProtectedRouteLogin />}>
                <Route path="/login" element={<Login />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/sign-up" element={<SignUp />} />
              </Route>

              <Route element={<ProtectedRouteOtp />}>
                <Route path="/otp-verify" element={<OtpVerify />} />
              </Route>

              <Route element={<ProtectedRoute />}>
                <Route path="/my-board" element={<MyBoard />} />
                <Route path="/new-event" element={<NewEvent />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </AlertProvider>
    </QueryClientProvider>
  );
}

export default App;
