import Component from 'lib';

import styles from './styles.scss';



export default ({ title, desc }, children) => new Component()

  .style(styles)

  .render(e => {
    return <root>
      <title>{ title }</title>
      <description>{ desc }</description>
      <wrapper>{ children }</wrapper>
    </root>
  })