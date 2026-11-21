/* ==========================================
   AGROMART - AGRICULTURE E-COMMERCE
   FILE 4: script.js
   PART 1 OF 3

   Compatible with:
   index.html
   style.css
   products.js
   firebase-config.js
========================================== */


/* ==========================================
   1. START WEBSITE
========================================== */

document.addEventListener("DOMContentLoaded", function () {

"use strict";

if (!Array.isArray(window.PRODUCTS)) {
    alert("Product database not found! Connect products.js.");
    return;
}

const PRODUCTS = window.PRODUCTS;

console.log("AgroMart started!");
console.log("Products loaded:", PRODUCTS.length);


/* ==========================================
   2. FIREBASE CONNECTION
========================================== */

let auth = null;
let confirmationResult = null;
let recaptchaVerifier = null;
let currentUser = null;

if (
    typeof firebase !== "undefined" &&
    typeof firebaseConfig !== "undefined"
) {
    try {
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }

        auth = firebase.auth();
        auth.useDeviceLanguage();

        console.log("Firebase connected!");

    } catch (error) {
        console.error("Firebase error:", error);
    }
}


/* ==========================================
   3. WEBSITE SETTINGS
========================================== */

const STORE_LAT = 13.2563;
const STORE_LON = 76.4770;

const DELIVERY_RATE = 3;

const CART_KEY = "agromart_cart";
const PROFILE_KEY = "agromart_user";
const ORDERS_KEY = "agromart_orders";


/* ==========================================
   4. WEBSITE VARIABLES
========================================== */

let currentCategory = "All";
let currentSearch = "";
let currentSort = "default";

let cart = loadCart();

let selectedPayment = "Cash on Delivery";


/* ==========================================
   5. GET HTML ELEMENTS
========================================== */

const $ = function (id) {
    return document.getElementById(id);
};

const menuBtn = $("menuBtn");
const closeMenuBtn = $("closeMenuBtn");
const sideMenu = $("sideMenu");
const menuOverlay = $("menuOverlay");

const searchInput = $("searchInput");
const searchBtn = $("searchBtn");

const productContainer = $("productContainer");
const featuredProducts = $("featuredProducts");
const productHeading = $("productHeading");
const noProducts = $("noProducts");
const sortProducts = $("sortProducts");

const cartBtn = $("cartBtn");
const cartCount = $("cartCount");

const loginBtn = $("loginBtn");
const authModal = $("authModal");
const closeAuthBtn = $("closeAuthBtn");


/* ==========================================
   6. SAFE HTML FUNCTION
========================================== */

function escapeHTML(value) {

    return String(value ?? "").replace(
        /[&<>"']/g,
        function (character) {

            return {
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#39;"
            }[character];

        }
    );

}


/* ==========================================
   7. MONEY FUNCTION
========================================== */

function money(amount) {

    return "₹" + Number(amount || 0).toFixed(2);

}


/* ==========================================
   8. PRODUCT FUNCTION
========================================== */

function getProduct(id) {

    return PRODUCTS.find(function (product) {

        return Number(product.id) === Number(id);

    });

}


/* ==========================================
   9. CART STORAGE
========================================== */

function loadCart() {

    try {

        const saved = JSON.parse(
            localStorage.getItem(CART_KEY) || "[]"
        );

        if (!Array.isArray(saved)) {
            return [];
        }

        return saved.filter(function (item) {

            const product = getProduct(item.id);

            return product &&
                Number.isInteger(Number(item.quantity)) &&
                Number(item.quantity) > 0;

        }).map(function (item) {

            return {
                id: Number(item.id),
                quantity: Number(item.quantity)
            };

        });

    } catch (error) {

        console.error("Cart loading error:", error);

        return [];

    }

}


function saveCart() {

    localStorage.setItem(
        CART_KEY,
        JSON.stringify(cart)
    );

    updateCartCount();

}


/* ==========================================
   10. CART COUNT
========================================== */

function updateCartCount() {

    const total = cart.reduce(
        function (sum, item) {
            return sum + item.quantity;
        },
        0
    );

    if (cartCount) {
        cartCount.textContent = total;
    }

}


/* ==========================================
   11. PROFILE STORAGE
========================================== */

function getProfile() {

    try {

        return JSON.parse(
            localStorage.getItem(PROFILE_KEY) || "null"
        );

    } catch (error) {

        return null;

    }

}


function saveProfile(profile) {

    localStorage.setItem(
        PROFILE_KEY,
        JSON.stringify(profile)
    );

}


/* ==========================================
   12. ORDER STORAGE
========================================== */

function getOrders() {

    try {

        return JSON.parse(
            localStorage.getItem(ORDERS_KEY) || "[]"
        );

    } catch (error) {

        return [];

    }

}


function saveOrders(orders) {

    localStorage.setItem(
        ORDERS_KEY,
        JSON.stringify(orders)
    );

}


/* ==========================================
   13. MENU FUNCTIONS
========================================== */

function openMenu() {

    if (!sideMenu || !menuOverlay) return;

    sideMenu.classList.add("active");

    menuOverlay.classList.add("active");

    menuBtn?.setAttribute(
        "aria-expanded",
        "true"
    );

}


function closeMenu() {

    sideMenu?.classList.remove("active");

    menuOverlay?.classList.remove("active");

    menuBtn?.setAttribute(
        "aria-expanded",
        "false"
    );

}


menuBtn?.addEventListener("click", openMenu);

closeMenuBtn?.addEventListener("click", closeMenu);

menuOverlay?.addEventListener("click", closeMenu);


/* ==========================================
   14. PRODUCT CATEGORY
========================================== */

function filterCategory(category) {

    currentCategory = category;

    currentSearch = "";

    if (searchInput) {
        searchInput.value = "";
    }

    if (productHeading) {

        productHeading.textContent =
            category === "All"
                ? "All Agricultural Products"
                : category + " Products";

    }

    renderProducts();

    $("products")?.scrollIntoView({
        behavior: "smooth"
    });

}


document.querySelectorAll(".category-card")
.forEach(function (button) {

    button.addEventListener("click", function () {

        filterCategory(this.dataset.category);

    });

});


document.querySelectorAll("[data-category-link]")
.forEach(function (link) {

    link.addEventListener("click", function () {

        closeMenu();

        filterCategory(this.dataset.categoryLink);

    });

});


/* ==========================================
   15. PRODUCT SEARCH
========================================== */

function performSearch() {

    currentSearch = searchInput?.value.trim() || "";

    currentCategory = "All";

    if (productHeading) {

        productHeading.textContent =
            currentSearch
                ? "Search Results: " + currentSearch
                : "All Agricultural Products";

    }

    renderProducts();

    $("products")?.scrollIntoView({
        behavior: "smooth"
    });

}


searchBtn?.addEventListener(
    "click",
    performSearch
);


searchInput?.addEventListener("keydown", function (event) {

    if (event.key === "Enter") {

        performSearch();

    }

});


/* ==========================================
   16. FILTER AND SORT PRODUCTS
========================================== */

function getVisibleProducts() {

    let result = [...PRODUCTS];

    if (currentCategory !== "All") {

        result = result.filter(function (product) {

            return product.category === currentCategory;

        });

    }

    if (currentSearch) {

        const search = currentSearch.toLowerCase();

        result = result.filter(function (product) {

            return [

                product.name,
                product.category,
                product.description,
                product.crops,
                product.soil

            ].some(function (value) {

                return String(value || "")
                    .toLowerCase()
                    .includes(search);

            });

        });

    }

    if (currentSort === "low") {

        result.sort((a, b) => a.price - b.price);

    }

    if (currentSort === "high") {

        result.sort((a, b) => b.price - a.price);

    }

    if (currentSort === "name") {

        result.sort((a, b) =>
            a.name.localeCompare(b.name)
        );

    }

    return result;

}


/* ==========================================
   17. PRODUCT CARD
========================================== */

function createProductCard(product) {

    const outOfStock = Number(product.stock) <= 0;

    return `

        <article class="product-card">

            <img
                class="product-image"
                src="${escapeHTML(product.image)}"
                alt="${escapeHTML(product.name)}"
                loading="lazy"
                onerror="this.style.display='none'"
            >

            <div class="product-info">

                <p class="product-category">
                    ${escapeHTML(product.category)}
                </p>

                <h3>
                    ${escapeHTML(product.name)}
                </h3>

                <p class="product-price">
                    ${money(product.price)}
                    / ${escapeHTML(product.unit)}
                </p>

                <p class="product-stock">

                    ${
                        outOfStock
                        ? "Out of Stock"
                        : "Available: " +
                          escapeHTML(product.stock) +
                          " " +
                          escapeHTML(product.unit)
                    }

                </p>

                <div class="product-buttons">

                    <button
                        class="view-btn"
                        data-action="view"
                        data-id="${product.id}"
                    >
                        View Details
                    </button>

                    <button
                        class="add-cart-btn"
                        data-action="add"
                        data-id="${product.id}"
                        ${outOfStock ? "disabled" : ""}
                    >
                        ${
                            outOfStock
                            ? "Out of Stock"
                            : "🛒 Add to Cart"
                        }
                    </button>

                </div>

            </div>

        </article>

    `;

}


/* ==========================================
   18. DISPLAY PRODUCTS
========================================== */

function renderProducts() {

    if (!productContainer) return;

    const products = getVisibleProducts();

    productContainer.innerHTML =
        products.map(createProductCard).join("");

    if (noProducts) {

        noProducts.hidden = products.length !== 0;

    }

}


/* ==========================================
   19. FEATURED PRODUCTS
========================================== */

function renderFeaturedProducts() {

    if (!featuredProducts) return;

    const featured = PRODUCTS.filter(function (product) {

        return product.featured;

    });

    featuredProducts.innerHTML =
        featured.map(createProductCard).join("");

}


/* ==========================================
   20. PRODUCT SORTING
========================================== */

sortProducts?.addEventListener("change", function () {

    currentSort = this.value;

    renderProducts();

});


/* ==========================================
   PART 1 ENDS HERE
   PART 2 CONTINUES BELOW THIS CODE
========================================== */
                          /* =====================================
   PART 2 OF 3
   PRODUCT DETAILS, CART AND LOGIN
===================================== */

// 16. CREATE AND SHOW MODALS

function showModal(title, content) {
    let modal = document.getElementById("agroModal");

    if (!modal) {
        modal = document.createElement("div");
        modal.id = "agroModal";
        modal.className = "modal";
        document.body.appendChild(modal);
    }

    modal.innerHTML = `
        <div class="modal-content">
            <button type="button" class="modal-close"
                onclick="document.getElementById('agroModal').style.display='none'">
                &times;
            </button>
            <h2>${escapeHTML(title)}</h2>
            <div>${content}</div>
        </div>
    `;

    modal.style.display = "flex";
}

function closeModal() {
    const modal = document.getElementById("agroModal");
    if (modal) modal.style.display = "none";
}

// 17. PRODUCT DETAILS

function viewProduct(productId) {
    const product = getProduct(productId);

    if (!product) {
        alert("Product not found.");
        return;
    }

    const image = product.image
        ? `<img src="${escapeHTML(product.image)}"
             alt="${escapeHTML(product.name)}"
             class="product-detail-image">`
        : `<div class="product-detail-image">${product.emoji || "🌱"}</div>`;

    const description = product.description || "Quality agricultural product.";
    const crops = product.crops || product.plants || "Suitable crops depend on the product.";
    const soil = product.soil || "Check suitability for your soil type.";

    showModal(
        "Product Details",
        `
        ${image}
        <h3>${escapeHTML(product.name)}</h3>
        <p><b>Category:</b> ${escapeHTML(product.category || "Agriculture")}</p>
        <p><b>Price:</b> ${money(product.price)} / ${escapeHTML(product.unit || "unit")}</p>
        <p><b>Available stock:</b> ${Number(product.stock || 0)}</p>
        <p><b>Description:</b> ${escapeHTML(description)}</p>
        <p><b>Suitable crops:</b> ${escapeHTML(crops)}</p>
        <p><b>Soil suitability:</b> ${escapeHTML(soil)}</p>
        <p><b>Delivery:</b> Available subject to delivery location.</p>

        <label for="detailQty">Quantity:</label>
        <input id="detailQty" type="number" min="1"
            max="${Number(product.stock || 1)}" value="1">

        <button type="button" id="detailAddBtn">Add to Cart</button>
        <button type="button" id="detailBuyBtn">Buy Now</button>
        `
    );

    document.getElementById("detailAddBtn").onclick = function () {
        const quantity = Number(document.getElementById("detailQty").value);

        if (!Number.isInteger(quantity) || quantity < 1) {
            alert("Enter a valid quantity.");
            return;
        }

        addToCart(product.id, quantity);
        closeModal();
    };

    document.getElementById("detailBuyBtn").onclick = function () {
        const quantity = Number(document.getElementById("detailQty").value);

        if (!Number.isInteger(quantity) || quantity < 1) {
            alert("Enter a valid quantity.");
            return;
        }

        addToCart(product.id, quantity);
        closeModal();
        openCart();
    };
}

// 18. ADD PRODUCT TO CART

function addToCart(productId, quantity = 1) {
    const product = getProduct(productId);

    if (!product) {
        alert("Product not found.");
        return;
    }

    quantity = Number(quantity);

    if (!Number.isInteger(quantity) || quantity < 1) {
        alert("Please enter a valid quantity.");
        return;
    }

    const stock = Number(product.stock || 0);

    if (stock < 1) {
        alert("This product is out of stock.");
        return;
    }

    const existing = cart.find(item =>
        String(item.id) === String(productId)
    );

    const currentQuantity = existing ? Number(existing.quantity) : 0;

    if (currentQuantity + quantity > stock) {
        alert("Only " + stock + " units are available.");
        return;
    }

    if (existing) {
        existing.quantity += quantity;
    } else {
        cart.push({
            id: product.id,
            quantity: quantity
        });
    }

    saveCart();
    alert("Product added to cart successfully!");
}

// 19. CHANGE CART QUANTITY

function changeCartQuantity(productId, change) {
    const item = cart.find(item =>
        String(item.id) === String(productId)
    );

    const product = getProduct(productId);

    if (!item || !product) return;

    const newQuantity = Number(item.quantity) + change;

    if (newQuantity < 1) {
        removeFromCart(productId);
        return;
    }

    if (newQuantity > Number(product.stock || 0)) {
        alert("Available stock is only " + product.stock);
        return;
    }

    item.quantity = newQuantity;
    saveCart();
    openCart();
}

// 20. REMOVE PRODUCT FROM CART

function removeFromCart(productId) {
    cart = cart.filter(item =>
        String(item.id) !== String(productId)
    );

    saveCart();
    openCart();
}

// 21. DISPLAY CART

function openCart() {
    if (cart.length === 0) {
        showModal(
            "Your Shopping Cart",
            `
            <p>Your cart is empty.</p>
            <button type="button" onclick="closeModal()">Continue Shopping</button>
            `
        );
        return;
    }

    let subtotal = 0;
    let cartHTML = "";

    cart.forEach(item => {
        const product = getProduct(item.id);

        if (!product) return;

        const quantity = Number(item.quantity);
        const total = Number(product.price) * quantity;

        subtotal += total;

        cartHTML += `
            <div class="cart-item">
                <h3>${escapeHTML(product.name)}</h3>
                <p>${money(product.price)} × ${quantity}</p>
                <p><b>Amount: ${money(total)}</b></p>

                <button type="button"
                    onclick="changeCartQuantity('${String(product.id)}', -1)">
                    −
                </button>

                <span>${quantity}</span>

                <button type="button"
                    onclick="changeCartQuantity('${String(product.id)}', 1)">
                    +
                </button>

                <button type="button"
                    onclick="removeFromCart('${String(product.id)}')">
                    Remove
                </button>
            </div>
            <hr>
        `;
    });

    cartHTML += `
        <h3>Subtotal: ${money(subtotal)}</h3>
        <p>Delivery charge will be calculated after entering your address.</p>

        <button type="button" id="checkoutBtn">Proceed to Checkout</button>
        <button type="button" onclick="closeModal()">Continue Shopping</button>
    `;

    showModal("Your Shopping Cart", cartHTML);

    document.getElementById("checkoutBtn").onclick = function () {
        closeModal();
        startCheckout();
    };
}

// 22. FIREBASE PHONE OTP LOGIN

let confirmationResult = null;
let recaptchaVerifier = null;
let pendingProfile = null;

function openLogin() {
    showModal(
        "AgroMart Login / Registration",
        `
        <p>Enter your details to receive a verification OTP.</p>

        <label>Username</label>
        <input type="text" id="authUsername"
            placeholder="Enter your name">

        <label>Mobile Number</label>
        <input type="tel" id="authPhone"
            placeholder="10-digit mobile number"
            maxlength="10">

        <label>Email Address</label>
        <input type="email" id="authEmail"
            placeholder="Enter your email">

        <label>Permanent Address</label>
        <textarea id="authAddress"
            placeholder="Enter your complete address"></textarea>

        <div id="recaptcha-container"></div>

        <button type="button" id="sendOtpBtn">Send OTP</button>

        <div id="otpArea" style="display:none;">
            <label>Enter OTP</label>
            <input type="text" id="authOtp"
                placeholder="Enter 6-digit OTP"
                maxlength="6">

            <button type="button" id="verifyOtpBtn">Verify OTP</button>
        </div>

        <p id="authMessage"></p>
        `
    );

    document.getElementById("sendOtpBtn").onclick = sendPhoneOTP;
}

async function sendPhoneOTP() {
    const username = document.getElementById("authUsername").value.trim();
    const phone = document.getElementById("authPhone").value.trim();
    const email = document.getElementById("authEmail").value.trim();
    const address = document.getElementById("authAddress").value.trim();
    const message = document.getElementById("authMessage");

    if (!username || !phone || !email || !address) {
        message.textContent = "Please fill in all registration details.";
        return;
    }

    if (!/^[6-9]\d{9}$/.test(phone)) {
        message.textContent = "Enter a valid 10-digit Indian mobile number.";
        return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        message.textContent = "Enter a valid email address.";
        return;
    }

    if (!window.firebase || !window.firebaseAuth) {
        message.textContent = "Firebase is not configured. Check firebase-config.js.";
        return;
    }

    pendingProfile = {
        username: username,
        phone: "+91" + phone,
        email: email,
        address: address
    };

    try {
        message.textContent = "Preparing phone verification...";

        if (!recaptchaVerifier) {
            recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
                "recaptcha-container",
                { size: "normal" }
            );

            await recaptchaVerifier.render();
        }

        confirmationResult = await firebaseAuth.signInWithPhoneNumber(
            pendingProfile.phone,
            recaptchaVerifier
        );

        document.getElementById("otpArea").style.display = "block";
        message.textContent = "OTP sent. Check your phone.";
    } catch (error) {
        console.error(error);
        message.textContent = error.message || "Unable to send OTP.";
        
        if (recaptchaVerifier) {
            recaptchaVerifier.clear();
            recaptchaVerifier = null;
        }
    }
}

// 23. VERIFY OTP

async function verifyPhoneOTP() {
    const otp = document.getElementById("authOtp").value.trim();
    const message = document.getElementById("authMessage");

    if (!/^\d{6}$/.test(otp)) {
        message.textContent = "Enter the 6-digit OTP.";
        return;
    }

    if (!confirmationResult) {
        message.textContent = "Please request an OTP first.";
        return;
    }

    try {
        message.textContent = "Verifying OTP...";

        const result = await confirmationResult.confirm(otp);

        currentUser = {
            uid: result.user.uid,
            username: pendingProfile.username,
            phone: pendingProfile.phone,
            email: pendingProfile.email,
            address: pendingProfile.address
        };

        saveProfile(currentUser);

        message.textContent = "Phone number verified successfully!";
        updateLoginButton();

        alert("Welcome to AgroMart, " + currentUser.username + "!");
        closeModal();

    } catch (error) {
        console.error(error);
        message.textContent = "OTP verification failed. Check the OTP and try again.";
    }
}

// 24. LOGIN BUTTON DISPLAY

function updateLoginButton() {
    const loginButton = document.getElementById("loginBtn");

    if (!loginButton) return;

    if (currentUser) {
        loginButton.textContent = "Hi, " + currentUser.username;
    } else {
        loginButton.textContent = "Login";
    }
}

// 25. LOGOUT

function logoutUser() {
    if (!confirm("Do you want to logout?")) return;

    if (window.firebaseAuth) {
        firebaseAuth.signOut().catch(console.error);
    }

    currentUser = null;
    localStorage.removeItem(USER_KEY);

    updateLoginButton();
    alert("You have logged out.");
}

// 26. CONNECT OTP BUTTON

document.addEventListener("click", function (event) {
    if (event.target && event.target.id === "verifyOtpBtn") {
        verifyPhoneOTP();
    }
});

// PART 2 ENDS HERE.
// PART 3 WILL CONTINUE BELOW THIS CODE.
                          /* =====================================
   PART 3 OF 3
   CHECKOUT, DELIVERY AND ORDERS
===================================== */

// 27. CALCULATE DISTANCE BETWEEN TWO LOCATIONS

function calculateDistance(lat1, lon1, lat2, lon2) {
    const earthRadius = 6371;

    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) *
        Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return earthRadius * c;
}

