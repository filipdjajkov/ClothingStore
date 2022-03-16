let userDetailsSingle = [];
let productsAvailable = [];
let productsdata;

let productsCart = [];
let membershipCoupons = [];
let total;
let totalM = 0;

let adminAlert = document.getElementById("adminAlert");
let ra = document.getElementById("register-alert");
let la = document.getElementById("login-alert");
let accountDiv = document.getElementById("accountDiv");
let productsTable = document.getElementById("productsTable");
let cartTable = document.getElementById("cartTable");

if (adminAlert != null)
    adminAlert.style.display = "none";
if(ra!= null)
    ra.style.display="none";
if(la!= null)
    la.style.display="none";


//userDetailsSingle
function userDetailsSingleLoad() {
    userDetailsSingle = JSON.parse(sessionStorage.getItem("userDetailsSingle"));
    //userDetailsSingle = decodeURIComponent(getCookie("user"));
    if((userDetailsSingle != null)&&(accountDiv != null)){
        while(accountDiv.hasChildNodes())
            accountDiv.removeChild(accountDiv.firstChild);

        let br = document.createElement('br');
        accountDiv.appendChild(br);

        let details = document.createElement("p");
        details.className="text-center";
        details.innerHTML = JSON.stringify(userDetailsSingle);
        details.innerHTML = details.innerHTML.replaceAll("\",\"","<br>")
        details.innerHTML = details.innerHTML.replaceAll("\":\"",": ");
        details.innerHTML = details.innerHTML.replaceAll("\"","");
        details.innerHTML = details.innerHTML.replaceAll("{","");
        details.innerHTML = details.innerHTML.replaceAll("}","");
        accountDiv.appendChild(details);

        let btn = document.createElement('button');
        btn.innerHTML = "Logout";
        btn.className = "btn btn-secondary w-100";
        btn.onclick = function(){
            userDetailsSingle=[];
            userDetailsSingleSave();
            location.reload();
        };
        accountDiv.appendChild(btn);

        br = document.createElement('br');
        accountDiv.appendChild(br);
        br = document.createElement('br');
        accountDiv.appendChild(br);
    }
    /*if(userDetailsSingle != "undefined"){
        while(accountDiv.hasChildNodes())
            accountDiv.removeChild(accountDiv.firstChild);

        let br = document.createElement('br');
        accountDiv.appendChild(br);

        let details = document.createElement("p");
        details.className="text-center";
        details.innerHTML = JSON.stringify(userDetailsSingle)
            .replaceAll("\\\",\\\"","<br>")
            .replaceAll("\\\":\\\"",": ")
            .replaceAll("\"{\\\"","")
            .replaceAll("\\\"}\"","");
        accountDiv.appendChild(details);

        let btn = document.createElement('button');
        btn.innerHTML = "Logout";
        btn.className = "btn btn-secondary w-100";
        btn.onclick = function(){
            userDetailsSingle=[];
            userDetailsSingleSave();
            location.reload();
        };
        accountDiv.appendChild(btn);

        br = document.createElement('br');
        accountDiv.appendChild(br);
        br = document.createElement('br');
        accountDiv.appendChild(br);
    }*/
}

function userDetailsSingleSave() {
    if (userDetailsSingle.length != 0)
        window.sessionStorage.setItem("userDetailsSingle", JSON.stringify(userDetailsSingle));
    else
        window.sessionStorage.removeItem("userDetailsSingle");
}

//productsCart
function productsCartLoad() {
    productsCart = JSON.parse(sessionStorage.getItem("productsCart"));
    if (productsCart == null)
        productsCart = [];
    //console.log(productsCart);
}

function productsCartSave() {
    if (productsCart.length != 0)
        window.sessionStorage.setItem("productsCart", JSON.stringify(productsCart));
    else
        window.sessionStorage.removeItem("productsCart");
}

