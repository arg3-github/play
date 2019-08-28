define ([ ' nocaute ' , ' jquery ' , ' sublinhado ' ], função ( ko , $ ) {
	// Botão de máscara
	ko . bindingHandlers . maskBtn  = {
		init : function ( el , valueAccessor ) {
			opções var =  ko . utils . unwrapObservable ( valueAccessor ());
			_ . padrões (opções, {
				css : null ,
				hasOffset : verdade ,
				alinhar : ' esquerda '
			});
			// botão setup
			var  bgChange  =  function ( pos ) {
				if ( opções . hasOffset  && pos == ' top ' )
					$ ( isso ). removeClass ( opções . css );
				mais {
					$ ( isso ). addClass ( opções . css );
					var left =  parseInt ( $ ( this ). css ( " esquerda " ));
					var right =  parseInt ( $ ( this ). css ( " direita " ));
					var bgx =   opções . alinhar == ' esquerda ' ?  - esquerda : direita + $ ( isso ). largura ();
					$ ( isso ). css ( " backgroundPosition " , ( opções . hasOffset ? bgx : 0 ) +  " px " + pos);
				}
			}
			$ (el)
				. on ( " mousedown " , _ . bind (bgChange, el, ' bottom ' ))
				. on ( " mouseup " , _ . bind (bgChange, el, ' top ' ))
				. on ( " mouseleave " , _ . bind (bgChange, el, ' top ' ));

			ko . utils . domNodeDisposal . addDisposeCallback (el, function () {
				$ (el). off ();
			});
		}
	};
	// hover caption
	ko . bindingHandlers . caption  = {
		init :  function ( el , valueAccessor , allBindingsAccessor ) {
			var options =  allBindingsAccessor (). captionOptions  || {};
			var valor =  ko . utils . unwrapObservable ( valueAccessor ());
			$ (el). data ( ' captionTarget ' , opções . alvo );
			$ (el). data ( ' captionText ' , valor);
			$ (el). dados ( ' originalText ' , $ ( options . target ). text ());
			var  caption  =  function () {
				var target =  $ (el). dados ( ' captionTarget ' );
				$ (alvo). texto ( $ (el). data ( ' captionText ' ));
			}
			var  revert  =  function () {
				var target =  $ (el). dados ( ' captionTarget ' );
				$ (alvo). texto ( $ (el). data ( ' originalText ' ));
			}
			if ( options . trigger == ' hover ' ) {
				$ (el)
					. on ( ' mouseover ' , legenda)
					. em ( ' mouseleave ' , reverter);
			} else  if ( opções . gatilho == ' slide ' ) {
				$ (el)
					. on ( ' slidestart ' , function () {
						legenda ();
						$ (el). em ( ' slide ' , legenda);
					})
					. on ( ' slidestop ' , function () {
						$ (el). off ( ' slide ' , legenda);
						reverter ();
					});
			}
			ko . utils . domNodeDisposal . addDisposeCallback (el, function () {
				$ (el). off ();
			});
		}
		update : function ( el , valueAccessor ) {
			var valor =  ko . utils . unwrapObservable ( valueAccessor ());
			$ (el). data ( ' captionText ' , valor);
		}
	}
	// seeker siga para a esquerda
	ko . bindingHandlers . followLeft  = {
		init :  function ( el , valueAccessor , all ) {
			var $ target =  $ ( ko . utils . unwrapObservable ( valueAccessor ()));
			função  update () {
				$ target . css ( ' esquerda ' , ( $ (el). posição (). esquerda + $ (el). largura () + 15 ) + ' px ' );
			}
			$ (el). dados ( ' followUpdate ' , atualização);
			var interval =  setInterval (atualização, 100 );
			ko . utils . domNodeDisposal . addDisposeCallback (el, function () {
				clearInterval (intervalo);
			});
		}
		update : function ( el ) {
			setTimeout ( $ (el). data ( ' followUpdate ' ), 0 );
		}
	}
	// Volume Slider innerBound
	ko . bindingHandlers . innerBound  = {
		init : function ( el , valueAccessor ) {
			opções var =  ko . utils . unwrapObservable ( valueAccessor ());
			var $ bound =  $ (el). find ( opções . ligado );
			var $ handle =  $ (el). find ( opções . manipular );
			var width =  0 ;
			função  update () {
				if (largura == $ alça . largura ()) return ;
				width =  $ handle . largura ();
				var halfWidth = largura / 2 ;
				$ limite . css ( ' largura ' , $ (el). largura () - $ handle . largura ())
					. css ( ' marginLeft ' , halfWidth)
					. css ( ' marginRight ' , halfWidth);
				$ manipular . css ( ' marginLeft ' , - halfWidth);
			}
			var interval =  setInterval (atualização, 100 );
			ko . utils . domNodeDisposal . addDisposeCallback (el, function () {
				clearInterval (intervalo);
			});
			update ();
		}
	}
	return ko;
});
