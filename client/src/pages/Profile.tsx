import Header from '../components/Header'
import Footer from '../components/Footer'
// import Navbar from '../components/Navbar'
import LoadingOverlay from '../components/LoadingOverlay'
import { useEffect, useState } from 'react';

export default function Profile() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000); // Simulate a loading process for 2 seconds
  }, []);
  return (
    <div>
      <Header></Header>
      {/* <Navbar></Navbar> */}
      <Footer></Footer>
      <LoadingOverlay open={loading} />
        <div className={`transition-opacity duration-500 ${loading ? 'opacity-0' : 'opacity-100'}`}></div>
    </div>
  )
}