function productsCartAdd(id) {
    let found = false;
    for (let obj of productsCart) {
        if (obj[0] === id) {

            let max = 0;
            for (let obj2 of productsAvailable) {
                if (obj2["id"] === id) {
                    max = obj2["quantity"];
                    break;
                }
            }

            if (max <= (obj[1])) {
                $('#cartModal').modal('toggle');
            } else {
                ++obj[1];
            }
            found = true;
            break;
        }
    }
    if (!found)
        productsCart.push([id, 1]);
    //console.log(productsCart);
    productsCartSave();
}

function productsCartRemove(id){
    for (let i = 0; i < productsCart.length; i++) {
        if (productsCart[i][0] === id) {
            productsCart.splice(i, 1);
            break;
        }
    }
    productsCartSave();
}

function productsCartMinus(id){
    for (let i = 0; i < productsCart.length; i++) {
        if (productsCart[i][0] === id) {
            if(productsCart[i][1]===1)
                productsCartRemove(id);
            else
                --productsCart[i][1];
            break;
        }
    }
    productsCartSave();
}

function productsCartPlus(id){
    for (let i = 0; i < productsCart.length; i++) {
        if (productsCart[i][0] === id) {
            let max = 0;
            for (let obj2 of productsAvailable) {
                if (obj2["id"] === id) {
                    max = obj2["quantity"];
                    break;
                }
            }

            if (max <= (productsCart[i][1])) {
                $('#cartModal').modal('toggle');
            }else {
                ++productsCart[i][1];
            }
            break;
        }
    }
    productsCartSave();
}

//membershipCoupons
function membershipCouponsLoad() {
    membershipCoupons = JSON.parse(localStorage.getItem("membershipCoupons"));
    if (membershipCoupons == null)
        membershipCoupons = [];
    else
        membershipCoupons = membershipCoupons.sort();
    //console.log(membershipCoupons);
}

function membershipCouponsSave() {
    if (membershipCoupons.length != 0)
        window.localStorage.setItem("membershipCoupons", JSON.stringify(membershipCoupons));
    else
        window.localStorage.removeItem("membershipCoupons");
}

function membershipCouponsAdd(value) {
    membershipCoupons.push(value);
    membershipCouponsSave()
}

function membershipCouponsRemove(value) {
    if (membershipCoupons.indexOf(parseInt(value)) > -1)
        membershipCoupons.splice(membershipCoupons.indexOf(parseInt(value)), 1);
    membershipCouponsSave()
}

//productsAvailable
function productsAvailableLoad() {
    productsAvailable = JSON.parse(localStorage.getItem("productsAvailable"));
    productsdata = JSON.parse(localStorage.getItem("productsAvailable"));
    //console.log(productsAvailable);
    productsTableFill();
}

function productsAvailableSave() {
    if (productsAvailable.length != 0) {
        window.localStorage.setItem("productsAvailable", JSON.stringify(productsAvailable));
        window.localStorage.setItem("productsdata", JSON.stringify(productsdata));
    }else {
        window.localStorage.removeItem("productsAvailable");
        window.localStorage.removeItem("productsdata");
    }
}

function productsAvailableAdd() {
    adminAlert.style.display = "block";
    let adminForm = document.forms["adminForm"];
    if (adminForm["name"].value === "") {
        adminAlert.innerHTML = "Please enter a valid name";
        return false;
    }
    adminAlert.style.display = "none";

    productsAvailable.push(
        productsAvailable.length,
        adminForm["src"].value,
        adminForm["name"].value,
        adminForm["color"].value,
        adminForm["quantity"].value,
        adminForm["price_in_euros"].value
    );
    productsAvailableSave();
}

