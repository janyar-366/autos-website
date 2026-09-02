// Zoekfunctie

document.getElementById("search").addEventListener("keyup", function () {

    let value = this.value.toLowerCase();

    let cards = document.querySelectorAll(".card");

    cards.forEach(function(card){

        let name = card.getAttribute("data-name").toLowerCase();

        if(name.includes(value)){
            card.style.display = "block";
        }else{
            card.style.display = "none";
        }

    });

});

// Popup openen

function openModal(title, info, img){

    document.getElementById("modalTitle").innerText = title;
    document.getElementById("modalInfo").innerText = info;
    document.getElementById("modalImg").src = img;

    document.getElementById("modal").style.display = "block";

}

// Popup sluiten

function closeModal(){

    document.getElementById("modal").style.display = "none";

}

// Buiten popup klikken

window.onclick = function(event){

    let modal = document.getElementById("modal");

    if(event.target === modal){
        closeModal();
    }

};