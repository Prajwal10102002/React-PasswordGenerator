import { useState, useCallback, useEffect , useRef} from 'react'
import './App.css'

function App() {

  const [length, setlength] = useState(8)
  const [numberAllowed, setnumberAllowed] = useState(false)
  const [charAllowed, setcharAllowed] = useState(false)
  const [Password, setPassword] = useState("")
  const passwordRef = useRef(null)

  const passwordgenerator = useCallback(() => {
    let password = ""
    let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"

    if (numberAllowed) {
      str += "0123456789"
      console.log(str)
    }
    if (charAllowed) {
      str += "!@#$%^&*()_+"
      console.log(str)
    }

    for (let i = 1; i <= length; i++) {
      let temp = Math.floor(Math.random() * str.length + 1)
      password += str.charAt(temp)
    }
    setPassword(password)


  }, [length, numberAllowed, charAllowed, setPassword])

  useEffect(() => {passwordgenerator()},[length, numberAllowed, charAllowed, passwordgenerator])

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 50);
    window.navigator.clipboard.writeText(Password)
  }, [Password])

  return (
    <>
      <div className='container'>

        <h1>Password Generator</h1>
        <div className='heading'>
          <input type="text" value={Password} placeholder='password' readOnly />
          <button onClick={copyPasswordToClipboard}>COPY</button>
        </div> 

        <div className='details'>

          <div className='length'>
            <input className='scroll' type="range" min={8} max={50} value={length} onChange={(e) => { setlength(e.target.value) }} />
            <label >Length:</label>
            <input className='number' type="number"min={8} max={50} value={length} onChange={(e) => { setlength(e.target.value) }}/>
           
          </div>

          <div className='checkbox'>
            <input type="checkbox" 
            defaultChecked={numberAllowed}
            onChange={()=> {
              setnumberAllowed((prev) => !prev);
            }} />

            <label >Number</label>

            <input type="checkbox" 
            defaultChecked={charAllowed}
            onChange={()=> {
              setcharAllowed((prev) => !prev);
            }} />

            <label >Character</label>
          </div>
        </div>
      </div>

    </>
  )
}

export default App
