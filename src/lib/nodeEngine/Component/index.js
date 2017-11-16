import classnames from 'classnames';

import slowpoke from 'lib/utils/slowpoke';

import TagElement from './TagElement';


const defaultTagName = 'div';

export default class {
    constructor() {
        this.elements = {};

        this.renderMethod = null;
        this.mountNode = null;

        this.renderMinDelay = 1000/60;

        this.styles = {};
    }

    __makeFullClassName = (mainClassName, mainStyleName, mode) => {
        if(!mode){
            return mainClassName;
        }

        const modeStyleNames = classnames(mode).split(' ');
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
        const mode = props._mode || '';
        props.class = this.__makeFullClassName(mainClassName, styleName, mode);

        const elementKey = props.key || styleName;
        let element = this.elements[elementKey];

        if(!element) {
            element = this.elements[elementKey] = new TagElement(tagName, elementKey);
        }

        delete props._mode;
        delete props._key;
        delete props._mount;
        delete props._realMount;

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

        return this;
    }

    update = slowpoke(() => {
        this.renderMethod();

        return this;
    }, this.renderMinDelay);
};