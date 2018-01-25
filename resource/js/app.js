/* CREATE CARD BACK POSITION ASSIGMENT ON PAGE LOAD */
function onLoad (){
    let cardNum= [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];
    let backNum= [0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9];
    for (i = 0; 0 < cardNum.length; i++) {
        function random(){
            let randomCard, randomCardNum, gameCard, randomBack, randomBackNum, newDiv, divID, newImg;
            /* FETCH RANDOM CARD NUMBER FOR GRID POSITION */
            randomCard = Math.floor(Math.random()*cardNum.length);
            randomCardNum = cardNum.splice(randomCard,1);
            /* FETCH RANDOM BACK CARD NUMBER */
            gameCard = document.querySelector('.game__card-'+randomCardNum);
            randomBack = Math.floor(Math.random()*backNum.length);
            randomBackNum = backNum.splice(randomBack, 1);
            /* CREATE BACK OF A CARD */
            newDiv = document.createElement('div');
            newDiv.setAttribute('class','game__card--back card__back');
            newDiv.setAttribute('id', 'z'+randomCardNum)
            gameCard.appendChild(newDiv);
            /* FETCH CURRENT BACK OF A CARD */
            divID = document.getElementById('z'+randomCardNum);
            /* CREATE VISIBLE BACK OF A CARD */
            newImg = document.createElement('img');
            newImg.setAttribute('src', 'vendor/img/back-' + randomBackNum + '.jpg');
            newImg.setAttribute('alt', 'Back of a Card');
            newImg.setAttribute('class', 'game__card--back-img img-'+randomBackNum);
            divID.appendChild(newImg);
        };
        random();
    }
};
window.onload = onLoad;

/* "PASSWORD" PROTECTION */
const pwOutput = document.querySelector('.popup__passwordOutput');
const hint = document.querySelector('.popup__hint');
const password = document.getElementById('password');
const popupBtn = document.getElementById('popupBtn');
const popup = document.getElementById('popup');

function clicked(){
    if (password.value == 'HIRE ME' || password.value == 'HIREME') { 
        history.go(-1);
        popupBtn.removeAttribute('href');
        startBtn.onclick = start;
        popup.style.opacity = '0';
        popup.style.visibility = 'hidden';
    }else {
        password.value = ''; 
        pwOutput.innerHTML='Password incorrect, try again.';
        hint.innerHTML='Check "Who am I" section and it\'s cards. Look for special characters. uppercase and space matters!';
    } 
}

/* TIMER FUNCTION */
let startTim;
function timeLook (val) { return val > 9 ? val : '0' + val; }
function startTime () {
    let sec = 0;
    startTim = setInterval( function(){
        seconds.innerHTML=timeLook(++sec%60);
        minutes.innerHTML=timeLook(parseInt(sec/60,10));
         }, 1000);
        
}
/* TIMER RESTART FUNCTION  */
function timeRestart (){
    clearInterval(startTim); 
    seconds.innerHTML= '00';
    minutes.innerHTML= '00';
};
/* NEW GAME BUTTON */
const startBtn = document.querySelector('.btnStart');

