let tankId = "tank" + Math.floor(Math.random() * 100000);
document.querySelector(".body").setAttribute("tankid", tankId);

let speed = 6;
let actorClone = "";
let actorSpeed = 6;
let ennemieSpeed = 40;
let gunSpeed = 2600;
let actorGunSpeed = 2000;
let ennemieGunSpeed = 4700;
let score = 0;

let isMute = false;

var rightPressed = false;
var leftPressed = false;
var upPressed = false;
var downPressed = false;
var shootPressed = false;

var x = window.innerWidth / 2;
var y = window.innerHeight - 30;
var angle = 0;

// Tableau contenant le nombre de répétitions automatique possibles d'une action
const TabRepeatTime = [4, 5, 6, 7, 8, 9];

const redEnnemie = `<img src="images/redennemi.svg" alt="">`;
const yellowEnnemie = `<img src="images/yellowennemi.svg" alt="">`;

let enemies = 10;
if (window.innerWidth < 1000) {
  enemies = 6; // On enlève des ennemis pour les petits écrans
  actorSpeed = 50;
}

let copyEnemiesNumber = enemies;

enemiesSPEED = "1000";
let ennemies_tank = `<img src="images/tank.svg" alt="">`;
let rotatedeg = [0, 90, -90, 180];

const animateTo = (elt, params) => {
  $(elt).css(params);
};

$("#fire").trigger("load");
// write methods for playing and stopping
function play_audio(task) {
  if (task == "play") {
    $("#fired").trigger("play");
  }
  if (task == "stop") {
    $("#fired").trigger("pause");
    $("#fired").prop("currentTime", 0);
  }
}
function play_audio2(task) {
  if (task == "play") {
    $("#shoot").trigger("play");
  }
  if (task == "stop") {
    $("#shoot").trigger("pause");
    $("#shoot").prop("currentTime", 0);
  }
}

function formatScore(score, length) {
  let scoreStr = score.toString();
  const zerosToAdd = Math.max(length - scoreStr.length, 0);
  const formattedScore = "0".repeat(zerosToAdd) + scoreStr;
  return formattedScore;
}

const fn_init_tank = (type = "actor") => {
  //tank id with #
  let tank = document.createElement("div");
  let randomID;
  if (type === "actor") {
    tank.setAttribute("id", $("body").attr("tankid"));
    tank.setAttribute("class", "tank");
    tank.innerHTML = `<img src="images/tank.svg" alt="">`;
  } else if (type === "ennemie") {
    randomID = "tank" + Math.floor(Math.random() * 100000);
    tank.setAttribute("id", randomID);
    tank.setAttribute("class", "tank ennemie");

    const randomNumber = Math.random();
    const result = randomNumber < 0.5 ? 0 : 1;
    if (result) {
      tank.innerHTML = redEnnemie;
    } else {
      tank.innerHTML = yellowEnnemie;
    }
  }

  document.querySelector(".body .gamer_verser").appendChild(tank);

  if (type === "actor") {
    console.log("actorClone", actorClone);
    actorClone = tank;
    let initTemp = makeNewPosition("#" + $("body").attr("tankid"));
    animateTo(
      "#" + $("body").attr("tankid"),
      {
        top: initTemp[0],
        left: initTemp[1],
        transform: `rotate(${initTemp[2]}deg)`,
      },
      300
    );
  } else if (type === "ennemie") {
    let initTemp = makeNewPosition("#" + randomID);
    animateTo(
      "#" + randomID,
      {
        top: initTemp[0],
        left: initTemp[1],
        transform: `rotate(${initTemp[2]}deg)`,
      },
      300
    );
  }
};

function swapSpeed(elt) {
  const tempElem = document.querySelector(elt);

  if (tempElem) {
    if (Array.from(tempElem.classList).includes("ennemie")) {
      speed = ennemieSpeed;
      gunSpeed = ennemieGunSpeed;
    } else {
      speed = actorSpeed;
      gunSpeed = actorGunSpeed;
    }
  }
}

function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

function makeNewPosition(elt) {
  // Get viewport dimensions (remove the dimension of the div)
  let h = window.innerHeight - $(elt).height();
  let w = window.innerWidth - $(elt).width();

  let nh = Math.floor(Math.random() * h);
  let nw = Math.floor(Math.random() * w);
  let angle = shuffle(rotatedeg)[0];

  return [nh, nw, angle];
}

