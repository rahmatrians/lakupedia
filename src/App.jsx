import { useContext, useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import NewComponent from './NewComponent'
import toast, { Toaster } from 'react-hot-toast';
import Input from './components/Input'
import logoBjb from './assets/logo-bjb.png'
import { Link } from 'react-router'
import { AuthContext } from './context/AuthContext'


function App() {
  const authContext = useContext(AuthContext)
  const [count, setCount] = useState(0)
  const [name, setName] = useState({
    firstName: "",
    lastName: "",
    age: 0
  })

  console.log("test : " + authContext);


  useEffect(() => {
  }, [count])


  return (
    <>
      <Toaster
        toastOptions={{
          className: '',
          style: {
            padding: '16px',
            color: 'white',
            background: 'orange',
          },
        }}
      />

      <center><h1>Lakupedia</h1></center>

      <div className='card'>


      </div>
    </>
  )
}

export default App
