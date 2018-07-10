import { HandlerInput } from "ask-sdk-core";
import { RequestAttributes, SessionAttributes } from "./interfaces";
import { Intent, slu } from "ask-sdk-model";

export function IsIntent(handlerInput: HandlerInput, intent: string): boolean {
    return handlerInput.requestEnvelope.request.type === "IntentRequest"
        && handlerInput.requestEnvelope.request.intent.name === intent;
}

export function IsOneOfIntent(handlerInput: HandlerInput, ...intents: string[]): boolean {
    if (handlerInput.requestEnvelope.request.type === "IntentRequest") {
        for (let i = 0; i < intents.length; i++) {
            if (handlerInput.requestEnvelope.request.intent.name === intents[i]) {
                return true;
            }
        }
    }
    return false;
}

export function IsType(handlerInput: HandlerInput, type: string): boolean {
    return handlerInput.requestEnvelope.request.type === type;
}

export function IsIntentWithDialogState(handlerInput: HandlerInput, intent: string, state: string): boolean {
    return handlerInput.requestEnvelope.request.type === "IntentRequest"
        && handlerInput.requestEnvelope.request.intent.name === intent
        && handlerInput.requestEnvelope.request.dialogState === state;
}

export function IsIntentWithIncompleteDialog(handlerInput: HandlerInput, intent: string): boolean {
    return handlerInput.requestEnvelope.request.type === "IntentRequest"
        && handlerInput.requestEnvelope.request.intent.name === intent
        && handlerInput.requestEnvelope.request.dialogState !== "COMPLETED";
}

export function IsIntentWithCompleteDialog(handlerInput: HandlerInput, intent: string): boolean {
    return IsIntentWithDialogState(handlerInput, intent, "COMPLETED");
}

export function GetRequestAttributes(handlerInput: HandlerInput): RequestAttributes {
    return handlerInput.attributesManager.getRequestAttributes() as RequestAttributes;
}

export function GetSessionAttributes(handlerInput: HandlerInput): SessionAttributes {
    return handlerInput.attributesManager.getSessionAttributes() as SessionAttributes;
}

export function GetValuesForSlot(intent: Intent, slotName: string): Array<slu.entityresolution.ValueWrapper> | undefined {
    if (intent.slots) {
        const slot = intent.slots[slotName];
        if (slot && slot.resolutions
            && slot.resolutions.resolutionsPerAuthority
            && slot.resolutions.resolutionsPerAuthority[0]
            && slot.resolutions.resolutionsPerAuthority[0].status
            && slot.resolutions.resolutionsPerAuthority[0].status.code) {
            const code = slot.resolutions.resolutionsPerAuthority[0].status.code;
            switch (code) {
                case "ER_SUCCESS_MATCH":
                    return slot.resolutions.resolutionsPerAuthority[0].values;
            }
        }
    }
    return undefined;
}