const initTank = (tankID, position) => {
  //tank id with #
  let tank = document.createElement("div");
  tank.setAttribute("id", tankID);
  tank.setAttribute("class", "tank");
  tank.innerHTML = `<img src="images/tank.svg" alt="">`;
  document.querySelector(".body .gamer_verser").appendChild(tank);

  animateTo(
    tankID,
    {
      top: position.y,
      left: position.x,
      transform: `rotate(${position.angle}deg)`,
    },
    300
  );
};

const shoot = async (elt) => {
  swapSpeed(elt);
  let tempElem = document.querySelector(elt);
  if (tempElem) {
    let offset = $(elt).offset();
    let width = $(elt).width();
    let height = $(elt).height();

    let centerX = offset.left + width / 2 - 5;
    let centerY = offset.top + height / 2 - 5;

    let target_bullet = "bul" + Math.floor(Math.random() * 100000);

    let bullet = document.createElement("div");

    bullet.setAttribute("id", target_bullet);
    bullet.setAttribute("class", `bullet`);
    bullet.setAttribute("for", `${elt}`);
    bullet.setAttribute(
      "type",
      `${
        Array.from(document.querySelector(elt).classList).includes("ennemie")
          ? "ennemie"
          : "actor"
      }`
    );
    bullet.setAttribute(
      "style",
      `left:${centerX}px;top:${centerY}px; display:block;`
    );

    if (Array.from(document.querySelector(elt).classList).includes("ennemie")) {
      play_audio2("stop");

      play_audio2("play");
    } else {
      play_audio("stop");

      play_audio("play");
    }

    // await playShoot();

    document.querySelector(".body .gamer_verser").appendChild(bullet);

    let rotate = document.querySelector(elt).style.transform;

    setTimeout(() => {
      $("#" + target_bullet).remove();
    }, 2000);

    switch (rotate) {
      case "rotate(-90deg)":
        $("#" + target_bullet).animate(
          {
            left: "-200%",
          },
          {
            duration: gunSpeed,
            easing: "linear",
          }
        );

        break;

      case "rotate(0deg)":
        $("#" + target_bullet).animate(
          {
            top: "-200%",
          },
          {
            duration: gunSpeed,
            easing: "linear",
          }
        );

        break;
      case "rotate(90deg)":
        $("#" + target_bullet).animate(
          {
            left: "200%",
          },
          {
            duration: gunSpeed,
            easing: "linear",
          }
        );

        break;
      case "rotate(180deg)":
        $("#" + target_bullet).animate(
          {
            top: "200%",
          },
          {
            duration: gunSpeed,
            easing: "linear",
          }
        );

        break;

      default:
        break;
    }
  }
};

function vibreAction() {
  if ("vibrate" in navigator) {
    navigator.vibrate([1]);
  }
}

const ArrowLeft = (elt) => {
  const tempElem = document.querySelector(elt);

  if (tempElem) {
    let rotate = document.querySelector(elt).style.transform;
    swapSpeed(elt);
    if (rotate != "rotate(-90deg)") {
      $(elt).css("transform", "rotate(-90deg)");
    } else {
      let tempPos = 0;
      let w = window.innerWidth - $(elt).width();

      let position = $(elt).position();
      tempPos = position.left - speed;

      if (tempPos <= 0) {
        let params = {
          left: 0,
        };
        animateTo(elt, params);
      } else if (tempPos >= w) {
        let params = {
          left: w,
        };
        animateTo(elt, params);
      } else {
        let params = {
          left: tempPos,
        };
        animateTo(elt, params);
      }
    }
  }
};

const ArrowUp = (elt) => {
  const tempElem = document.querySelector(elt);

  if (tempElem) {
    let rotate = document.querySelector(elt).style.transform;
    swapSpeed(elt);
    if (rotate != "rotate(0deg)") {
      $(elt).css("transform", "rotate(0deg)");
    } else {
      let tempPos = 0;
      let h = window.innerHeight - $(elt).height();

      let position = $(elt).position();
      tempPos = position.top - speed;
      if (tempPos <= 0) {
        $(elt).css("top", 0 + "px");
      } else if (tempPos >= h) {
        $(elt).css("top", h + "px");
      } else {
        $(elt).css("top", tempPos + "px");
      }
    }
  }
};

