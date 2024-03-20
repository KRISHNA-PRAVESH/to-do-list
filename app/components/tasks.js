import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class TasksComponent extends Component {
  @service dataStore;

  @tracked newTasks = [];

  @action
  dest() {
    this.newTasks = ['new task', 'new task'];
  }
}
