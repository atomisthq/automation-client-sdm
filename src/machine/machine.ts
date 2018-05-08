/*
 * Copyright © 2018 Atomist, Inc.
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

import {Configuration, logger,} from "@atomist/automation-client";

import axios from "axios";
import {CodeReactionGoal, onAnyPush, SoftwareDeliveryMachine, SoftwareDeliveryMachineOptions,} from "@atomist/sdm";

export type MachineOptions = SoftwareDeliveryMachineOptions;

export function machine(options: SoftwareDeliveryMachineOptions,
                        configuration: Configuration): SoftwareDeliveryMachine {
    const sdm = new SoftwareDeliveryMachine(
        "Automation Client Software Delivery Machine",
        options,
        onAnyPush.setGoals(CodeReactionGoal),
    );

    sdm.addPushReactions({
        name: "sonify", action: async pri => {
            const msg = pri.commit.message;
            logger.info(`BLAH!!!!: ${msg}`);
            await axios.get(`http://localhost:5005/say/${encodeURIComponent(msg)}/en-au`);
        },
    });

    return sdm;
}
