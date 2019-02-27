import React, { Component } from "react"
// import firebase from "firebase";
// import db from "./Firebase";
import firebase from "./Firebase"
// import db from './Firebase'

import { timeDifferenceForDate } from "./TimeDiff"
var db = firebase.firestore()

export default class CRUD extends Component {
  constructor() {
    super()
    this.state = {
      email: "",
      fullname: "",
      messages: [],
    }
  }

  componentWillMount() {
    db.collection("unverifiedUsers")
      // db.collection("unverifiedUsers").orderBy("createdAt", "desc")
      .onSnapshot(collection => {
        const messages = collection.docs.map(doc => doc.data())
        this.setState({ messages: messages })
        // let changes = collection.docChanges()
        // console.log(changes);
        // changes.forEach(change => {
        // console.log(change.doc.data());
        // if (change.type === "added") {
        //   console.log("document has added", change.doc.id)
        // } else if (change.type === "removed") {
        //   console.log("document has removed", change.doc.id)
        // } else if (change.type === "modified") {
        //   console.log("document has updated", change.doc.id)
        // }
        // })
      })
  }

  updateInput = e => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  addUser = e => {
    e.preventDefault()
    // const timeNow = firebase.firestore.Timestamp.now()
    const timeNow = firebase.firestore.FieldValue.serverTimestamp()

    var refAddDoc = db
      .collection("unverifiedUsers")
      .doc(this.state.email.toLowerCase())
    refAddDoc
      .update({
        updatedAt: timeNow,
      })
      .then(
        function() {
          // console.log("Document successfully updated!");
          this.setState({
            fullname: "",
            email: "",
          })
        }.bind(this)
      )
      .catch(
        function(error) {
          // The document probably doesn't exist.
          // console.error("Error updating document: ", error);
          refAddDoc.set({
            docId: refAddDoc.id,
            fullname: this.state.fullname,
            // email: this.state.email.toLowerCase(),
            createdAt: timeNow,
            // updatedAt: timeNow,
          })
          this.setState({
            fullname: "",
            email: "",
          })
        }.bind(this)
      )
  }

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
              {message.docId}{" "}
              <button
                onClick={() =>
                  db
                    .collection("unverifiedUsers")
                    .doc(message.docId)
                    .delete()
                }
              >
                Delete Me
              </button>{" "}
              <b>Created:</b>{" "}
              {message.createdAt
                ? timeDifferenceForDate(message.createdAt.toDate())
                : null}{" "}
              {message.updatedAt ? <b>Updated: </b> : null}
              {message.updatedAt
                ? timeDifferenceForDate(message.updatedAt.toDate())
                : null}
            </li>
          ))}
        </ul>
      </div>
    )
  }
}
