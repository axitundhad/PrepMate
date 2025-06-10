import React from 'react'
import { Link } from 'react-router-dom'
import ProfileInfoCard from '../Cards/ProfileInfoCard'

const Navbar = () => {
  return (
    <div className='h-16 bg-white border border-b border-gray-200 shadow-md backdrop-blur-[2px] py-2.5 px-4 sticky top-0 z-30'>
      <div className='container mx-auto flex items-center justify-between gap-5'>
        <Link>
        <div className="flex gap-2 justify-center items-center">
              <img src="/logo.svg" alt="logo" className="size-7" />
              <div className="text-lg md:text-2xl text-black font-bold">PrepMate</div>
            </div>
        </Link>
        <ProfileInfoCard />
      </div>
    </div>
  )
}

export default Navbar
