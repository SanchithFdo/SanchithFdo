const fadeInFromBottom = (element, duration) => {
    element.style.opacity = 0;
    element.style.transform = 'translateY(50px)';

    let currentTime = 0;
    const distanceToMove = 50;

    const animate = () => {
        currentTime += 10;
        const progress = currentTime / duration;

        const opacityValue = progress;
        const translateYValue = progress * distanceToMove;

        element.style.opacity = opacityValue;
        element.style.transform = `translateY(${translateYValue}px)`;

        if (currentTime < duration) {
            requestAnimationFrame(animate);
        }
    };

    animate();
};

const contentDiv = document.getElementById('content');
fadeInFromBottom(contentDiv, 3000);
