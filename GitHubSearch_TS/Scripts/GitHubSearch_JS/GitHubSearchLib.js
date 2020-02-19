//const fetch = require("node-fetch");
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
;
;
const ReposHeader = {
    Repos_UserName: "",
    Repos_UserLocation: "",
    Repos_AvatarImageURL: "",
    Repos_Repos_URL: ""
};
const ReposGrid = {
    Repos_URL: "",
    Repos_Name: "",
    Repos_FullName: "",
    Repos_Description: "",
    Repos_StarGazers: ""
};
String.prototype.format = function () {
    let a = this;
    for (let k in arguments) {
        a = a.replace("{" + k + "}", arguments[k]);
    }
    return a;
};
class BuildSearchResults {
    constructor() {
        this.RootURL = "";
        this.UserURL = "";
        this.DefaultUrl = this.RootURL + this.UserURL;
        this.ResultsGridBody = "";
        this.headerTable = `<table class="table" id="userDetailsTable">
    <tr>
    <th>Name </th>
    <td>{0}</td>
    </tr>
    <tr>
    <th>Location </th>
    <td>{1} </td>
    </tr>
    <tr>
    <th>Avatar </th>
    <td> <img src="{2}" height = "100px;" /> </td>
    </tr>
    </table>`;
        this.resultGridBody = `<tr>
                        <td>
                            <a href="{0}" target="_blank">{1}</a>
                        </td>
                        <td>{2}</td>
                        <td>{3}</td>
                        <td>{4}</td>
                    </tr>`;
        this.resultsGridFrame = `<table class="table table-striped">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Full Name</th>
                        <th>Description</th>
                        <th>Stargazers</th>
                    </tr>
                </thead>
                <tbody>
                    {0}
                </tbody>
            </table>`;
        this.noRepositoryItems = `<tr>
                                        <td colspan="4" style="color:red">
                                            The user does not have any repository items
                                        </td>
                                        </tr>`;
        this.RootURL = 'https://api.github.com';
        this.UserURL = '/users/{0}';
    }
    buildHeaderResponse(response) {
        ReposHeader.Repos_UserName = response.name;
        ReposHeader.Repos_UserLocation = response.location;
        ReposHeader.Repos_AvatarImageURL = response.avatar_url;
        ReposHeader.Repos_Repos_URL = response.repos_url;
        return ReposHeader;
    }
    buildHeaderResponseString(response) {
        let responseStr = this.headerTable.format(response.Repos_UserName, response.Repos_UserLocation, response.Repos_AvatarImageURL);
        return responseStr;
    }
    buildBodyResponse(response) {
        let returnval = response.sort((a, b) => b.stargazers_count - a.stargazers_count).slice(0, 5).
            map(element => {
            let reposGrid = {
                Repos_URL: element.html_url,
                Repos_Name: element.name,
                Repos_FullName: element.full_name,
                Repos_Description: element.description,
                Repos_StarGazers: element.stargazers_count
            };
            return reposGrid;
        });
        return returnval;
    }
    GetUserRepositories(reposURL) {
        return __awaiter(this, void 0, void 0, function* () {
            let bodystr = "";
            let returnVal = yield fetch(// Using the fetch command to asynchronously call the web api.
            reposURL, { method: 'GET' })
                .then(response => response.json())
                .then(data => this.buildBodyResponse(data))
                .then(rbody => {
                if (rbody.length > 0) {
                    bodystr = this.resultsGridFrame.format(this.buildBodyString(rbody));
                }
                else {
                    bodystr = this.resultsGridFrame.format(this.noRepositoryItems);
                }
            })
                .catch(error => console.error('error:', error));
            return bodystr;
        });
    }
    buildBodyString(rbody) {
        let returnVal = rbody.map((a) => this.resultGridBody.format(a.Repos_URL, a.Repos_Name, a.Repos_FullName, a.Repos_Description, a.Repos_StarGazers)).join("");
        return returnVal;
    }
    GetUserHeader(userName) {
        return __awaiter(this, void 0, void 0, function* () {
            let headerstr;
            let bodystr = "";
            let returnVal = yield fetch(// Using the fetch command to asynchronously call the web api.
            "https://api.github.com/users/" + userName, { method: 'GET' })
                .then(response => {
                if (response && response.ok) {
                    return response.json();
                }
                else {
                    throw new Error("Unable to find the user");
                }
            })
                .then(data => {
                headerstr = this.buildHeaderResponse(data);
                return headerstr;
            })
                .then(rhead => {
                return this.GetUserRepositories(rhead.Repos_Repos_URL);
            })
                .then(rbody => {
                let header = this.buildHeaderResponseString(headerstr);
                let body = rbody;
                bodystr = header + body;
            })
                .catch(error => console.error('error:', error));
            return bodystr;
        });
    }
}
function GetUserDetails(userName) {
    var x = new BuildSearchResults();
    return x.GetUserHeader(userName);
}
//# sourceMappingURL=GitHubSearchLib.js.map