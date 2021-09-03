import { Spec } from '@hayspec/spec';
import { ErrorCode } from '../../config/types';
import { Context } from '../../context';
import { generateAuthToken } from '../../lib/jwt';
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


spec.test('throws unauthenticated access', async (ctx) => {
  const res = await ctx.request({
    url: '/contracts/1/sign/provider',
    method: 'post',
    headers: {
      'Authorization': '',
    },
    data: {
      hash: 'test',
      signature: 'test'
    },
  });

  ctx.true(res.data.errors.find((e) => e.code == ErrorCode.UNAUTHENTICATED_ACCESS));
});

spec.test('throws invalid contract id', async (ctx) => {
  const context = ctx.get('context');
  
  const auth = generateAuthToken('test', '2', context);
  const res = await ctx.request({
    url: '/contracts/1/sign/provider',
    method: 'post',
    headers: {
      'Authorization': auth,
    },
    data: {
      hash: 'test',
      signature: 'test'
    },
  });

  ctx.true(res.data.errors.find((e) => e.code == ErrorCode.INVALID_CONTRACT));
});

spec.test('Creates contract provider signature', async (ctx) => {
  const context = ctx.get('context');
  
  const auth = generateAuthToken('0xA257f4eF17c81Eb4d15A741A8D09e1EBb3953202', '1', context);
  const res = await ctx.request({
    url: '/contracts/1/sign/provider',
    method: 'post',
    headers: {
      'Authorization': auth,
    },
    data: {
      hash: '0x9c22ff5f21f0b81b113e63f7db6da94fedef11b2119b4088b89664fb9a3cb658', // hashed 'test'
      signature: '0x4514fb7738f17164edcb637f52aa670d476a431c30daa92538e674afea22647d1095bb7443605e487e5b0dbbfefd5d81408035774d4bd40e377f608a07019c191b'
    },
  });

  ctx.is(res.data.data.contractId, '1');
});

export default spec;
