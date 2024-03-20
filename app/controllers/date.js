import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';


export default class DateController extends Controller{

    @service authentication;

    @action
    logout(){
        this.authentication.logout();
    }
    

}