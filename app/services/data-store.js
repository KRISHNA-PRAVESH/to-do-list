import Service from '@ember/service';
import { service } from '@ember/service';

export default class DataStoreService extends Service {

  @service router;

  BASE_URL = 'http://localhost:5084';
  data = [
    {
      list:"New List - 1",
      incomplete:[],
      complete:[]
    }
  ];

  async getData() {
    let User = localStorage.getItem("User");
    let jwtToken = JSON.parse(User).token;
    if (jwtToken) {
      let response = await fetch(`${this.BASE_URL}/todo`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${jwtToken}`,
          'Content-type':'application/json'
        }
      });
      if (response.ok) {
        let parsed = await response.json();
        //  console.log(parsed);
        if(parsed.length > 0){
          this.data = parsed;
        }
        
        return this.data;
      }
      else {
        // console.log(response)
        let err = await response.text();
        this.router.transitionTo('login');
        alert("Session Expired");

      }
    }
    else {
      this.router.transitionTo('login');
      alert("Please login")
    }
    
  }

  //adding a new list of todo -- Save()
  async addTitle(newTitle) {
    let newTask = {
      list: newTitle,
      complete: [],
      incomplete: [],
    };
    this.data = [...this.data, newTask];

    //update new list in db
    let User = localStorage.getItem("User");
    let jwtToken = JSON.parse(User).token;
    let response = await fetch(`${this.BASE_URL}/todo`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
        'Content-type':'application/json'
      },
      body: JSON.stringify(newTask),
    });
    if(response.ok){
      let parsed = await response.text();
      console.log(parsed);
    }
    else console.log("error in saving new list",response);

  }


  //adding a new task in the given list
  async addTask(listTitle){
    let updatedList;
    for(var i=0;i<this.data.length;i++){
      if(this.data[i].list == listTitle){
        updatedList = this.data[i];
        break;
      }
    }

    //updating in the db
    let User = localStorage.getItem("User");
    let jwtToken = JSON.parse(User).token;
    let response = await fetch(`${this.BASE_URL}/todo`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
        'Content-type':'application/json'
      },
      body: JSON.stringify(updatedList),
    });
    if(response.ok){
      let parsed = await response.text();
      console.log(parsed);
    }
    else console.log("error in saving new list",response);

  }

  //updating exisiting - Update()
  async completeTask(listTitle) {
     
    //since the data is locally changed just update it to db
    //use add task method above()
    await this.addTask(listTitle);
  }


  //returns the locally stored data instead of fetching from server
  getLocalData(){
    return this.data;
  }


  // async getDate() {
  //   let jwtToken = localStorage.getItem("Token");

  //   if (jwtToken) {
  //     let response = await fetch('http://localhost:5084/date', {
  //       method: 'GET',
  //       headers: {
  //         Authorization: `Bearer ${jwtToken}`
  //       }
  //     });
  //     if (response.ok) {
  //       let parsed = await response.text();
  //       //  console.log(parsed);
  //       return parsed;
  //     }
  //     else {
  //       console.log(response)
  //       let err = await response.text();
  //       this.router.transitionTo('login');
  //       alert("Session Expired");

  //     }
  //   }
  //   else {
  //     this.router.transitionTo('login');
  //     alert("Please login")
  //   }




  // }
}
