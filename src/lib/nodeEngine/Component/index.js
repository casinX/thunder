import slowpoke from 'lib/utils/slowpoke';

import config from './config';
import TagElement from './TagElement';
import ComponentElement from './ComponentElement';
import splitNames from './utils/splitNames';
import evolventChildren from './utils/evolventChildren';


export default class {
    constructor(componentConfig={}) {
        const {
            FPS = config.DEFAULT_FPS,
            sensitive = config.DEFAULT_SENSITIVE_STATE,
        } = componentConfig;

        this.tagElements = {};
        this.componentElements = {};

        this.renderMethod = null;
        this.mountNode = null;

        this.renderMinDelay = 1000/FPS;

        this.styles = {};

        this.isSensetive = sensitive;

        this.beforeMountCallback = () => {};
        this.afterMountCallback = () => {};

        this.beforeUnmountCallback = () => {};
        this.afterUnmountCallback = () => {};

        this.isMounted = false;
    }

    __tryLifeCycleBeforeMount = (noCallback=false) => {
        if(!this.isMounted){
            if(!noCallback){
                this.beforeMountCallback();
            }
        }
    };

    __tryLifeCycleAfterMount = (noCallback=false) => {
        if(!this.isMounted) {
            this.isMounted = true;
            if(!noCallback) {
                this.afterMountCallback();
            }
        }
    };

    __tryLifeCycleBeforeUnmount = () => {
        if(this.isMounted){
            this.beforeUnmountCallback();
        }
    };

    __tryLifeCycleAfterUnmount = () => {
        if(this.isMounted) {
            this.isMounted = false;
            this.afterUnmountCallback();
        }
    };



    __allPurposeParentLifeCycleMethod = (methodName, callbackName) => {
        Object.keys(this.componentElements).forEach(componentElementKey => {
            const componentElement = this.componentElements[componentElementKey];
            if(componentElement.isMounted()){
                componentElement[methodName]();
            }
        });
        this[callbackName]();
    };

    __parentWillMount = () => this.__allPurposeParentLifeCycleMethod('parentWillMount', 'beforeMountCallback');

    __parentDidMount = () => this.__allPurposeParentLifeCycleMethod('parentDidMount', 'afterMountCallback');

    __parentWillUnmount = () => this.__allPurposeParentLifeCycleMethod('parentWillUnmount', 'beforeUnmountCallback');

    __parentDidUnmount = () => this.__allPurposeParentLifeCycleMethod('parentDidUnmount', 'afterUnmountCallback');





    __makeFullClassName = (mainClassName, mainStyleName, mode) =>{
        if(!mode){
            return mainClassName;
        }

        const modeStyleNames = splitNames(mode);
        let modeClassNames = '';
        modeStyleNames.forEach(
            modeStyleName =>
                modeClassNames += `  ${this.styles[mainStyleName + modeStyleName] || ''}`
        );
        return mainClassName + modeClassNames;
    };

    __changeTagElement = (type, props, children) => {
        props = props || {};

        const result = type.split('-');

        const styleName = result[0];
        const tagName = result[1] || config.DEFAULT_TAG_NAME;

        const mainClassName = this.styles[styleName] || '';
        const mode = props.mode || '';
        props.class = this.__makeFullClassName(mainClassName, styleName, mode);

        const elementKey = props.key || styleName;
        let tagElement = this.tagElements[elementKey];

        if(!tagElement) {
            tagElement = this.tagElements[elementKey] = new TagElement(tagName, elementKey);
        }

        config.SERVICE_PROPS.forEach(devProp => delete props[devProp]);

        tagElement.setProps(props);
        tagElement.setChildren(children);

        return tagElement;
    };

    __changeComponentElement = (componentCreator, props, children) => {
        const componentKey = props.key;
        let componentElement = this.componentElements[componentKey];
        if(!componentElement) {
            componentElement = this.componentElements[componentKey] = new ComponentElement(componentCreator, props, children, componentKey);
        }
        return componentElement;
    };

    __changeElement = (config) => {

        const typeOrComponentCreator = config.elementName;
        const props = config.attributes;
        const children = evolventChildren(config.children || []);


        console.warn(config);

        if(typeof typeOrComponentCreator === 'function'){
            return this.__changeComponentElement(typeOrComponentCreator, props, children);
        }

        return this.__changeTagElement(typeOrComponentCreator, props, children);
    };

    __getRootElement = () => this.tagElements.root || this.componentElements.root;

    // public methods
    render = method => {
        this.renderMethod = method.bind(this);
        return this;
    };

    style = (...allStyles) => {
        allStyles.forEach(styles => this.styles = Object.assign(this.styles, styles));
        return this;
    };

    connect = (...containers) => {
        containers.forEach(container => container.__subscribeComponent(this.update));
        return this;
    };

    mountTo = (node) => {
        this.mountNode = node;
        this.__tryLifeCycleBeforeMount();
        // this.__parentWillMount();
        this.update(true);
        this.__tryLifeCycleAfterMount();
        // this.__parentDidMount();
        this.mountNode.append(this.__getRootElement().getNode());
        return this;
    };

    update = slowpoke((isFirstRenderEver) => {
        if(this.isMounted || isFirstRenderEver){
            this.renderMethod(this);
        }
        return this;
    }, this.renderMinDelay);

    beforeMount = beforeMountCallback => {
        this.beforeMountCallback = beforeMountCallback;
        return this;
    };

    afterMount = afterMountCallback => {
        this.afterMountCallback = afterMountCallback;
        return this;
    };

    beforeUnmount = beforeUnmountCallback => {
        this.beforeUnmountCallback = beforeUnmountCallback;
        return this;
    };

    afterUnmount = afterUnmountCallback => {
        this.afterUnmountCallback = afterUnmountCallback;
        return this;
    };
};