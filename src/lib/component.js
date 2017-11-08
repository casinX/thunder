import slowpoke from 'lib/utils/slowpoke';

export default class {
    constructor(props) {
        this.elements = {};


        this.onRenderMethod = null;
        this.onAfterRenderMethod = null;
        this.mountNode = null;


        this.renderMinDelay = 1000/60;

        this.styles = {};
    }


    __changeElement = (type, props, ...children) => {
        let className = type;
        let tagName = 'div';

        if(type.indexOf('-') >= 0){
            const result = type.split('-');
            tagName = result[0];
            className = result[1];
        }

        console.warn('change Element: ', tagName, this.styles[className]);
        // const elementKey = props.key;
        // const element = this.elements[elementKey];

        // if(!element) {
        //     this.elements[elementKey] = new LightElement(type, props, children);
        //     return this.elements[elementKey];
        // }
        //
        // element.setProps(props);
        // element.setChildren(children);
        //
        // return element;
    };

    // public methods
    onRender = method => this.onRenderMethod = method.bind(this);

    onAfterRender = method => this.onAfterRenderMethod = method;

    stylize = styles => this.styles = Object.assign(this.styles, styles);

    mountTo(node){
        this.mountNode = node;
        this.render();
    }

    render = slowpoke(() => {
        this.onRenderMethod();
    }, this.renderMinDelay);
};