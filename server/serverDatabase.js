const nedb = require("nedb");
const podcastDB = new nedb();

exports.saveNewPod = async function(pod) {
    return new Promise((resolve, reject) => {
        podcastDB.insert(pod, function (err, newDoc) {
            if(err) reject(err)

            if(newDoc) resolve({status: true, doc: newDoc})
        });
    }).catch(error => console.log(error))
}

exports.getAllPods = async function() {
    return new Promise((resolve, reject) => {
        podcastDB.find({}, function (err, docs) {
            if(err) reject(err)

            if(docs) resolve({status: true, docs: docs})
        })
    }).catch(error => console.log(error))
}

exports.getSinglePod = async function(id) {
    return new Promise((resolve, reject) => {
        podcastDB.find({_id: id}, function (err, doc) {
            if(err) reject(err)
            
            if(doc) resolve({status: true, doc: doc})
        })
    }).catch(error => console.log(error))
}

exports.deletePod = async function(id) {
    return new Promise((resolve, reject) => {
        podcastDB.remove({_id: id}, function (err, docRemoved) {
            if(err) reject(err);

            if(docRemoved) resolve({status: true, docRemoved: docRemoved})
        })
    }).catch(error => console.log(error))
}

exports.updatePod = async function(update) {
    return new Promise((resolve, reject) => {
        podcastDB.update({_id: update.id}, {$set: {title: update.title, link: update.link}}, {}, (err, updatedDoc) => {
            if(err) reject(err);

            if(updatedDoc) resolve({status: true, docs: updatedDoc});
        })
    }).catch(error => console.log(error))
}