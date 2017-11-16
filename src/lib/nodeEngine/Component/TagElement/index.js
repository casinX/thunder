import PropsManager from './propsManager';
import ChildrenManager from './childrenManager';


export default class {
    constructor(type, key) {
        this.type = null;
        this.node = null;

        this.key = key;

        this.__createNode(type);
        this.propsManager = new PropsManager(this.node);
        this.childrenManager = new ChildrenManager(this.node);
    }

    __createNode = (type) => {
        const specifies = {
            'svg' : 'http://www.w3.org/2000/svg',
            'g' : 'http://www.w3.org/2000/svg',
            'circle' : 'http://www.w3.org/2000/svg'
        };
        const spec = specifies[type];
        this.node = spec ?
            document.createElementNS(spec, type) :
            document.createElement(type);
    };

    // public methods
    setProps = newProps => this.propsManager.setProps(newProps);

    setChildren = newChildren => this.childrenManager.setChildren(newChildren);

    isSame = (anotherNode) => this.node.isSameNode(anotherNode);

    unmount = () => this.node.remove();

    getKey = () => this.key;

    getNode = () => this.node;
}