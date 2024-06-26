// Selecteer de nodige elementen//
const start = document.querySelector(".start");
const game = document.querySelector("#game");
const sco = document.getElementById("score");
const result_box = document.querySelector(".result_box");
const restart = result_box.querySelector(".restart");
const text = result_box.querySelector(".score_text");

// Initialisatie van variabelen
let tos = 2400; // Timeout snelheid
let bool1 = bool2 = bool3 = bool4 = true; // Alle vier de vakjes zijn true als erop wordt geklikt
let score = 0; // Huidige score
let step = 0; // Huidige stap
let mar = randomMargin(); // Initiële marge
let mar2; // Tweede marge voor het vermijden van herhaling

// Functie om het resultaatvenster weer te geven
function viewResult() {
  game.style.display = "none";
  result_box.classList.add("activeResult");
  text.innerText = "You've scored " + score + " points";
}

// Event handler voor herstarten
restart.onclick = () => {
  start.style.display = "block";
  result_box.classList.remove("activeResult");
  sco.innerText = 0;
}

// Functie om de snelheid van het vallen van de elementen in te stellen
function speed(e) {
  a = setInterval(appendDiv, e);
}

// Functie om booleans te resetten
function reset() {
  bool1 = bool2 = bool3 = bool4 = true;
}

// Functie om het resultaatvenster na een vertraging te tonen
function outs() {
  setTimeout(viewResult, 1000);
}

// Functie om een nieuw element aan de DOM toe te voegen
function appendDiv() {
  let ob = document.createElement("div");

  do { mar2 = randomMargin() }
  while (mar == mar2) { mar = mar2 }

  ob.style.marginLeft = mar2 + "%";
  setTimeout(moveDown, 100, ob);
  ob.onclick = () => {
    ob.style.background = "rgba(0,0,0,0.2)"
    updateScore();
  }
  // Stel de stap in op basis van de huidige score
  if (score >= 70 && score < 150) step = 1;
  else if (score >= 150 && score < 400) step = 2;
  else if (score >= 400 && score < 800) step = 3;
  else if (score >= 800) step = 4;
  document.getElementById("tiles").prepend(ob);
}

// Functie om een willekeurige marge te genereren
function randomMargin() { return 25 * Math.floor(Math.random() * 4) }

// Functie om het element naar beneden te verplaatsen
function moveDown(e) {
  e.classList.add("move");
  // Pas snelheid en reset booleans aan op basis van de stap
  if (step == 1) {
    e.classList.add("speedX1");
    if (bool1 == true) {
      clearInterval(a);
      speed(300);
      reset();
      bool1 = false;
      tos = 1600;
    }
  }
  else if (step == 2) {
    e.classList.add("speedX2");
    if (bool2 == true) {
      clearInterval(a);
      speed(250);
      reset();
      bool2 = false;
      tos = 1600;
    }
  }
  else if (step == 3) {
    e.classList.add("speedX3");
    if (bool3 == true) {
      clearInterval(a);
      speed(200);
      reset();
      bool3 = false;
      tos = 1200;
    }
  } else if (step == 4) {
    e.classList.add("speedX4");
    if (bool4 == true) {
      clearInterval(a);
      speed(160);
      reset();
      bool4 = false;
      tos = 1000;
    }
  }
  setTimeout(removeDiv, tos, e)
}

// Functie om de score bij te werken
function updateScore() {
  score++;
  sco.innerText = score;
}

// Functie om het element te verwijderen en het spel af te sluiten indien nodig
function removeDiv(e) {
  let bg = e.style.background;
  if (bg == "") {
    clearInterval(a);
    outs();
  }
  e.remove()
}

// Elementen van de startsectie
const startButton = start.querySelector("button");

// Event handler voor het starten van het spel
startButton.onclick = () => {
  game.style.display = "block";
  start.style.display = "none";
  score = 0;
  speed(400);
  const img = document.querySelector("img");
  if (img) {
    img.style.display = "none";
  }
};

// Event handler voor herstarten na het tonen van het resultaatvenster
restart.onclick = () => {
  start.style.display = "block";
  result_box.classList.remove("activeResult");
  sco.innerText = 0;
  const img = document.querySelector("img");
  if (img) {
    img.style.display = "block";
  }
  startButton.innerText = "Play";
};

// Functie om de regels  te geven
function showRules() {
  var rulesModal = document.getElementById("rulesModal");
  rulesModal.style.display = "flex";
}

// Functie om de regels te verbergen
function hideRules() {
  var rulesModal = document.getElementById("rulesModal");
  rulesModal.style.display = "none";
}

//cookies 
function setCookie(name, value, days) {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
}


function getCookie(name) {
  const cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith(`${name}=`)) {
      return cookie.substring(name.length + 1);
    }
  }
  return null;
}


function updateScore() {
  score++;
  sco.innerText = score;
  setCookie('score', score, 30);
}


function getScoreFromCookie() {
  const savedScore = getCookie('score');
  if (savedScore !== null) {
    score = parseInt(savedScore, 10);
    sco.innerText = score;
  }
}
getScoreFromCookie();














