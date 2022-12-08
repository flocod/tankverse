// $("#tank1").animate({left: '+=100', top: '+=100'}, 1000);
let rotatedeg = [0, 90, -90, 180];

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

let speed = 50;

const animateTo = (elt, params) => {
  $(elt).css(params);
};

let initTemp = makeNewPosition("#tank1");
animateTo("#tank1", {
  top: initTemp[0],
  left: initTemp[1],
  transform: `rotate(${initTemp[2]}deg)`,
});

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

window.onkeydown = (e) => {
  //   e = e || window.GamepadEvent;
  let elt = "#tank1";

  // Get viewport dimensions (remove the dimension of the div)

  console.log("event", e);
  switch (e.code) {
    case "ArrowLeft":
      ArrowLeft(elt);
      break;
    case "ArrowUp":
      ArrowUp(elt);
      break;
    case "ArrowRight":
      ArrowRight(elt);
      break;
    case "ArrowDown":
      ArrowDown(elt);
      break;
    case "KeyS":
      $(elt).css("transform", "scale(2)");
      break;
    case "KeyX":
      $(elt).css("transform", "scale(1)");
      break;
  }

  switch (e.key) {
    case "q":
    

      let offset = $("#tank1").offset();
      let width = $("#tank1").width();
      let height = $("#tank1").height();

      let centerX = offset.left + width / 2 - 5;
      let centerY = offset.top + height / 2 - 5;

      let target_bullet = "#bul" + Math.floor(Math.random() * 100000);

      let bullet = document.createElement("div");
      // bullet.setAttribute("forElement","elt");

      bullet.setAttribute("id", target_bullet);
      bullet.setAttribute("class", "bullet");
      bullet.setAttribute(
        "style",
        `left:${centerX}px;top:${centerY}px; display:block;`
      );
      // let bullet = `<div for="${elt}" id="${target_bullet}" style="left:${centerX}px;
      // top:${centerY}px; display:block;" class="bullet">
      // </div>`;

      // $(".gamer_verser").append(bullet);
      // $(".gamer_verser").append(bullet);
      document.querySelector(".gamer_verser").appendChild(bullet);
      // $(target_bullet).css({
      //   left:`${centerX}`,
      //   top:`${centerY}`,
      //   display:"block"
      // });

      // document.querySelector(target_bullet).style=`left:${centerX}px; top:${centerY}px, display:"block"`;

      let rotate = document.querySelector(elt).style.transform;

      switch (rotate) {
        case "rotate(-90deg)":
          $(target_bullet).animate(
            {
              left: "-200px",
            },
            1000
          ,function(params) {
            console.log("shoot to left");
          });
        
          break;

        default:
          break;
      }

      break;
    case "0":
      // console.log("Tirer tirer -------->");
      break;
  }
};

window.onkeyup = (event) => {
  // document.querySelector("#message").play();
  if (event.code == "KeyQ") {
    console.log("dfdfdfdfdf");
  }
};
