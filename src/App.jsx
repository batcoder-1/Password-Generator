import { useState,useCallback,useEffect,useRef } from 'react'
import './App.css'

function App() {
  const ref=useRef(null);
 const [len,setLen]=useState(4);
 const [charcaters,isChracter]=useState(false);
 const [numbers,isNumbers]=useState(false);
const [password,setPassword]=useState("gsdfgsdfgsfg");
const generator=useCallback(()=>{
let p="";
let s="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqurstuvwxyz";
if(numbers){
  s+="0123456789";
}
if(charcaters){
  s+="{}[]()~@!#$%^&*";
}
for (let i = 1; i <= len; i++) {
  let c=Math.floor(Math.random()*s.length+1);
  p+=s.at(c);
}
setPassword(p);
},[len,charcaters,numbers,setPassword]);
useEffect(()=>{generator()},[len,charcaters,numbers,generator]);
const copyPassword=useCallback(()=>{
  ref.current?.select();
  ref.current?.setSelectionRange(0,40);
  window.navigator.clipboard.writeText(password);
},[password])
  return (
    <>
      <div id="container">
  <div id="password">
    <input type="text" value={password}  id="passwordcontainer" readOnly ref={ref} />
    <button id="copy" onClick={copyPassword}>Copy</button>
  </div>
  <div id="options">
    <div class="option">
      <input type="range" min="4" max="20" id="length" value={len} onChange={(e)=>{setLen(e.target.value)}} />
      <label>Length:{len}</label>
    </div>
    <div class="option">
      <input type="checkbox" class="checkbox" defaultChecked={charcaters} onChange={()=>{isChracter(prev=>!prev)}}/>
      <label>Characters</label>
    </div>

    <div class="option">
      <input type="checkbox" class="checkbox" defaultChecked={numbers} onChange={()=>{isNumbers(prev=>!prev)}}/>
      <label>Numbers</label>
    </div>
  </div>
</div>


    </>
  )
}

export default App
