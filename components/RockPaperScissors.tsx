import {useState} from 'react';

export default function RockPaperScissors() {
    // Data game yang akan dipakai
    const [playerVal, setPlayerVal] = useState(null); // Pilihan player
    const [compVal, setCompVal] = useState(null); // Pilihan lawan
    const [playerScore, setPlayerScore] = useState(0); // Skor player
    const [compScore, setCompScore] = useState(0); // Skor lawan

    // Menentukan pemenang ronde
    let logic = (playerVal, compVal) => {
        if (playerVal == compVal) {
            return 0;
        }
        else if ((playerVal == "ROCK" && compVal == "SCISSORS") ||
            (playerVal == "PAPER" && compVal == "ROCK") ||
            (playerVal == "SCISSORS" && compVal == "PAPER")) {
            return 1;
        } else {
            return -1;
        }
    }

    let decision = (playerChoice) => {
        const choices = ["ROCK", "PAPER", "SCISSORS"]; // Daftar pilihan
        const compChoice = choices[Math.floor(Math.random() * choices.length)]; // Pilihan acak komputer
        const val = logic(playerChoice, compChoice);
        
        // Menambah skor player atau lawan sesuai hasil logic
        if (val == 1) {
            console.log("Hello")
            setPlayerVal(playerChoice);
            setCompVal(compChoice);
            setPlayerScore(playerScore + 1);
        }
        else if (val == -1) {
            console.log("Hello");
            setPlayerVal(playerChoice);
            setCompVal(compChoice);
            setCompScore(compScore + 1);
        } else { // Imbang
            console.log("Hello");
            setPlayerVal(playerChoice);
            setCompVal(compChoice);
        }
    }

    return (
        <div className="container">
            <h1>Welcome to Rock, Paper, Scissors Game</h1>
            <div >
                <button onClick={() => decision("ROCK")}>
                    <i className="fas fa-hand-rock" /> Rock
                </button>
                <button onClick={() => decision("PAPER")}>
                    <i className="fas fa-hand-paper" /> Paper
                </button>
                <button onClick={() => decision("SCISSORS")}>
                    <i className="fas fa-hand-scissors" />  Scissors 
                </button>
            </div>
            <div className="content">
                <p>Your choice: {playerVal}</p>
                <p>Computer's choice: {compVal}</p>
                <h2>Your Score:{playerScore}</h2>
                <h2>Computer Score: {compScore}</h2>
            </div>
        </div>
    );

}