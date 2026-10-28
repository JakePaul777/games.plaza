function sendToUnity(method, arg) {
    var tries = 0;
    (function attempt() {
        if (typeof myGameInstance !== 'undefined' && myGameInstance) {
            if (arg === undefined) {
                myGameInstance.SendMessage('RHMAdsManager', method);
            } else {
                myGameInstance.SendMessage('RHMAdsManager', method, arg);
            }
        } else if (tries++ < 200) {
            setTimeout(attempt, 100);
        }
    })();
}

function InitSDKJs() {
    sendToUnity('InitSucceed', '');
    LoadRewardedAdsJs();
}

function CallInterstitialAdsJs() {
    resumeGameAfterAds();
}

function LoadRewardedAdsJs() {
    RewardedAdsLoaded();
}

function CallRewardedAdsJs() {
    RewardSuccessful();
}

function RewardedAdsLoaded()    { sendToUnity('isRewardedAdsLoaded', 'true'); }
function RewardedAdsNotLoaded() { sendToUnity('isRewardedAdsLoaded', 'false'); }
function RewardedAdsDismissed() { sendToUnity('RewardedAdsFailed'); }
function RewardSuccessful()     { sendToUnity('RewardedAdsSuccessfull'); }
function pauseGameBeforeAds()   { sendToUnity('pauseGame'); }
function resumeGameAfterAds()   { sendToUnity('resumeGame'); }