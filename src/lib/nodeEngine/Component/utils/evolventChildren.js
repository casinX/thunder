export default children => {
    let newChildren = [];

    children.forEach(child => {
        if(Array.isArray(child)){
            newChildren = newChildren.concat(child);
        }else{
            newChildren.push(child);
        }
    });

    return newChildren;
};