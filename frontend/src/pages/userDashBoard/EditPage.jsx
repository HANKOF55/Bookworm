
import React from 'react'
import { useState } from 'react';


const EditPage = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
        name, 
        email, 
        password
    }


}

  return (
        <>
            <section className="w-full h-full flex flex-col justify-center items-stretch">
              <div className="w-full h-full bg-white shadow-lg rounded-xl flex flex-col items-center justify-center p-8">
                <h2 className="text-2xl font-bold mb-6 mt-2 text-center text-gray-900 w-full">Edit Profile</h2>
                <form className="w-full flex flex-col justify-center items-stretch px-4 py-6 gap-6 h-full max-w-lg mx-auto" onSubmit={handleSubmit}>
                  <div className="w-full flex flex-col gap-2">
                    <label htmlFor="name" className="font-semibold text-gray-700 text-lg">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      placeholder="Enter your name"
                      className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 bg-gray-100 text-gray-900 w-full text-base"
                      value={name}
                      onChange={e => setName(e.target.value)}
                    />
                  </div>
                  {/* Email Field */}
                  <div className="w-full flex flex-col gap-2">
                    <label htmlFor="email" className="font-semibold text-gray-700 text-lg">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Enter your email"
                      className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 bg-gray-100 text-gray-900 w-full text-base"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                    />
                  </div>
                  {/* Password Field */}
                  <div className="w-full flex flex-col gap-2">
                    <label htmlFor="password" className="font-semibold text-gray-700 text-lg">
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      placeholder="Enter a new password"
                      className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 bg-gray-100 text-gray-900 w-full text-base"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                    />
                  </div>
                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="mt-6 py-3 px-5 rounded-lg bg-orange-600 text-white font-semibold hover:bg-orange-700 transition-colors w-full text-lg"
                  >
                    Save Changes
                  </button>
                </form>
              </div>
            </section>
        </>
  )
}

export default EditPage