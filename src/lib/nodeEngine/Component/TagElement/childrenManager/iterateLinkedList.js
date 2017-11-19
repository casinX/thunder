export default (elemFrom, indexFrom, callback) => {
    let tmpElem = elemFrom;
    let index = indexFrom;

    while (tmpElem) {
        const needStop = callback(tmpElem, index);
        if(needStop){
            return;
        }
        tmpElem = tmpElem.next;
        index ++;
    }
};