import { RequestHandler } from "ask-sdk-core";
import { IntentRequest } from "ask-sdk-model";
import { GetRequestAttributes, IsIntentWithCompleteDialog, GetSlotValues } from "../../lib/helpers";
import { audio } from "../../lib/AudioController";
import { SlotTypes, IntentTypes, Station, Radio } from "../../lib/constants";

export const CompletedPlayRadio: RequestHandler = {
    canHandle(handlerInput) {
        return IsIntentWithCompleteDialog(handlerInput, IntentTypes.PlayRadio);
    },
    handle(handlerInput) {
        const { t } = GetRequestAttributes(handlerInput);

        const request = handlerInput.requestEnvelope.request as IntentRequest;

        const slots = GetSlotValues(request.intent.slots);

        const station = slots[SlotTypes.Station];

        // if we have a match and it is not ambiguous (only one resolved value)
        // play it directly
        if (station && station.isMatch && !station.isAmbiguous) {
            const radio = Radio.for(station.id as Station);

            return audio.play(radio.url, station.id, 0, t("PLAYING_MSG", radio.name), radio.card)
                .getResponse();
        }

        return handlerInput.responseBuilder
            .speak(t("WHICH_STATION_MSG"))
            .addElicitSlotDirective(SlotTypes.Station)
            .getResponse();
    }
};
