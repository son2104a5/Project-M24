import Header from '../components/Header'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import LoadingOverlay from '../components/LoadingOverlay'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { State, User } from '../interface'
import { getHasLoginUser, updateCartItem } from '../services/users.service'
import Snackbar from '../components/Snackbar'

export default function Cart() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<number>()
  const [cartItems, setCartItems] = useState<User['cart']>([]);
  const [model, setModel] = useState<boolean>(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [action, setAction] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [allChecked, setAllChecked] = useState(false);
  const dispatch = useDispatch();
  const user: any = useSelector((state: State) => state.users[0]);
  const isUser: User = user;
  const [totalPrice, setTotalPrice] = useState<number>(0);

  const VND = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  });

  useEffect(() => {
    setTimeout(() => {
      dispatch(getHasLoginUser());
      setLoading(false);
    }, 2000);
  }, [dispatch]);

  useEffect(() => {
    if (isUser && isUser.cart) {
      setCartItems(isUser.cart);
    }
  }, [isUser]);

  useEffect(() => {
    const calculatedTotalPrice = cartItems.reduce((total, item) => {
      return item.status ? total + item.price * item.quantity : total;
    }, 0);
    setTotalPrice(calculatedTotalPrice);
  }, [cartItems]);

  const handleAction = (action: boolean, index?: number) => {
    index ? setData(index) : ''
    setAction(action);
    setModel(true);
  }
// Snackbar
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
// Tăng số lượng sản phẩm
  const handleIncreaseQuantity = (index: number) => {
    const updatedCart = [...cartItems];
    updatedCart[index] = {
      ...updatedCart[index],
      quantity: updatedCart[index].quantity + 1
    };
    setCartItems(updatedCart);
  
    const updatedUser = {
      ...isUser,
      cart: updatedCart
    };
    dispatch(updateCartItem(updatedUser));
  };
// Giảm số lượng sản phẩm
  const handleDecreaseQuantity = (index: number) => {
    const updatedCart = [...cartItems];
    if (updatedCart[index].quantity > 1) {
      updatedCart[index] = {
        ...updatedCart[index],
        quantity: updatedCart[index].quantity - 1
      };
      setCartItems(updatedCart);
      const updatedUser = {
        ...isUser,
        cart: updatedCart
      };
      dispatch(updateCartItem(updatedUser));
    }
  };
// Thay đổi trạng thái sản phẩm chọn
  const handleChangeCheckBox = (index: number) => {
    const updatedCart = [...cartItems];
    updatedCart[index] = {
      ...updatedCart[index],
      status: !updatedCart[index].status
    };
    setCartItems(updatedCart);
    
    const updatedUser = {
      ...isUser,
      cart: updatedCart
    };
    dispatch(updateCartItem(updatedUser));
  }
// Thay đổi trạng thái tất cả sản phẩm
  const handleAllCheckBoxChange = () => {
    const newStatus = !allChecked;
    setAllChecked(newStatus);
    const updatedCart = cartItems.map(item => ({
      ...item,
      status: newStatus
    }));
    setCartItems(updatedCart);

    const updatedUser = {
      ...isUser,
      cart: updatedCart
    };
    dispatch(updateCartItem(updatedUser));
  }
