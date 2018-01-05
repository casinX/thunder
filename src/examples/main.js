import Component from 'lib';

import LoadStatus from './LoadStatus';
import userStore from './store';
import styles from './main.scss';


export default new Component()

    .style(styles)

    .connect(userStore)

    .render(e => (
        <root>
            <age>
                <title mode="red">Age:</title>
                <value>{ userStore.data.age }</value>
                { userStore.data.repos.map(repo => <repo key={repo.id}>{ repo.name }</repo>) }
            </age>
            <plus click={userStore.increment}>+</plus>
            <minus click={userStore.decrement}>-</minus>
            <load click={userStore.loadGit.do}>Загрузить</load>
            { userStore.data.age !== 5 && userStore.data.age !== 3 && <LoadStatus key="LoadStatus" store={userStore} status={userStore.loadGit}/> }
        </root>
    ));