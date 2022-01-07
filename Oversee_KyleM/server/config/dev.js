// "dev.js" should be included in gitIgnore because sensitive info
module.exports = {
    // srv (from mongodb) ( change the database so our original one isn't bombarded with info)
    // Tells Mongoose what database to use
    mongoURI: "mongodb+srv://medinak044:xzJa0r8hYfT0yUgl@medinak044bootcamp01.b4f9t.mongodb.net/kmToDos?retryWrites=true&w=majority",
    db: `Mongo`// helps to label which database we are working with
}