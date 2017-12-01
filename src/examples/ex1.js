import Component from 'lib';

// import styled from 'styled-elements';
// const Header = styled.h2`
//   color: red;
// `;
// document.body.appendChild(Header('My header!'));


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
