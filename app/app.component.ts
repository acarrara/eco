import {Component} from 'angular2/core';

@Component({
    selector: 'app',
    template: `
        <div class="background">
            <div class="example">{{message}}</div>
        </div>
        `
})
export class AppComponent {
    public message:string = 'Hello world!';
}
