import { useEffect, useState } from "react";
import LoadingOverlay from "../../components/LoadingOverlay";

export default function Order() {
  const [loading, setLoading] = useState(true);
  // const [currentPage, setCurrentPage] = useState(1);
  // const [ordersPerPage] = useState(8);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000); // Simulate a loading process for 2 seconds
  }, []);

  // const indexOfLastOrder = currentPage * ordersPerPage;
  // const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  // const currentOrders = sortedorders.slice(indexOfFirstOrder, indexOfLastOrder);
  // const totalPages = Math.ceil(sortedorders.length / ordersPerPage);

  // const paginate = (pageNumber: number) => {
  //   setCurrentPage(pageNumber);
  // }
  // const nextPage = () => {
  //   if (currentPage < totalPages) {
  //     setCurrentPage(currentPage + 1);
  //   }
  // };

  // const prevPage = () => {
  //   if (currentPage > 1) {
  //     setCurrentPage(currentPage - 1);
  //   }
  // };

  return (
    <div>
      <div className="flex justify-between items-center mb-5 mt-5">
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
      {/* {
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
      } */}
      <LoadingOverlay open={loading} />
      <div className={`transition-opacity duration-500 ${loading ? 'opacity-0' : 'opacity-100'}`}></div>
    </div>
  )
}
