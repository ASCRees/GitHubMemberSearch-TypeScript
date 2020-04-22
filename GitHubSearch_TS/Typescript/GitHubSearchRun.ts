// Git Hub Search Example

let btnGitHubSearch: HTMLInputElement = document.getElementById("GitHubSearchButton") as HTMLInputElement;
btnGitHubSearch.addEventListener("click", clickGitHubSearchButton);

let txtUserNameSearch: HTMLInputElement = document.querySelector("#userName") as HTMLInputElement;
let outputResults: HTMLDivElement = document.querySelector("#SearchResults") as HTMLDivElement;
let userNameErrorDiv: HTMLDivElement = document.querySelector(".userNameErrorDiv") as HTMLDivElement;

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
