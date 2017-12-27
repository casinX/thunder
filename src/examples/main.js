import Component from 'lib';

import LoadStatus from './LoadStatus';
import userStore from './store';
import styles from './main.scss';


export default new Component()

    .style(styles)

    .connect(userStore)

    .render(() => (
        <root>
            <age>
                <title mode="red">Age:</title>
                <value>{ userStore.data.age }</value>
            </age>
            <LoadStatus key="LoadStatus"/>
            <plus click={userStore.increment}>+</plus>
            <minus click={userStore.decrement}>-</minus>
        </root>
    ));