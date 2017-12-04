import events from './events';


export default class{
    constructor(node){
        this.node = node;
        this.props = {};
        this.eventHandlers = {};
    }

    // public methods
    setProps = (newProps) => {
        const oldProps = this.props;
        const node = this.node;

        // TODO optimize props cycles - delete some new props in first cycle if they are equal to old props

        Object.keys(oldProps).forEach(oldPropKey => {
            const newProp = newProps[oldPropKey];
            const oldProp = oldProps[oldPropKey];
            if (!newProp) {
                if(events[oldPropKey]){
                    node.removeEventListener(oldPropKey, oldProp);
                    this.eventHandlers[oldPropKey] = undefined;
                }else {
                    node.removeAttribute(oldPropKey);
                }
            }
        });

        Object.keys(newProps).forEach(newPropKey => {
            const oldProp = oldProps[newPropKey];
            const newProp = newProps[newPropKey];
            if (!oldProp || oldProp !== newProp) {
                if(events[newPropKey]){
                    node.addEventListener(newPropKey, newProp);
                    this.eventHandlers[newPropKey] = newProp;
                }else{
                    node.setAttribute(newPropKey, newProp);
                }
            }
        });

        this.props = newProps;
    };

    removeAllListeners = () => {
        Object.keys(this.eventHandlers).map(eventName => {
            const eventHandler = this.eventHandlers[eventName];
            if(eventHandler){
                this.node.removeEventListener(eventName, eventHandler);
            }
        });
    }
}