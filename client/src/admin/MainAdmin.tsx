import { Link, Outlet, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Category from "./pages/Category";
import Products from "./pages/Products";
import Order from "./pages/Order";
import Recommend from "./pages/Recommend";

export default function MainAdmin() {
  return (
    <div className="flex">
      <div className="bg-black text-white flex flex-col w-[170px] justify-between h-screen text-center pb-6 pl-[20px]">
          <div className="flex flex-col pt-4 gap-5">

              <Link to={'/admin/dashboard'} className="w-[130px] text-left mr-3 p-1 hover:bg-slate-400 flex gap-4 items-center rounded"><i className="fa-solid fa-house"></i>Dashboard</Link>
              <Link to={'/admin/profile'} className="w-[130px] text-left mr-3 p-1 hover:bg-slate-400 flex gap-4 items-center rounded"><i className="fa-solid fa-circle-user"></i>Profile</Link>
              <Link to={'/admin/category'} className="w-[130px] text-left mr-3 p-1 hover:bg-slate-400 flex gap-4 items-center rounded"><i className="fa-solid fa-table-list"></i>Category</Link>
              <Link to={'/admin/products'} className="w-[130px] text-left mr-3 p-1 hover:bg-slate-400 flex gap-4 items-center rounded"><i className="fa-solid fa-box"></i>Product</Link>
              <Link to={'/admin/order'} className="w-[130px] text-left mr-3 p-1 hover:bg-slate-400 flex gap-4 items-center rounded"><i className="fa-solid fa-cart-shopping"></i>Order</Link>
              <Link to={'/admin/recommend'} className="w-[130px] text-left mr-3 p-1 hover:bg-slate-400 flex gap-4 items-center rounded"><i className="fa-solid fa-envelope"></i>Recommend</Link>
              <Link to={'/admin/setting'} className="w-[130px] text-left mr-3 p-1 hover:bg-slate-400 flex gap-4 items-center rounded"><i className="fa-solid fa-gear"></i>Setting</Link>
          </div>
          <div className="flex flex-col gap-5">
              <Link to={'/login'} className="w-[130px] text-left hover:bg-slate-400 flex gap-4 items-center p-1 rounded"><i className="fa-solid fa-right-from-bracket"></i>Logout</Link>
          </div>
      </div>
      <div>
        <div></div>
        <div>
          <Routes>
            <Route path='/admin/dashboard' element={<Dashboard/>}></Route>
            <Route path="/admin/profile" element={<Profile/>}></Route>
            <Route path="/admin/category" element={<Category/>}></Route>
            <Route path="/admin/products" element={<Products/>}></Route>
            <Route path="/admin/order" element={<Order/>}></Route>
            <Route path="/admin/recommend" element={<Recommend/>}></Route>
            {/* <Route path="/admin/setting" element={</>}></Route> */}
          </Routes>
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  )
}
