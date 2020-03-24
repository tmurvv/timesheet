- change productads route to api v1

- make end point for ad upload

- finish testing getModelList function

- add security

- make find all models and find all makers helpers only run when makerModel file updated

- add trim() to all strings fetching data

- create if statement for if no img directory for images

- add jsdocs to helper functions

- check Phoenix Harps photos

- add promise all to makerModelTypeSize

- download images check if statements

- think about adding a space after all models before search ('troubadour V returns troubadour VI, Swan returns Swanson)

- this is an npm json schema validator to validate the makerModel object https://github.com/tdegrunt/jsonschema/blob/HEAD/examples/all.js

- HarpsEtc, certificate issue, worked on it. you have to create a CA certificate maybe using forge, then try this Medium to implement. https://medium.com/@jamomani/adding-trusted-ca-to-node-client-with-axios-2792024bca4 -- last resort, add this to top of app file: "process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';"  //NOT YET IMPLEMENTED dangerous code
