export default (callbackBefore, asyncAction, callbackAfter) => async (...args) => {
    callbackBefore();
    const result = await asyncAction(...args);
    callbackAfter(result);
    return result;
}