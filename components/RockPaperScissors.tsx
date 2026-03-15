import {useState} from 'react';

// Class component: component React yang berupa class (bukan function)
// Contoh: class RockPaperScissors extends {}
export default function RockPaperScissors() {
    // State atau data game yang akan dipakai
    const [playerVal, setPlayerVal] = useState(null); // Pilihan player
    const [compVal, setCompVal] = useState(null); // Pilihan lawan
    const [playerScore, setPlayerScore] = useState(0); // Skor player
    const [compScore, setCompScore] = useState(0); // Skor lawan

    // Menentukan pemenang ronde
    let logic = (playerVal, compVal) => {
        if (playerVal === compVal) {
            return 0;
        }
        else if ((playerVal == "ROCK" && compVal == "SCISSORS") ||
            (playerVal == "SCISSORS" && compVal == "PAPER") ||
            (playerVal == "PAPER" && compVal == "ROCK")) {
            return 1;
        } else {
            return -1;
        }
    }

    let decision = (playerChoice) => {
        const choices = ["ROCK", "PAPER", "SCISSORS"];

        const compChoice = choices[Math.floor(Math.random() * choices.length)];
        const val = logic(playerChoice, compChoice);
        if (val === 1) {
            console.log("Hello")
            setPlayerVal(playerChoice);
            setCompVal(compChoice);
            setPlayerScore(playerScore + 1);
        }
        else if (val === -1) {
            console.log("Hello");
            setPlayerVal(playerChoice);
            setCompVal(compChoice);
            setCompScore(compScore + 1);
        } else {
            console.log("Hello");
            setPlayerVal(playerChoice);
            setCompVal(compChoice);
        }
    }
}
