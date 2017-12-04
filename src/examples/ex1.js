import Component, { Container } from 'lib';

import styles from './ex1.scss';



const user = new Container({
    age: 0,
});

user.action('increment').sync = function () {
    user.data.age++;
};

user.action('decrement').sync = function () {
    user.data.age--;
};




const myComponent = new Component();

const clickPlus = e => {
    user.action('increment').sync();
};

const clickMinus = e => {
    user.action('decrement').sync();
};

myComponent

    .style(styles)

    .connect(user)

    .render(() => (
        <root>
            <age>
                <title>Age:</title>
                <value>{ user.data.age }</value>
            </age>
            <plus click={clickPlus}>+</plus>
            <minus click={clickMinus}>-</minus>
        </root>
    ))

    .mount(document.getElementById('example'));
