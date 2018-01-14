export default (callbackBefore, syncAction, callbackAfter) => (...args) => {
    callbackBefore();
    const result = syncAction(...args);
    callbackAfter();
    return result;
};