"use strict"

// Spinner
window.addEventListener("load", function () {
  const spinner = document.getElementById("spinner")
  if (spinner) {
    setTimeout(() => {
      spinner.classList.remove("show")
      setTimeout(() => (spinner.style.display = "none"), 500) // Wait for transition
    }, 1)
  }
})

// Sticky Navbar
window.addEventListener("scroll", function () {
  const navbar = document.querySelector(".nav-bar")
  if (navbar) {
    if (window.scrollY > 45) {
      navbar.classList.add("sticky-top")
    } else {
      navbar.classList.remove("sticky-top")
    }
  }
})

// Back to top button
const backToTop = document.querySelector(".back-to-top")
if (backToTop) {
  window.addEventListener("scroll", function () {
    if (window.scrollY > 300) {
      backToTop.style.display = "flex"
    } else {
      backToTop.style.display = "none"
    }
  })

  backToTop.addEventListener("click", function (e) {
    e.preventDefault()
    window.scrollTo({ top: 0, behavior: "smooth" })
  })
}
