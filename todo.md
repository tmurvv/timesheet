# High priority

### internal/cleanup
- expand model list
- refactor get best color out of harpscraper
- check console.lok and change to AppErrors
- move routing out of app.js
- make user email unique after testing
- refactor parseStoreInfo into parseStoreInfoHelpers.js and add testing
- function to delete unused harp photos from server (once the harps sell)
- on Tuesday, look at findaharp.com to see if CRON job worked. Aries changed to Dusty Strings

### functionality

- private Ads
    - set up Schema
    - set up Routes
    - set up Controllers
    - test with postman
- add date to contact requests
- check that we are not getting duplicate listings


### future
- BFG git repo cleaner
- add crud endpoints for private listings
- add date listing created
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




- HarpsEtc, certificate issue, worked on it. you have to create a CA certificate maybe using forge, then try this Medium to implement. https://medium.com/@jamomani/adding-trusted-ca-to-node-client-with-axios-2792024bca4 -- last resort, add this to top of app file: "process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';"  //NOT YET IMPLEMENTED dangerous code -- IDEA MAKE API JUST FOR STORES WITH BROKEN CERTIFICATES SO IT IS ISOLATED