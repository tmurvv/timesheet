const usedHarpListFn = require('../utils/harpAdScraper');
//const usedHarps = usedHarpListFn();
const usedHarps = require('../assets/constants/usedHarpList.json');

exports.getProductAds = async (req, res) => {
    // send results 
    res.status(200).json({
        title: 'FindAHarp.com | Get Harp Ads',
        status: 'success',
        //availableHarps: usedHarps.length,
        //harpData: usedHarps  
    });
};