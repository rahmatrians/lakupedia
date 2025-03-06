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


  let a = 1
  const notify = (num) => toast('Here is your number : ' + num);

  useEffect(() => {
    if (count % 10 == 0) {
      notify(count)
    }
  }, [count])


  const showAlert = () => {
    toast('Wazzap, im ' + name.firstName + ' ' + name.lastName + '. n am ' + name.age + ' years old');
  }


  const greeting = (name) => {
    return `Hello ${name}`
  }



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

      <img src={logoBjb} />

      {/* <h1>Hello Word!!</h1>
      <h1>Bank BJB</h1>
      <NewComponent name={"azzmodeus"} lastName={"+"} />
      <NewComponent name={"rianzessh"} /> */}

      <div className='card'>
        {/* <h1>{count}</h1>

        <button onClick={() => setCount((value) => value - 1)}>
          -
        </button>

        <span> </span>
        <span> </span>

        <button onClick={() => setCount((value) => 0)}>
          reset
        </button>

        <span> </span>
        <span> </span>

        <button onClick={() => setCount((value) => value + 1)}>
          +
        </button>

        <br />
        <br />
        <br /> */}

        {/* <input type="text" placeholder='first name' onChange={(event) => {
          console.log(event.target.value)
          setName({
            ...name,
            firstName: event.target.value
          })
        }}
        />

        <span> </span>

        <input type="text" placeholder='last name' onChange={(event) => {
          console.log(event.target.value)
          setName({
            ...name,
            lastName: event.target.value
          })
        }}
        /> */}


        {/* <input type="number" placeholder='umur' onChange={(event) => {
          console.log(event.target.value)
          setAge(event.target.value)
        }}
        /> */}

        <Input
          value={name.firstName}
          onChange={(event) => setName({ ...name, firstName: event.target.value })}
          placeholder='First Name'
        />

        <span> </span>
        <span> </span>

        <Input
          value={name.lastName
          }
          onChange={(event) => setName({ ...name, lastName: event.target.value })}
          placeholder='Last Name'
        />

        <span> </span>
        <span> </span>

        <Input
          value={name.age}
          onChange={(event) => setName({ ...name, age: event.target.value })}
          placeholder='Age'
        />

        <br />
        <h3>{name.firstName + " " + name.lastName + " " + + name.age}</h3>
        <br />

        <button onClick={() => showAlert()}>OK</button>

        <br />
        <br />

        <button>
          <Link to={"/profile"}>Ke halaman Profile</Link>
        </button>


      </div>
    </>
  )
}

export default App
