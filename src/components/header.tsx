"use client"
import axios from 'axios'
import { Avatar, Button, Dropdown, Navbar} from 'flowbite-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

interface user{
   username:"",
   email:""
}

export default function Header() {
   
  const router=useRouter();
  const [data, setData] = useState<user| null>(null)
  
  useEffect(() => {
   
    const getUserDetails = async () => {
      const res = await axios.get('/api/user')
      setData(res.data.data)
     }
    return () => {
        getUserDetails()
    }
  }, [])
    

   const logout=async()=>{
          try {
            await axios.get("api/logout");
            router.push('/login')
            setData(null)
          } catch (error:any) {
            console.log(error.message)
          }
   }


  return (
    
    <Navbar className='border-b-2'>
      <Link
        href='/'
        className=' self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white'
      >
        <span className=' px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>
          Expiry
        </span>
        Notifier
      </Link>

      


      <div className='flex gap-2 md:order-2'>
       
        {data ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar alt='user' rounded />
            }
          >
            <Dropdown.Header>
              <span className='block text-sm'>{data.username}</span>
              <span className='block text-sm font-medium truncate'>
                {data.email}
              </span>
            </Dropdown.Header>
            <Link href={'/dashboard?tab=profile'}>
              <Dropdown.Item>Profile</Dropdown.Item>
            </Link>
            <Dropdown.Divider />
            <Dropdown.Item onClick={logout}>Logout</Dropdown.Item>
          </Dropdown>
        ) : (
          <Link href='/login'>
            <Button gradientDuoTone='purpleToBlue' outline>
              Sign In
            </Button>
          </Link>
        )}
        <Navbar.Toggle />
      </div>









      

       
      <Navbar.Collapse >
        <Navbar.Link href="/" active>
          Home
        </Navbar.Link>
        <Navbar.Link as={Link} href="/addProduct">
          AddProduct
        </Navbar.Link>
        <Navbar.Link as={Link} href="/expiryItems">
          ExpiryItem
        </Navbar.Link>
        <Navbar.Link href="/about">About</Navbar.Link>
       
      </Navbar.Collapse>
   
      </Navbar>
  )
}
