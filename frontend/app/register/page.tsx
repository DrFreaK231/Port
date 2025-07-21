'use client';
import Link from 'next/link';
import Loginauth from '../components/Loginauth'
import '../styles/register.css'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';


export default function Page() {
    const router = useRouter();
    const [match, setMatch] = useState(false)
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [repassword, setRepassword] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [city, setCity] = useState("")
    const [address, setAddress] = useState("")
    useEffect(() => {
        setMatch(password === repassword);
    }, [password, repassword]);


    async function register() {
        if (password && password === repassword && email && city && address) {
            const userToSend = {
                username: username,
                password: password,
                location: city + " / " + address,
                email: email,
                phoneNumber: phone
            };
            const response = await fetch("http://localhost:8081/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userToSend)
            })
            const data = await response.json();
            localStorage.setItem("user", JSON.stringify(data));
            
            if (response.ok) {
                localStorage.setItem("password",JSON.stringify(password))
                router.replace("/")
            } else {
                alert("username or email already exists")
            }
        } else {
            alert("Missing required fields or password mismatch");
        }
    }

    return (

        <div className='container'>
            <div className='overlay'>
                <div className='field'>
                    <p>Username :</p>
                    <input type="text" placeholder="Enter your username" onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div className='field'>
                    <p>Email {!email ? <span className="req_text">*required</span> : ""}</p>
                    <input type="text" placeholder="Enter your email" onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className='field'>
                    <p>Password : {!password ? <span className="req_text">*password cannot be empty</span> : ""}</p>
                    <input type="password" placeholder="Enter your password" onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className='field'>
                    <p>Re-Enter your password : {match || repassword === "" ? "" : <span className="req_text">*password does not match</span>}</p>
                    <input type="password" placeholder="Re-Enter your password" onChange={(e) => setRepassword(e.target.value)} />
                </div>
                <div className='field'>
                    <p>Ph Number :</p>
                    <input type="text" placeholder="Enter your phone number" onChange={(e) => setPhone(e.target.value)} />
                </div>
                <div className='field'>
                    <p className='location_text'>Location:</p>
                    <div className='field_location'>
                        <div >
                            <p>Township / City {!city ? <span className="req_text">*required</span> : ""}</p>
                            <input type="text" placeholder="e.g Pantunan, Bangkok" onChange={(e) => setCity(e.target.value)} />
                        </div>
                        <div>
                            <p>Street / Address {!address ? <span className="req_text">*required</span> : ""}</p>
                            <input type="text" placeholder="e.g Ox Ford.St 20" onChange={(e) => setAddress(e.target.value)} />
                        </div>
                    </div>
                </div>
                <div className='btn'>
                    <div className='btn_login'>
                        <p>Already Have an Account?</p>
                        <Link href="/login">Login</Link>
                    </div>
                    <div>
                        <button onClick={register}>Register</button>

                    </div>
                </div>
            </div>
        </div>

    )
}
