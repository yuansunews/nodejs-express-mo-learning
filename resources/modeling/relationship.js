//trade off between query performance vs consistency
//using references (normalization) => data consistency 
let author = {
    name: "mosh",

}

let course = {
    author: "id",
    authors: [
        "id1", "id2"
    ]
}

//using embedded documents (denormalization) => performance
let course = {
    author: {
        name: "mosh"
    }
}


//hybrid
let author = {
    name: "mosh",
    //other 50 properties
}

let course = {
    author: {
        id: "Ref",
        name: "mosh"
    }
}
