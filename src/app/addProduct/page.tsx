"use client"
import { Alert, Button, Checkbox, Label, Spinner, TextInput } from 'flowbite-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

export default function page() {

  const router=useRouter();
  const [formData, setFormData] = React.useState({
    productName:"",
    quantity:"",
    category:"",
    manufacturedDate:"",
    expiryDate:""

  })
  const [errorMessage, setErrorMessage] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  
  const handleChange=(e:any)=>{
    setFormData({...formData,[e.target.id]:e.target.value.trim()});

}

const handleSubmit=async(e:any)=>{
  e.preventDefault();
  if( !formData.productName  ||  !formData.quantity   ||  !formData.category   ||              !formData.manufacturedDate  ||  !formData.expiryDate){
    return setErrorMessage('All field are required to fill')
  }

  try {
    setLoading(true);
    setErrorMessage('');
    const res=await fetch('/api/addProduct',{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify(formData),
    });
    const data=await res.json();

    if(data.success===false){
      return setErrorMessage(data.message);
    }
   

    setLoading(false);
    if(res.ok){
       router.push('/')
    }

  } catch (error:any) {
    setErrorMessage(error.message);
    setLoading(false)
  }
}





  return (
    
    <div>
        
    <div className='min-h-screen mt-20'>
  <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5' >
    {/* left */}
  <div className='flex-1'>
  <Link href="/" className=' font-bold dark:text-white text-4xl' >
    <span className='px-2 py-1 bg-gradient-to-r   from-indigo-500  via-purple-500 to-pink-500 rounded-lg text-white '>Expiry</span>
    Notifier
    </Link>
    <p className='text-sm mt-5'>
          Add Your Product
    </p>


  </div>
   {/* right */}

   <div className='flex-1'>
    <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
    
      <div>
        <Label value='Product Name'/>
        <TextInput type='text'  id='productName' onChange={handleChange}/>
      </div>


      <div>
        <Label value='Quantity'/>
        <TextInput type='Number'  id='quantity' onChange={handleChange}/>
      </div>


      <div>
        <Label value='Category'/>
        <TextInput type='text'  id='category' onChange={handleChange}/>
      </div>


      <div>
        <Label value='Manufactured Date'/>
        <TextInput type='Date'  id='manufacturedDate' onChange={handleChange}/>
      </div>


      <div>
        <Label value='Expiry Date'/>
        <TextInput type='Date'  id='expiryDate' onChange={handleChange}/>
      </div>
     




      <Button className='px-2 py-1 bg-gradient-to-r   from-indigo-500  via-purple-500 to-pink-500 rounded-lg text-white '
       type='submit' disabled={loading}>
     {
      loading ? (
        <>
        <Spinner size='sm'/>
        <span className='pl-3'>Loading...</span>
        </>
      ): 'Submit'
     }
      </Button>
   


    </form>
  
    {
      errorMessage && (
        <Alert className='mt-5' color='failure'>
          {errorMessage}

        </Alert>
      )   }



   </div>
  </div>
 
</div>
</div>
    


   
  )
}
