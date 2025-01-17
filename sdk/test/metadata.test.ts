/*
 * Copyright 2021 Lightbend Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { expect } from 'chai';
import { Metadata } from '../src/metadata';

describe('Metadata', () => {
  it('should return empty array for missing keys', () => {
    // Arrange
    const meta = new Metadata();

    // Act
    const res = meta.get('something');

    // Assert
    expect(res.length).to.be.equal(0);
  });

  it('should return data that is set', () => {
    // Arrange
    const meta = new Metadata();
    meta.set('key1', 'hello');

    // Act
    const res = meta.get('key1');

    // Assert
    expect(res).to.have.ordered.members(['hello']);
  });

  it('should return multiple data that if set', () => {
    // Arrange
    const meta = new Metadata();
    meta.set('key1', 'hello1');
    meta.set('key1', 'hello2');

    // Act
    const res = meta.get('key1');

    // Assert
    expect(res).to.have.ordered.members(['hello1', 'hello2']);
  });

  it('should return empty array if all the data have been removed', () => {
    // Arrange
    const meta = new Metadata();
    meta.set('key1', 'hello1');
    meta.set('key1', 'hello2');
    meta.delete('key1');

    // Act
    const res = meta.get('key1');

    // Assert
    expect(res.length).to.be.equal(0);
  });

  it('should return data that have not been removed', () => {
    // Arrange
    const meta = new Metadata();
    meta.set('key1', 'hello1');
    meta.set('key2', 'hello2');
    meta.delete('key1');

    // Act
    const res = meta.get('key2');

    // Assert
    expect(res.length).to.be.equal(1);
    expect(res[0]).to.be.equal('hello2');
  });

  it('should clear the entire data', () => {
    // Arrange
    const meta = new Metadata();
    meta.set('key1', 'hello1');
    meta.set('key2', 'hello2');
    meta.clear();

    // Act
    const res = meta.get('key1').concat(meta.get('key2'));

    // Assert
    expect(res.length).to.be.equal(0);
  });

  it('should return the subject', () => {
    // Arrange
    const meta = new Metadata();
    meta.set('ce-subject', 'hello1');

    // Act
    const res = meta.getSubject();

    // Assert
    expect(res).to.be.equal('hello1');
  });
});
