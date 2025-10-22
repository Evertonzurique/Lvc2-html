// Hero Slider
let currentSlide = 0
const slides = document.querySelectorAll(".hero-slide")

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.remove("active")
    if (i === index) {
      slide.classList.add("active")
    }
  })
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length
  showSlide(currentSlide)
}

// Initialize hero slider after DOM is ready to avoid flicker
document.addEventListener("DOMContentLoaded", () => {
  showSlide(0)
  // Auto-advance slides every 5 segundos
  setInterval(nextSlide, 5000)
})

// Testimonials
const testimonials = [
  {
    name: "Maria Silva",
    case: "Divórcio Consensual",
    text: "A Dra. Luciana foi fundamental em um dos momentos mais difíceis da minha vida. Sua empatia e profissionalismo me deram a segurança necessária para seguir em frente. Conseguimos resolver tudo de forma tranquila e justa.",
    initial: "M",
  },
  {
    name: "João Santos",
    case: "Regulamentação de Guarda",
    text: "Excelente profissional! Sempre me orientou com clareza e paciência, priorizando o bem-estar dos meus filhos. Graças ao trabalho da Dra. Luciana, conseguimos chegar a um acordo que beneficiou toda a família.",
    initial: "J",
  },
  {
    name: "Ana Paula",
    case: "Inventário",
    text: "O processo de inventário parecia impossível com tantas questões familiares envolvidas. A Dra. Luciana conduziu tudo com muita sensibilidade e competência técnica, facilitando o diálogo entre todos os herdeiros.",
    initial: "A",
  },
  {
    name: "Carlos Mendes",
    case: "Pensão Alimentícia",
    text: "Estava desesperado com a situação da pensão do meu filho. A Dra. Luciana me explicou todos os meus direitos com clareza e agiu rapidamente. Hoje tenho a tranquilidade de que meu filho está amparado.",
    initial: "C",
  },
]

let currentTestimonial = 0

function updateTestimonial(index) {
  const testimonial = testimonials[index]
  const textElement = document.querySelector(".testimonial-text")
  const nameElement = document.querySelector(".author-name")
  const caseElement = document.querySelector(".author-case")
  const avatarElement = document.querySelector(".author-avatar")

  textElement.textContent = `"${testimonial.text}"`
  nameElement.textContent = testimonial.name
  caseElement.textContent = testimonial.case
  avatarElement.textContent = testimonial.initial

  // Update dots
  updateDots(index)
}

function createDots() {
  const dotsContainer = document.querySelector(".testimonial-dots")
  dotsContainer.innerHTML = ""

  testimonials.forEach((_, index) => {
    const dot = document.createElement("button")
    dot.className = "dot"
    if (index === 0) dot.classList.add("active")
    dot.setAttribute("aria-label", `Ver depoimento ${index + 1}`)
    dot.addEventListener("click", () => {
      currentTestimonial = index
      updateTestimonial(index)
    })
    dotsContainer.appendChild(dot)
  })
}

function updateDots(activeIndex) {
  const dots = document.querySelectorAll(".dot")
  dots.forEach((dot, index) => {
    dot.classList.toggle("active", index === activeIndex)
  })
}

function nextTestimonial() {
  currentTestimonial = (currentTestimonial + 1) % testimonials.length
  updateTestimonial(currentTestimonial)
}

function prevTestimonial() {
  currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length
  updateTestimonial(currentTestimonial)
}

// Initialize testimonials
createDots()
updateTestimonial(0)

// Contact Form (guarded in case elements are missing)
const contactForm = document.getElementById("contact-form")
const formMessage = document.getElementById("form-message")

if (contactForm && formMessage) {
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault()

    const formData = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      phone: document.getElementById("phone").value,
      message: document.getElementById("message").value,
    }

    // Simulate form submission
    try {
      // In a real application, you would send this to a server
      console.log("[v0] Form submitted:", formData)

      // Show success message
      formMessage.className = "form-message success"
      formMessage.innerHTML = `
              <strong>✓ Mensagem enviada com sucesso!</strong><br>
              Entrarei em contato em breve.
          `

      // Reset form
      contactForm.reset()

      // Hide message after 5 seconds
      setTimeout(() => {
        formMessage.style.display = "none"
      }, 5000)
    } catch (error) {
      console.error("[v0] Error submitting form:", error)

      // Show error message
      formMessage.className = "form-message error"
      formMessage.innerHTML = `
              <strong>✗ Erro ao enviar mensagem</strong><br>
              Ocorreu um erro ao enviar sua mensagem. Por favor, tente novamente.
          `
    }
  })
}

// Smooth scroll for navigation links (safe for missing anchors)
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// Update current year in footer (guarded)
const yearEl = document.getElementById("current-year")
if (yearEl) {
  yearEl.textContent = new Date().getFullYear()
}

// Intersection Observer for fade-in animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animate-fade-in")
      observer.unobserve(entry.target)
    }
  })
}, observerOptions)

// Observe sections for animation
document.querySelectorAll("section").forEach((section) => {
  observer.observe(section)
})

// Additional functionality: Toggle mobile menu (guarded for missing elements)
const mobileMenuButton = document.querySelector(".mobile-menu-button")
const mobileMenu = document.querySelector(".mobile-menu")

if (mobileMenuButton && mobileMenu) {
  mobileMenuButton.addEventListener("click", () => {
    mobileMenu.classList.toggle("active")
  })

  // Close mobile menu on link click
  document.querySelectorAll(".mobile-menu a").forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.remove("active")
    })
  })
}
