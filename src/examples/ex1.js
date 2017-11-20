import Component from 'lib';

import styles from './ex1.scss';


const myList = new Component();
const testNode = document.getElementById('example');


const myName = 'Anton';
const mySurname = 'Casin';

window.showSurname = false;

myList

    .style(styles)

    .render(() => (
        <root>
            <name>
                <nameTitle>Name:</nameTitle>
                <nameValue>{ myName }</nameValue>
            </name>
            { window.showSurname && <surname>
                <surnameTitle>Surname:</surnameTitle>
                <surnameValue>{ mySurname }</surnameValue>
            </surname> }
        </root>
    ))

    .mount(testNode);


window.update = () => {
    window.showSurname = true;
    myList.update();
};

window.update2 = () => {
    window.showSurname = false;
    myList.update();
};