// _id: 5a99292b9d999d99s

// 12 bytes
    // 4 bytes: timestamp
    // 3 bytes: machine identifier
    // 2 bytes: process identifier
    // 3 bytes: counter


// 1 byte = 8 bits
// 2^8 = 256
// 2^24 = 16M
//

// Driver -> MongoDB
// Mongoose is abstract of MongoDB driver

//when crate a document mongoose talks to driver to generate unique identifier
//objectid create in memory
const mongoose = require('mongoose');

const id = new mongoose.Types.ObjectId;
console.log(id.getTimestamp());//5a73777472747284728422884d78, 1018-02-03T19:39:48:888Z
const isVlida = mongoose.Types.ObjectId.isValid('1234');
console.log(isValid);//false