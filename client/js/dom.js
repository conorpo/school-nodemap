document.getElementById('schoolInput').addEventListener('change',function(){
    validateSchool();
},false);
document.getElementById('schoolInput').addEventListener('focusout',function(){
    validateSchool();
},false);
document.getElementById('schoolInput').addEventListener('keypress',function(evt){
    if(evt.key === "Enter"){
        validateSchool();
    }
},false);

function toggleMenu(){
    if(menu.menuEnabled){
        document.getElementById("menu").style.width = "0";
        document.getElementById("menuControl").style.marginLeft = "0";
        document.getElementById("contact-about").style.marginLeft = "1%";
        document.getElementById("buttonImg").src = "assets/arrow.png";
        menu.menuEnabled = false;
        for(let card in menu.cards){
            if(menu.cards[card]){
                document.getElementById(card).classList.remove("vis");
            }
        }
    }else{
        document.getElementById("menu").style.width = "20%";
        document.getElementById("menuControl").style.marginLeft = "20%";
        document.getElementById("contact-about").style.marginLeft = "21%";
        document.getElementById("buttonImg").src = "assets/arrowLeft.png";
        menu.menuEnabled = true;
        setTimeout(enableCard,300);
    }
}
function disableFalseCards(){
    for(let card in menu.cards){
        if(!menu.cards[card]){
            document.getElementById(card).classList.remove("vis");
        }
    }
}
function enableCard(){
    var timeout = 150;
    if(menu.menuEnabled && menu.cards[Object.keys(menu.cards)[menu.iCard]]){
        document.getElementById(Object.keys(menu.cards)[menu.iCard]).classList.add("vis");
    }else if(menu.menuEnabled){
        timeout = 0;
    }
    menu.iCard++;
    if(menu.iCard>=7){
        menu.iCard = 0;
    }else{
        setTimeout(enableCard,timeout);
    }
}
function toggleCard(card){
    if(card == menu.contact_about){
        menu.contact_about = false;
    }else{
        menu.contact_about = card;
    }
    var contactElement = document.getElementById('contact-about');
    if(!menu.contact_about){
        contactElement.style.opacity = '0';
        contactElement.style.visibility = 'hidden';
    }else{
        contactElement.style.visibility = 'visible';
        contactElement.style.opacity = '1';
        contactElement.innerHTML = menu.infos[menu.contact_about];
    }
}
