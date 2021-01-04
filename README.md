# Commit History

Commit History is an application that lists the commits of [React](https://github.com/facebook/react) using   [GitHub GraphQL API ](https://docs.github.com/en/free-pro-team@latest/graphql).

## Installation

1. First clone this repository to your local machine. 
    ```bash
    git clone https://github.com/buraksekili/commit-history.git
    ```
2. Use the [npm](https://www.npmjs.com/) to install project dependencies respectively.
    ```bash
    npm install 
    ```
3. Run client.
    ```bash
    npm start 
    ```
    
        
## GitHub API Authentication
1. You need an access token from GitHub. Creating a personal access token is described in [this](https://docs.github.com/en/free-pro-team@latest/github/authenticating-to-github/creating-a-personal-access-token) documentation.

2. You need to create a .env file in the main folder (for this client app, it is ./ folder)

3. Add your access token to the .env file as follows;

    ```bash
    TOKEN=<your_access_token>
    ```

  That's it for the GitHub authentication.


## License
[MIT](https://github.com/buraksekili/commit-history/blob/master/LICENSE)


