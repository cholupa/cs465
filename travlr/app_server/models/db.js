const mongoose = require('mongoose');
const host = process.env.DB_HOST || '127.0.0.1:27017';
const dbURI = `mongodb://${host}/travlr`;
const readLine = require('readline');

// build connection string + set timeout for connection
const connect = ()=>{
    setTimeout(()=>mongoose.connect(dbURI),1000);
    //console.log("Made it past the connection");
}

mongoose.connection.on('connected',()=> {
    console.log(`Mongoose connected to ${dbURI}`);
});

mongoose.connection.on('error',err =>{
    console.log("Mongoose connection supplemental error: ", err);
});

mongoose.connection.on('disconnected', () =>{
    console.log("Mongoose disconnected");
});

//Windows specific listener

if(process.platform == 'win32'){
    const r1 = readLine.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    r1.on('SIGINT', () => {
        process.emit("SIGINT");
    });
}

//clean shutdown

const cleanShutdown = (msg) => {
    mongoose.connection.close(() => {
        console.log(`Mongoose disconnected through ${msg}`);
    });
};

process.once('SIGUSR2',()=>{
    cleanShutdown('nodemon restart');
    process.kill(process.pid, 'SIGUSR2');
});

process.on('SIGTERM', ()=> {
    cleanShutdown('app shutdown');
    process.exit(0);
});

connect();
require('./travlr');
module.exports = mongoose;