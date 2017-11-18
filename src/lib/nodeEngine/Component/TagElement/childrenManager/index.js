import normalizeChild from './normalizeChild.js';


export default class{
    constructor(node){
        this.node = node;
        this.children = [];
    }

    setChildren = (newChildren) => {
        const node = this.node;

        while (node.firstChild) {
            node.removeChild(node.firstChild);
        }

        newChildren.forEach((newChild, newChildIndex) => {
            newChild = normalizeChild(newChild);

            if(newChild === null){
                return;
            }

            this.node.append(newChild.getNode())
        });
    }
}