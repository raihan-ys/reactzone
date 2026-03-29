import {useState, useEffect, useRef} from 'react';

// The amount of columns and rows of the board
const cols = 50;
const rows = 50;

// Snake initialization: 3 segments in the middle of the board, moving right
// Ex: [HEAD, BODY, BODY, ...]
const initialSnake = [
  // Starting position
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

// Generate random food position that doesn't collide with the snake
function randomFood(snake) {
  while (true) {
    // Food Position (use random for random food generation)
    const pos = 
      {
        x: Math.floor(Math.random() * cols), 
        y: Math.floor(Math.random() * rows)
      };
    // Check collision with snake
    // The some() method of Array instances returns true if it finds an element in the array that satisfies the provided testing function. Otherwise, it returns false
    // Cek apakah posisi food yang dihasilkan bertabrakan dengan snake.
    const collision = snake.some(s => s.x === pos.x && s.y === pos.y);
    if (!collision) return pos;
  }
}

// Ini jantung Reactnya
export default function Snake() {
  const [snake, setSnake] = useState(initialSnake);

  // The snake start moving to right (end)
  /*
    x = move horizontally
    y = move vertically
  */
  const [dir, setDir] = useState(
    { x: 1, 
      y: 0 
    }
  ); // Set snake's direction
  const [food, setFood] = useState(() => randomFood(initialSnake)); // Set food position
  const [running, setRunning] = useState(false); // Move the snake
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  
  // useRef is a React hook that allows you to create a mutable reference that persists across re-renders. It can be used to store a value that does not trigger a re-render when it changes, such as the current direction of the snake or whether the game is running. 
  // In this code, dirRef and runningRef are created to hold the current values of dir and running, respectively, and they are updated whenever dir or running changes using useEffect hooks. This allows the game logic to access the latest values of dir and running without causing unnecessary re-renders.
  const dirRef = useRef(dir);
  const runningRef = useRef(running);

  useEffect(() => 
    { 
      // Change the property of dirRef
      dirRef.current = dir; 
    },
    [dir]
  );
  useEffect(() => 
    { runningRef.current = running; }, 
    [running]
  );

  // Input keyboard untuk mengubah arah snake
  // Pakai useEffect untuk menambahkan event listener pada window untuk menangkap input keyboard. Ketika tombol panah atau WASD ditekan, fungsi handleKey akan memeriksa arah saat ini (dirRef.current) dan memperbarui arah jika perubahan tersebut valid (misalnya, tidak membalikkan arah secara langsung). Jika game sudah berakhir (gameOver), input keyboard akan diabaikan.
  useEffect(() => {

    function handleKey(e) {
      // Jika game sudah berakhir, abaikan input keyboard
      if (gameOver) return;

      const key = e.key;
      const curr = dirRef.current; // Dapatkan arah saat ini dari dirRef

      /*
        Petunjuk arah (x, y):
        - ArrowUp / W: (0, -1)
        - ArrowDown / S: (0, 1)
        - ArrowLeft / A: (-1, 0)
        - ArrowRight / D: (1, 0)
       */

      // Bila keyboard atas atau W
      if (key === 'ArrowUp' || key === 'w') {
        if (curr.y === 1) return;
        setDir({ x: 0, y: -1 });
      } 
      
      // Bila keyboard bawah atau S
      else if (key === 'ArrowDown' || key === 's') {
        if (curr.y === -1) return;
        setDir({ x: 0, y: 1 });
      } 
      
      // Bila keyboard kiri atau A
      else if (key === 'ArrowLeft' || key === 'a') {
        if (curr.x === 1) return;
        setDir({ x: -1, y: 0 });
      }
      
      // Bila keyboard kanan atau D
      else if (key === 'ArrowRight' || key === 'd') {
        if (curr.x === -1) return;
        setDir({ x: 1, y: 0 });
      }
    }

    // Tambahkan event listener untuk menangkap input keyboard
    window.addEventListener('keydown', handleKey);

    // Bersihkan event listener saat komponen unmount atau saat gameOver berubah
    return () => window.removeEventListener('keydown', handleKey);
  }, [gameOver]);

  // Pakai useEffect untuk mengatur logika permainan yang berjalan setiap interval tertentu (misalnya, setiap 100ms). Jika game sedang berjalan (running) dan belum berakhir (gameOver), fungsi tick akan dipanggil secara berkala untuk memperbarui posisi snake berdasarkan arah saat ini (dirRef.current). Fungsi tick juga akan memeriksa tabrakan dengan dinding atau tubuh snake, serta apakah snake memakan makanan. Jika terjadi tabrakan, game akan berakhir. Jika snake memakan makanan, posisi makanan akan diperbarui dan skor akan bertambah.
  useEffect(() => {
    // Jika game tidak berjalan atau sudah berakhir, jangan lakukan apa-apa
    if (!running || gameOver) return;

    // Cek setiap interval untuk memperbarui posisi snake
    const tick = () => {
      // prev adalah posisi snake saat ini, head adalah segmen pertama (kepala) dari snake, dan d adalah arah saat ini yang diambil dari dirRef.current. Posisi kepala baru dihitung dengan menambahkan perubahan arah (d.x dan d.y) ke posisi kepala saat ini (head.x dan head.y).
      setSnake(prev => {
        const head = prev[0];
        const d = dirRef.current;

        // Hitung posisi kepala baru berdasarkan arah saat ini
        const newHead = { 
          x: head.x + d.x, // posisi x baru = posisi x lama + perubahan arah x
          y: head.y + d.y // posisi y baru = posisi y lama + perubahan arah y
        };

        // wall collision
        if (newHead.x < 0 || newHead.x >= cols || newHead.y < 0 || newHead.y >= rows) {
          setGameOver(true);
          setRunning(false);
          return prev;
        }

        // self collision
        // The some() method tests whether at least one element in the array passes the test implemented by the provided function. It returns a Boolean value. Dalam hal ini, fungsi yang diberikan memeriksa apakah ada segmen snake (s) yang memiliki koordinat x dan y yang sama dengan newHead. Jika ada, itu berarti snake telah menabrak dirinya sendiri, sehingga game berakhir.
        if (prev.some(s => s.x === newHead.x && s.y === newHead.y)) {
          setGameOver(true);
          setRunning(false);
          return prev;
        }

        // Cek apakah snake memakan food
        const ateFood = newHead.x === food.x && newHead.y === food.y;

        // Tambahkan kepala baru di awal snake
        const newSnake = [newHead, ...prev];

        // Jika tidak memakan food, hapus bagian akhir snake
        if (!ateFood) {
          newSnake.pop();
        } else {
          setFood(randomFood(newSnake));
          setScore(s => s + 1);
        }

        return newSnake;
      });
    };

    const interval = setInterval(tick, 100);
    return () => clearInterval(interval);
  }, [running, gameOver, food]);

  function handleStart() {
    if (gameOver) {
      // reset
      setSnake(initialSnake);
      setDir({ x: 1, y: 0 });
      setFood(randomFood(initialSnake));
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
    setSnake(initialSnake);
    setDir({ x: 1, y: 0 });
    setFood(randomFood(initialSnake));
    setScore(0);
  }

  return (
    <div id="snake">
      <div className="game-area" style={{ position: 'relative' }}>
        {snake.map((seg, i) => (
          <div
            key={i}
            className={`snake ${i === 0 ? 'head' : ''}`}
            style={{
              position: 'absolute',
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
        />
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
