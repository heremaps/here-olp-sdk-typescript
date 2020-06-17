/*
 * Copyright (C) 2019 HERE Europe B.V.
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

/**
 * Blob API v1
 * The `blob` service supports the upload and retrieval of large volumes of data from the storage of a catalog.
 * Each discrete chunk of data is stored as a blob (Binary Large Object). Each blob has its own unique ID (data handle).
 * The data handles can be stored in  services like `metadata`, `index` or `stream`.
 * To get data, you first use the any of those services to retrieve the data handle of the relevant blobs.
 * You then use the data handle to pull the data using the `blob` service.
 * If you are writing to a volatile layer, see volatile-blob API definition.
 *
 * OpenAPI spec version: 1.0.4
 *
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Do not edit the class manually.
 */

import { RequestBuilder, RequestOptions, UrlBuilder } from "./RequestBuilder";

/**
 * Describes a set of links for the multipart upload operations.
 */
export interface BlobInitResponse {
    links?: BlobInitResponseLinks;
}

/**
 * Describes a link for multipart upload cancel operation.
 */
export interface BlobInitResponseCancelLink {
    /**
     * The URL to use to cancel the multipart upload.
     * This link must be used as provided.
     * Do not construct the URL for this operation by parsing the multipart token and concatenating the strings together.
     */
    href?: string;
    /**
     * The HTTP method which should be used to execute this operation.
     */
    method?: string;
}

/**
 * Describes a link for the multipart upload complete operation.
 */
export interface BlobInitResponseCompleteLink {
    /**
     * The URL to use to complete the multipart upload.
     * This link must be used as provided. Do not construct the URL for this operation by parsing the multipart token
     * and concatenating the strings together.
     */
    href?: string;
    /**
     * The HTTP method which should be used to execute this operation.
     */
    method?: string;
}

/**
 * Describes a set of link for checking the uploading parts, getting status, finalizing, etc. of the multipart upload.
 */
export interface BlobInitResponseLinks {
    /**
     * The link for finalizing the multipart upload.
     */
    complete?: BlobInitResponseCompleteLink;
    /**
     * The link for canceling the multipart upload.
     */
    _delete?: BlobInitResponseCancelLink;
    /**
     * The link for checking the status of the multipart upload.
     */
    status?: BlobInitResponseStatusLink;
    /**
     * The link for uploading parts of the multipart upload.
     */
    uploadPart?: BlobInitResponseUploadPartLink;
}

/**
 * Describes a link for multipart upload status operation.
 */
export interface BlobInitResponseStatusLink {
    /**
     * The URL to use to retrieve the multipart upload status.
     * This link must be used as provided. Do not construct the URL for this operation by
     * parsing the multipart token and concatenating the strings together.
     */
    href?: string;
    /**
     * HTTP method which should be used to execute this operation.
     */
    method?: string;
}

/**
 * Describes a link for the upload part of multipart upload operation.
 */
export interface BlobInitResponseUploadPartLink {
    /**
     * The URL to use to upload part of multipart upload. This link must be used as provided.
     * Do not construct the URL for this operation by parsing the multipart token and concatenating the strings together.
     */
    href?: string;
    /**
     * The HTTP method which should be used to execute this operation.
     */
    method?: string;
}

export interface MultipartCompletePart {
    /**
     * The etag assigned by the system to identify the uploaded part to include in the final publication.
     * The etag is returned by the 'POST /layers/{layerId}/data/{dataHandle}/multiparts/{multiPartToken}/parts' operation,
     * in its response `ETag` header after successfully uploading a part.
     */
    etag?: string;
    /**
     * The number of the part of the multipart upload. This is the same number used in the `partNumber` parameter in the
     * 'POST /layers/{layerId}/data/{dataHandle}/multiparts/{multiPartToken}/parts' operation, corresponding to the `etag`
     * returned by this operation. If an error occurs during upload, do not reuse the `partNumber` when retrying the upload.
     */
    number?: number;
}

export interface MultipartCompleteRequest {
    parts?: MultipartCompletePart[];
}

