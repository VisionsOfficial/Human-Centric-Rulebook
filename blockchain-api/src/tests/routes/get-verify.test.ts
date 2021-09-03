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

spec.test('gets contract verify', async (ctx) => {
  const context = ctx.get('context');
  const contract = await new Contract({}, { context }).fake().upsert();

  const res = await ctx.request({
    url: `/contracts/${contract.contractId}/verify`,
    method: 'get',
  });

  ctx.is(res.status, 200);
});

export default spec;
