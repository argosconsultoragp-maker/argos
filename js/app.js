document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.querySelector(".navbar");
  const navLinks = document.querySelectorAll('.navbar .nav-link');
  const sections = document.querySelectorAll("section[id]");
  const menuCollapseEl = document.getElementById("menu");

  let bsCollapse = null;

  if (menuCollapseEl) {
    bsCollapse = bootstrap.Collapse.getOrCreateInstance(menuCollapseEl, {
      toggle: false
    });
  }

  function getNavbarHeight() {
    return navbar ? navbar.offsetHeight : 0;
  }

  function setActiveLink() {
    const scrollPosition = window.scrollY + getNavbarHeight() + 120;

    let currentSectionId = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;

      if (
        scrollPosition >= sectionTop &&
        scrollPosition < sectionTop + sectionHeight
      ) {
        currentSectionId = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      const href = link.getAttribute("href");

      if (href === `#${currentSectionId}`) {
        link.classList.add("active");
      }
    });
  }

  function handleNavbarScrollState() {
    if (!navbar) return;

    if (window.scrollY > 40) {
      navbar.classList.add("navbar-scrolled");
    } else {
      navbar.classList.remove("navbar-scrolled");
    }
  }

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      const href = this.getAttribute("href");

      if (!href || !href.startsWith("#")) return;

      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();

      const top =
        target.getBoundingClientRect().top +
        window.pageYOffset -
        getNavbarHeight() +
        1;

      window.scrollTo({
        top,
        behavior: "smooth"
      });

      if (window.innerWidth < 992 && bsCollapse) {
        bsCollapse.hide();
      }
    });
  });

  window.addEventListener("scroll", () => {
    setActiveLink();
    handleNavbarScrollState();
  });

  window.addEventListener("resize", setActiveLink);

  setActiveLink();
  handleNavbarScrollState();

  tsParticles.load("particles", {
    fullScreen: {
      enable: false
    },

    background: {
      color: {
        value: "transparent"
      }
    },

    particles: {
      number: {
        value: 60
      },

      color: {
        value: "#ffc107"
      },

      links: {
        enable: true,
        color: "#ffc107",
        distance: 150,
        opacity: 0.3
      },

      move: {
        enable: true,
        speed: 1
      },

      opacity: {
        value: 0.5
      },

      size: {
        value: 3
      }
    }
  });
});
