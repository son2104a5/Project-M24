import { useDispatch, useSelector } from "react-redux"
import { Category, State } from "../../interface"
import { useEffect, useState } from "react"
import { createCategory, deleteCategory, getAllCategories, updateCategory } from "../../services/categories.service"
import LoadingOverlay from "../../components/LoadingOverlay";
import Snackbar from "../../components/Snackbar";

export default function Categories() {
  const [openForm, setOpenForm] = useState<boolean>(false)
  const [inputValue, setInputValue] = useState<string>('')
  const [error, setError] = useState<string>('none')
  const [selectedCategory, setSelectedCategory] = useState<Category>()
  const [active, setActive] = useState<string>('add')
  const [model, setModel] = useState<boolean>(false)
  const [currentPage, setCurrentPage] = useState(1);
  const [categoriesPerPage] = useState(8);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [sortBy, setSortBy] = useState<'createdAt' | 'updatedAt'>('createdAt');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const dispatch = useDispatch()
  const categories = useSelector((state: State)=>state.categories) || []
  useEffect(() => {
    dispatch(getAllCategories())
  }, [dispatch])

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000); // Simulate a loading process for 2 seconds
  }, []);

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedCategories = filteredCategories.slice().sort((a, b) => {
    const order = sortOrder === 'asc' ? 1 : -1;
    if (sortBy === 'createdAt') {
      return order * (new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    } else {
      return order * (new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime());
    }
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
  
  const formCategory = (active: string, category?: Category) => {
    setActive(active)
    setInputValue(category ? category.name : '')
    category ? setSelectedCategory(category) : ''
    setOpenForm(true) 
  }
  const formClosed = () => {
    setOpenForm(false)
  }
  const addCategory = () => {
    if (inputValue === '') {
      setError('block');
    } else {
      if (active === 'add') {
        setError('none');
        dispatch(createCategory({
          id: Math.floor(Math.random() * 1000000000),
          name: inputValue,
          createdAt: new Date(),
          updatedAt: ''
        }));
        dispatch(getAllCategories());
        showSnackbar('Thêm danh mục thành công.')
        setInputValue('');
        setOpenForm(false);
      } else if (active == 'edit') {
        setError('none');
        let updateData: any = selectedCategory;
        updateData = {
          ...updateData,
          name: inputValue,
          updatedAt: new Date()
        }
        dispatch(updateCategory(updateData));
        dispatch(getAllCategories());
        showSnackbar('Cập nhật danh mục thành công.')
        setInputValue('');
        setOpenForm(false);
      }
    }
  };
  const formDelete = (data: Category) => {
    setModel(true)
    setSelectedCategory(data)
  }
  const handleClose = () => {
    setModel(false)
  }
  const confirmDelete = () => {
    if(selectedCategory){
      dispatch(deleteCategory(selectedCategory.id))
      dispatch(getAllCategories())
      showSnackbar(`Xóa danh mục ${selectedCategory.name} thành công.`)
      handleClose()
    }
  }

  const indexOfLastCategory = currentPage * categoriesPerPage;
  const indexOfFirstCategory = indexOfLastCategory - categoriesPerPage;
  const currentCategories = sortedCategories.slice(indexOfFirstCategory, indexOfLastCategory);
  const totalPages = Math.ceil(sortedCategories.length / categoriesPerPage);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  }
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

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const [order, field] = e.target.value.split('-');
    setSortOrder(order as 'asc' | 'desc');
    setSortBy(field as 'createdAt' | 'updatedAt');
  };

  return (
    <div>
      <div className="flex justify-end items-center mb-5 mt-5">
        <div className='flex gap-5'>
          <select
              onChange={handleSortChange}
              className="w-[170px] border-2 rounded p-1"
          >
            <option value="" hidden>Sắp xếp</option>
            <option value="asc-createdAt">Ngày tạo (tăng dần)</option>
            <option value="desc-createdAt">Ngày tạo (giảm dần)</option>
            <option value="asc-updatedAt">Ngày sửa đổi (tăng dần)</option>
            <option value="desc-updatedAt">Ngày sửa đổi (giảm dần)</option>
          </select>
          <input
            className="border-slate-200 border-2 rounded p-1 w-[270px] bg-transparent"
            type="text"
            placeholder="Tìm kiếm..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" onClick={()=>formCategory('add')}>
            Thêm mới
          </button>
        </div>
      </div>
      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
        <thead>
          <tr>
            <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              #
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Tên danh mục
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Ngày tạo
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Ngày sửa đổi
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Chức năng
            </th>
          </tr>
        </thead>
        <tbody>
        {currentCategories.map((category, index) => (
            <tr className="bg-white" key={category.id}>
              <td className="px-6 py-4 border-b border-gray-200 text-sm">
                {indexOfFirstCategory + index + 1}
              </td>
              <td className="px-6 py-4 border-b border-gray-200 text-sm">
                {category.name}
              </td>
              <td className="px-6 py-4 border-b border-gray-200 text-sm">
                {new Date(category.createdAt).toLocaleDateString()}
              </td>
              <td className="px-6 py-4 border-b border-gray-200 text-sm">
                {category.updatedAt ? new Date(category.updatedAt).toLocaleDateString() : '-'}
              </td>
              <td className="px-6 py-4 border-b border-gray-200 text-xl flex gap-5 pl-8">
                <i className="fa-regular fa-pen-to-square text-blue-600 hover:opacity-70" onClick={()=>formCategory('edit', category)}></i>
                <i className="fa-solid fa-trash-can text-red-600 hover:opacity-70" onClick={()=>formDelete(category)}></i>
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
      {
        openForm ? <div className="fixed top-0 right-0 flex items-center justify-center w-screen h-screen bg-black bg-opacity-40">
          <div className="bg-white p-10 flex flex-col gap-10 rounded-2xl w-1/3">
            <div className="flex justify-between text-3xl">
              <strong>{active === 'add' ? 'Thêm danh mục mới:' : 'Sửa danh mục:'}</strong>
              <span onClick={formClosed} className="cursor-pointer"><i className="fa-solid fa-xmark"></i></span>
            </div>
            <input
              className="border-slate-200 border-2 rounded p-2 w-full bg-transparent"
              type="text"
              placeholder="Tên danh mục..."
              value={inputValue}
              onChange={(e)=>setInputValue(e.target.value)}
            />
            <div
                className="flex text-red-500 ml-4"
                role="alert"
                style={{ display: `${error}` }}
            >
                * Hãy nhập tên danh mục trước
            </div>
            <div className="flex justify-end gap-5">
              <button onClick={formClosed} className="bg-red-500 p-2 rounded text-white">Hủy</button>
              <button className="bg-blue-500 p-2 rounded text-white" onClick={addCategory}>{active === 'add' ? 'Thêm' : 'Sửa'}</button>
            </div>
          </div>
        </div> : ''
      }
      {
        model ? <div className={`w-screen h-screen bg-black bg-opacity-40 fixed flex flex-col items-center top-0 right-0 justify-center `}>
              <div className="flex justify-between bg-white w-1/3 pb-16 pl-4 pr-4 pt-4 border-y-[1px] rounded-t-xl">
                <h2 className="text-2xl">Bạn thực sự muốn xóa danh mục <span className="text-red-500">{selectedCategory?.name}</span>?</h2>
                <span onClick={handleClose} className="cursor-pointer text-2xl"><i className="fa-solid fa-xmark"></i></span>
              </div>
              <div className="flex justify-end bg-slate-600 w-1/3 p-4 gap-5 rounded-b-xl">
                <button onClick={handleClose} className="bg-white p-2 rounded">Hủy</button><button className="bg-red-500 p-2 rounded text-white" onClick={confirmDelete}>Xóa</button>
              </div>
            </div> : ''
      }
      <LoadingOverlay open={loading} />
      <div className={`transition-opacity duration-500 ${loading ? 'opacity-0' : 'opacity-100'}`}></div>
      <Snackbar message={snackbarMessage} open={snackbarOpen} onClose={closeSnackbar} />
    </div>
  )
}
