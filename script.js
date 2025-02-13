document.addEventListener("DOMContentLoaded", function () {
    setTimeout(() => {
        document.getElementById("popup").style.display = "block";
    }, 5000); // Delay popup by 5 seconds

    const closeButton = document.getElementById("close-btn");
    closeButton.addEventListener("mouseover", function () {
        const popup = document.getElementById("popup");
        const maxX = window.innerWidth - popup.clientWidth;
        const maxY = window.innerHeight - popup.clientHeight;

        const randomX = Math.floor(Math.random() * maxX);
        const randomY = Math.floor(Math.random() * maxY);

        popup.style.position = "absolute";
        popup.style.left = `${randomX}px`;
        popup.style.top = `${randomY}px`;
    });
});