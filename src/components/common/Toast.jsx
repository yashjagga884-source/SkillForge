import { Toaster } from 'react-hot-toast'

export function ToastContainer() {
  return (
    <Toaster
      position="top-right"
      reverseOrder={false}
      gutter={8}
      toastOptions={{
        duration: 4000,
        style: {
          background: '#0B3B70',
          color: '#fff',
          borderRadius: '8px',
          padding: '16px',
          fontFamily: 'Inter, sans-serif',
        },
        success: {
          style: {
            background: '#2877D8',
          },
        },
        error: {
          style: {
            background: '#4295F5',
          },
        },
      }}
    />
  )
}