// 28. GET CUSTOMER LOCATION USING ADDRESS

async function getCoordinates(address) {
    const url =
        "https://nominatim.openstreetmap.org/search?format=json&limit=1&q=" +
        encodeURIComponent(address);

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error("Unable to check the delivery address.");
    }

    const data = await response.json();

    if (!data || data.length === 0) {
        throw new Error("Address not found. Please enter a more complete address.");
    }

    return {
        lat: Number(data[0].lat),
        lon: Number(data[0].lon)
    };
}

// 29. CALCULATE DELIVERY CHARGE

async function calculateDeliveryCharge(address) {
    const location = await getCoordinates(address);

    const distance = calculateDistance(
        STORE_LAT,
        STORE_LON,
        location.lat,
        location.lon
    );

    const charge = Math.ceil(distance * DELIVERY_RATE);

    return {
        distance: distance,
        charge: charge
    };
}

// 30. START CHECKOUT

function startCheckout() {
    if (!cart || cart.length === 0) {
        alert("Your cart is empty.");
        return;
    }

    if (!currentUser) {
        alert("Please login before placing an order.");
        openLogin();
        return;
    }

    let subtotal = 0;
    let itemsHTML = "";

    cart.forEach(item => {
        const product = getProduct(item.id);

        if (!product) return;

        const quantity = Number(item.quantity);
        const itemTotal = Number(product.price) * quantity;

        subtotal += itemTotal;

        itemsHTML += `
            <p>
                ${escapeHTML(product.name)}
                × ${quantity}
                — <b>${money(itemTotal)}</b>
            </p>
        `;
    });

    showModal(
        "Checkout",
        `
        <h3>Order Summary</h3>
        ${itemsHTML}

        <h3>Subtotal: ${money(subtotal)}</h3>

        <hr>

        <h3>Delivery Details</h3>

        <label>Customer Name</label>
        <input type="text" id="deliveryName"
            value="${escapeHTML(currentUser.username || "")}">

        <label>Mobile Number</label>
        <input type="tel" id="deliveryPhone"
            value="${escapeHTML(currentUser.phone || "")}"
            readonly>

        <label>Delivery Address</label>
        <textarea id="deliveryAddress"
            placeholder="Enter complete delivery address">${escapeHTML(currentUser.address || "")}</textarea>

        <h3>Payment Method</h3>

        <label>
            <input type="radio" name="paymentMethod"
                value="UPI" checked>
            UPI
        </label>

        <label>
            <input type="radio" name="paymentMethod"
                value="Card">
            Debit / Credit Card
        </label>

        <label>
            <input type="radio" name="paymentMethod"
                value="Cash on Delivery">
            Cash on Delivery
        </label>

        <p id="deliveryMessage">
            Delivery charge will be calculated after entering your address.
        </p>

        <button type="button" id="calculateDeliveryBtn">
            Calculate Delivery Charge
        </button>

        <div id="finalBill"></div>

        <button type="button" id="placeOrderBtn" disabled>
            Confirm Order
        </button>
        `
    );

    document.getElementById("calculateDeliveryBtn").onclick =
        calculateCheckoutDelivery;
}

