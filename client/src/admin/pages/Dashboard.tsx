import { useEffect, useState } from "react";
import LoadingOverlay from "../../components/LoadingOverlay";

export default function Dashboard() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000); // Simulate a loading process for 2 seconds
  }, []);
  return (
    <div>
      <div className="min-h-screen bg-gray-100 p-4">
        <div className={`transition-opacity duration-500 ${loading ? 'opacity-0' : 'opacity-100'}`}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <div className="bg-black text-white p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold">Total Sales</h2>
              <p className="text-3xl font-bold">$9,328.55</p>
              <p className="text-sm">731 Orders</p>
              <p className="text-green-400">+15.6% <span className="text-gray-400">+1.4k this week</span></p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold">Visitors</h2>
              <p className="text-3xl font-bold">12,302</p>
              <p className="text-sm">Avg. time: 4:30m</p>
              <p className="text-green-400">+12.7% <span className="text-gray-400">+1.2k this week</span></p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold">Order</h2>
              <p className="text-3xl font-bold">963</p>
              <p className="text-sm">2 Disputed</p>
              <p className="text-red-400">-12.7% <span className="text-gray-400">-213</span></p>
            </div>
            {/* <div className="bg-white p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold">Order</h2>
              <p className="text-3xl font-bold">963</p>
              <p className="text-sm">2 Disputed</p>
              <p className="text-red-400">-12.7% <span className="text-gray-400">-213</span></p>
            </div> */}
          </div>
          <div className="flex gap-5">
            <div className="bg-white p-4 rounded-lg shadow-md mb-4 w-2/3">
              <h2 className="text-xl font-semibold mb-4">Sales Performance</h2>
              
              <div className="h-48 bg-gray-200 rounded-md flex items-center justify-center">
                Chart goes here
              </div>
              <div className="flex justify-between items-center mt-4 ">
                <button className="border rounded-md px-3 py-1">Export data</button>
                <select className="border rounded-md px-3 py-1">
                  <option>Last 14 Days</option>
                  <option>Last 30 Days</option>
                </select>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-md w-[34%]">
              <h2 className="text-xl font-semibold mb-4">Top Categories</h2>
              <div className="h-48 bg-gray-200 rounded-md flex items-center justify-center">
                {/* Placeholder for the donut chart */}
                Donut chart goes here
              </div>
              <div className="mt-4">
                <p><span className="text-lg font-semibold">$6.2k</span></p>
                <ul>
                  <li>Electronics</li>
                  <li>Laptops</li>
                  <li>Phones</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <LoadingOverlay open={loading} />
      <div className={`transition-opacity duration-500 ${loading ? 'opacity-0' : 'opacity-100'}`}></div>
    </div>
  )
}
