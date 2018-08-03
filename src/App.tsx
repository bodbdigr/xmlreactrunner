
import * as React from 'react';

const TopBar = ({ format, children }: {format: string, children: React.Component[]}) => {
    return (
      <div>
      <div>This is Top bar {format}</div>
      {children}
      </div>
    )
};

const MenuButton = () => {
  return <div>I'm the menu button for the god sake, stop it</div>
};

const xml = `
  <topbar format="simple">
    <menu_button />
  </topbar>
`;

const xmlToComponentMap = {
  'menu_button': MenuButton,
  'topbar': TopBar
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
    return Array.from(doc.children).map(node => {
      const Component = xmlToComponentMap[node.nodeName];
      return (
        <Component key={1} {...this.nodeAttributesToDict(node)}>
          {this.processXml(node)}
        </Component>
      );
    });
  }
}

export default App;
