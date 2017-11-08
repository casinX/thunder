import Component from 'lib';

import styles from './ex1.scss';


const myList = new Component();

myList.stylize(styles);

myList.onRender(() => {
    return <wrapper>
        <name>Name: </name>
        <a-surname>Anton</a-surname>
        <age>{ 123 }</age>
        { false && 'Hello'}
    </wrapper>;
});


const testNode = document.getElementById('example');
myList.mountTo(testNode);
