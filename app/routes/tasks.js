import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class TasksRoute extends Route {
  @service authentication;
  @service router;

  model() {
    if (!this.authentication.isLoggedIn()) {
      this.router.transitionTo('login');
      alert("Please login");
    }
    let userName = this.authentication.getLoggedInUserName();
    return userName;

  }
}