//other
function productsTableFill() {
    if (productsTable == null) return;
    let col = [];
    for (let i = 0; i < productsAvailable.length; i++) {
        for (let key in productsAvailable[i]) {
            if (col.indexOf(key) === -1) {
                col.push(key);
            }
        }
    }

    let tr = productsTable.insertRow(-1);

    let th = document.createElement("th");
    th.innerHTML = "Product";
    tr.appendChild(th);
    for (let i = 2; i < col.length; i++) {
        th = document.createElement("th");
        th.innerHTML = col[i].charAt(0).toUpperCase() + col[i].replaceAll("_", " ").substring(1);
        tr.appendChild(th);
    }
    th = document.createElement("th");
    th.innerHTML = "";
    tr.appendChild(th);

    for (let i = 0; i < productsAvailable.length; i++) {
        tr = productsTable.insertRow(-1);
        let tabCell;
        for (let j = 1; j < col.length; j++) {
            tabCell = tr.insertCell(-1);
            if(j===1){
                let img = document.createElement('img');
                img.height = 100;
                const productsrc = productsAvailable[i][col[j]];//product.src;
                img.src = "data:image/jpg;base64," + productsdata[productsrc];// productsAvailable[i][col[j]];
                tabCell.appendChild(img);
            }else {
                tabCell.innerHTML = productsAvailable[i][col[j]];
            }
            if(j===col.length-2){
                if(productsAvailable[i][col[j+1]]!="0")
                    tabCell.innerHTML = "before: "+tabCell.innerHTML + "<br>now: " + ((parseInt(productsAvailable[i][col[j]]) - (0.01*parseInt(productsAvailable[i][col[j+1]])*parseInt(productsAvailable[i][col[j]])) )).toFixed(2);
            } else if(j===col.length-1){
                if(tabCell.innerHTML==="0")
                    tabCell.innerHTML = "";
                else
                    tabCell.innerHTML = tabCell.innerHTML + " %";
            }
        }
        tabCell = tr.insertCell(-1);
        let btn = document.createElement('button');
        btn.innerHTML = "Add to cart";
        btn.className="btn btn-primary";
        btn.onclick = function(){
            productsCartAdd(productsAvailable[i][col[0]]);
        };
        tabCell.appendChild(btn);
    }
}

