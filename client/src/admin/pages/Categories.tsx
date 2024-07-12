import { useDispatch, useSelector } from "react-redux"
import { Category, State } from "../../interface"
import { useEffect, useState } from "react"
import { createCategory, deleteCategory, getAllCategories, updateCategory } from "../../services/categories.service"

let data: number;
export default function Categories() {
  const [openForm, setOpenForm] = useState<boolean>(false)
  const [inputValue, setInputValue] = useState<string>('')
  const [error, setError] = useState<string>('none')
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)
  const [active, setActive] = useState<string>('add')
  const [model, setModel] = useState<boolean>(false)
  const dispatch = useDispatch()
  const categories = useSelector((state: State)=>state.categories)
  useEffect(() => {
    dispatch(getAllCategories())
  }, [categories])
  
  const formCategory = (active: string, category?: Category) => {
    setActive(active)
    setInputValue(category ? category.name : '')
    category ? data = category.id : ''
    setOpenForm(true) 
  }
  const formClosed = () => {
    setOpenForm(false)
  }
  const addCategory = () => {
    if (inputValue === '') {
      setError('block')
    }else {
      if(active === 'add') {  
        setError('none')
        dispatch(createCategory({
          id: Math.floor(Math.random() * 1000000000),
          name: inputValue,
          createdAt: new Date(),
          updatedAt: ''
        }))
        dispatch(getAllCategories())
        setInputValue('')
        setOpenForm(false)
      } else {
        setError('none')
        let updateData: any = categories.find(c => c.id === data)
        updateData = {
          id: updateData.id,
          name: inputValue,
          createdAt: updateData.createdAt,
          updatedAt: new Date()
        }
        dispatch(updateCategory(updateData))
        dispatch(getAllCategories())
        setInputValue('')
        setOpenForm(false)
      }
    }
  }
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
      handleClose()
    }
  }
  return (
    <div>
      <div className="flex justify-between items-center mb-5 mt-5">
        <strong className="text-3xl">Danh sách danh mục:</strong>
        <div className='flex gap-5'>
          <select name="" id="" className="w-[170px] border-2 rounded p-1">
            <option value="" hidden>Sắp xếp</option>
            <option value="">Ngày tạo (tăng dần)</option>
            <option value="">Ngày tạo (giảm dần)</option>
          </select>
          <input
            className="border-slate-200 border-2 rounded p-1 w-[270px] bg-transparent"
            type="text"
            placeholder="Tìm kiếm..."
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
          {
            categories.map((category, index) => {
              return  <tr className="bg-white" key={category.id}>
                        <td className="px-6 py-4 border-b border-gray-200 text-sm">
                          {index + 1}
                        </td>
                        <td className="px-6 py-4 border-b border-gray-200 text-sm">
                          {category.name}
                        </td>
                        <td className="px-6 py-4 border-b border-gray-200 text-sm">
                          {new Date(category.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 border-b border-gray-200 text-sm">
                          {category.updatedAt !== '' ? new Date(category.updatedAt).toLocaleDateString() : '-'}
                        </td>
                        <td className="px-6 py-4 border-b border-gray-200 text-sm flex gap-5 ml-4">
                          <i className="fa-regular fa-pen-to-square text-blue-600 hover:opacity-70" onClick={()=>formCategory('edit', category)}></i>
                          <i className="fa-solid fa-trash-can text-red-600 hover:opacity-70" onClick={()=>formDelete(category)}></i>
                        </td>
                      </tr>
            })
          }
        </tbody>
      </table>
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
    </div>
  )
}
