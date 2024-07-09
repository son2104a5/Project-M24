import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllUsers, getLockedUser } from "../../services/users.service";
import { State, User } from "../../interface";

export default function Profile() {
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const dispatch = useDispatch();
  const users = useSelector((state: State) => state.users);
  
  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const formLocked = (user: User) => {
    setSelectedUser(user);
    setShowModal(true);
  }

  const handleClose = () => setShowModal(false);

  const confirmLockAccount = () => {
    if (selectedUser) {
      dispatch(getLockedUser(selectedUser));
      handleClose();
    }
  };
  return (
    <div>
      <div className="flex justify-between items-center mb-5 mt-5">
        <strong className="text-3xl">Danh sách người dùng:</strong>
        <div className="flex gap-5">
          <select name="" id="" className="w-[170px] border-2 rounded">
            <option value="" hidden>Sắp xếp</option>
            <option value="age_desc">Theo trạng thái (Đang hoạt động)</option>
            <option value="age_desc">Theo trạng thái (Ngừng hoạt động)</option>
          </select>
          <input
            className="border-slate-200 border-2 rounded p-1 w-[270px] bg-transparent"
            type="text"
            placeholder="Tìm kiếm..."
          />
        </div>
      </div>
      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
        <thead>
          <tr>
            <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              #
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Tên
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Email
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Số điện thoại
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Vai trò
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Trạng thái
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Chức năng
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user: User, index: number) => (
            <tr key={user.id} className="bg-white">
              <td className="px-6 py-4 border-b border-gray-200 text-sm">{index + 1}</td>
              <td className="px-6 py-4 border-b border-gray-200 text-sm">{user.name}</td>
              <td className="px-6 py-4 border-b border-gray-200 text-sm">{user.email}</td>
              <td className="px-6 py-4 border-b border-gray-200 text-sm">{user.phoneNumber}</td>
              <td className="px-6 py-4 border-b border-gray-200 text-sm">{user.role}</td>
              <td className="px-6 py-4 border-b border-gray-200 text-sm">{user.status ? <p className="bg-green-400 p-1 text-center text-white rounded">Đang hoạt động</p> : <p className="bg-red-500 p-1 text-center text-white rounded">Ngừng hoạt động</p>}</td>
              <td className="px-6 py-4 border-b border-gray-200 text-sm">
                <button className="text-white" onClick={()=>formLocked(user)}>{user.status ? <i className="fa-solid fa-unlock bg-blue-500 p-1 rounded ml-5 pl-3 pr-3"></i> : <i className="fa-solid fa-lock p-1 rounded ml-5 pl-3 pr-3 bg-red-500"></i>}</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      { showModal ?
        <div className="w-screen h-screen bg-black bg-opacity-40 fixed flex flex-col items-center top-0 right-0 justify-center">
          <div className="flex justify-between bg-white w-1/3 pb-16 pl-4 pr-4 pt-4 border-y-[1px] rounded-t-xl">
            <h2 className=" text-2xl">Xác nhận {selectedUser?.status ? 'khóa' : 'bỏ khóa'} tài khoản <span className="text-red-500">{selectedUser?.name}</span> chứ?</h2>
            <span onClick={handleClose} className="cursor-pointer text-2xl"><i className="fa-solid fa-xmark"></i></span>
          </div>
          <div className="flex justify-end bg-slate-600 w-1/3 p-4 gap-5 rounded-b-xl">
            <button onClick={handleClose} className="bg-white p-2 rounded">Hủy</button><button className="bg-red-500 p-2 rounded text-white" onClick={confirmLockAccount}>Xác nhận</button>
          </div>
        </div> : ''
      }
    </div>
  );
}