function cartTableFill() {
    if (cartTable == null) return;

    while (cartTable.firstChild != null){
        cartTable.removeChild(cartTable.firstChild);
    }

    total = 0;

    let col = [];
    for (let i = 0; i < productsAvailable.length; i++) {
        for (let key in productsAvailable[i]) {
            if (col.indexOf(key) === -1) {
                col.push(key);
            }
        }
    }

    let tr = cartTable.insertRow(-1);

    let th = document.createElement("th");
    th.innerHTML = "Product";
    tr.appendChild(th);
    for (let i = 2; i < col.length; i++) {
        th = document.createElement("th");
        th.innerHTML = col[i].charAt(0).toUpperCase() + col[i].replaceAll("_", " ").substring(1);
        tr.appendChild(th);
    }
    th = document.createElement("th");
    th.innerHTML = "";
    tr.appendChild(th);

    for (let i = 0; i < productsCart.length; i++) {

        let x;
        for (let obj2 of productsAvailable) {
            if (obj2["id"] === productsCart[i][0]) {
                x = obj2;
            }
        }

        tr = cartTable.insertRow(-1);
        let tabCell;
        for (let j = 1; j < col.length; j++) {
            tabCell = tr.insertCell(-1);
            if(j===1){
                let img = document.createElement('img');
                img.height = 100;
                const productsrc = x[col[j]];//product.src;
                img.src = "data:image/jpg;base64," + productsdata[productsrc];// productsAvailable[i][col[j]];
                tabCell.appendChild(img);
            }else {
                tabCell.innerHTML = x[col[j]];
                if(j===(col.length-3)){
                    tabCell.innerHTML = productsCart[i][1];
                }else if(j===(col.length-2)) {
                    total += (parseInt(tabCell.innerHTML) * productsCart[i][1]);
                    tabCell.innerHTML = ""+(productsCart[i][1] * parseInt(tabCell.innerHTML));
                    if(x[col[j+1]]!="0") {
                        tabCell.innerHTML = "before: " + tabCell.innerHTML + "<br>now: " + ((parseInt(tabCell.innerHTML) - (0.01 * parseInt(x[col[j + 1]]) * parseInt(tabCell.innerHTML)))).toFixed(2);
                    }
                    if(productsCart[i][1]>1){
                        let z;
                        if(x[col[j+1]]!="0") {
                            z = "]<br>[before: " + x[col[j]] + "]<br>[now: " + ((parseInt(x[col[j]]) - (0.01 * parseInt(x[col[j + 1]]) * parseInt(x[col[j]])))).toFixed(2);
                        }else
                            z = ": "+x[col[j]];
                        tabCell.innerHTML = tabCell.innerHTML + "<br> [single" + z + "]";
                    }
                }
            }
        }
        tabCell = tr.insertCell(-1);
        let btn;

        btn = document.createElement('button');
        btn.innerHTML = "+";
        btn.className="btn btn-success";
        btn.onclick = function(){
            productsCartPlus(x[col[0]]);
            cartTableFill();
            changeMembership();
        };
        tabCell.appendChild(btn);

        btn = document.createElement('button');
        btn.innerHTML = "-";
        btn.className="btn btn-danger";
        btn.onclick = function(){
            productsCartMinus(x[col[0]]);
            cartTableFill();
            changeMembership();
        };
        tabCell.appendChild(btn);

        btn = document.createElement('button');
        btn.innerHTML = "Remove";
        btn.className="btn btn-danger";
        btn.onclick = function(){
            productsCartRemove(x[col[0]]);
            cartTableFill();
            changeMembership();
        };
        tabCell.appendChild(btn);
    }

    let tt = document.getElementById("totalPrice");
    let ttt = document.getElementById("totalPriceT");
    let tttm = document.getElementById("totalPriceTM");
    let tttml = document.getElementById("totalPriceTML");
    let membershipT = document.getElementById("membershipT");
    let mmd = document.getElementById("membershipDiscount");
    let bn = document.getElementById("buyNow");
    if(productsCart.length > 0){
        tt.innerHTML = "Total price without VAT: " + (total - 0.22 * total).toFixed(2) + " €";
        ttt.innerHTML = "Total price with VAT: " + total.toFixed(2) + " €";
        membershipT.style.display = "inline-block";
        tttml.style.display = "block";
        mmd.style.display = "inline-block";
        bn.style.display = "block";
    } else {
        tt.innerHTML = "Added products will appear here"
        ttt.innerHTML = "";
        membershipT.style.display = "none";
        tttml.style.display = "none";
        mmd.style.display = "none";
        bn.style.display = "none";
    }
}

function membershipsDisplay() {
    let mmd = document.getElementById("membershipDiscount");
    if(mmd != null)
        for (let m of membershipCoupons) {
            let opt = document.createElement('option');
            opt.value = m;
            opt.innerHTML = m;
            mmd.appendChild(opt);
        }
}

function changeMembership() {
    let tttm = document.getElementById("totalPriceTM");
    if(tttm == null) return;
    let membershipDiscount = document.getElementById("membershipDiscount");
    if (membershipDiscount.options[membershipDiscount.selectedIndex].value != 0) {
        let priceToSubstract = total * 0.01 * membershipDiscount.options[membershipDiscount.selectedIndex].value
        totalM = (total - priceToSubstract).toFixed(2);
        tttm.innerHTML = "Total price with VAT and membership discount: " + (total - priceToSubstract).toFixed(2) + " €";
        tttm.style.display = "block";
    } else {
        totalM = 0;
        tttm.innerHTML = "-1";
        tttm.style.display = "none";
    }
    calculateRate();
}

function calculateRate() {
    const times = 12;
    const rate = 5;
    let tttml = document.getElementById("totalPriceTML");
    let oneRate = (totalM === 0) ? total : totalM;
    oneRate /= times;
    oneRate += (0.01 * rate * oneRate);
    oneRate = oneRate.toFixed(2);
    tttml.innerHTML = "Or via installments (" + rate + "% interest rate):   " + times + " months * " + oneRate + " €";
}

