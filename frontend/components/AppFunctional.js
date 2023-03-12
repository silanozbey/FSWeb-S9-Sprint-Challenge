import axios from 'axios';
import React, {useState} from 'react'


export default function AppFunctional(props) {

  const initialState = [2,2]
  const [konum, setKonum] = useState(initialState);
  const [hamleSayisi, setHamleSayisi] = useState(0);
  const [errMessage, setErrMessage] = useState("");
  const [email, setEmail] = useState("");
  const konumAsIndex = (konum[1] -1) * 4 + konum[0] -1;


  function sagaGit() {
    if(konum[0]<4){
      setKonum([konum[0]+1, konum[1]]);
    setHamleSayisi(hamleSayisi+1)
    }else{
      setErrMessage("Sağa Gidemezsiniz")
    }
  }

  function solaGit() {
    if(konum[0]>1){
      setKonum([konum[0]-1, konum[1]]);
      setHamleSayisi(hamleSayisi+1)
    }else{
      setErrMessage("Sola Gidemezsiniz")
    }
  }

  function asagiGit() {
    if(konum[1]<4){
      setKonum([konum[0], konum[1]+1]) ;
      setHamleSayisi(hamleSayisi+1)
    }else{
      setErrMessage("Aşağı Gidemezsiniz")
    }
  }

  function yukariGit() {
    if(konum[1]>1){
      setKonum([konum[0], konum[1]-1]) ;
      setHamleSayisi(hamleSayisi+1)
    }else{
      setErrMessage("Yukarı Gidemezsiniz")
    }
  }

  function reset() {
      setKonum(initialState) ;
      setHamleSayisi(0);
  }

  const handleEmail = (event) => {
    setEmail(event.target.value)
  };

  const handleSubmit = (event) => {

    event.preventDefault();

    const result = {
      x : konum[0],
      y : konum[1],
      steps : hamleSayisi,
      email : email
    };

    axios
      .post("http://localhost:9000/api/result", result)
      .then((res) => {
        console.log(res.data);
        reset();
      })
      .catch(() => {
        console.log("Unprocessable Entity");
      })
  }

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">Koordinatlar {konum[0]},{konum[1]} </h3>
        <h3 id="steps">{hamleSayisi} kere ilerlediniz</h3>
      </div>
      <div id="grid">
        {
          [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map(idx => (
            <div key={idx} className={`square${idx === konumAsIndex ? ' active' : ''}`}>
             <span style={{fontSize : "20px", marginRight : "10px"}}></span> {idx === konumAsIndex ? 'Ş' : null}
            </div>
          ))
        }
      </div>
      {
        errMessage &&
        <div className="info">
          <h3 id="message">{errMessage}</h3>
        </div>
      }
      <div id="keypad">
        <button id="left" onClick={solaGit}>SOL</button>
        <button id="up" onClick={yukariGit}>YUKARI</button>
        <button id="right" onClick={sagaGit}>SAĞ</button>
        <button id="down" onClick={asagiGit}>AŞAĞI</button>
        <button id="reset" onClick={reset}>reset</button>
      </div>
      <form onSubmit={handleSubmit}>
        <input id="email"  type="email" onChange={handleEmail} placeholder="email girin"></input>
        <input id="submit" type="submit"></input>
      </form>
    </div>
  )
}
