LAST DEPLOYMENT TO: PRODUCTION

Heroku deploy
- config.env port to 3000
- change where new image url in harpAdScraper (search on 'findaharp) depends on environment you are deploying to
- don't forget to commit and push

### Choose environment to deploy to: 
- git push development master (rename testing)
- git push staging master
- git push heroku master (for production)

### to switch default from development to staging: git config heroku.remote staging
## STEPS TO DEPLOY and REVERT TO DEV

- Check for BREAKING
- make sure download images is enabled
- make sure correct sellers are allowed
- make sure get harp info is enabled
- search for console.logs
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
- app located at https://onestopharpshop-api.herokuapp.com/ or https://onestop-api-staging.herokuapp.com or https://onestop-api-development.herokuapp.com
- test signup, login
