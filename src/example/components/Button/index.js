import Component from 'lib';

import styles from './styles.scss';


export default ({ store }) => new Component()

    .style(styles)

    .connect(store)

    .render(e => <root click={store.load.do}>
      { store.load.error && 'error' }
      { store.load.wait && 'wait' }
      { store.load.ready && 'ready' }
      { store.data.repos.length === 0 && 'load'  }
    </root>)