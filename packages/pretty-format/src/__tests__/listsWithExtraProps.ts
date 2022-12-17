/**
 * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import prettyFormat from '../';

describe('list types with non-element properties', () => {
  it('prints an empty array with extra properties', () => {
    type ExtendedArray<T> = Array<T> & {extra?: string};
    const val: ExtendedArray<never> = [];
    val.extra = 'i-am-empty';
    expect(prettyFormat(val)).toBe('Array [\n  "extra": "i-am-empty",\n]');
  });

  it('prints an array with items and extra properties', () => {
    type ExtendedArray<T> = Array<T> & {extra?: string};
    const val: ExtendedArray<number> = [1, 2, 3];
    val.extra = 'i-have-elements';
    expect(prettyFormat(val)).toBe(
      'Array [\n  1,\n  2,\n  3,\n  "extra": "i-have-elements",\n]',
    );
  });

  it('prints a sparse array with extra properties', () => {
    type ExtendedArray<T> = Array<T> & {extra?: string};
    // eslint-disable-next-line no-sparse-arrays
    const val: ExtendedArray<unknown> = [1, , , 4];
    val.extra = 'i-am-sparse';
    expect(prettyFormat(val)).toBe(
      'Array [\n  1,\n  ,\n  ,\n  4,\n  "extra": "i-am-sparse",\n]',
    );
  });

  it('prints a typed array with extra properties', () => {
    type ExtendedArray = Uint8Array & {extra?: string};
    const val: ExtendedArray = Uint8Array.of(1, 2, 3);
    val.extra = 'i-am-typed';
    expect(prettyFormat(val)).toBe(
      'Uint8Array [\n  1,\n  2,\n  3,\n  "extra": "i-am-typed",\n]',
    );
  });

  it('prints an array buffer with extra properties', () => {
    type ExtendedBuffer = ArrayBuffer & {extra?: string};
    const val: ExtendedBuffer = Int32Array.of(-2, -1, 0, 1, 2).buffer;
    val.extra = 'i-am-a-buffer';
    // Array buffers' contents are not currently serialized.
    expect(prettyFormat(val)).toBe(
      'ArrayBuffer [\n  "extra": "i-am-a-buffer",\n]',
    );
  });

  it('prints a data view with extra properties', () => {
    type ExtendedView = DataView & {extra?: string};
    const buf = Int32Array.of(-2, -1, 0, 1, 2).buffer;
    const val: ExtendedView = new DataView(buf, 1, 3);
    val.extra = 'i-am-a-view';
    // Data views' elements are not currently serialized.
    expect(prettyFormat(val)).toBe('DataView [\n  "extra": "i-am-a-view",\n]');
  });
});
