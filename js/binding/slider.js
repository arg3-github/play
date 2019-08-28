define ([ ' nocaute ' , ' jquery ' , ' jquery.ui ' ], função ( ko , $ ) {
	ko . bindingHandlers . slider  = {
		// wrapper para o controle deslizante jquery ui
		init :  function ( el , valueAccessor , allBindingsAccessor ) {
			var options =  allBindingsAccessor (). sliderOptions  || {};
			// inicializa o controle
			$ (el). controle deslizante (opções);

			// manipula o valor que muda na interface do usuário
			var observable =  valueAccessor ();
			var  setObservable  =  function () {
				var sliderValue =  $ (el). slider ( " valor " );
				var step =  opções . passo ;
				se ( Math . redonda (sliderValue / step) ! =  Math . redonda ( observável () / etapa))
					observável (sliderValue);
			}
			if ( opções . liveUpdate )
				ko . utils . registerEventHandler (el, " slide " , _ . throttle (setObservable, 50 ));
			ko . utils . registerEventHandler (el, " slidechange " , setObservable);

			if ( opções . pauseable ) {
				ko . utils . registerEventHandler (el, " slidestart " , function () {
					observável . pausa ();
				});
				ko . utils . registerEventHandler (el, " slidestop " , function () {
					setTimeout ( function () {
						observável . resume ();
					}, 0 );
				});
			}

			// manipula a eliminação (se o KO remover pela ligação do template)
			ko . utils . domNodeDisposal . addDisposeCallback (el, function () {
				$ (el). controle deslizante ( " destruir " );
			});
		}
		// manipula o valor do modelo mudando
		update :  function ( el , valueAccessor ) {
			var value =  valueAccessor ();
			$ (el). slider ( " valor " , ko . utils . unwrapObservable (valor));   
		}
	};
	return ko;
});
