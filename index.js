const themeStyle = document.getElementById('theme-style');
const colourMode = document.getElementById('colour-mode');
const searchInput = document.getElementById('search');
const search = document.getElementById('search-user');
const errorMessage = document.getElementById('error-messaage');
const userImage = document.querySelector('.profile-img img');
const userTitle = document.querySelector('.profile h1');
const userName = document.querySelector('.profile a');
const userjoinDate = document.querySelector('.profile small');
const userBio = document.getElementById('p1');
const userRepos = document.querySelector('.data-section .h1');
const userFollower = document.querySelector('.data-section .h2');
const userFollowing = document.querySelector('.data-section .h3');
const userLocation = document.querySelector('#s1 small');
const userBlog = document.querySelector('#s2 small');
const userCompany = document.querySelector('#s3 small');
const userTwitter = document.querySelector('#s4 small');

// default user
const defaultUser = 'The Octocat';

function switchTheme() {
    // the style should change to dark

    // first click # => styles/dark.css

    if (themeStyle.getAttribute('href') == '#') {

        // this means only style.css file is applied
        // we need to change the style to dark.css

        themeStyle.href = 'dark.css';
    }
    else {
        // this means that it's dark mode
        // changing it to light mode

        themeStyle.href = '#';
    }
}

function getGithubUserDetails(username) {
    fetch(`https://api.github.com/users/${username}`)
        .then((res) => res.json())
        .then((data) => {
            if (data['message'] === 'Not Found') {
                errorMessage.style.display = 'inline-block';
                console.log(data);
            }
            else {
                if ((errorMessage.style.display = 'inline-block')) {
                    errorMessage.style.display = 'none';
                }
                console.log(data);

                userImage.src = data['avatar_url'];

                userTitle.innerText = data['name'] == null ? username : data['name'];

                userName.innerText = `@${username}`;
                userName.href = `https://github.com/${username}`;

                // User join ....

                const date = new Date(data['created_at']).toDateString().slice(3, 16);
                userjoinDate.innerText = `join on ${date}`;

                // user Bio

                userBio.innerText = data['bio'];   // not  proper correct format ... make changes.

                // data info...

                userRepos.innerText = data['public_repos'];
                userFollower.innerText = data['followers'];
                userFollowing.innerText = data['following'];


                // social media section..

                userLocation.innerHTML = data['location'];
                userBlog.innerText = data['blog'];
                userCompany.innerText = data['company'];
                userTwitter.innerText = data['twitter_username'];


            }


        });
}

function searchUser(e) {
    e.preventDefault();
    // to  recive the input value
    const user = searchInput.value;
    console.log(user);
    // for this user(input value) get his github details
    getGithubUserDetails(user);
}

// getGithubUserDetails(defaultUser);
colourMode.onclick = switchTheme;
search.onsubmit = searchUser;
