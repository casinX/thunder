export default (callbackBefore, asyncAction, callbackAfter, state) => async (...args) => {
    callbackBefore(state);
    const promise = asyncAction(...args);
    const result = await promise;
    callbackAfter(state, result);
    return promise;
}