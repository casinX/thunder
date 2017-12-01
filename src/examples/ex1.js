import Component from 'lib';

// import styled from 'styled-elements';
// const Header = styled.h2`
//   color: red;
// `;
// document.body.appendChild(Header('My header!'));


import styles from './ex1.scss';


const clickHandler = e => {
    console.warn('Click!');
};


new Component()

    .style(styles)

    .render(() => (
        <root>
            <surname>
                <title>Surname:</title>
                <value click={clickHandler}>Casin</value>
            </surname>
        </root>
    ))

    .mount(document.getElementById('example'));