// 31. CHECK DELIVERY AND DISPLAY FINAL BILL

let checkoutDelivery = null;

async function calculateCheckoutDelivery() {
    const address = document.getElementById("deliveryAddress").value.trim();
    const message = document.getElementById("deliveryMessage");
    const finalBill = document.getElementById("finalBill");
    const placeButton = document.getElementById("placeOrderBtn");

    if (!address) {
        message.textContent = "Please enter your complete delivery address.";
        return;
    }

    message.textContent = "Checking your delivery location...";
    finalBill.innerHTML = "";
    placeButton.disabled = true;
    checkoutDelivery = null;

    try {
        const result = await calculateDeliveryCharge(address);

        let subtotal = 0;

        cart.forEach(item => {
            const product = getProduct(item.id);
            if (product) {
                subtotal += Number(product.price) * Number(item.quantity);
            }
        });

        const total = subtotal + result.charge;

        checkoutDelivery = {
            distance: result.distance,
            charge: result.charge,
            subtotal: subtotal,
            total: total,
            address: address
        };

        message.textContent =
            "Approximate straight-line distance: " +
            result.distance.toFixed(2) + " km";

        finalBill.innerHTML = `
            <hr>
            <h3>Final Bill</h3>
            <p>Product total: ${money(subtotal)}</p>
            <p>Approximate distance: ${result.distance.toFixed(2)} km</p>
            <p>Delivery charge: ${money(result.charge)}</p>
            <h3>Grand Total: ${money(total)}</h3>
        `;

        placeButton.disabled = false;

        placeButton.onclick = placeOrder;

    } catch (error) {
        console.error(error);
        message.textContent =
            error.message || "Could not calculate delivery. Check your address and try again.";
    }
}

