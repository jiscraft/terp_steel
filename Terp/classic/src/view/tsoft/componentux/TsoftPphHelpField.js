/**
 * Created by jiscraft on 2016-11-25.
 */
Ext.define('Terp.view.tsoft.componentux.TsoftPphHelpField', {
    extend: 'Ext.form.TextField',
    xtype: 'tsoftpphhelpfield',

    requires: [
        'Terp.view.tsoft.help.pphhelp.TsoftPphHelp'
    ],


    config:{
        displayValue :'' ,
        realValue :''

    },

    labelSeparator : '',
    labelWidth: 60 ,
    width : 400 ,
    cCdsite: '',
    cNmsite: '',
    cCdzone: '',
    cNmzone: '',


    onFocus: function() {
        this.callParent(arguments);
        this.setRawValue(this.getRealValue());
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
        else {
            this.setRawValue(this.getDisplayValue());
        }
    },

    getValue : function(){
        return this.getRealValue();
    },

    getRawValue : function(){
        return this.getRealValue();
    },


    triggers: {
        search: {
            cls: 'x-form-search-trigger',
            handler: function () {

                var pop = Ext.create('Terp.view.tsoft.help.pphhelp.TsoftPphHelp',{
                    popupParamThisView : this ,
                    popupParams :this.popupParams
                });
                pop.show();

            }
        },



        clear: {
            cls: 'x-form-clear-trigger',
            handler: function (obj) {

                if ( this.allowBlank == false) {
                    Terp.app.getController('TerpCommon').toastMessage('값을 반드시 선택해야 합니다','b');
                    return;
                }

                this.inputEl.dom.value = '';
                this.setDisplayValue('');
                this.setRealValue('');
                this.setRawValue('');
                this.setValue('');
                this.fireEvent('setcallbackvalue', this, null);
            }
        }
    },
    clear: function() {
        this.inputEl.dom.value = '';
        this.setDisplayValue('');
        this.setRealValue('');
        this.setRawValue('');
        this.setValue('');
        this.cCdsite  = '';
        this.cNmsite  = '';
        this.cCdzone  = '';
        this.cNmzone  = '';
    },
    callbackPopup : function(params) {
        this.setDisplayValue(params.no_pp);
        this.setRealValue(params.no_pp);
        this.setValue(params.no_pp);
        this.setRawValue(params.no_pp);
        this.cCdsite  = params.cd_site;
        this.cNmsite  = params.nm_site;
        this.cCdzone  = params.cd_zone;
        this.cNmzone  = params.nm_zone;
        this.fireEvent('setcallbackvalue', this, params);
    },


    initComponent:function(){
        var me = this;
        me.callParent(arguments);
    },
    listeners: {
        specialkey: function(field, e) {
            if (field.getEditable() && !field.readOnly && (e.getKey() == e.ENTER)) {


                var fieldInputValue = field.inputEl.getValue();
                Ext.Ajax.request({
                    url:'/ServerPage/pm/pm_pp_h.jsp',
                    params: {
                        sendData: Ext.encode([{
                            'actiondata': 'help',
                            'loginIduser': Terp.app.getController('TerpCommon').getUserInfo('id_user'),
                            'loginCdc': Terp.app.getController('TerpCommon').getUserInfo('cd_c'),
                            'h_search' : fieldInputValue
                        }])
                    },
                    success: function (res) {
                        var obj = Ext.JSON.decode(res.responseText);
                        if (obj.data.length === 1) {
                            field.callbackPopup(obj.data[0]);
                        }
                        else {
                            var pop = Ext.create('Terp.view.tsoft.help.pphhelp.TsoftPphHelp',{
                                popupParamThisView : field,
                                helpInitParams : { helpInitParam_h_search: fieldInputValue, autoSearch: true }
                            });
                            pop.show();
                            field.clear();
                        }
                    },
                    fail: function () {
                        var pop = Ext.create('Terp.view.tsoft.help.pphhelp.TsoftPphHelp',{
                            popupParamThisView : field,
                            helpInitParams : { helpInitParam_h_search: fieldInputValue, autoSearch: true }
                        });
                        pop.show();
                        field.clear();
                    }
                });
            }
        }
    }


});