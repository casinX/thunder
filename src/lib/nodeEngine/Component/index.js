import slowpoke from 'lib/utils/slowpoke';

import config from './config';
import TagElement from './TagElement';
import ComponentElement from './ComponentElement';
import splitNames from './utils/splitNames';


export default class {
    constructor(componentConfig={}) {
        const {
            FPS = config.DEFAULT_FPS,
        } = componentConfig;

        this.tagElements = {};
        this.componentElements = {};

        this.renderMethod = null;
        this.mountNode = null;

        this.renderMinDelay = 1000/FPS;

        this.styles = {};


        this.beforeMountCallback = () => {};
        this.afterMountCallback = () => {};

        this.beforeUnmountCallback = () => {};
        this.afterUnmountCallback = () => {};

        this.isMounted = false;
    }

    __tryLifeCycleBeforeMount = () => {
        if(!this.isMounted){
            this.beforeMountCallback();
        }
    };

    __tryLifeCycleAfterMount = () => {
        if(!this.isMounted) {
            this.isMounted = true;
            this.afterMountCallback();
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
            tagElement = this.tagElements[elementKey] = new TagElement(tagName);
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
            componentElement = this.componentElements[componentKey] = new ComponentElement(componentCreator, props, children);
        }
        return componentElement;
    };

    __changeElement = (typeOrComponentCreator, props, ...children) => {

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

    style = styles => {
        //TODO make styles array and take two equal classes if need
        this.styles = Object.assign(this.styles, styles);
        return this;
    };

    connect = (...containers) => {
        containers.forEach(container => container.__subscribeComponent(this.update));
        return this;
    };

    mountTo = (node) => {
        this.mountNode = node;
        this.__tryLifeCycleBeforeMount();
        this.update(true);
        this.__tryLifeCycleAfterMount();
        this.mountNode.append(this.__getRootElement().getNode());
        return this;
    };

    update = slowpoke((isForceUpdate) => {
        if(this.isMounted || isForceUpdate){
            this.renderMethod();
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