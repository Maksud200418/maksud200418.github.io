document.addEventListener("DOMContentLoaded", function () {
    setTimeout(() => {
        document.getElementById("popup").style.display = "block";
    }, 5000); // Delay popup by 5 seconds

    const closeButton = document.getElementById("close-btn");
    const popup = document.getElementById("popup");

    closeButton.addEventListener("mouseover", function () {
        const maxX = window.innerWidth - popup.clientWidth;
        const maxY = window.innerHeight - popup.clientHeight;

        let randomX = Math.floor(Math.random() * maxX);
        let randomY = Math.floor(Math.random() * maxY);

        popup.style.transition = "left 0.5s ease-in-out, top 0.5s ease-in-out";
        popup.style.position = "absolute";
        popup.style.left = `${randomX}px`;
        popup.style.top = `${randomY}px`;
    });

    closeButton.addEventListener("click", function () {
        window.location.href = "next.html"; // Redirect to next page
    });
});