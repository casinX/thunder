import Component, { Store } from 'lib';

import Button from 'components/Button';

import Photo from './Photo';

import styles from './styles.scss';


export default () => {
    const store = new Store({ show: true, text: 'Скрыть' })

        .action('toggle', () => {
            const { show } = store.data;
            store.data.show = !show;
            store.data.text = show ? 'Показать' : 'Скрыть';
        });


    return new Component()

        .style(styles)

        .connect(store)

        .render(e => <root>
            { store.data.show && <Photo key="Photo"/> }
            <Button key="Button" store={store}/>
        </root>)
}