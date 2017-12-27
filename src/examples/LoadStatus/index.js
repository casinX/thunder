import Component from 'lib';

import styles from './styles.scss';


export default new Component()

    .style(styles)

    .render(() => (
        <root>
            Hello!
        </root>
    ));