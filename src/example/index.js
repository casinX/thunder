import Component, { Container } from 'lib';

import LoadStatus from './LoadStatus';
import Repo from './Repo';
import store from './store';
import styles from './styles.scss';



const localStore = new Container({ showRepos: true })

    .action('toggle', () => {
        localStore.data.showRepos = !localStore.data.showRepos;
    });


export default new Component()

    .style(styles)

    .connect(store, localStore)

    .render(e => (
        <root>
            <title-h1>
                Git loader
            </title-h1>
            { localStore.data.showRepos && <repos>
                { store.data.repos.slice(0, 1).map(repo => <Repo key={repo.id} repo={repo} store={store}/>) }
            </repos> }
            <load click={store.loadGit.do}>Загрузить</load>
            <load key="hide" click={localStore.toggle}>
                { localStore.data.showRepos ? 'Скрыть' : 'Показать' }
            </load>
            <LoadStatus key="LoadStatus" store={store} status={store.loadGit}/>
        </root>
    ));