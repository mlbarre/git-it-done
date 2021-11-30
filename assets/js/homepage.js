var getUserRepos = function(user) {
    // FORMAT THE GITHUB API URL
    var apiUrl = "https://api.github.com/users/" + user + "/repos";

    // MAKE A REQUEST TO THE URL 
    fetch(apiUrl).then(function(response) {
        response.json().then(function(data) {
            console.log(data);
        });
    });
};
 

getUserRepos("microsoft");