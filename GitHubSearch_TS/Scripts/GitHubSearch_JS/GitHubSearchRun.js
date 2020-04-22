// Git Hub Search Example
let btnGitHubSearch = document.getElementById("GitHubSearchButton");
btnGitHubSearch.addEventListener("click", clickGitHubSearchButton);
let txtUserNameSearch = document.querySelector("#userName");
let outputResults = document.querySelector("#SearchResults");
let userNameErrorDiv = document.querySelector(".userNameErrorDiv");
function clickGitHubSearchButton() {
    GetUserDetails(txtUserNameSearch.value)
        .then((rhead) => {
        outputResults.innerHTML = rhead;
        outputResults.style.visibility = "visible";
        userNameErrorDiv.textContent = "";
        userNameErrorDiv.style.display = "";
    })
        .catch(() => {
        outputResults.innerHTML = "";
        outputResults.style.visibility = "hidden";
        userNameErrorDiv.textContent = "Username cannot be found";
        userNameErrorDiv.style.display = "block";
    });
}
//# sourceMappingURL=GitHubSearchRun.js.map