import { RequestHandler, ErrorHandler } from "ask-sdk-core";
import { IsType, IsIntent, GetRequestAttributes, IsOneOfIntent } from "./utils";
import { Radio, Station } from "./Stations";
import { audio } from "./AudioController";

export const LaunchRequestHandler: RequestHandler = {
    canHandle(handlerInput) {
        return IsType(handlerInput, "LaunchRequest");
    },
    handle(handlerInput) {
        return PlayAudioIntentHandler.handle(handlerInput);
    }
};

export const PlayAudioIntentHandler: RequestHandler = {
    canHandle(handlerInput) {
        return IsIntent(handlerInput, "PlayAudio");
    },
    handle(handlerInput) {
        const requestAttributes = GetRequestAttributes(handlerInput);

        const radio = Radio.for(Station.KissFM); // currently hardcoded station

        return audio.play(radio.url, 0, requestAttributes.t("WELCOME_MSG", radio.name), radio.card);
    }
};

export const HelpIntentHandler: RequestHandler = {
    canHandle(handlerInput) {
        return IsIntent(handlerInput, "AMAZON.HelpIntent");
    },
    handle(handlerInput) {
        const requestAttributes = GetRequestAttributes(handlerInput);

        return handlerInput.responseBuilder
            .speak(requestAttributes.t("HELP_MSG"))
            .reprompt(requestAttributes.t("HELP_MSG"))
            .getResponse();
    }
};

export const NextIntentHandler: RequestHandler = {
    canHandle(handlerInput) {
        return IsIntent(handlerInput, "AMAZON.NextIntent");
    },
    handle(handlerInput) {
        const requestAttributes = GetRequestAttributes(handlerInput);

        return handlerInput.responseBuilder
            .speak(requestAttributes.t("CAN_NOT_SKIP_MSG"))
            .withShouldEndSession(true)
            .getResponse();
    }
};

export const PreviousIntentHandler: RequestHandler = {
    canHandle(handlerInput) {
        return IsIntent(handlerInput, "AMAZON.PreviousIntent");
    },
    handle(handlerInput) {
        const requestAttributes = GetRequestAttributes(handlerInput);

        return handlerInput.responseBuilder
            .speak(requestAttributes.t("CAN_NOT_SKIP_MSG"))
            .withShouldEndSession(true)
            .getResponse();
    }
};

export const ResumeIntentHandler: RequestHandler = {
    canHandle(handlerInput) {
        return IsIntent(handlerInput, "AMAZON.ResumeIntent");
    },
    handle(handlerInput) {
        const requestAttributes = GetRequestAttributes(handlerInput);

        const radio = Radio.for(Station.KissFM); // currently hardcoded station

        return audio.play(radio.url, 0, requestAttributes.t("WELCOME_MSG", radio.name), radio.card);
    }
};

export const LoopOnIntentIntentHandler: RequestHandler = {
    canHandle(handlerInput) {
        return IsIntent(handlerInput, "AMAZON.LoopOnIntent");
    },
    handle(handlerInput) {
        return StartOverIntentHandler.handle(handlerInput);
    }
};

export const LoopOffIntentHandler: RequestHandler = {
    canHandle(handlerInput) {
        return IsIntent(handlerInput, "AMAZON.LoopOffIntent");
    },
    handle(handlerInput) {
        return StartOverIntentHandler.handle(handlerInput);
    }
};

export const ShuffleOnIntentHandler: RequestHandler = {
    canHandle(handlerInput) {
        return IsIntent(handlerInput, "AMAZON.ShuffleOnIntent");
    },
    handle(handlerInput) {
        return StartOverIntentHandler.handle(handlerInput);
    }
};

export const ShuffleOffIntentHandler: RequestHandler = {
    canHandle(handlerInput) {
        return IsIntent(handlerInput, "AMAZON.ShuffleOffIntent");
    },
    handle(handlerInput) {
        return StartOverIntentHandler.handle(handlerInput);
    }
};

export const StartOverIntentHandler: RequestHandler = {
    canHandle(handlerInput) {
        return IsIntent(handlerInput, "AMAZON.StartOverIntent");
    },
    handle(handlerInput) {
        const requestAttributes = GetRequestAttributes(handlerInput);

        return handlerInput.responseBuilder
            .speak(requestAttributes.t("NOT_POSSIBLE_MSG"))
            .getResponse();
    }
};

export const CancelAndStopAndPauseIntentHandler: RequestHandler = {
    canHandle(handlerInput) {
        return IsOneOfIntent(handlerInput, "AMAZON.CancelIntent", "AMAZON.StopIntent");
    },
    handle(handlerInput) {
        const requestAttributes = GetRequestAttributes(handlerInput);

        return audio.stop(requestAttributes.t("STOP_MSG"));
    }
};

export const PauseIntentHandler: RequestHandler = {
    canHandle(handlerInput) {
        return IsIntent(handlerInput, "AMAZON.PauseIntent");
    },
    handle(handlerInput) {
        return audio.pause();
    }
};

export const SessionEndedRequestHandler: RequestHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        //any cleanup logic goes here
        return handlerInput.responseBuilder.getResponse();
    }
};

export const SystemExceptionEncounteredIntentHandler: RequestHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'System.ExceptionEncountered';
    },
    handle(handlerInput) {
        console.log("\n******************* EXCEPTION **********************");
        console.log("\n" + JSON.stringify(handlerInput.requestEnvelope, null, 2));

        return handlerInput.responseBuilder
            .getResponse();
    }
};

export const GenericErrorHandler: ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        console.log(`Error handled: ${error.message}`);

        return handlerInput.responseBuilder
            .speak('Sorry, I can\'t understand the command. Please say again.')
            .reprompt('Sorry, I can\'t understand the command. Please say again.')
            .getResponse();
    },
};

export const CheckAudioInterfaceHandler: RequestHandler = {
    canHandle(handlerInput) {
        let result = false;
        try {
            result = (handlerInput.requestEnvelope.context.System.device.supportedInterfaces.AudioPlayer === undefined);
        } catch (e) {
            // system.device or system.device.supportedInterfaces is undefined.
            // this happens when the skill receives audio player event or skill lifecycle events 
        }
        return result;
    },
    handle(handlerInput) {
        return handlerInput.responseBuilder
            .speak("Device not supported")
            .withShouldEndSession(true)
            .getResponse();
    },
};
