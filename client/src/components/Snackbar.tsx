import { useEffect, useState } from "react";

const Snackbar = ({ message, open, onClose }: { message: string; open: boolean; onClose: () => void; }) => {
  const [showSpinner, setShowSpinner] = useState(true);
  const [showCheck, setShowCheck] = useState(false);
  const [displayMessage, setDisplayMessage] = useState("Đang chờ xử lí...");

  useEffect(() => {
    let spinnerInterval: NodeJS.Timeout;

    if (open) {
      setShowSpinner(true);
      setShowCheck(false);
      setDisplayMessage("Đang chờ xử lí...");
      spinnerInterval = setInterval(() => {
        setShowSpinner(prev => !prev); // Toggle spinner display
      }, 1000);

      setTimeout(() => {
        clearInterval(spinnerInterval); // Stop spinner animation after 2 seconds
        setShowSpinner(false);
        setShowCheck(true);
        setDisplayMessage(message);
        setTimeout(() => {
          setShowCheck(false);
          onClose();
        }, 2000);
      }, 1000); // Spinner duration: 2 seconds, Check duration: 2 seconds
    }

    return () => {
      clearInterval(spinnerInterval); // Clean up interval on component unmount or when open state changes
    };
  }, [open, onClose, message]);

  return (
    <div className={`fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50 ${open ? 'block' : 'hidden'}`}>
      <div className="bg-white p-8 rounded-lg shadow-lg flex items-center justify-center space-x-4 flex-col gap-5">
        <div className="flex items-center">
          {showSpinner && (
            <svg className="animate-spin h-40 w-40 mr-3 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A8.001 8.001 0 0120.535 15H20v-2h4v6h-6v-2h1.535A8.001 8.001 0 016 17.291z"></path>
            </svg>
          )}
          {showCheck && (
            <svg className="h-40 w-40 text-green-500 mr-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.293 16.293a1 1 0 001.414 0L18 8.414a1 1 0 00-1.414-1.414L10 12.586 5.707 8.293a1 1 0 00-1.414 1.414l5 5z" clipRule="evenodd" />
            </svg>
          )}
        </div>
        <p className="text-gray-800">{displayMessage}</p>
      </div>
    </div>
  );
};

export default Snackbar;
