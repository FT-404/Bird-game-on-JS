let bird = document.querySelector('.bird'),
    boss = document.querySelector('.boss'),
    count = 1,
    count2 = 1,
    score = 0,
    timerCount = 2,
    countHearts = 2,
    speed = 10,
    speedup = 0,
    oldspeed = 0,
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

// Просмотр в полноэкранном режиме
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

// Закрыть полный экран
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

// Запуск игры
startBtn.addEventListener('click', () => {
    openFullscreen();
    startBtn.style.display = 'none';
    info.style.display = 'flex';
    Timer();
    scoreEl.textContent = score;
})

// Функция таймера
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

// Функция рандомных значений по осям X и Y для птички
function Rand () {
    let randX = Math.floor(Math.random() * 7);
    let randY = Math.floor(Math.random() * 480);
    if (randX < 3) {
        randX = 3;
    }
    return {
        randX: randX,
        randY: randY
    }
}

// Функция вылета птички
function Starter() {
    body.classList.add('pricel');
    count = count2 = 1;
    // speed = Rand().randX - speedup;
    if (speed <= 1.75) {
        speed = 1.75;
    }
    bird.style.animationDuration = speed + 's';
    console.log(speed);
    bird.style.marginTop = Rand().randY + 'px';
    bird.classList.add('fly');
    setInterval(() => {
        // console.log(Math.floor(bird.getClientRects()[0]["x"]));
        if (Math.floor(bird.getClientRects()[0]["x"]) >= 50 * count) {
            bird.src = "img/anim.png";
            count += 2;
        }
        if (Math.floor(bird.getClientRects()[0]["x"]) >= 100 * count2) {
            // bird.style.backgroundImage = null;
            bird.src = "img/bird2.png";
            count2++;
        }
    }, 4)
}

// Функция птички-босса
function Boss (bossScore, clicks) {
    speed = 16;
    boss.style.display = 'block';
    boss.style.animationDuration = speed + 's';
    console.log(speed);
    boss.style.marginTop = Rand().randY + 'px';
    boss.classList.add('fly');
    console.log('Boss');

    boss.addEventListener('click', () => {
        bossScore++;
        console.log('Score ', bossScore);
        if (bossScore == clicks) {
            console.log('hh');
            boss.style.display = 'none';
            boss.classList.remove('fly');
            score += 10;
            scoreEl.textContent = score;
            speed = oldspeed;
            Starter();
        }
    })
}

// Улетевшая птичка (минус одна жизнь)
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
        loseMess.textContent = 'You lose :(';
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
            Starter();
        }, 4);
    }

})

// Попадание по птичке
bird.addEventListener('mousedown', () => {
    score++;
    speed -= 0.1;
    // console.log(Rand().randX);
    scoreEl.textContent = score;
    bird.classList.remove('fly');
    switch (score) {
        case 5:

            oldspeed = speed;
            boss.src = 'img/edik-boss.png';
            Boss(0, 2);
            break;
        case 20:

            oldspeed = speed;
            boss.src = 'img/big-boss.png';
            Boss(0, 4);
            break;
        default:
            setTimeout(() => {
                Starter();
            }, 4);
    }
})

// Перезапуск игры
resBtn.addEventListener('click', () => {
    Restarter();
})

// Функция перезапуска
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
