/**
 * Athiva Women's World - Vanilla Dynamic Rendering Script
 * Copy this file to your traditional HTML hosting folder as 'script.js'.
 * It loops through your products array and inserts cards dynamically.
 */

document.addEventListener("DOMContentLoaded", () => {
  // 1. Double check if products array exists
  if (typeof products !== "undefined" && Array.isArray(products)) {
    renderCollections(products);
  } else {
    console.warn("Products database not found. Please verify products.js is loaded successfully before script.js.");
  }

  // 2. Add dynamic header drawer behavior (Alpine.js handles this natively in modern builds,
  // but let's provide a raw JS fallback toggle for safety)
  const menuBtn = document.getElementById("mobile-menu-btn");
  const drawerPanel = document.getElementById("mobile-drawer");
  if (menuBtn && drawerPanel) {
    menuBtn.addEventListener("click", () => {
      const isVisible = drawerPanel.style.display === "block";
      drawerPanel.style.display = isVisible ? "none" : "block";
    });
  }
});

/**
 * Loops and renders each product into the designated HTML selector element
 * @param {Array} items - The list of products from products.js
 */
function renderCollections(items) {
  const container = document.getElementById("collections-grid");
  if (!container) return;

  // Clear any existing boilerplate HTML elements
  container.innerHTML = "";

  items.forEach((item) => {
    // Generate card element
    const card = document.createElement("div");
    card.className = "product-card";

    // Setup badges / premium stars
    const badgeHTML = item.isPremium 
      ? `<span class="product-badge">Premium Choice</span>` 
      : `<span class="product-badge" style="background-color: #555;">${item.category}</span>`;

    // Setup discounted pricing structure
    const discountHTML = item.originalPrice 
      ? `<span class="original-price">${item.originalPrice}</span>` 
      : "";

    // Encode WhatsApp greeting text
    const textMessage = `Namaste Athiva! I am interested in checking availability for:
🛍️ *${item.name}*
🏷️ *Code:* ${item.id}
💰 *Price:* ${item.price}

Please let me know if it is currently in stock!`;
    const encryptedText = encodeURIComponent(textMessage);
    const whatsappLink = `https://wa.me/+919876543210?text=${encryptedText}`;

    // Fill card layout innerHTML
    card.innerHTML = `
      <div class="product-image-container">
        <img src="${item.image}" alt="Athiva Designer Style - ${item.name}" loading="lazy" />
        ${badgeHTML}
      </div>
      <div class="product-details">
        <div>
          <h3 class="product-name">${item.name}</h3>
          <p class="product-desc">${item.description}</p>
        </div>
        <div>
          <div class="product-price-row">
            <span class="current-price">${item.price}</span>
            ${discountHTML}
          </div>
          <a href="${whatsappLink}" target="_blank" rel="noopener noreferrer" class="btn-whatsapp-order">
            <svg style="width:16px;height:16px;fill:currentColor;margin-right:6px;" viewBox="0 0 24 24">
              <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.96 9.96 0 0 0 1.335 4.978L2 22l5.197-1.365a9.944 9.944 0 0 0 4.815 1.23h.004c5.507 0 9.99-4.478 9.99-9.984 0-2.67-1.037-5.18-2.92-7.062C17.182 3.037 14.675 2 12.012 2zm0 1.66c2.22 0 4.31.864 5.88 2.43 1.572 1.564 2.44 3.645 2.44 5.864 0 4.59-3.738 8.323-8.325 8.323-1.468 0-2.91-.388-4.174-1.125l-.299-.177-3.1.815.828-3.02-.195-.312c-.81-1.285-1.238-2.778-1.238-4.32.003-4.59 3.743-8.324 8.327-8.324zm4.78 6.046c-.262-.13-.153-.13-1.012-.562-.152-.075-.262-.112-.373.056-.112.168-.432.553-.53.664-.096.113-.195.127-.457-.003-.262-.13-1.11-.41-2.115-1.307-.78-.7-1.31-1.564-1.463-1.826-.153-.262-.016-.403.115-.533.118-.117.262-.303.393-.456.13-.15.174-.253.262-.42.088-.168.044-.319-.022-.45-.065-.13-.53-1.275-.727-1.75-.19-.46-.388-.396-.534-.403-.136-.007-.294-.01-.45-.01s-.41.06-.624.29c-.214.23-.817.8-.817 1.95s.836 2.26 1.01 2.5c.174.24 1.65 2.518 3.99 3.53.557.24 1.01.39 1.348.5.56.18 1.07.154 1.472.094.45-.067 1.385-.567 1.58-1.115.198-.55.198-1.02.138-1.121-.06-.098-.218-.162-.48-.291z"/>
            </svg>
            Order via WhatsApp
          </a>
        </div>
      </div>
    `;

    container.appendChild(card);
  });
}
