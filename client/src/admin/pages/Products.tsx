export default function Products() {
  return (
    <div>
      <div className="flex justify-between items-center mb-5 mt-5">
        <strong className="text-3xl">Danh sách sản phẩm:</strong>
        <div className='flex gap-5'>
          <select name="" id="" className="w-[170px] border-2 rounded p-1">
            <option value="" hidden>Sắp xếp</option>
            {/* <option value="">Theo tuổi (tăng dần)</option>
            <option value="">Theo tuổi (giảm dần)</option> */}
          </select>
          <input
            className="border-slate-200 border-2 rounded p-1 w-[270px] bg-transparent"
            type="text"
            placeholder="Tìm kiếm..."
          />
          <button className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
            Thêm mới
          </button>
        </div>
      </div>
      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
        <thead>
          <tr>
            <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Age
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Address
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="bg-white">
            <td className="px-6 py-4 border-b border-gray-200 text-sm">
              John Doe
            </td>
            <td className="px-6 py-4 border-b border-gray-200 text-sm">
              30
            </td>
            <td className="px-6 py-4 border-b border-gray-200 text-sm">
              123 Main St
            </td>
          </tr>
          <tr className="bg-gray-50">
            <td className="px-6 py-4 border-b border-gray-200 text-sm">
              Jane Smith
            </td>
            <td className="px-6 py-4 border-b border-gray-200 text-sm">
              25
            </td>
            <td className="px-6 py-4 border-b border-gray-200 text-sm">
              456 Oak St
            </td>
          </tr>
          <tr className="bg-white">
            <td className="px-6 py-4 border-b border-gray-200 text-sm">
              Emily Johnson
            </td>
            <td className="px-6 py-4 border-b border-gray-200 text-sm">
              35
            </td>
            <td className="px-6 py-4 border-b border-gray-200 text-sm">
              789 Pine St
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
