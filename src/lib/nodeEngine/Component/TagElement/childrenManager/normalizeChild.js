import TextElement from 'lib/nodeEngine/Component/TextElement';


export default child => {
    if (typeof child === 'number'){
        child = child.toString();
    }

    if (typeof child === 'string' ){
        child = new TextElement(child);
    }

    return child || null;
};