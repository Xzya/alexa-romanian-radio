import { Slot, slu, SlotConfirmationStatus } from "ask-sdk-model";

export interface RequestAttributes {
    t(key: string, ...args: any[]): string;
    [key: string]: any;
}

export type Slots = { [key: string]: Slot };

/**
 * A matched slot value (if `status.code` = "ER_SUCCESS_MATCH").
 * 
 * Example:
 *   If we have the following Drink Slot Type:
 *   {
 *     "types": [{
 *       "values": [{
 *           "id": "cocacola",
 *           "name": {
 *             "value": "Coca Cola"
 *           }
 *         },
 *         {
 *           "id": "cocacolazero",
 *           "name": {
 *             "value": "Coca Cola Zero"
 *           }
 *         }
 *       ]
 *     }]
 *   }
 * 
 *   If the user said "Cola", the following value should be generated:
 *   {
 *     "name": "drink", // slot name
 *     "value": "Cola", // what the user said
 *     "isMatch": true, // was successfuly matched with our slot type
 *     "resolved": "Coca Cola", // the first resolved value
 *     "id": "cocacola", // the first resolved id
 *     "isAmbiguous": true, // true because we matched multiple possible values
 *     "values": [{
 *         "name": "Coca Cola",
 *         "id": "cocacola"
 *       },
 *       {
 *         "name": "Coca Cola Zero",
 *         "id": "cocacolazero"
 *       }
 *     ],
 *     "confirmationStatus": "NONE"
 *   }
 */
export interface MatchedSlotValue {
    /**
     * Name of the slot.
     */
    name: string;

    /**
     * Value that the user said (unresolved).
     */
    value: string;

    /**
     * `statis.code` = "ER_SUCCESS_MATCH"
     */
    isMatch: true;

    /**
     * The first resolved value.
     */
    resolved: string;

    /**
     * The first resolved id.
     */
    id: string;

    /**
     * `True` if there are multiple resolved values.
     */
    isAmbiguous: boolean;

    /**
     * All resolved values. If there are multiple values, `isAmbiguous` will be `true`.
     */
    values: slu.entityresolution.Value[];

    /**
     * Whether the user has explicitly confirmed or denied the value of this slot.
     */
    confirmationStatus: SlotConfirmationStatus;
}

/**
 * An unmatched slot value (if `status.code` != "ER_SUCCESS_MATCH").
 */
export interface UnmatchedSlotValue {
    /**
     * Name of the slot.
     */
    name: string;

    /**
     * Value that the user said (unresolved).
     */
    value: string;

    /**
     * `statis.code` != "ER_SUCCESS_MATCH"
     */
    isMatch: false;

    /**
     * Whether the user has explicitly confirmed or denied the value of this slot.
     */
    confirmationStatus: SlotConfirmationStatus
}

export interface SlotValues {
    [key: string]: MatchedSlotValue | UnmatchedSlotValue | undefined;
}
