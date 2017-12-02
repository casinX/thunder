import Component, { Container } from 'lib';

import styles from './ex1.scss';


let age = 0;

const clickPlus = e => {
    age++;
    myComponent.update();
};

const clickMinus = e => {
    age--;
    myComponent.update();
};

const myContainer = new Container();



const myComponent = new Component();

myComponent

    .style(styles)

    .render(() => (
        <root>
            <age>
                <title>Age:</title>
                <value>{ age }</value>
            </age>
            <plus click={clickPlus}>+</plus>
            <minus click={clickMinus}>-</minus>
        </root>
    ))

    .mount(document.getElementById('example'));
