:root {
    --primary-green: #0b5d35;
    --accent-red: #d93838;
    --accent-gold: #f4b41a;
    --bg-light: #f9f9f9;
    --text-dark: #333333;
}

* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

body {
    background-color: var(--bg-light);
    color: var(--text-dark);
}

header {
    background: #ffffff;
    padding: 15px 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 3px solid var(--accent-gold);
    box-shadow: 0 2px 5px rgba(0,0,0,0.05);
}

.logo-text {
    color: var(--primary-green);
    font-size: 24px;
}

.highlight {
    color: var(--accent-red);
}

.tagline {
    font-size: 11px;
    color: #666;
    letter-spacing: 1px;
}

.search-bar {
    display: flex;
    width: 40%;
}

.search-bar input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px 0 0 4px;
    outline: none;
}

.search-bar button {
    background: var(--primary-green);
    color: white;
    border: none;
    padding: 0 15px;
    border-radius: 0 4px 4px 0;
    cursor: pointer;
}

.nav-actions {
    display: flex;
    gap: 10px;
}

.btn {
    padding: 8px 15px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-weight: 600;
}

.primary-btn {
    background-color: var(--primary-green);
    color: white;
}

.secondary-btn {
    background-color: var(--accent-gold);
    color: #000;
}

.full-width {
    width: 100%;
    margin-top: 10px;
}

main {
    padding: 20px 40px;
}

.categories h2, .products-section h2 {
    margin-bottom: 15px;
    color: var(--primary-green);
}

.category-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 15px;
    margin-bottom: 30px;
}

.cat-card {
    background: white;
    padding: 20px;
    text-align: center;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.05);
    cursor: pointer;
    transition: transform 0.2s;
}

.cat-card:hover {
    transform: translateY(-3px);
    background: var(--primary-green);
    color: white;
}

.product-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 20px;
}

.product-card {
    background: white;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0,0,0,0.08);
    display: flex;
    flex-direction: column;
}

.product-card img {
    width: 100%;
    height: 160px;
    object-fit: cover;
}

.product-info {
    padding: 15px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    flex-grow: 1;
}

.product-title {
    font-size: 16px;
    font-weight: bold;
}

.product-price {
    color: var(--accent-red);
    font-weight: bold;
    font-size: 18px;
}

.whatsapp-buy-btn {
    background-color: #25d366;
    color: white;
    text-align: center;
    text-decoration: none;
    padding: 8px;
    border-radius: 4px;
    font-weight: bold;
    margin-top: auto;
}

/* Modals */
.modal {
    display: none;
    position: fixed;
    z-index: 1000;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.5);
}

.modal-content {
    background-color: white;
    margin: 10% auto;
    padding: 25px;
    border-radius: 8px;
    width: 90%;
    max-width: 400px;
    position: relative;
}

.close {
    position: absolute;
    right: 15px;
    top: 10px;
    font-size: 24px;
    cursor: pointer;
}

.modal-content input, .modal-content select, .modal-content textarea {
    width: 100%;
    padding: 10px;
    margin-top: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
}

footer {
    text-align: center;
    padding: 20px;
    background: #fff;
    margin-top: 40px;
    border-top: 1px solid #ddd;
    font-size: 13px;
}
