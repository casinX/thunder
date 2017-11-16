export default class{
    constructor(node){
        this.node = node;
        this.props = {};
    }

    // public methods
    setProps = (newProps) => {
        const oldProps = this.props;
        const node = this.node;

        Object.keys(oldProps).forEach(oldPropKey => {
            const newProp = newProps[oldPropKey];
            if (!newProp) { node.removeAttribute(oldPropKey); }
        });

        Object.keys(newProps).forEach(newPropKey => {
            const oldProp = oldProps[newPropKey];
            const newProp = newProps[newPropKey];
            if (!oldProp || oldProp !== newProp) { node.setAttribute(newPropKey, newProp); }
        });

        this.props = newProps;
    };
}