export interface MultipartUploadMetadata {
    /**
     * Specifies what content encodings have been applied to the blob and thus what decoding
     * mechanisms must be applied to obtain the media-type referenced by the Content-Type header
     * field. If the 'contentEncoding' field is specified in the catalog layer configuration this value must be equal to it.
     */
    contentEncoding?: ContentEncodingEnum;
    /**
     * A standard MIME type describing the format of the blob data. For more information,
     * see [RFC 2616, section 14.17: Content-Type](https://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.17).
     * The value of this field must be equal to the one specified in the 'contentType' field in the catalog layer configuration.
     */
    contentType: string;
}

export type ContentEncodingEnum = "gzip" | "identity";
/**
 * Describes a status of the multipart upload.
 */
export interface MultipartUploadStatus {
    /**
     * The status of the multipart upload.
     */
    status?: StatusEnum;
}

export type StatusEnum = "failed" | "processing" | "completed";

/* ===================================================================
 * BlobApi
 */

/**
 * Cancels an entire multipart upload operation. You can only cancel a multipart upload before it has been completed.
 * Please keep in mind that the actual URL for this operation must be obtained from the response body of start multipart
 * operation that is 'POST /layers/{layerId}/data/{dataHandle}/multiparts' from the 'delete' element under
 * the top level 'links' element of the response.
 *
 * @summary Cancels a multipart upload
 * @param layerId The ID of the layer that the data blob part belongs to. Content of this parameter
 * must refer to a valid layer already configured in the catalog configuration.
 * @param dataHandle The data handle (ID) represents an identifier for the data blob which the part belongs to.
 * The data handle can only contain alphanumeric, &#39;-&#39; and &#39;.&#39; characters, [0-9, a-z, A-Z, -, .].
 * The maximum length of this field is 1024 characters.
 * @param multiPartToken The identifier of the multi part upload (token). Content of this parameter must refer to
 *
 * a valid token retrieved when starting the multipart upload.
 * @param billingTag Billing Tag is an optional free-form tag which is used for grouping billing records together.
 * If supplied, it must be between 4 - 16 characters, contain only alpha/numeric ASCII characters [A-Za-z0-9].
 * Grouping billing records by billing tag will be available in future releases.
 */
export async function cancelMultipartUpload(
    builder: RequestBuilder,
    params: {
        layerId: string;
        dataHandle: string;
        multiPartToken: string;
        billingTag?: string;
    }
): Promise<any> {
    const baseUrl = "/layers/{layerId}/data/{dataHandle}/multiparts/{multiPartToken}"
        .replace("{layerId}", UrlBuilder.toString(params["layerId"]))
        .replace("{dataHandle}", UrlBuilder.toString(params["dataHandle"]))
        .replace(
            "{multiPartToken}",
            UrlBuilder.toString(params["multiPartToken"])
        );

    const urlBuilder = new UrlBuilder(builder.baseUrl + baseUrl);
    urlBuilder.appendQuery("billingTag", params["billingTag"]);

    const headers: { [header: string]: string } = {};
    const options: RequestOptions = {
        method: "DELETE",
        headers
    };

    return builder.request<any>(urlBuilder, options);
}

/**
 * @deprecated This function will be deleted 12.20. Please use checkBlobExistsStatus.
 * Checks if a blob exists for the requested data handle.
 *
 * @summary Checks if a data handle exists
 * @param layerId The ID of the layer that the blob belongs to.
 * @param dataHandle The data handle identifies a specific blob so that you can get that blob&#39;s contents.
 * The data handle can only contain alphanumeric, &#39;-&#39; and &#39;.&#39; characters, [0-9, a-z, A-Z, -, .].
 * The maximum length of this field is 1024 characters.
 * @param billingTag Billing Tag is an optional free-form tag which is used for grouping billing records together.
 * If supplied, it must be between 4 - 16 characters, contain only alpha/numeric ASCII characters [A-Za-z0-9].
 * Grouping billing records by billing tag will be available in future releases.
 */
