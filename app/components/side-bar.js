import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class SideBarComponent extends Component {
  @service dataStore;
  @service authentication;

  @tracked data;
  @tracked newListTitle = 'New List 1';
  @tracked showNewList = false;
  @tracked complete;
  @tracked incomplete;
  @tracked currentListTitle;
  @tracked newTaskTitle = '';
  @tracked isLoading = true;


   constructor(owner, args){
    super(owner, args);
    this.loadData();
  }

  async loadData(){
    this.data = await this.dataStore.getData();
    this.complete  = this.data[0].complete;
    this.incomplete = this.data[0].incomplete;
    this.currentListTitle = this.data[0].list;
    this.isLoading = false;
  }

  @action
  addNewTask() {
    this.showNewList = true;
  }

  @action
  async updateList() {
    // console.log(this.newListTitle);

    //updating in the datastore
    await this.dataStore.addTitle(this.newListTitle);
    this.showNewList = false;
    this.newListTitle = 'New List 1';
    this.data = this.dataStore.getLocalData();
  }

  @action
  focus(element) {}

  @action
  currentList(list) {
    this.complete = list.complete;
    this.incomplete = list.incomplete;
    this.currentListTitle = list.list;
  }


  //adding new task in the current list
  @action
  async addTask() {
    this.incomplete = [...this.incomplete, this.newTaskTitle];


    //adding data to the corresponding list
    this.data.forEach((data) => {
      if (data.list == this.currentListTitle) {
        data.incomplete = this.incomplete;
      }
    });
    // console.log('title: '+this.currentTitle);
    // console.log('task:' +this.newTask);
    this.newTaskTitle = '';
    await this.dataStore.addTask(this.currentListTitle);
  }

  @action
  isEqual(list) {
    if (list == this.currentListTitle) return true;
    return false;
  }

  @action
  async completed(task) {
    // console.log(this.currentListTitle);

    var index = this.incomplete.indexOf(task);
    // console.log(index); returns -1 if task already complete
    if (index != -1) {
      //remove from this.incomplete push to complete
      //removing current task from incomplete
      this.incomplete.splice(index, 1);
      this.incomplete = this.incomplete;

      //pushing into complete
      this.complete = [...this.complete, task];
    } else {
      //change task from complete to incomplete
      var index = this.complete.indexOf(task);

      //removing task from complete
      this.complete.splice(index, 1);
      this.complete = this.complete;

      //adding task to incomplete
      this.incomplete = [task, ...this.incomplete];
    }

    //saving changes in the data store (to persist throughout the session)
    this.data.forEach((data) => {
      if (data.list == this.currentListTitle) {
        data.incomplete = this.incomplete;
        data.complete = this.complete;
      }
    });

    //update in db
    await this.dataStore.completeTask(this.currentListTitle);

    // this.dataStore.completeTask(task,this.currentListTitle);
  }

  @action
  logout(){
    let warn = confirm("Do you want to logout? ");
    if(warn == true){
      this.authentication.logout();
    }
    
  }
}
