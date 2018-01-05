import config from '../config';
import BaseElement from '../BaseElement';

export default class extends BaseElement{

    constructor (componentCreator, props, children) {
        const component = componentCreator(props, children);
        component.update(true);
        const node = component.__getRootElement().getNode();
        super(node, config.TAG_ELEMENT_TYPE);
        this.component = component;
    }

    __lifeCycleMount = (method, args) => {
        this.component.__tryLifeCycleBeforeMount();
        method(...args);
        this.component.__tryLifeCycleAfterMount();
    };

    __lifeCycleUnmount = (method, args) => {
        this.component.__tryLifeCycleBeforeUnmount();
        method(...args);
        this.component.__tryLifeCycleAfterUnmount();
    };

    unmount = (...args) => this.__lifeCycleUnmount(this.__unmount, args);

    fakeUnmount = (...args) => this.__lifeCycleUnmount(this.__fakeUnmount, args);

    appendBefore = (...args) => this.__lifeCycleMount(this.__appendBefore, args);

    appendAfter = (...args) => this.__lifeCycleMount(this.__appendAfter, args);

    appendTo = (...args) => this.__lifeCycleMount(this.__appendTo, args);
}