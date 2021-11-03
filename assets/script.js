const fetchCrypto = "http://api.coinlayer.com/api/live?access_key=fd26c812745fbb46a546eb54224dd5eb"; //api url + key
const $search = [document.querySelector("#search1"),document.querySelector("#search2")]; //text box
const $price = [$("#price1"),$("#price2")]; //price display
const $count = [document.querySelector("#number1"),document.querySelector("#number2")]; //currency number input field
const $convert = $("#convert-btn"); //convert button
const $stats = $("#stats"); //stat list
let multRate = 1; //multiplication rate
let defaultCrypto = "DOGE";
let roundNum = 2; //toFixed(2) rounds to nearest penny
let cryptoBrick = {}; //empty default cryptoAPI object
let cryptoKeys = []; //empty cryptoBrick keys list
let graphList = [];
let lastList = [];

function getCrypto(){ //initialization function
    //fetch(fetchCrypto).then((response)=>{ //fetch response from crypto api
        //response.json().then((data)=>{ //convert from json
            cryptoBrick = { //DELETE THIS WHEN READY
                "611": 0.389165,
                "ABC": 59.99,
                "ACP": 0.014931,
                "ACT": 0.014797,
                "ACT*": 0.017178,
                "ADA": 1.951367,
                "ADCN": 0.00013,
                "ADL": 0.01515,
                "ADX": 0.870663,
                "ADZ": 0.0023,
                "AE": 0.136236,
                "AGI": 0,
                "AIB": 0.005626,
                "AIDOC": 0.000735,
                "AION": 0.180781,
                "AIR": 0.001506,
                "ALT": 0.565615,
                "AMB": 0.0406,
                "AMM": 0.01553,
                "ANT": 4.7012,
                "APC": 0.0017,
                "APPC": 0.064168,
                "ARC": 0.0169,
                "ARCT": 0.00061,
                "ARDR": 0.339159,
                "ARK": 3.173139,
                "ARN": 0.067849,
                "ASAFE2": 0.4,
                "AST": 0.330167,
                "ATB": 0.017,
                "ATM": 19.8995,
                "AURS": 0.352867,
                "AVT": 0,
                "BAR": 14.78,
                "BASH": 0.0056,
                "BAT": 1.023151,
                "BAY": 0.0644,
                "BBP": 0.0005,
                "BCD": 1.942886,
                "BCH": 587.277072,
                "BCN": 0.000372,
                "BCPT": 0.003057,
                "BEE": 0.000001,
                "BIO": 0.0008,
                "BLC": 0.072132,
                "BLOCK": 0.956,
                "BLU": 0.00054,
                "BLZ": 0.272272,
                "BMC": 0.043172,
                "BNB": 551.109396,
                "BNT": 4.274033,
                "BOST": 0.048,
                "BQ": 0.00007775,
                "BQX": 2.720931,
                "BRD": 0.202047,
                "BRIT": 0.03,
                "BT1": 0,
                "BT2": 0,
                "BTC": 61133.498751,
                "BTCA": 0.00036,
                "BTCS": 0.01201,
                "BTCZ": 0.000749,
                "BTG": 64.473153,
                "BTLC": 9,
                "BTM": 0.078282,
                "BTM*": 0.122609,
                "BTQ": 0.01,
                "BTS": 0.053313,
                "BTX": 0.362037,
                "BURST": 0.017348,
                "CALC": 0.0006,
                "CAS": 0.007,
                "CAT": 0.186002,
                "CCRB": 0.08888,
                "CDT": 0.070685,
                "CESC": 0.0037,
                "CHAT": 0.002325,
                "CJ": 0.000898,
                "CL": 0.028,
                "CLD": 0.02,
                "CLOAK": 10,
                "CMT*": 0.03954,
                "CND": 0.016952,
                "CNX": 1.996594,
                "CPC": 0.0005,
                "CRAVE": 0.4,
                "CRC": 0.08475,
                "CRE": 1.316485,
                "CRW": 0.07448,
                "CTO": 0.005,
                "CTR": 0.017017,
                "CVC": 0.476211,
                "DAS": 0.937816,
                "DASH": 189.780354,
                "DAT": 0.069899,
                "DATA": 0.13915,
                "DBC": 0.006114,
                "DBET": 0.027656,
                "DCN": 0.0000267688,
                "DCR": 112.016988,
                "DCT": 0.00059,
                "DEEP": 0.001,
                "DENT": 0.006869,
                "DGB": 0.055181,
                "DGD": 819.25398,
                "DIM": 0.000094957,
                "DIME": 0.00003,
                "DMD": 0.58782,
                "DNT": 0.168451,
                "DOGE": 0.271675,
                "DRGN": 0.141463,
                "DRZ": 3,
                "DSH": 252.13175,
                "DTA": 0.000384,
                "EC": 50,
                "EDG": 0.016255,
                "EDO": 1.1014,
                "EDR": 0,
                "EKO": 0.001081,
                "ELA": 4.381701,
                "ELF": 0.609759,
                "EMC": 0.06359,
                "EMGO": 0.43382,
                "ENG": 0.09049,
                "ENJ": 2.625416,
                "EOS": 4.648775,
                "ERT": 0.2054,
                "ETC": 53.784169,
                "ETH": 4321.851154,
                "ETN": 0.01701,
                "ETP": 0.346051,
                "ETT": 2.9,
                "EVR": 0.104931,
                "EVX": 0.624643,
                "FCT": 1.612994,
                "FLP": 0.0083,
                "FOTA": 0.000379,
                "FRST": 0.78001,
                "FUEL": 0.000844,
                "FUN": 0.019664,
                "FUNC": 0.00061,
                "FUTC": 0.004,
                "GAME": 0.197108,
                "GAS": 8.812274,
                "GBYTE": 35.292657,
                "GMX": 0.00006467,
                "GNO": 470,
                "GNT": 0.576223,
                "GNX": 0.032372,
                "GRC": 0.0067,
                "GRS": 10,
                "GRWI": 10000,
                "GTC": 9.188719,
                "GTO": 0.052633,
                "GUP": 0.00144,
                "GVT": 1.518768,
                "GXS": 0.394204,
                "HAC": 0.001427,
                "HNC": 0,
                "HSR": 1.874172,
                "HST": 0.0027,
                "HVN": 0.03529,
                "ICN": 0.145345,
                "ICOS": 17,
                "ICX": 2.329817,
                "IGNIS": 0.024985,
                "ILC": 0.098703,
                "INK": 0.000935,
                "INS": 0.377858,
                "INSN": 0.0473,
                "INT": 0.013413,
                "IOP": 15.455555,
                "IOST": 0.04886,
                "ITC": 0.094244,
                "KCS": 17.372046,
                "KICK": 0.000324,
                "KIN": 0.0000786485,
                "KLC": 0.000703,
                "KMD": 1.035119,
                "KNC": 1.977397,
                "KRB": 6,
                "LA": 0.140122,
                "LEND": 3.264494,
                "LEO": 3.294703,
                "LINDA": 0.000271,
                "LINK": 31.541717,
                "LOC": 6.612146,
                "LOG": 0.060174,
                "LRC": 1.0524,
                "LSK": 3.432252,
                "LTC": 198.000557,
                "LUN": 0.104557,
                "LUX": 0.00000209,
                "MAID": 0.553198,
                "MANA": 3.073366,
                "MCAP": 0.005398,
                "MCO": 8.76876,
                "MDA": 0.735569,
                "MDS": 0.004937,
                "MIOTA": 1.402,
                "MKR": 2462.276028,
                "MLN": 131.419042,
                "MNX": 0.028649,
                "MOD": 1.308908,
                "MOIN": 0.033073,
                "MONA": 1.575541,
                "MTL": 3.494499,
                "MTN*": 0.009575,
                "MTX": 0.030546,
                "NAS": 0.409281,
                "NAV": 0.449923,
                "NBT": 195.195769,
                "NDC": 0.008989,
                "NEBL": 1.40749,
                "NEO": 45.273572,
                "NEU": 0.126327,
                "NEWB": 0.002604,
                "NGC": 0.260798,
                "NKC": 0.002946,
                "NLC2": 0.599935,
                "NMC": 5.867998,
                "NMR": 43.372325,
                "NULS": 0.557057,
                "NVC": 10,
                "NXT": 0.019836,
                "OAX": 0.265028,
                "OBITS": 0.015,
                "OC": 0.001099,
                "OCN": 0.000882,
                "ODN": 0.5,
                "OK": 0.025681,
                "OMG": 14.734374,
                "OMNI": 3.3742,
                "ORE": 0,
                "ORME": 1.235715,
                "OST": 0.006637,
                "OTN": 0,
                "OTX": 0.023,
                "OXY": 2.169,
                "PART": 3.951477,
                "PAY": 0.028431,
                "PBT": 642.629641,
                "PCS": 0.019961,
                "PIVX": 0.793008,
                "PIZZA": 0.001,
                "PLBT": 20,
                "PLR": 0.030613,
                "POE": 0.000122,
                "POLY": 0.6986,
                "POSW": 0.48712,
                "POWR": 0.368073,
                "PPC": 0.913005,
                "PPT": 0.599599,
                "PPY": 5.45,
                "PRC": 0.00003,
                "PRES": 0.219998,
                "PRG": 0.612149,
                "PRL": 0.061361,
                "PRO": 1.925974,
                "PURA": 0.25,
                "PUT": 0,
                "QASH": 0.097701,
                "QAU": 0,
                "QSP": 0.057474,
                "QTUM": 17.041105,
                "QUN": 0.008318,
                "R": 1,
                "RBIES": 1,
                "RCN": 0.023201,
                "RDD": 0.002258,
                "RDN": 0,
                "RDN*": 0.324446,
                "REBL": 0.004583,
                "REE": 0.00001,
                "REP": 25.562,
                "REQ": 0.20801,
                "REV": 0.015285,
                "RGC": 0.001,
                "RHOC": 0.178417,
                "RIYA": 0.090025,
                "RKC": 5,
                "RLC": 4.324897,
                "RPX": 0.136964,
                "RUFF": 0.004605,
                "SALT": 0.768708,
                "SAN": 0.51,
                "SBC": 7,
                "SC": 0.020058,
                "SENT": 0.0059,
                "SHIFT": 0,
                "SIB": 5.177,
                "SMART": 0.005178,
                "SMLY": 0.00006,
                "SMT*": 0.011226,
                "SNC": 0.030913,
                "SNGLS": 0.000402,
                "SNM": 0.256797,
                "SNT": 0.092129,
                "SPK": 0.0084,
                "SRN": 0.011523,
                "STEEM": 0.605119,
                "STK": 0.001223,
                "STORJ": 1.845273,
                "STRAT": 0.871235,
                "STU": 0.00019,
                "STX": 0.986471,
                "SUB": 0.003534,
                "SUR": 0.35,
                "SWFTC": 0.00169,
                "SYS": 0.321621,
                "TAAS": 10,
                "TESLA": 0.019139,
                "THC": 0.01284,
                "THETA": 7.33834,
                "THS": 0.00171,
                "TIO": 0.085,
                "TKN": 0,
                "TKY": 0.001463,
                "TNB": 0.002406,
                "TNT": 0.02055,
                "TOA": 0.002397,
                "TRC": 6.2,
                "TRIG": 1.210663,
                "TRST": 0.04799,
                "TRUMP": 0.055,
                "TRX": 0.100548,
                "UBQ": 0.210531,
                "UNO": 114.9998,
                "UNRC": 0.00006,
                "UQC": 19,
                "USDT": 1.002227,
                "UTK": 0.384813,
                "UTT": 0.3138,
                "VEE": 0.01925,
                "VEN": 8.515822,
                "VERI": 23.736235,
                "VIA": 0.231127,
                "VIB": 0.052935,
                "VIBE": 0.022011,
                "VOISE": 0.00018,
                "VOX": 1720.72514,
                "VRS": 0.1375,
                "VTC": 0.667087,
                "VUC": 0.000099,
                "WABI": 0.209249,
                "WAVES": 26.492124,
                "WAX": 0.4327,
                "WC": 0.045,
                "WGR": 0.05075,
                "WINGS": 0.035464,
                "WLK": 0.0058,
                "WOP": 0.046453,
                "WPR": 0.011048,
                "WRC": 0.00055,
                "WTC": 0.980279,
                "XAUR": 0.10301,
                "XBP": 0.0027,
                "XBY": 0.2889,
                "XCP": 9.1723,
                "XCXT": 0.095658,
                "XDN": 0.00101,
                "XEM": 0.194249,
                "XGB": 0.0015,
                "XHI": 0.001325,
                "XID": 0.010924,
                "XLM": 0.36671,
                "XMR": 271.262113,
                "XNC": 0.00018,
                "XRB": 55.426154,
                "XRP": 1.093796,
                "XTO": 0.324858,
                "XTZ": 6.251783,
                "XUC": 0.10635,
                "XVG": 0.023861,
                "XZC": 4.96985,
                "YEE": 0.001485,
                "YOC": 0.00012,
                "YOYOW": 0.0214,
                "ZBC": 0,
                "ZCL": 0.134512,
                "ZEC": 168.829964,
                "ZEN": 86.6099,
                "ZIL": 0.111621,
                "ZNY": 0.02,
                "ZRX": 1.232812,
                "ZSC": 0.00028,
                "USD": 1
            }
            //cryptoBrick = data.rates; //save the subobject 'rates' of the data object to our object 'cryptoBrick'
            console.log(cryptoBrick);
            cryptoBrick["USD"] = 1.00; //add USD to it
            cryptoKeys = Object.keys(cryptoBrick); //fill out an array of keys (crypto names like ETH, BTC, DOGE etc) for later
            compareRates(cryptoBrick,0,defaultCrypto,"USD"); //run a default compare function between BTC and USD
        //})
    //})
    //.catch((error)=>{ //if api fails
        // cryptoBrick = { //DELETE THIS WHEN READY
        //     "611": 0.389165,
        //     "ABC": 59.99,
        //     "ACP": 0.014931,
        //     "ACT": 0.014797,
        //     "ACT*": 0.017178,
        //     "ADA": 1.951367,
        //     "ADCN": 0.00013,
        //     "ADL": 0.01515,
        //     "ADX": 0.870663,
        //     "ADZ": 0.0023,
        //     "AE": 0.136236,
        //     "AGI": 0,
        //     "AIB": 0.005626,
        //     "AIDOC": 0.000735,
        //     "AION": 0.180781,
        //     "AIR": 0.001506,
        //     "ALT": 0.565615,
        //     "AMB": 0.0406,
        //     "AMM": 0.01553,
        //     "ANT": 4.7012,
        //     "APC": 0.0017,
        //     "APPC": 0.064168,
        //     "ARC": 0.0169,
        //     "ARCT": 0.00061,
        //     "ARDR": 0.339159,
        //     "ARK": 3.173139,
        //     "ARN": 0.067849,
        //     "ASAFE2": 0.4,
        //     "AST": 0.330167,
        //     "ATB": 0.017,
        //     "ATM": 19.8995,
        //     "AURS": 0.352867,
        //     "AVT": 0,
        //     "BAR": 14.78,
        //     "BASH": 0.0056,
        //     "BAT": 1.023151,
        //     "BAY": 0.0644,
        //     "BBP": 0.0005,
        //     "BCD": 1.942886,
        //     "BCH": 587.277072,
        //     "BCN": 0.000372,
        //     "BCPT": 0.003057,
        //     "BEE": 0.000001,
        //     "BIO": 0.0008,
        //     "BLC": 0.072132,
        //     "BLOCK": 0.956,
        //     "BLU": 0.00054,
        //     "BLZ": 0.272272,
        //     "BMC": 0.043172,
        //     "BNB": 551.109396,
        //     "BNT": 4.274033,
        //     "BOST": 0.048,
        //     "BQ": 0.00007775,
        //     "BQX": 2.720931,
        //     "BRD": 0.202047,
        //     "BRIT": 0.03,
        //     "BT1": 0,
        //     "BT2": 0,
        //     "BTC": 61133.498751,
        //     "BTCA": 0.00036,
        //     "BTCS": 0.01201,
        //     "BTCZ": 0.000749,
        //     "BTG": 64.473153,
        //     "BTLC": 9,
        //     "BTM": 0.078282,
        //     "BTM*": 0.122609,
        //     "BTQ": 0.01,
        //     "BTS": 0.053313,
        //     "BTX": 0.362037,
        //     "BURST": 0.017348,
        //     "CALC": 0.0006,
        //     "CAS": 0.007,
        //     "CAT": 0.186002,
        //     "CCRB": 0.08888,
        //     "CDT": 0.070685,
        //     "CESC": 0.0037,
        //     "CHAT": 0.002325,
        //     "CJ": 0.000898,
        //     "CL": 0.028,
        //     "CLD": 0.02,
        //     "CLOAK": 10,
        //     "CMT*": 0.03954,
        //     "CND": 0.016952,
        //     "CNX": 1.996594,
        //     "CPC": 0.0005,
        //     "CRAVE": 0.4,
        //     "CRC": 0.08475,
        //     "CRE": 1.316485,
        //     "CRW": 0.07448,
        //     "CTO": 0.005,
        //     "CTR": 0.017017,
        //     "CVC": 0.476211,
        //     "DAS": 0.937816,
        //     "DASH": 189.780354,
        //     "DAT": 0.069899,
        //     "DATA": 0.13915,
        //     "DBC": 0.006114,
        //     "DBET": 0.027656,
        //     "DCN": 0.0000267688,
        //     "DCR": 112.016988,
        //     "DCT": 0.00059,
        //     "DEEP": 0.001,
        //     "DENT": 0.006869,
        //     "DGB": 0.055181,
        //     "DGD": 819.25398,
        //     "DIM": 0.000094957,
        //     "DIME": 0.00003,
        //     "DMD": 0.58782,
        //     "DNT": 0.168451,
        //     "DOGE": 0.271675,
        //     "DRGN": 0.141463,
        //     "DRZ": 3,
        //     "DSH": 252.13175,
        //     "DTA": 0.000384,
        //     "EC": 50,
        //     "EDG": 0.016255,
        //     "EDO": 1.1014,
        //     "EDR": 0,
        //     "EKO": 0.001081,
        //     "ELA": 4.381701,
        //     "ELF": 0.609759,
        //     "EMC": 0.06359,
        //     "EMGO": 0.43382,
        //     "ENG": 0.09049,
        //     "ENJ": 2.625416,
        //     "EOS": 4.648775,
        //     "ERT": 0.2054,
        //     "ETC": 53.784169,
        //     "ETH": 4321.851154,
        //     "ETN": 0.01701,
        //     "ETP": 0.346051,
        //     "ETT": 2.9,
        //     "EVR": 0.104931,
        //     "EVX": 0.624643,
        //     "FCT": 1.612994,
        //     "FLP": 0.0083,
        //     "FOTA": 0.000379,
        //     "FRST": 0.78001,
        //     "FUEL": 0.000844,
        //     "FUN": 0.019664,
        //     "FUNC": 0.00061,
        //     "FUTC": 0.004,
        //     "GAME": 0.197108,
        //     "GAS": 8.812274,
        //     "GBYTE": 35.292657,
        //     "GMX": 0.00006467,
        //     "GNO": 470,
        //     "GNT": 0.576223,
        //     "GNX": 0.032372,
        //     "GRC": 0.0067,
        //     "GRS": 10,
        //     "GRWI": 10000,
        //     "GTC": 9.188719,
        //     "GTO": 0.052633,
        //     "GUP": 0.00144,
        //     "GVT": 1.518768,
        //     "GXS": 0.394204,
        //     "HAC": 0.001427,
        //     "HNC": 0,
        //     "HSR": 1.874172,
        //     "HST": 0.0027,
        //     "HVN": 0.03529,
        //     "ICN": 0.145345,
        //     "ICOS": 17,
        //     "ICX": 2.329817,
        //     "IGNIS": 0.024985,
        //     "ILC": 0.098703,
        //     "INK": 0.000935,
        //     "INS": 0.377858,
        //     "INSN": 0.0473,
        //     "INT": 0.013413,
        //     "IOP": 15.455555,
        //     "IOST": 0.04886,
        //     "ITC": 0.094244,
        //     "KCS": 17.372046,
        //     "KICK": 0.000324,
        //     "KIN": 0.0000786485,
        //     "KLC": 0.000703,
        //     "KMD": 1.035119,
        //     "KNC": 1.977397,
        //     "KRB": 6,
        //     "LA": 0.140122,
        //     "LEND": 3.264494,
        //     "LEO": 3.294703,
        //     "LINDA": 0.000271,
        //     "LINK": 31.541717,
        //     "LOC": 6.612146,
        //     "LOG": 0.060174,
        //     "LRC": 1.0524,
        //     "LSK": 3.432252,
        //     "LTC": 198.000557,
        //     "LUN": 0.104557,
        //     "LUX": 0.00000209,
        //     "MAID": 0.553198,
        //     "MANA": 3.073366,
        //     "MCAP": 0.005398,
        //     "MCO": 8.76876,
        //     "MDA": 0.735569,
        //     "MDS": 0.004937,
        //     "MIOTA": 1.402,
        //     "MKR": 2462.276028,
        //     "MLN": 131.419042,
        //     "MNX": 0.028649,
        //     "MOD": 1.308908,
        //     "MOIN": 0.033073,
        //     "MONA": 1.575541,
        //     "MTL": 3.494499,
        //     "MTN*": 0.009575,
        //     "MTX": 0.030546,
        //     "NAS": 0.409281,
        //     "NAV": 0.449923,
        //     "NBT": 195.195769,
        //     "NDC": 0.008989,
        //     "NEBL": 1.40749,
        //     "NEO": 45.273572,
        //     "NEU": 0.126327,
        //     "NEWB": 0.002604,
        //     "NGC": 0.260798,
        //     "NKC": 0.002946,
        //     "NLC2": 0.599935,
        //     "NMC": 5.867998,
        //     "NMR": 43.372325,
        //     "NULS": 0.557057,
        //     "NVC": 10,
        //     "NXT": 0.019836,
        //     "OAX": 0.265028,
        //     "OBITS": 0.015,
        //     "OC": 0.001099,
        //     "OCN": 0.000882,
        //     "ODN": 0.5,
        //     "OK": 0.025681,
        //     "OMG": 14.734374,
        //     "OMNI": 3.3742,
        //     "ORE": 0,
        //     "ORME": 1.235715,
        //     "OST": 0.006637,
        //     "OTN": 0,
        //     "OTX": 0.023,
        //     "OXY": 2.169,
        //     "PART": 3.951477,
        //     "PAY": 0.028431,
        //     "PBT": 642.629641,
        //     "PCS": 0.019961,
        //     "PIVX": 0.793008,
        //     "PIZZA": 0.001,
        //     "PLBT": 20,
        //     "PLR": 0.030613,
        //     "POE": 0.000122,
        //     "POLY": 0.6986,
        //     "POSW": 0.48712,
        //     "POWR": 0.368073,
        //     "PPC": 0.913005,
        //     "PPT": 0.599599,
        //     "PPY": 5.45,
        //     "PRC": 0.00003,
        //     "PRES": 0.219998,
        //     "PRG": 0.612149,
        //     "PRL": 0.061361,
        //     "PRO": 1.925974,
        //     "PURA": 0.25,
        //     "PUT": 0,
        //     "QASH": 0.097701,
        //     "QAU": 0,
        //     "QSP": 0.057474,
        //     "QTUM": 17.041105,
        //     "QUN": 0.008318,
        //     "R": 1,
        //     "RBIES": 1,
        //     "RCN": 0.023201,
        //     "RDD": 0.002258,
        //     "RDN": 0,
        //     "RDN*": 0.324446,
        //     "REBL": 0.004583,
        //     "REE": 0.00001,
        //     "REP": 25.562,
        //     "REQ": 0.20801,
        //     "REV": 0.015285,
        //     "RGC": 0.001,
        //     "RHOC": 0.178417,
        //     "RIYA": 0.090025,
        //     "RKC": 5,
        //     "RLC": 4.324897,
        //     "RPX": 0.136964,
        //     "RUFF": 0.004605,
        //     "SALT": 0.768708,
        //     "SAN": 0.51,
        //     "SBC": 7,
        //     "SC": 0.020058,
        //     "SENT": 0.0059,
        //     "SHIFT": 0,
        //     "SIB": 5.177,
        //     "SMART": 0.005178,
        //     "SMLY": 0.00006,
        //     "SMT*": 0.011226,
        //     "SNC": 0.030913,
        //     "SNGLS": 0.000402,
        //     "SNM": 0.256797,
        //     "SNT": 0.092129,
        //     "SPK": 0.0084,
        //     "SRN": 0.011523,
        //     "STEEM": 0.605119,
        //     "STK": 0.001223,
        //     "STORJ": 1.845273,
        //     "STRAT": 0.871235,
        //     "STU": 0.00019,
        //     "STX": 0.986471,
        //     "SUB": 0.003534,
        //     "SUR": 0.35,
        //     "SWFTC": 0.00169,
        //     "SYS": 0.321621,
        //     "TAAS": 10,
        //     "TESLA": 0.019139,
        //     "THC": 0.01284,
        //     "THETA": 7.33834,
        //     "THS": 0.00171,
        //     "TIO": 0.085,
        //     "TKN": 0,
        //     "TKY": 0.001463,
        //     "TNB": 0.002406,
        //     "TNT": 0.02055,
        //     "TOA": 0.002397,
        //     "TRC": 6.2,
        //     "TRIG": 1.210663,
        //     "TRST": 0.04799,
        //     "TRUMP": 0.055,
        //     "TRX": 0.100548,
        //     "UBQ": 0.210531,
        //     "UNO": 114.9998,
        //     "UNRC": 0.00006,
        //     "UQC": 19,
        //     "USDT": 1.002227,
        //     "UTK": 0.384813,
        //     "UTT": 0.3138,
        //     "VEE": 0.01925,
        //     "VEN": 8.515822,
        //     "VERI": 23.736235,
        //     "VIA": 0.231127,
        //     "VIB": 0.052935,
        //     "VIBE": 0.022011,
        //     "VOISE": 0.00018,
        //     "VOX": 1720.72514,
        //     "VRS": 0.1375,
        //     "VTC": 0.667087,
        //     "VUC": 0.000099,
        //     "WABI": 0.209249,
        //     "WAVES": 26.492124,
        //     "WAX": 0.4327,
        //     "WC": 0.045,
        //     "WGR": 0.05075,
        //     "WINGS": 0.035464,
        //     "WLK": 0.0058,
        //     "WOP": 0.046453,
        //     "WPR": 0.011048,
        //     "WRC": 0.00055,
        //     "WTC": 0.980279,
        //     "XAUR": 0.10301,
        //     "XBP": 0.0027,
        //     "XBY": 0.2889,
        //     "XCP": 9.1723,
        //     "XCXT": 0.095658,
        //     "XDN": 0.00101,
        //     "XEM": 0.194249,
        //     "XGB": 0.0015,
        //     "XHI": 0.001325,
        //     "XID": 0.010924,
        //     "XLM": 0.36671,
        //     "XMR": 271.262113,
        //     "XNC": 0.00018,
        //     "XRB": 55.426154,
        //     "XRP": 1.093796,
        //     "XTO": 0.324858,
        //     "XTZ": 6.251783,
        //     "XUC": 0.10635,
        //     "XVG": 0.023861,
        //     "XZC": 4.96985,
        //     "YEE": 0.001485,
        //     "YOC": 0.00012,
        //     "YOYOW": 0.0214,
        //     "ZBC": 0,
        //     "ZCL": 0.134512,
        //     "ZEC": 168.829964,
        //     "ZEN": 86.6099,
        //     "ZIL": 0.111621,
        //     "ZNY": 0.02,
        //     "ZRX": 1.232812,
        //     "ZSC": 0.00028,
        //     "USD": 1
        // }
    //});
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
        alert('Market stat request denied!');
    })
}