// 32. PLACE ORDER

function placeOrder() {
    if (!currentUser) {
        alert("Please login before placing your order.");
        closeModal();
        openLogin();
        return;
    }

    if (!checkoutDelivery) {
        alert("Please calculate the delivery charge first.");
        return;
    }

    const name = document.getElementById("deliveryName").value.trim();
    const phone = document.getElementById("deliveryPhone").value.trim();
    const address = document.getElementById("deliveryAddress").value.trim();

    const paymentElement =
        document.querySelector('input[name="paymentMethod"]:checked');

    if (!name || !phone || !address) {
        alert("Please complete all delivery details.");
        return;
    }

    if (!paymentElement) {
        alert("Please select a payment method.");
        return;
    }

    // Check stock again before confirming the order.

    for (const item of cart) {
        const product = getProduct(item.id);

        if (!product || Number(item.quantity) > Number(product.stock || 0)) {
            alert("Stock is insufficient for " +
                (product ? product.name : "a product") +
                ". Please update your cart.");
            return;
        }
    }

    const orderId =
        "AGRO" + Date.now().toString();

    const orderItems = cart.map(item => {
        const product = getProduct(item.id);

        return {
            id: product.id,
            name: product.name,
            price: Number(product.price),
            unit: product.unit || "unit",
            quantity: Number(item.quantity),
            total: Number(product.price) * Number(item.quantity)
        };
    });

    const order = {
        orderId: orderId,
        date: new Date().toLocaleString("en-IN"),
        customerName: name,
        phone: phone,
        address: address,
        items: orderItems,
        subtotal: checkoutDelivery.subtotal,
        distanceKm: Number(checkoutDelivery.distance.toFixed(2)),
        deliveryCharge: checkoutDelivery.charge,
        grandTotal: checkoutDelivery.total,
        paymentMethod: paymentElement.value,
        paymentStatus:
            paymentElement.value === "Cash on Delivery"
                ? "Pay on delivery"
                : "Payment not processed",
        status: "Order Confirmed",
        estimatedDelivery: "Expected within approximately 3 days"
    };

    // Save orders in this browser.

    let orders = [];

    try {
        orders = JSON.parse(localStorage.getItem("agromart_orders")) || [];
    } catch (error) {
        orders = [];
    }

    orders.push(order);

    localStorage.setItem("agromart_orders", JSON.stringify(orders));

    // Clear cart after successful order confirmation.

    cart = [];
    saveCart();

    checkoutDelivery = null;

    closeModal();

    showModal(
        "Order Confirmed!",
        `
        <h2>Thank you for shopping with AgroMart!</h2>

        <p><b>Order ID:</b> ${escapeHTML(order.orderId)}</p>
        <p><b>Customer:</b> ${escapeHTML(order.customerName)}</p>
        <p><b>Mobile:</b> ${escapeHTML(order.phone)}</p>
        <p><b>Delivery Address:</b> ${escapeHTML(order.address)}</p>

        <hr>

        <h3>Ordered Products</h3>

        ${order.items.map(item => `
            <p>
                ${escapeHTML(item.name)}
                × ${item.quantity}
                — ${money(item.total)}
            </p>
        `).join("")}

        <hr>

        <p>Product total: ${money(order.subtotal)}</p>
        <p>Delivery charge: ${money(order.deliveryCharge)}</p>
        <h2>Grand Total: ${money(order.grandTotal)}</h2>

        <p><b>Payment:</b> ${escapeHTML(order.paymentMethod)}</p>
        <p><b>Status:</b> ${escapeHTML(order.status)}</p>
        <p><b>Delivery:</b> ${escapeHTML(order.estimatedDelivery)}</p>

        <button type="button" onclick="closeModal()">
            Continue Shopping
        </button>
        `
    );

    updateCartCount();
}