export async function checkBlobExists(
    builder: RequestBuilder,
    params: {
        layerId: string;
        dataHandle: string;
        billingTag?: string;
    }
): Promise<any> {
    const baseUrl = "/layers/{layerId}/data/{dataHandle}"
        .replace("{layerId}", UrlBuilder.toString(params["layerId"]))
        .replace("{dataHandle}", UrlBuilder.toString(params["dataHandle"]));

    const urlBuilder = new UrlBuilder(builder.baseUrl + baseUrl);
    urlBuilder.appendQuery("billingTag", params["billingTag"]);

    const headers: { [header: string]: string } = {};
    const options: RequestOptions = {
        method: "HEAD",
        headers
    };

    return builder.request<any>(urlBuilder, options);
}

/**
 * Checks if a blob exists for the requested data handle.
 *
 * @summary Checks if a data handle exists
 * @param layerId The ID of the layer that the blob belongs to.
 * @param dataHandle The data handle identifies a specific blob so that you can get that blob's contents.
 * The data handle can only contain alphanumeric, "-" and "." characters, [0-9, a-z, A-Z, -, .].
 * The maximum length of this field is 1024 characters.
 * @param billingTag Billing Tag is an optional free-form tag which is used for grouping billing records together.
 * If supplied, it must be between 4 - 16 characters, contain only alpha/numeric ASCII characters [A-Za-z0-9].
 * Grouping billing records by billing tag will be available in future releases.
 */
export async function checkBlobExistsStatus(
    builder: RequestBuilder,
    params: {
        layerId: string;
        dataHandle: string;
        billingTag?: string;
    }
): Promise<Response> {
    const baseUrl = "/layers/{layerId}/data/{dataHandle}"
        .replace("{layerId}", UrlBuilder.toString(params["layerId"]))
        .replace("{dataHandle}", UrlBuilder.toString(params["dataHandle"]));

    const urlBuilder = new UrlBuilder(builder.baseUrl + baseUrl);
    urlBuilder.appendQuery("billingTag", params["billingTag"]);

    const headers: { [header: string]: string } = {};
    const options: RequestOptions = {
        method: "HEAD",
        headers
    };

    return builder.requestBlob(urlBuilder, options);
}

/**
 * Call this API when all parts have been uploaded. Please keep in mind that the actual URL for this operation
 * must be obtained from the response body of start multipart operation that is
 * 'POST /layers/{layerId}/data/{dataHandle}/multiparts' from the 'complete' element under the top level 'links' element of the response.
 *
 * @summary Completes a multipart upload
 * @param layerId The ID of the layer that the data blob part belongs to.
 * @param dataHandle The data handle (ID) represents an identifier for the data blob which the part
 * belongs to. The data handle can only contain alphanumeric, "-"; and "." characters,
 * [0-9, a-z, A-Z, -, .]. The maximum length of this field is 1024 characters.
 * @param multiPartToken The identifier of the multi part upload (token). Content of this parameter must
 * refer to a valid nand started multipart upload.
 * @param parts The part ids uploaded in this multipart upload which should be used in the resulting blob.
 * @param billingTag Billing Tag is an optional free-form tag which is used for grouping billing records together.
 * If supplied, it must be between 4 - 16 characters, contain only alpha/numeric ASCII characters [A-Za-z0-9].
 * Grouping billing records by billing tag will be available in future releases.
 */
export async function completeMultipartUpload(
    builder: RequestBuilder,
    params: {
        layerId: string;
        dataHandle: string;
        multiPartToken: string;
        parts?: MultipartCompleteRequest;
        billingTag?: string;
    }
): Promise<any> {
    const baseUrl = "/layers/{layerId}/data/{dataHandle}/multiparts/{multiPartToken}"
        .replace("{layerId}", UrlBuilder.toString(params["layerId"]))
        .replace("{dataHandle}", UrlBuilder.toString(params["dataHandle"]))
        .replace(
            "{multiPartToken}",
            UrlBuilder.toString(params["multiPartToken"])
        );

    const urlBuilder = new UrlBuilder(builder.baseUrl + baseUrl);
    urlBuilder.appendQuery("billingTag", params["billingTag"]);

    const headers: { [header: string]: string } = {};
    const options: RequestOptions = {
        method: "PUT",
        headers
    };
    headers["Content-Type"] = "application/json";
    if (params["parts"] !== undefined) {
        options.body = JSON.stringify(params["parts"]);
    }

    return builder.request<any>(urlBuilder, options);
}

