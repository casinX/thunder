export default class{
    constructor (node, key, type) {
        this.node = node;
        this.key = key;
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

    getKey = () => this.key;

    getNode = () => this.node;

    getType = () => this.type;
}