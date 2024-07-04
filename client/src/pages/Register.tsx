import { useEffect, useState } from "react"
import bcrypt from "bcryptjs-react"
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { User } from "../interface";

export default function Register() {
    useEffect(()=>{
       
    }, [])
    const [username, setUsername] = useState<string>('')
    const takeName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value)
    }
    const [password, setPassword] = useState<string>('')
    const takePass = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
        
    }
    const [email, setEmail] = useState<string>('')
    const takeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    }
    const [phoneNumber, setPhoneNumber] = useState<string>('')
    const takePhoneNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPhoneNumber(e.target.value)
    }
    const navigate = useNavigate();
    const [checkName, setCheckName] = useState<string>('none')
    const [checkEmail, setCheckEmail] = useState<string>('none')
    const [checkEmailHasRegistered, setCheckEmailHasRegistered] = useState<string>('none')
    const [checkPassword, setCheckPassword] = useState<string>('none')
    const saveUser = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        
        if (username === '') {
            setCheckName('');
        }else {
            setCheckName('none');
        }
        if (email === '') {
            setCheckEmail('');
        }else {
            setCheckEmail('none');
        }
        if (password === '') {
            setCheckPassword('');
        }else {
            setCheckPassword('none');
        }

        if (username !== '' && email !== '' && password !== '') {
            let checkEmailResponse = await axios.get(`http://localhost:8080/users?email_like=${email}`);
            if (checkEmailResponse.data.length === 0) {
                let user: User = {
                    id: Math.floor(Math.random() * 1000000000),
                    role: username === 'admin' ? 'admin' : 'user',
                    name: username,
                    email: email,
                    phoneNumber: phoneNumber,
                    password: bcrypt.hashSync(password, 10),
                    cart: [],
                };
                try {
                    await axios.post('http://localhost:8080/users', user);
                    setCheckName('none');
                    setCheckEmail('none');
                    setCheckPassword('none');
                    setCheckEmailHasRegistered('none');
                    navigate('/login', { state: user });
                } catch (error) {
                    console.error(error);
                }
            } else {
                setCheckEmailHasRegistered('');
            }
        }
    };
  return (
    <div className="w-[100vw] h-[100vh] flex justify-center items-center bg-[url('https://firebasestorage.googleapis.com/v0/b/ptit-son.appspot.com/o/images%2F2c845a66b8ad2a8aafd288bdc16cd459.jpg?alt=media&token=c290db9e-85fa-4246-a048-a0bba2b53321')] bg-no-repeat bg-cover">
        <div className="bg-slate-100 p-[20px] text-center rounded-3xl bg-transparent text-white backdrop-blur-[30px]">
            <form className="">
            <strong className="text-3xl">Đăng ký tài khoản</strong>
                <div className="mt-[30px] mb-[20px] w-[400px] flex justify-between">
                    <label className="">Tên của bạn:</label> 
                    <input className="border-slate-200 border-2 rounded p-1 w-[270px] bg-transparent" type="email" onChange={takeName}/>
                </div>
                <div
                    className="flex mb-5 text-red-500 ml-4"
                    role="alert"
                    style={{ display: `${checkName}` }}
                >
                    * Tên không được để trống.
                </div>
                <div className="mb-[20px] w-[400px] flex justify-between">
                    <label className="">Email:</label>
                    <input className="border-slate-200 border-2 rounded p-1 w-[270px] bg-transparent" type="email" onChange={takeEmail}/>
                </div>
                <div
                    className="flex mb-5 text-red-500 ml-4"
                    role="alert"
                    style={{ display: `${checkEmail}` }}
                >
                    * Email không được để trống.
                </div>
                <div
                    className="flex mb-5 text-red-500 ml-4"
                    role="alert"
                    style={{ display: `${checkEmailHasRegistered}` }}
                >
                    * Email đã tồn tại.
                </div>
                <div className="mb-[20px] w-[400px] flex justify-between">
                    <label className="">Phone Number:</label>
                    <input className="border-slate-200 border-2 rounded p-1 w-[270px] bg-transparent" type="email" onChange={takePhoneNumber}/>
                </div>
                <div className="w-[400px] flex justify-between mb-[20px]">
                    <label className="">Mật khẩu:</label>
                    <input className="border-slate-200 border-2 rounded p-1 w-[270px] bg-transparent" type="password" onChange={takePass}/>
                </div>
                <div
                    className="flex mb-5 text-red-500 ml-4"
                    role="alert"
                    style={{ display: `${checkPassword}` }}
                >
                    * Mật khẩu không được để trống!
                </div>
                <div>
                    <button type="submit" className="bg-blue-600 text-white p-2 pl-10 pr-10 mb-3 rounded hover:opacity-80" onClick={saveUser}>Đăng ký</button>
                </div>
                <p className="">Bạn đã có tài khoản? <Link to={'/login'} className="hover:text-blue-600">Đăng nhập</Link></p>
            </form>
        </div>
        <div role="status" className="fixed items-center">
            <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
            </svg>
            <span className="sr-only">Loading...</span>
        </div>
    </div>
  )
}
