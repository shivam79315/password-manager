import { useState } from 'react'
import AppRoutes from './routes'

export default function App() {
  const [name, setName] = useState("")

  return (  
    <>
      <div className="w-full flex justify-center items-center h-screen">
        < AppRoutes />
      </div>
    </>
  )
}
