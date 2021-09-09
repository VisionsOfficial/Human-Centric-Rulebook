import { Spec } from '@hayspec/spec';
import { ErrorCode } from '../../config/types';
import { Context } from '../../context';
import { generateAuthToken } from '../../lib/jwt';
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


spec.test('throws unauthenticated access', async (ctx) => {
  
  const res = await ctx.request({
    url: '/contracts/1/sign/client',
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
    url: '/contracts/1/sign/client',
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

spec.test('Creates contract client signature', async (ctx) => {
  const context = ctx.get('context');
  
  const auth = generateAuthToken('0xF9196F9f176fd2eF9243E8960817d5FbE63D79aa', '1', context);
  const res = await ctx.request({
    url: '/contracts/1/sign/client',
    method: 'post',
    headers: {
      'Authorization': auth,
    },
    data: {
      hash: '0x9c22ff5f21f0b81b113e63f7db6da94fedef11b2119b4088b89664fb9a3cb658', // hashed 'test'
      signature: '0x2ae01d07ac03ca7c2f5087e61f8478d8784707c22f04b923144ce8f9b0f7cc421662b374e248d10a44bd36a23b5c6c2e05f233e5909b5072ec3e13b8d34b055e1c'
    },
  });

  ctx.is(res.data.data.contractId, '1');
});

spec.test('Creates contract client signature on already existing contract', async (ctx) => {
  const context = ctx.get('context');

  await new Contract({}, { context }).populate({
    contractId: '1',
    hash: '0x9c22ff5f21f0b81b113e63f7db6da94fedef11b2119b4088b89664fb9a3cb658',
    providerSignature: '0x4514fb7738f17164edcb637f52aa670d476a431c30daa92538e674afea22647d1095bb7443605e487e5b0dbbfefd5d81408035774d4bd40e377f608a07019c191b'
  }).upsert();
  
  const auth = generateAuthToken('0xF9196F9f176fd2eF9243E8960817d5FbE63D79aa', '1', context);
  const res = await ctx.request({
    url: '/contracts/1/sign/client',
    method: 'post',
    headers: {
      'Authorization': auth,
    },
    data: {
      hash: '0x9c22ff5f21f0b81b113e63f7db6da94fedef11b2119b4088b89664fb9a3cb658', // hashed 'test'
      signature: '0x2ae01d07ac03ca7c2f5087e61f8478d8784707c22f04b923144ce8f9b0f7cc421662b374e248d10a44bd36a23b5c6c2e05f233e5909b5072ec3e13b8d34b055e1c'
    },
  });

  ctx.is(res.data.data.contractId, '1');
  ctx.is(res.data.data.providerSignature, '0x4514fb7738f17164edcb637f52aa670d476a431c30daa92538e674afea22647d1095bb7443605e487e5b0dbbfefd5d81408035774d4bd40e377f608a07019c191b');
  ctx.is(res.data.data.clientSignature, '0x2ae01d07ac03ca7c2f5087e61f8478d8784707c22f04b923144ce8f9b0f7cc421662b374e248d10a44bd36a23b5c6c2e05f233e5909b5072ec3e13b8d34b055e1c');
});

spec.test('Throws if provider and client sign different messages', async (ctx) => {
  const context = ctx.get('context');

  await new Contract({}, { context }).populate({
    contractId: '1',
    hash: '0x9c22ff5f21f0b81b113e63f7db6da94fedef11b2119b4088b89664fb9a3cb658', // hashed 'test'
    providerSignature: '0x4514fb7738f17164edcb637f52aa670d476a431c30daa92538e674afea22647d1095bb7443605e487e5b0dbbfefd5d81408035774d4bd40e377f608a07019c191b'
  }).upsert();
  
  const auth = generateAuthToken('0xF9196F9f176fd2eF9243E8960817d5FbE63D79aa', '1', context);
  const res = await ctx.request({
    url: '/contracts/1/sign/client',
    method: 'post',
    headers: {
      'Authorization': auth,
    },
    data: {
      hash: '0x6d255fc3390ee6b41191da315958b7d6a1e5b17904cc7683558f98acc57977b4', // hashed 'test1'
      signature: '0x3e57493f9d450e9941800b0dcbc466d0c4376831d1b23cd05101f628298e419c1ac15d7ffcf0e5bb0746253ffceca269749429092a05e93be9637a91834a071e1b'
    },
  });

  ctx.true(res.data.errors.find((e) => e.code == ErrorCode.HASH_NOT_MATCHING));
});

export default spec;
