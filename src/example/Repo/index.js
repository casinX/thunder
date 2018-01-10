import Component, { Container } from 'lib';

import Owner from './Owner';
import styles from './styles.scss';


export default ({ repo, store }) => {

    const localStore = new Container({ showOwner: true })

        .action('toggle', () => {
            localStore.data.showOwner = !localStore.data.showOwner;
        });

    return new Component()

        .style(styles)

        .connect(store, localStore)

        .beforeMount(() => console.warn('A 1'))

        .afterMount(() => console.warn('A 2'))

        .render(e => <root>
            <name>{ repo.name }</name>
            { localStore.data.showOwner && <Owner key="Owner" store={store} owner={repo.owner} /> }
            <toggle-button mode={!localStore.data.showOwner && 'black'} click={localStore.toggle}>
                { localStore.data.showOwner ? 'Скрыть' : 'Показать' }
            </toggle-button>
        </root>)

        .beforeUnmount(() => console.warn('A 3'))

        .afterUnmount(() => console.warn('A 4'))
}