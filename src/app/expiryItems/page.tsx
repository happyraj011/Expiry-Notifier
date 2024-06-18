"use client"
import axios from 'axios'
import { Button, Modal, Table } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { HiOutlineExclamationCircle } from 'react-icons/hi'


interface Product{
  _id:"",
  productName:"",
  quantity:"",
  category:"",
  manufacturedDate:"",
  expiryDate:""
}

interface APIResponse{
  message:Product[]
}

export default function page() {
  
  
  const [products, setProducts] = useState<Product[]>([])
  const [productIdToDelete, setProductIdToDelete] = useState('')
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
     const fetchProducts=async()=>{
         try {
              const res=await axios.get<APIResponse>('/api/getProducts');
              console.log(res.data)
              setProducts(res.data.message);
         } catch (error:any) {
            console.log(error.message)
         }
     }
  
    return () => {
       fetchProducts()
    }
  }, [])



  

   const handleDeleteProducts=async()=>{
      setShowModal(false);
      try {
        const res=await axios.delete<APIResponse>(`/api/deleteProduct?_id=${productIdToDelete}`)
      
        setProducts((prev)=>
          prev.filter(message=>message._id !==productIdToDelete)
        )
      } catch (error:any) {
        console.log(error.message)
      }
   }



   const formData=(dateString:string)=>{
        const date=new Date(dateString);
        return date.toLocaleDateString('en-US',{
           year:"numeric",
           month:"short",
           day:"numeric"
        })


   }

   const calculateDaysUntilExpiry=(dateString:string)=>{
      const today=new Date();
      const expiry=new Date(dateString);
      const timeDifference=expiry.getTime()-today.getTime();
      const daysDifference=Math.ceil(timeDifference/ (1000 * 3600 * 24))
      return daysDifference;
   }

   

  return (
    <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
      { products.length > 0 ? (
        <>
          <Table hoverable className='shadow-md'>
            <Table.Head>
              <Table.HeadCell>Product Name</Table.HeadCell>
              <Table.HeadCell>Category</Table.HeadCell>
              <Table.HeadCell>Quantity</Table.HeadCell>
              <Table.HeadCell>Manufactured Date</Table.HeadCell>
              <Table.HeadCell>Expiry Date</Table.HeadCell>
              <Table.HeadCell>Days Until Expiry</Table.HeadCell>
              <Table.HeadCell>Delete</Table.HeadCell>
            </Table.Head>
            {products.map((product) => (
              <Table.Body className='divide-y'>
                <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                 
                  <Table.Cell className='font-medium text-gray-900 dark:text-white'>
                  {product.productName}
                  </Table.Cell>
                  <Table.Cell  className='font-medium text-gray-900 dark:text-white'>
                  {product.category}
                  </Table.Cell>
                  <Table.Cell className='font-medium text-gray-900 dark:text-white'>
                    {product.quantity}
                    </Table.Cell>
                    <Table.Cell className='font-medium text-gray-900 dark:text-white'>
                   {formData(product.manufacturedDate)}
                    </Table.Cell>
                    <Table.Cell className='font-medium text-gray-900 dark:text-white'>
                    {formData(product.expiryDate)}
                    </Table.Cell>
                    <Table.Cell className='font-medium text-gray-900 dark:text-white'>
                       { calculateDaysUntilExpiry(product.expiryDate)}
                    </Table.Cell>
                  <Table.Cell>
                    <span
                      onClick={() => {
                        setShowModal(true);
                        setProductIdToDelete(product._id)
                      }}
                      className='font-medium text-red-500 hover:underline cursor-pointer'
                    >
                      Delete
                    </span>
                  </Table.Cell>
                 
                </Table.Row>
              </Table.Body>
            ))}
          </Table>
          
        </>
      ) : (
        <p>You have no posts yet!</p>
      )}
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size='md'
      >
        <Modal.Header />
        <Modal.Body>
          <div className='text-center'>
            <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto' />
            <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>
              Are you sure you want to delete this post?
            </h3>
            <div className='flex justify-center gap-4'>
              <Button color='failure' onClick={handleDeleteProducts}>
                Yes, I'm sure
              </Button>
              <Button color='gray' onClick={() => setShowModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  )
}
