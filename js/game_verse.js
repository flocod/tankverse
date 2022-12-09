let speed = 35;
let gunSpeed = 1000;
var mouseDown = 0;
// $("#tank1").animate({left: '+=100', top: '+=100'}, 1000);
let rotatedeg = [0, 90, -90, 180];


document.body.onmousedown = function() {
  mouseDown ++;
 console.log("mouseDown",mouseDown);
}

document.body.onmouseup = function() {
if(mouseDown>0){
   mouseDown --;
  console.log("mouseDown",mouseDown);
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

const initTank = (tankID,position) => {
  //tank id with #
  let tank = document.createElement("div");
  tank.setAttribute("id", tankID);
  tank.setAttribute("class", "tank");
  tank.innerHTML = `<img src="images/tank.svg" alt="">`;
  document.querySelector(".body .gamer_verser").appendChild(tank);
  console.log("tank", tank);

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

const shoot = (elt) => {
  let offset = $(elt).offset();
  let width = $(elt).width();
  let height = $(elt).height();

  let centerX = offset.left + width / 2 - 5;
  let centerY = offset.top + height / 2 - 5;

  let target_bullet = "bul" + Math.floor(Math.random() * 100000);

  let bullet = document.createElement("div");

  bullet.setAttribute("id", target_bullet);
  bullet.setAttribute("class", "bullet");
  bullet.setAttribute(
    "style",
    `left:${centerX}px;top:${centerY}px; display:block;`
  );

  document.querySelector(".body .gamer_verser").appendChild(bullet);

  // console.log("bullet", bullet);

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
        gunSpeed
      );
      console.log("shoot to left");

      break;

    case "rotate(0deg)":
      $("#" + target_bullet).animate(
        {
          top: "-200%",
        },
        gunSpeed
      );
      console.log("shoot to top");

      break;
    case "rotate(90deg)":
      $("#" + target_bullet).animate(
        {
          left: "200%",
        },
        gunSpeed
      );
      console.log("shoot to right");

      break;
    case "rotate(180deg)":
      $("#" + target_bullet).animate(
        {
          top: "200%",
        },
        gunSpeed
      );
      console.log("shoot to bottom");

      break;

    default:
      break;
  }
};

const animateTo = (elt, params) => {
  $(elt).css(params);



};

const fn_init_tank = (temp_tankID) => {
  //tank id with #
  let tank = document.createElement("div");
  tank.setAttribute("id", $("body").attr("tankid"));
  tank.setAttribute("class", "tank");
  tank.innerHTML = `<img src="images/tank.svg" alt="">`;
  document.querySelector(".body .gamer_verser").appendChild(tank);
  console.log("tank", tank);
  let initTemp = makeNewPosition(temp_tankID);
  animateTo(
    temp_tankID,
    {
      top: initTemp[0],
      left: initTemp[1],
      transform: `rotate(${initTemp[2]}deg)`,
    },
    300
  );
};



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

$("#ArrowLeft").on("mousedown",(e)=>{
  let elt = "#" + $("body").attr("tankid");
  ArrowLeft(elt);
});



$("#ArrowRight").on("mousedown",()=>{
  let elt = "#" + $("body").attr("tankid");
  ArrowRight(elt);
});
$("#ArrowUp").on("mousedown",()=>{
  let elt = "#" + $("body").attr("tankid");
  ArrowUp(elt);
});
$("#ArrowDown").on("mousedown",()=>{
  let elt = "#" + $("body").attr("tankid");
  ArrowDown(elt);
});

const showArrow = (elt)=>{
  $(elt).addClass("active");
  
  setTimeout(()=>{
    $(elt).removeClass("active");
  },100);
}

let keys = {}; // You could also use an array
onkeydown = onkeyup = (e) => {
  e = e || event; // to deal with IE
  keys[e.code] = e.type == "keydown";
  let elt = "#" + $("body").attr("tankid");
  // console.log("keys", keys);
  if (
    keys["ArrowLeft"] ||
    keys["ArrowUp"] ||
    keys["ArrowRight"] ||
    keys["ArrowDown"]
  ) {
    // console.log("elt", elt);
    // console.log("Key : ", e.code);



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
        console.log("Tirer tirer -------->");
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



        console.log("Tirer tirer -------->");
        break;
      case "ArrowUp":
        ArrowUp(elt);
        shoot(elt);
        console.log("Tirer tirer -------->");
        break;
      case "ArrowRight":
        ArrowRight(elt);
        shoot(elt);
        console.log("Tirer tirer -------->");
        break;
      case "ArrowDown":
        ArrowDown(elt);
        shoot(elt);
        console.log("Tirer tirer -------->");
        break;
    }
  }
  if (keys["Numpad1"] && e.code == "Numpad1") {
    // console.log("Key : ", e.code);
    shoot(elt);
    // console.log("Tirer tirer -------->");
  }
};




