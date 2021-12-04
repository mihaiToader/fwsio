const IMAGE_WIDTH = 300;


document.addEventListener("DOMContentLoaded", () => {
    let carousel = document.getElementById("carousel");

    let nrResturants = parseInt(document.getElementById("nrResturants").innerHTML, 10);
    const carouselWidth = carousel.clientWidth;
    let stop = false;

    const animateRight = (obj, from, to) => {
        if (stop) {
            return;
        }
        console.log(from, nrResturants * IMAGE_WIDTH, to)
        if (from >= carouselWidth + nrResturants * IMAGE_WIDTH){
            setTimeout(() => {
                animateRight(obj, carouselWidth + 30, to);
            }, 20)   
        }
        else {
            obj.style.marginLeft = `${from}px`;
            setTimeout(() => {
                animateRight(obj, from + 30, to);
            }, 20) 
        }
    }

    const animate = () => {
        stop = false;
        console.log('animate');
        animateRight(carousel, carouselWidth, nrResturants * 2 * IMAGE_WIDTH);
    }

    document.getElementById('start').addEventListener('click', animate);
    document.getElementById('stop').addEventListener('click', () => {
        stop = true;
    });
});