// Xóa các sản phẩm đã chọn
  const handleDeleteSelected = (index: number) => {
    if(action){
      const updatedCart = cartItems.filter(item => !item.status);
      setCartItems(updatedCart);

      const updatedUser = {
        ...isUser,
        cart: updatedCart
      };
      showSnackbar(snackbarMessage)
      setSnackbarMessage('Xóa sản phẩm thành công.')
      dispatch(updateCartItem(updatedUser));
      setModel(false)
    } else {
      const updatedCart = [...cartItems];
      updatedCart.splice(index, 1);
      setCartItems(updatedCart);

      const updatedUser = {
        ...isUser,
        cart: updatedCart
      };
      dispatch(updateCartItem(updatedUser));
      showSnackbar(snackbarMessage)
      setSnackbarMessage('Xóa sản phẩm thành công.')
      setModel(false)
    }
  }

  return (
    <div>
      <Header />
      <Navbar />
      <div className="max-w-5xl mx-auto p-4 min-h-screen">
        <div className='flex items-center border-b-2 mb-10 justify-between p-3'>
          <a href="/"><i className="fa-solid fa-arrow-left text-3xl"></i></a>
          <p className='text-3xl font-bold'>Giỏ hàng của bạn:</p>
          <p></p>
        </div>
        {isUser && isUser.cart && isUser.cart.length === 0 ? (
          <div className="text-center">
            <img src="https://firebasestorage.googleapis.com/v0/b/ptit-son.appspot.com/o/images%2Fbefore-login-no-product-in-cart-4006356-3309942.webp?alt=media&token=f054d660-77ee-46ef-8634-8f1327eb788c" alt="Empty Cart" className="mx-auto mb-4" />
            <p className="text-gray-600">Giỏ hàng của bạn đang trống.<br />Hãy chọn thêm sản phẩm để mua sắm nhé</p>
            <button className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600" onClick={() => window.location.href = '/'}>
              Quay lại trang chủ
            </button>
          </div>
        ) : (
          <div>
            <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
              <thead>
                <tr>
                  <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    <input type="checkbox" checked={allChecked} onChange={handleAllCheckBoxChange} />
                  </th>
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
                    Tổng
                  </th>
                  <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Thao tác
                  </th>
                </tr>
              </thead>
              <tbody>
                {
                  isUser && isUser.cart && isUser.cart.map((item, index) => {
                    return (
                      <tr key={index} className="bg-white">
                        <td className="px-6 py-4 border-b border-gray-200 text-sm">
                          <input type="checkbox" checked={item.status} onChange={() => handleChangeCheckBox(index)} />
                        </td>
                        <td className="px-6 py-4 border-b border-gray-200 text-sm">
                          {index + 1}
                        </td>
                        <td className="px-6 py-4 border-b border-gray-200 text-sm">
                          {item.name}
                        </td>
                        <td className="px-6 py-4 border-b border-gray-200 text-sm">
                          <img src={item.image} className='w-[70px] h-[50px]' alt={item.name} />
                        </td>
                        <td className="px-6 py-4 border-b border-gray-200 text-sm">
                          {VND.format(item.price)}
                        </td>
                        <td className="px-6 py-4 border-b border-gray-200 text-sm">
                          <div className="flex items-center">
                            <button className="bg-gray-200 rounded-lg px-3 py-1 mr-2" onClick={() => handleDecreaseQuantity(index)}>-</button>
                            <span>{item.quantity}</span>
                            <button className="bg-gray-200 rounded-lg px-3 py-1 ml-2" onClick={() => handleIncreaseQuantity(index)}>+</button>
                          </div>
                        </td>
                        <td className="px-6 py-4 border-b border-gray-200 text-sm">
                          {VND.format(item.price * item.quantity)}
                        </td>
                        <td className="px-6 py-4 border-b border-gray-200 text-sm pl-12">
                          <i className="fa-solid fa-trash text-red-500 hover:opacity-70" onClick={() => handleAction(false, index)}></i>
                        </td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </table>
            <div className='text-2xl flex justify-between mt-5 gap-5 items-center'>
              {totalPrice !== 0 ? <u onClick={()=>handleAction(true)} className='opacity-35 cursor-pointer hover:opacity-15 text-slate-400'>Xóa sản phẩm đã chọn</u> : <p></p>}
              <div className='flex mt-5 gap-5 items-center'>
                <p>Tổng tiền:</p>
                <p className='text-red-600'>{VND.format(totalPrice)}</p>
                <a 
                  href="/buying" 
                  className={`p-2 rounded ${totalPrice === 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-red-600 text-white hover:bg-opacity-70'}`}
                  style={{ pointerEvents: totalPrice === 0 ? 'none' : 'auto' }}
                >
                  Thanh toán
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
      <LoadingOverlay open={loading} />
      <div className={`transition-opacity duration-500 ${loading ? 'opacity-0' : 'opacity-100'}`}></div>
      {
        model && <div className={`w-screen h-screen bg-black bg-opacity-40 fixed flex flex-col items-center top-0 right-0 justify-center `}>
          <div className="flex justify-between bg-white w-1/3 pb-16 pl-4 pr-4 pt-4 border-y-[1px] rounded-t-xl gap-32">
            <h2 className="text-2xl">{action ? 'Bạn thực sự muốn xóa tất cả sản phẩm đã chọn ?' : 'Xóa sản phẩm này chứ ?'}</h2>
            <span onClick={() => setModel(false)} className="cursor-pointer text-2xl"><i className="fa-solid fa-xmark"></i></span>
          </div>
          <div className="flex justify-end bg-slate-600 w-1/3 p-4 gap-5 rounded-b-xl">
            <button className="bg-red-500 p-2 rounded text-white" onClick={() => data !== undefined && handleDeleteSelected(data)}>Xóa</button>
          </div>
        </div>
      }
      <Snackbar message={snackbarMessage} open={snackbarOpen} onClose={closeSnackbar} />
    </div>
  )
}
