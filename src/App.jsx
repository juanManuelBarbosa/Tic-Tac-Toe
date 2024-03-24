import './App.css'
import { useState } from 'react'
import Square from './Square'
import { TURNS } from './constants.js'
import { checkWinnerFrom  , checkEndGame} from './logic/board.js'
import {WinnerModal} from './WinnerModal.jsx'
import confetti from 'canvas-confetti'


function App() {
  const [board, setBoard] = useState(Array(9).fill(null))

  const[turn, setTurn] = useState(TURNS.X)
  
  const [winner , setWinner] = useState(null) //null->ganador   false->empate 

  const[contadorX , setContadorX] = useState(0)
  const[contadorO , setContadorO] = useState(0)

  const updateBoard= (index)=>{

  //no actualizamos esta posicion si ya tiene algo 
  //actualizamos el tablero 
    if(board[index] || winner) return
    const newBoard= [...board]
    newBoard[index] = turn
    setBoard(newBoard)


//cambiar el turno 
    const newTurn = turn === TURNS.X? TURNS.O : TURNS.X
    setTurn(newTurn)


//guardar aqui partida
window.localStorage.setItem('board' , JSON.stringify(newBoard))
window.localStorage.setItem('board' , JSON.stringify(TURNS))

//revisar si hay ganador 

    const newWinner = checkWinnerFrom(newBoard)
    if(newWinner){
      setWinner(newWinner)
      matchpoint(newWinner)
      confetti()
}else if(checkEndGame(newBoard) ){
  setWinner(false)
}
  
}
//boton para reiniciar el tablero 
const resetGame = ()=>{
  setBoard(Array(9).fill(null))
  setWinner(null)
  setTurn(TURNS.X)
}


const matchpoint= (e)=>{
  e === "✘" ? setContadorX(contadorX+1) : setContadorO(contadorO+1)
}

  return (
    <>
      <main className='board'>
        <h1>Tic-Tac-React!</h1>
        
        <span className='points'>
          <h2>Puntaje: </h2>
          <h3>  {TURNS.X} = {contadorX}  </h3>
          <h3>  {TURNS.O} = {contadorO}  </h3>
        </span>
        <section className='game'>
              { 
                board.map((square ,index)=>{
                  return(
                    <Square 
                    key={index} 
                    index={index}
                    updateBoard={updateBoard}
                    
                    >

                        {square}
                    </Square>
                  )
                })
              }
        </section>

        <section className='turn'>

          <Square isSelected={turn === TURNS.X} >
           {TURNS.X}
            
          </Square>

          <Square isSelected={turn === TURNS.O}>
            {TURNS.O}
            
            
          </Square> 
        
          
        </section>
        <button onClick={resetGame}>Resetear</button>
        <section>
          
        <WinnerModal 
          winner={winner}
          resetGame={resetGame} 
          contadorX={contadorX}
          contadorO={contadorO}
          matchpoint={matchpoint}
          />

        </section>
      </main>
    
    </>
  )
}

export default App
