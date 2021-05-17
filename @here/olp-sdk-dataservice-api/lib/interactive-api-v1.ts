/*
 * Copyright (C) 2021 HERE Europe B.V. and its affiliate(s).
 * All rights reserved.
 *
 * This software and other materials contain proprietary information
 * controlled by HERE and are protected by applicable copyright legislation.
 * Any use and utilization of this software and other materials and
 * disclosure to any third parties is conditional upon having a separate
 * agreement with HERE for the access, use, utilization or disclosure of this
 * software. In the absence of such agreement, the use of the software is not
 * allowed.
 */

/**
 * Interactive API v1
 * Interactive API v1 is a REST API for simple access to geo data.
 *
 * OpenAPI spec version: 1.0.0
 *
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 */

// tslint:disable:array-type

import { UrlBuilder, RequestBuilder, RequestOptions } from "./RequestBuilder";

export interface ApiHealthStatus {
    /**
     * Health status of API
     */
    status?: string;
}

export interface ApiVersion {
    /**
     * Version of API
     */
    apiVersion?: string;
}

export interface Feature extends GeoJSON {
    /**
     * The unique identifier of the feature.
     */
    id?: string;
    geometry?: GeoJSON;
    properties?: { [key: string]: any };
}

export interface FeatureCollection extends GeoJSON {
    /**
     * Features included in the collection.
     */
    features: Array<Feature>;
}

export interface FeatureCollectionIterable extends FeatureCollection {
    /**
     * The handle of the next batch.
     */
    handle?: string;
    /**
     * The token of the next batch.
     */
    nextPageToken?: string;
}

export interface FeatureCollectionModification extends FeatureCollection {
    /**
     * List of inserted feature IDs.
     */
    inserted?: Array<string>;
    /**
     * List of updated features IDs.
     */
    updated?: Array<string>;
    /**
     * List of deleted features IDs.
     */
    deleted?: Array<string>;
}

/**
 * The base type for all possible GeoJSON objects.
 */
export interface GeoJSON {
    type: string;
    /**
     * Describes the coordinate range of the GeoJSON object.
     */
    bbox?: Array<number>;
}

export interface LineString extends GeoJSON {
    coordinates?: Array<Array<number>>;
}

export interface ModelError {
    title?: string;
    status?: number;
    code?: string;
    cause?: string;
    action?: string;
    correlationId?: string;
}

export interface MultiLineString extends GeoJSON {
    coordinates?: Array<Array<Array<number>>>;
}

export interface MultiPoint extends GeoJSON {
    coordinates?: Array<Array<number>>;
}

export interface MultiPolygon extends GeoJSON {
    coordinates?: Array<Array<Array<Array<number>>>>;
}

export interface Point extends GeoJSON {
    coordinates?: Array<number>;
}

export interface Polygon extends GeoJSON {
    coordinates?: Array<Array<Array<number>>>;
}

export interface Statistics {
    count?: StatisticsCount;
    byteSize?: StatisticsCount;
    bbox?: StatisticsBbox;
    geometryTypes?: StatisticsGeometryTypes;
    properties?: StatisticsProperties;
    tags?: StatisticsTags;
    searchable?: string;
}

export interface StatisticsBbox {
    value?: Array<number>;
    estimated?: boolean;
}

export interface StatisticsCount {
    value?: number;
    estimated?: boolean;
}

export interface StatisticsGeometryTypes {
    value?: Array<string>;
    estimated?: boolean;
}

export interface StatisticsProperties {
    value?: Array<StatisticsPropertiesValue>;
    estimated?: boolean;
}

export interface StatisticsPropertiesValue {
    key?: string;
    count?: number;
    searchable?: boolean;
}

export interface StatisticsTags {
    value?: Array<StatisticsTagsValue>;
    estimated?: boolean;
}

export interface StatisticsTagsValue {
    key?: string;
    count?: number;
}
