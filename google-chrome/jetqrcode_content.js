/* JetQRCode for Google Chrome 0.0.1
 * (based on JetQRCode 0.4)
 * See http://www.bobchao.net/jetqrcode for more information.

This is a demo about porting Mozilla Labs Jetpack scripts to Google Chrome.
Here's what I learned:

0. You have to break everything into several parts, like manifest.json, content_script.js / background.html, options.html, to make things work in Google Chrome.

1. Jetpack is highly related to jQuery. To make life easier, you may want to insert jQuery as content script.

2. Do httprequest in background html, and pass the result to content if needed.
http://code.google.com/chrome/extensions/messaging.html

3. You have to make a HTML page for user to set preferences, and storage the values in LocalStorage. (But you can't get the setting value in content script, pass them from background html if needed.) 
http://code.google.com/chrome/extensions/options.html
https://groups.google.com/group/chromium-extensions/browse_thread/thread/a893083203009e73/158ce985911397b1?lnk=raot

4. There's no APIs for context menu in Google Chrome yet.
http://dev.chromium.org/developers/design-documents/extensions/gleam-api

5. There's only one data type in LocalStorage: string. Be careful if you're trying to use boolean or integer in it.

IMO, extension APIs in Google Chrome is more complete (though way more complex) than Jetpack, since Jetpack is still in early stage. Porting things between the two framework is not as easy as I thought before, and need creativity to conquer the difference. But anyway, creating an extension in either Google Chrome or Jetpack is simpler then in Firefox, which results more productivity.

*/

(function (){
var $hiddenObjs = $("object:visible, embed:visible, applet:visible");
var set;
chrome.extension.sendRequest({request: "settings"}, function(response) {
  set = response;
});

function jetqrcode_removeDiv(){
	$("#jetqrcode_insert_div").remove();
}

function jetqrcode_displayQRCode(text){
	jetqrcode_removeDiv();
	var chs = 150+set.chs*50;
	var choe = set.choe;
	var $tabd = $(document);

	$hiddenObjs.hide();
	$tabd.find("body").append('<div title="Click to close" id="jetqrcode_insert_div" style="z-index:50000;margin:0;padding:0;border:0;position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,.8)"><img src="http://chart.apis.google.com/chart?cht=qr&choe='+choe+'&chs='+chs+'x'+chs+'&chl='+text+'" style="position:absolute;top:50%;left:50%;margin-top:-'+(chs/2)+'px;margin-left:-'+(chs/2)+'px;"></div>');
	
	if (text.length>350) $tabd.find("#jetqrcode_insert_div").append('<div style="position:absolute;top:50%;width:100%;text-align:center;margin-top:'+(chs/2+10)+'px;color: white; font-size:14px;"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH1gIQDictt+6SdwAAAehJREFUOMuVk8FKG2EUhb87mc40iTODEJlK7UZDxCCGQUqaMASCSGODdBe6ECJddOcwG/EJXBt0ZcBCwEVJVgWtr1AIPoBQXAQKhRZc1EBJMX831hLItPbAvYvL4Ttnc4UIhfDIgLcAA3jdgC/jfHoUwISjeXgOcAFHQHWcT4tI91KwWlhY0J6kUloKVkPw7g0wYS8NemJ3l0yzSRp0E/buBQihOAXFbLksej6Pns+TLZdlCoohFPmXdqB7AsNep6M8z1Oe56lep6NOYLgD3b82CGHFhaWM74vh+ziOg+M4GL5PxvfFhaUQViIBJuxnwUgEAaJpWJaFZVmIppEIArJgmLA/FhDC+jSk5woFjFIJEcG2bWzbRkQwSiXmCgWmIR3C+gggBDGgsXibruk6IvKngQiarpMIAhbBMKARgsDtCuHVLLReLC8bk2dnEIuhlKLf7wOQTCYREbi54WptjQ/n54NLqDfgnYQQewxXT8GaPz7mYbWKUgqlFLVaDYB2u42IICL8OD3lYmODLnz/DJOawGYczJlcjnilcmcUEVzXxXXdkVu8UmEmlyMOpsCmbMPXl5CaPThgol6/S/89wAhARLhutbjc2uI9fJNDGD4DecD/6SfwEZT+CQ4H8GYi4i+idA3DHjR/AZfefQgctOETAAAAAElFTkSuQmCC"/> This QRCode might not be able to decoded by mobile devices.</div>');

	$tabd.find("#jetqrcode_insert_div").click(function(){
		jetqrcode_removeDiv();
		$hiddenObjs.show();
	});
}

chrome.extension.onRequest.addListener(
	function (msg) {
		switch (msg.request){
			case "show":
				var url = window.location.href;
				if ((set['shorturlenable']=="true")) {
					chrome.extension.sendRequest({request: "shorturl", url: url}, function(response) {
						jetqrcode_displayQRCode(encodeURIComponent(response.url));
					});
				} else jetqrcode_displayQRCode(encodeURIComponent(url));
				break;
			case "hide":
				jetqrcode_removeDiv();
				$hiddenObjs.show();
				break;
		}
	}
);

})();
