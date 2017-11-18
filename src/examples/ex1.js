import Component from 'lib';

import styles from './ex1.scss';


const myList = new Component();
const testNode = document.getElementById('example');

myList

    .style(styles)

    .render(() => (
        <root>
            <nameWrapper>
                <nameTitle>Name:</nameTitle>
                <nameValue>Anton</nameValue>
            </nameWrapper>
            <age>{ 123 }</age>
            { false && 'Hello'}
        </root>
    ))

    .mount(testNode);
