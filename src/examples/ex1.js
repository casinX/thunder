import Component from 'lib';

import styles from './ex1.scss';


const myList = new Component();
const testNode = document.getElementById('example');


myList

    .style(styles)

    .render(() => {

        return <wrapper>
            <name>Name: </name>
            <surname>Anton</surname>
            <age>{ 123 }</age>
            { false && 'Hello'}
        </wrapper>;
    })

    .mount(testNode);
