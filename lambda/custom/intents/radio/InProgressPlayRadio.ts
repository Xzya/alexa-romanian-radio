import { RequestHandler } from "ask-sdk-core";
import { IntentRequest } from "ask-sdk-model";
import { GetRequestAttributes, IsIntentWithIncompleteDialog, GetSlotValues, ResetSlotValue } from "../../lib/helpers";
import { SlotTypes, IntentTypes } from "../../lib/constants";

export const InProgressPlayRadio: RequestHandler = {
    canHandle(handlerInput) {
        return IsIntentWithIncompleteDialog(handlerInput, IntentTypes.PlayRadio);
    },
    handle(handlerInput) {
        const { t } = GetRequestAttributes(handlerInput);

        const request = handlerInput.requestEnvelope.request as IntentRequest;
        const currentIntent = request.intent;

        const slots = GetSlotValues(currentIntent.slots);

        const station = slots[SlotTypes.Station];

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
            ResetSlotValue(request, SlotTypes.Station);
        }

        // otherwise let Alexa reprompt the user
        // or switch to the completed handler if it's done

        return handlerInput.responseBuilder
            .addDelegateDirective(currentIntent)
            .getResponse();
    }
};
