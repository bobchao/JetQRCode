/* JetQRCode 0.4.2pre
 * See http://www.bobchao.net/jetqrcode for more information.
 */

const sURLapi = {"is.gd":"http://is.gd/api.php?longurl=", "tinyurl.com":"http://tinyurl.com/api-create.php?url="};
const ICONS = {
	warning : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH1gIQDictt+6SdwAAAehJREFUOMuVk8FKG2EUhb87mc40iTODEJlK7UZDxCCGQUqaMASCSGODdBe6ECJddOcwG/EJXBt0ZcBCwEVJVgWtr1AIPoBQXAQKhRZc1EBJMX831hLItPbAvYvL4Ttnc4UIhfDIgLcAA3jdgC/jfHoUwISjeXgOcAFHQHWcT4tI91KwWlhY0J6kUloKVkPw7g0wYS8NemJ3l0yzSRp0E/buBQihOAXFbLksej6Pns+TLZdlCoohFPmXdqB7AsNep6M8z1Oe56lep6NOYLgD3b82CGHFhaWM74vh+ziOg+M4GL5PxvfFhaUQViIBJuxnwUgEAaJpWJaFZVmIppEIArJgmLA/FhDC+jSk5woFjFIJEcG2bWzbRkQwSiXmCgWmIR3C+gggBDGgsXibruk6IvKngQiarpMIAhbBMKARgsDtCuHVLLReLC8bk2dnEIuhlKLf7wOQTCYREbi54WptjQ/n54NLqDfgnYQQewxXT8GaPz7mYbWKUgqlFLVaDYB2u42IICL8OD3lYmODLnz/DJOawGYczJlcjnilcmcUEVzXxXXdkVu8UmEmlyMOpsCmbMPXl5CaPThgol6/S/89wAhARLhutbjc2uI9fJNDGD4DecD/6SfwEZT+CQ4H8GYi4i+idA3DHjR/AZfefQgctOETAAAAAElFTkSuQmCC",
	qrcode : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAAA3NCSVQICAjb4U/gAAACy0lEQVQokU2QT0jycBzGv0uLYsKEqOWCVv4ag4xi1EKI16JDEf1BPDg8RhgYhEJQ0CEISuoQGkirBRGFUo0gPNShkKgOUrBFhzTolHQQIUnWQYTWYbwv73N9PjwPz2MiCKKvr4+maZqmq6urJUkqlUoDAwOKoqRSqc3NTUVROjs7DeDr68vc1dW1sbFxc3NDkuT397eu66Ojo8Vi8fn5GQAAIBgM4jiez+cHBwcXFxdNRvDS0lIul+M4zmKxHBwchMPh3d1dr9er67qmaZIkxeNxhNDb21sVAJAkyXEcy7IAgGFYXV2dz+fr7+93u91GCcuyHMeRJAkAGEIoGAwaxu3trSAIGIZ1dHQAwMvLi67rJycnLpfLALa2tjBZlnVdN7IBwOl03t3dRSKRQCDQ1tbW3t6eTqcBwGAAALPZbABAUdT19fXx8TFBEPv7+zzPMwzT09NzdnY2NzcXCoWy2ez4+Hgul6vSdZ2iqNXV1VKp9PHxEYlEHh4e7u/vAWB6erq1tdXn8zEM43K5VlZWGhsbsWg0WiwW/X7/2tpafX293W7f3t5OJBIAMDY2ZrVaA4FAuVwWRTEUCgEAxvO8x+P5/Px8fHwUBCGRSMzMzEiSBADz8/PxePz09HR2dra3t7dcLrvdbkyWZfhPTqdzb29vamoKAGpraz0ez+HhYTabXV5enpiYyGQyJkVRHA6Hpmmapl1cXFitVkEQRFFUVTWZTCaTSYZhfn5+dnZ2RkZGEEJmiqJwHI/FYizLGn+bzWaSJNfX10VRRAj9mxSLxSqVShUA5PN5VVVfX1+NvycnJ3Ec93q9DodDVdVMJsMwTENDQ3d3dyqVMtE07ff7EUJDQ0OVSsVisVxeXjY3N19dXb2/vyOEampqWlpa7HZ7OBw+Pz8HgiD+/BVCSJZlnuej0WhTU5PNZisUCgsLC8PDw+l0+ujo6Onp6Rc06DMaoTB5rgAAAABJRU5ErkJggg==",
	info : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QAAAAAAAD5Q7t/AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH1QMCBiAyOlCc9wAAADV0RVh0Q29tbWVudAAoYykgMjAwNCBKYWt1YiBTdGVpbmVyCgpDcmVhdGVkIHdpdGggVGhlIEdJTVCQ2YtvAAACq0lEQVQ4y5WSS0hUcRTGv//cO+O9OtdHJllqZlI+CEUiE8ShBiXUpKKQbGLKcGG0CBOyRcsQMapFj02ii4igAgMDJcgQSXQmSkrNijSVTJ1xdJy5d6739W/loDURfqtz4Pt+nHM4BBFUXNnUTCkcBiUpIISYiDHLEPq0/2Vr459edn1TVN6UwTCk72JtZVq5vQBxAg9VN+DxBVN7ej9cISbmLKV6SX9X69eIAJYlb++11G/fk7ljLBBSRmd9khJaVVlF06NtJflZ6enJe1tuPXYBiF/LMGtFSdXV2/Xnj5YVH8z5rKi6m7eYFQBEpyCqTg3vSmiWi+YQzXM7dSYlc3L8bScAmMIkhj1Xbi9AIKSOsSxDLWbGIIRQUBiabiiUwuganOwuKswBw3Kn1nJhwKpC4wUrD1nRV1XNSDQzpguJsZxzV7LgyN+91QElkDrlEf08zyEgqVxtXYNpww0IIUTRdEiyajIMKiZYo+D1Sy5RCjErQUkbnpaGFUU3qaqxFuEBiGFADM9KXl8gRpRVy4qk+jOSYzH6w/deVHQ6tyQp7m+LHsFqSfD6g4gTeLWjrVncsIKZ0QZ63gyDj2JzJ34tiwDw0yfqHye8/t7hmYUlUTZX7E+rGHKNwcph4q8bbBNCxzu7+uWZ6fnstCTroWvtAzfPHM665P4yH2JYkui0Z1X7F5dy3IMjqsD6SsOrr/+DY6cbq2QqPC8rLbIUHshGNM9B1XX4lkUMucbxzjWixXHS5SftNx5EBABAbV1DYohucQVkpDtOJDGEACwLdHXPBRnNv6+j7c4U/qeaGrvV6bRRz2IfFWUX/T75jDqdNhrJy/6DoQLA/bsPkZ2bjempaWxaTqeNzsy+MgLSEP00+sLY7AQAUFV98nqNIMQfWVhYeJ2XF/sokuk3Vkw2XnyKHQQAAAAASUVORK5CYII=",
}
const MSGTYPE = {
	warning : {
		icon: ICONS.warning,
		color: "#FFF",
	},
	infomation : {
		icon: ICONS.info,
		color: "#CCC",
	},
}
const FULLSCREENSTYLE = "top:0;bottom:0;left:0;right:0;margin:0;padding:0;border:0;";
var manifest = { settings: [
	{ name: "choe", type: "member", label: "Output encoding", set: ["UTF-8", "Shift_JIS", "ISO-8859-1"], default: "UTF-8" },
	{ name: "chs", type: "range", label: "Image size", min: 0, max: 7, default: 4 },
	{ name: "telPrefixEnale", type: "boolean", label: "Add \"TEL:\" prefix to numberic QRCode", default: false },
	{ name: "shorturl", type: "group", label: "Shorten",
	  settings: [
		{ name: "enable", type: "boolean", label: "Shorten the URL", default: false },
		{ name: "api", type: "member", label: "Service provider", set: ["is.gd", "tinyurl.com"], default: "is.gd" }
	  ]
	}
]};
jetpack.future.import("storage.settings");
set = jetpack.storage.settings;
choe = set.choe;
chs = 150+set.chs*50;


