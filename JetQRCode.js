/* JetQRCode 0.4.2pre
 * See http://www.bobchao.net/jetqrcode for more information.
 */

const sURLapi = {"is.gd":"http://is.gd/api.php?longurl=", "tinyurl.com":"http://tinyurl.com/api-create.php?url="};

if (typeof(Cc) == 'undefined') set = {chs: 4, choe: "UTF-8", shorturl: {enable: false, api: "is.gd" } }; //Temporarily workaround for Firefox 3.6 + Jetpack 0.6.x in Linux
else {
	var manifest = { settings: [
		{
			name: "shorturl", type: "group", label: "Shorten",
			settings: [
				{ name: "enable", type: "boolean", label: "Shorten the URL", default: false },
				{ name: "api", type: "member", label: "Service provider", set: ["is.gd", "tinyurl.com"], default: "is.gd" }
			]
		},
		{ name: "choe", type: "member", label: "Output encoding", set: ["UTF-8", "Shift_JIS", "ISO-8859-1"], default: "UTF-8" },
		{ name: "chs", type: "range", label: "Image size", min: 0, max: 7, default: 4 }
	]};
	jetpack.future.import("storage.settings");
	set = jetpack.storage.settings;
}

function removeJetQRCodeDiv(){
	$(jetpack.tabs.focused.contentDocument).find("#jetqrcode_insert_div").remove();
}

function displayQRCode(text){
	removeJetQRCodeDiv();
	var chs = 150+set.chs*50;
	var choe = set.choe;
	var tab = jetpack.tabs.focused;
	var $tabd = $(tab.contentDocument);
	
	var $hiddenObjs = $tabd.find("object:visible, embed:visible, applet:visible").hide();
	$tabd.find("body").append('<div title="Click to close" id="jetqrcode_insert_div" style="z-index:50000;margin:0;padding:0;border:0;position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,.8)"><img src="http://chart.apis.google.com/chart?cht=qr&choe='+choe+'&chs='+chs+'x'+chs+'&chl='+text+'" style="position:absolute;top:50%;left:50%;margin-top:-'+(chs/2)+'px;margin-left:-'+(chs/2)+'px;"></div>');
	
	if (text.length>350) $tabd.find("#jetqrcode_insert_div").append('<div style="position:absolute;top:50%;width:100%;text-align:center;margin-top:'+(chs/2+10)+'px;color: white; font-size:14px;"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH1gIQDictt+6SdwAAAehJREFUOMuVk8FKG2EUhb87mc40iTODEJlK7UZDxCCGQUqaMASCSGODdBe6ECJddOcwG/EJXBt0ZcBCwEVJVgWtr1AIPoBQXAQKhRZc1EBJMX831hLItPbAvYvL4Ttnc4UIhfDIgLcAA3jdgC/jfHoUwISjeXgOcAFHQHWcT4tI91KwWlhY0J6kUloKVkPw7g0wYS8NemJ3l0yzSRp0E/buBQihOAXFbLksej6Pns+TLZdlCoohFPmXdqB7AsNep6M8z1Oe56lep6NOYLgD3b82CGHFhaWM74vh+ziOg+M4GL5PxvfFhaUQViIBJuxnwUgEAaJpWJaFZVmIppEIArJgmLA/FhDC+jSk5woFjFIJEcG2bWzbRkQwSiXmCgWmIR3C+gggBDGgsXibruk6IvKngQiarpMIAhbBMKARgsDtCuHVLLReLC8bk2dnEIuhlKLf7wOQTCYREbi54WptjQ/n54NLqDfgnYQQewxXT8GaPz7mYbWKUgqlFLVaDYB2u42IICL8OD3lYmODLnz/DJOawGYczJlcjnilcmcUEVzXxXXdkVu8UmEmlyMOpsCmbMPXl5CaPThgol6/S/89wAhARLhutbjc2uI9fJNDGD4DecD/6SfwEZT+CQ4H8GYi4i+idA3DHjR/AZfefQgctOETAAAAAElFTkSuQmCC"/> This QRCode might not be able to decoded by mobile devices.</div>');

	$tabd.find("#jetqrcode_insert_div").click(function(){
		removeJetQRCodeDiv();
		$hiddenObjs.show();
	});
}

jetpack.statusBar.append({
	html: '<div style="position:absolute;top:0;left:0;right:0;bottom:0;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAAA3NCSVQICAjb4U/gAAACy0lEQVQokU2QT0jycBzGv0uLYsKEqOWCVv4ag4xi1EKI16JDEf1BPDg8RhgYhEJQ0CEISuoQGkirBRGFUo0gPNShkKgOUrBFhzTolHQQIUnWQYTWYbwv73N9PjwPz2MiCKKvr4+maZqmq6urJUkqlUoDAwOKoqRSqc3NTUVROjs7DeDr68vc1dW1sbFxc3NDkuT397eu66Ojo8Vi8fn5GQAAIBgM4jiez+cHBwcXFxdNRvDS0lIul+M4zmKxHBwchMPh3d1dr9er67qmaZIkxeNxhNDb21sVAJAkyXEcy7IAgGFYXV2dz+fr7+93u91GCcuyHMeRJAkAGEIoGAwaxu3trSAIGIZ1dHQAwMvLi67rJycnLpfLALa2tjBZlnVdN7IBwOl03t3dRSKRQCDQ1tbW3t6eTqcBwGAAALPZbABAUdT19fXx8TFBEPv7+zzPMwzT09NzdnY2NzcXCoWy2ez4+Hgul6vSdZ2iqNXV1VKp9PHxEYlEHh4e7u/vAWB6erq1tdXn8zEM43K5VlZWGhsbsWg0WiwW/X7/2tpafX293W7f3t5OJBIAMDY2ZrVaA4FAuVwWRTEUCgEAxvO8x+P5/Px8fHwUBCGRSMzMzEiSBADz8/PxePz09HR2dra3t7dcLrvdbkyWZfhPTqdzb29vamoKAGpraz0ez+HhYTabXV5enpiYyGQyJkVRHA6Hpmmapl1cXFitVkEQRFFUVTWZTCaTSYZhfn5+dnZ2RkZGEEJmiqJwHI/FYizLGn+bzWaSJNfX10VRRAj9mxSLxSqVShUA5PN5VVVfX1+NvycnJ3Ec93q9DodDVdVMJsMwTENDQ3d3dyqVMtE07ff7EUJDQ0OVSsVisVxeXjY3N19dXb2/vyOEampqWlpa7HZ7OBw+Pz8HgiD+/BVCSJZlnuej0WhTU5PNZisUCgsLC8PDw+l0+ujo6Onp6Rc06DMaoTB5rgAAAABJRU5ErkJggg==) transparent center center no-repeat;"/>',
	width: 30,
	onReady: function(doc) {
		$(doc).find("div").click(function(){
			var api, url=encodeURIComponent(jetpack.tabs.focused.contentWindow.location.href);
			if (set.shorturl.enable) $.get(sURLapi[set.shorturl.api]+url, function(data, textStatus){
					if (textStatus == "success") url = data;
					displayQRCode(url);
			});
			else displayQRCode(url);
		});
	}
});

jetpack.future.import("menu");
jetpack.future.import("selection");
jetpack.menu.context.page.insertBefore(function(target)({
	label: "Get QRCode",
	command: function(){
		displayQRCode(encodeURIComponent(jetpack.selection.text));
	}
}), 'context-searchselect');
