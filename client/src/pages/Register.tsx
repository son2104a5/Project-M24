import { useEffect, useState } from "react"
import bcrypt from "bcryptjs-react"
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { User } from "../interface";
import LoadingOverlay from "../components/LoadingOverlay";

export default function Register() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
        setLoading(false);
        }, 2000); // Simulate a loading process for 2 seconds
    }, []);
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
                    role: 'User',
                    name: username,
                    email: email,
                    phoneNumber: phoneNumber,
                    password: bcrypt.hashSync(password, 10),
                    cart: [],
                    favourites: [],
                    history: [],
                    status: true,
                    avatar: "https://firebasestorage.googleapis.com/v0/b/ptit-son.appspot.com/o/images%2Favatar-trang-4.jpg?alt=media&token=42d35db7-47e1-451d-acd1-8ceced065c6f",
                    address: ""
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
        <LoadingOverlay open={loading} />
            <div className={`transition-opacity duration-500 ${loading ? 'opacity-0' : 'opacity-100'}`}></div>
    </div>
  )
}
