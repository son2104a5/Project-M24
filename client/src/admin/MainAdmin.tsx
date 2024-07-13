import { Link, Outlet } from "react-router-dom";
import { State } from "../interface";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllUsers } from "../services/users.service";
import LoadingOverlay from "../components/LoadingOverlay";

export default function MainAdmin() {
  const userLogin = JSON.parse(localStorage.getItem('userHasLogin') as string);
  const users = useSelector((state: State) => state.users);
  const [text, setText] = useState<string>('Dashboard')
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000); // Simulate a loading process for 2 seconds
  }, []);
  useEffect(() => {
    dispatch(getAllUsers());
  }, []);
  const userCheck: any = users.find((c)=> c.email === userLogin)
  
  const handleLogout = () => {
    localStorage.removeItem('userHasLogin')
  }
  
  return (
    <div className="flex h-screen bg-slate-100">
      <div className="bg-black text-white flex flex-col w-[170px] justify-between h-full text-center pb-6 pl-[20px] pt-4">
        <div>
          <div className="flex flex-col gap-2 items-center pr-4 pb-7">
            <h1 className="text-xl font-bold font-serif"><i className="fa-solid fa-globe"></i> ShopNest</h1>
          </div>
          <div className="flex flex-col gap-5">
            <Link onClick={()=>setText('Dashboard')} to={''} className="w-[130px] text-left mr-3 p-1 hover:bg-slate-400 flex gap-4 items-center rounded">
              <i className="fa-solid fa-chart-line"></i>Dashboard
            </Link>
            <Link onClick={()=>setText('Danh sách người dùng')} to={'users'} className="w-[130px] text-left mr-3 p-1 hover:bg-slate-400 flex gap-4 items-center rounded">
              <i className="fa-solid fa-circle-user"></i>User
            </Link>
            <Link onClick={()=>setText('Danh sách danh mục')} to={'categories'} className="w-[130px] text-left mr-3 p-1 hover:bg-slate-400 flex gap-4 items-center rounded">
              <i className="fa-solid fa-table-list"></i>Category
            </Link>
            <Link onClick={()=>setText('Danh sách sản phẩm')} to={'products'} className="w-[130px] text-left mr-3 p-1 hover:bg-slate-400 flex gap-4 items-center rounded">
              <i className="fa-solid fa-box"></i>Product
            </Link>
            <Link onClick={()=>setText('Danh sách hàng đợi')} to={'orders'} className="w-[130px] text-left mr-3 p-1 hover:bg-slate-400 flex gap-4 items-center rounded">
              <i className="fa-solid fa-cart-shopping"></i>Order
            </Link>
            <Link onClick={()=>setText('Danh sách phản hồi')} to={'comments'} className="w-[130px] text-left mr-3 p-1 hover:bg-slate-400 flex gap-4 items-center rounded">
              <i className="fa-solid fa-envelope"></i>Comment
            </Link>
            {/* <Link to={'setting'} className="w-[130px] text-left mr-3 p-1 hover:bg-slate-400 flex gap-4 items-center rounded">
              <i className="fa-solid fa-gear"></i>Setting
            </Link> */}
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <a className="w-[130px] text-left hover:bg-slate-400 flex gap-4 items-center p-1 rounded" href={'/'}>
            <i className="fa-solid fa-house"></i>Go website
          </a>
          <a href={'/admin/login'} className="w-[130px] text-left hover:bg-slate-400 flex gap-4 items-center p-1 rounded" onClick={handleLogout}>
            <i className="fa-solid fa-right-from-bracket"></i>Logout
          </a>
        </div>
      </div>
      <div className="flex-1 flex flex-col m-5">
        <div className="bg-white w-full h-[70px] flex items-center justify-between p-3 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
          <div>
            <strong className="text-3xl">{text}</strong>
          </div>
          <div className="flex items-center gap-3">
            <img src={userCheck?.avatar} width={50} height={50} className="rounded-full"/>
            <p>{userCheck?.name}</p>
          </div>
        </div>
        <div className="flex-1 p-4">
          <Outlet />
        </div>
      </div>
      <LoadingOverlay open={loading} />
        <div className={`transition-opacity duration-500 ${loading ? 'opacity-0' : 'opacity-100'}`}></div>
    </div>
  )
}
