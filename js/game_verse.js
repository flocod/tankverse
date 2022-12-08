// $("#tank1").animate({left: '+=100', top: '+=100'}, 1000);

let speed = 50;

const animateTo = (elt, params) => {

  $(elt).css(params);
};

const ArrowLeft = (elt) => {
  $(elt).css("transform","rotate(-90deg)");

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
};
const ArrowUp = (elt) => {
    $(elt).css("transform","rotate(0deg)");
  let tempPos = 0;
  let h = window.innerHeight - $(elt).height();

  let position = $(elt).position();
  tempPos = position.top - speed;
  if (tempPos <= 0) {
    $(elt).css("top", 0 + "px");

    $(elt).anime({});
  } else if (tempPos >= h) {
    $(elt).css("top", h + "px");
  } else {
    $(elt).css("top", tempPos + "px");
  }
};
const ArrowRight = (elt) => {
    $(elt).css("transform","rotate(90deg)");
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
};
const ArrowDown = (elt) => {
    $(elt).css("transform","rotate(180deg)");
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
};

document.onkeydown = (e) => {
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
};


window.addEventListener("keypress",function (event) {
    document.querySelector("#message").play();
  
    if (event) {
      if (event.code=="KeyQ") {
        document.querySelector("#message").pause();
        document.querySelector("#message").play();
        console.log("dfdfdfdfdf")
      } 
    }
  });