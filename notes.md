DataMuse npm maybe to find similar sounds to harp name

https://harp.fandom.com/wiki/Harp_Makers_and_Vendors_in_North_America

to schedule cron job:
http://www.modeo.co/blog/2015/1/8/heroku-scheduler-with-nodejs-tutorial

Heroku deploy
- config.env port to 3000

## STEPS TO DEPLOY and REVERT TO DEV

- make sure download images is enabled
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
- then once logged into Heroku execute command: git push heroku master
- app located at https://onestopharpshop-api.herokuapp.com/ or https://onestop-api-staging.herokuapp.com
- test signup, login

Lots of harp stores   https://www.lyonhealy.com/find-a-dealer-harps/
