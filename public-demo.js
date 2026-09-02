const companies = [
  "RAK Ceramics",
  "Akij Ceramic",
  "Fress Ceramics",
  "MIR Ceramic",
  "G Wall",
  "X Ceramics",
  "Stella",
  "Rosa",
  "Cosmo",
  "Marco Polo",
  "Others Company"
];


const data = {

  "RAK Ceramics": [
    {
      name: "RAK Marble White / RAK-102",
      carton: 10,
      piece: 4,
      purchase: 65,
      sale: 85,
      stock: "120 Sqft",
      remark: "Available"
    },
    {
      name: "RAK Floor Grey / RAK-205",
      carton: 8,
      piece: 2,
      purchase: 58,
      sale: 75,
      stock: "80 Sqft",
      remark: "New"
    }
  ],

  "Akij Ceramic": [
    {
      name: "Akij Floor Tile / AK-110",
      carton: 12,
      piece: 3,
      purchase: 54,
      sale: 72,
      stock: "160 Sqft",
      remark: "Available"
    }
  ],

  "Fress Ceramics": [
    {
      name: "Fress Wall White / FR-21",
      carton: 9,
      piece: 2,
      purchase: 48,
      sale: 65,
      stock: "90 Sqft",
      remark: "Display"
    }
  ],

  "MIR Ceramic": [
    {
      name: "MIR Classic / MR-17",
      carton: 5,
      piece: 2,
      purchase: 59,
      sale: 79,
      stock: "55 Sqft",
      remark: "Available"
    }
  ],

  "G Wall": [
    {
      name: "G Wall Classic / GW-31",
      carton: 7,
      piece: 2,
      purchase: 50,
      sale: 68,
      stock: "70 Sqft",
      remark: "Available"
    }
  ],

  "X Ceramics": [
    {
      name: "X Premium / XC-12",
      carton: 6,
      piece: 1,
      purchase: 62,
      sale: 82,
      stock: "60 Sqft",
      remark: "New"
    }
  ],

  "Stella": [
    {
      name: "Stella Shine / ST-08",
      carton: 6,
      piece: 2,
      purchase: 52,
      sale: 70,
      stock: "65 Sqft",
      remark: "New"
    }
  ],

  "Rosa": [
    {
      name: "Rosa White / RO-15",
      carton: 7,
      piece: 2,
      purchase: 51,
      sale: 69,
      stock: "75 Sqft",
      remark: "Available"
    }
  ],

  "Cosmo": [
    {
      name: "Cosmo Gloss / CO-22",
      carton: 5,
      piece: 1,
      purchase: 60,
      sale: 81,
      stock: "50 Sqft",
      remark: "Display"
    }
  ],

  "Marco Polo": [
    {
      name: "Marco Polo Premium / MP-07",
      carton: 8,
      piece: 2,
      purchase: 64,
      sale: 86,
      stock: "95 Sqft",
      remark: "Available"
    }
  ],

  "Others Company": [
    {
      name: "Sample Product / OT-01",
      carton: 4,
      piece: 2,
      purchase: 45,
      sale: 62,
      stock: "40 Box",
      remark: "Demo"
    }
  ]

};


let selected = companies[0];
let dueOnly = false;


const $ = s => document.querySelector(s);


const money = n =>
  "৳ " + Number(n || 0).toLocaleString("en-BD");


/* =========================
   PRODUCTS & STOCK
========================= */

function renderCompanies() {

  const g = $("#companyGrid");

  if (!g) return;

  g.innerHTML = "";

  companies.forEach(c => {

    const b = document.createElement("button");

    b.className =
      "company" + (c === selected ? " active" : "");

    b.textContent = c;

    b.onclick = () => {

      selected = c;

      renderCompanies();
      renderProducts();

    };

    g.appendChild(b);

  });

}


