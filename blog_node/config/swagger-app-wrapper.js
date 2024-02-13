const swaggerUi = require('swagger-ui-koa');
const swaggerJSDoc = require('swagger-jsdoc');
const convert = require('koa-convert');
const mount = require('koa-mount');
//import swaggerDocument from './swagger.json'; //also can be used

module.exports = function (app) {
    //without jsdoc from swagger.json
    //app.use(swaggerUi.serve); //serve swagger static files
    //app.use(convert(mount('/swagger', swaggerUi.setup(swaggerDocument)))); //mount endpoint for access

    //with jsdoc
    const options = {
        swaggerDefinition: {
            info: {
                title: 'blog-api', // Title (required)
                version: '2.0.0', // Version (required)
            },
        },
        apis: [
            // './src/module/swagger/swagger.yaml',
            './routes/*.js', // Path to the API docs from root
            // './src/module/swagger/parameters.yaml'
        ],
    };
    // Initialize swagger-jsdoc -> returns validated swagger spec in json format
    const swaggerSpec = swaggerJSDoc(options);
    app.use(swaggerUi.serve); //serve swagger static files
    app.use(convert(mount('/apidoc', swaggerUi.setup(swaggerSpec)))); //mount endpoint for access
}
