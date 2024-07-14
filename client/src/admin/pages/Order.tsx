import { useEffect, useState } from "react";
import LoadingOverlay from "../../components/LoadingOverlay";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrders, updateOrderStatus } from "../../services/orders.service";
import { getAllUsers, updatedUser } from "../../services/users.service";
import Snackbar from "../../components/Snackbar";
import type { Order, User } from "../../interface/index";

export default function Order() {
  const [loading, setLoading] = useState(true);
  const orders = useSelector((state: any) => state.orders || []);
  const users = useSelector((state: any) => state.users || []);
  const dispatch = useDispatch();
  const [showOrderDetail, setShowOrderDetail] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage] = useState(8);

  useEffect(() => {
    dispatch(getAllOrders())
      .then(() => setLoading(false))
      .catch((error: Error) => {
        console.error('Error fetching orders:', error);
        setLoading(false);
        showSnackbar('Error fetching orders');
      });

    dispatch(getAllUsers());
  }, [dispatch]);

  const VND = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  });

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

  const totalPages = Math.ceil(orders.length / ordersPerPage);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

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

  const handleOrderDetail = (order: Order) => {
    setSelectedOrder(order);
    setShowOrderDetail(true);
  };

  const handleApproveOrder = (order: Order) => {
    const updatedOrder = { ...order, status: true };
    dispatch(updateOrderStatus(updatedOrder))
      .then(() => {
        const updateUser = users.find((user: User) => user.id === updatedOrder.userId);
        if (updateUser) {
          const updatedHistory = updateUser.history.map((history: any) => {
            if (history.id === updatedOrder.id) {
              return { ...history, status: true };
            }
            return history;
          });
          dispatch(updatedUser({ ...updateUser, history: updatedHistory }));
        }
        showSnackbar('Đã duyệt đơn hàng!');
      })
      .catch((error: Error) => {
        console.error('Error updating order status:', error);
        showSnackbar('Đã xảy ra lỗi khi duyệt đơn hàng!');
      });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-5 mt-5">
        <select name="" id="" className="w-[170px] border-2 rounded p-1">
          <option value="" hidden>Sắp xếp</option>
        </select>
      </div>
      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
        <thead>
          <tr>
            <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              id
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Sản phẩm đã mua
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              idUser
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Số lượng
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Thành tiền
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Mua vào ngày
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
          {
            orders.map((order: Order) => (
              <tr key={order.id} className="bg-white">
                <td className="px-6 py-4 border-b border-gray-200 text-sm">
                  {order.id}
                </td>
                <td className="px-6 py-4 border-b border-gray-200 text-sm text-center">
                  <i className="fa-regular fa-folder-open pr-10 cursor-pointer hover:opacity-70" onClick={() => handleOrderDetail(order)}></i>
                </td>
                <td className="px-6 py-4 border-b border-gray-200 text-sm">
                  {order.userId}
                </td>
                <td className="px-6 py-4 border-b border-gray-200 text-sm">
                  {order.quantity}
                </td>
                <td className="px-6 py-4 border-b border-gray-200 text-sm">
                  {VND.format(order.price)}
                </td>
                <td className="px-6 py-4 border-b border-gray-200 text-sm">
                  {new Date(order.buyAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 border-b border-gray-200 text-sm">
                  <p className={`p-1 ${order.status ? 'bg-green-400' : 'bg-red-500'} rounded text-center text-white`}>{order.status ? 'Đã duyệt' : 'Chờ duyệt'}</p>
                </td>
                <td className="px-6 py-4 border-b border-gray-200 text-sm">
                  {!order.status ? 
                    <button
                      onClick={() => handleApproveOrder(order)}
                      className="p-1 bg-blue-500 text-white rounded hover:bg-opacity-70"
                    >
                      Duyệt đơn
                    </button> : ''
                  }
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
      {
        totalPages > 0 && (
          <div className="flex justify-center mt-4">
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
          </div>
        )
      }
      {showOrderDetail && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white p-4 flex flex-col gap-3 w-3/5 rounded-lg">
            <div className="flex justify-between items-center text-3xl font-bold">
              <h3>Chi tiết đơn hàng: #{selectedOrder?.id}</h3>
              <i className="fa-solid fa-xmark cursor-pointer" onClick={() => setShowOrderDetail(false)}></i>
            </div>
            <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
              <thead>
                <tr>
                  <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Các sản phẩm đã mua
                  </th>
                  <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Ảnh
                  </th>
                  <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Số lượng
                  </th>
                  <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Giá
                  </th>
                  <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Tổng tiền
                  </th>
                </tr>
              </thead>
              <tbody>
                {
                  selectedOrder?.products && selectedOrder?.products.map((product: any) => (
                    <tr className="bg-white" key={product.id}>
                      <td className="px-6 py-4 border-b border-gray-200 text-sm">
                        {product.name}
                      </td>
                      <td className="px-6 py-4 border-b border-gray-200 text-sm">
                        <img src={product.image} alt={product.name} className="w-12 h-12 object-cover" />
                      </td>
                      <td className="px-6 py-4 border-b border-gray-200 text-sm">
                        {product.quantity}
                      </td>
                      <td className="px-6 py-4 border-b border-gray-200 text-sm">
                        {VND.format(product.price)}
                      </td>
                      <td className="px-6 py-4 border-b border-gray-200 text-sm">
                        {VND.format(product.price * product.quantity)}
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
            <p className="text-2xl">Thành tiền: {selectedOrder && selectedOrder.price !== undefined
              ? VND.format(selectedOrder.price)
              : 'N/A'}</p>
            <p className="text-2xl">Người đặt hàng: {users.find((user: User) => user.id === selectedOrder?.userId)?.name}</p>
            <p className="text-2xl">
              Ngày đặt hàng:
              {selectedOrder && selectedOrder.buyAt
                ? new Date(selectedOrder.buyAt).toLocaleDateString()
                : 'N/A'}
            </p>
            <p className="text-2xl">Trạng thái: {selectedOrder?.status ? 'Đã duyệt' : 'Chờ duyệt'}</p>
          </div>
        </div>
      )}
      <LoadingOverlay open={loading} />
      <div className={`transition-opacity duration-500 ${loading ? 'opacity-0' : 'opacity-100'}`}></div>
      <Snackbar message={snackbarMessage} open={snackbarOpen} onClose={closeSnackbar} />
    </div>
  );
}
