document.addEventListener("DOMContentLoaded", function () {
  const checkoutBtn = document.querySelector(".checkout-btn")

  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", async function () {
      // Собираем информацию о товарах в корзине
      const cartItems = []
      const cartRows = document.querySelectorAll(".cart-table-row")
      
      cartRows.forEach(row => {
        const name = row.querySelector(".cart-item-details h3").textContent
        const price = row.querySelector(".cart-item-price").textContent
        const quantity = row.querySelector(".cart-quantity-value").textContent
        const total = row.querySelector(".cart-item-total").textContent
        
        cartItems.push({
          name,
          price,
          quantity,
          total
        })
      })

      // Получаем итоговую сумму
      const totalPrice = document.querySelector(".total-price").textContent

      // Формируем сообщение для отправки
      let telegramMessage = `
      🛒 Новый заказ!
      -----------------------------
      `
      
      cartItems.forEach((item, index) => {
        telegramMessage += `
      Товар ${index + 1}: ${item.name}
      Цена: ${item.price}
      Количество: ${item.quantity}
      Сумма: ${item.total}
      -----------------------------
        `
      })
      
      telegramMessage += `
      Итого к оплате: ${totalPrice}
      `

      const originalButtonText = checkoutBtn.textContent

      try {
        // Меняем текст кнопки на время отправки
        checkoutBtn.textContent = "Отправка заказа..."
        checkoutBtn.disabled = true

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
          alert("Спасибо за заказ! Мы скоро свяжемся с вами для подтверждения.")
          // Закрываем модальное окно корзины
          document.getElementById("cartModal").style.display = "none"
          document.body.style.overflow = ""
          
          // Очищаем корзину (опционально)
          document.querySelector(".cart-counter").textContent = "0"
        } else {
          throw new Error(`Ошибка отправки: ${data.description || "Неизвестная ошибка"}`)
        }
      } catch (error) {
        console.error("Ошибка при отправке заказа:", error)
        alert("Произошла ошибка при оформлении заказа. Пожалуйста, попробуйте позже.")
      } finally {
        // Возвращаем исходное состояние кнопки
        checkoutBtn.textContent = originalButtonText
        checkoutBtn.disabled = false
      }
    })
  }
}) 