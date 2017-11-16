import TagElement from 'lib/nodeEngine/Component/TagElement';
import TextElement from 'lib/nodeEngine/Component/TextElement';

export default child => {
    if (typeof child === 'number'){
        child = child.toString();
    }

    if (!(typeof child === 'string' || child instanceof TagElement || child instanceof TextElement)) {
        child = null;
    }

    if (typeof child === 'string' ){
        child = new TextElement(child);
    }

    return child;
};