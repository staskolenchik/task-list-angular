import {Component} from "@angular/core";
import {User} from "../models/user";


@Component({
    selector: "username-menu",
    template: `<div>Hello {{user ? user.name : 'guest'}}!</div>`
})

export class UsernameMenuComponent {
    user: User;
}