import { nullElementType } from '../config/elementTypes';
import BaseElement from '../BaseElement';

export default class extends BaseElement{
    constructor(){
        const nullNode = Symbol('null-node');
        super(nullNode, null, nullElementType);
    }

    isSame = anotherNode => this.node === anotherNode;

    unmount = () => {};

    fakeUnmount = () => {};

    appendBefore = node => {};

    appendTo = node => {};
}