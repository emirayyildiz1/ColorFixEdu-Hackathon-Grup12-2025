const boxes = document.querySelectorAll('.box');

boxes.forEach((box, index) => {
    box.addEventListener('click', () => {
        alert(`Renk körlüğü türü ${index + 1} hakkında daha fazla bilgiye gitmek için tıklayınız.`);
    });
});

window.addEventListener('scroll', () => {
    const detailsSection = document.querySelector('.details-section');
    const missionVisionSection = document.querySelector('.mission-vision');
    if (window.scrollY + window.innerHeight > detailsSection.offsetTop) {
        detailsSection.classList.add('show');
    }
    if (window.scrollY + window.innerHeight > missionVisionSection.offsetTop) {
        missionVisionSection.classList.add('show');
    }
});
