import Component from 'lib';

import styles from './ex1.scss';


const myList = new Component();
const testNode = document.getElementById('example');

myList

    .style(styles)

    .render(() => (
        <root>
            <wrapper key="1">
                <nameTitle>Name:</nameTitle>
                <nameValue>Anton</nameValue>
            </wrapper>

            <wrapper key="2">{ 123 }</wrapper>

            <wrapper key="3">
                <button-button key="plus">+</button-button>
                <button-button key="minus">-</button-button>
            </wrapper>
        </root>
    ))

    .mount(testNode);
