function onchangeusernameevent(val) {
    var userNameErrorDiv = $('.userNameErrorDiv');
    var submitBtn = $('input[name="GitSearch"]')
    if (!countValidCharacters(val.value)) {
        userNameErrorDiv.text("Username can only be a max of 39 characters");
        userNameErrorDiv.css("display", "block");
        submitBtn[0].disabled = true;
    }
    else {
        userNameErrorDiv.text("");
        userNameErrorDiv.css("display", "none");
        submitBtn[0].disabled = false;
    }
}

function countValidCharacters(userName) {
    var lenField = userName.length;
    if (lenField > 39) {
        return false
    }
    return true;
}