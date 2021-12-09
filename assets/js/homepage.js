var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#username");
var repoContainerEl = document.querySelector("#repos-container");
var repoSearchTerm = document.querySelector("#repo-search-term");


var getUserRepos = function(user) {
    // FORMAT THE GITHUB API URL
    var apiUrl = "https://api.github.com/users/" + user + "/repos";

    // MAKE A REQUEST TO THE URL 
    fetch(apiUrl)
    .then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
            displayRepos(data, user);
            });
        } else {
        alert('Error: Github User Not Found');
        }
        })
    .catch(function(error) {
        // .CATCH() SHOULD BE GETTING CHAINED ONTO THE END OF .THEN()
        alert("Unable to connect to Github");
        })
};
 
var formSubmitHandler = function(event) {
    event.preventDefault();

    var username = nameInputEl.value.trim();

    if (username) {
        getUserRepos(username);
        nameInputEl.value = "";
    } else {
        alert("Please enter a Github username");
    }
}

var displayRepos = function(repos, searchTerm) {

    // CHECK IF API RETURNED ANY REPOS
    if (repos.length === 0) {
        repoContainerEl.textContent = "No repositories found.";
        return;
    }

    repoContainerEl.textContent = "";
    repoSearchTerm.textContent = searchTerm;

    for (var i = 0; i < repos.length; i++) {
        // FORMAT REPO NAME
        var repoName = repos[i].owner.login + "/" + repos[i].name;

        // CREATE A CONTAINER FOR EACH REPO
        var repoEl = document.createElement("a");
        repoEl.classList = "list-item flex-row justify-space-between align-center";
        repoEl.setAttribute("href", "./single-repo.html?repo=" + repoName);

        // CREATE A SPAN ELEMENT TO HOLD REPO NAME
        var titleEl = document.createElement("span");
        titleEl.textContent = repoName;

        // APPEND TO CONTAINER
        repoEl.appendChild(titleEl);

        // CREATE A STATUS ELEMENT
        var statusEl = document.createElement("span");
        statusEl.classList = "flex-row align-center";


        // CHECK IF CURRENT REPO HAS ISSUES OR NOT 
        if (repos[i].open_issues_count > 0) {
            statusEl.innerHTML = 
            "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + " issue(s)";
        } else {
            statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
        }


        // APPEND TO CONTAINER
        repoEl.appendChild(statusEl);

        // APPEND CONTAINER TO THE DOM [DIV ]
        repoContainerEl.appendChild(repoEl);
    }
}

userFormEl.addEventListener("submit", formSubmitHandler);
