// Make sure that your javscript code doesn't use any ES6 funcitonality such as let of const or arrow functions
// Otherwise Chutpah wont recognise the tests and show them in the test explorer.
// Make sure that the chutzpah.json file is set up and points to the correct source and test directory


describe('Test Githubsearch',
    function () {
        //it('Check RootURL for Header Is Read', function () {
        //    //var response = {
        //    //    Products: [{ ProductID: 1, ProductName: "Steak" },
        //    //    { ProductID: 2, ProductName: "Eggs" }]
        //    //};
          
        //    var buildSearchResults = new BuildSearchResults();
        //    expect(buildSearchResults.GetRootURL()).toBe("https://api.github.com");
        //});

        it('Check UserURL for Header Is Read', function () {
            var buildSearchResults = new BuildSearchResults();
            expect(buildSearchResults.UserURL).toBe("/users/{0}");
        });

        it('Check GitHub User Search returns json', function (done) {
            var returnJSON="";
            var buildSearchResults = new BuildSearchResults();
           buildSearchResults.GetUserHeader("ascrees")
            .then(function (rbody)
            {
                expect(rbody.length).toBeGreaterThan(0);
                done(); // Need the done here as well as in the function call above in order to trap the expectation in the promise. 
            });
        });

        it('Check GitHub User returns repositories', function (done) {
            var returnJSON="";
            var buildSearchResults = new BuildSearchResults();
           buildSearchResults.GetUserRepositories("http://api.github.com/users/ascrees/repos")
            .then(function (rbody)
            {
                expect(rbody.length).toBeGreaterThan(0);
                done(); // Need the done here as well as in the function call above in order to trap the expectation in the promise. 
            });
        });
    });