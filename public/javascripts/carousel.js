const IMAGE_WIDTH = 300;

const randomIntFromInterval = (min, max) => { 
    return Math.floor(Math.random() * (max - min + 1) + min)
}

document.addEventListener("DOMContentLoaded", () => {
    let carousel = document.getElementById("carousel");

    let nrResturants = parseInt(document.getElementById("nrResturants").innerHTML, 10);
    const carouselWidth = carousel.clientWidth;
    let runningAnimation = false;

    let rotations = 0;
    let speed = 50;
    let stopPosition = randomIntFromInterval(carouselWidth, carouselWidth + nrResturants * IMAGE_WIDTH)
    let speedBump = (stopPosition - carouselWidth) * (25 / 100)
    let firstSpeedBump = carouselWidth + speedBump;
    let secondSpeedBump = carouselWidth + 2 * speedBump;
    let thirdSpeedBump = carouselWidth + 3 * speedBump;

    const resetData = () => {
        rotations = 0;
        speed = 300;
        stopPosition = randomIntFromInterval(carouselWidth, carouselWidth + nrResturants * IMAGE_WIDTH)
        speedBump = (stopPosition - carouselWidth) * (25 / 100)
        firstSpeedBump = carouselWidth + speedBump;
        secondSpeedBump = carouselWidth + 2 * speedBump;
        thirdSpeedBump = carouselWidth + 3 * speedBump;
    };

    const showWinner = (position) => {
        const winner = Math.trunc(((position + carouselWidth / 2) - carouselWidth) / IMAGE_WIDTH);
        console.log(winner);
        alert(window.restaurants[winner].name);
    }

    const animateRight = (obj, from, to) => {
        if (!runningAnimation) {
            return;
        }
        const max = carouselWidth + nrResturants * IMAGE_WIDTH;

        if (rotations == 1) {
            speed = 200;
        } else if (rotations == 2) {
            speed = 100;
        } else if (rotations == 3) {
            speed = 50;
        } else if (rotations >= 4 && from < firstSpeedBump) {
            speed = 40;
        } else if (rotations >= 4 && from < secondSpeedBump) {
            speed = 30;
        } else if (rotations >= 4 && from < thirdSpeedBump) {
            speed = 10;
        } else if (rotations >= 4 && from < stopPosition) {
            setTimeout(() => {
                showWinner(from);
            }, 1000); 
            runningAnimation = false;
            return;
        } 
        console.log(from, max, stopPosition, carouselWidth, rotations, speed)

        if (from >= max) {
            rotations++;
            setTimeout(() => {
                animateRight(obj, carouselWidth + speed, to);
            }, 20)   
        }
        else {
            obj.style.marginLeft = `${from}px`;
            setTimeout(() => {
                animateRight(obj, from + speed, to);
            }, 20) 
        }
    }

    const animate = () => {
        if (runningAnimation) {
            return;    
        }
        runningAnimation = true;
        resetData();
        console.log('animate');
        animateRight(carousel, carouselWidth, nrResturants * 2 * IMAGE_WIDTH);
    }

    document.getElementById('start').addEventListener('click', animate);
    document.getElementById('stop').addEventListener('click', () => {
        runningAnimation = false;
    });
});
