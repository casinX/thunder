import Component from 'lib';

import styles from './styles.scss';


export default ({ store }) => new Component()

    .style(styles)

    .connect(store)

    .render(e => <root click={store.toggle}>
        { store.data.text }
    </root>)