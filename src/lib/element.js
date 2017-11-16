import PropsManager from './propsManager';


export default class {
    constructor(type, key) {
        this.type = null;
        this.children = null;
        this.node = null;

        this.key = key;

        this.__createNode(type);
        this.propsManager = new PropsManager(this.node);
        this.__createChildrenList();
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

    __createChildrenList = () => {
        // this.children = new ChildrenList(this.node);
    };

    // public methods
    setProps = (newProps) => this.propsManager.setProps(newProps);

    setChildren = (newChildren) => {
        // this.children.update(newChildren);
    };

    isSame = (anotherNode) => this.node.isSameNode(anotherNode);

    unmount = () => this.node.remove();

    getKey = () => this.key;

    getNode = () => this.node;
}