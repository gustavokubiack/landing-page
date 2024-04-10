document.addEventListener("DOMContentLoaded", function() {
    var navbarItems = document.querySelectorAll('.nav-link');

    navbarItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();

            var section = document.querySelector(item.getAttribute('href'));
            var sectionPos = section.offsetTop;

            window.scroll({
                top: sectionPos,
                behavior: "smooth"
            });
        });
    });
});
