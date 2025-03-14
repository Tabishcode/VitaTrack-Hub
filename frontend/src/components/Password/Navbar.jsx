import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-blue-800 text-white'>
        <div className="mycontainer flex justify-between items-center px-4 py-5 h-14">
        <div className='logo font-bold text-white text-2xl'>
            <span className="text-blue-500">&lt;</span>
            Password
            <span className="text-blue-500">-Manager/&gt;</span>
            
            </div>
        {/* <u>
            <li className='flex gap-4'>
                <a className='hover: font-bold' href="#">Home</a>
                <a className='hover: font-bold' href="#">About</a>
                <a className='hover: font-bold' href="#">Contact</a>
            </li>
        </u> */}
        </div>
    </nav>
  )
}

export default Navbar
