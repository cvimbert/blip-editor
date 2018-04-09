// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: http://codemirror.net/LICENSE

(function(mod) {
    if (typeof exports == "object" && typeof module == "object") // CommonJS
        mod(require("node_modules/codemirror/lib/codemirror"));
    else if (typeof define == "function" && define.amd) // AMD
        define(["node_modules/codemirror/lib/codemirror"], mod);
    else // Plain browser env
        mod(CodeMirror);
})(function(CodeMirror) {
    "use strict";

    console.log(CodeMirror)

    var Pos = CodeMirror.Pos;

    function getHints(cm, options) {
        console.log(cm, options);
    }

    CodeMirror.register("hint", "blip", getHints);
});
