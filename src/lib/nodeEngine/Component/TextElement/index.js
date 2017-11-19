import { textElementType } from '../config/elementTypes';
import BaseElement from '../BaseElement';

export default class extends BaseElement{

    constructor (text) {
        const node = document.createTextNode(text);
        super(node, textElementType);
        this.text = text;
    }

    isSame = anotherNode => anotherNode.text !== undefined ?
            this.text === anotherNode.text :
            this.node.isSameNode(anotherNode);
}