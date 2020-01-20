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

import { BlobApi, IndexApi } from "@here/olp-sdk-dataservice-api";
import {
    ApiName,
    DataStoreRequestBuilder,
    HRN,
    IndexQueryRequest,
    OlpClientSettings,
    RequestFactory
} from "..";

/**
 * Describes a index layer and provides the possibility to get partitions metadata and data.
 */
export class IndexLayerClient {
    private readonly apiVersion: string = "v1";

    /**
     * Creates the [[IndexLayerClient]] instance.
     *
     * @param catalogHrn The HERE Resource Name (HRN) of the catalog from which you want to get partitions metadata and data.
     * @param layerId The ID of the layer.
     * @param settings The [[OlpClientSettings]] instance.
     * @return The [[IndexLayerClient]] instance.
     */
    constructor(
        readonly catalogHrn: HRN,
        readonly layerId: string,
        readonly settings: OlpClientSettings
    ) {}

    /**
     * Fetches all partitions metadata from a layer that match a query from the [[IndexQueryRequest]] instance.
     *
     * @param IndexQueryRequest The [[IndexQueryRequest]] instance.
     * @param abortSignal A signal object that allows you to communicate with a request (such as the `fetch` request)
     * and, if required, abort it using the `AbortController` object.
     *
     * For more information, see the [`AbortController` documentation](https://developer.mozilla.org/en-US/docs/Web/API/AbortController).
     *
     * @returns A list of metadata for each of the partitions from the requested layer.
     */
    public async getPartitions(
        request: IndexQueryRequest,
        abortSignal?: AbortSignal
    ): Promise<IndexApi.Index[]> {
        const query = request.getQueryString();
        if (!query) {
            return Promise.reject("Please provide correct query");
        }

        const requestBilder = await this.getRequestBuilder(
            "index",
            this.catalogHrn,
            abortSignal
        ).catch(err => Promise.reject(err));

        const indexMetadata = await IndexApi.performQuery(requestBilder, {
            layerID: this.layerId,
            query,
            huge: request.getHugeResponse()
        }).catch(err => Promise.reject(err));

        return indexMetadata.data
            ? Promise.resolve(indexMetadata.data)
            : Promise.reject(indexMetadata.error);
    }

    /**
     * Fetches partition data using data handle.
     *
     * @param model The data model of partition metadata.
     * @param abortSignal A signal object that allows you to communicate with a request (such as the `fetch` request)
     * and, if required, abort it using the `AbortController` object.
     *
     * For more information, see the [`AbortController` documentation](https://developer.mozilla.org/en-US/docs/Web/API/AbortController).
     *
     * @return The data from the requested partition.
     */
    public async getData(
        model: IndexApi.Index,
        abortSignal?: AbortSignal
    ): Promise<Response> {
        if (!model.id) {
            return Promise.reject("No data handle for this partition");
        }

        const builder = await this.getRequestBuilder(
            "blob",
            this.catalogHrn,
            abortSignal
        ).catch(err => Promise.reject(err));

        return BlobApi.getBlob(builder, {
            dataHandle: model.id,
            layerId: this.layerId
        }).catch(async error => Promise.reject(error));
    }

    /**
     * Fetch baseUrl and create requestBuilder for sending requests to the API Lookup Service.
     * @param builderType endpoint name is needed to create propriate requestBuilder
     *
     * @returns requestBuilder
     */
    private async getRequestBuilder(
        builderType: ApiName,
        hrn?: HRN,
        abortSignal?: AbortSignal
    ): Promise<DataStoreRequestBuilder> {
        return RequestFactory.create(
            builderType,
            this.apiVersion,
            this.settings,
            hrn,
            abortSignal
        ).catch(err =>
            Promise.reject(
                `Error retrieving from cache builder for resource "${this.catalogHrn}" and api: "${builderType}.\n${err}"`
            )
        );
    }
}
