export default class{
    constructor (node, type) {
        this.node = node;
        this.type = type;
    }

    // public methods

    isSame = anotherNode => this.node.isSameNode(anotherNode.node);

    unmount = () => this.node.remove();

    fakeUnmount = () => this.node.styles.display = 'none';

    appendBefore = node => {
        const { parentNode } = node;
        node.parentNode.insertBefore(this.node, node);
    };

    appendAfter = node => {
        node.parentNode.insertBefore(this.node, node.nextSibling);
    };

    appendTo = node => {
        node.append(this.node);
    };
}