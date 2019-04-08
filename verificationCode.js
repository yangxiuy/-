var verificationCode = verificationCode || {};
verificationCode = {
    codes : '',
    len : 6,
    chars : [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 0,
        'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
        'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
    ],
    init : function(codeId, len) {
        verificationCode.len = len || 6;
        verificationCode.codes = '';
        verificationCode.createCode();
        verificationCode.insertCode(codeId);
    },
    createCode : function() {
        var char;
        for (var i = 0; i < verificationCode.len; i++) {
            var num = parseInt(Math.random() * verificationCode.chars.length);
            char = verificationCode.chars[num];
            verificationCode.codes += char;
        }
    },
    insertCode : function(codeId) {
        document.getElementById(codeId).innerHTML = '';
        document.getElementById(codeId).innerHTML = verificationCode.codes;
    }
};