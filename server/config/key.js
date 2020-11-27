if(process.env.NODE_ENV === 'production'){
    module.exports = require('./prod');
} else{
    console.log("Dev module export");
    module.exports = require('./dev');   
}
