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
          background: '#1E293B',
          color: '#fff',
          borderRadius: '8px',
          padding: '16px',
          fontFamily: 'Inter, sans-serif',
        },
        success: {
          style: {
            background: '#10B981',
          },
        },
        error: {
          style: {
            background: '#EF4444',
          },
        },
      }}
    />
  )
}