/**
 * Deletes a data blob from the underlying storage mechanism (volume). When you delete a blob, you cannot upload
 * data to the deleted blob's data handle for at least 3 days. The DELETE method works only for index layers.
 * DELETE requests for blobs stored for other kind of layers will be rejected.
 *
 * @summary Deletes a data blob from an index layer.
 * @param layerId The ID of the layer that the data blob belongs to.
 * @param dataHandle The data handle of the blob you want to delete. The data handle can only contain alphanumeric,
 * &#39;-&#39; and &#39;.&#39; characters, [0-9, a-z, A-Z, -, .]. The maximum length of this field is 1024 characters.
 * @param billingTag Billing Tag is an optional free-form tag which is used for grouping billing records together.
 * If supplied, it must be between 4 - 16 characters, contain only alpha/numeric ASCII characters  [A-Za-z0-9].
 * Grouping billing records by billing tag will be available in future releases.
 */
export async function deleteBlob(
    builder: RequestBuilder,
    params: {
        layerId: string;
        dataHandle: string;
        billingTag?: string;
    }
): Promise<any> {
    const baseUrl = "/layers/{layerId}/data/{dataHandle}"
        .replace("{layerId}", UrlBuilder.toString(params["layerId"]))
        .replace("{dataHandle}", UrlBuilder.toString(params["dataHandle"]));

    const urlBuilder = new UrlBuilder(builder.baseUrl + baseUrl);
    urlBuilder.appendQuery("billingTag", params["billingTag"]);

    const headers: { [header: string]: string } = {};
    const options: RequestOptions = {
        method: "DELETE",
        headers
    };

    return builder.request<any>(urlBuilder, options);
}

/**
 * Retrieves a blob from storage.
 *
 * @summary Gets a blob
 * @param layerId The ID of the parent layer for this blob.
 * @param dataHandle The data handle identifies a specific blob so that you can get that blob&#39;s contents.
 * The data handle can only contain alphanumeric, &#39;-&#39; and &#39;.&#39; characters, [0-9, a-z, A-Z, -, .].
 * The maximum length of this field is 1024 characters.
 * @param billingTag Billing Tag is an optional free-form tag which is used for grouping billing records together.
 * If supplied, it must be between 4 - 16 characters, contain only alpha/numeric ASCII characters [A-Za-z0-9].
 * Grouping billing records by billing tag will be available in future releases.
 * @param range Use this parameter to resume download of a large response when there is a connection issue between
 * the client and server, or to fetch a specific slice of the blob. To resume download after a connection issue,
 * specify a single byte range offset like this: &#x60;Range: bytes&#x3D;10-&#x60;.
 * To fetch a specific slice of the blob, specify a slice like this: &#x60;Range: bytes&#x3D;10-100&#x60;.
 * This parameter is compliant with [RFC 7233](https://tools.ietf.org/html/rfc7233), but note that this
 * parameter only supports a single byte range. The &#x60;range&#x60; parameter can also be specified as
 * a query parameter, i.e. &#x60;range&#x3D;bytes&#x3D;10-&#x60;.
 */
export async function getBlob(
    builder: RequestBuilder,
    params: {
        layerId: string;
        dataHandle: string;
        billingTag?: string;
        range?: string;
    }
): Promise<Response> {
    const baseUrl = "/layers/{layerId}/data/{dataHandle}"
        .replace("{layerId}", UrlBuilder.toString(params["layerId"]))
        .replace("{dataHandle}", UrlBuilder.toString(params["dataHandle"]));

    const urlBuilder = new UrlBuilder(builder.baseUrl + baseUrl);
    urlBuilder.appendQuery("billingTag", params["billingTag"]);

    const headers: { [header: string]: string } = {};
    const options: RequestOptions = {
        method: "GET",
        headers
    };
    if (params["range"] !== undefined) {
        headers["Range"] = params["range"] as string;
    }

    return builder.requestBlob(urlBuilder, options);
}

