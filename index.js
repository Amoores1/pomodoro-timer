function App() {
const [breakTime, setBreakTime] = React.useState(5 * 60);
const [sessionTime, setSessionTime] = React.useState(25 * 60);
const [sessionDisplay, setSessionDisplay] = React.useState(25 * 60);
const [onBreak, setOnBreak] = React.useState(false);
const [intervalId, setIntervalId] = React.useState(null);
const audioElement = React.useRef(null);

React.useEffect (() => {
    setSessionDisplay(sessionTime);
}, [sessionTime]);
React.useEffect(()=>{
    if(sessionDisplay === 0) {
        audioElement.current.currentTime = 0;
        audioElement.current.play();
        if(!onBreak) {
            setOnBreak(true);
            setSessionDisplay(breakTime);
        } else if (onBreak) {
            setOnBreak(false);
            setSessionDisplay(sessionTime);
        }
    }
}, [sessionDisplay, onBreak, breakTime, sessionTime]);

const decrementBreakTime = (amount) => {
    setBreakTime(breakTime <= 60 ? breakTime : breakTime - 60);
};
const incrementBreakTime = (amount) => {
    setBreakTime(breakTime >= 60 * 60 ? breakTime : breakTime + 60);
};
const decrementSessionTime = (amount) => {
    setSessionTime(sessionTime <= 60 ? sessionTime : sessionTime - 60);
};
const incrementSessionTime = (amount) => {
    setSessionTime(sessionTime >= 60 * 60 ? sessionTime : sessionTime + 60)
};
const resetAll = () => {
    audioElement.current.pause();
    audioElement.current.currentTime = 0;
    clearInterval(intervalId);
    setIntervalId(null);
    setBreakTime(5 * 60);
    setSessionTime(25 * 60);
    setSessionDisplay(25 * 60);
    setOnBreak(false);
};

const controlTime = () => {
    if (intervalId === null) {
        const interval = setInterval(() => {
            setSessionDisplay((previousDisplayTime) => previousDisplayTime -1);
        }, 1000);
        setIntervalId(interval);
    } else {
        clearInterval(intervalId);
        setIntervalId(null);
    }
};
const formatTime = (time) => {
    let minutes = Math.floor(time/60);
    let seconds = time % 60;
    return (
        (minutes < 10 ? "0" + minutes : minutes) + 
        ":" +
        (seconds < 10 ? "0" + seconds : seconds)
    );
};
const convertToMinutesLength = (time) => {
    return time / 60;
  };
    return (
        <div id="app-container">
        <div id="title">
            <h1>A Pomodoro Timer</h1>
        </div>
        <div id="set-time-container">
            <div id="set-session-container">
                <h4 id="session-label">Session Length</h4>
                <button id="session-increment" class="fa fa-angle-up" onClick={incrementSessionTime}></button>
                <div id="session-length">{convertToMinutesLength(sessionTime)}</div>
                <button id="session-decrement" class="fa fa-angle-down"onClick={decrementSessionTime}></button>
            </div>
            <div id="set-break-container">
                <h4 id="break-label">Break Length</h4>
                <button id="break-increment"class="fa fa-angle-up" onClick={incrementBreakTime}></button>
                <div id="break-length">{convertToMinutesLength(breakTime)}</div>
                <button id="break-decrement"class="fa fa-angle-down"onClick={decrementBreakTime}></button>
            </div>
        </div>
            <div id="display-container">
                <div id="timer-label">{onBreak ? "Break" : "Session"}</div>
                <div id="time-left">{formatTime(sessionDisplay)}</div>
            </div>
            <div id="control-buttons-container">
                <button id="start_stop" class="fa fa-play" onClick={controlTime}></button>
                <button id="reset" class="fa fa-refresh" onClick={resetAll}></button>
            </div>
            <audio src="./endoftimeralarm.wav" id="beep" ref={audioElement}></audio>
    </div>
    );
}
ReactDOM.render(<App/>, document.getElementById("root"));