function buyNow() {
    productsCart = [];
    productsCartSave();
    let membershipDiscount = document.getElementById("membershipDiscount");
    membershipCouponsRemove(membershipDiscount.options[membershipDiscount.selectedIndex].value);
}

function validateForm() {
    ra.style.display="block";
    let x = document.forms["register"];
    if (x["email"].value === "") {
        ra.innerHTML = "Please enter an e-mail";
        return false;
    }
    if (x["password"].value === "") {
        ra.innerHTML = "Please enter a password";
        return false;
    }
    if (x["passwordConfirm"].value === "") {
        ra.innerHTML = "Please enter the password again in \"Password confirm\" field";
        return false;
    }
    if (x["password"].value !== x["passwordConfirm"].value) {
        ra.innerHTML = "Passwords don't match!";
        return false;
    }
    if (x["name"].value === "") {
        ra.innerHTML = "Please enter your name";
        return false;
    }
    if (x["surname"].value === "") {
        ra.innerHTML = "Please enter your surname";
        return false;
    }
    if (x["birthday"].value === "") {
        ra.innerHTML = "Please enter your birthday";
        return false;
    }
    let today = new Date();
    let before18YearsInDays = today.getDate() + (today.getMonth() + 1)*12 + (today.getFullYear()-18)*365;
    let birthdayDays = parseInt(x["birthday"].value.split('-')[2]) + parseInt(x["birthday"].value.split('-')[1])*12 + parseInt(x["birthday"].value.split('-')[0])*365;
    if (before18YearsInDays < birthdayDays) {
        ra.innerHTML = "Age must be over 18!";
        return false;
    }
    if (!x["genderM"].checked && !x["genderF"].checked) {
        ra.innerHTML = "Please check a gender!";
        return false;
    }
    if (!x["consent"].checked) {
        ra.innerHTML = "Please give consent";
        return false;
    }
    ra.style.display="none";
}

//start
$(document).ready(() => {
    $("#buyNow").click(function(e) {
        e.preventDefault();

        if(userDetailsSingle<1){
            alert("Please log in!");
            return;
        }

        let data = {};
        data.userID = userDetailsSingle.id;

        data.date = new Date ();

        data.productsAndQuantites = productsCart;

        let tpt = document.getElementById("totalPriceT")
        let tptm = document.getElementById("totalPriceTM");
        data.totalAmount = (tptm.innerHTML!="-1") ? tptm.innerHTML : tpt.innerHTML;

        $.ajax({
            url: '/buyNow',
            data: data,
            type: 'POST',
            success: function(data, status) {
                if(data==-1){
                    alert("Error!");
                }else {
                    buyNow();
                    alert("Purchase successful!");
                    productsTableFill();
                    productsCartLoad();
                    cartTableFill();
                    membershipsDisplay();
                    changeMembership();
                }
            }
        });
    })

    $("#loginSubmit").click(function(e) {
        e.preventDefault();

        const loginEmail = $("#loginEmail").val();
        const loginPassword = $("#loginPassword").val();

        $.ajax({
            url: '/login',
            data: {loginEmail:loginEmail, loginPassword:loginPassword},
            type: 'POST',
            success: function(data, status) {
                if(data==-1){
                    alert("Incorrect email or password!");
                }else {
                    userDetailsSingle = data;
                    userDetailsSingleSave();
                    location.reload();
                    //console.log(`${JSON.stringify(data)}`)
                }
            }
        });
    })

    $.get("/products", function(data, status) {
        productsdata=data;
        productsAvailable = JSON.parse(data.table);

        productsTableFill();
        productsCartLoad();
        cartTableFill();
        membershipsDisplay();
        changeMembership();
    });

    userDetailsSingleLoad();
    membershipCouponsLoad();
});