const ArrowRight = (elt) => {
  const tempElem = document.querySelector(elt);

  if (tempElem) {
    let rotate = document.querySelector(elt).style.transform;

    swapSpeed(elt);

    if (rotate != "rotate(90deg)") {
      $(elt).css("transform", "rotate(90deg)");
    } else {
      let tempPos = 0;
      let w = window.innerWidth - $(elt).width();

      let position = $(elt).position();
      tempPos = position.left + speed;
      if (tempPos <= 0) {
        $(elt).css("left", 0 + "px");
      } else if (tempPos >= w) {
        $(elt).css("left", w + "px");
      } else {
        $(elt).css("left", tempPos + "px");
      }
    }
  }
};

function isElement(elt) {
  const tempElem = document.querySelector(elt);

  if (tempElem) {
    return true;
  } else {
    return false;
  }
}

const ArrowDown = (elt) => {
  if (isElement(elt)) {
    let rotate = document.querySelector(elt).style.transform;
    swapSpeed(elt);
    if (rotate != "rotate(180deg)") {
      $(elt).css("transform", "rotate(180deg)");
    } else {
      let tempPos = 0;
      let h = window.innerHeight - $(elt).height();

      let position = $(elt).position();
      tempPos = position.top + speed;
      if (tempPos <= 0) {
        $(elt).css("top", 0 + "px");
      } else if (tempPos >= h) {
        $(elt).css("top", h + "px");
      } else {
        $(elt).css("top", tempPos + "px");
      }
    }
  }
};

$("#ArrowLeft").on("mousedown", (e) => {
  let elt = "#" + $("body").attr("tankid");

  vibreAction();
  ArrowLeft(elt);
});

$("#ArrowRight").on("mousedown", () => {
  let elt = "#" + $("body").attr("tankid");
  vibreAction();
  ArrowRight(elt);
});
$("#ArrowUp").on("mousedown", () => {
  let elt = "#" + $("body").attr("tankid");
  vibreAction();
  ArrowUp(elt);
});
$("#ArrowDown").on("mousedown", () => {
  let elt = "#" + $("body").attr("tankid");
  vibreAction();
  ArrowDown(elt);
});

$("#fire").on("mousedown", () => {
  let elt = "#" + $("body").attr("tankid");
  vibreAction();
  shoot(elt);
});

const showArrow = (elt) => {
  $(elt).addClass("active");

  setTimeout(() => {
    $(elt).removeClass("active");
  }, 100);
};

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
// document.addEventListener("mousemove", mouseMoveHandler, false);
// document.addEventListener("mousedown", mouseDownHandler, false);
// document.addEventListener("mouseup", mouseUpHandler, false);

function keyDownHandler(event) {
  if (event.keyCode == 39) {
    rightPressed = true;
  } else if (event.keyCode == 37) {
    leftPressed = true;
  } else if (event.keyCode == 38) {
    upPressed = true;
  } else if (event.keyCode == 40) {
    downPressed = true;
  } else if (event.code === "Numpad1") {
    shootPressed = true;
  }
}

function keyUpHandler(event) {
  if (event.keyCode == 39) {
    rightPressed = false;
  } else if (event.keyCode == 37) {
    leftPressed = false;
  } else if (event.keyCode == 38) {
    upPressed = false;
  } else if (event.keyCode == 40) {
    downPressed = false;
  } else if (event.code === "Numpad1") {
    shootPressed = false;
  }
}

function mouseMoveHandler(event) {
  var rect = document
    .getElementById(document.querySelector("body").getAttribute("tankid"))
    .getBoundingClientRect();
  var mouseX = event.clientX - rect.left;
  var mouseY = event.clientY - rect.top;

  angle = Math.atan2(mouseY - y, mouseX - x);

  document.getElementById(
    document.querySelector("body").getAttribute("tankid")
  ).style.transform = `rotate(${angle}deg)`;
}

function mouseDownHandler(event) {
  shootPressed = true;
}

