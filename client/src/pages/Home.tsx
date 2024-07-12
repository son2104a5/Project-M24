import Header from '../components/Header'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import Banner from '../components/Banner'
import { useDispatch, useSelector } from 'react-redux'
import { Category, Product, State } from '../interface'
import { useEffect, useState } from 'react'
import { getAllProducts } from '../services/products.service'
import { getAllCategories } from '../services/categories.service'

export default function Home() {
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
  return (
    <div>
        <Header></Header>
        <Navbar></Navbar>
        <Banner></Banner>
        <div>
          <h1>Danh mục sản phẩm:</h1>
          <div>
            {/* List Category */}
            {
              categories.map((category, index) => {
                return (
                  <div key={index} className="flex gap-5 cursor-pointer hover:text-red-500" onClick={()=>getProductsByCategory(category)}>
                    <h2>{category.name}</h2>
                  </div>
                )
              })
            }
            {/* ProductCategory */}
            <div>
            {
              productsByCategory.map(product => {
                return (
                  <div key={product.id} className="flex gap-5">
                    <img src={product.image} alt={product.name} width="100" height="100" />
                    <div>
                      <h2>{product.name}</h2>
                      <p>{VND.format(product.price)}</p>
                    </div>
                  </div>
                )
              })
            }
            </div>
          </div>
        </div>
        <Footer></Footer>
    </div>
  )
}