function renderProducts() {

  const title = $("#selectedCompanyTitle");
  const body = $("#productBody");

  if (!title || !body) return;

  title.textContent =
    selected + " / Product List";

  body.innerHTML = "";

  (data[selected] || []).forEach((p, i) => {

    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${i + 1}</td>

      <td>
        <strong>${p.name}</strong>
      </td>

      <td>${p.carton || 0}</td>

      <td>${p.piece || 0}</td>

      <td>${money(p.purchase)}</td>

      <td>${money(p.sale)}</td>

      <td>${p.stock}</td>

      <td>${p.remark || ""}</td>

      <td class="action">

        <button
          class="edit"
          onclick="editProduct(${i})">
          Edit
        </button>

        <button
          class="delete"
          onclick="deleteProduct(${i})">
          Delete
        </button>

      </td>
    `;

    body.appendChild(tr);

  });

}


function openProduct(i = -1) {

  const modal = $("#modal");

  if (!modal) return;

  modal.classList.add("show");

  $("#editIndex").value = i;

  $("#modalTitle").textContent =
    i < 0
      ? "Add Product / পণ্য যোগ"
      : "Edit Product / পণ্য সম্পাদনা";


  const p =
    i < 0
      ? {
          name: "",
          carton: "",
          piece: "",
          purchase: "",
          sale: "",
          stock: "",
          remark: ""
        }
      : data[selected][i];


  const values = [
    p.name,
    p.carton,
    p.piece,
    p.purchase,
    p.sale,
    p.stock,
    p.remark
  ];


  [
    "pName",
    "pCarton",
    "pPiece",
    "pPurchase",
    "pSale",
    "pStock",
    "pRemark"
  ].forEach((id, j) => {

    const el = $("#" + id);

    if (el) {
      el.value = values[j] ?? "";
    }

  });

}


window.editProduct = i =>
  openProduct(i);


window.deleteProduct = i => {

  if (
    confirm(
      "Delete this demo product?"
    )
  ) {

    data[selected].splice(i, 1);

    renderProducts();

  }

};


const addProductBtn =
  $("#addProductBtn");

if (addProductBtn) {

  addProductBtn.onclick =
    () => openProduct();

}


const closeModal =
  $("#closeModal");

if (closeModal) {

  closeModal.onclick =
    () => $("#modal").classList.remove("show");

}


const productForm =
  $("#productForm");

if (productForm) {

  productForm.onsubmit = e => {

    e.preventDefault();

    const i =
      Number($("#editIndex").value);


    const p = {

      name:
        $("#pName").value.trim(),

      carton:
        Number($("#pCarton").value) || 0,

      piece:
        Number($("#pPiece").value) || 0,

      purchase:
        Number($("#pPurchase").value) || 0,

      sale:
        Number($("#pSale").value) || 0,

      stock:
        $("#pStock").value.trim(),

      remark:
        $("#pRemark").value.trim()

    };


    if (i < 0) {

      data[selected].push(p);

    } else {

      data[selected][i] = p;

    }


    $("#modal")
      .classList.remove("show");

    renderProducts();

  };

}


/* =========================
   ADD COMPANY
========================= */

const addCompanyBtn =
  $("#addCompanyBtn");

if (addCompanyBtn) {

  addCompanyBtn.onclick =
    () =>
      $("#companyModal")
        .classList.add("show");

}


const closeCompanyModal =
  $("#closeCompanyModal");

if (closeCompanyModal) {

  closeCompanyModal.onclick =
    () =>
      $("#companyModal")
        .classList.remove("show");

}


const companyForm =
  $("#companyForm");

if (companyForm) {

  companyForm.onsubmit = e => {

    e.preventDefault();

    const n =
      $("#companyName").value.trim();


    if (
      n &&
      !companies.includes(n)
    ) {

      companies.splice(
        companies.length - 1,
        0,
        n
      );

      data[n] = [];

      selected = n;

      renderCompanies();
      renderProducts();

    }


    $("#companyName").value = "";

    $("#companyModal")
      .classList.remove("show");

  };

}


/* =========================
   TAB MENU
========================= */

document
  .querySelectorAll(".tab")
  .forEach(b => {

    b.onclick = () => {

      document
        .querySelectorAll(".tab")
        .forEach(x =>
          x.classList.remove("active")
        );


      document
        .querySelectorAll(".panel")
        .forEach(x =>
          x.classList.remove("active")
        );


      b.classList.add("active");


      const panel =
        $("#" + b.dataset.section);

      if (panel) {
        panel.classList.add("active");
      }


      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });

    };

  });


/* =========================
   SALES INVOICE
========================= */

function addInvoiceRow(
  name = "RAK Marble White",
  qty = 10,
  price = 85
) {

  const body =
    $("#invoiceBody");

  if (!body) return;


  const tr =
    document.createElement("tr");

  const n =
    body.children.length + 1;


  tr.innerHTML = `
    <td>${n}</td>

    <td>
      <input
        class="rowName"
        value="${name}">
    </td>

    <td>
      <input
        class="rowQty"
        type="number"
        value="${qty}"
        min="0">
    </td>

    <td>
      <input
        class="rowPrice"
        type="number"
        value="${price}"
        min="0">
    </td>

    <td class="rowTotal">
      ${money(qty * price)}
    </td>
  `;


  body.appendChild(tr);


  tr.querySelectorAll("input")
    .forEach(input => {

      input.addEventListener(
        "input",
        updateInvoiceTotal
      );

    });


  updateInvoiceTotal();

}


/* =========================
   INVOICE TOTAL
========================= */

function getInvoiceGrandTotal() {

  let total = 0;


  document
    .querySelectorAll(
      "#invoiceBody tr"
    )
    .forEach(tr => {

      const q =
        Number(
          tr.querySelector(
            ".rowQty"
          ).value
        ) || 0;


      const p =
        Number(
          tr.querySelector(
            ".rowPrice"
          ).value
        ) || 0;


      total += q * p;

    });


  return total;

}


function updateInvoiceTotal() {

  let total =
    getInvoiceGrandTotal();


  document
    .querySelectorAll(
      "#invoiceBody tr"
    )
    .forEach(tr => {

      const q =
        Number(
          tr.querySelector(
            ".rowQty"
          ).value
        ) || 0;


      const p =
        Number(
          tr.querySelector(
            ".rowPrice"
          ).value
        ) || 0;


      tr.querySelector(
        ".rowTotal"
      ).textContent =
        money(q * p);

    });


  $("#grandTotal").textContent =
    money(total);


  updateInvoiceSummary(total);

}


/* =========================
   INVOICE SUMMARY
========================= */

function updateInvoiceSummary(
  grandTotal
) {

  const labour =
    Math.max(
      0,
      Number(
        $("#labourCharge").value
      ) || 0
    );


  const discount =
    Math.max(
      0,
      Number(
        $("#discount").value
      ) || 0
    );


  const paid =
    Math.max(
      0,
      Number(
        $("#paidBill").value
      ) || 0
    );


  const payable =
    Math.max(
      0,
      grandTotal +
      labour -
      discount
    );


  const due =
    Math.max(
      0,
      payable - paid
    );


  $("#payableBill").textContent =
    money(payable);


  $("#invoiceDue").textContent =
    money(due);

}


/* =========================
   SUMMARY INPUTS
========================= */

[
  "#labourCharge",
  "#discount",
  "#paidBill"
].forEach(selector => {

  const input = $(selector);

  if (!input) return;


  input.addEventListener(
    "input",
    () => {

      updateInvoiceSummary(
        getInvoiceGrandTotal()
      );

    }
  );

});


/* =========================
   ADD INVOICE ITEM
========================= */

const addInvoiceRowBtn =
  $("#addInvoiceRow");

if (addInvoiceRowBtn) {

  addInvoiceRowBtn.onclick =
    () =>
      addInvoiceRow(
        "New Product",
        1,
        100
      );

}


/* =========================
   NEW INVOICE
========================= */

const newInvoiceBtn =
  $("#newInvoiceBtn");

if (newInvoiceBtn) {

  newInvoiceBtn.onclick = () => {

    const invoiceNo =
      "INV-" +
      (
        1008 +
        Math.floor(
          Math.random() * 90
        )
      );


    $("#invoiceNo").textContent =
      invoiceNo;


    $("#invoiceBody").innerHTML =
      "";


    $("#labourCharge").value =
      0;

    $("#discount").value =
      0;

    $("#paidBill").value =
      0;


    addInvoiceRow();

    addInvoiceRow(
      "RAK Floor Grey",
      5,
      75
    );


    alert(
      "New demo invoice created."
    );

  };

}


/* =========================
   DUE / COLLECTION
========================= */

document
  .querySelectorAll(".collectBtn")
  .forEach(b => {

    b.onclick = () => {

      const row =
        b.closest("tr");


      const dueCell =
        row.querySelector(".danger");


      const current =
        dueCell
          ? dueCell.textContent
          : "৳0";


      const amount =
        prompt(
          "Collection amount / আদায়ের পরিমাণ লিখুন",
          current.replace(
            /[^0-9]/g,
            ""
          )
        );


      if (
        amount !== null &&
        !isNaN(Number(amount))
      ) {

        const n =
          Number(amount);


        if (n > 0) {

          if (dueCell) {

            const oldDue =
              Number(
                current.replace(
                  /[^0-9]/g,
                  ""
                )
              ) || 0;


            dueCell.textContent =
              money(
                Math.max(
                  0,
                  oldDue - n
                )
              );

          }


          b.textContent =
            "Collected ✓";

          b.disabled = true;


          alert(
            "Demo collection recorded: " +
            money(n) +
            ". Real Firebase data is not changed."
          );

        }

      }

    };

  });


/* =========================
   PRINT
========================= */

const printReport =
  $("#printReport");

if (printReport) {

  printReport.onclick =
    () => window.print();

}


const printAccounts =
  $("#printAccounts");

if (printAccounts) {

  printAccounts.onclick =
    () => window.print();

}


/* =========================
   HISTORY FILTER
========================= */

const historyFilterBtn =
  $("#historyFilterBtn");

if (historyFilterBtn) {

  historyFilterBtn.onclick = () => {

    dueOnly = !dueOnly;


    historyFilterBtn.textContent =
      dueOnly
        ? "🔎 Show All"
        : "🔎 Show Due Only";


    document
      .querySelectorAll(
        "#history tbody tr"
      )
      .forEach(tr => {

        tr.style.display =
          dueOnly
            ? (
                tr.querySelector(
                  ".pill.due"
                )
                  ? ""
                  : "none"
              )
            : "";

      });

  };

}


/* =========================
   INITIAL DATA
========================= */

const invDate =
  $("#invDate");

if (invDate) {

  invDate.value =
    new Date()
      .toISOString()
      .slice(0, 10);

}


addInvoiceRow();

addInvoiceRow(
  "RAK Floor Grey",
  5,
  75
);


renderCompanies();

renderProducts();
