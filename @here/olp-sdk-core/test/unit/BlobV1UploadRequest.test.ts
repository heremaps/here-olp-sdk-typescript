/*
 * Copyright (C) 2021 HERE Europe B.V.
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

import * as sinon from "sinon";
import * as chai from "chai";
import sinonChai = require("sinon-chai");

import { BlobV1UploadRequest } from "../../lib/utils/multipartupload-internal/BlobV1UploadRequest";
import { BlobApi } from "@here/olp-sdk-dataservice-api";

chai.use(sinonChai);
const expect = chai.expect;

describe("BlobV1UploadRequest", function() {
    const mockedRequestBuilder: any = {
        id: "mocked-request-builder"
    };

    let blobApiStub: sinon.SinonStub;

    afterEach(() => {
        blobApiStub.restore();
    });

    it("startMultipartUpload", async function() {
        const contentType = "mocked-content-type";
        const handle = "mocked-datahandle";
        const layerId = "mocked-layer-id";
        const contentEncoding = "mocked-contentEncoding";
        const billingTag = "mocked-billingTag";

        const mockedApiResponse = {
            links: {
                _delete: { href: "mocked-delete-link", method: "DELETE" },
                complete: { href: "mocked-complete-link", method: "PUT" },
                status: { href: "mocked-status-link", method: "GET" },
                uploadPart: {
                    href: "mocked-uploadPart-link",
                    method: "POST"
                }
            }
        };

        blobApiStub = sinon
            .stub(BlobApi, "startMultipartUpload")
            .resolves(mockedApiResponse);

        const request = new BlobV1UploadRequest(mockedRequestBuilder);
        const result = await request.startMultipartUpload({
            contentType,
            handle,
            layerId,
            billingTag,
            contentEncoding
        });

        expect(result._delete).equals(mockedApiResponse.links._delete);
        expect(result.status).equals(mockedApiResponse.links.status);
        expect(result.complete).equals(mockedApiResponse.links.complete);
        expect(result.uploadPart).equals(mockedApiResponse.links.uploadPart);

        expect(blobApiStub).calledWith(mockedRequestBuilder, {
            dataHandle: handle,
            layerId,
            billingTag,
            body: {
                contentType,
                contentEncoding
            }
        });
    });

    it("uploadPart", async function() {
        const contentType = "mocked-content-type";
        const url = "mocked-url";
        const data = Buffer.from("mocked-data", "utf8");
        const contentLength = 11;
        const partNumber = 23;
        const billingTag = "mocked-billingTag";

        const mockedApiResponse = {
            headers: new Map().set("ETag", "mocked-id")
        };

        blobApiStub = sinon
            .stub(BlobApi, "doUploadPart")
            .resolves((mockedApiResponse as unknown) as Response);

        const request = new BlobV1UploadRequest(mockedRequestBuilder);
        const result = await request.uploadPart({
            url,
            data,
            contentType,
            contentLength,
            partNumber,
            billingTag
        });

        expect(result.id).equals("mocked-id");

        expect(blobApiStub).calledWith(mockedRequestBuilder, {
            url,
            body: data,
            contentType,
            contentLength,
            partNumber,
            billingTag
        });
    });

    it("completeMultipartUpload", async function() {
        const url = "mocked-url";
        const billingTag = "mocked-billingTag";
        const parts = [
            {
                id: "part1",
                number: 1
            },
            {
                id: "part2",
                number: 2
            }
        ];

        blobApiStub = sinon.stub(BlobApi, "doCompleteMultipartUpload");

        const request = new BlobV1UploadRequest(mockedRequestBuilder);
        await request.completeMultipartUpload({
            url,
            parts,
            billingTag
        });

        expect(blobApiStub).calledWith(mockedRequestBuilder, {
            url,
            parts: {
                parts: [
                    {
                        etag: "part1",
                        number: 1
                    },
                    {
                        etag: "part2",
                        number: 2
                    }
                ]
            },
            billingTag
        });
    });
});