function mouseUpHandler(event) {
  shootPressed = false;
}

function actorShoot() {
  let elt = "#" + $("body").attr("tankid");
  if (shootPressed) {
    shoot(elt);
    showArrow("#fire");
  }
}

function actorMoveShoot() {
  let elt = "#" + $("body").attr("tankid");

  if (rightPressed) {
    ArrowRight(elt);
    showArrow("#ArrowRight");
  } else if (leftPressed) {
    ArrowLeft(elt);
    showArrow("#ArrowLeft");
  } else if (upPressed) {
    ArrowUp(elt);
    showArrow("#ArrowUp");
  } else if (downPressed) {
    ArrowDown(elt);
    showArrow("#ArrowDown");
  }
  actorShoot();
  requestAnimationFrame(actorMoveShoot);
}

function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function waitTime(fn, ...args) {
  setTimeout(function () {
    fn(...args); // Appel de la fonction avec les arguments
  }, 500);
}

function repeatAction(action, n, interval, ...args) {
  let count = 0;
  function execute() {
    if (count < n) {
      action(...args);
      count++;
      setTimeout(execute, interval);
    }
  }

  execute();
}

async function playShoot() {
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  const audioBufferSource = audioContext.createBufferSource();

  fetch("../sons/fire.mp3")
    .then((response) => response.arrayBuffer())
    .then((data) => audioContext.decodeAudioData(data))
    .then((buffer) => {
      audioBufferSource.buffer = buffer;
      audioBufferSource.connect(audioContext.destination);
      audioBufferSource.start();
    })
    .catch((error) => {
      console.error(
        "Erreur lors du chargement et de la lecture du son :",
        error
      );
    });
}

// Créez un tableau pour stocker les éléments
// const elementsToAnimate = [];

// Ajoutez les éléments à ce tableau
function generateEnnemie() {
  for (let i = 0; i < enemies; i++) {
    fn_init_tank("ennemie");
  }
}

// Fonction pour générer un nombre aléatoire entre 0 et la longueur du tableau
function getRandomIndex(arr) {
  return Math.floor(Math.random() * arr.length);
}

// Fonction pour vérifier si les éléments se chevauchent
function elementsOverlap(element1, element2) {
  return (
    element1.left < element2.right &&
    element1.right > element2.left &&
    element1.top < element2.bottom &&
    element1.bottom > element2.top
  );
}

// Fonction à exécuter lorsque les éléments se chevauchent
// Fonction à exécuter lorsque les éléments se chevauchent
function onOverlap() {
  const bulletElements = document.querySelectorAll(".bullet"); // Sélectionnez tous les éléments .bullet
  const tankElements = document.querySelectorAll(".tank"); // Sélectionnez tous les éléments .bullet

  bulletElements.forEach((bulletElement) => {
    tankElements.forEach((tankElement) => {
      if (
        elementsOverlap(
          tankElement.getBoundingClientRect(),
          bulletElement.getBoundingClientRect()
        )
      ) {
        // console.log(
        //   `la balle ${bulletElement.getAttribute("type")} a touché ${
        //     tankElement.classList
        //   }`
        // );

        const test = `la balle ${bulletElement.getAttribute("type")} a touché ${
          tankElement.classList
        }`;

        switch (test) {
          case "la balle ennemie a touché tank":
            tankElement.style.display = "none";

            document
              .getElementById("gameOver_interface")
              .classList.add("game_interface_active");

            const score_final = document.getElementById("score_final");
            let i = 0;

            function updateScore() {
              if (i <= score) {
                score_final.textContent = formatScore(i, 8);
                i++;
                setTimeout(updateScore, 30);
              }
            }

            updateScore();

            break;
          case "la balle actor a touché tank ennemie":
            tankElement.remove();
            copyEnemiesNumber--;

            score++;
            document.querySelector(".score span").textContent = formatScore(
              score,
              8
            );
            break;

          default:
            break;
        }

        // Votre code à exécuter lorsque les éléments se chevauchent
      }
    });
  });

  if (document.querySelectorAll(".ennemie").length == 0) {
    copyEnemiesNumber = enemies;
    generateEnnemie();
  }

  requestAnimationFrame(onOverlap);
}

