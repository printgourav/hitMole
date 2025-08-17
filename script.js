 const scoreDisplay = document.createElement("div");
    scoreDisplay.style.position = "absolute";
    scoreDisplay.style.top = "39px";
    scoreDisplay.style.left = "20px";
    scoreDisplay.style.color = "white";
    scoreDisplay.style.fontSize = "30px";
    scoreDisplay.style.fontWeight = "bold";
    scoreDisplay.innerText = "Score: 0";

    const highScoreDisplay = document.createElement("div");
    highScoreDisplay.style.position = "absolute";
    highScoreDisplay.style.top = "15px";
    highScoreDisplay.style.left = "20px";
    highScoreDisplay.style.color = "white";
    highScoreDisplay.style.fontSize = "30px";
    highScoreDisplay.style.fontWeight = "bold";

    document.body.append(highScoreDisplay, scoreDisplay);
    const dirtDivs = document.querySelectorAll('.flex > div');
    const randomHoles = Array.from(dirtDivs);
    
    let isPaused = false;
    let intervalId;

    const scoreBoard = {
      currentScore : 0,
      highScore : 0
    }

    const savedScore = JSON.parse(localStorage.getItem('scoreObj'));
    
    if(savedScore) {
      scoreBoard.highScore = savedScore.highScore || 0;
    }
    
    highScoreDisplay.innerText = `Hi:${savedScore.highScore}`;
    
    randomHoles.forEach(div => {
    div.addEventListener("click", () => {
        if (div.classList.contains("hover") && !isPaused){
          scoreBoard.currentScore++;
          scoreDisplay.innerText = `Score:${scoreBoard.currentScore}`;
          highScoreDisplay.innerText = `Hi:${scoreBoard.highScore}`;
          div.classList.remove("hover");
        }

        if (scoreBoard.currentScore > scoreBoard.highScore) {
            scoreBoard.highScore = scoreBoard.currentScore;            
            localStorage.setItem("scoreObj", JSON.stringify(scoreBoard));
        }
      });
  });

  function runGame() {
    Intervalid = setInterval(()=>{
    dirtDivs.forEach(div => div.classList.remove("hover"));
    const randomIndex = Math.floor(Math.random() * randomHoles.length);
    const randomHole= randomHoles[randomIndex];
    randomHole.classList.add("hover");
    }, 500);
  }
  
  const GameState = document.querySelector('#state');
    
    GameState.addEventListener("click", () => {
    isPaused = !isPaused;
    GameState.textContent = isPaused? "⏸️" : "▶️";
    
    if(isPaused == true) {
      clearInterval(Intervalid);
    }
    
    else{
     runGame();
    }
  
  });


  const reset = document.querySelector("#reset");

  reset.addEventListener('click', () => {
    console.log("reset");
  });

