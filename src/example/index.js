import Component, { Store } from 'lib';

import Button from 'components/Button';

import Profile from './Profile';

import styles from './styles.scss';



const store = new Store({ show: true, text: 'Скрыть' })

    .action('toggle', () => {
        const { show } = store.data;
        store.data.show = !show;
        store.data.text = show ? 'Показать' : 'Скрыть';
    });


export default new Component()

    .style(styles)

    .connect(store)

    .render(e => (
        <root>
            <title-h1>Git loader</title-h1>
            { store.data.show && <repos>
                <Profile key="Profile1"/>
            </repos> }
            <Button key="Button" store={store}/>
        </root>
    ));