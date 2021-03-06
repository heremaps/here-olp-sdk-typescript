/*
 * Copyright (C) 2020-2021 HERE Europe B.V.
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
 *
 * SPDX-License-Identifier: Apache-2.0
 * License-Filename: LICENSE
 */

import * as chai from "chai";
import sinonChai = require("sinon-chai");
import { DataRequest } from "@here/olp-sdk-dataservice-read";

chai.use(sinonChai);

const assert = chai.assert;
const expect = chai.expect;

describe("DataRequest", function() {
  class DataRequestTest extends DataRequest {
    getDataHandle(): string | undefined {
      return "test";
    }

    withDataHandle(dataHandle: string): DataRequest {
      return this;
    }

    getPartitionId(): string | undefined {
      return "test";
    }

    withPartitionId(partitionId: string): DataRequest {
      return this;
    }

    getVersion(): number | undefined {
      return 5;
    }

    withVersion(version: number): DataRequest {
      return this;
    }

    withBillingTag(tag: string): DataRequest {
      return this;
    }

    getBillingTag(): string {
      return "test-billing-tag";
    }
  }

  it("Shoud be initialized", async function() {
    const request = new DataRequest();
    assert.isDefined(request);
    expect(request).to.be.instanceOf(DataRequest);

    assert.isFunction(request.withPartitionId);
    assert.isFunction(request.getPartitionId);
    assert.isFunction(request.withDataHandle);
    assert.isFunction(request.getDataHandle);
    assert.isFunction(request.withBillingTag);
    assert.isFunction(request.getBillingTag);
  });

  it("Test withVersion method with version", async function() {
    const request = new DataRequestTest();

    const response = request.withVersion(3);
    assert.isDefined(response);
  });

  it("Test getVersion method without params", async function() {
    const request = new DataRequestTest();

    const response = request.getVersion();
    assert.isDefined(response);
  });

  it("Test withPartitionId method with id", async function() {
    const request = new DataRequestTest();

    const response = request.withPartitionId("test");
    assert.isDefined(response);
  });

  it("Test getPartitionId method without params", async function() {
    const request = new DataRequestTest();

    const response = request.getPartitionId();
    assert.isDefined(response);
  });

  it("Test withDataHandle method with dataHandle", async function() {
    const request = new DataRequestTest();

    const response = request.withDataHandle("test");
    assert.isDefined(response);
  });

  it("Test getDataHandle method without params", async function() {
    const request = new DataRequestTest();

    const response = request.getDataHandle();
    assert.isDefined(response);
  });

  it("Test withBillingTag method with tag", async function() {
    const request = new DataRequestTest();

    const response = request.withBillingTag("test-tag");
    assert.isDefined(response);
  });

  it("Test getBillingTag method without params", async function() {
    const request = new DataRequestTest();

    const response = request.getBillingTag();
    assert.isDefined(response);
  });
});
