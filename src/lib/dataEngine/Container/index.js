import axios from 'axios';

import syncDecorator from './utils/syncDecorator';
import asyncDecorator from './utils/asyncDecorator';
import excludedActionsNames from './excludedActionsNames';


export default class {
    constructor(data){
        this.data = data || null;

        this.axios = axios;

        this.__updateMethods = [];

        this.__syncCallbackBefore = () => {};
        this.__syncCallbackAfter = () => this.__updateAllComponents();

        this.__asyncCallbackBefore = (state) => {
            state.wait = true;
            state.ready = false;
            state.error = null;
            this.__updateAllComponents();
        };

        this.__asyncCallbackAfter = (state, error) => {
            state.wait = false;
            state.error = error;
            state.ready = !error;
            this.__updateAllComponents();
        };
    }

    __updateAllComponents = () => this.__updateMethods.forEach(updateMethod => updateMethod());

    __subscribeComponent = updateMethod => this.__updateMethods.push(updateMethod);

    __unSubscribeComponent = updateMethod => this.__updateMethods = this.__updateMethods.filter(currentUpdateMethod => currentUpdateMethod !== updateMethod);

    __validateActionName = name => {
        if(excludedActionsNames[name]){
            throw new Error('Wrong action name');
        }
        return true;
    };

    // public methods
    action (actionName, actionMethod) {
        this.__validateActionName(actionName);

        this[actionName] = syncDecorator(
            this.__syncCallbackBefore,
            actionMethod.bind(this),
            this.__syncCallbackAfter,
        );

        return this;
    }

    async (actionName, actionMethod) {
        this.__validateActionName(actionName);

        this[actionName] = {
            ready: false,
            wait: false,
            error: null,
        };

        this[actionName].do = asyncDecorator(
            this.__asyncCallbackBefore,
            actionMethod.bind(this),
            this.__asyncCallbackAfter,
            this[actionName],
        );

        return this;
    }

}