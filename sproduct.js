// Додати товар у кошик
async function addToCart(productId, productName, productPrice) {
    const response = await fetch('http://localhost:3000/cart');
    const cart = await response.json();

    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
        existingItem.total = existingItem.quantity * existingItem.price;

        await fetch(`http://localhost:3000/cart/${existingItem.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(existingItem),
        });
    } else {
        const newItem = {
            id: productId,
            name: productName,
            price: productPrice,
            quantity: 1,
            total: productPrice,
        };

        await fetch('http://localhost:3000/cart', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newItem),
        });
    }

    alert('Product added to cart!');
}

// Призначення кнопкам "Add to Cart"
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        const productId = button.getAttribute('data-id');
        const productName = button.getAttribute('data-name');
        const productPrice = parseFloat(button.getAttribute('data-price'));

        addToCart(productId, productName, productPrice);
    });
});
