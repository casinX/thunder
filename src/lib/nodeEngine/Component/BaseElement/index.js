export default class{
    constructor (node, type) {
        this.node = node;
        this.type = type;
    }

    // public methods

    isSame = anotherNode => this.node.isSameNode(anotherNode);

    unmount = () => this.node.remove();

    fakeUnmount = () => this.node.styles.display = 'none';

    appendBefore = node => {
        const { parentNode } = node;
        parentNode.insertBefore(this.node, node);
    };

    appendTo = node => {
        node.append(this.node);
    };

    getNode = () => this.node;

    getType = () => this.type;
}