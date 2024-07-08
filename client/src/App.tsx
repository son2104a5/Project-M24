import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminMain from "./admin/MainAdmin";
import Dashboard from "./admin/pages/Dashboard";
import Profile from "./admin/pages/User";
import Category from "./admin/pages/Category";
import Products from "./admin/pages/Products";
import Order from "./admin/pages/Order";
import Comment from "./admin/pages/Comment";

export default function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Routes>
          <Route path="/admin" element={<AdminMain/>}>
            <Route path='dashboard' element={<Dashboard />} />
            <Route path="users" element={<Profile />} />
            <Route path="categories" element={<Category />} />
            <Route path="products" element={<Products />} />
            <Route path="orders" element={<Order />} />
            <Route path="comments" element={<Comment />} />
            {/* <Route path="setting" element={<Setting />} /> */}</Route>
        {/* ----- Tác vụ chung ----- */}
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/register" element={<Register/>}></Route>
        {/* ----- Tác vụ chung ----- */}
        </Routes>
      </Provider>
    </BrowserRouter>
  )
}
