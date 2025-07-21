'use client'
import { useState } from 'react'
import '../styles/login.css'
import { useRouter } from 'next/navigation';
import Loginauth from '../components/Loginauth';
import Link from 'next/link';

function Page() {
    const router = useRouter();

    const [identifier , setIdentifier] = useState("")
    const [password , setPassword] = useState("")
    async function login(){
        const userToSend = {
                identifier: identifier,
                password: password,
            };

            try {
                const response = await fetch("http://localhost:8081/users/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(userToSend)
                })
                const data = await response.json();
                localStorage.setItem("user", JSON.stringify(data));
                if(response.ok){
                    router.replace('/');
                }
            } catch (error) {
                console.error("Error:", error);
            }
    }
    return (
        <div className='container'>
            <div className='overlay'>
                <div>
                    <p>Username or Email</p>
                    <input type="text" onChange={(e)=> setIdentifier(e.target.value)}/>
                </div>
                <div>
                    <p>Enter your password</p>
                    <input type="password" onChange={(e)=> setPassword(e.target.value)}/>
                </div>
                <br />
                <div className='btn_login'>
                    <button onClick={login}>Login</button>
                    <Link href={'/register'}>Back to register</Link>
                </div>
                <br />
                <Loginauth/>
            </div>
        </div>
    )
}
export default Page