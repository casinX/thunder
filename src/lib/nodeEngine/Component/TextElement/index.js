export default class {
    constructor (text) {
        this.text = text;
        this.node = document.createTextNode('text');
    }

    // public methods
    isSame = (anotherNode) => this.node.isSameNode(anotherNode);

    getNode = () => this.node;

    unmount = () => this.node.remove();
}