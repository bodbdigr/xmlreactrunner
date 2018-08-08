
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
    <topbar format="simple">
      <menu_button />
    </topbar>
  </block>
`;

const xmlToComponentMap = {
  'block': BlockHandler,
  'menu_button': MenuButton,
  'topbar': TopBar,
};

const parser = new DOMParser();

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
      const Component = xmlToComponentMap[node.nodeName];
      return (
        <Component key={idx} {...this.nodeAttributesToDict(node)}>
          {this.processXml(node)}
        </Component>
      );
    });
  }
}

export default App;
