document.addEventListener("DOMContentLoaded", function () {
  const contactForm = document.querySelector(".contact-form")

  contactForm.addEventListener("submit", async function (e) {
    e.preventDefault()

    const name = contactForm.querySelector('input[placeholder="Ваше имя"]').value
    const email = contactForm.querySelector('input[placeholder="Email"]').value
    const phone = contactForm.querySelector('input[placeholder="Телефон"]').value
    const message = contactForm.querySelector('textarea').value
    const agreeTerms = contactForm.querySelector('#agree-terms').checked

    if (!name || !email || !phone || !message || !agreeTerms) {
      alert("Пожалуйста, заполните все поля и подтвердите согласие с политикой конфиденциальности")
      return
    }

    const telegramMessage = `
    Новая заявка с сайта!
    Имя: ${name}
    Email: ${email}
    Телефон: ${phone}
    Сообщение: ${message}
    Согласие с политикой: Да
    `

    const submitButton = contactForm.querySelector("button[type='submit']")
    const originalButtonText = submitButton.textContent

    try {
      // Меняем текст кнопки на время отправки
      submitButton.textContent = "Отправка..."
      submitButton.disabled = true

      const response = await fetch(
        `https://api.telegram.org/bot${TELEGRAM_CONFIG.BOT_TOKEN}/sendMessage`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            chat_id: TELEGRAM_CONFIG.CHAT_ID,
            text: telegramMessage,
            parse_mode: "HTML",
          }),
        }
      )

      const data = await response.json()

      if (response.ok) {
        alert("Спасибо! Ваша заявка успешно отправлена.")
        contactForm.reset()
      } else {
        throw new Error(`Ошибка отправки: ${data.description || "Неизвестная ошибка"}`)
      }
    } catch (error) {
      console.error("Ошибка при отправке:", error)
      alert("Произошла ошибка при отправке заявки. Пожалуйста, попробуйте позже.")
    } finally {
      // Возвращаем исходное состояние кнопки
      submitButton.textContent = originalButtonText
      submitButton.disabled = false
    }
  })
}) 