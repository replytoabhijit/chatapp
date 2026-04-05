"use client"
import React, { use, useState } from 'react'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useAuthStore } from './zustand/useAuthStore';

const Auth = () => {
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const {authName, updateAuthName} = useAuthStore();

    const router = useRouter();

    const signUpFunc = async (event) => {
        console.log("Sign up button clicked");
       event.preventDefault();

       try {
           const res = await axios.post('http://localhost:5001/auth/signup', {
               username: username,
               password: password
           },
           {
               withCredentials: true
           }
)
           console.log("Response from server: ", res.data);
           if(res.data.message === "Username already exists. Please choose a different username.") {
               alert('Username already exists');
           } else {
                updateAuthName(username);
                console.log("Signup Completed, Auth Name in store: " + authName);
                //const router = useRouter();
                router.replace('/chat');
           }
       } catch (error) {
           console.log("Error in signup function : ", error.message);
       }
   }

   const login = async (event) => {
        console.log("Login button clicked");
       event.preventDefault();

       try {
           const res = await axios.post('http://localhost:5001/auth/login', {
               username: username,
               password: password
           },
           {
               withCredentials: true
           }
)
           console.log("Response from server: ", res.data);
            //    if(res.data.message === "Username already exists. Please choose a different username.") {
            //        alert('Username already exists');
            //    } 
            if(res.status === 201) {
                updateAuthName(username);
                
                router.replace('/chat');
            }
       } catch (error) {
           console.log("Error in signup function : ", error.message);
       }
   }


  return (
      <div>
          <div className="flex min-h-full flex-col justify-center px-30 py-12 lg:px-30">
              <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                  <form action="#" method="POST" className="space-y-6">
                      <div>
                          <label htmlFor="username" className="block text-sm/6 font-medium text-gray-900">Username</label>
                          <div className="mt-2">
                              <input id="username" 
                              type="username" 
                              name="username"
                              value={username}
                              onChange={(e) => setUserName(e.target.value)} 
                              required autoComplete="username" className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-900/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6" />
                          </div>
                      </div>

                      <div>
                          <div className="flex items-center justify-between">
                              <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">Password</label>
                          </div>
                          <div className="mt-2">
                              <input id="password" 
                              type="password" 
                              name="password"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)} 
                              required autoComplete="current-password" className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-900/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6" />
                          </div>
                      </div>

                      <div className='flex'>
                          <button onClick={signUpFunc} type="submit" className="m-3 flex w-1/2 justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">Sign Up</button>

                          <button onClick={login} type="submit" className="m-3 flex w-1/2 justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">Login</button>
                      </div>
                  </form>
              </div>
          </div>

      </div>
  )
}

export default Auth