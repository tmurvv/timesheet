- finishHelper tests

- add check that all othernames in makerArray are an array, not string

- make error catching system

- learn this https://support.google.com/webmasters/answer/9128669?hl=en

- make find all models and find all makers helpers only run when makerModel file    
    updated -- You should use the stat function :

    According to the documentation :

    fs.stat(path, [callback])
    Asynchronous stat(2). The callback gets two arguments (err, stats) where stats is a fs.Stats object. It looks like this:

    { dev: 2049,
        ino: 305352,
        mode: 16877,
        nlink: 12,
        uid: 1000,
        gid: 1000,
        rdev: 0,
        size: 4096,
        blksize: 4096,
        blocks: 8,
        atime: '2009-06-29T11:11:55Z',
        mtime: '2009-06-29T11:11:40Z',
        ctime: '2009-06-29T11:11:40Z' 
    }
    As you can see, the mtime is the last modified time.

- check Phoenix Harps photos

- download images check if statements

- this is an npm json schema validator to validate the makerModel object https://github.com/tdegrunt/jsonschema/blob/HEAD/examples/all.js

- function to delete unused harp photos from server (once the harps sell)

- HarpsEtc, certificate issue, worked on it. you have to create a CA certificate maybe using forge, then try this Medium to implement. https://medium.com/@jamomani/adding-trusted-ca-to-node-client-with-axios-2792024bca4 -- last resort, add this to top of app file: "process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';"  //NOT YET IMPLEMENTED dangerous code -- IDEA MAKE API JUST FOR STORES WITH BROKEN CERTIFICATES SO IT IS ISOLATED

### PHASE 2?

- finish endpoint for adupload
