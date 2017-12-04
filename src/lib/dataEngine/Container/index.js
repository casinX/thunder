import syncDecorator from './utils/syncDecorator';


export default class {
    constructor(data){
        this.data = data || null;
        this.error = null;

        this.isLoading = false;
        this.hasData = Boolean(data);
        this.isError = false;

        this.actions = {};

        this.__bufferActionName = null;

        this.actionContext = {
            isLoading: this.isLoading,
            hasData: this.hasData,
            isError: this.isError,
            actions: this.actions,
            data: this.data,
            error: this.error,
        };

        this.updateMethods = [];

        this.__syncCallbackBefore = () => {};

        this.__syncCallbackAfter = () => this.updateMethods.forEach(updateMethod => updateMethod());
    }

    __subscribeComponent = updateMethod => this.updateMethods.push(updateMethod);

    __unsubscribeComponent = updateMethod => {

        this.updateMethods = this.updateMethods.filter(currentUpdateMethod => currentUpdateMethod !== updateMethod);
    };

    // public methods
    action (actionName) {
        this.__bufferActionName = actionName;
        if(!this.actions[actionName]){
            this.actions[actionName] = {
                sync: null,
                async: null,
            }
        }
        return this;
    }

    get sync () {
        return this.actions[this.__bufferActionName].sync
    }

    set sync (action) {
        this.actions[this.__bufferActionName].sync = syncDecorator(
            this.__syncCallbackBefore,
            action.bind(this.actionContext),
            this.__syncCallbackAfter,
        );
    }

    get async () {
        return this.actions[this.__bufferActionName].async;
    }

    set async (action) {
        this.actions[this.__bufferActionName].async = action;
    }
}