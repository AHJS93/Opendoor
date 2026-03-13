const toggle = document.getElementById("menuToggle");
const nav = document.getElementById("mainNav");
const logo = document.getElementById("logo");
const menuIcon = document.getElementById("menuIcon");

/* -----------------------------
   MENU TOGGLE (unchanged)
----------------------------- */
toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("nav-active");
    document.body.classList.toggle("menu-open", isOpen);

    menuIcon.classList.toggle("fa-bars", !isOpen);
    menuIcon.classList.toggle("fa-times", isOpen);
});

/* -----------------------------
   CLOSE MENU WHEN CLICKING OUTSIDE
----------------------------- */
document.addEventListener("click", (e) => {
    const menuIsOpen = document.body.classList.contains("menu-open");
    if (!menuIsOpen) return;

    const clickedInsideMenu = e.target.closest(".main-nav");
    const clickedToggle = e.target.closest("#menuToggle");

    if (!clickedInsideMenu && !clickedToggle) {
        closeMenu();
    }
});

function closeMenu() {
    nav.classList.remove("nav-active");
    document.body.classList.remove("menu-open");

    menuIcon.classList.add("fa-bars");
    menuIcon.classList.remove("fa-times");
}

/* -----------------------------
   UPDATE ACTIVE LINK
----------------------------- */
function updateActiveLink(url) {
    document.querySelectorAll("nav a").forEach(a => {
        a.classList.toggle("activeLink", a.getAttribute("href") === url);
    });
}

/* -----------------------------
   AJAX NAVIGATION (EVENT DELEGATION)
----------------------------- */
nav.addEventListener("click", async (e) => {
    const link = e.target.closest("a");
    if (!link) return; // clicked something else

    e.preventDefault();
    const url = link.getAttribute("href");

    try {
        const response = await fetch(url);
        const html = await response.text();

        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");

        // Replace only <main>
        document.querySelector("main").innerHTML =
            doc.querySelector("main").innerHTML;

        // Update URL
        history.pushState({}, "", url);

        // Update active link + close menu
        updateActiveLink(url);
        closeMenu();

    } catch (err) {
        console.error("Navigation error:", err);
    }
});
