/*****************
 * These routes are for initial partner agreements
 * ************************/
//#region Blevins Harps
app.get('/api/v1/partners/blevinsharps', (req,res) => {
    res.status(200).render('base', {
        seller: 'Blevins Harps',
        sellerId: 'blevinsharps',
        startDate: 'December 18, 2020',
        fee: '5%',
        minimum: '$40.00usd'
    });
});
app.post('/api/v1/partners/blevinsharpsagree', async (req,res) => {
    if (!(req.body.feecheck&&req.body.feecheck==='on'&&req.body.termscheck&&req.body.termscheck==='on')) {
        return res.status(400).render('base', {
            agreement: 'fail',
            seller: 'Blevins Harps',
            sellerId: 'blevinsharps',
            startDate: 'December 18, 2020',
            fee: '5%',
            minimum: '$40.00usd'
        });
    }
    try {
        const uploadagreement = Object.assign({ 
            seller: req.body.seller,
            sellerId: req.body.sellerId,
            startdate: req.body.startdate,
            fee: req.body.fee,
            minimum: req.body.minimum,
            scheduletext: req.body.scheduletext
        });
        const addedagreement = await Agreements.create(uploadagreement);
        agreementSigned();
        return res.status(200).render('base', {
            agreement: 'success',
            seller: req.body.seller
        });
    } catch (e) {
        return res.status(500).render('base', {
            error: 'server error',
            message: e.message
        });
    }
});
//#endregion
//#region Germaine
app.get('/api/v1/partners/gl', (req,res) => {
    res.status(200).render('germaine', {
        seller: 'Germaine Luyben',
        sellerId: 'gl',
        startDate: 'January 7, 2021',
        fee: '25%',
        minimum: '0'
    });
});
app.post('/api/v1/partners/glagree', async (req,res) => {
    if (!(req.body.feecheck&&req.body.feecheck==='on'&&req.body.termscheck&&req.body.termscheck==='on')) {
        return res.status(400).render('germaine', {
            agreement: 'fail',
            seller: 'Germain Luyben',
            sellerId: 'gl',
            startDate: 'December 18, 2020',
            fee: '25%',
            minimum: ''
        });
    }
    try {
        const uploadagreement = Object.assign({ 
            seller: req.body.seller,
            sellerId: req.body.sellerId,
            startdate: req.body.startdate,
            fee: req.body.fee,
            minimum: req.body.minimum,
            scheduletext: req.body.scheduletext
        });
        const addedagreement = await Agreements.create(uploadagreement);
        agreementSigned();
        return res.status(200).render('base', {
            agreement: 'success',
            seller: req.body.seller
        });
    } catch (e) {
        return res.status(500).render('base', {
            error: 'server error',
            message: e.message
        });
    }
});
//#endregion
//#region harpsetc
app.get('/api/v1/partners/harpsetc', (req,res) => {
    res.status(200).render('base', {
        seller: 'Harps Etc.',
        sellerId: 'harpsetc',
        startDate: 'January 7, 2021',
        fee: '3%',
        minimum: '$50.00usd'
    });
});
app.post('/api/v1/partners/harpsetcagree', async (req,res) => {
    if (!(req.body.feecheck&&req.body.feecheck==='on'&&req.body.termscheck&&req.body.termscheck==='on')) {
        return res.status(400).render('base', {
            agreement: 'fail',
            seller: 'Harps Etc.',
            sellerId: 'harpsetc',
            startDate: 'January 7, 2021',
            fee: '3%',
            minimum: '$40.00usd'
        });
    }
    try {
        const uploadagreement = Object.assign({ 
            seller: req.body.seller,
            sellerId: req.body.sellerId,
            startdate: req.body.startdate,
            fee: req.body.fee,
            minimum: req.body.minimum,
            scheduletext: req.body.scheduletext
        });
        const addedagreement = await Agreements.create(uploadagreement);
        agreementSigned();
        return res.status(200).render('base', {
            agreement: 'success',
            seller: req.body.seller
        });
    } catch (e) {
        return res.status(500).render('base', {
            error: 'server error',
            message: e.message
        });
    }
});
//#endregion
//#region 

//#endregion