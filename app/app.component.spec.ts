import {it, expect, injectAsync, describe, TestComponentBuilder} from 'angular2/testing';
import {AppComponent} from './app.component';

describe('AppComponent', () => {

    it('should have initial message', injectAsync([TestComponentBuilder], (tcb:TestComponentBuilder) => {
        return tcb.createAsync(AppComponent).then((fixture) => {
            fixture.detectChanges();
            let element:Element = fixture.nativeElement;
            expect(element).toBeDefined();
            expect(element.querySelector('.example')).toHaveText('Hello world!');
        });
    }));
});
