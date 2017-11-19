import { tagElementType } from '../config/elementTypes';
import BaseElement from '../BaseElement';
import PropsManager from './propsManager';
import ChildrenManager from './childrenManager';
import createNode from './utils/createNode';


export default class extends BaseElement{
    constructor(type) {
        const node = createNode(type);
        super(node, tagElementType);
        this.propsManager = new PropsManager(this.node);
        this.childrenManager = new ChildrenManager(this.node);
    }

    // public methods
    setProps = newProps => this.propsManager.setProps(newProps);

    setChildren = newChildren => this.childrenManager.setChildren(newChildren);
}