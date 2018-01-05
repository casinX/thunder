import Component from 'lib';

import styles from './styles.scss';


export default ({ store, status }, children) => new Component()

    .style(styles)

    .connect(store)

    .beforeMount(() => console.warn('before mount'))

    .afterMount(() => console.warn('after mount'))

    .render(e => {
        console.warn('render');
        return <root>
            {status.wait && 'Ажидайти'}
            {status.ready && 'Сделялъ'}
            {status.error && 'Ошибочка'}
        </root>
    })

    .beforeUnmount(() => console.warn('before unmount'))

    .afterUnmount(() => console.warn('after unmount'))