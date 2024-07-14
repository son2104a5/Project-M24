export default function NotFound() {
  return (
    <div className="flex flex-col justify-center items-center h-screen text-slate-500 bg-slate-200">
        <i className="fa-regular fa-face-frown text-[180px] mb-5"></i>
        <p className="text-[64px] font-medium">404</p>
        <p className="text-[24px] text-slate-400 mb-5">Page not found</p>
        <p>The Page you are looking for doesn't exist or an other error occused.</p>
        <p>Go back, or head over to home page to choose a new direction.</p>
    </div>
  )
}
