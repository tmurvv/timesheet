list of all color edit possibilities https://code.visualstudio.com/api/references/theme-color#editor-colors

DataMuse npm maybe to find similar sounds to harp name

https://harp.fandom.com/wiki/Harp_Makers_and_Vendors_in_North_America

Michigan Harp Center

https://vanderbiltmusic.com/strings-guide/



Lots of harp stores   https://www.lyonhealy.com/find-a-dealer-harps/

/**
 * Rarely used and not tested or tracked, 
 * basic array sorting algo from StackOverflow
 */
exports.sellerSort = () => sellerArray.sort(function(a, b) {
    var nameA = a.sellerName.toUpperCase(); // ignore upper and lowercase
    var nameB = b.sellerName.toUpperCase(); // ignore upper and lowercase
    if (nameA < nameB) {
        return -1;
    }
    if (nameA > nameB) {
       return 1;
    }
  
    // names must be equal
    return 0;
});
