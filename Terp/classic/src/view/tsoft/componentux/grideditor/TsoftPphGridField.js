/**
 * Created by jiscraft on 2016-02-24.
 */
Ext.define('Terp.view.tsoft.componentux.grideditor.TsoftPphGridField', {
    extend: 'Ext.form.TextField',
    xtype: 'tsoftpphgridfield',

    requires: [
        'Terp.view.tsoft.help.pphhelp.TsoftPphHelp'
    ],

    config :{
        displayValue: '',
        realValue: ''
    },

    width : 200 ,
    labelWidth: 60 ,
    labelSeparator: '' ,

    enableKeyEvents: true,
    editable: true,
    selectOnFocus: false,

    onFocus: function() {
        this.callParent(arguments);
        this.selectText();
    },

    onBlur: function() {
        this.callParent(arguments);
        if (Ext.isEmpty(this.getDisplayValue())) {
            this.inputEl.dom.value = '';
            this.setDisplayValue('');
            this.setRealValue('');
            this.setValue('');
            this.setRawValue('');
        }
    },

    triggers: {
        search: {
            cls: 'x-form-search-trigger',
            handler: function () {
                if (this.helpInitParams == '' || this.helpInitParams == undefined ){
                    //console.log('help init이 없습니다');
                    helpInitParams ={
                        // 'helpInitParam_fg_p' : '',
                        'helpInitParam_h_search' : ''
                    }
                }else{
                    //console.log('help init이 있습니다');
                    helpInitParams = this.helpInitParams ;
                }
                var me = this ;
                var pop = Ext.create('Terp.view.tsoft.help.pphhelp.TsoftPphHelp',{
                    popupParamThisView : me , //Terp.app.getController('TerpCommon').getTopOwnerCt(this) ,
                    helpInitParams : helpInitParams
                });
                pop.show();
            }
        },
        clear: {
            cls: 'x-form-clear-trigger',
            handler: function () {
                this.clear();

            }
        }
    },

    clear: function () {
        // this.ownerCt.grid.selection.set(this.ownerCt.column.dataIndex , '') ;
        // this.ownerCt.grid.selection.set(this.ownerCt.column.nmIndex , '') ;
        this.setDisplayValue('');
        this.setRawValue('');
        this.setRealValue('');
        this.setValue('');
        this.SelectedData = null;
        this.fireEvent('setcallbackvalue', this, null);
    },

    listeners : {
        specialkey: function (field, e) {
            if (!field.readOnly && (e.getKey() == e.ENTER)) {
                this.key = true;
                field.blur();
                // var fieldInputValue = field.inputEl.getValue();
                // // var commonStore = Terp.app.getStore('CommonPph');
                // // var cntFound1 = commonStore.find('no_pp', fieldInputValue, 0, true);
                // // if ((commonStore.find('no_pp', fieldInputValue, 0, true) === -1) && (commonStore.find('dc_title', fieldInputValue, 0, true) === -1)) {
                // //     fieldInputValue = '';
                // //     var pop = Ext.create('Terp.view.tsoft.help.pphhelp.TsoftPphHelp', {
                // //         popupParamThisView: field,
                // //         helpInitParams: {helpInitParam_h_search: '', autoSearch: true}
                // //     });
                // //     pop.show();
                // //     field.clear();
                // // }
                // // else {
                // Ext.Ajax.request({
                //     url: '/ServerPage/pm/pm_pp_h.jsp',
                //     params: {
                //         sendData: Ext.encode([{
                //             'actiondata': 'help',
                //             'loginIduser': Terp.app.getController('TerpCommon').getUserInfo('id_user'),
                //             'loginCdc': Terp.app.getController('TerpCommon').getUserInfo('cd_c'),
                //             'h_search': fieldInputValue
                //         }])
                //     },
                //     success: function (res) {
                //         var obj = Ext.JSON.decode(res.responseText);
                //         if (obj.data.length === 1) {
                //             field.callbackPopup(obj.data[0]);
                //         } else if (obj.data.length === 0) {
                //             fieldInputValue = '';
                //             var pop = Ext.create('Terp.view.tsoft.help.pphhelp.TsoftPphHelp', {
                //                 popupParamThisView: field,
                //                 helpInitParams: {helpInitParam_h_search: fieldInputValue, autoSearch: true}
                //             });
                //             pop.show();
                //             field.clear();
                //         } else {
                //             var pop = Ext.create('Terp.view.tsoft.help.pphhelp.TsoftPphHelp', {
                //                 popupParamThisView: field,
                //                 helpInitParams: {helpInitParam_h_search: fieldInputValue, autoSearch: true}
                //             });
                //             pop.show();
                //             field.clear();
                //         }
                //     },
                //     fail: function () {
                //         var pop = Ext.create('Terp.view.tsoft.help.pphhelp.TsoftPphHelp', {
                //             popupParamThisView: field,
                //             helpInitParams: {helpInitParam_h_search: fieldInputValue, autoSearch: true}
                //         });
                //         pop.show();
                //         field.clear();
                //     }
                // });
                // }
            }
        },
        blur:function(field, e) {
            if (!field.readOnly) {
                var fieldInputValue = field.inputEl.getValue();
                if (this.key || fieldInputValue.length > 0) {
                    Ext.Ajax.request({
                        url: '/ServerPage/pm/pm_pp_h.jsp',
                        params: {
                            sendData: Ext.encode([{
                                'actiondata': 'help',
                                'loginIduser': Terp.app.getController('TerpCommon').getUserInfo('id_user'),
                                'loginCdc': Terp.app.getController('TerpCommon').getUserInfo('cd_c'),
                                'h_search': fieldInputValue
                            }])
                        },
                        success: function (res) {
                            var obj = Ext.JSON.decode(res.responseText);
                            console.log(obj);
                            if (obj.data.length === 1) {
                                field.callbackPopup(obj.data[0]);
                            } else {
                                // if (fieldInputValue.length > 0) {
                                    fieldInputValue = '';
                                    var pop = Ext.create('Terp.view.tsoft.help.pphhelp.TsoftPphHelp', {
                                        popupParamThisView: field,
                                        helpInitParams: {helpInitParam_h_search: fieldInputValue, autoSearch: true}
                                    });
                                    pop.show();
                                    field.clear();

                                }

                            // } else if (obj.data.length > 1) {
                            //     var pop = Ext.create('Terp.view.tsoft.help.pphhelp.TsoftPphHelp', {
                            //         popupParamThisView: field,
                            //         helpInitParams: {helpInitParam_h_search: fieldInputValue, autoSearch: true}
                            //     });
                            //     pop.show();
                            //     field.clear();
                            // }
                        },
                        fail: function () {
                            var pop = Ext.create('Terp.view.tsoft.help.pphhelp.TsoftPphHelp', {
                                popupParamThisView: field,
                                helpInitParams: {helpInitParam_h_search: fieldInputValue, autoSearch: true}
                            });
                            pop.show();
                            field.clear();
                        }
                    });
                }
            }
        },
        focus: function(){
            this.key = false;
        }
    },


    callbackPopup : function(params) {
        this.ownerCt.grid.selection.set(this.ownerCt.column.dataIndex, params.no_pp);
        // this.ownerCt.column.dataIndex.
        // this.ownerCt.grid.selection.set(this.ownerCt.column.nmIndex, params.nm_p);
        this.setDisplayValue(params.no_pp);
        this.setRealValue(params.no_pp);
        this.setValue(params.no_pp);
        this.setRawValue(params.no_pp);
        this.SelectedData = params;
        this.fireEvent('setcallbackvalue', this, params);
        Terp.app.getController('TerpCommon').gridCellEditPluginEnterKeyHandler(this, 'SkipEnterKeyCheck');
    }

});