/**
 * Gets the status of a multipart upload. The status can be received only when the upload has been completed.
 * Please keep in mind that the actual URL for this operation must be obtained from the response body of start
 * multipart operation that is 'POST /layers/{layerId}/data/{dataHandle}/multiparts' from the 'status' element
 * under the top level 'links' element of the response.
 *
 * @summary Gets the status of a multipart upload.
 * @param layerId The ID of the layer that the data blob part belongs to.
 * @param dataHandle The data handle (ID) is an identifier for the data blob which the part belongs to.
 * The data handle can only contain alphanumeric, &#39;-&#39; and &#39;.&#39; characters, [0-9, a-z, A-Z, -, .].
 * The maximum length of this field is 1024 characters.
 * @param multiPartToken The identifier of the multipart upload (token). Content of this parameter must refer to a
 * valid token which was provided when the multipart upload was initiated.
 * @param billingTag Billing Tag is an optional free-form tag which is used for grouping billing records together.
 * If supplied, it must be between 4 - 16 characters, contain only alphanumeric ASCII characters [A-Za-z0-9].
 * Grouping billing records by billing tag will be available in future releases.
 */
export async function getMultipartUploadStatus(
    builder: RequestBuilder,
    params: {
        layerId: string;
        dataHandle: string;
        multiPartToken: string;
        billingTag?: string;
    }
): Promise<MultipartUploadStatus> {
    const baseUrl = "/layers/{layerId}/data/{dataHandle}/multiparts/{multiPartToken}"
        .replace("{layerId}", UrlBuilder.toString(params["layerId"]))
        .replace("{dataHandle}", UrlBuilder.toString(params["dataHandle"]))
        .replace(
            "{multiPartToken}",
            UrlBuilder.toString(params["multiPartToken"])
        );

    const urlBuilder = new UrlBuilder(builder.baseUrl + baseUrl);
    urlBuilder.appendQuery("billingTag", params["billingTag"]);

    const headers: { [header: string]: string } = {};
    const options: RequestOptions = {
        method: "GET",
        headers
    };

    return builder.request<MultipartUploadStatus>(urlBuilder, options);
}

/**
 * @deprecated This function will be deleted 12.20. Please use `putData`.
 * Persists the data blob in the underlying storage mechanism (volume).
 * Use this upload mechanism for blobs smaller than 50 MB.
 * The size limit for blobs uploaded this way is 5 GB but we do not recommend uploading blobs
 * this large with this method, so use multipart upload instead.
 * When the operation completes successfully there is no guarantee that the data blob will be
 * immediately available although in most cases it will be.
 * To check if the data blob is available use the HEAD method.
 *
 * @summary Publishes a data blob
 * @param layerId The ID of the layer that the data blob belongs to.
 * @param dataHandle The data handle (ID) represents an identifier for the data blob.
 * The data handle can only contain alphanumeric, &#39;-&#39; and &#39;.&#39; characters, [0-9, a-z, A-Z, -, .].
 * The maximum length of this field is 1024 characters.
 * @param body body
 * @param contentLength Size of the entity-body, in bytes.
 * For more information, see [RFC 7230, section 3.3.2: Content-Length](https://tools.ietf.org/html/rfc7230#section-3.3.2).
 * @param billingTag Billing Tag is an optional free-form tag which is used for grouping billing records together.
 * If supplied, it must be between 4 - 16 characters, contain only alpha/numeric ASCII characters [A-Za-z0-9].
 * Grouping billing records by billing tag will be available in future releases.
 */
export async function putBlob(
    builder: RequestBuilder,
    params: {
        layerId: string;
        dataHandle: string;
        body: string;
        contentLength: string;
        billingTag?: string;
    }
): Promise<any> {
    const baseUrl = "/layers/{layerId}/data/{dataHandle}"
        .replace("{layerId}", UrlBuilder.toString(params["layerId"]))
        .replace("{dataHandle}", UrlBuilder.toString(params["dataHandle"]));

    const urlBuilder = new UrlBuilder(builder.baseUrl + baseUrl);
    urlBuilder.appendQuery("billingTag", params["billingTag"]);

    const headers: { [header: string]: string } = {};
    const options: RequestOptions = {
        method: "PUT",
        headers
    };
    headers["Content-Type"] = "application/json";
    if (params["body"] !== undefined) {
        options.body = JSON.stringify(params["body"]);
    }
    if (params["contentLength"] !== undefined) {
        headers["Content-Length"] = params["contentLength"] as string;
    }

    return builder.request<any>(urlBuilder, options);
}

