import config from '../config';
import BaseElement from '../BaseElement';
import PropsManager from './propsManager';
import ChildrenManager from './childrenManager';
import createNode from './utils/createNode';


export default class extends BaseElement{
    constructor(type, key) {
        const node = createNode(type);
        super(node, config.TAG_ELEMENT_TYPE);
        this.key = key;
        this.propsManager = new PropsManager(this.node);
        this.childrenManager = new ChildrenManager(this.node);
    }

    // public methods
    setProps = newProps => this.propsManager.setProps(newProps);

    setChildren = newChildren => this.childrenManager.setChildren(newChildren);

    unmount = () => {
        this.childrenManager.parentWillUnmount();
        this.__unmount();
        this.childrenManager.parentDidUnmount();
    };

    parentWillMount = () => this.childrenManager.parentWillMount();

    parentDidMount = () => this.childrenManager.parentDidMount();

    parentWillUnmount = () => this.childrenManager.parentWillUnmount();

    parentDidUnmount = () => this.childrenManager.parentDidUnmount();
}