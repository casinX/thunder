import Component from 'lib';

import styles from './styles.scss';


export default ({ store }) => new Component()

    .style(styles)

    .connect(store)

    .render(e => <root click={store.load.do}>
      { store.load.error && 'Ошибка' }
      { store.load.wait && 'Загрузка' }
      { store.load.ready && 'Готово' }
      { !store.load.wait && store.data.repos.length === 0 && 'Загрузить'  }
    </root>)