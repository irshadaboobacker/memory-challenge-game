let elem = document.querySelector('#mem-game')
const mainContainer = document.querySelector(".main-container");
let btnReset = document.querySelector("#reset");
let btnRestart = document.querySelector("#startagain");
let startBtn = document.querySelector("#startButton");
let pointCounterFirst = document.querySelector('#movesCount');
var timeoutSpeed = document.getElementById("timeoutSpeed");
let time1 = document.querySelector("#time1")
let winTimeCounter = 0;
let selectedtime = 60;
var interval1;
// console.log(winTimeCounter);

const subContainer = document.querySelector("#sub-container");
var bestMoveslevelOne = JSON.parse(localStorage.getItem("bestmovesLevel1"));
// console.log("moves", bestMoveslevelOne)

let moveDiv = document.createElement("h3");
moveDiv.classList
if (bestMoveslevelOne == null) {
  moveDiv.textContent = "Least Moves Taken: " + 0;
} else {
  moveDiv.textContent = "Least Moves Taken: " + bestMoveslevelOne;
}
subContainer.before(moveDiv)

let newselectedLevel = [];
var timeCount1 = 0;
document.getElementById("game-container").style.display = "none";
document.getElementById("end-container").style.display = "none";
document.getElementById("failed-container").style.display = "none";
var firstPlayerPoints = 0;
pointCounterFirst.innerHTML = firstPlayerPoints;

// Movescounter
function PointCounter() {
  firstPlayerPoints += 1;
  pointCounterFirst.innerHTML = firstPlayerPoints;
}
const colors = ['#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6',
  '#E6B333', '#3366E6', '#999966']

// double the number of colorboxes
const colorPicklist = [...colors, ...colors];
const boxCount = colorPicklist.length;

//game-status
let revealedCount = 0;
let activeBox = null;
let awaitingEndmove = false;

// reset function
function reset() {
  location.reload()
}
// exit function
function exit() {
  location.reload()
}
// game function
function buildBox(color) {
  const element = document.createElement("div");
  element.classList.add("box-container");
  element.setAttribute("data-color", color);
  element.setAttribute("data-revealed", "false");

  element.addEventListener("click", (e) => {
    const revealed = element.getAttribute("data-revealed");
    if (timeCount1 == 60) {
      e.preventDefault();
      return;
    }
    if (timeCount1 == 0) {
      e.preventDefault();
      return;
    }
    if (awaitingEndmove || revealed == "true" || element === activeBox) {
      return;
    }
    element.style.backgroundColor = color;
    if (!activeBox) {
      activeBox = element

      return;
    }
    const matchColor = activeBox.getAttribute("data-color");

    if (matchColor != color) {
      PointCounter();
    }
    if (matchColor === color) {
      activeBox.setAttribute("data-revealed", "true");
      element.setAttribute("data-revealed", "true");
      activeBox = null;
      awaitingEndmove = false;
      revealedCount += 2;
      // pointCounterfunction();
      PointCounter();
      if (revealedCount === 16) {

        winTimeCounter = selectedtime - time1.innerHTML;
        console.log("time taken", winTimeCounter);

        document.getElementById("sub-container").style.visibility = "hidden"
        document.getElementById("game-container").style.display = "none";
        document.getElementById("end-container").style.display = "block";

        document.getElementById("time-taken").innerHTML = "Time taken: " + winTimeCounter;
        document.getElementById("total-moves").innerHTML = "Total moves: " + firstPlayerPoints;
        if (firstPlayerPoints < bestMoveslevelOne || bestMoveslevelOne == null) {
          localStorage.setItem("bestmovesLevel1", JSON.stringify(firstPlayerPoints));
          document.getElementById("won-container").innerHTML = "Congratulations! <br>You have won the game with least moves!";
        } else {
          document.getElementById("won-container").innerHTML = "You have won the game!";
        }
        btnReset.innerHTML = "Play Again?";
        // console.log(timeCount1);
        timeCount1 = 10;
        // console.log(timeCount1);

      }
      return;
    }
    awaitingEndmove = true;

    setTimeout(() => {
      element.style.backgroundColor = null;
      activeBox.style.backgroundColor = null;

      awaitingEndmove = false;
      activeBox = null;
    }, 1000);
  });
  return element;
}




// timer function
startBtn.addEventListener("click", (e) => {
  document.getElementById("screen-container").style.display = "none";
  document.getElementById("game-container").style.display = "block";
  document.getElementById("startContainer").style.visibility = "hidden"
  selectSpeed()

  selectedtime = timeCount1;
  // console.log(selectedtime);
  interval1 = setInterval(timer1, 1000)
  // startBtn.style.display = "hidden";
});



function selectSpeed() {
  var selectedLevel = timeoutSpeed.options[timeoutSpeed.selectedIndex].text;
  if (selectedLevel == "Beginner") {
    timeCount1 = 60
  }
  else if (selectedLevel == "Intermediate") {
    timeCount1 = 40
  }
  else if (selectedLevel == "Hard") {
    timeCount1 = 20
  }
}

function timer1() {
  timeCount1--
  time1.innerHTML = timeCount1

  if (timeCount1 <= 0) {
    document.getElementById("sub-container").style.visibility = "hidden"
    document.getElementById("screen-container").style.display = "none";
    document.getElementById("game-container").style.display = "none";
    document.getElementById("end-container").style.display = "none";
    document.getElementById("failed-container").style.display = "block";
    document.getElementById("total-moves").innerHTML = "Total moves: " + firstPlayerPoints;
    document.getElementById("timeout-container").innerHTML = "Time Out!";
    btnRestart.innerHTML = "Play Again?";
    clearInterval(interval1)
    timeCount1 = 0

  }
  if (winTimeCounter != 0) {
    timeCount1++;
    // console.log(timeCount1);
    return;
  }

}


//random picking Build boxes
for (let i = 0; i < boxCount; i++) {
  const randomIndex = Math.floor(Math.random() * colorPicklist.length);
  const color = colorPicklist[randomIndex];
  const box = buildBox(color);
  colorPicklist.splice(randomIndex, 1);
  mainContainer.appendChild(box);
}


function openFullscreen() {

  document.getElementById("fullscreenbtn").style.display = "none"
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) { /* Safari */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { /* IE11 */
    elem.msRequestFullscreen();
  }
}





















