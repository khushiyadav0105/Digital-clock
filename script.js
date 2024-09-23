function startClock() {
    const clockElement = document.getElementById("clock");
    setInterval(() => {
        const now = new Date();
        let hours = String(now.getHours()).padStart(2, '0');
        let minutes = String(now.getMinutes()).padStart(2, '0');
        let seconds = String(now.getSeconds()).padStart(2, '0');
        clockElement.innerHTML = `${hours}:${minutes}:${seconds}`;
    }, 1000);
}

let timerInterval;
let totalSeconds = 0;
let isPaused = false;

function startTimer() {
    if (!isPaused) {
        const minutesInput = document.getElementById("minutesInput").value;
        totalSeconds = minutesInput * 60;
    }
    
    if (totalSeconds > 0) {
        document.getElementById("startBtn").disabled = true;
        document.getElementById("pauseBtn").disabled = false;
        
        timerInterval = setInterval(() => {
            if (!isPaused) {
                let minutes = Math.floor(totalSeconds / 60);
                let seconds = totalSeconds % 60;
                document.getElementById("timer").innerHTML = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

                if (totalSeconds <= 0) {
                    clearInterval(timerInterval);
                    alert("Time's up!");
                    document.getElementById("startBtn").disabled = false;
                    document.getElementById("pauseBtn").disabled = true;
                }
                totalSeconds--;
            }
        }, 1000);
    }
}


function pauseTimer() {
    isPaused = !isPaused; 
    document.getElementById("pauseBtn").innerHTML = isPaused ? "Resume Timer" : "Pause Timer";
}


function resetTimer() {
    clearInterval(timerInterval);
    document.getElementById("timer").innerHTML = "00:00";
    document.getElementById("startBtn").disabled = false;
    document.getElementById("pauseBtn").disabled = true;
    document.getElementById("pauseBtn").innerHTML = "Pause Timer";
    document.getElementById("minutesInput").value = "";
    isPaused = false;
    totalSeconds = 0;
}

document.getElementById("startBtn").addEventListener("click", startTimer);
document.getElementById("pauseBtn").addEventListener("click", pauseTimer);
document.getElementById("resetBtn").addEventListener("click", resetTimer);


startClock();
