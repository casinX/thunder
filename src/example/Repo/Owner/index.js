import Component from 'lib';

import styles from './styles.scss';


export default ({ store, owner }) => new Component()

    .style(styles)

    .connect(store)

    .beforeMount(() => console.error('B 1'))

    .afterMount(() => console.error('B 2'))

    .render(e => <root>
        { owner.login }
    </root>)

    .beforeUnmount(() => console.error('B 3'))

    .afterUnmount(() => console.error('B 4'))