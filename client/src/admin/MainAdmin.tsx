import { Link } from "react-router-dom";

export default function MainAdmin() {
  return (
    <div className="bg-black text-white flex flex-col w-[50px] justify-between h-screen text-center pb-6">
        <div className="flex flex-col pt-4 gap-4">

            <div><i className="fa-solid fa-house"></i></div>
            <div><i className="fa-solid fa-circle-user"></i></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
        <div className="flex flex-col gap-5">
            <div><i className="fa-solid fa-gear"></i></div>
            <Link to={'/login'}><i className="fa-solid fa-right-from-bracket"></i></Link>
        </div>
    </div>
  )
}
