
var and_js_goback = function(pager) {
        var browser = navigator.userAgent;
        if(browser == 'And-client-iOS'){
            and_oc_goBack(pager);
        }else{
            window.ecloud.and_oc_goBack(pager);
        }
    };
var and_js_baronload = function(barParam) {
    var browser = navigator.userAgent;
    if(browser == 'And-client-iOS'){
        and_oc_baronload(barParam);
    }else{
        window.ecloud.and_oc_baronload(barParam);
    }
};

var and_js_viewFile = function(urlString,fileName,type) {
    var browser = navigator.userAgent;
    if(browser == 'And-client-iOS'){
        and_oc_viewFile(urlString,fileName,type);
    }else{
        window.ecloud.and_oc_viewFile(urlString,fileName,type);
    }
};

var and_js_openApp_android = function(packagname,classname,param,noCallback) {
    window.ecloud.and_oc_openApp(packagname,classname,param,noCallback);
};

var and_js_openApp_iOS = function(urlString,noCallback) {
    and_oc_openApp(urlString,noCallback);
};

var and_js_openBrowser = function(urlString) {
    var browser = navigator.userAgent;
    if(browser == 'And-client-iOS'){
        and_oc_openBrowser(urlString);
    }else{
        window.ecloud.and_oc_openBrowser(urlString);
    }
};

var and_js_mobileInfo = function(infoCallback) {
    var browser = navigator.userAgent;
    if(browser == 'And-client-iOS'){
        and_oc_mobileInfo(infoCallback);
    }else{
        window.ecloud.and_oc_mobileInfo(infoCallback);
    }
};

var and_js_scanErcode = function(erResultCallback) {
    var browser = navigator.userAgent;
    if(browser == 'And-client-iOS'){
        and_oc_scanErcode(erResultCallback);
    }else{
        window.ecloud.and_oc_scanErcode(erResultCallback);
    }
};

var and_js_chooseContacts = function(chooseContactCallback) {
    var browser = navigator.userAgent;
    if(browser == 'And-client-iOS'){
        and_oc_chooseContacts(chooseContactCallback);
    }else{
        window.ecloud.and_oc_chooseContacts(chooseContactCallback);
    }
};

var and_js_chooseFile = function(chooseFilePathCallback) {
    var browser = navigator.userAgent;
    if(browser == 'And-client-iOS'){
        and_oc_chooseFile(chooseFilePathCallback);
    }else{
        window.ecloud.and_oc_chooseFile(chooseFilePathCallback);
    }
};

var and_js_fileUpload = function(filePath,uploadResultPathCallback) {
    var browser = navigator.userAgent;
    if(browser == 'And-client-iOS'){
        and_oc_fileUpload(filePath,uploadResultPathCallback);
    }else{
        window.ecloud.and_oc_fileUpload(filePath,uploadResultPathCallback);
    }
};

var and_js_awakeIMChat = function(userId) {
    var browser = navigator.userAgent;
    if(browser == 'And-client-iOS'){
        and_oc_awakeIMChat(userId);
    }else{
        window.ecloud.and_oc_awakeIMChat(userId);
    }
};
