import {useState, useEffect, useRef} from 'react';

// The amount of columns and rows of the board (the more the amount, the slower the snake)
const cols = 40;
const rows = 40;

// Snake initialization: 3 segments (Ex: [head, body, body, ...]) in the middle of the board, moving right first
const initialSnake = [
  { 
    x: Math.floor(cols / 2),
    y: Math.floor(rows / 2)
  },
  { 
    x: Math.floor(cols / 2) - 1,
    y: Math.floor(rows / 2)
  },
  { 
    x: Math.floor(cols / 2) - 2,
    y: Math.floor(rows / 2)
  },
];

// Generate food
function randomFood(snake) {
  while (true) {
    // Random position
    const pos = { 
      x: Math.floor(Math.random() * cols), 
      y: Math.floor(Math.random() * rows) 
    };

    // Don't let food generated on the board's border
    if (pos.x === 0 || pos.x === cols - 1 || pos.y === 0 || pos.y === rows - 1) {
      continue;
    }

    // Check if snake collide with food. If not, then return the position
    const collision = snake.some(
      s => s.x === pos.x && 
      s.y === pos.y
    );
    if (!collision) return pos;
  }
}

// Generate grasses
function randomGrasses(count) {
  const positions = [];

  // Random positions
  while (positions.length < count) {
    const pos = { 
      x: Math.floor(Math.random() * cols), 
      y: Math.floor(Math.random() * rows) 
    };

    // Don't let grass generated on the board's border
    if (pos.x <= 1 || pos.x >= cols - 2 || pos.y <= 1 || pos.y >= rows - 2) {
      continue;
    }

    positions.push(pos);
  }
  return positions;
}

