import { Spec } from '@hayspec/spec';

const spec = new Spec();

spec.test('exposes objects', (ctx) => {
  ctx.true(true);
});

export default spec;
