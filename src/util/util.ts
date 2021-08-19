import fs from 'fs';
import Jimp = require('jimp');

// filterImageFromURL
// helper function to download, filter, and save the filtered image locally
// returns the absolute path to the local image
// INPUTS
//    inputURL: string - a publicly accessible url to an image file
// RETURNS
//    an absolute path to a filtered image locally saved file
export async function filterImageFromURL(inputURL: string): Promise<string>{
    return new Promise( async (resolve ,reject)=> {
        const photo = await Jimp.read(inputURL);
        const outpath = '/tmp/filtered.'+Math.floor(Math.random() * 2000)+'.jpg';
        await photo
        .resize(256, 256) // resize
        .quality(60) // set JPEG quality
        .greyscale() // set greyscale
        .write(__dirname+outpath, (img)=>{
            resolve(__dirname+outpath);
        });
    });
}

/**
 * The initial function breaks with the url provided into the
 * project review had to make modifications to handle that error and respond to user
 * The logic is exactly the same but dit minor changes
 * @param inputURL
 */
export async function filterImageFromUrlMAS(inputURL: string):Promise<string>{
    let error = false
    const outPath =  __dirname+'/tmp/filtered.'+Math.floor(Math.random() * 2000)+'.jpg';
     await Jimp.read(inputURL )
        .then(async ( photo: Jimp, ) => {
            // We continue the process if Jimp has successfully read the image
             await photo
                .resize(256, 256) // resize
                .quality(60) // set JPEG quality
                .greyscale() // set greyscale
                .writeAsync(outPath)
            console.log("All is good")
        }).catch(e => {
            //If there was an error reading the image we catch it here
            error = true
            console.log("Error here")
        })
    // Check if there was any error and return the proper response
    if (error){
        return "error"
    }
    return outPath
}
// deleteLocalFiles
// helper function to delete files on the local disk
// useful to cleanup after tasks
// INPUTS
//    files: Array<string> an array of absolute paths to files
export async function deleteLocalFiles(files:Array<string>){
    for( let file of files) {
        fs.unlinkSync(file);
    }
}