/* NEW GAME BUTTON ENGINE */
function start(){
    let timeCheck = 0;
    let firstCard, firstCardParent, firstCardBack, secondCard, secondCardBack, secondCardParent,gameCardFront, gameCardBack;
    
    gameCard = document.querySelectorAll('.game__card');
    seconds=document.getElementById('seconds');
    minutes=document.getElementById('minutes');
    gameScore=document.querySelector('.game__time--num');
    gameReset=document.querySelector('.reset');
    gameCardFront = document.querySelectorAll('.game__card--front');
    gameCardBack = document.querySelectorAll('.game__card--back');
    /* REMOVE WINNING TIME GRAPHICS */
    gameScore.classList.remove('game__time--num-flash')
    seconds.innerHTML= '00';
    minutes.innerHTML= '00';
    

    function resetGame (){
        /* REMOVE PREVIOUS CARD BACK POSITION ASSIGMENTS */
        document.querySelectorAll('.game__card--back').forEach(e => e.parentNode.removeChild(e));
        /* CREATE CARD BACK NEW POSITION ASSIGMENTS */
        onLoad();
        /* CARD RESET */
        Array.from(gameCardFront).forEach(element => {element.style.transform = 'rotateY(0deg)';});
        Array.from(gameCardBack).forEach(element => {element.style.transform = 'rotateY(-180deg)';});
        Array.from(gameCard).forEach(element => {
            element.style.opacity = '1';
            element.style.pointerEvents = 'inherit';
        });
        /* CREATE THE INACTIVE LOOK */
        Array.from(gameCard).forEach(element => {
            element.style.filter = 'brightness(10%)';
            element.classList.add('game__card--flash')
        });
        gameScore.classList.remove('game__time--num-flash')
        Array.from(gameCard).forEach(element => {element.removeEventListener('click', matching)});
        timeRestart();
        
    };
    /* RESET THE BOARD WITHOUT STARTING NEW GAME  */
    resetGame();
    gameReset.onclick=resetGame;
    /* RESTART TIME IF IT'S RUNNING */
    timeRestart();
    /* START TIME IF IT'S NOT RUNNING */
    startTime();
    /* TIME IT TOOK PLAYER TO WIN */
    function timeStopShow (){clearInterval(startTim);};
    /* ADD CLICK EVENT TO EVERY CARD */
    Array.from(gameCard).forEach(element => {element.addEventListener('click', matching)});
    /* REMOVE CARD INACTIVE LOOK */
    Array.from(gameCard).forEach(element => {
        element.style.filter = 'none';
        element.classList.add('game__card--flash')
    });
    setTimeout(() =>{
        Array.from(gameCard).forEach(element => {
            element.classList.remove('game__card--flash')
        });
    }, 401);
    /* GAME ENGINE */
    function matching(e) {
        /* ROTATE CARD FUNCTION */
        function rotateBack(){
            document.querySelector('.game__box').style.pointerEvents = 'none';
            setTimeout(() => {
                firstCard.style.transform = 'rotateY(0deg)';
                firstCardBack.style.transform = 'rotateY(-180deg)';
                secondCard.style.transform = 'rotateY(0deg)';
                secondCardBack.style.transform = 'rotateY(-180deg)';
                firstCard = undefined;
                }, 1000);
            setTimeout(()=>{
                document.querySelector('.game__box').style.pointerEvents = 'auto';
            }, 1010);
        }        
        /* CLICK ENGINE */ 

        /* FIRST CLICK AND CARD TURN */
        if(!firstCard) {
            firstCard = e.target.parentNode;
            firstCardParent = e.target.parentNode.parentNode;
            firstCardBack = firstCardParent.lastChild;
            firstCardImg = firstCardBack.firstChild;
            if (firstCard.className !== 'game__box'){
                firstCard.style.transform = 'rotateY(-180deg)';
                firstCardBack.style.transform = 'rotateY(0deg)';
            };
               
        /* SECOND CLICK AND CARD TURN */      
        }else if (e.target.parentNode !== firstCard) {
            secondCard = e.target.parentNode;
            secondCardParent = e.target.parentNode.parentNode;
            secondCardBack = secondCardParent.lastChild;
            secondCardImg = secondCardBack.firstChild;
            
            if (secondCard.className !== 'game__box'){
                secondCard.style.transform = 'rotateY(-180deg)';
                secondCardBack.style.transform = 'rotateY(0deg)';
            };
             
            /* MATCHING ENGINE */  
            if (secondCardImg !== null) {
                /* CHECK BACK OF A CARD CLASS */ 
                if (Object.is(firstCardImg.className, secondCardImg.className)) {

                    /* IF MATCHED, CHECK IS IT THE SAME CARD */ 
                    if (Object.is(firstCardBack.id,secondCardBack.id)) {
                        /* IF IT IS, ROTATE IT */
                        rotateBack();
                        
                    } else {
                        /* IF IT'S NOT, IT'S A MATCH - HIDE THE CARDS */
                        document.querySelector('.game__box').style.pointerEvents = 'none';
                            setTimeout(() => {
                                firstCardParent.style.opacity = '0';
                                firstCardParent.style.visibility = 'none';
                                firstCardParent.style.pointerEvents = 'none';
                                secondCardParent.style.opacity = '0';
                                secondCardParent.style.visibility = 'none'; 
                                secondCardParent.style.pointerEvents = 'none';
                                timeCheck++
                                firstCard = undefined;
                                if (timeCheck == 10) {
                                    timeStopShow();
                                    gameScore.classList.add('game__time--num-flash');}
                                }, 1000);
                            setTimeout(()=>{
                                document.querySelector('.game__box').style.pointerEvents = 'auto';
                            }, 1010);
                        }
                    } else {
                    /* IF ITS NOT THE SAME CARD - ROTATE IT BACK */
                            rotateBack();
                        }
            }
            
        };
    };
};
