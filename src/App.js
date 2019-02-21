import React, { Component } from 'react';
import './App.css';

const allUsers = ['Michal', 'Kasia', 'Jacek', 'Marta', 'Tomek', 'Ania'];

class App extends React.Component {
  constructor() {
    super();    
    this.state = {
      filteredUsers: allUsers,
      selectedUser: null,
      message:'' 
    };  
  }

  filterUsers = (e) => {
    const text = e.currentTarget.value;
    const filteredUsers = this.getFilteredUsersForText(text);
    this.setState({
      filteredUsers
    })
  }
  
  handleMessageChange = (e) => {
    this.setState({
      message: e.target.value
    });
  }

  addNewUser=()=> {
   let message=this.state.message;
    allUsers.push(message);
    this.setState({
      filteredUsers: allUsers
    })
  }
   
  getFilteredUsersForText(text) {
    return allUsers.filter(user => user.toLowerCase().includes(text.toLowerCase()))
  }

onUserSelected = (selectedUser)=> { 
   this.setState({
     selectedUser
    });
}

onElementDelete =(s) => {
  for(let i=0;i<s.length;i++){
    if(s==this[i]) this.splice(i, 1);
    }
}
// poprawić usuwanie
/*
Usuwanie wielu elementów (kod ES2016)
Dodatkową zaletą tej metody jest możliwość usunięcia wielu elementów

let forDeletion = [2, 3, 5]

let arr = [1, 2, 3, 4, 5, 3]

arr = arr.filter(item => !forDeletion.includes(item))
// !!! Read below about array.includes(...) support !!!

console.log(arr)
// [ 1, 4 ]
//const delbut=allUsers.onElementDelete('Michal');

onUserDelete =()=> {
  allUsers.onElementDelete('Michal');
  this.setState({
    filteredUsers: allUsers
  })
}
 */ 
  render () {
    return (
      <div>
        <p> {this.state.selectedUser} </p>
        <input onInput={this.filterUsers} />
        <p><input value={this.state.message} onChange={this.handleMessageChange}/></p>
        <p><button onClick={this.addNewUser}>Dodaj nową osobę </button></p>
        <UsersList  userSelected={this.onUserSelected}  users={this.state.filteredUsers} />
      </div>
    );
  }
};

const UsersList = ({ users, userSelected, userDelete }) => {
  if (users.length > 0) {
    return (
      <ul>
        {users.map(user => <li onClick={userSelected.bind(null, user)} key={user}>{user}<button onClick={userDelete} >usuń</button></li>)}
      </ul>
    );
  }

  return (
    <p>No results!</p>
  );
};

export default App;
