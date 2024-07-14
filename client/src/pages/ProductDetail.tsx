import Header from '../components/Header'
import Footer from '../components/Footer'
// import Navbar from '../components/Navbar'
import { useEffect, useState } from 'react';
import LoadingOverlay from '../components/LoadingOverlay';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTruck, faShieldAlt, faSyncAlt, faStar } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { State } from '../interface';
import { getProductById } from '../services/products.service';
import Snackbar from '../components/Snackbar';
import { getAllUsers, updatedUser } from '../services/users.service';
// import { faHeart } from '@fortawesome/free-regular-svg-icons';

export default function ProductDetail() {
  const [favourite, setFavourite] = useState(false)
  const [loading, setLoading] = useState(true);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const check = JSON.parse(localStorage.getItem('userHasLogin') as string);
  const product = useSelector((state: State) => state.products)
  const users = useSelector((state: State) => state.users)
  let userCheck: any = users.find((c)=> c.email === check)
  const dispatch = useDispatch()
  
  useEffect(()=>{
    dispatch(getProductById())
    dispatch(getAllUsers())
  }, [])
  
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000); // Simulate a loading process for 2 seconds
  }, []);

  const VND = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  });

  const productDetail: any = product

  const [quantity, setQuantity] = useState(1);

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

  const handleQuantityChange = (delta: number) => {
    if (productDetail.stock === 0) {
      alert('Sản phẩm đã hết hàng');
      return;
    } else if (quantity === productDetail.stock){
      alert('Vượt quá trữ lượng sản phẩm!');
      return;
    }
    setQuantity((prevQuantity) => Math.max(1, prevQuantity + delta));
  };

  const addToCart = () => {
    if (productDetail.stock === 0) {
      alert('Sản phẩm đã hết hàng');
      return;
    }
    if (check) {
      let updatedCart = [...userCheck.cart]; // Create a copy of the cart
      const index = updatedCart.findIndex((item: any) => item.productId === productDetail.id);
      
      if (index !== -1) {
        // Update the quantity if the product is already in the cart
        updatedCart[index] = {
          ...updatedCart[index],
          quantity: updatedCart[index].quantity + quantity,
          status: true
        };
      } else {
        // Add the product to the cart
        updatedCart.push({
          productId: productDetail.id,
          name: productDetail.name,
          price: productDetail.price,
          image: productDetail.image,
          quantity: quantity,
          status: false
        });
      }
      
      const updatedUserObj = {
        ...userCheck,
        cart: updatedCart
      };
      
      dispatch(updatedUser(updatedUserObj)); // Dispatch the updatedUser action to update the user in the state
      showSnackbar('Thêm vào giỏ hàng thành công');
    } else {
      alert('Vui lòng đăng nhập để mua hàng');
      window.location.href = 'login'
    }
  };
  

  const buyNow = () => {
    if (productDetail.stock === 0) {
      alert('Sản phẩm đã hết hàng');
      return;
    }
    // Logic mua ngay
    if (check){
      let updatedCart = [...userCheck.cart]; // Create a copy of the cart
      const index = updatedCart.findIndex((item: any) => item.productId === productDetail.id);
      
      if (index !== -1) {
        // Update the quantity if the product is already in the cart
        updatedCart[index] = {
          ...updatedCart[index],
          quantity: updatedCart[index].quantity + quantity
        };
      } else {
        // Add the product to the cart
        updatedCart.push({
          productId: productDetail.id,
          name: productDetail.name,
          price: productDetail.price,
          image: productDetail.image,
          quantity: quantity,
          status: true
        });
      }
      
      const updatedUserObj = {
        ...userCheck,
        cart: updatedCart
      };
      
      dispatch(updatedUser(updatedUserObj));
      window.location.href = 'cart'
    } else {
      alert('Vui lòng đăng nhập để mua hàng');
      window.location.href = 'login'
    }
  };

  const handleClick = () => {
    setFavourite(!favourite);
  };
  return (
    <div>
      <Header></Header>
      {/* <Navbar></Navbar> */}
      <div className="max-w-5xl mx-auto p-4">
        <div className="flex flex-wrap">
          <div className="w-full md:w-1/2 p-4">
            <img src={productDetail.image} className="w-full h-auto relative" />
            {!favourite ? <i className="fa-regular fa-heart  absolute top-[145px] text-4xl text-red-600" onClick={handleClick}></i> : <i  onClick={handleClick} className="fa-solid fa-heart absolute top-[145px] text-4xl text-red-600"></i>}
          </div>
          <div className="w-full md:w-1/2 p-4 flex flex-col justify-between">
            <div>
              <h1 className="text-2xl font-bold">{productDetail.name}</h1>
              <p className="text-gray-500">Tình trạng: <span className={`${productDetail.stock === 0 ? 'text-red-500' : 'text-blue-500'}`}>{productDetail.stock === 0 ? 'Hết hàng' : 'Còn hàng'}</span></p>
              <p className="text-red-500 text-3xl font-bold my-4">{VND.format(productDetail.price)}</p>
              <div className="my-4">
                <p className="text-gray-700">Số lượng:</p>
                <div className="flex items-center mt-2">
                  <button onClick={() => handleQuantityChange(-1)} className="px-3 py-1 bg-gray-300">-</button>
                  <span className="px-4 py-1 border">{quantity}</span>
                  <button onClick={() => handleQuantityChange(1)} className="px-3 py-1 bg-gray-300">+</button>
                </div>
              </div>
            </div>

            <div>
              <div>
                <strong>Mô tả chi tiết:</strong>
                <p>{productDetail.description}</p>
              </div>
              <div className="flex space-x-4 my-4">
                <button className="flex-1 bg-purple-600 text-white py-2 rounded-lg hover:bg-opacity-70 text-center  " onClick={buyNow}>MUA NGAY</button>
              </div>
              <div className="flex space-x-4 my-4">
                <button className="flex-1 bg-gray-300 py-2 rounded-lg hover:bg-opacity-70" onClick={addToCart}>THÊM VÀO GIỎ HÀNG</button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between my-4 p-4 bg-gray-100 rounded-lg">
          <div className="flex items-center space-x-2">
            <FontAwesomeIcon icon={faTruck} className="text-blue-600" />
            <span>Miễn phí vận chuyển tại Hà Nội</span>
          </div>
          <div className="flex items-center space-x-2">
            <FontAwesomeIcon icon={faShieldAlt} className="text-blue-600" />
            <span>Bảo hành chính hãng toàn quốc</span>
          </div>
          <div className="flex items-center space-x-2">
            <FontAwesomeIcon icon={faSyncAlt} className="text-blue-600" />
            <span>Cam kết chính hãng 100%</span>
          </div>
          <div className="flex items-center space-x-2">
            <FontAwesomeIcon icon={faStar} className="text-blue-600" />
            <span>1 đổi 1 nếu sản phẩm lỗi</span>
          </div>
        </div>
      </div>
      <Footer></Footer>
      <Snackbar message={snackbarMessage} open={snackbarOpen} onClose={closeSnackbar} />
      <LoadingOverlay open={loading} />
        <div className={`transition-opacity duration-500 ${loading ? 'opacity-0' : 'opacity-100'}`}></div>
    </div>
  )
}