// Fonction pour animer aléatoirement les éléments
function animateElementsRandomly() {
  let elementsToAnimate = document.querySelectorAll(".ennemie");
  elementsToAnimate.forEach((element) => {
    const randomDelay = Math.random() * 5000; // Délai aléatoire jusqu'à 5 secondes
    setTimeout(() => {
      const randomAction = Math.floor(Math.random() * 5); // Choix aléatoire d'une action
      const elt = "#" + element.getAttribute("id");

      const randomActionRepeat = TabRepeatTime[getRandomIndex(TabRepeatTime)];

      switch (randomAction) {
        case 0:
          // shoot(elt);
          repeatAction(shoot, randomActionRepeat, enemiesSPEED, elt);
          break;
        case 1:
          repeatAction(ArrowDown, randomActionRepeat, enemiesSPEED, elt);
          break;
        case 2:
          repeatAction(ArrowUp, randomActionRepeat, enemiesSPEED, elt);
          break;
        case 3:
          repeatAction(ArrowRight, randomActionRepeat, enemiesSPEED, elt);
          break;
        case 4:
          repeatAction(ArrowLeft, randomActionRepeat, enemiesSPEED, elt);
          break;
      }
    }, randomDelay);
  });
}

$("#restart").on("click", (e) => {
  score = 0;
  document.querySelector(".score span").textContent = "00000000";
  document
    .getElementById("gameOver_interface")
    .classList.remove("game_interface_active");

  const ennemies = document.querySelectorAll(".ennemie");
  ennemies.forEach((ennemie) => {
    ennemie.remove();
  });

  generateEnnemie();
  actorClone.getAttribute("id");
  document.getElementById(actorClone.getAttribute("id")).style.display =
    "block";
});

actorMoveShoot();

// Appeler la fonction pour animer aléatoirement les éléments
animateElementsRandomly();

setInterval(() => {
  animateElementsRandomly();
}, 2000);

requestAnimationFrame(onOverlap);
requestAnimationFrame(actorMoveShoot);

$("#start").on("click", (e) => {
  fn_init_tank();

  document
    .getElementById("start_interface")
    .classList.remove("game_interface_active");
});

function fn_share() {
  if (navigator.share) {
    navigator
      .share({
        title: "Tankverse",
        text: "Tankverse | Tank war - The Battle is now()",
        url: "https://flocod.github.io/tankverse",
      })
      .then(() => console.log("Partage réussi"))
      .catch((error) => {
        console.log("Erreur de partage", error);
        alert(error);
      });
  } else {
    console.log(`Votre système ne prend pas en charge l'API de partage Web.`);
    alert("Votre système ne prend pas en charge API de partage Web.");
  }
}

let shareBtns = document.querySelectorAll(".share_game");

shareBtns.forEach((shareBtn) => {
  shareBtn.addEventListener("click", function () {
    fn_share();
  });
});

// let muteBtn = document.getElementById("muteBtn");

// function swapSon(value) {
//   // Sélectionnez tous les éléments audio et vidéo sur la page
//   const mediaElements = document.querySelectorAll("audio, video");

//   mediaElements.forEach((mediaElement,index)=>{
//     mediaElement.muted = value;
//   });

//   isMute = !value;
//   console.log("isMute:", isMute);
// }

// muteBtn.addEventListener("click", () => {
//   if (isMute) {
//     swapSon(false);
//     muteBtn.classList.remove("son_btn_active");
//   } else{
//     swapSon(true);
//     muteBtn.classList.add("son_btn_active");
//   }
// });

let muteBtn = document.getElementById("muteBtn");
// let isMute = false; // Définissez une variable isMute pour suivre l'état du bouton mute

function swapSon(value) {
  // Sélectionnez tous les éléments audio et vidéo sur la page
  const mediaElements = document.querySelectorAll("audio, video");

  mediaElements.forEach((mediaElement) => {
    mediaElement.muted = value;
  });

  isMute = value;
  console.log("isMute:", isMute);
}

muteBtn.addEventListener("click", () => {
  if (isMute) {
    swapSon(false);
    muteBtn.classList.remove("son_btn_active");
  } else {
    swapSon(true);
    muteBtn.classList.add("son_btn_active");
  }
});

muteBtn.click();