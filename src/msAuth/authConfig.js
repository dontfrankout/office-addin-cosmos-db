import { LogLevel } from "@azure/msal-browser";

// Config object to be passed to Msal on creation

function getRedirectUri() {
  var onHost = window.location.host + window.location.pathname.split(".")[0];
  console.log(onHost)
  let redirectUrl;
  switch (onHost) {
    case "localhost:3000/":
      redirectUrl = "http://localhost:3000";
      break;

    default:
      redirectUrl = `https://${onHost}`;
      break;
  }

  return redirectUrl;
}
export const msalConfig = {
  auth: {
    clientId: "f28f3455-23cf-456c-ba99-6796d28c9281",
    tenantId: "c2a929ef-1d98-4bd7-99d2-9b0e12794038",
    redirectUri: getRedirectUri(),
    authority:
      "https://login.microsoftonline.com/c2a929ef-1d98-4bd7-99d2-9b0e12794038/",
  },

  cache: {
    cacheLocation: "sessionStorage",
  },

  system: {
    loggerOptions: {
      loggerCallback: (level, message, containsPii) => {
        if (containsPii) {
          return;
        }
        switch (level) {
          case LogLevel.Error:
            console.error(message);
            return;
          case LogLevel.Info:
            console.info(message);
            return;
          case LogLevel.Verbose:
            console.debug(message);
            return;
          case LogLevel.Warning:
            console.warn(message);
            return;
          default:
            console.log(message);
            return;
        }
      },
      logLevel: LogLevel.Warning,
    },
  },
};
