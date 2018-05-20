import Component, { Store, request } from 'lib';

import Button from 'components/Button';
import Container from 'components/Container';

import styles from './styles.scss';


const store = new Store({ repos: [] })

  .async('load', async () => {
    const { response } = await request('https://api.github.com/users/casinx/repos', 'GET');
    store.data.repos = response.data;
  });


const block2Store = new Store({
    isHover: false,
    isActive: false
  })

  .action('hover', () => {
    block2Store.data.isHover = true;
  })

  .action('unHover', () => {
    block2Store.data.isHover = false;
  })

  .action('active', () => {
    block2Store.data.isActive = true;
  })

  .action('unActive', () => {
    block2Store.data.isActive = false;
  });


const block3Store = new Store({ keyCode: '' })

  .action('keyPress', keyCode => {
    block3Store.data.keyCode = keyCode;
  });


const block4Store = new Store({ count: 0 })

  .action('addElement', () => {
    block4Store.data.count ++;
  })

  .action('removeElement', () => {
    block4Store.data.count --;
    if(block4Store.data.count < 0){
      block4Store.data.count = 0;
    }
  });



const block5Store = new Store({ url: '' })

  .action('goToLink', url => {
    block5Store.data.url = url;
    history.pushState({}, '', url);
  });


const block7Store = new Store({ text: '' })

  .action('input', e => {
    console.warn(e);
  });



const block1List = [];

for (let i = 0; i < 50; i++){
  block1List.push(`Элемент номер ${i + 1}`);
}




// window.STORE = store;
export default new Component()

    .style(styles)

    .connect(store, block2Store, block3Store, block4Store, block5Store, block7Store)

    .beforeMount(() => {
      window.addEventListener('keypress', e => {
        block3Store.keyPress(e.key);
      })
    })

    .render(e => {

      const block4List = [];

      for (let i = 0; i < block4Store.data.count; i++){
        block4List.push(`Динамический элемент ${i + 1}`);
      }

      return <root>
        <title-h1>Тестовое приложение</title-h1>
        <Container key="block1" title="Блок 1" desc="Рендер списков">
          <block1>
            {block1List.map((text, index) => <div key={index}>
              {text}
            </div>)}
          </block1>
        </Container>

        <Container key="block2" title="Блок 2" desc="События мыши">
          <block2>
            <button key="button1" mousedown={block2Store.active} mouseup={block2Store.unActive}>
              {block2Store.data.isActive ? 'Готово' : 'Нажми'}
            </button>
            <button key="button2" mouseenter={block2Store.hover} mouseleave={block2Store.unHover}>
              {block2Store.data.isHover ? 'Готово' : 'Наведи'}
            </button>
          </block2>
        </Container>


        <Container key="block3" title="Блок 3" desc="События клавиатуры">
          <block3>
            {block3Store.data.keyCode === '' ? 'Нажмите клавишу' : `Была нажата клавиша ${block3Store.data.keyCode}`}
          </block3>
        </Container>


        <Container key="block4" title="Блок 4" desc="Добавление и удаление элементов">
          <block4>
            {block4List.map((text, index) => <block4ListItem key={index}>
              {text}
            </block4ListItem>)}
            <br/>
            <button key="button3" click={block4Store.addElement}>
              Добавить
            </button>
            <button key="button4" click={block4Store.removeElement}>
              Удалить
            </button>
          </block4>
        </Container>

        <Container key="block5" title="Блок 5" desc="Виртуальные переходы по ссылкам">
          <block5>
            <span>{ block5Store.data.url }</span>
            <br/>
            <link key="link1" click={() => block5Store.goToLink('/virtual/link/1')}>
              Виртуальная ссылка 1
            </link>
            <br/>
            <link key="link2" click={() => block5Store.goToLink('/virtual/link/2')}>
              Виртуальная ссылка 2
            </link>
          </block5>
        </Container>

        <Container key="block6" title="Блок 6" desc="Загрузка данных с сервера без перезагрузки страницы">
          <block6>
            <repos>
              {store.data.repos.map(repo => <div
                key={repo.id}
              >
                {repo.name}
              </div>)}
            </repos>
            <Button key="Button" store={store}/>
          </block6>
        </Container>

        <Container key="block7" title="Блок 7" desc="Ввод текста">
          <block7>
            <text-textarea input={block7Store.input}>kk</text-textarea>
          </block7>
        </Container>
      </root>
    })