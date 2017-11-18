import slowpoke from 'lib/utils/slowpoke';

import devProps from './config/devProps';
import TagElement from './TagElement';
import splitNames from './utils/splitNames';


const defaultTagName = 'div';

export default class {
    constructor() {
        this.elements = {};

        this.renderMethod = null;
        this.mountNode = null;

        this.renderMinDelay = 1000/60;

        this.styles = {};
    }

    __makeFullClassName = (mainClassName, mainStyleName, mode) =>{
        if(!mode){
            return mainClassName;
        }

        const modeStyleNames = splitNames(mode);
        let modeClassNames = '';
        modeStyleNames.forEach(
            modeStyleName =>
                (modeClassNames += ' ' + (this.styles[mainStyleName + modeStyleName] || ''))
        );
        return mainClassName + modeClassNames;
    };

    __changeElement = (type, props, ...children) => {
        props = props || {};

        const result = type.split('-');

        const styleName = result[0];
        const tagName = result[1] || defaultTagName;

        const mainClassName = this.styles[styleName] || '';
        const mode = props.mode || '';
        props.class = this.__makeFullClassName(mainClassName, styleName, mode);

        const elementKey = props.key || styleName;
        let element = this.elements[elementKey];

        if(!element) {
            element = this.elements[elementKey] = new TagElement(tagName, elementKey);
        }

        devProps.forEach(devProp => delete props[devProp]);

        element.setProps(props);
        element.setChildren(children);

        return element;
    };

    // public methods
    render = method => {
        this.renderMethod = method.bind(this);

        return this;
    };

    style = styles => {
        this.styles = Object.assign(this.styles, styles);
        return this;
    };

    mount(node){
        this.mountNode = node;
        this.update();
        this.mountNode.append(this.elements.root.getNode());
        return this;
    }

    update = slowpoke(() => {
        this.renderMethod();

        return this;
    }, this.renderMinDelay);
};