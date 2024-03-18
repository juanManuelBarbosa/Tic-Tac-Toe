import './App.css'
import { useState } from 'react'
import confetti from 'canvas-confetti'

const TURNS ={
  X: "x",
  O:'o'
}



const Square = ({children, isSelected , updateBoard, index}) =>{

  const className=`square ${isSelected? 'is-selected' : ""}`

  const handleClick = ()=>{
    updateBoard(index)
  }

    return(
      <div onClick={handleClick} className={className}> 
        {children}
      </div>
    )
}

  const Winner_Combos =[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
  ]



function App() {
  const [board, setBoard] = useState(Array(9).fill(null))

  const[turn, setTurn] = useState(TURNS.X)
  
  const [winner , setWinner] = useState(null) //null->ganador   false->empate 

  const checkWinner = (boardToCheck)=>{
    //revisamos todas las combinaciones ganadoras para ver si gano X u O 
    for (const combo of Winner_Combos){
      const [a,b,c] = combo

    if(boardToCheck[a] && boardToCheck[a] === boardToCheck[b] && boardToCheck[a] === boardToCheck[c]){
        return boardToCheck[a]
      }
    }
  }

  const checkEndGame = (newBoard)=>{
    return newBoard.every((square)=> square !== null)
  }

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
//revisar si hay ganador 
    const newWinner = checkWinner(newBoard)
    if(newWinner){
      setWinner(newWinner)
      confetti()
}else if(checkEndGame(newBoard) ){
  setWinner(false)
}
  
}

const handleButtonClick= ()=>{
  setBoard(Array(9).fill(null))
  setWinner(null)
  setTurn(TURNS.X)
}


  return (
    <>
      <main className='board'>
        <h1>Tic-Tac-React!</h1>
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
        <button onClick={handleButtonClick}>Resetear</button>
        <section>
          {
            winner !== null && (
              <section className="winner" >
                <div className='text'>
                  <h2>
                    {winner === false? 'Empate:' : 'Gano:'}
                  </h2>
                  <header className='win'>
                    {winner && <Square>{winner}</Square>}

                  </header>
                  <footer>
                    <button onClick={handleButtonClick}>Empezar denuevo</button>
                  </footer>
                </div>
                
              </section>

            )
          }
        </section>
      </main>
    
    </>
  )
}

export default App
