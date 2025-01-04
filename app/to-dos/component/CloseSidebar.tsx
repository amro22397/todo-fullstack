'use client'

import { X } from 'lucide-react'
import React, { useState } from 'react'

const CloseSidebar = () => {

    
  return (
    <>
      <X className='md:hidden absolute top-2 right-3 hover:text-gray-700 cursor-pointer
          active:scale-90'
          onClick={() => setIsSideBarOpen(!isSideBarOpen)}
          />
    </>
  )
}

export default CloseSidebar
