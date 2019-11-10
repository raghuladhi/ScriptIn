//Controls the Message Sending/Receiving Process in Extension.
var MessageController = (function() {
        var MESSAGES = {
                TAB_FAILURE: "Unable to Fetch Current Tab",
                MSG_FAILURE: "Unable to Send Message"
        };
        var FROM_EXTENSION = "FROM_SCRIPTIN_EXTENSION";

        //Retrieve Promise to current tab id.
        var getCurrentTabId = function() {
                //since chrome API is async.
                var dfd = new Deferred();
                
                //callback function to the getCurrent Method.
                var callback = function(tabs) {
                        //always an array is returned.
                        if (tabs.length) {
                                var tab = tabs[0];
                                var id = tab.id;
                                dfd.resolve(id);
                        } else {
                                dfd.reject(MESSAGES.TAB_FAILURE);
                        }
                };
    
                //Retrieve current tab.
                var query = { active: true, currentWindow: true };
                chrome.tabs.query(query, callback);
                
                return dfd.promise();
        };

        //Send Message to the Content Script.
        var sendMessage = function(data) {
                //Fetch Tab Id - Promise
                var tabId = getCurrentTabId();
                tabId.then( function(id) {
                        //Message object to be sent.
                        var message = {
                                data: data,
                                type: FROM_EXTENSION
                        };

                        //Chrome API
                        chrome.tabs.sendMessage(id, message);
                }, function(err) {
                        //Error in getting tab.
                        console.log(MESSAGES.MSG_FAILURE + "\n" + err);
                });
        };
        
        return { 
                sendMessage: sendMessage
        }
})();
                
                
