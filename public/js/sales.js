  let count = 0;
  const container = document.getElementById("services-container");
  const addBtn = document.getElementById("add-service");
  const summaryEl = document.getElementById("summary");
  const finalTotalEl = document.getElementById("final-total");
  const globalDiscountInput = document.getElementById("global-discount");

  function updateSummary() {
    summaryEl.innerHTML = "";
    const rows = container.querySelectorAll("div[aria-label^='Service']");
    let total = 0;

    rows.forEach((row, i) => {
      const serviceName = row.querySelector("input[placeholder^='SERVICE']").value || `Service ${i + 1}`;
      const qty = parseInt(row.querySelector(".qty-input").value) || 0;
      const price = parseFloat(row.querySelector(".price-input").value) || 0;
      const discount = parseFloat(row.querySelector(".discount-input").value) || 0;

      // Calculate subtotal after discount
      const effectivePrice = Math.max(0, price - discount);
      const subtotal = qty * effectivePrice;
      total += subtotal;

      const item = document.createElement("div");
      item.className = "flex justify-between text-xs border-b pb-1";
      item.innerHTML = `
        <div class="flex-1">${serviceName} (x${qty})</div>
        <div>₹${subtotal.toFixed(2)}</div>
      `;
      summaryEl.appendChild(item);
    });

    // Apply global discount
    const globalDiscount = parseFloat(globalDiscountInput.value) || 0;
    const finalAmount = Math.max(0, total - globalDiscount);

    finalTotalEl.textContent = finalAmount.toFixed(2);
  }

  function createServiceRow(index) {
    const div = document.createElement("div");
    div.className = "flex items-center gap-4 flex-wrap";
    div.setAttribute("aria-label", `Service ${index + 1} input group`);

    // Generate random price for this service (e.g., between 50 and 500)
    const randomPrice = (Math.random() * 450 + 50).toFixed(2);

    div.innerHTML = `
      <input
        type="text"
        placeholder="SERVICE - ${index + 1}"
        class="rounded-full border border-gray-300 px-5 py-2 w-[120px] text-sm text-black"
      />
      <input
        type="text"
        placeholder="STAFF NAME"
        class="rounded-full border border-gray-300 px-5 py-2 w-[120px] text-sm text-black"
      />
      <input
        type="number"
        placeholder="QTY"
        class="qty-input rounded-full border border-gray-300 px-5 py-2 w-[100px] text-sm text-black"
        min="0"
      />
      <input
        type="number"
        placeholder="PRICE"
        hidden
        class="price-input rounded-full border border-gray-300 px-5 py-2 w-[100px] text-sm text-black bg-gray-100"
        value="${randomPrice}"
        readonly
      />
      <input
        type="number"
        placeholder="DISCOUNT"
        class="discount-input rounded-full border border-gray-300 px-5 py-2 w-[100px] text-sm text-black"
        min="0"
      />
      <button
        class="bg-pink-600 text-white rounded-md p-2 hover:bg-pink-700 transition-colors remove-service"
        type="button"
        aria-label="Remove service ${index + 1}"
      >
        <i class="fas fa-trash-alt"></i>
      </button>
    `;

    // Attach input listeners
    setTimeout(() => {
      div.querySelector(".qty-input").addEventListener("input", updateSummary);
      div.querySelector(".discount-input").addEventListener("input", updateSummary);
      div.querySelector("input[placeholder^='SERVICE']").addEventListener("input", updateSummary);
    }, 0);

    return div;
  }

  addBtn.addEventListener("click", () => {
    const row = createServiceRow(count);
    container.appendChild(row);
    count++;
    updateSummary();
  });

  container.addEventListener("click", (e) => {
    if (e.target.closest(".remove-service")) {
      const row = e.target.closest("div");
      if (row) {
        row.remove();
        count--;
        updateSummary();
      }
    }
  });

  globalDiscountInput.addEventListener("input", updateSummary);

  // Add initial row
  addBtn.click();