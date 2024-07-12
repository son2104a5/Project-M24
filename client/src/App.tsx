import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminMain from "./admin/MainAdmin";
import Dashboard from "./admin/pages/Dashboard";
import User from "./admin/pages/User";
import Categories from "./admin/pages/Categories";
import Order from "./admin/pages/Order";
import Comment from "./admin/pages/Comment";
import LoginAdmin from "./pages/LoginAdmin";
import RegisterAdmin from "./pages/RegisterAdmin";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import Products from "./admin/pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";

export default function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Routes>
          {/* --------- User tabs ---------- */}
          <Route path="/" element={<Home/>}></Route>
          <Route path="/product-detail" element={<ProductDetail/>}></Route>
          <Route path="/cart" element={<Cart/>}></Route>
          <Route path="/profile"></Route>
          <Route path="/history"></Route>
          <Route path="/buying"></Route>
          
          {/* --------- Admin --------- */}
          <Route path="/admin" element={<AdminMain/>}>
            <Route path='' element={<Dashboard />} />
            <Route path="users" element={<User />} />
            <Route path="categories" element={<Categories />} />
            <Route path="products" element={<Products />} />
            <Route path="orders" element={<Order />} />
            <Route path="comments" element={<Comment />} />
            {/* <Route path="setting" element={<Setting />} /> */}
          </Route>
        {/* ----- Tác vụ chung ----- */}
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/register" element={<Register/>}></Route>
          <Route path="admin/login" element={<LoginAdmin/>}></Route>
          <Route path="admin/register" element={<RegisterAdmin/>}></Route>
          <Route path="*" element={<NotFound/>}></Route>
        {/* ----- Tác vụ chung ----- */}
        </Routes>
      </Provider>
    </BrowserRouter>
  )
}
