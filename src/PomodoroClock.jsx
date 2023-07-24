import { useState, useRef, useEffect } from "react";

const PomodoroClock = () => {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [timerLabel, setTimerLabel] = useState("Session");
  const [timeLeft, setTimeLeft] = useState(sessionLength * 60);
  const [running, setRunning] = useState(false);
  const audioRef = useRef(null);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (time % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  const handleReset = () => {
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    setBreakLength(5);
    setSessionLength(25);
    setTimerLabel("Session");
    setTimeLeft(25 * 60);
    setRunning(false);
  };

  const handleBreakDecrement = () => {
    if (breakLength > 1 && !running) {
      setBreakLength(breakLength - 1);
    }
  };

  const handleBreakIncrement = () => {
    if (breakLength < 60 && !running) {
      setBreakLength(breakLength + 1);
    }
  };

  const handleSessionDecrement = () => {
    if (sessionLength > 1 && !running) {
      setSessionLength(sessionLength - 1);
      setTimeLeft((sessionLength - 1) * 60);
    }
  };

  const handleSessionIncrement = () => {
    if (sessionLength < 60 && !running) {
      setSessionLength(sessionLength + 1);
      setTimeLeft((sessionLength + 1) * 60);
    }
  };

  const handleStartStop = () => {
    setRunning(!running);
  };

  useEffect(() => {
    if (running) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 0) {
            audioRef.current.play();
            if (timerLabel === "Session") {
              setTimerLabel("Break");
              setTimeLeft(breakLength * 60);
            } else {
              setTimerLabel("Session");
              setTimeLeft(sessionLength * 60);
            }
          }
          return prevTime > 0 ? prevTime - 1 : 0;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [running, breakLength, sessionLength, timerLabel]);

  return (
    <div id="pomodoro-clock">
      <div id="break-label">Break Length</div>
      <div id="session-label">Session Length</div>
      <div className="time-adjustment">
        <div id="break-decrement" onClick={handleBreakDecrement}>
          <i className="fas fa-arrow-down"></i>
        </div>
        <div id="break-length">{breakLength}</div>
        <div id="break-increment" onClick={handleBreakIncrement}>
          <i className="fas fa-arrow-up"></i>
        </div>
      </div>
      <div className="time-adjustment">
        <div id="session-decrement" onClick={handleSessionDecrement}>
          <i className="fas fa-arrow-down"></i>
        </div>
        <div id="session-length">{sessionLength}</div>
        <div id="session-increment" onClick={handleSessionIncrement}>
          <i className="fas fa-arrow-up"></i>
        </div>
      </div>
      <div id="timer-label">{timerLabel}</div>
      <div id="time-left">{formatTime(timeLeft)}</div>
      <div id="start_stop" onClick={handleStartStop}>
        <i className={running ? "fas fa-pause" : "fas fa-play"}></i>
      </div>
      <div id="reset" onClick={handleReset}>
        <i className="fas fa-sync"></i>
      </div>
      <audio id="beep" ref={audioRef} src="path/to/audio/beep.mp3" />
    </div>
  );
};

export default PomodoroClock;
