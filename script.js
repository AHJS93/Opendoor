const toggle = document.getElementById("menuToggle");
const nav = document.getElementById("mainNav");
const logo = document.getElementById("logo");
const menuIcon = document.getElementById("menuIcon");

// Toggle menu open/close
toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("nav-active");
    document.body.classList.toggle("menu-open", isOpen);

    // Switch icon
    menuIcon.classList.toggle("fa-bars", !isOpen);
    menuIcon.classList.toggle("fa-times", isOpen);

    // Hide logo when open
    //logo.style.opacity = isOpen ? "0" : "1";
});

// Close when clicking outside menu (overlay)
document.addEventListener("click", (e) => {
    const menuIsOpen = document.body.classList.contains("menu-open");
    if (!menuIsOpen) return;

    const clickedInsideMenu = e.target.closest(".main-nav");
    const clickedToggle = e.target.closest("#menuToggle");

    if (!clickedInsideMenu && !clickedToggle) {
        nav.classList.remove("nav-active");
        document.body.classList.remove("menu-open");

        // Reset icon + logo
        menuIcon.classList.add("fa-bars");
        menuIcon.classList.remove("fa-times");
        logo.style.opacity = "1";
    }
});
