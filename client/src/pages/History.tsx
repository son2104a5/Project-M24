import Header from '../components/Header'
import Footer from '../components/Footer'
import LoadingOverlay from '../components/LoadingOverlay';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { State, User } from '../interface';
import { getHasLoginUser } from '../services/users.service';

export default function History() {
  const [loading, setLoading] = useState(true);
  const user = useSelector((state: State) => state.users[0]);
  const dispatch = useDispatch();
  const isUser: User = user;
  
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000); // Simulate a loading process for 2 seconds
  }, []);

  useEffect(() => {
    dispatch(getHasLoginUser())
  }, [dispatch]);

  const VND = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  });

  return (
    <div>
      <Header />
      <div className="max-w-5xl mx-auto p-4 min-h-screen">
        <div className='flex items-center border-b-2 mb-10 justify-between p-3'>
          <a href="/"><i className="fa-solid fa-arrow-left text-3xl"></i></a>
          <p className='text-3xl font-bold'>Lịch sử giao dịch:</p>
          <p></p>
        </div>
        {
          isUser && isUser.history && isUser.history.length === 0 ? (
            <div className="text-center">
              <img src="https://firebasestorage.googleapis.com/v0/b/ptit-son.appspot.com/o/images%2Fbefore-login-no-product-in-cart-4006356-3309942.webp?alt=media&token=f054d660-77ee-46ef-8634-8f1327eb788c" alt="Empty Cart" className="mx-auto mb-4" />
              <p className="text-gray-600">Không có lịch sử giao dịch.<br />Hãy chọn thêm sản phẩm để mua sắm nhé</p>
              <button className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600" onClick={() => window.location.href = '/'}>
                Quay lại trang chủ
              </button>
            </div>
          ) : (
            isUser && isUser.history && isUser.history.map((order, orderIndex) => (
              <div key={orderIndex} className="mb-9">
                <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        #
                      </th>
                      <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Tên sản phẩm
                      </th>
                      <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Ảnh
                      </th>
                      <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Giá
                      </th>
                      <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Số lượng
                      </th>
                      <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Trạng thái
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.products && order.products.map((product: any, productIndex: any) => (
                      <tr key={productIndex} className='border-b-2'>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{productIndex + 1}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <img src={product.image} alt={product.name} className="w-16 h-16 object-cover rounded-lg" />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{VND.format(product.price)}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.quantity}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.status ? 'Đã duyệt qua' : 'Đang xử lý'}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className='text-2xl'>
                    <tr>
                      <td colSpan={6} className='text-right p-2'>Thành tiền: <span className='text-red-500'>{VND.format(order.price)}</span></td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            ))
          )
        }
      </div>
      <Footer />
      <LoadingOverlay open={loading} />
      <div className={`transition-opacity duration-500 ${loading ? 'opacity-0' : 'opacity-100'}`}></div>
    </div>
  );
}
