const topbar = document.getElementById('topbar');
const menuBtn = document.getElementById('menu-btn');
const sidebar = document.getElementById('sidebar');
const closeBtn = document.getElementById('close-btn');
const overlay = document.getElementById('overlay');



window.addEventListener('scroll', () => {
    console.log('scroll action');
    if (window.scrollY > 50) {
        topbar.classList.remove('transparent');
        topbar.classList.add('solid');
    } else {
        topbar.classList.remove('solid');
        topbar.classList.add('transparent');
    }
});

menuBtn.addEventListener('click', () => {
    sidebar.classList.add('active');
    overlay.classList.add('active');
});

closeBtn.addEventListener('click', () => {
    sidebar.classList.remove('active');
    overlay.classList.remove('active');
});

overlay.addEventListener('click', () => {
    sidebar.classList.remove('active');
    overlay.classList.remove('active');
});

// Show button when user scrolls down 100px
window.onscroll = function () {
    const btn = document.getElementById("backToTop");
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        btn.style.display = "block";
    } else {
        btn.style.display = "none";
    }
};

// Scroll to top smoothly
document.getElementById("backToTop").addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
});


