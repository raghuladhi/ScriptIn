var Popup = (function(MessageController) {
        var ID = {
                EXECUTE_BUTTON: "execute-btn",
                SCRIPT: "script",
                TYPE: "type"
        };
        var EVENT = {
                CLICK: "click"
        };
        var TYPE = {
                SCRIPT: "Script",
                LOG: "Log"
        };

        var executeButton = document.getElementById(ID.EXECUTE_BUTTON);

        //process submit
        var executeCode = function() {
                var handlers = {
                        'Script': function(script) {
                                return "(function(){" + script + "})();";
                        },
                        'Log': function(script) {
                                return "(function(){console.log(" + script + ");})();";
                        }
                }
                var script = document.getElementById(ID.SCRIPT).value;
                var type = document.getElementById(ID.TYPE).value;
                var data = {};
                if(!script) {
                        //TO DO: handle empty click case.
                        return;
                }
                script = handlers[type](script);
                data.script = script;
                MessageController.sendMessage(data);
        };
        
        //Event Listener
        executeButton.addEventListener(EVENT.CLICK, executeCode);

})(MessageController);
