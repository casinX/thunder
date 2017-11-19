import normalizeChild from './normalizeChild';
import iterateLinkedList from './iterateLinkedList';
import createLinkedListElem from './createLinkedListElem';


export default class{
    constructor(node){
        this.parentNode = node;

        this.firstListChild = null;

        this.lastFixedListChild = null;
        this.lastFixedListChildIndex = null;
    }

    __iterFromLastFixed = method => iterateLinkedList(
        this.lastFixedListChild || this.firstListChild,
        this.lastFixedListChildIndex || 0,
        method,
    );

    __appendAfterLastFixed = (child, childIndex) => {
        const listChild = createLinkedListElem(child);

        console.warn('append', child.node, this.lastFixedListChild);

        if(this.lastFixedListChild){
            listChild.value.appendAfter(this.lastFixedListChild.value.node);

            listChild.next = this.lastFixedListChild.next;
            this.lastFixedListChild.next = listChild;

        }else{

            if(this.firstListChild){
                listChild.value.appendBefore(this.firstListChild.value.node);
                listChild.next = this.firstListChild;
            }else{
                listChild.value.appendTo(this.parentNode);
            }

            this.firstListChild = listChild;
        }

        this.lastFixedListChild = listChild;
        this.lastFixedListChildIndex = childIndex;
    };

    __move = (oldChildIndex, newChildIndex) => {
        console.warn('move', oldChildIndex, newChildIndex);
    };

    __cropAfterLastFixed = () => {
        // console.warn('crop');
    };

    // public methods

    setChildren = (newChildren) => {
        let correctionIndex = 0;

        newChildren.forEach((newChild, newChildIndex) => {

            newChild = normalizeChild(newChild);

            if(newChild === null){
                correctionIndex ++;
                return;
            }

            newChildIndex -= correctionIndex;

            let isFinded = false;

            this.__iterFromLastFixed((oldChild, oldChildIndex) => {
                if(newChild.isSame(oldChild.value)){
                    isFinded = true;
                    this.lastFixedListChild = oldChild;
                    if(newChildIndex !== oldChildIndex){
                        this.__move(oldChildIndex, newChildIndex);
                        this.lastFixedListChildIndex = newChildIndex;
                    }else{
                        this.lastFixedListChildIndex = oldChildIndex;
                    }
                    return true;
                }
            });

            if(!isFinded){
                this.__appendAfterLastFixed(newChild, newChildIndex);
            }
        });

        this.__cropAfterLastFixed();
        this.lastFixedListChild = null;
        this.lastFixedListChildIndex = null;
    }
}