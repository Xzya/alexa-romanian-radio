import { RequestHandler } from "ask-sdk-core";
import { IntentRequest, slu } from "ask-sdk-model";
import { first } from "lodash";
import { GetRequestAttributes, IsIntentWithIncompleteDialog, IsIntentWithCompleteDialog, GetValuesForSlot } from "./utils";
import { Radio, Station } from "./Stations";
import { audio } from "./AudioController";

const StationSlotName = "station";

export const InProgressPlayRadioIntentHandler: RequestHandler = {
    canHandle(handlerInput) {
        return IsIntentWithIncompleteDialog(handlerInput, "PlayRadio");
    },
    handle(handlerInput) {
        const request = handlerInput.requestEnvelope.request as IntentRequest;

        return handlerInput.responseBuilder
            .addDelegateDirective(request.intent)
            .getResponse();
    }
};

export const CompletedPlayRadioIntentHandler: RequestHandler = {
    canHandle(handlerInput) {
        return IsIntentWithCompleteDialog(handlerInput, "PlayRadio");
    },
    handle(handlerInput) {
        const requestAttributes = GetRequestAttributes(handlerInput);

        const request = handlerInput.requestEnvelope.request as IntentRequest;
        const currentIntent = request.intent;

        const station = first(GetValuesForSlot(currentIntent, StationSlotName)) as slu.entityresolution.ValueWrapper;

        const radio = Radio.for(station.value.id as Station);

        return audio.play(radio.url, station.value.id, 0, requestAttributes.t("PLAYING_MSG", radio.name), radio.card)
            .getResponse();
    }
};
