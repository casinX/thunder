import Component from 'lib';

import store from './store';
import styles from './ex1.scss';


new Component()

    .style(styles)

    .connect(store)

    .render(() => (
        <root>
            <age>
                <title>Age:</title>
                <value>{ store.data.age }</value>
                { store.state.isLoading && 'Loading' }
                { store.state.isLoaded && 'Loaded' }
                { store.state.isError && 'Error' }
                { store.state.isLoaded && store.data.repos.length }
            </age>
            <plus click={store.increment}>+</plus>
            <minus click={store.decrement}>-</minus>
            <load click={store.loadGit}>load</load>
        </root>
    ))

    .mount(document.getElementById('example'));
