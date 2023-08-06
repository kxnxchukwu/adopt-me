import { expect, test } from 'vitest';
import { render } from '@testing-library/react';
import { StaticRouter } from 'react-router-dom/server';
import Pet from '../Pet';

test('displays a default thumbnail', async () => {
  const pet = render(
    <StaticRouter>
      <Pet />
    </StaticRouter>
  );

  const petThumbnail = await pet.findByTestId('thumbnail');

  expect(petThumbnail.src).toContain('none.jpg');

  pet.unmount();
});

test('displays a non-default thumbnail', async () => {
  const pet = render(
    <StaticRouter>
      <Pet images={['first.jpg', 'second.jpg', 'third.jpg']} />
    </StaticRouter>
  );

  const petThumbnail = await pet.findByTestId('thumbnail');

  expect(petThumbnail.src).toContain('first.jpg');

  pet.unmount();
});
