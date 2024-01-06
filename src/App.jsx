import { useEffect, useState } from 'react'
import picture from './assets/picture.jpg'

function App() {

  const [password, setPassword] = useState('');
  const [strength, setStrength] = useState('');
  const [length, setLength] = useState(8);
  const [upperCase, setUpper] = useState(false);
  const [lowerCase, setLower] = useState(true);
  const [number, setNumber] = useState(false);
  const [symbol, setSymbol] = useState(false);
  const [tooltip, setTooltip] = useState('Copy');


  useEffect(() => {
    generatePassword();
    checkStrength();
  }, [strength, length, upperCase, lowerCase, number, symbol])


  function includeUpperCase(e) {
    setUpper(e.target.checked);
    // console.log(e.target.checked);
  }

  function includeLowerCase(e) {
    setLower(e.target.checked);
    // console.log(e.target.checked);
  }

  function includeNumber(e) {
    setNumber(e.target.checked);
    // console.log(e.target.checked);
  }

  function includeSymbol(e) {
    setSymbol(e.target.checked);
    // console.log(e.target.checked);
  }


  function generatePassword() {

    let pass = '';
    let str = '';

    if (upperCase) {
      str += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    }

    if (lowerCase) {
      str += 'abcdefghijklmnopqrstuvwxyz';
    }

    if (number) {
      str += '0123456789';
    }

    if (symbol) {
      str += '~!@#$%^&*()_+{}<>?/';
    }


    for (let i = 0; i < length; i++) {

      let randomNum = Math.floor(Math.random() * str.length);
      let char = str.charAt(randomNum);

      pass += char;
    }
    setPassword(pass);
  }


  function regeneratePassword() {
    generatePassword()
  }


  function checkStrength() {

    if (password.length < 5) {
      setStrength('Week')
      strengthStatus.style.backgroundColor = "#fecaca"
    }
    else if (password.length > 4 && password.length <= 6) {
      setStrength('Good')
      strengthStatus.style.backgroundColor = "#d5f2a5"
    }
    else if (password.length > 6 && password.length <= 8) {
      setStrength('Strong')
      strengthStatus.style.backgroundColor = "#bfd6ff"
    }
    else if (password.length > 8 && password.length <= 12) {
      setStrength('Very Strong')
      strengthStatus.style.backgroundColor = "#bfc3ff"
    }
    else {
      setStrength('Good')
      strengthStatus.style.backgroundColor = "#d5f2a5"
    }

  }


  function copyPassword() {
    navigator.clipboard.writeText(password);
    setTooltip('Copied!')
  }


  return (
    <>

      <div>

        <h1 className='mt-14 text-[50px] font-bold text-[#071d2b] '> Random Password Generator </h1>
        <p className='mt-3 mb-10 font-light text-[#111111] ' > Create strong and secure passwords to keep your account safe online. </p>


        <div className='flex items-center'>

          <div className='flex w-[45%] justify-center '>
            <img src={picture} alt="picture" width={500} />
          </div>

          <div className='w-[55%]'>

            <div className='flex justify-center items-center gap-5'>
              <div className='flex items-center justify-between w-[60%] py-3 px-5 border-2	border-[#e2e2e2] rounded-full shadow-[#0000002d] shadow-lg '>

                <p> {password} </p>

                <div className='flex gap-5'>
                  <p id='strengthStatus' className='py-1 px-3 text-[13px] rounded-md bg-red-200'> {strength} </p>
                  <button onClick={regeneratePassword}> <i className="text-[18px] font-light fa-solid fa-arrow-rotate-left"></i> </button>
                </div>

              </div>

              <div className='tooltip'>
                <button onClick={copyPassword} className='py-3 px-5 rounded-full border-2 text-white	border-[#0070f6] bg-[#0070f6] shadow-[#006ff663] shadow-lg	'> <span class="tooltiptext" id="tooltip"> {tooltip} </span> Copy </button>
              </div>

            </div>


            <div className='mt-10'>

              <div>
                <input type="range" id="length" onChange={(e) => setLength(e.target.value)} value={length} min={1} max={15} />
                <p className='mt-5'> Password Length: {length} </p>
              </div>

              <div className='mt-10 flex gap-5 justify-center '>

                <div className="checkbox-wrapper">
                  <input type="checkbox" id="UpperCase" onChange={includeUpperCase} />
                  <label htmlFor="UpperCase"> Upper Case </label>
                </div>

                <div className="checkbox-wrapper">
                  <input type="checkbox" id="LowerCase" onChange={includeLowerCase} />
                  <label htmlFor="LowerCase"> Lower Case </label>
                </div>

                <div className="checkbox-wrapper">
                  <input type="checkbox" id="symbol" onChange={includeSymbol} />
                  <label htmlFor="symbol"> Symbol </label>
                </div>

                <div className="checkbox-wrapper">
                  <input type="checkbox" id="number" onChange={includeNumber} />
                  <label htmlFor="number"> Number </label>
                </div>

              </div>

            </div>

          </div>


        </div >

      </div>

    </>
  )
}

export default App
