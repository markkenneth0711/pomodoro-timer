import { useEffect, useState } from 'react';


type Mode = "pomodoro" | "shortBreak" | "longBreak";

function App() {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState<Mode>('pomodoro');

  useEffect(() => {
    if (!isActive) return; 

    const interval: ReturnType<typeof setInterval> =  setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      } else if (minutes > 0) {
        setMinutes(minutes - 1);
        setSeconds(59);
      } else {
        setIsActive(false);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive, minutes, seconds]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  }

  const resetTimer = () => {
    setIsActive(false);
    setSeconds(0);

    if (mode === 'pomodoro') {
      setMinutes(25);
    } else if (mode === 'shortBreak'){
      setMinutes(5);
    } else {
      setMinutes(10);
    }
  }

  const switchTimer = (newMode: Mode) => {
    setMode(newMode);
    setIsActive(false);
    setSeconds(0);

    if (newMode === 'pomodoro') {
      setMinutes(25);
    } else if (newMode === 'shortBreak'){
      setMinutes(5);
    } else {
      setMinutes(10);
    }
  }

  return (
    <div className="app">
      <div className="flex flex-col items-center justify-center h-screen">

        <div className="flex gap-4 m-4">
          <button className="flex items-center justify-center w-[80px] h-[35px] p-4 border text-xl 
                              border-white rounded-xl font-medium hover:bg-white hover:text-black hover:shadow-lg transition-all" 
            onClick={toggleTimer}>
            {isActive ? "Pause" : "Start"}
          </button>

          <button className="flex items-center justify-center w-[80px] h-[35px] p-4 border text-xl 
                              border-white rounded-xl font-medium hover:bg-white hover:text-black hover:shadow-lg transition-all"
            onClick={resetTimer}>
            Reset
          </button>
        </div>

        <h1 className="text-9xl font-bold m-8">
          {minutes}:{seconds.toString().padStart(2,"0")}
        </h1>

        <div className="flex gap-10">
          <button
            onClick={() => switchTimer("pomodoro")}
            className={`
              flex items-center justify-center w-[140px] h-[40px] p-4 border text-xl 
              rounded-xl font-medium transition-all
              ${mode === "pomodoro" 
                ? "bg-white text-black shadow-inner" 
                : "text-white border-white hover:bg-white hover:text-black hover:shadow-lg"
              }`}>
            Pomodoro
          </button>

          <button
            onClick={() => switchTimer("shortBreak")}
            className={`
              flex items-center justify-center w-[140px] h-[40px] p-4 border text-xl 
              rounded-xl font-medium transition-all
              ${mode === "shortBreak" 
                ? "bg-white text-black shadow-inner" 
                : "text-white border-white hover:bg-white hover:text-black hover:shadow-lg"
              }`}>
            Short Break
          </button>

          <button
            onClick={() => switchTimer("longBreak")}
            className={`
              flex items-center justify-center w-[140px] h-[40px] p-4 border text-xl 
              rounded-xl font-medium transition-all
              ${mode === "longBreak" 
                ? "bg-white text-black shadow-inner" 
                : "text-white border-white hover:bg-white hover:text-black hover:shadow-lg"
              }`}>
            Long Break
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;