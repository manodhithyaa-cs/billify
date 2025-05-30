  const form = document.getElementById('product-form');
  const nameInput = document.getElementById('product-name');
  const priceInput = document.getElementById('product-price');
  const idInput = document.getElementById('product-id');
  const tableBody = document.getElementById('product-table-body');
  const searchInput = document.getElementById('product-search');

  const modal = document.getElementById('product-modal');
  const openModalBtn = document.getElementById('open-modal-btn');
  const closeModalBtn = document.getElementById('close-modal-btn');

  let products = [];

  function openModal() {
    modal.classList.remove('hidden');
  }

  function closeModal() {
    modal.classList.add('hidden');
    form.reset();
    idInput.value = '';
  }

  openModalBtn.addEventListener('click', openModal);
  closeModalBtn.addEventListener('click', closeModal);

  function renderTable() {
    const filter = searchInput.value.toLowerCase();
    tableBody.innerHTML = '';
    products
      .filter(p => p.name.toLowerCase().includes(filter))
      .forEach((product, index) => {
        const row = document.createElement('tr');
        row.className = 'border-t border-white hover:bg-[#4A4950] transition-colors';
        row.innerHTML = `
          <td class="px-4 py-3">${index + 1}</td>
          <td class="px-4 py-3">${product.name}</td>
          <td class="px-4 py-3">₹${product.price}</td>
          <td class="px-4 py-3 space-x-2">
            <button onclick="editProduct(${index})" class="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-xs">Edit</button>
            <button onclick="deleteProduct(${index})" class="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-xs">Delete</button>
          </td>
        `;
        tableBody.appendChild(row);
      });
  }

  window.editProduct = function(index) {
    const product = products[index];
    nameInput.value = product.name;
    priceInput.value = product.price;
    idInput.value = index.toString();
    openModal();
  }

  window.deleteProduct = function(index) {
    if (confirm("Are you sure you want to delete this product?")) {
      products.splice(index, 1);
      renderTable();
    }
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = nameInput.value.trim();
    const price = parseFloat(priceInput.value.trim());
    const index = idInput.value.trim();

    if (index !== '' && !isNaN(index)) {
      const i = parseInt(index);
      if (i >= 0 && i < products.length) {
        products[i] = { name, price };
      } else {
        products.push({ name, price });
      }
    } else {
      products.push({ name, price });
    }

    form.reset();
    idInput.value = '';
    renderTable();
    closeModal();
  });

  searchInput.addEventListener('input', renderTable);

  renderTable(); // initial