import { Winner_Combos } from "../constants"

export const checkWinnerFrom = (boardToCheck)=>{
    //revisamos todas las combinaciones ganadoras para ver si gano X u O 
    for (const combo of Winner_Combos){
      const [a,b,c] = combo

    if(boardToCheck[a] && boardToCheck[a] === boardToCheck[b] && boardToCheck[a] === boardToCheck[c]){
        return boardToCheck[a]
      }
    }
  }
  export const checkEndGame = (newBoard)=>{
    return newBoard.every((square)=> square !== null)
  }