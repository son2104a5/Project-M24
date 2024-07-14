import { useDispatch, useSelector } from "react-redux";
import { Product, State } from "../../interface";
import { useEffect, useState } from "react";
import { addProduct, deleteProduct, getAllProducts, updateProduct } from "../../services/products.service";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../config/firebase";
import { getAllCategories } from "../../services/categories.service";
import Snackbar from "../../components/Snackbar";
import LoadingOverlay from "../../components/LoadingOverlay";

let data: number;
export default function Products() {
  const VND = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  });
  const [imageUrls, setImageUrls] = useState<any>('');
  const [action, setAction] = useState<boolean>(true);
  const [form, setForm] = useState(false);
  const [model, setModel] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<Product>();
  const [nameProductValue, setNameProductValue] = useState('');
  const [imageValue, setImageValue] = useState<any>('');
  const [categoryValue, setCategoryValue] = useState<number | string>('');
  const [priceValue, setPriceValue] = useState<number | string>('');
  const [stockValue, setStockValue] = useState<number | string>('');
  const [descriptionValue, setDescriptionValue] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [filterSelect, setFilterSelect] = useState<string>('')

  const categories = useSelector((state: State) => state.categories);
  const products = useSelector((state: State) => state.products) || [];
  // Error
  const [nameError, setNameError] = useState<boolean>(false)
  const [stockError, setStockError] = useState<boolean>(false)
  const [descriptionError, setDescriptionError] = useState<boolean>(false)
  const [categoryError, setCategoryError] = useState<boolean>(false)

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000); // Simulate a loading process for 2 seconds
  }, []);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProducts());
    dispatch(getAllCategories());
  }, [dispatch]);

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

  // chọn file
  const handleSelectedFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files: any = e.target.files?.[0];
    setImageUrls(files);
    console.log(imageValue);
  };

  const openForm = (action: boolean, product?: Product) => {
    setAction(action);
    if (product) {
      data = product.id;
      setNameProductValue(product.name);
      setImageValue(product.image);
      setCategoryValue(String(product.idCategory));
      setPriceValue(product.price);
      setStockValue(product.stock);
      setDescriptionValue(product.description);
    } else {
      setNameProductValue('');
      setImageValue('');
      setCategoryValue('');
      setPriceValue('');
      setStockValue('');
      setDescriptionValue('');
    }
    setImageUrls('');
    setNameError(false);
    setStockError(false);
    setDescriptionError(false);
    setCategoryError(false);
    setForm(true);
  };

  const handleAdd = () => {
    if (nameProductValue === '') {
      setNameError(true)
    } else setNameError(false)
    if (stockValue === 0 || stockValue === '') {
      setStockError(true)
    } else setStockError(false)
    if (descriptionValue === '') {
      setDescriptionError(true)
    } else setDescriptionError(false)
    if (categoryValue === '') {
      setCategoryError(true)
    } else setCategoryError(false)
    if (nameProductValue !== '' && categoryValue !== '' && stockValue !== '' && descriptionValue !== '') {
      const imageRef = ref(storage, `images/${imageUrls.name}`);
      uploadBytes(imageRef, imageUrls).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          setImageValue(url);
          if (action) {
            dispatch(addProduct({
              id: Math.floor(Math.random() * 1000000000),
              name: nameProductValue,
              image: url,
              idCategory: Number(categoryValue),
              price: Number(priceValue),
              stock: Number(stockValue),
              description: descriptionValue,
              hasPrice: 0,
              createdAt: new Date(),
              updatedAt: ''
            }))
            showSnackbar('Thêm sản phẩm thành công!')
          } else {
            let product: any = products.find((a) => a.id === data);
            let updateData: any = {
              id: product.id,
              name: nameProductValue,
              image: url,
              idCategory: Number(categoryValue),
              price: Number(priceValue),
              stock: Number(stockValue),
              description: descriptionValue,
              hasPrice: 0,
              createdAt: product.createdAt,
              updatedAt: new Date()
            };
            dispatch(updateProduct(updateData));
            showSnackbar('Cập nhật sản phẩm thành công!')
          }

          // Clear form fields
          setNameProductValue('');
          setCategoryValue('');
          setDescriptionValue('');
          setPriceValue('');
          setStockValue('');
          setForm(false);
        });
      });
    } else return
  };

  const deleteModel = (product: Product) => {
    setModel(true);
    setSelectedProduct(product);
  };

  const handleDelete = () => {
    if (selectedProduct) {
      dispatch(deleteProduct(selectedProduct.id));
      showSnackbar('Xóa sản phẩm thành công!');
    }
    setModel(false);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(e.target.value);
  };

  const getFilteredProducts = () => {
    let filteredProducts = [...products] || [];

    if (searchQuery) {
      filteredProducts = filteredProducts.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    switch (sortOption) {
      case 'price-asc':
        filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filteredProducts.sort((a, b) => b.price - a.price);
        break;
      case 'stock-asc':
        filteredProducts.sort((a, b) => a.stock - b.stock);
        break;
      case 'stock-desc':
        filteredProducts.sort((a, b) => b.stock - a.stock);
        break;
      default:
        break;
    }

    return filteredProducts;
  };
  const filteredProducts = getFilteredProducts();

  // Phân trang
  const indexOfLastUser = currentPage * productsPerPage;
  const indexOfFirstUser = indexOfLastUser - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

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
        <div className='flex gap-5'>
          <select name="" id="" className="w-[170px] border-2 rounded p-1" onChange={(e)=>setFilterSelect(e.target.value)}>
            <option value="" hidden>Lọc</option>
            <option value="categories">Danh mục</option>
            <option value="price">Giá</option>
            <option value="stock">Tồn kho</option>
          </select>
          {
            filterSelect !== '' ? <select name="" id="" className="w-[170px] border-2 rounded p-1">
              <option value="" hidden></option>
              {
                filterSelect === 'category' ? categories.map(category => (
                  <option key={category.id} value={category.id}>{category.name}</option>
                )) : ''
              }
            </select> : ''
          }
          <select name="" id="" className="w-[170px] border-2 rounded p-1" onChange={handleSort}>
            <option value="" hidden>Sắp xếp</option>
            <option value="price-asc">Giá tăng dần</option>
            <option value="price-desc">Giá giảm dần</option>
            <option value="stock-asc">Trữ lượng tăng dần</option>
            <option value="stock-desc">Trữ lượng giảm dần</option>
          </select>
          <input
            className="border-slate-200 border-2 rounded p-1 w-[270px] bg-transparent"
            type="text"
            placeholder="Tìm kiếm..."
            value={searchQuery}
            onChange={handleSearch}
          />
          <button className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" onClick={() => openForm(true)}>
            Thêm mới
          </button>
        </div>
      </div>
      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
        <thead className="text-center">
          <tr>
            <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              #
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Tên sản phẩm
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Danh mục
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Ảnh
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Giá
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Trữ lượng
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Ngày tạo
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Ngày sửa
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Chức năng
            </th>
          </tr>
        </thead>
        <tbody>
          {
            currentProducts.map((product, index) => (
              <tr key={product.id}>
                <td className="px-6 py-4 border-b border-gray-200">{index + 1}</td>
                <td className="px-6 py-4 border-b border-gray-200">{product.name}</td>
                <td className="px-6 py-4 border-b border-gray-200">
                  {
                    categories.find(category => category.id === product.idCategory)?.name
                  }
                </td>
                <td className="px-3 py-4 border-b border-gray-200">
                  <img className="w-[29px]" src={product.image}/>
                </td>
                <td className="px-6 py-4 border-b border-gray-200">{VND.format(product.price)}</td>
                <td className="px-6 py-4 border-b border-gray-200">{product.stock}</td>
                <td className="px-6 py-4 border-b border-gray-200">{new Date(product.createdAt).toLocaleDateString()}</td>
                <td className="px-6 py-4 border-b border-gray-200">{product.updatedAt ? new Date(product.updatedAt).toLocaleDateString() : '-'}</td>
                <td className="px-6 py-4 border-b border-gray-200 text-xl flex gap-5 pl-8 mt-2">
                  <i onClick={() => openForm(false, product)} className="fa-regular fa-pen-to-square text-blue-600 hover:opacity-70"></i>
                  <i onClick={() => deleteModel(product)} className="fa-solid fa-trash-can text-red-600 hover:opacity-70"></i>
                </td>
              </tr>
            ))
          }
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
      {
        form && <div className="fixed top-0 right-0 flex items-center justify-center w-screen h-screen bg-black bg-opacity-40">
          <div className="bg-white p-10 flex flex-col gap-10 rounded-2xl w-auto">
            <div className="flex justify-between text-3xl">
              <strong className="flex justify-between text-3xl">{action ? 'Thêm thông tin sản phẩm:' : 'Sửa thông tin sản phẩm:'}</strong>
              <span className="cursor-pointer" onClick={() => setForm(false)}><i className="fa-solid fa-xmark"></i></span>
            </div>
            <div className="flex gap-40">
              <div className="flex flex-col gap-10 text-xl">
                <div className="flex gap-2">
                  <label htmlFor="">Tên sản phẩm:</label>
                  <input type="text" className="border-2 p-1 rounded" placeholder="Tên sản phẩm..." value={nameProductValue} onChange={(e) => setNameProductValue(e.target.value)} />
                </div>
                <div
                  className="flex text-red-500 ml-4"
                  role="alert"
                  style={{ display: `${nameError ? 'block' : 'none'}` }}
                >
                  * Tên sản phẩm không được để trống!
                </div>
                <div className="flex gap-2 items-center">
                  {imageUrls ? (
                    <img src={URL.createObjectURL(imageUrls)} alt="Chosen image" className='h-[200px]' />
                  ) : (
                    <i className="fa-solid fa-image text-9xl"></i>
                  )}

                  <input type="file" id="file-upload" className="hidden" onChange={handleSelectedFiles} />
                  <label htmlFor="file-upload" className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer">
                    Chọn ảnh từ máy tính
                  </label>
                </div>
                <div className="flex gap-2">
                  <label htmlFor="">Danh mục:</label>
                  <select value={categoryValue} className="border-2 p-1 rounded w-[300px]" onChange={(e) => setCategoryValue(e.target.value)}>
                    <option hidden>Chọn danh mục</option>
                    {
                      categories.map((category, index) => {
                        return <option key={index} value={category.id}>{category.name}</option>
                      })
                    }
                  </select>
                </div>
                <div
                  className="flex text-red-500 ml-4"
                  role="alert"
                  style={{ display: `${categoryError ? 'block' : 'none'}` }}
                >
                  * Không để trống danh mục!
                </div>
              </div>
              <div className="flex flex-col gap-10 text-xl">
                <div className="flex gap-2">
                  <label htmlFor="">Giá:</label>
                  <input type="number" min={0} className="border-2 p-1 rounded" placeholder="Giá..." value={priceValue} name="price" onChange={(e) => setPriceValue(e.target.value)} />
                </div>
                <div className="flex gap-2">
                  <label htmlFor="">Dự trữ:</label>
                  <input type="number" min={0} className="border-2 p-1 rounded" placeholder="Dự trữ..." value={stockValue} name="stock" onChange={(e) => setStockValue(e.target.value)} />
                </div>
                <div
                  className="flex text-red-500 ml-4"
                  role="alert"
                  style={{ display: `${stockError ? 'block' : 'none'}` }}
                >
                  * Số lượng không phù hợp!
                </div>
                <div className="flex gap-2">
                  <label htmlFor="">Mô tả:</label>
                  <textarea className="border-2 p-1 rounded" placeholder="Text here..." value={descriptionValue} name="description" cols={23} onChange={(e) => setDescriptionValue(e.target.value)}></textarea>
                </div>
                <div
                  className="flex text-red-500 ml-4"
                  role="alert"
                  style={{ display: `${descriptionError ? 'block' : 'none'}` }}
                >
                  * Chưa viết mô tả sản phẩm!
                </div>
              </div>
            </div>
            <div className="w-full flex justify-end">
              <button className="bg-blue-500 p-2 text-white rounded-full w-1/6 flex justify-center" onClick={handleAdd}>{action ? 'Thêm' : 'Sửa'}</button>
            </div>
          </div>
        </div>
      }
      {
        model && <div className={`w-screen h-screen bg-black bg-opacity-40 fixed flex flex-col items-center top-0 right-0 justify-center `}>
          <div className="flex justify-between bg-white w-1/3 pb-16 pl-4 pr-4 pt-4 border-y-[1px] rounded-t-xl">
            <h2 className="text-2xl">Bạn thực sự muốn xóa sản phẩm <span className="text-red-500">{selectedProduct?.name}</span>?</h2>
            <span onClick={() => setModel(false)} className="cursor-pointer text-2xl"><i className="fa-solid fa-xmark"></i></span>
          </div>
          <div className="flex justify-end bg-slate-600 w-1/3 p-4 gap-5 rounded-b-xl">
            <button onClick={() => setModel(false)} className="bg-white p-2 rounded">Hủy</button><button className="bg-red-500 p-2 rounded text-white" onClick={handleDelete}>Xóa</button>
          </div>
        </div>
      }
      {/* Snackbar */}
      <Snackbar message={snackbarMessage} open={snackbarOpen} onClose={closeSnackbar} />
      <LoadingOverlay open={loading} />
      <div className={`transition-opacity duration-500 ${loading ? 'opacity-0' : 'opacity-100'}`}></div>
    </div>
  );
}
