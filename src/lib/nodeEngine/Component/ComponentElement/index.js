export default class{
    constructor (component) {
        this.component = component;
        this.isRendered = false;
    }

    tryRender = () => {
        if(this.isRendered){
            return;
        }
        this.isRendered = true;
        this.component.update();
    };

    getRootElement = () => this.component.elements.root;
}