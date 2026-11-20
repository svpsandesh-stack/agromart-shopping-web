/* ==========================================
   AGROMART - AGRICULTURE E-COMMERCE
   FILE 4: script.js

   Compatible with:
   FILE 1: index.html
   FILE 2: style.css
   FILE 3: products.js

   Do not declare PRODUCTS again.
========================================== */


/* ==========================================
   1. CHECK PRODUCT DATABASE
========================================== */

document.addEventListener("DOMContentLoaded", function () {

    if (!Array.isArray(window.PRODUCTS)) {

        alert(
            "Product database not found! " +
            "Please connect products.js before script.js."
        );

        return;
    }

    const PRODUCTS = window.PRODUCTS;

    console.log("AGROMART website started.");
    console.log("Products loaded:", PRODUCTS.length);


    /* ======================================
       2. GET HTML ELEMENTS
    ====================================== */

    const menuBtn =
        document.getElementById("menuBtn");

    const closeMenuBtn =
        document.getElementById("closeMenuBtn");

    const sideMenu =
        document.getElementById("sideMenu");

    const menuOverlay =
        document.getElementById("menuOverlay");

    const searchInput =
        document.getElementById("searchInput");

    const searchBtn =
        document.getElementById("searchBtn");

    const productContainer =
        document.getElementById("productContainer");

    const featuredProducts =
        document.getElementById("featuredProducts");

    const productHeading =
        document.getElementById("productHeading");

    const noProducts =
        document.getElementById("noProducts");

    const sortProducts =
        document.getElementById("sortProducts");

    const cartBtn =
        document.getElementById("cartBtn");

    const cartCount =
        document.getElementById("cartCount");

    const loginBtn =
        document.getElementById("loginBtn");

    const authModal =
        document.getElementById("authModal");

    const closeAuthBtn =
        document.getElementById("closeAuthBtn");

    const openLoginBtn =
        document.getElementById("openLoginBtn");

    const openRegisterBtn =
        document.getElementById("openRegisterBtn");


    /* ======================================
       3. WEBSITE STATE
    ====================================== */

    let currentCategory = "All";

    let currentSearch = "";

    let currentSort = "default";

    let cart = loadCart();


    /* ======================================
       4. SAFE HTML TEXT
    ====================================== */

    function escapeHTML(value) {

        return String(value ?? "").replace(
            /[&<>"']/g,
            function (character) {

                const entities = {

                    "&": "&amp;",
                    "<": "&lt;",
                    ">": "&gt;",
                    '"': "&quot;",
                    "'": "&#39;"

                };

                return entities[character];

            }
        );

    }


    /* ======================================
       5. CART STORAGE
    ====================================== */

    function loadCart() {

        try {

            const saved =
                localStorage.getItem("agromart_cart");

            const parsed =
                saved ? JSON.parse(saved) : [];

            if (!Array.isArray(parsed)) {
                return [];
            }

            return parsed.filter(item => {

                return PRODUCTS.some(product =>
                    product.id === Number(item.id)
                ) && Number.isInteger(Number(item.quantity))
                && Number(item.quantity) > 0;

            }).map(item => ({

                id: Number(item.id),

                quantity: Number(item.quantity)

            }));

        } catch (error) {

            console.error("Cart loading error:", error);

            return [];

        }

    }


    function saveCart() {

        try {

            localStorage.setItem(
                "agromart_cart",
                JSON.stringify(cart)
            );

        } catch (error) {

            console.error("Cart saving error:", error);

            alert(
                "Unable to save your cart. " +
                "Please check browser storage."
            );

        }

    }


    /* ======================================
       6. MENU FUNCTIONS
    ====================================== */

    function openMenu() {

        sideMenu.classList.add("active");

        menuOverlay.classList.add("active");

        menuBtn.setAttribute(
            "aria-expanded",
            "true"
        );

    }


    function closeMenu() {

        sideMenu.classList.remove("active");

        menuOverlay.classList.remove("active");

        menuBtn.setAttribute(
            "aria-expanded",
            "false"
        );

    }


    menuBtn.addEventListener("click", openMenu);

    closeMenuBtn.addEventListener("click", closeMenu);

    menuOverlay.addEventListener("click", closeMenu);


    document.addEventListener("keydown", function (event) {

        if (event.key === "Escape") {

            closeMenu();

            closeAuthModal();

            closeDynamicModal();

        }

    });


    /* ======================================
       7. PRODUCT CATEGORY
    ====================================== */

    function filterCategory(category) {

        currentCategory = category;

        currentSearch = "";

        searchInput.value = "";

        productHeading.textContent =
            category === "All"
                ? "All Agricultural Products"
                : category + " Products";

        renderProducts();

        document.getElementById("products").scrollIntoView({
            behavior: "smooth"
        });

    }


    document.querySelectorAll(".category-card")
        .forEach(button => {

            button.addEventListener("click", function () {

                const category =
                    this.dataset.category;

                filterCategory(category);

            });

        });


    document.querySelectorAll("[data-category-link]")
        .forEach(link => {

            link.addEventListener("click", function () {

                const category =
                    this.dataset.categoryLink;

                closeMenu();

                filterCategory(category);

            });

        });


    /* ======================================
       8. SEARCH PRODUCTS
    ====================================== */

    function performSearch() {

        currentSearch =
            searchInput.value.trim();

        currentCategory = "All";

        productHeading.textContent =
            currentSearch
                ? 'Search Results: "' + currentSearch + '"'
                : "All Agricultural Products";

        renderProducts();

        document.getElementById("products").scrollIntoView({
            behavior: "smooth"
        });

    }


    searchBtn.addEventListener(
        "click",
        performSearch
    );


    searchInput.addEventListener("keydown", function (event) {

        if (event.key === "Enter") {

            performSearch();

        }

    });


    /* ======================================
       9. GET FILTERED PRODUCTS
    ====================================== */

    function getVisibleProducts() {

        let result = [...PRODUCTS];

        if (currentCategory !== "All") {

            result = result.filter(product => {

                return product.category === currentCategory;

            });

        }

        if (currentSearch) {

            const search =
                currentSearch.toLowerCase();

            result = result.filter(product => {

                return (

                    product.name.toLowerCase().includes(search) ||

                    product.category.toLowerCase().includes(search) ||

                    product.description.toLowerCase().includes(search) ||

                    product.crops.toLowerCase().includes(search) ||

                    product.soil.toLowerCase().includes(search)

                );

            });

        }

        if (currentSort === "low") {

            result.sort((a, b) => a.price - b.price);

        } else if (currentSort === "high") {

            result.sort((a, b) => b.price - a.price);

        } else if (currentSort === "name") {

            result.sort((a, b) =>
                a.name.localeCompare(b.name)
            );

        }

        return result;

    }


    /* ======================================
       10. PRODUCT CARD DESIGN
    ====================================== */

    function createProductCard(product) {

        const outOfStock =
            product.stock <= 0;

        const image =
            escapeHTML(product.image);

        const name =
            escapeHTML(product.name);

        const category =
            escapeHTML(product.category);

        return `

        <article class="product-card">

            <img
                class="product-image"
                src="${image}"
                alt="${name}"
                loading="lazy"
                onerror="this.style.display='none'"
            >

            <div class="product-info">

                <p class="product-category">
                    ${category}
                </p>

                <h3>${name}</h3>

                <p class="product-price">
                    Rs. ${Number(product.price).toFixed(2)}
                    / ${escapeHTML(product.unit)}
                </p>

                <p class="product-stock
                    ${outOfStock ? "out-of-stock" : ""}">

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


    /* ======================================
       11. DISPLAY ALL PRODUCTS
    ====================================== */

    function renderProducts() {

        const visibleProducts =
            getVisibleProducts();

        if (visibleProducts.length === 0) {

            productContainer.innerHTML = "";

            noProducts.hidden = false;

            return;

        }

        noProducts.hidden = true;

        productContainer.innerHTML =
            visibleProducts.map(createProductCard).join("");

    }


    /* ======================================
       12. FEATURED PRODUCTS
    ====================================== */

    function renderFeaturedProducts() {

        const featured =
            PRODUCTS.filter(product => product.featured);

        featuredProducts.innerHTML =
            featured.map(createProductCard).join("");

    }


    /* ======================================
       13. PRODUCT SORTING
    ====================================== */

    sortProducts.addEventListener("change", function () {

        currentSort = this.value;

        renderProducts();

    });


    /* ======================================
       14. DYNAMIC MODAL
    ====================================== */

    let dynamicModal = null;


    function createDynamicModal() {

        if (dynamicModal) {
            return dynamicModal;
        }

        dynamicModal =
            document.createElement("div");

        dynamicModal.id = "dynamicModal";

        dynamicModal.className = "modal";

        dynamicModal.hidden = true;

        dynamicModal.innerHTML = `

            <div class="modal-content"
                 id="dynamicModalContent">

                <button
                    class="close-btn"
                    id="dynamicCloseBtn"
                    aria-label="Close"
                >
                    ✕
                </button>

                <div id="dynamicModalBody"></div>

            </div>

        `;

        document.body.appendChild(dynamicModal);

        dynamicModal.addEventListener("click", function (event) {

            if (event.target === dynamicModal) {

                closeDynamicModal();

            }

        });

        document.getElementById("dynamicCloseBtn")
            .addEventListener("click", closeDynamicModal);

        return dynamicModal;

    }


    function openDynamicModal(content) {

        createDynamicModal();

        document.getElementById("dynamicModalBody")
            .innerHTML = content;

        dynamicModal.hidden = false;

        document.body.style.overflow = "hidden";

    }


    function closeDynamicModal() {

        if (dynamicModal) {

            dynamicModal.hidden = true;

            document.body.style.overflow = "";

        }

    }


    /* ======================================
       15. PRODUCT DETAILS
    ====================================== */

    function showProductDetails(id) {

        const product =
            window.getProductById(id);

        if (!product) {

            alert("Product not found.");

            return;

        }

        const similar =
            PRODUCTS.filter(item => {

                return (

                    item.category === product.category &&

                    item.id !== product.id

                );

            }).slice(0, 4);


        const content = `

            <div class="detail-page">

                <h2>${escapeHTML(product.name)}</h2>

                <img
                    src="${escapeHTML(product.image)}"
                    alt="${escapeHTML(product.name)}"
                    style="
                        width:100%;
                        max-height:220px;
                        object-fit:cover;
                        border-radius:10px;
                        margin:15px 0;
                    "
                    onerror="this.style.display='none'"
                >

                <p><strong>Product ID:</strong> ${product.id}</p>

                <p><strong>Category:</strong>
                    ${escapeHTML(product.category)}
                </p>

                <p><strong>Price:</strong>
                    Rs. ${Number(product.price).toFixed(2)}
                    per ${escapeHTML(product.unit)}
                </p>

                <p><strong>Availability:</strong>
                    ${product.stock > 0 ? "In Stock" : "Out of Stock"}
                </p>

                <p><strong>Available Stock:</strong>
                    ${product.stock} ${escapeHTML(product.unit)}
                </p>

                <p><strong>Description:</strong>
                    ${escapeHTML(product.description)}
                </p>

                <p><strong>Suitable Crops:</strong>
                    ${escapeHTML(product.crops)}
                </p>

                <p><strong>Suitable Soil:</strong>
                    ${escapeHTML(product.soil)}
                </p>

                <p><strong>Delivery Availability:</strong>
                    ${product.deliveryAvailable ? "Available (subject to address)" : "Not available"}
                </p>

                <p><strong>Estimated Delivery:</strong>
                    ${escapeHTML(product.deliveryEstimate)}
                </p>

                <p><strong>Rating:</strong>
                    ⭐ ${Number(product.rating).toFixed(1)} / 5
                </p>

                <button
                    class="add-cart-btn"
                    data-action="add"
                    data-id="${product.id}"
                    ${product.stock <= 0 ? "disabled" : ""}
                >
                    🛒 Add to Cart
                </button>

                <button
                    class="view-btn"
                    style="margin-top:10px"
                    data-action="buy"
                    data-id="${product.id}"
                    ${product.stock <= 0 ? "disabled" : ""}
                >
                    Buy Now
                </button>

                <hr style="margin:22px 0">

                <h3 style="color:#176b38">
                    Similar Products
                </h3>

                <div class="similar-products"
                     style="
                        display:grid;
                        grid-template-columns:repeat(2,minmax(0,1fr));
                        gap:12px;
                        margin-top:15px;
                     ">

                    ${similar.map(item => `

                        <div style="
                            border:1px solid #ddd;
                            border-radius:8px;
                            padding:10px;
                        ">

                            <img
                                src="${escapeHTML(item.image)}"
                                alt="${escapeHTML(item.name)}"
                                style="
                                    width:100%;
                                    height:85px;
                                    object-fit:cover;
                                    border-radius:6px;
                                "
                                onerror="this.style.display='none'"
                            >

                            <p><strong>
                                ${escapeHTML(item.name)}
                            </strong></p>

                            <p>
                                Rs. ${Number(item.price).toFixed(2)}
                            </p>

                            <button
                                class="view-btn"
                                data-action="view"
                                data-id="${item.id}"
                            >
                                View Details
                            </button>

                        </div>

                    `).join("")}

                </div>

            </div>

        `;

        openDynamicModal(content);

    }


    /* ======================================
       16. ADD PRODUCT TO CART
    ====================================== */

    function addToCart(id) {

        const product =
            window.getProductById(id);

        if (!product) {

            alert("Product not found.");

            return;

        }

        if (product.stock <= 0) {

            alert("This product is out of stock.");

            return;

        }

        const existing =
            cart.find(item => item.id === product.id);

        if (existing) {

            if (existing.quantity >= product.stock) {

                alert("Maximum available stock reached.");

                return;

            }

            existing.quantity++;

        } else {

            cart.push({

                id: product.id,

                quantity: 1

            });

        }

        saveCart();

        updateCartCount();

        alert(product.name + " added to your cart!");

    }


    /* ======================================
       17. CART COUNT
    ====================================== */

    function updateCartCount() {

        const total = cart.redu
