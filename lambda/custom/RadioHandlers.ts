import { RequestHandler } from "ask-sdk-core";
import { IntentRequest } from "ask-sdk-model";
import { GetRequestAttributes, IsIntentWithIncompleteDialog, IsIntentWithCompleteDialog, GetSlotValues, ResetSlotValue } from "./utils";
import { Radio, Station } from "./Stations";
import { audio } from "./AudioController";

const StationSlotName = "station";

export const InProgressPlayRadioIntentHandler: RequestHandler = {
    canHandle(handlerInput) {
        return IsIntentWithIncompleteDialog(handlerInput, "PlayRadio");
    },
    handle(handlerInput) {
        const { t } = GetRequestAttributes(handlerInput);

        const request = handlerInput.requestEnvelope.request as IntentRequest;
        const currentIntent = request.intent;

        const slots = GetSlotValues(currentIntent.slots);

        const station = slots[StationSlotName];

        // if we have a match but it's ambiguous
        // ask for clarification
        if (station && station.isMatch && station.isAmbiguous) {
            let prompt = "";
            const size = station.values.length;

            station.values
                .forEach((element, index) => {
                    prompt += `${(index === size - 1) ? t("OR_MSG") : " "} ${element.name}`;
                });

            return handlerInput.responseBuilder
                .speak(t("SELECT_ONE_MSG", prompt))
                .reprompt(t("SELECT_ONE_MSG", prompt))
                .addElicitSlotDirective(station.name)
                .getResponse();
        }

        // if we have a station, but it is not matched against any of our values
        // (e.g. if user said "asdf")
        // make sure to reset the value so that Alexa reprompts the user
        if (station && !station.isMatch) {
            ResetSlotValue(request, StationSlotName);
        }

        // otherwise let Alexa reprompt the user
        // or switch to the completed handler if it's done

        return handlerInput.responseBuilder
            .addDelegateDirective(currentIntent)
            .getResponse();
    }
};

export const CompletedPlayRadioIntentHandler: RequestHandler = {
    canHandle(handlerInput) {
        return IsIntentWithCompleteDialog(handlerInput, "PlayRadio");
    },
    handle(handlerInput) {
        const { t } = GetRequestAttributes(handlerInput);

        const request = handlerInput.requestEnvelope.request as IntentRequest;

        const slots = GetSlotValues(request.intent.slots);

        const station = slots[StationSlotName];

        // if we have a match and it is not ambiguous (only one resolved value)
        // play it directly
        if (station && station.isMatch && !station.isAmbiguous) {
            const radio = Radio.for(station.id as Station);

            return audio.play(radio.url, station.id, 0, t("PLAYING_MSG", radio.name), radio.card)
                .getResponse();
        }

        return handlerInput.responseBuilder
            .speak(t("WHICH_STATION_MSG"))
            .addElicitSlotDirective(StationSlotName)
            .getResponse();
    }
};
