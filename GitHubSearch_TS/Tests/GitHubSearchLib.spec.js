describe('Test Githubsearch - Typescript',
    function () {

        it('Check UserURL for Header Is Read', function () {
            var buildSearchResults = new BuildSearchResults();
            expect(buildSearchResults.UserURL).toBe("/users/{0}");
        });

        it('Check GitHub User Search returns json for valid user', function (done) {
            var buildSearchResults = new BuildSearchResults();
            buildSearchResults.GetUserHeader("ascrees")
                .then(function (rbody) {
                    expect(rbody.length).toBeGreaterThan(0);
                    done(); // Need the done here as well as in the function call above in order to trap the expectation in the promise. 
                });
        });

        it('Check GitHub User Search throws error for non user', function (done) {
            var buildSearchResults = new BuildSearchResults();
            buildSearchResults.GetUserHeader("...")
                .catch(function (rbody) {
                    expect(rbody.message).toBe("Error: Unable to find the user");
                    done(); // Need the done here as well as in the function call above in order to trap the expectation in the promise. 
                });
        });

        it('Check GitHub User returns repositories', function (done) {
            var buildSearchResults = new BuildSearchResults();
            buildSearchResults.GetUserRepositories("http://api.github.com/users/ascrees/repos")
                .then(function (rbody) {
                    expect(rbody.length).toBeGreaterThan(0);
                    done(); // Need the done here as well as in the function call above in order to trap the expectation in the promise. 
                });
        });

        it('Check GitHub User returns no repositories', function (done) {
            var buildSearchResults = new BuildSearchResults();
            buildSearchResults.GetUserRepositories("http://api.github.com/users/speacock/repos")
                .then(function (rbody) {
                    expect(rbody.indexOf("The user does not have any repository items")).toBeGreaterThan(0);
                    done(); // Need the done here as well as in the function call above in order to trap the expectation in the promise. 
                });
        });
    });