"use client"
import axios from 'axios'
import { Button, Modal, Table } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { HiOutlineExclamationCircle } from 'react-icons/hi'

interface Product {
  _id: string,
  productName: string,
  quantity: string,
  category: string,
  manufacturedDate: string,
  expiryDate: string
}

interface APIResponse {
  message: Product[]
}

export default function Page() {
  const [products, setProducts] = useState<Product[]>([])
  const [productIdToDelete, setProductIdToDelete] = useState('')
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get<APIResponse>('/api/getProducts');
        setProducts(res.data.message);
      } catch (error: any) {
        console.log(error.message)
      }
    }
    fetchProducts()
  }, [])

  const handleDeleteProducts = async () => {
    setShowModal(false);
    try {
      const res = await axios.delete<APIResponse>(`/api/deleteProduct?_id=${productIdToDelete}`)
      setProducts((prev) =>
        prev.filter(message => message._id !== productIdToDelete)
      )
    } catch (error: any) {
      console.log(error.message)
    }
  }

  const formData = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: "numeric",
      month: "short",
      day: "numeric"
    })
  }

  const calculateDaysUntilExpiry = (dateString: string) => {
    const today = new Date();
    const expiry = new Date(dateString);
    const timeDifference = expiry.getTime() - today.getTime();
    const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24))
    return daysDifference <= 0 ? 0 : daysDifference;
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f0f9ff', padding: '2rem' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '1rem' }}>
        {products.length > 0 ? (
          <div style={{ backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', overflow: 'hidden', padding: '1.5rem' }}>
            <Table className="w-full" style={{ borderRadius: '12px', overflow: 'hidden', background: 'linear-gradient(90deg, #6a11cb 0%, #2575fc 100%)', color: 'white' }}>
              <Table.Head style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '16px', textTransform: 'uppercase' }}>
                <Table.HeadCell style={{ padding: '1rem' }}>Product Name</Table.HeadCell>
                <Table.HeadCell style={{ padding: '1rem' }}>Category</Table.HeadCell>
                <Table.HeadCell style={{ padding: '1rem' }}>Quantity</Table.HeadCell>
                <Table.HeadCell style={{ padding: '1rem' }}>Manufactured Date</Table.HeadCell>
                <Table.HeadCell style={{ padding: '1rem' }}>Expiry Date</Table.HeadCell>
                <Table.HeadCell style={{ padding: '1rem' }}>Days Until Expiry</Table.HeadCell>
                <Table.HeadCell style={{ padding: '1rem' }}>Delete</Table.HeadCell>
              </Table.Head>
              {products.map((product) => (
                <Table.Body key={product._id} style={{ background: 'rgba(255, 255, 255, 0.2)', transition: 'all 0.3s ease' }}>
                  <Table.Row style={{
                    borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
                    textAlign: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.3s',
                  }}
                    onMouseOver={(e) => {
                      (e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.3)');
                    }}
                    onMouseOut={(e) => {
                      (e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)');
                    }}
                  >
                    <Table.Cell style={{ padding: '0.8rem', fontWeight: '600' }}>{product.productName}</Table.Cell>
                    <Table.Cell style={{ padding: '0.8rem' }}>{product.category}</Table.Cell>
                    <Table.Cell style={{ padding: '0.8rem' }}>{product.quantity}</Table.Cell>
                    <Table.Cell style={{ padding: '0.8rem' }}>{formData(product.manufacturedDate)}</Table.Cell>
                    <Table.Cell style={{ padding: '0.8rem' }}>{formData(product.expiryDate)}</Table.Cell>
                    <Table.Cell style={{ padding: '0.8rem' }}>{calculateDaysUntilExpiry(product.expiryDate)}</Table.Cell>
                    <Table.Cell style={{ padding: '0.8rem', color: '#ff4d4d', fontWeight: 'bold' }}>
                      <span
                        onClick={() => {
                          setShowModal(true);
                          setProductIdToDelete(product._id);
                        }}
                      >
                        Delete
                      </span>
                    </Table.Cell>
                  </Table.Row>
                </Table.Body>
              ))}
            </Table>
          </div>
        ) : (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)',
            maxWidth: '600px',
            margin: '2rem auto',
            textAlign: 'center',
            animation: 'fadeIn 0.5s ease-in-out'
          }}>
            <h2 style={{
              fontSize: '1.6rem',
              fontWeight: '700',
              color: '#1f2937',
              marginBottom: '1rem'
            }}>
              No Products Found
            </h2>
            <p style={{
              fontSize: '1rem',
              color: '#6b7280',
              marginBottom: '1.5rem',
              lineHeight: '1.6'
            }}>
              There are currently no products in your inventory. Get started by adding a new product to your list.
            </p>
            <button
              style={{
                padding: '0.5rem 1rem',
                fontSize: '0.9rem',
                fontWeight: '600',
                backgroundColor: '#2563eb',
                color: '#ffffff',
                borderRadius: '6px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                border: 'none',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                display: 'inline-block'
              }}
              onMouseOver={(e:any) => e.currentTarget.style.backgroundColor = '#1e40af'}
              onMouseOut={(e:any) => e.currentTarget.style.backgroundColor = '#2563eb'}
              onClick={() => window.location.href = '/addProduct'}
            >
              Add Product
            </button>
          </div>
        )}

        <Modal
          show={showModal}
          onClose={() => setShowModal(false)}
          popup
          size='md'
        >
          <Modal.Header />
          <Modal.Body>
            <div style={{ textAlign: 'center' }}>
              <HiOutlineExclamationCircle style={{ height: '3.5rem', width: '3.5rem', color: 'gray', margin: '0 auto' }} />
              <h3 style={{ marginTop: '1rem', fontSize: '1.2rem', color: 'gray' }}>
                Are you sure you want to delete this product?
              </h3>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '1rem' }}>
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
    </div>
  )
}
