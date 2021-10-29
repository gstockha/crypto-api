const fetchCrypto = "http://api.coinlayer.com/api/live?access_key=fd26c812745fbb46a546eb54224dd5eb";
const $search = [document.querySelector("#search1"),document.querySelector("#search2")]; //text box
const $price = [$("#price1"),$("#price2")]; //price display
const $count = [document.querySelector("#number1"),document.querySelector("#number2")];
const $convert = $("#convert-btn"); //convert button
let multRate = 1; //multiplication rate
let defaultCrypto = "BTC";
let roundNum = 2; //toFixed(2) rounds to nearest penny
let cryptoBrick = {}; //empty default cryptoAPI object
let cryptoKeys = []; //empty cryptoBrick keys list

function getCrypto(){
    fetch(fetchCrypto).then((response)=>{
        response.json().then((data)=>{
            cryptoBrick = data.rates;
            cryptoKeys = Object.keys(cryptoBrick);
            console.log(cryptoBrick);
            compareRates(cryptoBrick,defaultCrypto,"USD");
            return cryptoBrick;
        })
    })
    .catch((error)=>{
        alert('Crypto info request deined!');
    });
}

function compareRates(obj,rate1,rate2){
    let usdRate = "1.00";
    let target1 = usdRate;
    let target2 = usdRate;
    if (rate1 !== "USD"){
        target1 = obj[rate1];
        if (target1){ //if valid
            target1 = multRateRound(target1);
        }
    }
    if (rate2 !== "USD"){
        target2 = obj[rate2];
        if (target2){
            target2 = multRateRound(target2);
        }
    }
    let compare = [target1 + " " + rate1,target2 + " " + rate2];
    appendRates(compare);
}

function appendRates(compare){
    for (let i = 0; i < 2; i++) $price[i].empty().append(compare[i]);
}

function multRateRound(rate){
    return (rate * multRate).toFixed(roundNum);
}

function getSearch(event){
    event.preventDefault();
    let str = ["",""];
    let alrt;
    for (let i = 0; i < 2; i++){
        alrt = false;
        str[i] = $search[i].value.trim();
        if ((str[i]) && (str[i] !== "")){ //if valid
            str[i] = str[i].toUpperCase();
            if (cryptoKeys.includes(str[i]) === false) alrt = true;
            else{
                let rate = Number($count[i].value.trim());
                if (!isNaN(rate) && (rate > 0)) multRate = rate;
                console.log(multRate);
            }
        }
        else alrt = true;
        if (alrt) return alert("Currency " + (i + 1) + " not a valid entry!");
    }
    console.log(str[0],str[1]);
    compareRates(cryptoBrick,str[0],str[1]);
}

//only uncomment below when ready to test request, we have a limited number of requests!
cryptoBrick = getCrypto();

$convert.on("click",getSearch);
//if entering in a value, delete the other value
$count[0].addEventListener("focus", (event)=>{
    event.preventDefault();
    $count[1].value = "";
});
$count[1].addEventListener("focus", (event)=>{
    event.preventDefault();
    $count[0].value = "";
});