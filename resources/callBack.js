const { rejects } = require("assert");
const { promises } = require("fs");
const { resolve } = require("path");

console.log("before ");
// getUser(1, (user)=>{
//     console.log('user', user);

//     //get repo
//     getRepo(user.gitHubUserName)
// })

function getUser(id, callback){
    setTimeout(()=>{
        console.log('reading user from database');
        callback({id: id, gitHubUserName: "jia"});
    }, 2000)
}

function getRepo(username, callback){
    setTimeout(()=>{
        console.log("reading dta from github");
        callback(['repo1', 'repo2'])
    }, 2000)
}

//promise
function getProName(id){
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            console.log("reading data");
            resolve({id: id, getUserName: 'jia'})
        }, 2000)
    })
}
function getProRepo(name){
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            console.log("getting repo");
            //resolve(['repo1', 'repo2'])
            reject("error occured!")
        }, 2000)
    })
}

// getProName(1).then(user=>getProRepo(user.getUserName))
// .then(repo=>console.log(repo))
// .catch(error=>console.error("error catch: ", error.message))



//asyn and await approach
async function displayRepo(){
    try{
        const user = await getProName();
        const repo = await getProRepo(user);
        console.log(repo)
    }
    catch(err){
        console.log("error:", err)
    }
    
}

displayRepo();

