const fetchCrypto = "http://api.coinlayer.com/api/live?access_key=fd26c812745fbb46a546eb54224dd5eb"; //api url + key
const $search = [document.querySelector("#search1"),document.querySelector("#search2")]; //text box
const $price = [$("#price1"),$("#price2")]; //price display
const $count = [document.querySelector("#number1"),document.querySelector("#number2")]; //currency number input field
const $convert = $("#convert-btn"); //convert button
let multRate = 1; //multiplication rate
let defaultCrypto = "BTC";
let roundNum = 2; //toFixed(2) rounds to nearest penny
let cryptoBrick = {}; //empty default cryptoAPI object
let cryptoKeys = []; //empty cryptoBrick keys list

function getCrypto(){ //initialization function
    fetch(fetchCrypto).then((response)=>{ //fetch response from crypto api
        response.json().then((data)=>{ //convert from json
            cryptoBrick = data.rates; //save the subobject 'rates' of the data object to our object 'cryptoBrick'
            console.log(cryptoBrick);
            cryptoBrick["USD"] = 1.00; //add USD to it
            cryptoKeys = Object.keys(cryptoBrick); //fill out an array of keys (crypto names like ETH, BTC, DOGE etc) for later
            compareRates(cryptoBrick,0,defaultCrypto,"USD"); //run a default compare function between BTC and USD
            return cryptoBrick; //set the cryptoBrick object in the main scope
        })
    })
    .catch((error)=>{ //if api fails
        alert('Crypto info request denied!');
    });
}

function compareRates(obj,targRate,rate1,rate2){ //compare function
    let target1 = 1; //defaults
    let target2 = 1;
    if (targRate != -1){ //if you entered an input field number (not 1 or "")
        target1 = obj[rate1]; //get the two target currencies from the cryptoChunk
        target2 = obj[rate2];
        if (target1 && target2){ //if they're both valid, continue
            if (targRate == 0){ //if the first input field number
                target2 = (target1 * multRate / target2).toFixed(roundNum); //if we enter 50 coins for the 1st slot, how many would the 2nd slot be?
                target1 = (target1 * multRate / target1).toFixed(roundNum); //50 coins
            }
            else if (targRate == 1){ //else if the second input field number
                target1 = (target2 * multRate / target1).toFixed(roundNum); //if we enter 50 coins for the 2nd slot, how many would the 1st slot be?
                target2 = (target2 * multRate / target2).toFixed(roundNum); //50 coins
            }
        }
        else{ //if one or both aren't valid, default to 1 USD each
            target1 = 1;
            target2 = 1;
        }
    }
    let compare = [target1 + " " + rate1,target2 + " " + rate2]; //string array
    appendRates(compare); //append the strings
}

function getSearch(event){
    event.preventDefault();
    let str = ["",""];
    let target = -1; //no number in the input field
    multRate = 1; //default number in the input field
    for (let i = 0; i < 2; i++){
        str[i] = $search[i].value.trim(); //get both input fields (only one can exist)
        if ((str[i]) && (str[i] !== "")){ //if valid
            str[i] = str[i].toUpperCase(); //convert to uppercase
            //if the cryptoList doesn't inlude the string key and it's not USD
            if ((cryptoKeys.includes(str[i]) === false) && (str[i] !== "USD")) alert("Currency " + (i + 1) + " not a valid entry!");
            else{ //if it's in the list
                let rate = Number($count[i].value.trim()); //get the number of the input field
                if ((rate) && (rate !== "") && (!isNaN(rate)) && (rate > 0)){ //if it's valid, not blank, is a string, and more than 0
                    multRate = rate; //that's the new number of targeted currency
                    target = i; //which input bar to car about (1st or 2nd)
                }
            }
        }
        else{ //default to USD
            str[i] = "USD";
        }

    }
    console.log(str[0],str[1]);
    compareRates(cryptoBrick,target,str[0],str[1]); //compare the new currencies and their rates
}

function appendRates(compare){ //append info to the dom
    for (let i = 0; i < 2; i++) $price[i].empty().append(compare[i]);
}

//only uncomment below when ready to test request, we have a limited number of requests!
cryptoBrick = getCrypto(); //initialize API (on program start)

$convert.on("click",getSearch); //search button
//if entering in a value in an input field, delete the other value in the other input field
$count[0].addEventListener("focus", (event)=>{
    event.preventDefault();
    $count[1].value = "";
});
$count[1].addEventListener("focus", (event)=>{
    event.preventDefault();
    $count[0].value = "";
});