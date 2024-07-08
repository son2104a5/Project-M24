export default function Recommend() {
  return (
    <div>
      <div className="flex justify-between items-center mb-5 mt-5">
        <strong className="text-3xl">Danh sách phản hồi:</strong>
        <select name="" id="" className="w-[170px] border-2 rounded p-1">
          <option value="" hidden>Sắp xếp</option>
          <option value="">Theo tuổi (tăng dần)</option>
          <option value="">Theo tuổi (giảm dần)</option>
        </select>
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
