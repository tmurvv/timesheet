exports.shortFileName = (longFilePath) => {   
    if (longFilePath) {
        const idx = longFilePath.lastIndexOf('/');        
        return longFilePath.substring(idx + 1);
    }
};
