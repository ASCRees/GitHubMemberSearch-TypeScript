interface IReposHeader {
	Repos_UserName: string;
	Repos_UserLocation: string;
	Repos_AvatarImageURL: string;
	Repos_Repos_URL: string;
}

interface IReposGrid {
	Repos_URL: string;
	Repos_Name: string;
	Repos_FullName: string;
	Repos_Description: string;
	Repos_StarGazers: string;
}

const ReposHeader: IReposHeader = {
	Repos_UserName: "",
	Repos_UserLocation: "",
	Repos_AvatarImageURL: "",
	Repos_Repos_URL: "",
};

const ReposGrid: IReposGrid = {
	Repos_URL: "",
	Repos_Name: "",
	Repos_FullName: "",
	Repos_Description: "",
	Repos_StarGazers: "",
};

String.prototype.format = function () {
	let a = this;
	for (let k in arguments) {
		a = a.replace("{" + k + "}", arguments[k]);
	}
	return a;
};

class BuildSearchResults {
	public RootURL: string = "";
	public UserURL: string = "";

	private headerTable: string = `<table class="table" id="userDetailsTable">
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

	private resultGridBody: string = `<tr>
                        <td>
                            <a href="{0}" target="_blank">{1}</a>
                        </td>
                        <td>{2}</td>
                        <td>{3}</td>
                        <td>{4}</td>
                    </tr>`;

	private resultsGridFrame: string = `<table class="table table-striped">
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

	private noRepositoryItems: string = `<tr>
                                        <td colspan="4" style="color:red">
                                            The user does not have any repository items
                                        </td>
                                        </tr>`;

	constructor() {
		this.RootURL = "https://api.github.com";
		this.UserURL = "/users/{0}";
	}

	public buildHeaderResponse(response: any) {
		ReposHeader.Repos_UserName = response.name;
		ReposHeader.Repos_UserLocation = response.location;
		ReposHeader.Repos_AvatarImageURL = response.avatar_url;
		ReposHeader.Repos_Repos_URL = response.repos_url;
		return ReposHeader;
	}

	public buildHeaderResponseString(response: IReposHeader) {
		let responseStr = this.headerTable.format(response.Repos_UserName, response.Repos_UserLocation, response.Repos_AvatarImageURL);
		return responseStr;
	}

	public buildBodyResponse(response: any): any {
		let returnval = response
			.sort((a, b) => b.stargazers_count - a.stargazers_count)
			.slice(0, 5)
			.map((element) => {
				let reposGrid: IReposGrid = {
					Repos_URL: element.html_url,
					Repos_Name: element.name,
					Repos_FullName: element.full_name,
					Repos_Description: element.description,
					Repos_StarGazers: element.stargazers_count,
				};
				return reposGrid;
			});

		return returnval;
	}

	public async GetUserRepositories(reposURL: string): Promise<any> {
		let bodystr: string = null;

		let returnVal = await fetch(
			// Using the fetch command to asynchronously call the web api.
			reposURL,
			{ method: "GET" }
		)
			.then((response) => response.json())
			.then((data) => this.buildBodyResponse(data))
			.then((rbody) => {
				if (rbody.length > 0) {
					bodystr = this.resultsGridFrame.format(this.buildBodyString(rbody));
				} else {
					bodystr = this.resultsGridFrame.format(this.noRepositoryItems);
				}
			})
			.catch((error) => {
				throw new Error(error);
			});
		return bodystr;
	}

	buildBodyString(rbody: IReposGrid[]): string {
		let returnVal: string = rbody.map((a) => this.resultGridBody.format(a.Repos_URL, a.Repos_Name, a.Repos_FullName, a.Repos_Description, a.Repos_StarGazers)).join("");
		return returnVal;
	}

	public async GetUserHeader(
		userName: string // Using a promise to call the web api. Then get the response before pushing the output to be displayed
	) {
		let headerstr: IReposHeader;
		let bodystr = "";

		let returnVal = await fetch(
			// Using the fetch command to asynchronously call the web api.
			this.RootURL + this.UserURL.format(userName),
			{ method: "GET" }
		)
			.then((response) => {
				if (response && response.ok) {
					return response.json();
				} else {
					throw new Error("Unable to find the user");
				}
			})
			.then((data) => {
				headerstr = this.buildHeaderResponse(data);
				return headerstr;
			})
			.then((rhead) => {
				return this.GetUserRepositories(rhead.Repos_Repos_URL);
			})
			.then((rbody) => {
				let header = this.buildHeaderResponseString(headerstr);
				let body = rbody;
				bodystr = header + body;
			})
			.catch((error) => {
				throw new Error(error);
			});
		return bodystr;
	}
}

function GetUserDetails(userName: string): Promise<string> {
	var x = new BuildSearchResults();
	return x.GetUserHeader(userName);
}
