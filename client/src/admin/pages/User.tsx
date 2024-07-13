import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllUsers, getLockedUser } from "../../services/users.service";
import { State, User } from "../../interface";
import LoadingOverlay from "../../components/LoadingOverlay";
import Snackbar from "../../components/Snackbar";

export default function Users() {
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);
  const [sortKey, setSortKey] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const dispatch = useDispatch();
  const users = useSelector((state: State) => state.users);
  const [loading, setLoading] = useState(true);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000); // Simulate a loading process for 2 seconds
  }, []);
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
      showSnackbar(`${selectedUser.status ? 'Đã khóa' : 'Đã mở khóa'} tài khoản ${selectedUser.name}`)
      handleClose();
    }
  };

  const handleSort = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortKey(event.target.value);
    setCurrentPage(1);
  };

  const handleFilter = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterStatus(event.target.value);
    setCurrentPage(1);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const showSnackbar = (message: string) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
    setTimeout(() => {
      setSnackbarOpen(false);
    }, 2000);
  };

  const closeSnackbar = () => {
    setSnackbarOpen(false);
    setSnackbarMessage('');
  };

  const filteredUsers = users
    .filter(user => {
      return (
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.phoneNumber.includes(searchTerm)
      ) && (filterStatus ? user.status.toString() === filterStatus : true);
    })
    .sort((a, b) => {
      if (sortKey === "name") {
        return a.name.localeCompare(b.name);
      } else if (sortKey === "status") {
        return a.status === b.status ? 0 : a.status ? -1 : 1;
      }
      return 0;
    });

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div>
      <div className="flex justify-end items-center mb-5 mt-5">
        <div className="flex gap-5">
          <select onChange={handleSort} value={sortKey} className="w-[170px] border-2 rounded p-1">
            <option value="" hidden>Sắp xếp</option>
            <option value="name">Theo tên</option>
          </select>
          <select onChange={handleFilter} value={filterStatus} className="w-[170px] border-2 rounded p-1">
            <option value="" hidden>Lọc</option>
            <option value="">Tất cả trạng thái</option>
            <option value="true">Đang hoạt động</option>
            <option value="false">Ngừng hoạt động</option>
          </select>
          <input
            className="border-slate-200 border-2 rounded p-1 w-[270px] bg-transparent"
            type="text"
            placeholder="Tìm kiếm..."
            value={searchTerm}
            onChange={handleSearch}
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
          {currentUsers.map((user: User, index: number) => (
            <tr key={user.id} className="bg-white">
              <td className="px-6 py-4 border-b border-gray-200 text-sm">{indexOfFirstUser + index + 1}</td>
              <td className="px-6 py-4 border-b border-gray-200 text-sm">{user.name}</td>
              <td className="px-6 py-4 border-b border-gray-200 text-sm">{user.email}</td>
              <td className="px-6 py-4 border-b border-gray-200 text-sm">{user.phoneNumber}</td>
              <td className="px-6 py-4 border-b border-gray-200 text-sm">{user.role}</td>
              <td className="px-6 py-4 border-b border-gray-200 text-sm">
                {user.status ? (
                  <p className="bg-green-400 p-1 text-center text-white rounded">Đang hoạt động</p>
                ) : (
                  <p className="bg-red-500 p-1 text-center text-white rounded">Ngừng hoạt động</p>
                )}
              </td>
              <td className="px-6 py-4 border-b border-gray-200 text-sm">
                <button className="text-white" onClick={() => formLocked(user)}>
                  {user.status ? (
                    <i className="fa-solid fa-unlock bg-blue-500 p-1 rounded ml-5 pl-3 pr-3"></i>
                  ) : (
                    <i className="fa-solid fa-lock p-1 rounded ml-5 pl-3 pr-3 bg-red-500"></i>
                  )}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {
        totalPages > 0 ? <div className="flex justify-center mt-4">
        <button
          onClick={prevPage}
          className={`mx-1 px-3 py-1 border rounded ${currentPage === 1 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-white text-blue-500'}`}
          disabled={currentPage === 1}
        >
          <i className="fa-solid fa-chevron-left"></i>
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => paginate(index + 1)}
            className={`mx-1 px-3 py-1 border rounded ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'}`}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={nextPage}
          className={`mx-1 px-3 py-1 border rounded ${currentPage === totalPages ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-white text-blue-500'}`}
          disabled={currentPage === totalPages || totalPages === 1}
        >
          <i className="fa-solid fa-chevron-right"></i>
        </button>
      </div> : ''
      }
      {showModal ?
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
      <LoadingOverlay open={loading} />
      <div className={`transition-opacity duration-500 ${loading ? 'opacity-0' : 'opacity-100'}`}></div>
      <Snackbar message={snackbarMessage} open={snackbarOpen} onClose={closeSnackbar} />
    </div>
  );
}
