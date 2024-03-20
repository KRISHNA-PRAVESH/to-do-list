import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class RegisterController extends Controller {
  @service authentication;

  @tracked username = '';
  @tracked password = '';
  @tracked email = '';

  @action
  submitForm() {
    let userInfo = {
      UserName: this.username,
      Password: this.password,
      Email: this.email,
    };

    this.authentication.register(userInfo);
  }
}