function compareRates(obj,targRate,rate1,rate2){ //compare numbers & prices of crypto (math)
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
            target1 = 1;
            target2 = 1;
        }
    }
    else{ //1:1 comparison
        if (target1 !== target2){
            target2 = target1 / target2;
            target1 = 1;
        }
        else{ //equals
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
    appendRates(compare); //append the strings
    //add their rate to USD to graph
    addToGraph(rate1,obj[rate1]);
    addToGraph(rate2,obj[rate2]);
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
                return alert("Currency " + (i + 1) + " not a valid entry!");
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
    compareRates(cryptoBrick,target,str[0],str[1]); //compare the new currencies and their rates
}

function appendRates(compare){ //append info to the dom
    for (let i = 0; i < 2; i++) $price[i].empty().append(compare[i]);
}

function keyExists(value){
    return graphList.some(row => row.includes(value));
}

function addToGraph(key,value){ //add new value to graph
    if ((key === "USD") || (keyExists(key))) return false;
    if (graphList.length > 0) lastList = graphList;
    graphList.unshift([key,value,rgbaRandom(.75)]); //add to beginning
    if (graphList.length > 20) graphList.pop(); //keep 20 or below
    drawOnGraph(graphList.length);
}

function drawOnGraph(length){
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
    console.log(lastList);
}

function rgbaRandom(alpha) { //for graphs
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

function undoGraph(event){
    event.preventDefault;
    console.log('undo');
    if (lastList.length < 1) return false;
    let tempList = [];
    if (graphList.length > 0) tempList = graphList;
    graphList = lastList;
    drawOnGraph(graphList.length);
    lastList = tempList;
}

function clearGraph(event){
    event.preventDefault;
    if (graphList.length < 1) return false;
    console.log('clear');
    lastList = graphList; //save
    graphList = []; //clear
    drawOnGraph(0);
}

//only uncomment below when ready to test request, we have a limited number of requests!
getCrypto(); //initialize API (on program start)
getStats();

$convert.on("click",getSearch); //search button
$("#undo-graph").on("click",undoGraph);
$("#clear-graph").on("click",clearGraph);
$("#ascend-graph").on("click",(event)=>{
    event.preventDefault;
    if (graphList.length < 2) return false;
    lastList = graphList; //save
    graphList = graphList.sort((a,b) => b[1] - a[1]); //sort list descending
    drawOnGraph(graphList.length);
});
$("#descend-graph").on("click",(event)=>{
    event.preventDefault;
    if (graphList.length < 2) return false;
    lastList = graphList; //save
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