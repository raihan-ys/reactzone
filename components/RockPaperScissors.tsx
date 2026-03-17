import {useState} from 'react';

export default function RockPaperScissors() {
    // Data game yang akan dipakai
    const [playerVal, setPlayerVal] = useState<string | null>(null); // Pilihan player
    const [compVal, setCompVal] = useState<string | null>(null); // Pilihan lawan
    const [playerScore, setPlayerScore] = useState(0); // Skor player
    const [compScore, setCompScore] = useState(0); // Skor lawan

    // Menentukan pemenang ronde
    const logic = (playerVal: string | null, compVal: string | null) => {
        // Imbang
        if (playerVal == compVal) {
            return 0;
        }
        // Pemain menang
        else if ((playerVal == "ROCK" && compVal == "SCISSORS") ||
            (playerVal == "PAPER" && compVal == "ROCK") ||
            (playerVal == "SCISSORS" && compVal == "PAPER")) {
            return 1;
        } 
        // Lawan menang
        else {
            return -1;
        }
    }

    const decision = (playerChoice: string) => {
        const choices = ["ROCK", "PAPER", "SCISSORS"]; // Daftar pilihan
        const compChoice = choices[Math.floor(Math.random() * choices.length)]; // Pilihan acak komputer
        const val = logic(playerChoice, compChoice); // Mendapatkan pemenang setiap ronde
        
        // Menambah skor player atau lawan sesuai siapa yang menang
        // Menambah skor pemain
        if (val == 1) { 
            console.log("Hello")
            setPlayerVal(playerChoice);
            setCompVal(compChoice);
            setPlayerScore(playerScore + 1);
        }
        // Menambah skor lawan
        else if (val == -1) {
            console.log("Hello");
            setPlayerVal(playerChoice);
            setCompVal(compChoice);
            setCompScore(compScore + 1);
        }
        // Imbang
        else {
            console.log("Hello");
            setPlayerVal(playerChoice);
            setCompVal(compChoice);
        }
    }

    return (
        <div className="container text-center">
            <h1 className="text-primary">Welcome to Rock, Paper, Scissors Game!</h1>
            <div className="d-flex flex-row justify-content-center gap-3 mb-4">
                <button className="btn btn-primary" onClick={() => decision("ROCK")}>
                    <i className="fas fa-hand-rock" /> Rock
                </button>
                <button className="btn btn-primary" onClick={() => decision("PAPER")}>
                    <i className="fas fa-hand-paper" /> Paper
                </button>
                <button className="btn btn-primary" onClick={() => decision("SCISSORS")}>
                    <i className="fas fa-hand-scissors" />  Scissors 
                </button>
            </div>
            <div className="content">
                <p className="fw-bold text-success">Your choice: {playerVal}</p>
                <p className="fw-bold text-danger">Computer's choice: {compVal}</p>
                <h2 className="fw-bold">Your Score: {playerScore}</h2>
                <h2 className="fw-bold">Computer Score: {compScore}</h2>
            </div>
        </div>
    );

}