// 33. DISPLAY CUSTOMER ORDERS

function viewMyOrders() {
    let orders = [];

    try {
        orders = JSON.parse(localStorage.getItem("agromart_orders")) || [];
    } catch (error) {
        orders = [];
    }

    if (!currentUser) {
        alert("Please login to view your orders.");
        openLogin();
        return;
    }

    const myOrders = orders.filter(order =>
        order.phone === currentUser.phone
    );

    if (myOrders.length === 0) {
        showModal(
            "My Orders",
            "<p>You have not placed any orders yet.</p>"
        );
        return;
    }

    let html = "";

    myOrders.slice().reverse().forEach(order => {
        html += `
            <div class="order-item">
                <h3>Order: ${escapeHTML(order.orderId)}</h3>
                <p>Date: ${escapeHTML(order.date)}</p>
                <p>Status: ${escapeHTML(order.status)}</p>
                <p>Payment: ${escapeHTML(order.paymentMethod)}</p>
                <p><b>Total: ${money(order.grandTotal)}</b></p>
                <hr>
            </div>
        `;
    });

    showModal("My Orders", html);
}

/* 34. CONNECT WEBSITE BUTTONS */

// Do not add another DOMContentLoaded event here.

const loginButton = document.getElementById("loginBtn");
const cartButton = document.getElementById("cartBtn");
const menuButton = document.getElementById("menuBtn");

