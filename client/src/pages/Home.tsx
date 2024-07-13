import Header from '../components/Header'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import Banner from '../components/Banner'
import { useDispatch, useSelector } from 'react-redux'
import { Category, Product, State } from '../interface'
import { useEffect, useState } from 'react'
import { getAllProducts, getProductById } from '../services/products.service'
import { getAllCategories } from '../services/categories.service'
import LoadingOverlay from '../components/LoadingOverlay'
import { Link } from 'react-router-dom'

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000); // Simulate a loading process for 2 seconds
  }, []);
  const VND = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  });
  const products = useSelector((state: State) => state.products)
  const categories = useSelector((state: State) => state.categories)
  const [productsByCategory, setProductsByCategory] = useState<Product[]>(
    () => {
      if (categories.length > 0) {
        return products.filter((product: Product) => Number(product.idCategory) === categories[0].id);
      }
      return [];
    }
  );
  const dispatch = useDispatch()
  // Your code here
  useEffect(()=>{
    // Your code here to fetch data from API
    dispatch(getAllProducts())
    dispatch(getAllCategories())
  }, [])
  const getProductsByCategory = (category: Category) => {
    setProductsByCategory(products.filter((product: Product) => Number(product.idCategory) === category.id))
  }
  const handleProduct = (productId: number) => {
    dispatch(getProductById(productId))
  }
  return (
    <div>
        <Header></Header>
        <Navbar></Navbar>
        <Banner></Banner>
        <div className='pt-10 pl-32 pr-32 pb-10 flex flex-col'>
          <h1 className='mb-5 font-bold text-2xl'>DANH MỤC SẢN PHẨM:</h1>
          <div className='flex gap-7 border-2 border-black'>
            {/* List Category */}
            <div className='flex flex-col'>
              {
                categories.map((category, index) => {
                  return (
                    <div key={index} className={`cursor-pointer hover:text-red-500 border-black p-3 hover:bg-yellow-300 border-r-2 ${index === categories.length - 1 ? '' : 'border-b-2'}`} onClick={()=>getProductsByCategory(category)}>
                      <h2>{category.name}</h2>
                    </div>
                  )
                })
              }
            </div>
            {/* ProductCategory */}
            <div className='flex border-l-2'>
            {
              productsByCategory.map(product => {      
                return (
                  <Link to={`product-detail?id=${product.id}`} key={product.id} onClick={()=>handleProduct(product.id)} className="flex flex-col justify-between h-[250px] w-[200px] hover:border-[1px] hover:border-black pl-2">
                    <img src={product.image} className='w-[170px] h-[170px] mb-2'/>
                    <div>
                      <h2>{product.name}</h2>
                      <p>{VND.format(product.price)}</p>
                    </div>
                  </Link>
                )
              })
            }
            </div>
          </div>
        </div>
        <Footer></Footer>
        <LoadingOverlay open={loading} />
          <div className={`transition-opacity duration-500 ${loading ? 'opacity-0' : 'opacity-100'}`}></div>
    </div>
  )
}
