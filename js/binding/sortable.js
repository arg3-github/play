// knockout-sortable 0.6.0 | (c) 2012 Ryan Niemeyer | http://www.opensource.org/licenses/mit-license
define ([ ' nocaute ' , ' jquery ' , ' jquery.ui ' ], função ( ko , $ ) {
    var  ITEMKEY  =  " ko_sortItem " ,
        LISTKEY  =  " ko_sortList " ,
        PARENTKEY  =  " ko_parentList " ,
        DRAGKEY  =  " ko_dragItem " ;

    // internal afterRender que adiciona metadados a crianças
    var  addMetaDataAfterRender  =  function ( elementos , dados ) {
        ko . utils . arrayForEach (elementos, função ( elemento ) {
            if ( elemento . nodeType  ===  1 ) {
                ko . utils . domData . set (elemento, ITEMKEY , dados);
                ko . utils . domData . set (elemento, PARENTKEY , ko . utils . domData . get ( elemento . parentNode , LISTKEY ));
            }
        });
    };

    // prepare as opções adequadas para o binding de template
    var  prepareTemplateOptions  =  function ( valueAccessor , dataName ) {
        var result = {},
            opções =  ko . utils . unwrapObservable ( valueAccessor ()),
            actualAfterRender;

        // construa nossas opções para passar para o mecanismo de modelo
        if ( opções . dados ) {
            result [dataName] =  opções . dados ;
            resultado . nome  =  opções . template ;
        } mais {
            resultado [dataName] =  valueAccessor ();
        }

        ko . utils . arrayForEach ([ " afterAdd " , " afterRender " , " beforeRemove " , " includeDestroyed " , " templateEngine " , " templateOptions " ], função ( opção ) {
            resultado [opção] = opções [opção] ||  ko . bindingHandlers . classificável [opção];
        });

        // use uma função afterRender para adicionar metadados
        if (dataName ===  " foreach " ) {
            if ( resultado . afterRender ) {
                // quebra a função existente, se ela foi passada
                actualAfterRender =  resultado . afterRender ;
                resultado . afterRender  =  function ( elemento , dados ) {
                    addMetaDataAfterRender . chamada (dados, elemento, dados);
                    realAfterRender . chamada (dados, elemento, dados);
                };
            } mais {
                resultado . afterRender  = addMetaDataAfterRender;
            }
        }

        // retorna opções para passar para a ligação do template
        resultado de retorno ;
    };

    // conecta itens com observableArrays
    ko . bindingHandlers . classificável  = {
        init :  function ( elemento , valueAccessor , allBindingsAccessor , data , context ) {
            var $ element =  $ (elemento),
                valor =  ko . utils . unwrapObservable ( valueAccessor ()) || {}
                templateOptions =  prepareTemplateOptions (valueAccessor, " foreach " ),
                classificável = {},
                startActual, updateActual;

            // remove nós de texto iniciais / finais de modelos anônimos
            ko . utils . arrayForEach ( elemento . childNodes , function ( node ) {
                if (node &&  node . nodeType  ===  3 ) {
                    nó . parentNode . removeChild (nó);
                }
            });

            // constrói um novo objeto que possui as opções globais com substituições da ligação
            $ . extend ( true , sortable, ko . bindingHandlers . classificável );
            if ( valor . opções  &&  sortable . opções ) {
                ko . utils . extend ( sortable . opções , valor . opções );
                 valor de exclusão . opções ;
            }
            ko . utils . extend (sortable, value);

            // se allowDrop é um observável ou uma função, então execute-o em um observável computado
            if ( classificável . connectClass  && ( ko . isObservable ( classificável . allowDrop ) ||  tipo de  classificável . allowDrop  ==  " function " )) {
                ko . computed ({
                    leia :  function () {
                        var valor =  ko . utils . unwrapObservable ( classificável . allowDrop ),
                            shouldAdd =  tipo de valor ==  " função "  ?  valor . call ( this , templateOptions . foreach ) : valor;
                        ko . utils . toggleDomNodeCssClass (elemento, classificável . connectClass , shouldAdd);
                    }
                    disposeWhenNodeIsRemoved : elemento
                }, isto );
            } mais {
                ko . utils . toggleDomNodeCssClass (elemento, classificável . connectClass , sortable . allowDrop );
            }

            // quebra a ligação do template
            ko . bindingHandlers . modelo . init (elemento, função () { return templateOptions;}, allBindingsAccessor, dados, contexto);

            // mantém uma referência para iniciar / atualizar funções que possam ter sido passadas
            startActual =  classificável . opções . começar ;
            updateActual =  classificável . opções . atualização ;

            // inicializa a ligação classificável após a associação do modelo ter sido renderizada na função update
            setTimeout ( function () {
                var dragItem;
                elemento $ . classificável ( ko . utils . extend ( sortable . opções , {
                    start :  function ( event , ui ) {
                        // certifique-se de que os campos tenham a chance de atualizar o modelo
                        ui . item . find ( " entrada: foco " ). mudar ();
                        if (startActual) {
                            startActual . aplicar ( isso , argumentos );
                        }
                    }
                    receba :  function ( event , ui ) {
                        dragItem =  ko . utils . domData . obtenha ( ui . item [ 0 ], DRAGKEY );
                        if (dragItem &&  dragItem . clone ) {
                            dragItem =  dragItem . clone ();
                        }
                    }
                    update :  function ( event , ui ) {
                        var sourceParent, targetParent, targetIndex, i, targetUnwrapped, arg,
                            el =  ui . item [ 0 ],
                            item =  ko . utils . domData . get (el, ITEMKEY ) || dragItem;

                        dragItem =  null ;

                        if (item) {
                            // identificar pais
                            sourceParent =  ko . utils . domData . get (el, PARENTKEY );
                            targetParent =  ko . utils . domData . get ( el . parentNode , LISTKEY );
                            targetIndex =  ko . utils . arrayIndexOf ( ui . item . parent (). children (), el);

                            // leva em consideração itens destruídos
                            if ( ! templateOptions . includeDestroyed ) {
                                targetUnwrapped =  targetParent ();
                                para (i =  0 ; i < targetIndex; i ++ ) {
                                    // adiciona um para cada item destruído que encontramos antes do targetIndex no array de destino
                                    if (targetUnwrapped [i] && targetUnwrapped [i]. _destroy ) {
                                        targetIndex ++ ;
                                    }
                                }
                            }

                            if ( sortable . beforeMove  ||  classificável . afterMove ) {
                                arg = {
                                    item : item,
                                    sourceParent : sourceParent,
                                    sourceParentNode : sourceParent &&  el . parentNode ,
                                    sourceIndex : sourceParent &&  sourceParent . indexOf (item),
                                    targetParent : targetParent,
                                    targetIndex : targetIndex,
                                    cancelDrop :  false
                                };
                            }

                            if ( sortable . beforeMove ) {
                                classificável . beforeMove . chamar ( isso , arg, evento , ui);
                                if ( arg . cancelDrop ) {
                                    // chama cancelar na lista correta
                                    if ( arg . sourceParent ) {
                                        $ ( arg . sourceParent  ===  arg . targetParent  ?  isto  :  ui . sender ). classificável ( ' cancelar ' );
                                    }
                                    // para um item arrastável basta remover o elemento
                                    mais {
                                        $ (el). remove ();
                                    }

                                    retorno ;
                                }
                            }

                            if (targetIndex > =  0 ) {
                                if (sourceParent) {
                                    sourceParent . remover (item);
                                }

                                targetParent . emenda (targetIndex, 0 , item);
                            }

                            // renderização é manipulada manipulando o observableArray; ignorar elemento descartado
                            ko . utils . domData . set (el, ITEMKEY , nulo );
                            ui . item . remove ();

                            // permite que a ligação aceite uma função para executar depois de mover o item
                            if ( sortable . afterMove ) {
                                classificável . afterMove . chamar ( isso , arg, evento , ui);
                            }
                        }

                        if (updateActual) {
                            updateActual . aplicar ( isso , argumentos );
                        }
                    }
                    connectWith :  classificável . connectClass  ?  " . "  +  classificável . connectClass  :  false
                }));

                // lida com ativar / desativar a classificação
                if ( sortable . isEnabled  ! ==  undefined ) {
                    ko . computed ({
                        leia :  function () {
                            elemento $ . classificável ( ko . utils . unwrapObservable ( classificável . isEnabled ) ?  " enable "  :  " disable " );
                        }
                        disposeWhenNodeIsRemoved : elemento
                    });
                }
            }, 0 );

            // lidar com descarte
            ko . utils . domNodeDisposal . addDisposeCallback (elemento, função () {
                elemento $ . classificável ( " destruir " );
            });

            return { ' controlsDescendantBindings ' :  true };
        }
        update :  function ( elemento , valueAccessor , allBindingsAccessor , dados , contexto ) {
            var templateOptions =  prepareTemplateOptions (valueAccessor, " foreach " );

            // anexar meta-dados
            ko . utils . domData . set (elemento, LISTKEY , templateOptions . foreach );

            // chama a atualização da associação de modelos com opções corretas
            ko . bindingHandlers . modelo . update (elemento, função () { return templateOptions;}, allBindingsAccessor, dados, contexto);
        }
        connectClass :  ' ko_container ' ,
        AllowDrop :  verdade ,
        afterMove :  null ,
        beforeMove :  null ,
        opções : {}
    };

    // crie uma arrastável que seja apropriada para ser incluída em um classable
    ko . bindingHandlers . draggable  = {
        init :  function ( elemento , valueAccessor , allBindingsAccessor , data , context ) {
            var valor =  ko . utils . unwrapObservable ( valueAccessor ()) || {}
                opções =  valor . opções  || {}
                draggableOptions =  ko . utils . estender ({}, ko . bindingHandlers . arrastáveis . opções ),
                templateOptions =  prepareTemplateOptions (valueAccessor, " data " ),
                connectClass =  value . connectClass  ||  ko . bindingHandlers . arrastável . connectClass ,
                isEnabled =  valor . isEnabled  ! ==  indefinido  ?  valor . isEnabled  :  ko . bindingHandlers . arrastável . isEnabled ;

            valor =  valor . dados  || valor;

            // definir metadados
            ko . utils . domData . set (elemento, DRAGKEY , valor);

            // substitui opções globais com opções de substituição transmitidas
            ko . utils . extend (draggableOptions, opções);

            // configuração da conexão com um classificável

            draggableOptions . connectToSortable  = connectClass ?  " . "  + connectClass :  false ;

            // inicializa arrastável
            $ (elemento). arrastável (draggableOptions);

            // lida com ativar / desativar a classificação
            if (isEnabled ! ==  undefined ) {
                ko . computed ({
                    leia :  function () {
                        $ (elemento). arrastável ( ko . utils . unwrapObservable ( isEnabled ) ?  " enable "  :  " disable " );
                    }
                    disposeWhenNodeIsRemoved : elemento
                });
            }

            return  ko . bindingHandlers . modelo . init (elemento, função () { return templateOptions;}, allBindingsAccessor, dados, contexto);
        }
        update :  function ( elemento , valueAccessor , allBindingsAccessor , dados , contexto ) {
            var templateOptions =  prepareTemplateOptions (valueAccessor, " data " );

            return  ko . bindingHandlers . modelo . update (elemento, função () { return templateOptions;}, allBindingsAccessor, dados, contexto);
        }
        connectClass :  ko . bindingHandlers . classificável . connectClass ,
        opções : {
            ajudante :  " clone "
        }
    };

});
