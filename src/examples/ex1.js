import Component from 'lib';

import styles from './ex1.scss';


const myList = new Component();

const mySurname = 'Casin';

myList

    .style(styles)

    .render(() => (
        <root>
            <surname>
                <title>Surname:</title>
                <value>{ mySurname }</value>
            </surname>
        </root>
    ))

    .mount(document.getElementById('example'));

