import { textElementType } from '../config/elementTypes';
import BaseElement from '../BaseElement';

export default class extends BaseElement{
    constructor (text) {
        const node = document.createTextNode(text);
        super(node, null, textElementType);
        this.text = text;
    }
}