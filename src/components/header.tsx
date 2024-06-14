"use client"
import { Avatar, Button, Dropdown, Navbar, NavbarCollapse, NavbarLink, NavbarToggle } from 'flowbite-react'
import Link from 'next/link'
import React from 'react'
import { HiCog, HiCurrencyDollar, HiLogout, HiViewGrid } from 'react-icons/hi'
import { IoIosMenu } from 'react-icons/io'

export default function Header() {
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

      

      <div className="flex md:order-2">
        <Dropdown
          arrowIcon={false}
          inline
          label={
            <IoIosMenu />
          } dismissOnClick={false}>
        
        <Dropdown.Header>
        <span className="block text-sm">Bonnie Green</span>
        <span className="block truncate text-sm font-medium">bonnie@flowbite.com</span>
      </Dropdown.Header>
      <Dropdown.Item icon={HiViewGrid}>Dashboard</Dropdown.Item>
      <Dropdown.Item icon={HiCog}>Settings</Dropdown.Item>
      <Dropdown.Item icon={HiCurrencyDollar}>Earnings</Dropdown.Item>
      <Dropdown.Divider />
      <Dropdown.Item icon={HiLogout}>Sign out</Dropdown.Item>
        </Dropdown>
      
      </div>
      

       
      <Navbar.Collapse >
        <Navbar.Link href="#" active>
          Home
        </Navbar.Link>
        <Navbar.Link as={Link} href="/expiryItem">
          ExpiryItem
        </Navbar.Link>
        <Navbar.Link href="/about">About</Navbar.Link>
        <Navbar.Link href="/contact">Contact</Navbar.Link>
      </Navbar.Collapse>
   
      </Navbar>
  )
}
