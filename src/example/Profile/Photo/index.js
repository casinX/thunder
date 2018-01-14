import Component from 'lib';

import styles from './styles.scss';


export default () => new Component()

    .style(styles)

    .render(e => <root/>)

    .beforeUnmount(() => console.warn('before unmount photo'))

    .afterUnmount(() => console.warn('after unmount photo'))