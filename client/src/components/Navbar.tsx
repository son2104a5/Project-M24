import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="bg-black text-white p-2 shadow-md flex justify-evenly gap-3 text-center items-center">
      <Link to={''}><i className="fa-solid fa-mobile"></i> Điện thoại</Link>
      <Link to={''}><i className="fa-solid fa-laptop"></i> Laptop</Link>
      <Link to={''}><i className="fa-solid fa-tablet"></i> Tablet</Link>
      <Link to={''}><i className="fa-solid fa-headphones"></i> Phụ kiện </Link>
      <Link to={''} className="flex items-center gap-3"><span className="material-symbols-outlined font-[16px] text-[22px] w-[12px]">watch</span> Đồng hồ</Link>
      <Link to={''}><i className="fa-solid fa-desktop"></i> PC</Link>
      <Link to={''}><i className="fa-solid fa-tv"></i> TV</Link>
    </div>
  )
}
