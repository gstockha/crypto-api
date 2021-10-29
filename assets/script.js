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
            console.log(cryptoBrick);
            cryptoBrick["USD"] = 1.00;
            cryptoKeys = Object.keys(cryptoBrick);
            //multRate = cryptoBrick[defaultCrypto];
            compareRates(cryptoBrick,0,defaultCrypto,"USD");
            return cryptoBrick;
        })
    })
    .catch((error)=>{
        alert('Crypto info request deined!');
    });
}

function compareRates(obj,targRate,rate1,rate2){
    let target1 = 1;
    let target2 = 1;
    if (targRate != -1){ //not default
        target1 = obj[rate1];
        target2 = obj[rate2];
        if (target1 && target2){
            if (targRate == 0){
                target2 = (target1 * multRate / target2).toFixed(roundNum);
                target1 = (target1 * multRate / target1).toFixed(roundNum);
            }
            if (targRate == 1){
                target1 = (target2 * multRate / target1).toFixed(roundNum);
                target2 = (target2 * multRate / target2).toFixed(roundNum);
            }
        }
        else{
            target1 = 1;
            target2 = 1;
        }
    }
    let compare = [target1 + " " + rate1,target2 + " " + rate2];
    appendRates(compare);
}

function getSearch(event){
    event.preventDefault();
    let str = ["",""];
    let applyRate;
    let target = -1;
    multRate = 1;
    for (let i = 0; i < 2; i++){
        applyRate = false;
        str[i] = $search[i].value.trim();
        if ((str[i]) && (str[i] !== "")){ //if valid
            str[i] = str[i].toUpperCase();
            if ((cryptoKeys.includes(str[i]) === false) && (str[i] !== "USD")) alert("Currency " + (i + 1) + " not a valid entry!");
            else applyRate = true;
        }
        else{ //default to USD
            str[i] = "USD";
        }
        if (applyRate){
            let rate = Number($count[i].value.trim());
            if ((rate) && (rate !== "") && (!isNaN(rate)) && (rate > 0)){
                multRate = rate;
                target = i;
            }
        }
    }
    console.log(target);
    console.log(str[0],str[1]);
    compareRates(cryptoBrick,target,str[0],str[1]);
}

function appendRates(compare){
    for (let i = 0; i < 2; i++) $price[i].empty().append(compare[i]);
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