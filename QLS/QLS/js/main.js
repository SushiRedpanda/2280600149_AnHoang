document.addEventListener('DOMContentLoaded', function () {
    // Initialize add button event listener only if button exists
    const btnAdd = document.getElementById('btnAdd');
    if (btnAdd) {
        btnAdd.addEventListener('click', addProduct);
    }
    fetchProducts();

    // Add event delegation for delete, edit, and view buttons
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('delete-btn')) {
            deleteProduct(e.target.dataset.id);
        } else if (e.target.classList.contains('edit-btn')) {
            editProduct(e.target.dataset.id);
        } else if (e.target.classList.contains('view-btn')) {
            viewProduct(e.target.dataset.id);
        }
    });
});

function fetchProducts() {
    const apiUrl = 'https://localhost:7158/api/products';
    fetch(apiUrl)
        .then(handleResponse)
        .then(data => {
            if (data) displayProducts(data);
        })
        .catch(error => {
            console.error('Fetch error:', error.message);
            const productList = document.getElementById('productList');
            if (productList) {
                productList.innerHTML = '<tr><td colspan="5">Error loading products. Please try again later.</td></tr>';
            }
        });
}

// Handle fetch response, check for error, and parse JSON
function handleResponse(response) {
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
}

// Display products in the HTML table
function displayProducts(products) {
    const table = document.querySelector('table');
    let productList = document.getElementById('productList');
    
    // If table exists but tbody doesn't, create it
    if (table && !productList) {
        productList = document.createElement('tbody');
        productList.id = 'productList';
        table.appendChild(productList);
    }
    
    // If still no productList element, show error
    if (!productList) {
        console.error('Could not find or create table body element');
        return;
    }
    
    productList.innerHTML = ''; // Clear existing products
    if (Array.isArray(products)) {
        products.forEach(product => {
            productList.innerHTML += createProductRow(product);
        });
    } else {
        console.error('Products data is not an array:', products);
        productList.innerHTML = '<tr><td colspan="5">No products available</td></tr>';
    }
}

// Create HTML table row for a product
function createProductRow(product) {
    return `
        <tr>
            <td>${product.id}</td>
            <td>${product.name}</td>
            <td>${product.price}</td>
            <td>${product.description}</td>
            <td>
                <button class="btn btn-danger delete-btn" data-id="${product.id}">Delete</button>
                <button class="btn btn-warning edit-btn" data-id="${product.id}">Edit</button>
                <button class="btn btn-primary view-btn" data-id="${product.id}">View</button>
            </td>
        </tr>
    `;
}

// Add a new product
function addProduct() {
    const nameInput = document.getElementById('bookName');
    const priceInput = document.getElementById('price');
    const descInput = document.getElementById('description');

    if (!nameInput || !priceInput || !descInput) {
        console.error('Could not find one or more form input elements');
        return;
    }

    const productData = {
        name: nameInput.value,
        price: priceInput.value,
        description: descInput.value,
    };

    fetch('https://localhost:7158/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData),
    }).then(handleResponse)
    .then(data => {
        console.log('Product added:', data);
        fetchProducts(); // Refresh the product list
    })
    .catch(error => console.error('Error:', error));
}

function deleteProduct(id) {
    if (confirm('Are you sure you want to delete this product?')) {
        fetch(`https://localhost:7158/api/products/${id}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (response.status === 204) {
                fetchProducts(); // Refresh the list after deletion
            } else {
                throw new Error('Failed to delete product');
            }
        })
        .catch(error => console.error('Error:', error));
    }
}

function editProduct(id) {
    // First fetch the product details
    fetch(`https://localhost:7158/api/products/${id}`)
        .then(handleResponse)
        .then(product => {
            // Populate form fields
            document.getElementById('bookName').value = product.name;
            document.getElementById('price').value = product.price;
            document.getElementById('description').value = product.description;
            
            // Change add button to update button
            const btnAdd = document.getElementById('btnUpdate');
            btnAdd.textContent = 'Update Product';
            btnAdd.onclick = function() {
                updateProduct(id);
            };
        })
        .catch(error => console.error('Error:', error));
}

function updateProduct(id) {
    const productData = {
        id: id,
        name: document.getElementById('bookName').value,
        price: document.getElementById('price').value,
        description: document.getElementById('description').value
    };

    fetch(`https://localhost:7158/api/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData)
    })
    .then(response => {
        if (response.status === 204) {
            // Reset form and button
            document.getElementById('bookName').value = '';
            document.getElementById('price').value = '';
            document.getElementById('description').value = '';
            
            const btnAdd = document.getElementById('btnUpadate');
            btnAdd.textContent = 'Add Product';
            btnAdd.onclick = addProduct;
            
            fetchProducts(); // Refresh the list
        } else {
            throw new Error('Failed to update product');
        }
    })
    .catch(error => console.error('Error:', error));
}

function viewProduct(id) {
    fetch(`https://localhost:7158/api/products/${id}`)
        .then(handleResponse)
        .then(product => {
            // Create modal HTML
            const modalHtml = `
                <div class="modal fade" id="productModal" tabindex="-1">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title">Product Details</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                            </div>
                            <div class="modal-body">
                                <p><strong>ID:</strong> ${product.id}</p>
                                <p><strong>Name:</strong> ${product.name}</p>
                                <p><strong>Price:</strong> ${product.price}</p>
                                <p><strong>Description:</strong> ${product.description}</p>
                            </div>
                        </div>
                    </div>
                </div>
            `;

            // Remove existing modal if any
            const existingModal = document.getElementById('productModal');
            if (existingModal) {
                existingModal.remove();
            }

            // Add modal to document
            document.body.insertAdjacentHTML('beforeend', modalHtml);
            
            // Show modal using Bootstrap
            const modal = new bootstrap.Modal(document.getElementById('productModal'));
            modal.show();
        })
        .catch(error => console.error('Error:', error));
}   