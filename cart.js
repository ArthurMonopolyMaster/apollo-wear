async function loadCart() {
    const cartTableBody = document.querySelector('#cart-table tbody');
    const cartTotal = document.querySelector('#cart-total');
    cartTableBody.innerHTML = '';
    let total = 0;

    // Отримання даних кошика з сервера
    const response = await fetch('http://localhost:3000/cart');
    const cart = await response.json();

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        cartTableBody.innerHTML += `
            <tr>
                <td>${item.name}</td>
                <td>${item.price}</td>
                <td>
                    <button onclick="updateQuantity(${item.id}, -1)">-</button>
                    ${item.quantity}
                    <button onclick="updateQuantity(${item.id}, 1)">+</button>
                </td>
                <td>${itemTotal}</td>
                <td><button onclick="removeFromCart(${item.id})">Remove</button></td>
            </tr>
        `;
    });

    cartTotal.textContent = `Total: Rp ${total}`;
}

async function updateQuantity(productId, change) {
    // Отримуємо дані товару з сервера
    const response = await fetch(`http://localhost:3000/cart/${productId}`);
    const product = await response.json();

    // Оновлюємо кількість
    product.quantity += change;
    if (product.quantity <= 0) {
        await removeFromCart(productId);
        return;
    }
    product.total = product.quantity * product.price;

    // Оновлення даних на сервері
    await fetch(`http://localhost:3000/cart/${productId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product),
    });

    loadCart();
}

async function removeFromCart(productId) {
    // Видалення товару з сервера
    await fetch(`http://localhost:3000/cart/${productId}`, {
        method: 'DELETE',
    });

    loadCart();
}

// Завантаження кошика при завантаженні сторінки
document.addEventListener('DOMContentLoaded', loadCart);

