import Component, { Store, request } from 'lib';

import Button from 'components/Button';

import styles from './styles.scss';


const store = new Store({ repos: [] })

    .async('load', async () => {
        const { response } = await request('https://api.github.com/users/casinx/repos', 'GET');
        store.data.repos = response.data;
    });

window.STORE = store;
export default new Component()

    .style(styles)

    .connect(store)

    .render(e => (
        <root>
            <title-h1>Git loader</title-h1>
            <repos>
              { store.data.repos.map(repo => <div
                key={repo.id}
              >
                { repo.name }
              </div>) }
            </repos>
            <Button key="Button" store={store}/>
        </root>
    ))