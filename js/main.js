let tankId = "tank" + Math.floor(Math.random() * 100000);
document.querySelector(".body").setAttribute("tankid", tankId);

let speed = 35;
let gunSpeed = 2600;

// Tableau contenant le nombre de répétitions automatique possibles d'une action
const TabRepeatTime = [4, 5, 6, 7, 8, 9];

const redEnnemie = `<img src="images/redennemi.svg" alt="">`;
const yellowEnnemie = `<img src="images/yellowennemi.svg" alt="">`;

let enemies = 10;
if (window.innerWidth < 1000) {
  enemies = 6; // On enlève des ennemis pour les petits écrans
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

let temp_tankID = "#" + $("body").attr("tankid");
fn_init_tank();

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
  let offset = $(elt).offset();
  let width = $(elt).width();
  let height = $(elt).height();

  let centerX = offset.left + width / 2 - 5;
  let centerY = offset.top + height / 2 - 5;

  let target_bullet = "bul" + Math.floor(Math.random() * 100000);

  let bullet = document.createElement("div");
  console.log("elt", elt);
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

  play_audio("stop");

  play_audio("play");

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
};

function vibreAction() {
  if ("vibrate" in navigator) {
    navigator.vibrate([1]);
  }
}

const ArrowLeft = (elt) => {
  let rotate = document.querySelector(elt).style.transform;

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
};

const ArrowUp = (elt) => {
  let rotate = document.querySelector(elt).style.transform;

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
};

const ArrowRight = (elt) => {
  let rotate = document.querySelector(elt).style.transform;

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
};

const ArrowDown = (elt) => {
  let rotate = document.querySelector(elt).style.transform;

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

let keys = {}; // You could also use an array
onkeydown = onkeyup = (e) => {
  e = e || event; // to deal with IE
  keys[e.code] = e.type == "keydown";
  let elt = "#" + $("body").attr("tankid");

  if (
    keys["ArrowLeft"] ||
    keys["ArrowUp"] ||
    keys["ArrowRight"] ||
    keys["ArrowDown"]
  ) {
    switch (e.code) {
      case "ArrowLeft":
        ArrowLeft(elt);
        showArrow("#ArrowLeft");
        break;
      case "ArrowUp":
        ArrowUp(elt);
        showArrow("#ArrowUp");
        break;
      case "ArrowRight":
        ArrowRight(elt);
        showArrow("#ArrowRight");
        break;
      case "ArrowDown":
        ArrowDown(elt);
        showArrow("#ArrowDown");
        break;
      case "Numpad1":
        shoot(elt);

        break;
    }
  } else if (
    (keys["ArrowLeft"] ||
      keys["ArrowUp"] ||
      keys["ArrowRight"] ||
      keys["ArrowDown"]) &&
    keys["Numpad1"]
  ) {
    switch (e.code) {
      case "ArrowLeft":
        ArrowLeft(elt);
        shoot(elt);

        break;
      case "ArrowUp":
        ArrowUp(elt);
        shoot(elt);

        break;
      case "ArrowRight":
        ArrowRight(elt);
        shoot(elt);

        break;
      case "ArrowDown":
        ArrowDown(elt);
        shoot(elt);

        break;
    }
  }
  if (keys["Numpad1"] && e.code == "Numpad1") {
    // console.log("Key : ", e.code);
    shoot(elt);
    showArrow("#fire");
    // console.log("Tirer tirer -------->");
  }
};

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

generateEnnemie();

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
        console.log(
          `la balle ${bulletElement.getAttribute("type")} a touché ${
            tankElement.classList
          }`
        );

        const test = `la balle ${bulletElement.getAttribute("type")} a touché ${
          tankElement.classList
        }`;

        switch (test) {
          case "la balle ennemie a touché tank":
            tankElement.remove();
            copyEnemiesNumber--;

            break;
          case "la balle actor a touché tank ennemie":
            tankElement.remove();
            break;

          default:
            break;
        }

        // Votre code à exécuter lorsque les éléments se chevauchent
      }
    });
  });

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
          shoot(elt);
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

// Appeler la fonction pour animer aléatoirement les éléments
animateElementsRandomly();

setTimeout(() => {
  setInterval(() => {
    animateElementsRandomly();
  }, 2000);
}, 5000);

requestAnimationFrame(onOverlap);

setInterval(() => {
  if (document.querySelectorAll(".ennemie").length == 0) {
    copyEnemiesNumber = enemies;
    generateEnnemie();
  }
}, 3000);
