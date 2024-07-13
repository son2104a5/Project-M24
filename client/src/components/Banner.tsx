import { useDispatch, useSelector } from "react-redux"
import { State } from "../interface"
import { useEffect } from "react";
import { getBanners } from "../services/banners.service";

export default function Banner() {
  const banners = useSelector((state: State) => state.banners)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getBanners());
  }, [dispatch]);
  return (
    <div>
        <div id="default-carousel" className="relative w-full h-[500px]" data-carousel="slide">
          <div className="relative h-64 overflow-hidden rounded-lg md:h-[500px]">
            <div className="hidden duration-700 ease-in-out" data-carousel-item="">
              <img
                src="https://firebasestorage.googleapis.com/v0/b/ptit-son.appspot.com/o/images%2FMHD-1920x450-3.jpg?alt=media&token=851f85c5-b9b3-4534-95b2-8cd23ebde98f"
                className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 h-full"
                alt="..."
              />
            </div>
            <div className="hidden duration-700 ease-in-out" data-carousel-item="">
              <img
                src="https://firebasestorage.googleapis.com/v0/b/ptit-son.appspot.com/o/images%2F720x220--1--720x220.png?alt=media&token=e6aa712d-9c50-4a2e-b529-7c79c59f23b0"
                className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 h-full"
                alt="..."
              />
            </div>
            <div className="hidden duration-700 ease-in-out" data-carousel-item="">
              <img
                src="https://firebasestorage.googleapis.com/v0/b/ptit-son.appspot.com/o/images%2F720x220-720x220-82.png?alt=media&token=612c39da-262e-40fc-a8f9-85db77027d23"
                className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 h-full"
                alt="..."
              />
            </div>
            <div className="hidden duration-700 ease-in-out" data-carousel-item="">
              <img
                src="https://firebasestorage.googleapis.com/v0/b/ptit-son.appspot.com/o/images%2F720-220-FINAL-720x220-1.png?alt=media&token=66819425-7c11-44dd-8e6c-eccdc446e669"
                className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 h-full"
                alt="..."
              />
            </div>
            <div className="hidden duration-700 ease-in-out" data-carousel-item="">
              <img
                src="https://firebasestorage.googleapis.com/v0/b/ptit-son.appspot.com/o/images%2FNha-via-Chung-MB-720x220.png?alt=media&token=c2ced13b-86b6-457d-8754-b5fd77bc2f10"
                className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 h-full"
                alt="..."
              />
            </div>
          </div>
          <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
            {
              banners.map((banner, index) => {
                return <button
                  key={banner.id}
                  type="button"
                  className="w-3 h-3 rounded-full bg-slate-300"
                  aria-current="true"
                  aria-label={`Slide ${index + 1}`}
                  data-carousel-slide-to={index}
                />
              })
            }
          </div>
          <button
            type="button"
            className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
            data-carousel-prev=""
          >
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
              <svg
                className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 1 1 5l4 4"
                />
              </svg>
              <span className="sr-only">Previous</span>
            </span>
          </button>
          <button
            type="button"
            className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
            data-carousel-next=""
          >
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
              <svg
                className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="m1 9 4-4-4-4"
                />
              </svg>
              <span className="sr-only">Next</span>
            </span>
          </button>
        </div>
    </div>
  )
}
