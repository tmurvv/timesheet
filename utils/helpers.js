exports.shortFileNameFn = (longFilePath) => {   
    if (longFilePath) {
        if (longFilePath.lastIndexOf('?')>-1) longFilePath=longFilePath.substring(0,longFilePath.lastIndexOf('?'));
        const idx = longFilePath.lastIndexOf('/');
        if (/^(?=[\S])[^\\ \/ : * ? " < > | ]+$/.test(longFilePath.substring(idx + 1))) {         
          console.log('if:', longFilePath.substring(idx + 1))
          return longFilePath.substring(idx + 1);
        } else {
          console.log('else:', longFilePath.substring(idx + 1))
          longFilePath = longFilePath.substring(0, idx);
          this.shortFileNameFn(longFilePath);
        }        
    } else {
        return false;
    }
};

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