/**
 * Persists the data blob in the underlying storage mechanism (volume).
 * Use this upload mechanism for blobs smaller than 50 MB.
 * The size limit for blobs uploaded this way is 5 GB but we do not recommend uploading blobs
 * this large with this method, so use multipart upload instead.
 * When the operation completes successfully there is no guarantee that the data blob will be
 * immediately available although in most cases it will be.
 * To check if the data blob is available use the HEAD method.
 *
 * @summary Publishes a data blob
 * @param layerId The ID of the layer that the data blob belongs to.
 * @param dataHandle The data handle (ID) represents an identifier for the data blob.
 * The data handle can only contain alphanumeric, "-" and "." characters, [0-9, a-z, A-Z, -, .].
 * The maximum length of this field is 1024 characters.
 * @param body The data to upload. Can be Blob or Buffer.
 * @param contentLength Size of the entity-body, in bytes.
 * For more information, see [RFC 7230, section 3.3.2: Content-Length](https://tools.ietf.org/html/rfc7230#section-3.3.2).
 * @param billingTag Billing Tag is an optional free-form tag which is used for grouping billing records together.
 * If supplied, it must be between 4 - 16 characters, contain only alpha/numeric ASCII characters [A-Za-z0-9].
 * Grouping billing records by billing tag will be available in future releases.
 */
export async function putData(
    builder: RequestBuilder,
    params: {
        layerId: string;
        dataHandle: string;
        body: Blob | Buffer;
        contentLength: string;
        billingTag?: string;
    }
): Promise<Response> {
    const baseUrl = "/layers/{layerId}/data/{dataHandle}"
        .replace("{layerId}", UrlBuilder.toString(params["layerId"]))
        .replace("{dataHandle}", UrlBuilder.toString(params["dataHandle"]));

    const urlBuilder = new UrlBuilder(builder.baseUrl + baseUrl);
    urlBuilder.appendQuery("billingTag", params["billingTag"]);

    const headers: { [header: string]: string } = {};
    const options: RequestOptions = {
        method: "PUT",
        headers
    };
    headers["Content-Type"] = "application/json";
    if (params["body"] !== undefined) {
        options.body = params["body"] as any;
    }
    if (params["contentLength"] !== undefined) {
        headers["Content-Length"] = params["contentLength"] as string;
    }

    return builder.requestBlob(urlBuilder, options);
}

/**
 * Publishes large data blobs where the data payload needs to be split into multiple parts.
 * The multipart upload start is to be followed by the individual parts upload and completed with a
 * call to complete the upload. The limit of the blob uploaded this way is 50GB.
 *
 * @summary Starts a multipart upload of a blob and returns URLs for the next multipart upload operations.
 * The URLs contain the upload token.
 * @param layerId The ID of the layer that the data blob belongs to.
 * @param dataHandle The data handle (ID) represents an identifier for the data blob which contents will be persisted.
 * The data handle can only contain alphanumeric, &#39;-&#39; and &#39;.&#39; characters, [0-9, a-z, A-Z, -, .].
 * The maximum length of this field is 1024 characters.
 * @param body body
 * @param billingTag Billing Tag is an optional free-form tag which is used for grouping billing records together.
 * If supplied, it must be between 4 - 16 characters, contain only alpha/numeric ASCII characters [A-Za-z0-9].
 * Grouping billing records by billing tag will be available in future releases.
 */
export async function startMultipartUpload(
    builder: RequestBuilder,
    params: {
        layerId: string;
        dataHandle: string;
        body?: MultipartUploadMetadata;
        billingTag?: string;
    }
): Promise<BlobInitResponse> {
    const baseUrl = "/layers/{layerId}/data/{dataHandle}/multiparts"
        .replace("{layerId}", UrlBuilder.toString(params["layerId"]))
        .replace("{dataHandle}", UrlBuilder.toString(params["dataHandle"]));

    const urlBuilder = new UrlBuilder(builder.baseUrl + baseUrl);
    urlBuilder.appendQuery("billingTag", params["billingTag"]);

    const headers: { [header: string]: string } = {};
    const options: RequestOptions = {
        method: "POST",
        headers
    };
    headers["Content-Type"] = "application/json";
    if (params["body"] !== undefined) {
        options.body = JSON.stringify(params["body"]);
    }

    return builder.request<BlobInitResponse>(urlBuilder, options);
}

