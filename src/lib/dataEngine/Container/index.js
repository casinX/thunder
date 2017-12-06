import axios from 'axios';

import syncDecorator from './utils/syncDecorator';
import asyncDecorator from './utils/asyncDecorator';
import excludedActionsNames from './excludedActionsNames';


export default class {
    constructor(data, config={}){
        this.data = data || null;
        this.error = config.error || null;

        this.state = config.state || {
            isLoading: false,
            isLoaded: false,
            isError: false,
        };

        this.request = axios;

        this.__updateMethods = [];

        this.__syncCallbackBefore = () => {};
        this.__syncCallbackAfter = () => this.__updateAllComponents();

        this.__asyncCallbackBefore = () => {
            this.state.isLoading = true;
            this.state.isError = false;
            this.__updateAllComponents();
        };

        this.__asyncCallbackAfter = (error) => {
            const isError = typeof error === 'object';
            this.state.isLoading = false;
            this.state.isError = isError;
            this.state.isLoaded = !isError;
            this.error = isError ? error : null;
            this.__updateAllComponents();
        };
    }

    __updateAllComponents = () => this.__updateMethods.forEach(updateMethod => updateMethod());

    __subscribeComponent = updateMethod => this.__updateMethods.push(updateMethod);

    __unSubscribeComponent = updateMethod => this.__updateMethods = this.__updateMethods.filter(currentUpdateMethod => currentUpdateMethod !== updateMethod);

    // public methods
    action (actionName, actionMethod, isAsync) {
        if(excludedActionsNames[actionName]){
            throw new Error('Wrong action name');
        }
        this[actionName] = isAsync ?
            asyncDecorator(
                this.__asyncCallbackBefore,
                actionMethod.bind(this),
                this.__asyncCallbackAfter,
            ) :
            syncDecorator(
            this.__syncCallbackBefore,
            actionMethod.bind(this),
            this.__syncCallbackAfter,
        );

        return this;
    }
}