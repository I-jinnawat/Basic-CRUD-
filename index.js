const api = "http://localhost:3000/api/product";
let productData = [];
let addmodal;
let updatemodal;
let productId;
let productTable = document.getElementById('product-table').getElementsByTagName('tbody')[0];
let deleteConfirmationModal;

const loadData = async () => {
    try {
        const res = await axios.get(api);
        productData = res.data;
        renderTable();
    } catch (error) {
        console.error("Can't load Data:",error);
    }
};


//Show Table
const renderTable = () => {
    productTable.innerHTML = '';
    productData.forEach((product) => {
        const row = document.createElement('tr');
        row.dataset.productId = product._id;

        const updateButton = createButton('Edit', 'btn-primary', editProduct);
        const deleteButton = createButton('Trash', 'btn-danger', confirmDeleteProduct);

        const nameCell = createTableCell(product.name);
        const priceCell = createTableCell(product.price);
        const detailCell = createTableCell(product.detail);

        const buttonCell = document.createElement('td');
        buttonCell.appendChild(updateButton);
        buttonCell.appendChild(deleteButton);

        row.appendChild(buttonCell);
        row.appendChild(nameCell);
        row.appendChild(priceCell);
        row.appendChild(detailCell);

        productTable.appendChild(row);
    });
};

function createButton(text, className, clickHandler) {
    const button = document.createElement('button');
    button.innerHTML = `<i class="fas fa-${text.toLowerCase()}"></i>`;
    button.type = 'button';
    button.classList.add('btn', className, 'btn-sm');
    button.addEventListener('click', clickHandler);
    return button;
}

function createTableCell(text) {
    const cell = document.createElement('td');
    cell.textContent = text;
    return cell;
}

//WorkwhenSave
async function updateProduct(productId, updateData) {
    try {
        const res = await axios.put(`${api}/${productId}`, updateData);
        if (res.status === 200) {
            console.log("Product updated", res.data);
            const index = productData.findIndex(product => product._id === productId);
            if (index !== -1) {
                productData[index] = { ...productData[index], ...updateData };
                renderTable();
            }
        } else {
            console.log("Failed to update product:", res.statusText);
        }
    } catch (error) {
        console.log("Error updating product:", error);
    }
}

function showUpdatemodal() {  
    console.log("update modal")
    console.log(productId)
    updatemodal.show(); 
}

function editProduct(event) {
    productId = event.target.closest('tr').dataset.productId;
    const product = productData.find(product => product._id === productId);
    if (!product) {
        console.error("Error: Product not found");
        return;
    }
    const { name, price, detail } = product;
    populateModal(name, price, detail,updatemodal);
}

function populateModal(name, price, detail,clickHandler ) {
    console.log('populate')
    console.log(`${name}, ${price},${detail}`)
    const productNameInput = document.getElementById('productName');
    const productPriceInput = document.getElementById('productPrice');
    const productDetailTextarea = document.getElementById('productDetail');
    productNameInput.value = name;
    productPriceInput.value = price;
    productDetailTextarea.value = detail;
    
    clickHandler.show();
}

async function deleteProduct(productId) {
    try {
        const res = await axios.delete(`${api}/${productId}`);
        if (res.status === 200) {
            console.log("Product deleted");
            productData = productData.filter(product => product._id !== productId);
            renderTable();
        } else {
            console.log("Failed to delete product:", res.statusText);
        }
    } catch (error) {
        console.log("Error deleting product:", error);
    }
}

function confirmDeleteProduct(event) {
    productId = event.target.closest('tr').dataset.productId;
    deleteConfirmationModal.show();
}

document.getElementById('confirmDelete').addEventListener('click', function() {
    deleteProduct(productId);
    deleteConfirmationModal.hide();
});

async function createProduct(productData) {
    try {
        const res = await axios.post(api, productData);
        console.log("Response status:", res.status);
        if (res.status === 200 || res.status === 201) {
            console.log("Product created:", res.data);
            appendNewProduct(res.data); // Append the newly created product directly to the table
            addmodal.hide();
        } else {
            console.log("Failed to create product:", res.status);
        }
    } catch (error) {
        console.log("Error creating product:", error);
    }
}




function appendNewProduct(product) {
    const row = document.createElement('tr');
    row.dataset.productId = product._id;

    const updateButton = createButton('Edit', 'btn-primary', editProduct);
    const deleteButton = createButton('Trash', 'btn-danger', confirmDeleteProduct);

    const nameCell = createTableCell(product.name);
    const priceCell = createTableCell(product.price);
    const detailCell = createTableCell(product.detail);

    const buttonCell = document.createElement('td');
    buttonCell.appendChild(updateButton);
    buttonCell.appendChild(deleteButton);

    row.appendChild(buttonCell);
    row.appendChild(nameCell);
    row.appendChild(priceCell);
    row.appendChild(detailCell);

    productTable.appendChild(row);
}

function showAddProductModal() {
  addmodal.show();
}

document.getElementById('addProductButton').addEventListener('click', function() {  
    document.getElementById("UpdateModalLabel").innerHTML ='Add product'
    populateModal('', '', '',addmodal); 
    
});


document.getElementById('saveUpdate').addEventListener('click',() =>{
    const updatedName = document.getElementById('productName').value;
    const updatedPrice = document.getElementById('productPrice').value;
    const updatedDetail = document.getElementById('productDetail').value;
    updateProduct(productId, { name: updatedName, price: updatedPrice, detail: updatedDetail });
    updatemodal.hide();
});
document.getElementById('saveAdd').addEventListener('click',() =>{
    const updatedName = document.getElementById('productName').value;
    const updatedPrice = document.getElementById('productPrice').value;
    const updatedDetail = document.getElementById('productDetail').value;
    
   
        console.log(productId)
        const newProduct = { name: updatedName, price: updatedPrice, detail: updatedDetail };
        createProduct(newProduct);
    
    addmodal.hide();
    
});


document.addEventListener('DOMContentLoaded', () => {
    deleteConfirmationModal = new bootstrap.Modal(document.getElementById('deleteConfirmationModal'));
    addmodal = new bootstrap.Modal(document.getElementById('addproductModal'));
    updatemodal = new bootstrap.Modal(document.getElementById('updateproductModal'));
    loadData();

}); 