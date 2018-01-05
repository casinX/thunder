export default class {
    constructor(node, type) {
        this.node = node;
        this.type = type;
    }

    __unmount = () => this.node.remove();

    __fakeUnmount = () => this.node.styles.display = 'none';

    __appendBefore = node => {
        const { parentNode } = node;
        node.parentNode.insertBefore(this.node, node);
    };

    __appendAfter = node => node.parentNode.insertBefore(this.node, node.nextSibling);

    __appendTo = node => node.append(this.node);

    // public methods
    isSame = anotherNode => this.node.isSameNode(anotherNode.node);

    unmount = this.__unmount;

    fakeUnmount = this.__fakeUnmount;

    appendBefore = this.__appendBefore;

    appendAfter = this.__appendAfter;

    appendTo = this.__appendTo;

    getNode = () => this.node;
}
