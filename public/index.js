const actionDateFrom = new Date("February 22, 2021 01:00:00");
const actionDateTo = new Date("June 11, 2021 01:00:00");
document.getElementById("actionTime").innerHTML = "From: " + actionDateFrom.toString().substr(4,11) + " To: " + actionDateTo.toString().substr(4,11);

let interval = setInterval(function () {
    let distance = actionDateTo.getTime() - new Date().getTime();
    let hours = Math.floor(distance / (1000 * 60 * 60));
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((distance % (1000 * 60)) / 1000);
    if (hours < 10) hours = "0" + hours;
    if (minutes < 10) minutes = "0" + minutes;
    if (seconds < 10) seconds = "0" + seconds;
    document.getElementById("actionTimeLeft").innerHTML = "Time left: " + hours + ":" + minutes + ":" + seconds + " ! ! !";
    if (distance < 0) {
        clearInterval(interval);
        document.getElementById("action").style.display = "none";
    }
}, 1000);

function validateForm() {
    let x = document.forms["addProductForm"];
    if (x["name"].value === "") {
        alert("Please enter a name");
        return false;
    }
    if (x["name"].value.length > 100) {
        alert("Please enter a shorter name");
        return false;
    }
    if (x["color"].value === "") {
        alert("Please select a color");
        return false;
    }
    if (x["category"].value === "") {
        alert("Please select a category");
        return false;
    }
    if (x["pieces"].value === "") {
        alert("Please enter how many pieces");
        return false;
    }
    if (Number.isInteger(x["pieces"].value)) {
        alert("Please enter a number in \"pieces\"");
        return false;
    }
    alert("Success!");
}

function toggleAdmin() {
    let x = document.getElementById("addProductForm");
    if (x.style.display === "none")
        x.style.display = "block";
    else
        x.style.display = "none";
}