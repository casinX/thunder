export default (type) => {
    const specifies = {
        'svg' : 'http://www.w3.org/2000/svg',
        'g' : 'http://www.w3.org/2000/svg',
        'circle' : 'http://www.w3.org/2000/svg'
    };
    const spec = specifies[type];
    return spec ?
        document.createElementNS(spec, type) :
        document.createElement(type);
}