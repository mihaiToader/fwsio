const IMAGES = 5;
console.log('bbbbb');

document.addEventListener("DOMContentLoaded", () => {
    console.log('aaaa');
    let carousel = document.getElementById("carousel");

    const getRandomColor = () => {
        return  Math.floor(Math.random()*16777215).toString(16);
    }

    const getImageUrl = () => {
    const colour = getRandomColor();
        return `https://dummyimage.com/600x400/${colour}/fff.png&text=${colour}`;
    }


    const getImageUrls = () => {
        return Array.from(Array(IMAGES)).map(() => getImageUrl());
    }

    const createImage = (url) => {
        const image = document.createElement('img');
        image.src = url;
        return image;
    }

    const imageUrls = getImageUrls();

    imageUrls.forEach((url) => {
        carousel.appendChild(createImage(url))
    })
    imageUrls.forEach((url) => {
        carousel.appendChild(createImage(url))
    })

    const carouselWidth = carousel.clientWidth;
    console.log(carouselWidth);

    let stop = false;

    function animateRight(obj, from, to){
        if (stop) {
            return;
        }
        console.log(from, 5*600, to)
        if (from >= carouselWidth + 5*600){
            setTimeout(function(){
                animateRight(obj, carouselWidth + 20, to);
            }, 20)   
        }
        else {
            obj.style.marginLeft = `${from}px`;
            setTimeout(function() {
                animateRight(obj, from + 20, to);
            }, 20) 
        }
    }

    const animate = () => {
        stop = false;
        console.log('animate');
        animateRight(carousel, carouselWidth, 10*600);
    }

    document.getElementById('start').addEventListener('click', animate);
    document.getElementById('stop').addEventListener('click', () => {
        stop = true;
    });
});
