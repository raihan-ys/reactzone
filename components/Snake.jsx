import {useState, useEffect, useRef} from 'react';

const cols = 50;
const rows = 50;

// Snake initialization: 3 segments in the middle of the board, moving right
const initialSnake = [
  { x: Math.floor(cols / 2), y: Math.floor(rows / 2) },
  { x: Math.floor(cols / 2) - 1, y: Math.floor(rows / 2) },
  { x: Math.floor(cols / 2) - 2, y: Math.floor(rows / 2) },
];

// Generate random food position that doesn't collide with the snake
function randomFood(snake) {
  while (true) {
    const pos = { x: Math.floor(Math.random() * cols), y: Math.floor(Math.random() * rows) };
    const collision = snake.some(s => s.x === pos.x && s.y === pos.y);
    if (!collision) return pos;
  }
}

export default function Snake() {
  const [snake, setSnake] = useState(initialSnake);
  const [dir, setDir] = useState({ x: 1, y: 0 });
  const [food, setFood] = useState(() => randomFood(initialSnake));
  const [running, setRunning] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const dirRef = useRef(dir);
  const runningRef = useRef(running);

  useEffect(() => { dirRef.current = dir; }, [dir]);
  useEffect(() => { runningRef.current = running; }, [running]);

  useEffect(() => {
    function handleKey(e) {
      if (gameOver) return;
      const key = e.key;
      const curr = dirRef.current;
      if (key === 'ArrowUp' || key === 'w') {
        if (curr.y === 1) return; // prevent reverse
        setDir({ x: 0, y: -1 });
      } else if (key === 'ArrowDown' || key === 's') {
        if (curr.y === -1) return;
        setDir({ x: 0, y: 1 });
      } else if (key === 'ArrowLeft' || key === 'a') {
        if (curr.x === 1) return;
        setDir({ x: -1, y: 0 });
      } else if (key === 'ArrowRight' || key === 'd') {
        if (curr.x === -1) return;
        setDir({ x: 1, y: 0 });
      }
    }

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [gameOver]);

  useEffect(() => {
    if (!running || gameOver) return;
    const tick = () => {
      setSnake(prev => {
        const head = prev[0];
        const d = dirRef.current;
        const newHead = { x: head.x + d.x, y: head.y + d.y };

        // wall collision
        if (newHead.x < 0 || newHead.x >= cols || newHead.y < 0 || newHead.y >= rows) {
          setGameOver(true);
          setRunning(false);
          return prev;
        }

        // self collision
        if (prev.some(s => s.x === newHead.x && s.y === newHead.y)) {
          setGameOver(true);
          setRunning(false);
          return prev;
        }

        const ateFood = newHead.x === food.x && newHead.y === food.y;
        const newSnake = [newHead, ...prev];
        if (!ateFood) newSnake.pop();
        else {
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
            className="snake"
            style={{
              position: 'absolute',
              left: `${(seg.x / cols) * 100}%`,
              top: `${(seg.y / rows) * 100}%`,
              transform: 'translate(-50%, -50%)',
            }}
          />
        ))}

        <div
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
