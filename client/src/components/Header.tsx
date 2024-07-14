import { useDispatch, useSelector } from "react-redux";
import { State } from "../interface";
import { useEffect, useState } from "react";
import { getAllUsers, getHasLoginUser } from "../services/users.service";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const userHasLogin = JSON.parse(localStorage.getItem('userHasLogin') as string);
  const [footerUser, setFooterUser] = useState(false);
  const state = useSelector((state: State) => state.users) || []; // Default to empty array if undefined

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllUsers());
    dispatch(getHasLoginUser(user));
  }, [dispatch]);

  const toLogin = () => {
    navigate('/login');
    localStorage.setItem('userHasLogin', JSON.stringify(''));
  };

  const user = state.find((c) => c.email === userHasLogin);

  const handleLogout = () => {
    localStorage.removeItem('userHasLogin');
  };
  

  return (
    <header className="bg-black text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <a href="/" className="w-56 text-center"><h1 className="text-3xl font-bold font-serif"><i className="fa-solid fa-globe"></i> ShopNest</h1></a>
        <div className="w-1/3 flex">
          <input type="search" className="w-full p-2 rounded-xl" placeholder="Bạn cần tìm gì..." />
          <label htmlFor=""><i className="fa-solid fa-magnifying-glass text-black relative top-2 right-7"></i></label>
        </div>
        <nav className="flex gap-7 items-center">
          <div className="mr-5 relative">
            <i className="fa-solid fa-heart text-3xl relative left-3 cursor-pointer" onClick={()=>{
              if(!userHasLogin){
                alert('Bạn chưa đăng nhập')
                toLogin();
              } else {
                window.location.href = 'favourite'
              }
            }}></i>
            <span className="text-[12px] absolute top-[-3px] bg-red-600 p-[1px] rounded-full w-5 text-center">
              {user?.favourites.length}
            </span>
          </div>
          <div className="mr-5 relative">
            <i className="fa-solid fa-cart-shopping text-3xl relative left-3 cursor-pointer" onClick={()=>{
              if(!userHasLogin){
                alert('Bạn chưa đăng nhập')
                toLogin();
              } else {
                window.location.href = 'cart'
              }
            }}></i>
            <span className="text-[12px] absolute top-[-3px] bg-red-600 p-[1px] rounded-full w-5 text-center">
              {user?.cart.length}
            </span>
          </div>
          {
            userHasLogin ? (
              <div className={`flex gap-3 items-center cursor-pointer w-48`} onClick={() => setFooterUser(!footerUser)}>
                <img src={user?.avatar} width={45} className="rounded-full" alt="User Avatar" />
                <p>{user?.name}</p>
              </div>
            ) : (
              <div className="flex gap-2">
                <p className="cursor-pointer hover:opacity-40" onClick={toLogin}>Đăng nhập</p>
              </div>
            )
          }
          <div className={`flex flex-col absolute top-14 right-3 bg-white text-black ${footerUser ? 'block' : 'hidden'} rounded shadow-[0_3px_10px_rgb(0,0,0,0.2)] z-50`}>
            <a className="hover:bg-blue-400 p-2 rounded hover:text-white" href="profile"><i className="fa-solid fa-user"></i> Thông tin cá nhân</a>
            <a className="hover:bg-blue-400 p-2 rounded hover:text-white" href="history"><i className="fa-solid fa-clock-rotate-left"></i> Lịch sử giao dịch</a>
            {user?.role === 'Admin' && <a className="hover:bg-blue-400 p-2 rounded hover:text-white" href='admin'><i className="fa-solid fa-toolbox"></i> Về admin</a>}
            <a className="hover:bg-blue-400 p-2 rounded hover:text-white" href='login' onClick={handleLogout}><i className="fa-solid fa-right-from-bracket"></i> Đăng xuất</a>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
