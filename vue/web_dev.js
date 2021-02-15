const {build} = require('vue-webpack');
const {devServer} = require('express-vue-dev');
 
let middleware = devServer({
  server: build({
    mode: 'server',
    inputFilePath: `./web.js` // Vue application entry file for server-side
  }),
  client: build({
    mode: 'client',
    inputFilePath: `./vue/src/main.js` // Vue application entry file for client-side
  })
})