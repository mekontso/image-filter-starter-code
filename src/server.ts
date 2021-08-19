import express from 'express';
import bodyParser from 'body-parser';
import {filterImageFromURL, deleteLocalFiles, filterImageFromUrlMAS} from './util/util';

(async () => {

  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;

  // Use the body parser middleware for post requests
  app.use(bodyParser.json());

  // @TODO1 IMPLEMENT A RESTFUL ENDPOINT
  // GET /filteredimage?image_url={{URL}}
  // endpoint to filter an image from a public url.
  // IT SHOULD
  //    1
  //    1. validate the image_url query
  //    2. call filterImageFromURL(image_url) to filter the image
  //    3. send the resulting file in the response
  //    4. deletes any files on the server on finish of the response
  // QUERY PARAMATERS
  //    image_url: URL of a publicly accessible image
  // RETURNS
  //   the filtered image file [!!TIP res.sendFile(filteredpath); might be useful]

  /**************************************************************************** */
  app.get("/filteredimage", async (request, response) => {
    let {image_url} = request.query
    // Check if user has passed the url. if true process if not return response with 422 error
    if (image_url) {
      console.log("User has provided Image URl")
      const imagePath = await filterImageFromUrlMAS(image_url)

      if (imagePath === "error"){
        // Send error response to user if could not process image
        response.status(500).send("Sorry server could not read the image properly. Try again or  another URL")
      }
    // Respond to user with image when image processing is finished
      response.status(200).sendFile(imagePath, function (){
        // Delete all the temporary files in th tmp folder
        deleteLocalFiles([imagePath])
      })
    } else {
       response.status(422).send("Sorry can't process image,URl is missing")
    }

  });

  //! END @TODO1

  // Root Endpoint
  // Displays a simple message to the user
  app.get( "/", async ( req, res ) => {
    res.send("try GET /filteredimage?image_url={{}}")
  } );


  // Start the Server
  app.listen( port, () => {
      console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );
})();
