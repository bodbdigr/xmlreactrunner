import * as React from 'react';

// TODO: Could be React.SFC but for the moment it doesn't support
// Array return values supported in react 16 for typescript
/// ref issue: https://github.com/DefinitelyTyped/DefinitelyTyped/pull/25349
export class BlockHandler extends React.Component<{}, null> {
  render() {
    // tslint:disable-next-line
    console.log('some block logging added');
    return this.props.children;
  }
}
