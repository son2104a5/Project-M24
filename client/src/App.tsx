import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminMain from "./admin/MainAdmin";

export default function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Routes>
          <Route path="/admin/*" element={<AdminMain/>}></Route>
        {/* ----- Tác vụ chung ----- */}
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/register" element={<Register/>}></Route>
        {/* ----- Tác vụ chung ----- */}
        </Routes>
      </Provider>
    </BrowserRouter>
  )
}
