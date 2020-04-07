### Last Deployment To: 
# TESTING

#### Prepare code
- change where new image url in harpAdScraper (search on 'findaharp) depends on environment you are deploying to
- check that all stores uncommented in constants/sellers.js
- make sure download images is enabled
- search for console.logs

#### Run tests
- Search for "BREAKING"
- make sure testing set to all tests
- run tests

#### Commit and push
- don't forget to commit and push

#### Choose environment to deploy to: 
- git push testing master
- git push staging master
- git push heroku master (for production)
- to switch default, git config heroku.remote staging

#### For Heroku
- config.env port to 3000
- remove values from login
- remove values from signup
- check NOT YET IMPLEMENTED's
- change dev db to production db and make sure everything is working
- check for local urls, search on 127.0.0.1 or local
- check that email from and to and host and all email values are correct
- for Heroku, in package.json, make sure start command is "start": "node server.js"
- for Heroku, make sure you have engines command {"engines": {"node":">="10.0.0"}}
- for Heroku, (this app in server.js) make sure const port = process.env.PORT || 3000
- git push your changes
- for Heroku, deploy command login to heroku cli with command: heroku login
- then once logged into Heroku execute command: git push heroku master or git push development master
- app located at https://findaharp-api.herokuapp.com/ or https://findaharp-api-staging.herokuapp.com or https://findaharp-api-testing.herokuapp.com
- test signup, login
