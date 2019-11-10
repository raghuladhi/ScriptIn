
//Script which gets added to the website once the website loads.
var ContentScript = (function(window){

        var FROM_EXTENSION = "FROM_SCRIPTIN_EXTENSION";
        var SCRIPT = "script";

        //Function executed when message is received from extension.
        var processMessage = function(message) {
                //For Verifying Purpose - To Process messages from this extension only.
                if(message.type && message.type == FROM_EXTENSION) {
                        var data = message.data;
                        var script = data.script;
                        //Append code to document and remove it.
                        var scriptNode = document.createElement(SCRIPT);
                        scriptNode.textContent = script;
                        (document.head||document.documentElement).appendChild(scriptNode);
                        scriptNode.remove();
                }
        }

        //Listen All Messages.
        chrome.runtime.onMessage.addListener(processMessage);

})();
