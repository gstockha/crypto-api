const fetchCrypto = "https://api.coinlayer.com/api/live?access_key=370288340efa1d60fd362618b351ed65";
const $search = [document.querySelector("#search1"),document.querySelector("#search2")]; //text box
const $price = [$("#price1"),$("#price2")]; //price display
const $count = [document.querySelector("#number1"),document.querySelector("#number2")]; //currency number input field
const $convert = $("#convert-btn"); //convert button
const $stats = $("#stats"); //stat list
const $open = [document.getElementById('open1'),document.getElementById('open2')];
const $modal = document.getElementById('modal-container');
const $close = document.getElementById('close');
const $list = $("#search-list");
const $clist = $("#choose-list");
let multRate = 1; //multiplication rate
let defaultCrypto = ["DOGE","USD"];
let defaultTarget = 0; //for comparison order
let roundNum = 2; //toFixed(2) rounds to nearest penny
let cryptoBrick = {}; //empty default cryptoAPI object
let cryptoKeys = []; //empty cryptoBrick keys list
let graphList = [];
let lastList = [];
let firstDraw = true; //don't save the draw graph on default draw
let modalMode = 0;

function getCrypto(){ //initialization function to get crypto prices
    fetch(fetchCrypto).then((response)=>{ //fetch response from crypto api
        response.json().then((data)=>{ //convert from json
            if (data.rates === undefined){
                return getPlanB();
            }
            cryptoBrick = data.rates; //save the subobject 'rates' of the data object to our object 'cryptoBrick'
            finishBrick();
            localStorage.setItem("brick",JSON.stringify(cryptoBrick));
        })
    })
    .catch((error)=>{ //if api fails, load last memoried one
        let crypto = JSON.parse(localStorage.getItem("brick"));
        if (crypto != null){
            cryptoBrick = crypto;
            finishBrick();
        }
    });
}

function getPlanB(){ //plan b for init function
    fetch('https://api.coinlore.net/api/tickers/').then((response)=>{ //if that fails, refer to other api
        response.json().then((data)=>{
            let symbol;
            let target;
            console.log(data);
            if (data.data === undefined){
                return getPlanC();
            }
            for (let i = 0; i < data.data.length; i++){
                target = data.data[i];
                symbol = target["symbol"];
                cryptoBrick[symbol] = target["price_usd"];
            }
            localStorage.setItem("brick",JSON.stringify(cryptoBrick));
            finishBrick();
        })
    })
    .catch((error)=>{
        let crypto = JSON.parse(localStorage.getItem("brick"));
        if (crypto != null){
            cryptoBrick = crypto;
            finishBrick();
        }
        else console.log('Crypto data not found!');
    });
}

function finishBrick(){ //finishing touches on cryptoBrick for the methods in above function
    cryptoBrick["USD"] = 1.00; //add usd
    console.log(cryptoBrick);
    cryptoKeys = Object.keys(cryptoBrick); //fill out an array of keys (crypto names like ETH, BTC, DOGE etc) for later
    compareRates(cryptoBrick,defaultTarget,defaultCrypto[0],defaultCrypto[1],false); //run a default compare function between BTC and USD
    firstDraw = false;
    for (let i = 0; i < cryptoKeys.length; i++){
        $clist.append("<button>");
        $clist.children("button")[i].append(cryptoKeys[i]);
    }
    // let cryKeys = "";
    // for (let i = 0; i < cryptoKeys.length; i++){
    //     if (i>0) cryKeys += (", " + cryptoKeys[i]);
    //     else cryKeys += (cryptoKeys[i]);
    // }
    // $list.append('<h4>').children('h4').append(cryKeys);
}

function getStats(){ //get global market data
    fetch('https://api.coinlore.net/api/global/').then((response)=>{
        response.json().then((data)=>{
            let stats = data[0];
            console.log(stats);
            $stats.append('<li>','<li>','<li>','<li>');
            $stats.children('li')[0].append('Market Cap change: ' + stats.mcap_change +'%');
            $stats.children('li')[1].append('Total Market Cap: ' + stats.total_mcap);
            $stats.children('li')[2].append('Volume change: ' + stats.volume_change +'%');
            $stats.children('li')[3].append('Total Volume: ' + stats.total_volume);
        })
    })
    .catch((error)=>{
        console.log('Market stat request denied!');
    })
}

function compareRates(obj,targRate,rate1,rate2,save){ //compare numbers & prices of crypto (math)
    let target1 = obj[rate1]; //get the two target currencies from the cryptoChunk
    let target2 = obj[rate2];
    if (targRate != -1){ //if you entered an input field number (not 1 or "")
        if ((target1 && target2) && (target1 !== target2)){ //if they're both valid, continue
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
            target1 = multRate;
            target2 = multRate;
        }
    }
    else{ //1:1 comparison
        if (target1 > target2){
            target2 = target1 / target2;
            target1 = 1;
        }
        else if (target2 > target1){
            target1 = target2 / target1;
            target2 = 1;
        }
        else{
            target1 = 1;
            target2 = 1;
        }
    }
    //round and add to dom
    let round1 = parseFloat(target1);
    let round2 = parseFloat(target2);
    if (round1 >= 1) round1 = round1.toFixed(2);
    else round1 = round1.toFixed(4);
    if (round2 >= 1) round2 = round2.toFixed(2);
    else round2 = round2.toFixed(4);
    let compare = [round1 + " " + rate1,round2 + " " + rate2]; //string array
    for (let i = 0; i < 2; i++) $price[i].empty().append(compare[i]); //append the strings
    if (save) localStorage.setItem("compare",JSON.stringify([targRate,rate1,rate2]));
    //add their rate to USD to graph
    lastList = saveLastList(graphList);
    addGraphList(rate1,obj[rate1]);
    addGraphList(rate2,obj[rate2]);
}

