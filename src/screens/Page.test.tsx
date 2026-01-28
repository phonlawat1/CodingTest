
import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import Page from './page';

test('Page renders correctly', async () => {
  await ReactTestRenderer.act(() => {
    const tree = ReactTestRenderer.create(<Page />);
    expect(tree).toBeDefined();
  });
});
