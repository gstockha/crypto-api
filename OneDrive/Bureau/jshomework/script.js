// Assignment Code
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
var length = window.prompt("password:")

if(length < 8){
 window.alert('short passwrod')
}
else{
 if(length > 128){
   window.alert('password to length')
 }
 else{
  var password = generatePassword()
  window.alert(password)
 }
}

function generatePassword() {    
    var charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
    retVal = "",
    n = charset.length
    for (var i = 0; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
}