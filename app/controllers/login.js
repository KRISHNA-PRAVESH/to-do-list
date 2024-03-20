import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class LoginController extends Controller {
  @service authentication;

  @tracked username = '';
  @tracked password = '';

  @action
  submitForm() {
    let userInfo = { UserName: this.username, Password: this.password };
    this.authentication.login(userInfo);
  }
}
