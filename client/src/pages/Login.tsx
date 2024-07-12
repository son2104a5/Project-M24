import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import bcrypt from "bcryptjs-react"

export default function Login() {
    const navigate = useNavigate()
    const [check, setCheck] = useState<string>('none')
    const [checkEmailInput, setCheckEmailInput] = useState<string>('none')
    const [checkPasswordInput, setCheckPasswordInput] = useState<string>('none')
    const [checkStatus, setCheckStatus] = useState<boolean>(false)
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const inputValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.name === 'email'){
            setEmail(e.target.value)
        }else setPassword(e.target.value)
    }
    const submitUser = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        if (email === ''){
            setCheckEmailInput('')
        }
        if (password === ''){
            setCheckPasswordInput('')
        }
        if(email !== '' && password !== ''){
            setCheckEmailInput('none')
            setCheckPasswordInput('none')
            let checkEmailResponse = await axios.get(`http://localhost:8080/users?email_like=${email}`);
            if(checkEmailResponse.data.length === 0){
                setCheck('block')
            } else if (checkEmailResponse.data[0].status) {
                if(checkEmailResponse.data.length === 0){
                    setCheck('block')
                }else {
                    bcrypt.compare(password, checkEmailResponse.data[0].password, function(err, result) {
                        if(result){
                            navigate('/')
                            localStorage.setItem('userHasLogin', JSON.stringify(email))
                        }else{
                            setCheck('block')
                        }
                    })
                }
            } else {
                setCheckStatus(true)
            }
        }
    }
  return (
    <div className="w-[100vw] h-[100vh] flex justify-center items-center bg-[url('https://firebasestorage.googleapis.com/v0/b/ptit-son.appspot.com/o/images%2F2c845a66b8ad2a8aafd288bdc16cd459.jpg?alt=media&token=c290db9e-85fa-4246-a048-a0bba2b53321')] bg-no-repeat bg-cover">
        <div className="bg-slate-100 p-[20px] text-center rounded-3xl bg-transparent text-white backdrop-blur-[30px]">
            <form className="">
            <strong className="text-3xl">Đăng nhập</strong>
                <div className="mb-[20px] w-[400px] flex justify-between mt-6">
                    <label className="">Email:</label>
                    <input className="border-slate-200 border-2 rounded p-1 w-[270px] bg-transparent" type="email" value={email} name="email" onChange={inputValueChange}/>
                </div>
                <div
                    className="flex mb-5 text-red-500 ml-4"
                    role="alert"
                    style={{ display: `${checkEmailInput}` }}
                >
                    * Email không được để trống
                </div>
                <div className="w-[400px] flex justify-between mb-[20px]">
                    <label className="">Mật khẩu:</label>
                    <input className="border-slate-200 border-2 rounded p-1 w-[270px] bg-transparent" type="password" value={password} name="password" onChange={inputValueChange}/>
                </div>
                <div
                    className="flex mb-5 text-red-500 ml-4"
                    role="alert"
                    style={{ display: `${checkPasswordInput}` }}
                >
                    * Mật khẩu không được để trống
                </div>
                <div
                    className="flex mb-5 text-red-500 ml-4"
                    role="alert"
                    style={{ display: `${check}` }}
                >
                    * Email hoặc mật khẩu không tồn tại!
                </div>
                <div
                    className="flex mb-5 text-red-500 ml-4"
                    role="alert"
                    style={{ display: `${checkStatus ? 'block' : 'none'}` }}
                >
                    * Tài khoản đã bị khóa!
                </div>
                <div>
                    <Link to={'/'}><button type="submit" className="bg-blue-600 text-white p-2 pl-8 pr-8 mb-3 rounded hover:opacity-80" onClick={submitUser}>Đăng nhập</button></Link>
                </div>
                <p className="">Bạn chưa có tài khoản? <Link to={'/register'} className="hover:text-blue-600 ">Đăng ký ngay!</Link></p>
            </form>
        </div>
    </div>
  )
}