/*
 	o = {
 		qrcode_url: 'http://chart.apis.google.com/chart?cht=qr&choe='+choe+'&chs='+chs+'x'+chs+'&chl='+text,
		buttons :[
			{label: "Button Label", command: function(){console.log('pressed!');} },
		],
 		msg :[
			type: "warning",
			text: "This QRCode might not be able to decoded by mobile devices.", 
		],
 */
function showLightbox(o){
	var $tabd = $(jetpack.tabs.focused.contentDocument);
	$tabd.find("#jetqrcode_insert_div").remove(); //沒有也沒關係！

	var $hiddenObjs = $tabd.find("object:visible, embed:visible, applet:visible").hide();

	var $lightbox = $tabd.find("body").append('<div id="jetqrcode_insert_div" style="z-index:50000;position:fixed;'+FULLSCREENSTYLE+'"><div id="jetqrcode_click2close" style="z-index:-1;background:rgba(0,0,0,.8);position:absolute;'+FULLSCREENSTYLE+'"></div><img src="'+o.qrcode_url+'" style="position:absolute;top:50%;left:50%;margin-top:-'+(chs/2)+'px;margin-left:-'+(chs/2)+'px;"></div>').find("#jetqrcode_insert_div");

	if (typeof o.buttons != 'undifined') {
		$buttonlive = $lightbox.append('<div id="jetqrcode_buttons" style="position:absolute;top:50%;text-align:center;overflow:hidden;margin-top:'+(chs/2+25)+'px;"></div>').find("#jetqrcode_buttons");
		for (btn in o.buttons) 	$buttonlive.append($($tabd[0].createElement("button")).html(o.buttons[btn].label).click(o.buttons[btn].command)); 
	}

	if (typeof o.msg != 'undifined') $lightbox.append('<div style="position:absolute;top:50%;width:100%;text-align:center;margin-top:'+(chs/2+5)+'px;color: '+MSGTYPE[o.msg.type].color+'; font-size:14px;"><img src="'+MSGTYPE[o.msg.type].icon+'"/> '+o.msg.text+'</div>');

	$lightbox.find("#jetqrcode_click2close").click(function(){
		$lightbox.remove();
		$hiddenObjs.show();
	});
}

jetpack.statusBar.append({
	html: '<div style="position:absolute;'+FULLSCREENSTYLE+'background:url('+ICONS.qrcode+') transparent center center no-repeat;"/>',
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
