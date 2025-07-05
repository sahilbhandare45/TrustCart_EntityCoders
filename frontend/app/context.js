'use client';

import React, { useState, createContext } from 'react';
import { useRouter } from 'next/navigation';



export const AppContext = createContext(undefined);
export default function AppcontextProvider( {children} ) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [name, setName] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [role, setRole] = useState("");
    const router = useRouter();

   const handlepush = (path) => {
    router.push(path);
   }

    return (
        <AppContext.Provider
            value={{
                email,
                setEmail,
                password,
                setPassword,
                error,
                setError,
                name,
                setName,    
                confirmPassword,
                setConfirmPassword,
                router,
                setPhone,
                phone,
                setRole,
                role,
                handlepush
               
              
            }}
        >
            {children}
        </AppContext.Provider>
    );
}