const companyNames=["RAK Ceramics","Akij Ceramic","Fress Ceramic","MIR Ceramic","G Wall","X Ceramics","Stella","Rosa","Cosmo","Marco Polo","Others Company"];
const products={
"RAK Ceramics":[["RAK Marble White / RAK-102",10,4,65,85,"120 Sqft","Available"],["RAK Floor Grey / RAK-205",8,2,58,75,"80 Sqft","New"]],
"Akij Ceramic":[["Akij Floor Tile / AK-110",12,3,54,72,"160 Sqft","Available"]],
"Fress Ceramic":[["Fress Wall White / FR-21",9,2,48,65,"90 Sqft","Display"]],
"MIR Ceramic":[["MIR Classic / MR-17",5,2,59,79,"55 Sqft","Available"]],
"G Wall":[["G Wall Classic / GW-31",7,2,50,68,"70 Sqft","Available"]],
"X Ceramics":[["X Premium / XC-12",6,1,62,82,"60 Sqft","New"]],
"Stella":[["Stella Shine / ST-08",6,2,52,70,"65 Sqft","New"]],
"Rosa":[["Rosa White / RO-15",7,2,51,69,"75 Sqft","Available"]],
"Cosmo":[["Cosmo Gloss / CO-22",5,1,60,81,"50 Sqft","Display"]],
"Marco Polo":[["Marco Polo Premium / MP-07",8,2,64,86,"95 Sqft","Available"]],
"Others Company":[]
};
let selected="RAK Ceramics";

function renderCompanies(){
  const box=document.querySelector("#companies"); box.innerHTML="";
  companyNames.forEach(c=>{
    const b=document.createElement("button");
    b.className="company"+(c===selected?" active":"");
    b.textContent=c;
    b.onclick=()=>{selected=c;renderCompanies();renderProducts();document.querySelector("#otherCompanyBox").classList.toggle("show",c==="Others Company")};
    box.appendChild(b);
  });
}
function renderProducts(){
  document.querySelector("#selectedCompany").textContent=selected;
  const body=document.querySelector("#productRows"); body.innerHTML="";
  (products[selected]||[]).forEach((p,i)=>{
    const tr=document.createElement("tr");
    tr.innerHTML=`<td>${i+1}</td><td><b>${p[0]}</b></td><td>${p[1]}</td><td>${p[2]}</td><td>৳ ${Number(p[3]).toLocaleString()}</td><td>৳ ${Number(p[4]).toLocaleString()}</td><td>${p[5]}</td><td>${p[6]}</td><td class="action"><button class="edit" onclick="editProduct(${i})">Edit</button><button class="delete" onclick="deleteProduct(${i})">Delete</button></td>`;
    body.appendChild(tr);
  });
}
function openProduct(i=-1){
  document.querySelector("#productModal").classList.add("show");
  document.querySelector("#editIndex").value=i;
  const p=i<0?["",0,0,"","", "", ""]:(products[selected]||[])[i];
  document.querySelector("#pName").value=p[0];document.querySelector("#pCarton").value=p[1];document.querySelector("#pPiece").value=p[2];
  document.querySelector("#pPurchase").value=p[3];document.querySelector("#pSelling").value=p[4];document.querySelector("#pStock").value=p[5];document.querySelector("#pRemark").value=p[6];
  document.querySelector("#modalTitle").textContent=i<0?"Add Product / পণ্য যোগ":"Edit Product / পণ্য সম্পাদনা";
}
window.editProduct=i=>openProduct(i);
window.deleteProduct=i=>{if(confirm("Delete this demo product? / এই Demo পণ্যটি মুছে ফেলবেন?")){products[selected].splice(i,1);renderProducts()}};

document.querySelector("#addProduct").onclick=()=>openProduct();
document.querySelector("#closeModal").onclick=()=>document.querySelector("#productModal").classList.remove("show");
document.querySelector("#productForm").onsubmit=e=>{
  e.preventDefault();
  const i=Number(document.querySelector("#editIndex").value);
  const p=[document.querySelector("#pName").value.trim(),Number(document.querySelector("#pCarton").value)||0,Number(document.querySelector("#pPiece").value)||0,Number(document.querySelector("#pPurchase").value)||0,Number(document.querySelector("#pSelling").value)||0,document.querySelector("#pStock").value.trim(),document.querySelector("#pRemark").value.trim()];
  if(!products[selected])products[selected]=[];
  if(i<0)products[selected].push(p);else products[selected][i]=p;
  document.querySelector("#productModal").classList.remove("show");renderProducts();
};

document.querySelector("#addCompany").onclick=()=>{
  const n=document.querySelector("#newCompanyName").value.trim();
  if(n&&!companyNames.includes(n)){companyNames.splice(companyNames.length-1,0,n);products[n]=[];selected=n;document.querySelector("#newCompanyName").value="";renderCompanies();renderProducts();document.querySelector("#otherCompanyBox").classList.remove("show")}
};

document.querySelectorAll(".nav-btn").forEach(btn=>btn.onclick=()=>{
  document.querySelectorAll(".nav-btn").forEach(x=>x.classList.remove("active"));
  document.querySelectorAll(".panel").forEach(x=>x.classList.remove("active"));
  btn.classList.add("active");document.querySelector("#"+btn.dataset.target).classList.add("active");
});

const sales=[55,72,46,84,66,92,78], days=["26","27","28","29","30","31","01"];
document.querySelector("#salesChart").innerHTML=sales.map((v,i)=>`<div class="bar-item"><b>৳ ${Math.round(v*500).toLocaleString()}</b><i class="bar" style="height:${v}%"></i><small>${days[i]}</small></div>`).join("");
renderCompanies();renderProducts();
