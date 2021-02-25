//https://docs.microsoft.com/en-us/azure/active-directory/develop/msal-error-handling-js

export default async function getMsToken(instance, accounts, inProgress, scope) {

  let request = {
    account: accounts[0],
    scopes: scope,
    forceRefresh: false,
  }

  return instance.acquireTokenSilent(request).then(function (response) {
        return response
    }).catch( function (error) {
        // call acquireTokenPopup in case of acquireTokenSilent failure
        // due to consent or interaction required
        if (error.errorCode === "consent_required"
        || error.errorCode === "interaction_required"
        || error.errorCode === "login_required") {
          instance.acquireTokenPopup(request).then(
                function (response) {
                  return response
                }).catch(function (error) {
                    console.error(error);
                });
        }
    });
  }
