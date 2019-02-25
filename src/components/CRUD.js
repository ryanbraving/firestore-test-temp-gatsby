import React, { Component } from 'react'
import firebase from "firebase";
// import db from "./Firebase";
// import firebase from "./Firebase";
import db from './Firebase'

export default class CRUD extends Component {
  constructor() {
    super();
    this.state = {
        email: "",
        fullname: "",
        messages: []
    };
  }
    
    componentWillMount() {
    db.collection("unverifiedUsers").orderBy("createdAt", "desc")
    .onSnapshot(collection => {
        const messages = collection.docs.map(doc => doc.data());
        this.setState({ messages: messages });
        // let changes = collection.docChanges();
        // console.log(changes);
        // changes.forEach(change => {
        // console.log(change.doc.data());
        // if (change.type === "added") {
        //     console.log("document has added", change.doc.id);
        // } else if (change.type === "removed") {
        //     console.log("document has removed", change.doc.id);
        // } else if (change.type === "modified") {
        //     console.log("document has updated", change.doc.id);
        // }
        // });
    });
    }
    
    updateInput = e => {
    this.setState({
        [e.target.name]: e.target.value
    });
    };
    
    addUser = e => {
    e.preventDefault();
    const timeNow = firebase.firestore.Timestamp.now();
    // db.collection("unverifiedUsers")
    //     .where("email", "==", this.state.email.toLowerCase())
    //     .get()
    //     .then(
    //     function(querySnapshot) {
    //         if (querySnapshot.empty) {
    //         //there is no doc found so adding new doc
            var refAddDoc = db.collection("unverifiedUsers").doc();
            refAddDoc.set({
                docId: refAddDoc.id,
                fullname: this.state.fullname,
                email: this.state.email.toLowerCase(),
                createdAt: timeNow,
                updatedAt: timeNow
            });
            // } else {
            // // there is a doc already in DB
            // var docId = querySnapshot.docs.map(function(documentSnapshot) {
            //     return documentSnapshot.data().docId;
            // });
            // //passing docid to collection to update doc
            // db.collection("unverifiedUsers")
            //     .doc(docId[0]) //
            //     .update({
            //     fullname: this.state.fullname,
            //     updatedAt: timeNow
            //     })
            //     .catch(function(error) {
            //     // The document probably doesn't exist.
            //     console.error("Error updating document: ", error);
            //     });
            // }
            this.setState({
            fullname: "",
            email: ""
            // });
        }
        );
    };
    

  render() {
    return (
      <div>
        <form onSubmit={this.addUser}>
          <input
            type="text"
            name="fullname"
            placeholder="Full name"
            onChange={this.updateInput}
            value={this.state.fullname}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={this.updateInput}
            value={this.state.email}
            required
          />
          <button type="submit">Submit</button>
        </form>
        <ul>
          {this.state.messages.map((message, index) => (
            <li key={index}>
              {message.email}
              <button
                onClick={() =>
                  db
                    .collection("unverifiedUsers")
                    .doc(message.docId)
                    .delete()
                }
              >
                Delete Me
              </button>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}
