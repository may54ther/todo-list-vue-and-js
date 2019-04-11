const wrap = document.getElementById("wrap");

const IMG_NUM = 5;

function paintImage(imgNum) {
  wrap.style.background = `linear-gradient(rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.45)), url(img/bg${imgNum}.png) no-repeat`;
}

function getRandom() {
  const num = Math.floor(Math.random() * IMG_NUM) + 1;
  return num;
}

function init() {
  const randomNum = getRandom();
  paintImage(randomNum);
}
init();
