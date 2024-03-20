import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class DateRoute extends Route {
    @service dataStore;

    model(){
        let date = this.dataStore.getDate();
        return date;
    }
}
