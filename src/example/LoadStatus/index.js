import Component from 'lib';

import styles from './styles.scss';


export default ({ store, status }, children) => new Component()

    .style(styles)

    .connect(store)

    .render(e => {
        return <root>
            {status.wait && 'Ажидайти'}
            {status.ready && 'Сделялъ'}
            {status.error && 'Ошибочка'}
        </root>
    })