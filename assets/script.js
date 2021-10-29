const fetchCrypto = "http://api.coinlayer.com/api/live?access_key=fd26c812745fbb46a546eb54224dd5eb";
const $search = [$("#search1"),$("#search2")]; //text box
const $price = [$("#price1"),$("#price2")]; //price display
const $convert = $("#convert-btn"); //convert button

function getCrypto(){
    fetch(fetchCrypto).then((response)=>{
        response.json().then((data)=>{
            let cryptoBrick = data.rates;
            console.log(cryptoBrick);
            return cryptoBrick;
        })
    })
    .catch((error)=>{
        alert('Crypto info request deined!');
    });
}

//const cryptoBrick = getCrypto();

$($search[0]).on("click", enterCity);
$($cityList).on("click", clickCity);