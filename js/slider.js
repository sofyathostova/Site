document.addEventListener("DOMContentLoaded", function () {
  const slider = document.querySelector(".slider")
  const prevButton = document.querySelector(".prev")
  const nextButton = document.querySelector(".next")

  // Получаем список всех изображений из папки imgs
  const imageFiles = [
    "1.jpg",
    "2.jpg",
    "3.jpg",
    "4.jpg",
    "5.jpg",
    "6.jpg",
    "7.jpg",
    "8.jpg",
    "9.jpg",
  ]

  function createSlides() {
    imageFiles.forEach((imageFile) => {
      const slideItem = document.createElement("div")
      slideItem.className = "slider-item"

      const img = document.createElement("img")
      img.src = `imgs/${imageFile}`
      img.alt = "Slider image"

      slideItem.appendChild(img)
      slider.appendChild(slideItem)
    })
  }

  let currentSlide = 0
  let isAnimating = false

  function updateSlider() {
    if (isAnimating) return

    isAnimating = true
    slider.style.transform = `translateX(-${currentSlide * 100}%)`

    setTimeout(() => {
      isAnimating = false
    }, 500)
  }

  function nextSlide() {
    if (isAnimating) return
    const slides = document.querySelectorAll(".slider-item")
    currentSlide = (currentSlide + 1) % slides.length
    updateSlider()
  }

  function prevSlide() {
    if (isAnimating) return
    const slides = document.querySelectorAll(".slider-item")
    currentSlide = (currentSlide - 1 + slides.length) % slides.length
    updateSlider()
  }

  if (slider && prevButton && nextButton) {
    createSlides()

    prevButton.addEventListener("click", prevSlide)
    nextButton.addEventListener("click", nextSlide)

    slider.addEventListener("transitionend", () => {
      isAnimating = false
    })
  }
})

// Добавляем обработчик для кнопки заказа
document.addEventListener("DOMContentLoaded", function() {
  const headerButton = document.querySelector(".header-button")
  
  if (headerButton) {
    headerButton.addEventListener("click", () => {
      document.querySelector(".main-form").scrollIntoView({
        behavior: "smooth",
        block: "center",
      })
    })
  }
}) 