if (loginButton) {
    loginButton.addEventListener("click", function () {
        if (currentUser) {
            showModal(
                "My Account",
                `
                <p>Name: ${escapeHTML(currentUser.username || "")}</p>
                <p>Mobile: ${escapeHTML(currentUser.phone || "")}</p>
                <p>Email: ${escapeHTML(currentUser.email || "")}</p>
                <p>Address: ${escapeHTML(currentUser.address || "")}</p>
                <button onclick="viewMyOrders()">My Orders</button>
                <button onclick="logoutUser()">Logout</button>
                `
            );
        } else {
            openLogin();
        }
    });
}

if (cartButton) {
    cartButton.addEventListener("click", openCart);
}

if (menuButton) {
    menuButton.addEventListener("click", function () {
        const menu = document.getElementById("menu");
        if (menu) menu.classList.toggle("active");
    });
}

updateCartCount();
updateLoginButton();

// 35. MAKE FUNCTIONS AVAILABLE TO HTML BUTTONS

window.viewProduct = viewProduct;
window.addToCart = addToCart;
window.openCart = openCart;
window.closeModal = closeModal;
window.changeCartQuantity = changeCartQuantity;
window.removeFromCart = removeFromCart;
window.openLogin = openLogin;
window.viewMyOrders = viewMyOrders;
window.logoutUser = logoutUser;
window.startCheckout = startCheckout;

// 36. INITIALIZE AGROMART

if (typeof renderProducts === "function") {
    renderProducts();
}

if (typeof renderFeaturedProducts === "function") {
    renderFeaturedProducts();
}

updateCartCount();
updateLoginButton();

/* =====================================
   END OF AGROMART SCRIPT.JS
===================================== */

});
