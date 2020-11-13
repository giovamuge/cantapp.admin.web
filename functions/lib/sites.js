"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
exports.privacyAndPolicy = functions.https.onRequest((req, res) => {
    // append privacy policy
    const privacy = '<a href="https://www.iubenda.com/privacy-policy/41575403" ' +
        'class="iubenda-white no-brand iubenda-embed iub-body-embed" ' +
        'title="Privacy Policy">Privacy Policy</a><script type="text/javascript">' +
        '(function (w,d) {var loader = function () {var s = d.createElement("script"),' +
        'tag = d.getElementsByTagName("script")[0]; s.src="https://cdn.iubenda.com/iubenda.js";' +
        ' tag.parentNode.insertBefore(s,tag);}; if(w.addEventListener)' +
        '{w.addEventListener("load", loader, false);}else if(w.attachEvent){w.attachEvent("onload", loader);' +
        '}else{w.onload = loader;}})(window, document);</script>';
    // append coockie policy
    const coockies = '<a href="https://www.iubenda.com/privacy-policy/41575403/cookie-policy"' +
        ' class="iubenda-white no-brand iubenda-embed iub-body-embed" ' +
        'title="Cookie Policy">Cookie Policy</a><script type="text/javascript">' +
        '(function (w,d) {var loader = function () {var s = d.createElement("script"), ' +
        'tag = d.getElementsByTagName("script")[0]; s.src="https://cdn.iubenda.com/iubenda.js";' +
        ' tag.parentNode.insertBefore(s,tag);}; if(w.addEventListener){w.addEventListener("load", loader, false);' +
        '}else if(w.attachEvent){w.attachEvent("onload", loader);}else{w.onload = loader;}})(window, document);</script>';
    res.status(200).send(privacy + coockies);
});
//# sourceMappingURL=sites.js.map