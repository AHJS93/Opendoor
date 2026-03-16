/* ============================================================
   ELEMENTS
============================================================ */
const toggle = document.getElementById("menuToggle");
const nav = document.getElementById("mainNav");
const logo = document.getElementById("logo");
const menuIcon = document.getElementById("menuIcon");
const main = document.querySelector("main");

/* ============================================================
   MENU HANDLING
============================================================ */
function openMenu() {
    nav.classList.add("nav-active");
    document.body.classList.add("menu-open");
    menuIcon.classList.remove("fa-bars");
    menuIcon.classList.add("fa-times");
}

function closeMenu() {
    nav.classList.remove("nav-active");
    document.body.classList.remove("menu-open");
    menuIcon.classList.add("fa-bars");
    menuIcon.classList.remove("fa-times");
}

function toggleMenu() {
    const isOpen = nav.classList.toggle("nav-active");
    document.body.classList.toggle("menu-open", isOpen);

    menuIcon.classList.toggle("fa-bars", !isOpen);
    menuIcon.classList.toggle("fa-times", isOpen);
}

/* Toggle button */
toggle.addEventListener("click", toggleMenu);

/* Close menu when clicking outside */
document.addEventListener("click", (e) => {
    if (!document.body.classList.contains("menu-open")) return;

    const insideMenu = e.target.closest("#mainNav");
    const clickedToggle = e.target.closest("#menuToggle");

    if (!insideMenu && !clickedToggle) {
        closeMenu();
    }
});

/* ============================================================
   ACTIVE LINK HIGHLIGHTING
============================================================ */
function updateActiveLink(url) {
    nav.querySelectorAll("a").forEach(a => {
        a.classList.toggle("activeLink", a.getAttribute("href") === url);
    });
}

/* ============================================================
   AJAX PAGE LOADING
============================================================ */
async function loadPage(url) {
    try {
        const response = await fetch(url);
        const html = await response.text();

        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");

        // Replace only <main>
        main.innerHTML = doc.querySelector("main").innerHTML;

        // Update URL
        history.pushState({}, "", url);

        // Update nav state
        updateActiveLink(url);
        closeMenu();

        // Re-bind nav links (important for mobile)
        bindNavLinks();

    } catch (err) {
        console.error("Navigation error:", err);
    }
}

/* ============================================================
   NAV LINK HANDLER
============================================================ */
function handleNavClick(e) {
    e.preventDefault();
    const url = this.getAttribute("href");
    loadPage(url);
}

/* Attach listeners to all nav links */
function bindNavLinks() {
    nav.querySelectorAll("a").forEach(a => {
        a.removeEventListener("click", handleNavClick);
        a.addEventListener("click", handleNavClick);
    });
}

/* Initial binding */
bindNavLinks();

/* Handle browser back/forward */
window.addEventListener("popstate", () => {
    loadPage(location.pathname);
});
