exports.shortFileName = (longFilePath) => {   
    if (longFilePath) {
        if (longFilePath.includes('?')) {
            const idx = longFilePath.lastIndexOf('?');
            longFilePath = longFilePath.substring(0, idx);
        }
        const idx = longFilePath.lastIndexOf('/');
        console.log(idx);  
        console.log(longFilePath.substring(idx + 1))    
        return longFilePath.substring(idx + 1);
    }
};
