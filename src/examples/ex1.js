import Component from 'lib';

import userStore from './store';
import styles from './ex1.scss';


new Component()

    .style(styles)

    .connect(userStore)

    .render(() => (
        <root>
            <age>
                <title mode="red">Age:</title>
                <value>{ userStore.data.age }</value>
                { userStore.loadGit.wait && 'Loading' }
                { userStore.loadGit.ready && 'Loaded' }
                { userStore.loadGit.error && 'Error' }
                { userStore.loadGit.ready && userStore.data.repos.length }
            </age>
            <plus click={userStore.increment}>+</plus>
            <minus click={userStore.decrement}>-</minus>
            <load click={userStore.loadGit.do}>load</load>
        </root>
    ))

    .mount(document.getElementById('example'));