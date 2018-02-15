import config from '../config';
import BaseElement from '../BaseElement';

export default class extends BaseElement {

    constructor(componentCreator, props, children, key) {
        const component = componentCreator(props, children);
        component.update(true);
        const node = component.__getRootElement().getNode();
        super(node, config.COMPONENT_ELEMENT_TYPE);
        this.key = key;
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

    appendBefore = (...args) => this.__lifeCycleMount(this.__appendBefore, args);

    appendAfter = (...args) => this.__lifeCycleMount(this.__appendAfter, args);

    appendTo = (...args) => this.__lifeCycleMount(this.__appendTo, args);


    parentWillMount = () => this.component.__parentWillMount();

    parentDidMount = () => this.component.__parentDidMount();

    parentWillUnmount = () => this.component.__parentWillUnmount();

    parentDidUnmount = () => this.component.__parentDidUnmount();

    isMounted = () => this.component.isMounted;

}