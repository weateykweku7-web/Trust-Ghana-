// TODO: Replace with your actual Firebase project config credentials from your Firebase Console
const firebaseConfig = {
    apiKey: "YOUR_FIREBASE_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

const ADMIN_WHATSAPP = "233553688108"; // Format: Country code + phone without leading zero

// DOM Elements
const productGrid = document.getElementById('productGrid');
const authModal = document.getElementById('authModal');
const postModal = document.getElementById('postModal');
const authBtn = document.getElementById('authBtn');
const postItemBtn = document.getElementById('postItemBtn');
const closeAuth = document.getElementById('closeAuth');
const closePost = document.getElementById('closePost');
const authForm = document.getElementById('authForm');
const postForm = document.getElementById('postForm');

// Modal Toggles
authBtn.onclick = () => authModal.style.display = "block";
postItemBtn.onclick = () => {
    if (!auth.currentUser) {
        alert("Please login first to post an item!");
        authModal.style.display = "block";
        return;
    }
    postModal.style.display = "block";
};
closeAuth.onclick = () => authModal.style.display = "none";
closePost.onclick = () => postModal.style.display = "none";

// Authentication State Listener
auth.onAuthStateChanged(user => {
    if (user) {
        authBtn.innerHTML = `<i class="fa fa-user-check"></i> ${user.email.split('@')[0]}`;
    } else {
        authBtn.innerHTML = `<i class="fa fa-user"></i> Account`;
    }
});

// Handle Email Authentication
let isLoginMode = true;
const toggleAuthMode = document.getElementById('toggleAuthMode');
toggleAuthMode.onclick = () => {
    isLoginMode = !isLoginMode;
    document.getElementById('authTitle').innerText = isLoginMode ? "Login" : "Register";
    toggleAuthMode.innerText = isLoginMode ? "Don't have an account? Register" : "Already have an account? Login";
};

authForm.onsubmit = async (e) => {
    e.preventDefault();
    const email = document.getElementById('authEmail').value;
    const password = document.getElementById('authPassword').value;
    try {
        if (isLoginMode) {
            await auth.signInWithEmailAndPassword(email, password);
            alert("Logged in successfully!");
        } else {
            await auth.createUserWithEmailAndPassword(email, password);
            alert("Account created successfully!");
        }
        authModal.style.display = "none";
    } catch (error) {
        alert(error.message);
    }
};

// Handle Product Submission (With Admin WhatsApp Notification Integration)
postForm.onsubmit = async (e) => {
    e.preventDefault();
    const name = document.getElementById('itemName').value;
    const category = document.getElementById('itemCategory').value;
    const price = document.getElementById('itemPrice').value;
    const image = document.getElementById('itemImage').value;
    const description = document.getElementById('itemDesc').value;
    const contact = document.getElementById('sellerContact').value;

    try {
        // Save product with 'approved: false' to enforce Admin Approval flow
        await db.collection('products').add({
            name,
            category,
            price: Number(price),
            image,
            description,
            contact,
            approved: false,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });

        postModal.style.display = "none";
        postForm.reset();

        // Trigger WhatsApp alert to Admin (You: 0553688108)
        const msg = encodeURIComponent(`Hello Admin, a new product "${name}" (Price: GHS ${price}) has been posted on Trust Ghana and requires your approval.`);
        window.open(`https://wa.me/${ADMIN_WHATSAPP}?text=${msg}`, '_blank');

        alert("Item submitted successfully! It will appear in the marketplace once approved by the admin.");
    } catch (error) {
        alert("Error posting item: " + error.message);
    }
};

// Fetch and Render Approved Products
function loadProducts() {
    db.collection('products').where('approved', '==', true).onSnapshot(snapshot => {
        productGrid.innerHTML = "";
        if (snapshot.empty) {
            productGrid.innerHTML = "<p>No active products found at the moment.</p>";
            return;
        }
        snapshot.forEach(doc => {
            const p = doc.data();
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            productCard.innerHTML = `
                <img src="${p.image}" alt="${p.name}">
                <div class="product-info">
                    <span class="product-title">${p.name}</span>
                    <span class="product-price">GHS ${p.price.toLocaleString()}</span>
                    <p style="font-size:12px; color:#666;">${p.description.substring(0, 50)}...</p>
                    <a class="whatsapp-buy-btn" href="https://wa.me/233${p.contact.replace(/^0/, '')}?text=Hello,%20I%20am%20interested%20in%20your%20item%20*${encodeURIComponent(p.name)}*%20listed%20on%20Trust%20Ghana%20for%20GHS%20${p.price}" target="_blank">
                        <i class="fa-brands fa-whatsapp"></i> Chat Seller
                    </a>
                </div>
            `;
            productGrid.appendChild(productCard);
        });
    });
}

// Initial Call
loadProducts();
