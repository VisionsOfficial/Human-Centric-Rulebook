import { Spec } from '@hayspec/spec';
import { Context } from '../../context';
import { Contract } from '../../models/contract';
import { createContextHelper, closeContextMongoHelper, cleenupContextMongoHelper } from '../helpers/context';
import { startHttpServer, stopHttpServer } from '../helpers/http';

const spec = new Spec<{
  context: Context;
}>();

spec.before(createContextHelper);
spec.beforeEach(startHttpServer);
spec.afterEach(stopHttpServer);
spec.after(closeContextMongoHelper);
spec.afterEach(cleenupContextMongoHelper);

spec.test('gets contracts', async (ctx) => {
  const context = ctx.get('context');
  await new Contract({}, { context }).fake().upsert();
  
  const res = await ctx.request({
    url: '/contracts',
    method: 'get',
  });

  ctx.is(res.data.data.length, 1);
});

export default spec;
