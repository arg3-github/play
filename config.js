var requirejs = ({
	shim : {
		' sublinhado ' : {exports :  ' _ ' },
		' jquery.ui ' : {deps : [ ' jquery ' ], exportações :  ' jQuery ' },
		' jquery.scrollto ' : {deps : [ ' jquery ' ], exportações :  ' jQuery ' }
	}
	caminhos : {
		' jquery ' :  ' http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min ' ,
		' jquery.ui ' :  ' http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.23/jquery-ui.min ' ,
		' jquery.scrollto ' :  ' lib / jquery / jquery.scrollTo.min ' ,
		' sublinhado ' :  ' http://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.4.1/underscore-min ' ,
		' nocaute ' : ' http://cdnjs.cloudflare.com/ajax/libs/knockout/2.1.0/knockout-min ' ,

		' text ' :  ' lib / require / text ' ,
		' domready ' :  ' lib / require / domready '
	}
	config : {
		' scm ' : {
			playback : {
				' youtube ' : ' (youtube.com | youtu.be) ' ,
				' soundcloud ' : ' ^ http (s)? \: \ / \ / soundcloud.com ' ,
				" exfm " :  " ^ (*) (http (s)?: //)? (www.)? ex.fm " ,
				' soundmanager ' : ' . * '
			}
			playlist : {
				' youtube ' : ' (youtube.com | youtu.be) ' ,
				' soundcloud ' : ' ^ http (s)? \: \ / \ / soundcloud.com ' ,
				' rss ' : ' . * '
			}
		}
	}
	waitSeconds :  900 ,
	baseUrl :  ' js / '
});

soundManager . preferFlash  =  false ;
soundManager . useHTML5Audio  =  true ;
soundManager . url  =  ' swf / ' ;
soundManager . allowScriptAccess  =  ' sempre ' ;
