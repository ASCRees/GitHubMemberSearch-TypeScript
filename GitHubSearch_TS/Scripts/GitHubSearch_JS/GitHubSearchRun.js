// Git Hub Search Example
//import {GetUserDetails} from './GitHubSearchLib';
var btnGitHubSearch = document.getElementById("GitHubSearchButton");
btnGitHubSearch.addEventListener("click", clickGitHubSearchButton);
var txtUserNameSearch = document.getElementById("userName");
var outputResults = document.getElementById("SearchResults");
var userNameErrorDiv1 = $('.userNameErrorDiv');
function clickGitHubSearchButton() {
    GetUserDetails(txtUserNameSearch.value).then(rhead => {
        if (rhead) {
            outputResults.innerHTML = rhead;
            outputResults.style.visibility = 'visible';
            userNameErrorDiv1.text("");
            userNameErrorDiv1.css("display", "none");
        }
        else {
            outputResults.innerHTML = "";
            outputResults.style.visibility = 'hidden';
            userNameErrorDiv1.text("Username cannot be found");
            userNameErrorDiv1.css("display", "block");
        }
    });
}
//# sourceMappingURL=GitHubSearchRun.js.map