/**
 * Upload a single part of a multipart upload for the blob. Every uploaded part except the last one must have a
 * minimum 5 MB of data and maximum of 5 GB, but we do not recommend uploading parts this large.
 * The maximum number of parts is 10,000. Please keep in mind that the actual URL for this operation
 * must be obtained from the response body of start multipart operation that is 'POST /layers/{layerId}/data/{dataHandle}/multiparts'
 * from the 'uploadPart' element under the top level 'links' element of the response.
 *
 * @summary Uploads a part
 * @param layerId The ID of the layer that the data blob part belongs to.
 * @param dataHandle The data handle (ID) represents an identifier for the data blob which the part belongs to. The data handle
 * can only contain alphanumeric, &#39;-&#39; and &#39;.&#39; characters, [0-9, a-z, A-Z, -, .].
 * The maximum length of this field is 1024 characters.
 * @param multiPartToken The identifier of the multi part upload (token). Content of this parameter
 * must refer to a valid nand started multipart upload.
 * @param partNumber The number of the part for the multi part upload. The numbers of the upload parts
 * must start from 1, be no greater than 10,000 and be consecutive. Parts uploaded with the same &#x60;partNumber&#x60;
 * are overridden. Do not reuse the same &#x60;partnumber&#x60; when retrying an upload in an error situation
 * (network problems, 4xx or 5xx responses). Reusing the same &#x60;partnumber&#x60; in a retry may cause the publication to fail.
 * @param body The data to upload as part of the blob.
 * @param contentType A standard MIME type describing the format of the blob data. For more information,
 * see [RFC 2616, section 14.17: Content-Type](https://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.17).
 * The value of this header must match the content type specified in the &#39;contentType&#39; field when the multipart
 * upload was initialized, and this content type must also match the content type specified in the layer&#39;s configuration.
 * @param contentLength Size of the entity-body, in bytes. For more information,
 * see [RFC 7230, section 3.3.2: Content-Length](https://tools.ietf.org/html/rfc7230#section-3.3.2).
 * @param billingTag Billing Tag is an optional free-form tag which is used for grouping billing records together.
 * If supplied, it must be between 4 - 16 characters, contain only alpha/numeric ASCII characters [A-Za-z0-9].
 * Grouping billing records by billing tag will be available in future releases.
 */
export async function uploadPart(
    builder: RequestBuilder,
    params: {
        layerId: string;
        dataHandle: string;
        multiPartToken: string;
        partNumber: string;
        body: string;
        contentType: string;
        contentLength: string;
        billingTag?: string;
    }
): Promise<any> {
    const baseUrl = "/layers/{layerId}/data/{dataHandle}/multiparts/{multiPartToken}/parts"
        .replace("{layerId}", UrlBuilder.toString(params["layerId"]))
        .replace("{dataHandle}", UrlBuilder.toString(params["dataHandle"]))
        .replace(
            "{multiPartToken}",
            UrlBuilder.toString(params["multiPartToken"])
        );

    const urlBuilder = new UrlBuilder(builder.baseUrl + baseUrl);
    urlBuilder.appendQuery("partNumber", params["partNumber"]);
    urlBuilder.appendQuery("billingTag", params["billingTag"]);

    const headers: { [header: string]: string } = {};
    const options: RequestOptions = {
        method: "POST",
        headers
    };
    headers["Content-Type"] = "application/json";
    if (params["body"] !== undefined) {
        options.body = JSON.stringify(params["body"]);
    }
    if (params["contentType"] !== undefined) {
        headers["Content-Type"] = params["contentType"] as string;
    }
    if (params["contentLength"] !== undefined) {
        headers["Content-Length"] = params["contentLength"] as string;
    }

    return builder.request<any>(urlBuilder, options);
}
