import Square from "./Square";

export const WinnerModal = ({winner, resetGame })=>{

    if(winner === null) return null

    let winnerText 
    if(winner === false){
        winnerText = 'empate'
    }else{
        winnerText = 'Ganó'
    }
    return(
            <section className="winner" >
                <div className='text'>
                    <h2>{winnerText}</h2>

                    <header className='win'>
                        {winner && <Square>{winner}</Square>}
                    </header>
                    <footer>
                        <button onClick={resetGame}>Empezar denuevo</button>
                    </footer>
                </div>
            </section>
            ) 
}
