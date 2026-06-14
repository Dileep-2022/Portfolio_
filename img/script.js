document.getElementById("year").textContent = new Date().getFullYear();

/* ---------- Mobile nav toggle ---------- */
const navToggle = document.getElementById("navToggle");
const filetree = document.getElementById("filetree");

navToggle.addEventListener("click", () => {
  const isOpen = filetree.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", isOpen);
});

filetree.querySelectorAll(".file-link").forEach((link) => {
  link.addEventListener("click", () => {
    filetree.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

/* ---------- Active section highlight ---------- */
const sections = document.querySelectorAll("section[id]");
const links = document.querySelectorAll(".file-link");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        links.forEach((link) => link.classList.remove("active"));
        const active = document.querySelector(`.file-link[href="#${entry.target.id}"]`);
        if (active) active.classList.add("active");
      }
    });
  },
  { rootMargin: "-40% 0px -50% 0px" }
);

sections.forEach((section) => observer.observe(section));

/* ---------- Typing effect ---------- */
const typedEl = document.getElementById("typedText");
const phrases = ["whoami", "Full Stack Engineer | Angular + .NET"];
let phraseIndex = 0;
let charIndex = 0;
let deleting = false;

function typeLoop() {
  const current = phrases[phraseIndex];

  if (!deleting) {
    typedEl.textContent = current.slice(0, charIndex + 1);
    charIndex++;
    if (charIndex === current.length) {
      deleting = true;
      setTimeout(typeLoop, 1400);
      return;
    }
  } else {
    typedEl.textContent = current.slice(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      deleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
    }
  }

  setTimeout(typeLoop, deleting ? 35 : 65);
}

if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  typeLoop();
} else {
  typedEl.textContent = phrases[1];
}

/* ---------- Contact form ---------- */
const form = document.getElementById("contact-form");
const status = document.getElementById("formStatus");

form.addEventListener("submit", function (event) {
  event.preventDefault();
  status.classList.remove("error");
  status.textContent = "sending…";

  emailjs.init({
    publicKey: "peVrOIyuf00zS4zA3",
    blockHeadless: true,
    limitRate: { id: "app", throttle: 10000 },
  });

  const name = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const companyName = document.getElementById("company_name").value;
  const message = document.getElementById("message").value;

  emailjs
    .send("service_ugwmlfd", "template_th1vf2c", {
      from_name: name,
      email_id: email,
      message: message,
      company_name: companyName,
    })
    .then(
      function () {
        status.textContent = "Message sent — thank you!";
        form.reset();
      },
      function () {
        status.textContent = "Something went wrong. Please try again later.";
        status.classList.add("error");
      }
    );
});
