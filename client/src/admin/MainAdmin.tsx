import { Link, Outlet } from "react-router-dom";

export default function MainAdmin() {
  
  return (
    <div className="flex h-screen bg-slate-100">
      <div className="bg-black text-white flex flex-col w-[170px] justify-between h-full text-center pb-6 pl-[20px] pt-4">
        <div>
          <div className="flex flex-col gap-2 items-center pr-4 pb-7">
            <img src="" alt="" />
          </div>
          <div className="flex flex-col gap-5">
            <Link to={'/admin/dashboard'} className="w-[130px] text-left mr-3 p-1 hover:bg-slate-400 flex gap-4 items-center rounded">
              <i className="fa-solid fa-house"></i>Dashboard
            </Link>
            <Link to={'/admin/users'} className="w-[130px] text-left mr-3 p-1 hover:bg-slate-400 flex gap-4 items-center rounded">
              <i className="fa-solid fa-circle-user"></i>User
            </Link>
            <Link to={'/admin/categories'} className="w-[130px] text-left mr-3 p-1 hover:bg-slate-400 flex gap-4 items-center rounded">
              <i className="fa-solid fa-table-list"></i>Category
            </Link>
            <Link to={'/admin/products'} className="w-[130px] text-left mr-3 p-1 hover:bg-slate-400 flex gap-4 items-center rounded">
              <i className="fa-solid fa-box"></i>Product
            </Link>
            <Link to={'/admin/orders'} className="w-[130px] text-left mr-3 p-1 hover:bg-slate-400 flex gap-4 items-center rounded">
              <i className="fa-solid fa-cart-shopping"></i>Order
            </Link>
            <Link to={'/admin/comments'} className="w-[130px] text-left mr-3 p-1 hover:bg-slate-400 flex gap-4 items-center rounded">
              <i className="fa-solid fa-envelope"></i>Comment
            </Link>
            {/* <Link to={'/admin/setting'} className="w-[130px] text-left mr-3 p-1 hover:bg-slate-400 flex gap-4 items-center rounded">
              <i className="fa-solid fa-gear"></i>Setting
            </Link> */}
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <Link to={'/admin/login'} className="w-[130px] text-left hover:bg-slate-400 flex gap-4 items-center p-1 rounded">
            <i className="fa-solid fa-right-from-bracket"></i>Logout
          </Link>
        </div>
      </div>
      <div className="flex-1 flex flex-col m-5">
        <div className="bg-white w-full h-[70px] flex items-center justify-between p-3 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
          <div>
            Header
          </div>
          <div>
            hello
          </div>
        </div>
        <div className="flex-1 p-4">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
