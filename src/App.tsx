
import * as React from 'react';
import { BlockHandler } from './nodeHandlers/block';

const TopBar:React.SFC<{format: string}> = ({ format, children })=> {
    return (
      <div>
      <div>This is Top bar {format}</div>
      {children}
      </div>
    )
};

const MenuButton:React.SFC = () => {
  return <div>This is the menu button</div>
};

const xml = `
  <block name="Some Page">
    <h2>Sirui T 1205X</h2>
    <topbar format="simple">
      <menu_button />
      <span>test <sub>bla</sub></span>
    </topbar>
  </block>
`;

const xmlToComponentMap = {
  'block': BlockHandler,
  'menu_button': MenuButton,
  'topbar': TopBar,
};

const parser = new DOMParser();

const validTags = `a abbr address area article aside audio b base bdi bdo big
blockquote body br button canvas caption cite code col colgroup data datalist
dd del details dfn dialog div dl dt em embed fieldset figcaption figure footer
form h1 h2 h3 h4 h5 h6 head header hr html i iframe img input ins kbd keygen
label legend li link main map mark menu menuitem meta meter nav noscript object
ol optgroup option output p param picture pre progress q rp rt ruby s samp
script section select small source span strong style sub summary sup table tbody
td textarea tfoot th thead time title tr track u ul var video wbr`.split(' ');

class App extends React.Component<{}, {}> {
  public render() {
    const xmlDoc = parser.parseFromString(xml, 'text/xml');
    return this.processXml(xmlDoc);
  }

  private nodeAttributesToDict(node: Element) {
    return Array.from(node.attributes).reduce((acc, el) => {
      acc[el.name] = el.nodeValue;
      return acc;
    }, {});
  }

  private processXml(doc: Document | Element) {
    return Array.from(doc.children).map((node, idx) => {
      const Component = validTags.indexOf(node.nodeName) !== -1 &&
                          node.nodeName
                          ||
                          xmlToComponentMap[node.nodeName];

      if (node.nodeType === 3) {
        return node.nodeValue;
      }

      console.log('component is', Component, node.textContent) //tslint:disable-line

      return (
        <Component key={idx} {...this.nodeAttributesToDict(node)}>
          {
            node.children.length ?
            this.processXml(node) :
            node.textContent
          }
        </Component>
      );
    });
  }
}

export default App;
