- change productads route to api v1

- make end point for ad upload

- refactor helpers file to helpers folder

- finish testing getModelList function

- add security

- make find all models and find all makers helpers only run when makerModel file updated

- add trim() to all strings fetching data

- create if statement for if no img directory for images

- add jsdocs to helper functions

- check Phoenix Harps photos

- add promise all to makerModelTypeSize

- download images check if statements

- HarpsEtc, certificate issue, worked on it. you have to create a CA certificate maybe using forge, then try this Medium to implement. https://medium.com/@jamomani/adding-trusted-ca-to-node-client-with-axios-2792024bca4 -- last resort, add this to top of app file: "process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';"  //NOT YET IMPLEMENTED dangerous code
