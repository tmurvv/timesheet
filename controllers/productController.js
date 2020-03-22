const { scrapeAds } = require('../utils/harpAdScraper');
/*************************
 * NOT YET IMPLEMENTED--routing is busted, try __dir__
 */
// const usedHarps = require('../assets/constants/usedHarpList.json');

exports.getProductAds = async (req, res) => {
    const usedHarps = scrapeAds();
    console.log('used',usedHarps)
    // send results 
    res.status(200).json({
        title: 'FindAHarp.com | Get Harp Ads',
        status: 'success',
        availableHarps: usedHarps.length,
        harpData: usedHarps  
    });
};