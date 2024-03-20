import Service from '@ember/service';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class AuthenticationService extends Service {

    @service router;



    BASE_URL = 'http://localhost:5084';

    async login(userInfo) {
        // console.log(userInfo);

        let response = await fetch(`${this.BASE_URL}/user/login`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(userInfo),
        });
        if (response.ok) {
            let parsed = await response.json();
            // console.log(parsed);
            localStorage.setItem('User', JSON.stringify(parsed));
            // console.log('Logged In',JSON.parse(localStorage.getItem("User")).userName);
            this.router.transitionTo('tasks')
        } else {
            let err = await response.text();
            alert(err);
        }
    }

    async register(userInfo) {
        // console.log(userInfo);
        let response = await fetch(`${this.BASE_URL}/user/register`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(userInfo),
         });
        if (response.ok) {
            let parsed = await response.json();
            // console.log(parsed);
            localStorage.setItem('User', JSON.stringify(parsed));
            // console.log(jwtToken);
            console.log('Registered');
            this.router.transitionTo('tasks')
        } else {
            //    alert(response.statusText);
            let err = await response.text();
            alert(err);
        }
    }


     logout() {
        localStorage.clear();
        // console.log("jwt cleared");
        this.isLoggedIn = false;
        this.router.transitionTo('login');
    }

    isLoggedIn(){
        let token = localStorage.getItem("User");
        if(token) return true;
        return false;
    }

    getLoggedInUserName(){
        let user = localStorage.getItem("User");
        let parsed = JSON.parse(user);
        // console.log(parsed.userName);
        return parsed.userName;
    }
}
