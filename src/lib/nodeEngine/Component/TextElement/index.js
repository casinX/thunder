import config from '../config';
import BaseElement from '../BaseElement';

export default class extends BaseElement{

    constructor (text) {
        const node = document.createTextNode(text);
        super(node, config.TEXT_ELEMENT_TYPE);
        this.text = text;
    }

    isSame = anotherNode => anotherNode.text !== undefined ?
            this.text === anotherNode.text :
            this.node.isSameNode(anotherNode);
}