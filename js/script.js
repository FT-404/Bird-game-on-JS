let bird = document.querySelector('.bird'),
    count = 1,
    count2 = 1,
    score = 0,
    timerCount = 2,
    countHearts = 2,
    scoreEl = document.querySelector('.score'),
    timer = document.querySelector('.timer'),
    hearts = document.querySelectorAll('.heart'),
    resBtn = document.querySelector('.res-btn'),
    info = document.querySelector('.info'),
    startBtn = document.querySelector('.start-btn'),
    scoreAfterLose = document.querySelector('.score-after-lose'),
    loseMess = document.querySelector('.lose-message'),
    afterLose = document.querySelector('.after-lose'),
    elem = document.documentElement,
    body = document.querySelector('body');

/* Просмотр в полноэкранном режиме */
function openFullscreen() {
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) { /* Firefox */
        elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE/Edge */
        elem.msRequestFullscreen();
    }
}

/* Закрыть полный экран */
function closeFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.mozCancelFullScreen) { /* Firefox */
        document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { /* IE/Edge */
        document.msExitFullscreen();
    }
}

document.addEventListener('mousedown', () => {

})

startBtn.addEventListener('click', () => {
    openFullscreen();
    startBtn.style.display = 'none';
    info.style.display = 'flex';
    Timer();
    scoreEl.textContent = score;
})

function Timer () {
    let Timer = setInterval(() => {

        if (timerCount <= -2) {
            clearInterval(Timer);
            timer.style.display = 'none';
            Starter();
        }
        if (timerCount == -1) {
            timer.textContent = 'Go!';
        } else {
            timer.textContent = timerCount;
        }

        timerCount--;
    }, 1000)
}



function Rand () {
    let randX = Math.floor(Math.random() * 10);
    let randY = Math.floor(Math.random() * 480);
    if (randX < 3) {
        randX = 3;
    }
    // return randX;
    return {
        randX: randX,
        randY: randY
    };
}

function Starter() {
    body.classList.add('pricel');
    // if (isBirdLeave == true) {
    //     countHearts -= 1;
    // }
    // console.log(isBirdLeave);
    count = count2 = 1;
    // bird.style.backgroundImage = null;
    bird.style.animationDuration = Rand().randX + 's';
    bird.style.marginTop = Rand().randY + 'px';
    bird.classList.add('fly');
    setInterval(() => {
        // console.log(Math.floor(bird.getClientRects()[0]["x"]));

        if (Math.floor(bird.getClientRects()[0]["x"]) >= 50 * count) {
            // bird.style.backgroundImage = 'url("img/anim.png")';
            bird.src = "img/anim.png";
            count += 2;
        }
        if (Math.floor(bird.getClientRects()[0]["x"]) >= 100 * count2) {
            // bird.style.backgroundImage = null;
            bird.src = "img/bird2.png";
            count2++;
        }
        // if (Math.floor(bird.getClientRects()[0]["x"]) >= screen.width - 20) {
        //     hearts.forEach((i, index) => {
        //         if (index == countHearts) {
        //             isBirdLeave = true;
        //             i.style.display = 'none';
        //         }
        //     })
        // }
    }, 4)
}

bird.addEventListener('animationend', () => {

    hearts.forEach((i, index) => {
        if (index == countHearts) {
            i.style.display = 'none';
        }
    })
    if (countHearts <= 0) {
        bird.classList.remove('fly');
        info.style.display = 'none';
        afterLose.style.display = 'block';
        // loseMess.style.display = 'block';
        loseMess.textContent = 'You lose (';
        resBtn.style.display = 'block';
        // scoreEl.style.display = 'none';
        // scoreAfterLose.style.display = 'block';
        scoreAfterLose.textContent = 'Score: ' + score;
        afterLose.style.display= 'block';
        body.classList.remove('pricel');
    } else {
        countHearts -= 1;
        bird.classList.remove('fly');
        setTimeout(() => {
            Starter()
        }, 4);
    }

})

bird.addEventListener('mousedown', () => {
    score++;
    scoreEl.textContent = score;
    bird.classList.remove('fly');
    setTimeout(() => {
        Starter()
    }, 4);
})

resBtn.addEventListener('click', () => {
    Restarter();
})

function Restarter () {
    openFullscreen();
    info.style.display = 'flex';

    scoreEl.textContent = score;
    hearts.forEach(i => {
        i.style.display = null;
    })
    afterLose.style.display = 'none';
    info.style.display = 'flex';
    count = 1;
    count2 = 1;
    score = 0;
    timerCount = 2;
    countHearts = 2;
    timer.style.display = null;
    timer.textContent = '3';
    scoreEl.textContent = '0';
    Timer();
}