function getSearch(event){ //get the search string from input
    event.preventDefault();
    let str = ["",""];
    let target = -1; //no number in the input field
    multRate = 1; //default number in the input field
    for (let i = 0; i < 2; i++){
        str[i] = $search[i].value.trim(); //get both input fields (only one can exist)
        if ((str[i]) && (str[i] !== "")){ //if valid
            str[i] = str[i].toUpperCase(); //convert to uppercase
            //if the cryptoList doesn't inlude the string key and it's not USD
            if ((cryptoKeys.includes(str[i]) === false) && (str[i] !== "USD")){
                return console.log("Currency " + (i + 1) + " not a valid entry!");
            }
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
    console.log(target,str[0],str[1]);
    compareRates(cryptoBrick,target,str[0],str[1],true); //compare the new currencies and their rates
}

function addGraphList(key,value){ //add new value to graph
    if ((key === "USD") || (graphList.some(row => row.includes(key)))) return false;
    graphList.unshift([key,value,rgbaRandom(.75)]); //add to beginning
    if (graphList.length > 20) graphList.pop(); //keep 20 or below
    drawOnGraph(graphList.length);
}

function drawOnGraph(length){ //draw the graph
    if (length > 8) length = 8;
    cryptoChart.data.datasets[0].data = []; //clear data
    cryptoChart.data.labels = []; //clear labels
    cryptoChart.data.datasets[0].backgroundColor = []; //clear colors
    for (let i = 0; i < length; i++){
        cryptoChart.data.labels.push(graphList[i][0]); //add key
        cryptoChart.data.datasets[0].data.push(graphList[i][1]); //add value
        cryptoChart.data.datasets[0].backgroundColor.push(graphList[i][2]); //add color
    }
    cryptoChart.update(); //update graph
    if (!firstDraw) localStorage.setItem("graphList",JSON.stringify(graphList));
}

function rgbaRandom(alpha) { //for colored bars on graph
    let o, r, s;
    let c = [];
    let rand = Math.floor(Math.random() * 3);
    for (let i = 0; i < 3; i++){
        if (rand !== i){
            o = Math.round, r = Math.random, s = 255;
            c[i] = o(r()*s);
        }
        else c[i] = 255;
    }
    return 'rgba(' + c[0] + ',' + c[1] + ',' + c[2] + ',' + alpha + ')';
}

function saveLastList(list){ //for undo button
    let lastList = [];
    if (list.length < 1) return lastList;
    for (let i = 0; i < list.length; i++){
        lastList[i] = list[i];
    }
    return lastList;
}

function loadStuff(){
    let recent = JSON.parse(localStorage.getItem("compare"));
    if (recent != null){
        defaultTarget = recent[0];
        defaultCrypto[0] = recent[1];
        defaultCrypto[1] = recent[2];
    }
    let graph = JSON.parse(localStorage.getItem("graphList"));
    if (graph != null){
        for (let i = 0; i < graph.length; i++){
            graphList[i] = graph[i];
        }
        drawOnGraph(graphList.length);
    }
}

loadStuff();
getCrypto(); //initialize API (on program start) only uncomment below when ready to test request, we have a limited number of requests!
getStats();

$convert.on("click",getSearch); //search button
$("#undo-graph").on("click",(event)=>{
    event.preventDefault;
    console.log('undo');
    if (lastList.length < 1) return false;
    let tempList = [];
    if (graphList.length > 0) tempList = graphList;
    graphList = lastList;
    lastList = saveLastList(tempList);
    drawOnGraph(graphList.length);
});
$("#clear-graph").on("click",(event)=>{
    event.preventDefault;
    if (graphList.length < 1) return false;
    console.log('clear');
    lastList = saveLastList(graphList); //save
    graphList = []; //clear
    drawOnGraph(0);
});
$("#ascend-graph").on("click",(event)=>{
    event.preventDefault;
    console.log('ascend');
    if (graphList.length < 2) return false;
    lastList = saveLastList(graphList); //save
    graphList = graphList.sort((a,b) => b[1] - a[1]); //sort list ascending
    drawOnGraph(graphList.length);
});
$("#descend-graph").on("click",(event)=>{
    event.preventDefault;
    console.log('descend');
    if (graphList.length < 2) return false;
    lastList = saveLastList(graphList); //save
    graphList = graphList.sort((a,b) => a[1] - b[1]); //sort list descending
    drawOnGraph(graphList.length);
});
//if entering in a value in an input field, delete the other value in the other input field
$count[0].addEventListener("focus", (event)=>{
    event.preventDefault();
    $count[1].value = "";
});
$count[1].addEventListener("focus", (event)=>{
    event.preventDefault();
    $count[0].value = "";
});
//modal
for (let i = 0; i < 2; i++){
    $open[i].addEventListener('click', (event)=>{
        event.preventDefault();
        modalMode = i;
        $modal.classList.add('show');
    });
}
$clist.on('click', (event)=>{
    event.preventDefault();
    console.log(event.target.innerHTML);
    $search[modalMode].value = event.target.innerHTML;
});
$close.addEventListener('click', (event)=>{
    event.preventDefault();
    $modal.classList.remove('show');
});
$modal.addEventListener('click', (event)=>{ //can just click off of it too
    event.preventDefault();
    $modal.classList.remove('show');
});
