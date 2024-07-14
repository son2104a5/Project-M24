import Header from '../components/Header';
import Footer from '../components/Footer';
// import Navbar from '../components/Navbar';
import LoadingOverlay from '../components/LoadingOverlay';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getHasLoginUser, updateCartItem } from '../services/users.service';
import { Errors, State, User } from '../interface';
import { addProductToOrder } from '../services/orders.service';
import Snackbar from '../components/Snackbar';
import { getAllProducts, updateProduct } from '../services/products.service';

export default function Buying() {
  const [loading, setLoading] = useState(true);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    phone: '',
    address: '',
    province: '',
    district: '',
    ward: '',
  });

  const [errors, setErrors] = useState<Errors>({
    email: '',
    name: '',
    phone: '',
    address: '',
    province: '',
    district: '',
    ward: '',
  });

  const dispatch = useDispatch();
  const user: any = useSelector((state: State) => state.users[0]);
  const products = useSelector((state: State) => state.products);
  const isUser: User = user;

  let totalPrice: number = 0;
  if (isUser && isUser.cart) {
    totalPrice = isUser.cart.reduce((total, item) => {
      return item.status ? total + item.price * item.quantity : total;
    }, 0);
  }

  const VND = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  });

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      dispatch(getHasLoginUser());
      dispatch(getAllProducts());
      setLoading(false);
    }, 2000);
  }, [dispatch]);

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [id]: '',
    }));
  };

  const validateForm = () => {
    const newErrors: Errors = {
      email: '',
      name: '',
      phone: '',
      address: '',
      province: '',
      district: '',
      ward: '',
    };

    if (formData.email.trim() === '') {
      newErrors.email = 'Không để trống mục này';
    } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)) {
      newErrors.email = 'Email không đúng định dạng';
    }

    if (formData.name.trim() === '') {
      newErrors.name = 'Không để trống mục này';
    }

    if (formData.phone.trim() === '') {
      newErrors.phone = 'Không để trống mục này';
    } else if (!/^\d+$/.test(formData.phone)) {
      newErrors.phone = 'Số điện thoại không đúng định dạng';
    }

    if (formData.address.trim() === '') {
      newErrors.address = 'Không để trống mục này';
    }

    if (formData.province.trim() === '') {
      newErrors.province = 'Không để trống mục này';
    }

    if (formData.district.trim() === '') {
      newErrors.district = 'Không để trống mục này';
    }

    if (formData.ward.trim() === '') {
      newErrors.ward = 'Không để trống mục này';
    }

    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error !== '');
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      try {
        const updatedProducts = products.map(product => {
          const cartItem = isUser.cart.find(item => item.productId === product.id && item.status);
          if (cartItem) {
            return {
              ...product,
              stock: product.stock - cartItem.quantity,
              hasPrice: product.hasPrice + cartItem.quantity,
            };
          }
          return product;
        });
  
        const newOrder = {
          id: Math.floor(Math.random() * 1000000000),
          userId: isUser.id,
          products: isUser.cart.filter(item => item.status),
          quantity: isUser.cart.reduce((total, item) => total + (item.status ? item.quantity : 0), 0),
          price: totalPrice,
          buyAt: new Date().toISOString(),
          email: formData.email,
          address: `${formData.address}, ${formData.ward}, ${formData.district}, ${formData.province}`,
          status: false,
        };
  
        await dispatch(addProductToOrder(newOrder));
  
        const updatedUser = {
          ...isUser,
          history: [...isUser.history, newOrder],
          cart: isUser.cart.filter(item => !item.status),
        };
  
        await dispatch(updateCartItem(updatedUser));
        await dispatch(updateProduct(updatedProducts));
  
        showSnackbar('Đặt hàng thành công');
        setTimeout(() => {
          window.location.href = '/';
        }, 2000);
      } catch (error) {
        console.error('Error placing order:', error);
      }
    }
  };
  

  return (
    <div>
      <Header />
      {/* <Navbar /> */}
      <div className={`transition-opacity duration-500 ${loading ? 'opacity-0' : 'opacity-100'}`}>
        <div className="container mx-auto p-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2 bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Thông tin nhận hàng</h2>
              <form onSubmit={handleSubmit}>
                {['email', 'name', 'phone', 'address', 'province', 'district', 'ward'].map((field) => (
                  <div className="mb-4" key={field}>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={field}>
                      {field === 'email' ? 'Email' : field === 'name' ? 'Họ và tên' : field === 'phone' ? 'Số điện thoại' : field === 'address' ? 'Địa chỉ' : field === 'province' ? 'Tỉnh thành' : field === 'district' ? 'Quận huyện' : 'Phường xã'}
                    </label>
                    <input
                      className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                        errors[field] ? 'border-red-500' : ''
                      }`}
                      id={field}
                      type={field === 'email' ? 'email' : 'text'}
                      placeholder={field === 'email' ? 'Email' : field === 'name' ? 'Họ và tên' : field === 'phone' ? 'Số điện thoại' : field === 'address' ? 'Địa chỉ' : field === 'province' ? 'Tỉnh thành' : field === 'district' ? 'Quận huyện' : 'Phường xã'}
                      value={formData[field as keyof typeof formData]}
                      onChange={handleChange}
                    />
                    {errors[field] && (
                      <div className="flex mb-5 text-red-500 ml-4" role="alert">
                        * {errors[field]}
                      </div>
                    )}
                  </div>
                ))}
              </form>
            </div>
            <div className="col-span-1 bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Đơn hàng ({isUser?.cart.filter(a => a.status === true).length} sản phẩm)</h2>
              {isUser && isUser.cart && isUser.cart.map((item: any) =>
                item.status ? (
                  <div className="flex items-center mb-4" key={item.id}>
                    <img src={item.image} alt="Product" className="w-16 h-16 object-cover rounded-lg mr-4" />
                    <div>
                      <h3 className="text-lg font-semibold">{item.name}</h3>
                      <p className="text-gray-600">Số lượng: {item.quantity}</p>
                      <p className="text-gray-800 font-semibold">{VND.format(item.price)}</p>
                    </div>
                  </div>
                ) : null
              )}
              <div className="mt-8">
                <p className="text-lg font-semibold">Tổng cộng: {VND.format(totalPrice)}</p>
                <button
                  onClick={handleSubmit}
                  className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                  Đặt hàng
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
      <Snackbar open={snackbarOpen} message={snackbarMessage} onClose={closeSnackbar} />
      <LoadingOverlay open={loading} />
      <div className={`transition-opacity duration-500 ${loading ? 'opacity-0' : 'opacity-100'}`}></div>
    </div>
  );
}