export default function Snake() {
  const [snake, setSnake] = useState(initialSnake);

  /**
   * Set the start direction of the snake (right)
   * x = move horizontally
   * y = move vertically
   */
  const [dir, setDir] = useState(
    { 
      x: 1, 
      y: 0 
    }
  );
  
  const [food, setFood] = useState(randomFood(initialSnake)); // Set food position
  const [grasses, setGrasses] = useState(() => randomGrasses(13)); // Set grasses positions
  const [running, setRunning] = useState(false); // Move the snake
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  
  /**
   * useRef is a React hook that allows you to create a mutable reference that persists across re-renders. 
   * It can be used to store a value that does not trigger a re-render when it changes, such as the current direction of the snake or whether the game is running. 
   * In this code, dirRef and runningRef are created to hold the current values of dir and running, respectively, and they are updated whenever dir or running changes using useEffect hooks. 
   * This allows the game logic to access the latest values of dir and running without causing unnecessary re-renders.
   */
  const dirRef = useRef(dir);
  const runningRef = useRef(running);

  useEffect(() => { 
    // Change the 'current' property of dirRef
    dirRef.current = dir; 
  },
  [dir]);

  useEffect(() => { 
    // Change the 'current' property of dirRef
    runningRef.current = running; 
  }, 
  [running]);

  /**
   * Get keyboard input to change snake's direction
   * Use useEffect to add event listener to window to catch keyboard input.
   * Ignore keyboard input if game over.
   */
  useEffect(() => {

    function handleKey(e) {
      // Stop process if game is over.
      if (gameOver) return;

      const key = e.key;
      const curr = dirRef.current; // Get current direction

      /**
       * Movement (x, y):
       * Arrow up / W: (0, -1)
       * Arrow down / S: (0, 1)
       * Arrow left / A: (-1, 0)
       * Arrow right / D: (1, 0)
       * 
       * Check current direction (dirRef.current) and update it if the direction change is valid (e.g., not change directly to the opposite direction)
       */
      if (key === 'ArrowUp' || key === 'w') {
        if (curr.y === 1) return;
        setDir({ 
          x: 0, 
          y: -1 
        });
      } 
      else if (key === 'ArrowDown' || key === 's') {
        if (curr.y === -1) return;
        setDir({ 
          x: 0, 
          y: 1 
        });
      } 
      else if (key === 'ArrowLeft' || key === 'a') {
        if (curr.x === 1) return;
        setDir({ 
          x: -1, 
          y: 0 
        });
      }
      else if (key === 'ArrowRight' || key === 'd') {
        if (curr.x === -1) return;
        setDir({ 
          x: 1, 
          y: 0 
        });
      }
    }

    // Add event listner to catch keyboard input
    window.addEventListener('keydown', handleKey);

    // Clean event listener on component unmount or gameOver change
    return () => window.removeEventListener('keydown', handleKey);
  }, 
  [gameOver]);

  // Use useEffect to set up the game logic that runs at regular intervals (e.g., every 100ms)
  useEffect(() => {
    // Check if snake is not running yet or game over
    if (!running || gameOver) return;

    // Check each interval (100ms) to move the snake
    const tick = () => {
      /**
       * prev is the current position of the snake
       * d is the current direction
       */
      setSnake(prev => {
        const head = prev[0];
        const d = dirRef.current;

        // Count new head position
        const newHead = { 
          x: head.x + d.x, // new x = current x + updated x
          y: head.y + d.y // new y = current y + updated y
        };

        // Wall collision
        if (newHead.x === 0 || newHead.x === cols || newHead.y === 0 || newHead.y === rows) {
          setGameOver(true);
          setRunning(false);
          return prev;
        }

        // Self collision
        if (prev.some(s => s.x === newHead.x && s.y === newHead.y)) {
          setGameOver(true);
          setRunning(false);
          return prev;
        }

        // Does the snake ate a food? Add a new segment first
        const ateFood = newHead.x === food.x && newHead.y === food.y;
        const newSnake = [newHead, ...prev];

        // If the snake didn't eat food, remove the tail segment to keep the snake the same length. Else generate new food and update the score.
        if (!ateFood) {
          newSnake.pop();
        } else {
          setFood(randomFood(newSnake, grasses));
          setScore(s => s + 1); // ERROR: Score add 2 instead of 1 when ate food.
        }

        return newSnake;
      });
    };

    const interval = setInterval(tick, 100);
    return () => clearInterval(interval);
  }, [running, gameOver, food]);

  // Fungsi handleStart akan dipanggil ketika tombol "Start" ditekan. Jika game sudah berakhir (gameOver), fungsi ini akan mereset permainan dengan mengembalikan posisi snake ke posisi awal, mengatur arah ke kanan, menghasilkan makanan baru, mengatur skor ke 0, dan memulai permainan. Jika game belum berakhir, fungsi ini hanya akan memulai permainan dengan mengatur running ke true.
  function handleStart() {
    if (gameOver) {
      // reset
      setSnake(initialSnake);
      setDir({ x: 1, y: 0 });
      const nf = randomFood(initialSnake);
      setFood(nf);
      setGrasses(randomGrasses(13));
      setScore(0);
      setGameOver(false);
      setRunning(true);
    } else {
      setRunning(true);
    }
  }

  function handlePause() {
    setRunning(false);
  }

  function handleReset() {
    setRunning(false);
    setGameOver(false);
    setSnake(initialSnake)          
    setScore(s => s + 1); // Tambah skor
    setFood(randomFood(initialSnake));
    setScore(0);
  }

  return (
    <div id="snake">
      <div className="game-area" style={{ position: 'relative' }}>
        {snake.map(
          (seg, i) => (
          <div
            key={i}
            className={`snake ${i === 0 ? 'head' : ''} ${i === snake.length - 1 ? 'tail' : ''}`}
            style={{
              position: 'absolute',
              // Posisi segmen snake dihitung berdasarkan koordinat x dan y dari segmen tersebut, yang kemudian diubah menjadi persentase untuk penempatan di dalam area permainan. Transformasi translate(-50%, -50%) digunakan untuk memastikan bahwa segmen snake diposisikan dengan tepat di tengah titik koordinatnya.
              left: `${(seg.x / cols) * 100}%`,
              top: `${(seg.y / rows) * 100}%`,
              transform: 'translate(-50%, -50%)',
            }}
          >
            {i === 0 && (
              <>
                <div className="eye left" />
                <div className="eye right" />
              </>
            )}
          </div>
        ))}

        <img
          src="src/assets/food.png"
          className="food"
          style={{
            position: 'absolute',
            left: `${(food.x / cols) * 100}%`,
            top: `${(food.y / rows) * 100}%`,
            transform: 'translate(-50%, -50%)',
          }}
          alt="food"
        />

        {grasses.map((g, i) => (
          <img
            key={i}
            src="src/assets/grass.png"
            className="grass"
            style={{
              position: 'absolute',
              left: `${(g.x / cols) * 100}%`,
              top: `${(g.y / rows) * 100}%`,
              transform: 'translate(-50%, -50%)',
              height: '80px',
              width: '80px',
            }}
            alt={`grass-${i}`}
          />
        ))}
      </div>

      <div style={{ marginTop: 12 }} className="game-controls">
        <div>Score: {score}</div>
        <div style={{ marginTop: 8 }}>
          {!running && !gameOver && (
            <button className="btn btn-sm btn-primary me-2" onClick={handleStart}>Start</button>
          )}
          {running && (
            <button className="btn btn-sm btn-warning me-2" onClick={handlePause}>Pause</button>
          )}
          <button className="btn btn-sm btn-secondary me-2" onClick={handleReset}>Reset</button>
        </div>
        {gameOver && <div style={{ marginTop: 8, color: 'red' }}>Game Over</div>}
      </div>
    </div>
  );
}
