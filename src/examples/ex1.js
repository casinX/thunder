import Component from 'lib';

import styles from './ex1.scss';


const myList = new Component();
const testNode = document.getElementById('example');


const myName = 'Anton';
const mySurname = 'Casin';

window.param1 = false;
window.param2 = false;


myList

    .style(styles)

    .render(() => (
        <root>
            { window.param1 && <surname>
                <surnameTitle>Surname:</surnameTitle>
                <surnameValue>{ mySurname }</surnameValue>
            </surname> }
            <name>
                <nameTitle>Name:</nameTitle>
                <nameValue>{ myName }</nameValue>
            </name>
            { window.param2 && <surname>
                <surnameTitle>Surname:</surnameTitle>
                <surnameValue>{ mySurname }</surnameValue>
            </surname> }
        </root>
    ))

    .mount(testNode);


window.update1 = () => {
    window.param1 = true;
    window.param2 = false;
    myList.update();
};

window.update2 = () => {
    window.param1 = false;
    window.param2 = true;
    myList.update();
};