const ibeh = [
    {"key": "0","value": "1i"}, {"key": "1","value": "1b"},
    {"key": "2","value": "1e"}, {"key": "3","value": "1h"},
    {"key": "4","value": "1p"}, {"key": "5","value": "1r"},
    {"key": "6","value": "1o"}, {"key": "7","value": "1m"},
    {"key": "8","value": "1s"}, {"key": "9","value": "1a"},
    {"key": "a","value": "1I"}, {"key": "b","value": "1B"},
    {"key": "c","value": "1E"}, {"key": "d","value": "1H"},
    {"key": "e","value": "1P"}, {"key": "f","value": "1R"},
    {"key": "g","value": "1O"}, {"key": "h","value": "1M"},
    {"key": "i","value": "1S"}, {"key": "j","value": "1A"},
    {"key": "k","value": "2i"}, {"key": "l","value": "2b"},
    {"key": "m","value": "2e"}, {"key": "n","value": "2h"}, 
    {"key": "o","value": "2p"}, {"key": "p","value": "2r"},
    {"key": "q","value": "2o"}, {"key": "r","value": "2m"},
    {"key": "s","value": "2s"}, {"key": "t","value": "2a"},
    {"key": "u","value": "2I"}, {"key": "v","value": "2B"},
    {"key": "w","value": "2E"}, {"key": "x","value": "2H"},
    {"key": "y","value": "2P"}, {"key": "z","value": "2R"},
    {"key": "A","value": "2O"}, {"key": "B","value": "2M"},
    {"key": "C","value": "2S"}, {"key": "D","value": "2A"},
    {"key": "E","value": "3i"}, {"key": "F","value": "3b"},
    {"key": "G","value": "3e"}, {"key": "H","value": "3h"},
    {"key": "I","value": "3p"}, {"key": "J","value": "3r"}, 
    {"key": "K","value": "3o"}, {"key": "L","value": "3m"}, 
    {"key": "M","value": "3s"}, {"key": "N","value": "3a"}, 
    {"key": "O","value": "3I"}, {"key": "P","value": "3B"}, 
    {"key": "Q","value": "3E"}, {"key": "R","value": "3H"}, 
    {"key": "S","value": "3P"}, {"key": "T","value": "3R"}, 
    {"key": "U","value": "3O"}, {"key": "V","value": "3M"}, 
    {"key": "W","value": "3S"}, {"key": "X","value": "3A"}, 
    {"key": "Y","value": "4i"}, {"key": "Z","value": "4b"},
    {"key": " ","value": "4e"}, {"key": "`","value": "4h"}, 
    {"key": "!","value": "4p"}, {"key": "@","value": "4r"}, 
    {"key": "#","value": "4o"}, {"key": "$","value": "4m"}, 
    {"key": "%","value": "4s"}, {"key": "^","value": "4a"}, 
    {"key": "&","value": "4I"}, {"key": "*","value": "4B"}, 
    {"key": "(","value": "4E"}, {"key": ")","value": "4H"}, 
    {"key": "-","value": "4P"}, {"key": "_","value": "4R"}, 
    {"key": "+","value": "4O"}, {"key": "=","value": "4M"}, 
    {"key": "{","value": "4S"}, {"key": "}","value": "4A"}, 
    {"key": "[","value": "5i"}, {"key": "]","value": "5b"}, 
    {"key": "\\","value": "5e"}, {"key": "|","value": "5h"}, 
    {"key": ";","value": "5p"}, {"key": ":","value": "5r"}, 
    {"key": "'","value": "5o"}, {"key": '"',"value": "5m"}, 
    {"key": '.',"value": "5s"}, {"key": ",","value": "5a"}, 
    {"key": "<","value": "5I"}, {"key": ">","value": "5B"}, 
    {"key": "/","value": "5E"}, {"key": "?","value": "5H"}, 
]


function encrypt(arg) {
    var textEncrypted = '';
    for(var amah=0;amah<arg.length;amah++){
        for(var promise=0;promise<ibeh.length;promise++){
            if(arg[amah] == ibeh[promise].key) {
                textEncrypted += ibeh[promise].value;
            }
        }
    }
    return textEncrypted;
}
function decrypt(arg) {
    var textDecrypted = '';
    for(var amah=0;amah<arg.length/2;amah++){
        var bindText = '';
        bindText += arg[amah*2]+arg[(amah*2)+1];
        for(var promise=0;promise<ibeh.length;promise++){
            if(bindText == ibeh[promise].value) {
                textDecrypted += ibeh[promise].key;
            }
        }
    }
    return textDecrypted;
}

export { encrypt, decrypt };