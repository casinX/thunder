import normalizeChild from './normalizeChild';
import iterateLinkedList from './iterateLinkedList';
import config from '../../config';


export default class {
    constructor(node) {
        this.parentNode = node;

        this.firstListChild = null;

        this.lastFixedListChild = null;
        this.lastFixedListChildIndex = null;
    }

    __iterAfterLastFixed = method => {
        const iterFrom = this.lastFixedListChild ? this.lastFixedListChild.next : this.firstListChild;
        const indexFrom = this.lastFixedListChild ? this.lastFixedListChildIndex + 1 : 0;

        iterateLinkedList(
            iterFrom,
            indexFrom,
            method,
        );
    };

    __appendAfterLastFixed = (child, childIndex) => {

        const listChild = {
            value: child,
            next: null,
        };

        if (this.lastFixedListChild) {
            listChild.value.appendAfter(this.lastFixedListChild.value.getNode());

            listChild.next = this.lastFixedListChild.next;
            this.lastFixedListChild.next = listChild;

        } else {

            if (this.firstListChild) {
                listChild.value.appendBefore(this.firstListChild.value.getNode());
                listChild.next = this.firstListChild;
            } else {
                listChild.value.appendTo(this.parentNode);
            }

            this.firstListChild = listChild;
        }

        this.lastFixedListChild = listChild;
        this.lastFixedListChildIndex = childIndex;
    };

    __moveToLastFixed = (oldChildIndex, newChildIndex, cache) => {
        const elemToMove = cache[oldChildIndex];

        const prevElem = cache[oldChildIndex - 1] || null;
        const nextElem = elemToMove.next || null;

        if (prevElem) {
            prevElem.next = nextElem;
        }

        elemToMove.next = null;

        this.__appendAfterLastFixed(elemToMove.value, newChildIndex);
    };

    __cropAfterLastFixed = () => {
        this.__iterAfterLastFixed(child => child.value.unmount());
        if (this.lastFixedListChild) {
            this.lastFixedListChild.next = null;
        }
    };

    __allPurposeParentLifeCycleMethod = methodName => {
        iterateLinkedList(this.firstListChild, 0, ({value: child}) => {
            if (child.type === config.TAG_ELEMENT_TYPE || child.type === config.COMPONENT_ELEMENT_TYPE) {
                child[methodName]();
            }
        });
    };

    // public methods
    setChildren = (newChildren) => {
        let correctionIndex = 0;

        newChildren.forEach((newChild, newChildIndex) => {

            newChild = normalizeChild(newChild);

            if (newChild === null) {
                correctionIndex++;
                return;
            }

            newChildIndex -= correctionIndex;

            let isFinded = false;

            const cache = {};

            this.__iterAfterLastFixed((oldChild, oldChildIndex) => {

                cache[oldChildIndex] = oldChild;

                if (newChild.isSame(oldChild.value)) {
                    isFinded = true;
                    if (newChildIndex !== oldChildIndex) {
                        this.__moveToLastFixed(oldChildIndex, newChildIndex, cache);
                    } else {
                        this.lastFixedListChildIndex = oldChildIndex;
                        this.lastFixedListChild = oldChild;
                    }
                    return true;
                }
            });

            if (!isFinded) {
                this.__appendAfterLastFixed(newChild, newChildIndex);
            }
        });

        this.__cropAfterLastFixed();
        this.lastFixedListChild = null;
        this.lastFixedListChildIndex = null;
    };

    parentWillMount = () => this.__allPurposeParentLifeCycleMethod('parentWillMount');

    parentDidMount = () => this.__allPurposeParentLifeCycleMethod('parentDidMount');

    parentWillUnmount = () => this.__allPurposeParentLifeCycleMethod('parentWillUnmount');

    parentDidUnmount = () => this.__allPurposeParentLifeCycleMethod('parentDidUnmount');

}
