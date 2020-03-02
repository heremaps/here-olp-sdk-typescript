/*
 * Copyright (C) 2020 HERE Europe B.V.
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

import sinon = require("sinon");
import * as chai from "chai";
import sinonChai = require("sinon-chai");

import * as dataServiceRead from "../../lib";
import { DataStoreRequestBuilder, DownloadManager } from "../../lib";

chai.use(sinonChai);

const assert = chai.assert;
const expect = chai.expect;

describe("DataStoreRequestBuilder", () => {
    let sandbox: sinon.SinonSandbox;
    let getBaseUrlRequestStub: sinon.SinonStub;

    let dataStore: any;
    let dataStoreError: any;
    const fakeURL = "http://fake-base.url";
    const mockedUrl = "test-url";
    const baseurl = "base-url";
    let token = () => Promise.resolve("token");
    let abortSignalTest: any;

    let dm = ({
        download: (url: any, options: any) =>
            Promise.resolve(({
                status: 200,
                statusText: "Test Success",
                json: function() {
                    return this;
                }
            } as unknown) as Response)
    } as unknown) as DownloadManager;

    let dmError = ({
        download: (url: any, options: any) =>
            Promise.reject(({
                status: 404,
                statusText: "Test Error"
            } as unknown) as Response)
    } as unknown) as DownloadManager;

    before(() => {
        sandbox = sinon.createSandbox();
    });

    beforeEach(() => {
        getBaseUrlRequestStub = sandbox.stub(
            dataServiceRead.RequestFactory,
            "getBaseUrl"
        );
        getBaseUrlRequestStub.callsFake(() => Promise.resolve(fakeURL));

        dataStore = new dataServiceRead.DataStoreRequestBuilder(
            dm,
            baseurl,
            token,
            abortSignalTest
        );

        dataStoreError = new dataServiceRead.DataStoreRequestBuilder(
            dmError,
            baseurl,
            token,
            abortSignalTest
        );
    });

    afterEach(() => {
        sandbox.restore();
    });

    it("Shoud be initialized", async () => {
        assert.isDefined(dataStore);
        expect(dataStore).be.instanceOf(DataStoreRequestBuilder);
    });

    it("Shoud downloads data from the provided URL", async () => {
        const response = await dataStore.download(mockedUrl);

        assert.isDefined(response);
        expect(response.status).to.be.equal(200);
        expect(response.statusText).to.be.equal("Test Success");
    });

    it("Shoud download method return error when downloadManager crashed", async () => {
        try {
            await dataStoreError.download(mockedUrl);
        } catch (error) {
            assert.isDefined(error);
            expect(error.status).to.be.equal(404);
            expect(error.statusText).to.be.equal("Test Error");
        }
    });

    it("Shoud downloads the blob data from the provided URL", async () => {
        const response = await dataStore.downloadBlob(mockedUrl);

        assert.isDefined(response);
        expect(response.status).to.be.equal(200);
        expect(response.statusText).to.be.equal("Test Success");
    });

    it("Shoud downloadBlob method return error when downloadManager crashed", async () => {
        try {
            await dataStoreError.downloadBlob(mockedUrl);
        } catch (error) {
            assert.isDefined(error);
            expect(error.status).to.be.equal(404);
            expect(error.statusText).to.be.equal("Test Error");
        }
    });

    it("Shoud abort signal be added to the headers of the requests", async () => {
        const dm = ({
            download: (url: any, options: any) => {
                assert.isDefined(options.signal.aborted);
                expect(options.signal.aborted).equals(false);
                return Promise.resolve(({
                    status: 200,
                    statusText: "Test Success",
                    json: function() {
                        return this;
                    }
                } as unknown) as Response);
            }
        } as unknown) as DownloadManager;
        const abortController = new AbortController();
        const requestBuilder = new dataServiceRead.DataStoreRequestBuilder(
            dm,
            baseurl,
            token,
            abortController.signal
        );

        await requestBuilder.download(mockedUrl);
        await requestBuilder.downloadBlob(mockedUrl);
    });
});
