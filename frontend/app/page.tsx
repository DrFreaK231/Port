'use client';
import { setEngine } from 'crypto';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Page() {
    const { data: session, status } = useSession();
    const stored = localStorage.getItem("user");
    interface Item {
        id: number,
        stock: number,
        rating: number,
        name: string,
        description: string,
        price: number
    }
    interface User {
        username: string;
        password: string;
        location: string;
        email: string;
        phoneNumber: string;
    }
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);
    const [items, setItems] = useState<Item[]>([]);
    const [cart, setCart] = useState<{ itemId: number, amount: number }[]>([]);


    // useEffect(() => {
    //     if (status === 'loading') return;
    //     const stored = localStorage.getItem("user");
    //     if (stored) {
    //         setUser(JSON.parse(stored));
    //     } else if (!session && !stored){
    //         router.replace("/register");
    //     } 
    // }, []);

    useEffect(() => {
        if (status === 'loading') return;

        if (status === 'authenticated' || stored) {
            if (!stored && session?.user) {
                const newUser = {
                    username: session.user.name || session.user.email || '',
                    password: '',
                    location: '',
                    email: session.user.email || '',
                    phoneNumber: ''
                };
                localStorage.setItem("user", JSON.stringify(newUser));
                setUser(newUser);
            } else if (stored) {
                setUser(JSON.parse(stored));
            }
        }
        if (status === 'unauthenticated' && !stored) {
            router.replace("/register");
            return;
        }
        const fetchItems = async () => {
            try {
                const res = await fetch('http://localhost:8081/items');
                if (!res.ok) throw new Error('Failed to fetch items');
                const data: Item[] = await res.json();
                setItems(data);
            } catch (error) {
                console.error('Error fetching items:', error);
            }
        };
        const registerUser = async () => {
            const userToLogin = {
                username: session?.user?.name,
                provider: session?.user?.email ? "GOOGLE" : "FACEBOOK"
            }
            try {
                const response = await fetch("http://localhost:8081/users/oauth-login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(userToLogin)
                })
                const data = await response.json();
            } catch (error) {
                console.error('Error', error);
            }
        }
        fetchItems();
        registerUser();
    }, [status, session]);
    async function signout() {
        localStorage.removeItem("user");
        await signOut({ redirect: false });
        setUser(null);
        router.replace("/register");
    }
    function getTime(): string {
        const now = new Date();
        return now.toISOString().slice(0, 19);
    }


    async function AddCart() {
        const userToSend = {
            identifier: session?.user?.name ? session.user.name : user?.username,
            password: session?.user?.name ? "oauthuser" : localStorage.getItem("password"),
        };
        console.log(userToSend);
        
        try {
            const response = await fetch("http://localhost:8081/users/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userToSend)
            })
            const data = await response.json();
            console.log(data);
            
            const orderCart = {
                "userId": data.id,
                "items": cart,
                "timestamp": getTime()
            }
            try {
                const response = await fetch("http://localhost:8081/orders", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(orderCart)
                })
            } catch (error) {
                console.error('Error', error);
            }
        } catch (error) {
            console.error("Error:", error);
        }

    }

    return (
        <>
            <div>
                <p>{user?.username}</p>
                <button onClick={signout}>Sign Out</button>
            </div>
            <div className='list'>
                {items.map((item) => {
                    const cartItem = cart.find(c => c.itemId === item.id);
                    const amount = cartItem?.amount || 0;
                    const handleAdd = () => {
                        setCart(prev => {
                            const existing = prev.find(c => c.itemId === item.id);
                            if (existing) {
                                return prev.map(c =>
                                    c.itemId === item.id ? { ...c, amount: c.amount + 1 } : c
                                );
                            } else {
                                return [...prev, { itemId: item.id, amount: 1 }];
                            }
                        });
                    };

                    const handleRemove = () => {
                        setCart(prev => {
                            const existing = prev.find(c => c.itemId === item.id);
                            if (!existing) return prev;
                            if (existing.amount <= 1) {
                                return prev.filter(c => c.itemId !== item.id);
                            } else {
                                return prev.map(c =>
                                    c.itemId === item.id ? { ...c, amount: c.amount - 1 } : c
                                );
                            }
                        });
                    };
                    return (
                        <div className='card' key={item.id}>
                            <img src="/mouse.jpg" alt="" width={200} height={200} />
                            <p>{item.name}</p>
                            <p>{item.description}</p>
                            <p>${item.price}</p>
                            <p>Stock: {item.stock}</p>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <button onClick={handleRemove}>-</button>
                                <p>{amount}</p>
                                <button onClick={handleAdd}>+</button>
                            </div>
                        </div>
                    );
                })}
                <button onClick={AddCart}>Buy</button>
            </div>
        </>
    );
}
