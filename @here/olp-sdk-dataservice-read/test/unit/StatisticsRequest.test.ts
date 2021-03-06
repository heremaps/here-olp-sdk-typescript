/*
 * Copyright (C) 2019-2021 HERE Europe B.V.
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

import { CoverageDataType, StatisticsRequest } from "../../lib";
import { HRN } from "@here/olp-sdk-core";

chai.use(sinonChai);

const assert = chai.assert;
const expect = chai.expect;

describe("SummaryRequest", function() {
    const billingTag = "billingTag";
    const mockedHRN = HRN.fromString("hrn:here:data:::mocked-hrn");
    const mockedLayerId = "mocked-layed-id";
    const mockedDataLevel = 9;
    const mockedTimemap = CoverageDataType.TIMEMAP;

    it("Should initialize", function() {
        const statisticsRequest = new StatisticsRequest();

        assert.isDefined(statisticsRequest);
        expect(statisticsRequest).be.instanceOf(StatisticsRequest);
    });

    it("Should set parameters", function() {
        const statisticsRequest = new StatisticsRequest();
        const statisticsRequestWithCatalogHrn = statisticsRequest.withCatalogHrn(
            mockedHRN
        );
        const statisticsRequestWithLayerId = statisticsRequest.withLayerId(
            mockedLayerId
        );
        const statisticsRequestWithDataLevel = statisticsRequest.withDataLevel(
            mockedDataLevel
        );
        const statisticsRequestWithTimemap = statisticsRequest.withTypemap(
            mockedTimemap
        );
        const statisticsRequestWithBillTag = statisticsRequest.withBillingTag(
            billingTag
        );

        expect(statisticsRequestWithCatalogHrn.getCatalogHrn()).to.be.equal(
            mockedHRN.toString()
        );
        expect(statisticsRequestWithLayerId.getLayerId()).to.be.equal(
            mockedLayerId
        );
        expect(statisticsRequestWithDataLevel.getDataLevel()).to.be.equal(
            mockedDataLevel
        );
        expect(statisticsRequestWithTimemap.getTypemap()).to.be.equal(
            mockedTimemap
        );
        expect(statisticsRequestWithBillTag.getBillingTag()).to.be.equal(
            billingTag
        );
    });

    it("Should get parameters with chain", function() {
        const statisticsRequest = new StatisticsRequest()
            .withCatalogHrn(mockedHRN)
            .withLayerId(mockedLayerId)
            .withDataLevel(mockedDataLevel)
            .withTypemap(mockedTimemap)
            .withBillingTag(billingTag);

        expect(statisticsRequest.getCatalogHrn()).to.be.equal(
            mockedHRN.toString()
        );
        expect(statisticsRequest.getLayerId()).to.be.equal(mockedLayerId);
        expect(statisticsRequest.getDataLevel()).to.be.equal(mockedDataLevel);
        expect(statisticsRequest.getTypemap()).to.be.equal(mockedTimemap);
        expect(statisticsRequest.getBillingTag()).to.be.equal(billingTag);
    });
});
