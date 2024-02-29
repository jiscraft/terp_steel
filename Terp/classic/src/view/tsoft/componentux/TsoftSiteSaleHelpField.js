/**
 * Created by resh on 2016-05-30.
 */
Ext.define('Terp.view.tsoft.componentux.TsoftSiteSaleHelpField', {
    extend: 'Ext.form.TextField',
    xtype: 'tsoftsitesalehelpfield',
    requires: [
        'Terp.view.tsoft.help.sitesalehelp.TsoftSiteSaleHelp'
    ],

    config:{
        displayValue :'' ,
        realValue :'' ,
        helpParams :{},             //핼프윈도우 초기값
        helpParamFuctionName :''  //헬프윈도우에 초기값을 넘겨주기 호출하는 함수 이름
    },

    labelSeparator : '',
    labelWidth: 60 ,
    width : 200 ,
    labelAlign: 'right',
    enableKeyEvents: true,
    editable: true,
    selectOnFocus: false,

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
                var pop = Ext.create('Terp.view.tsoft.help.sitesalehelp.TsoftSiteSaleHelp', {
                    popupParamThisView : this,
                    helpInitParams: { helpInitParam_h_search: '', autoSearch: true }
                });
                pop.show();
                pop.getController().init(this);
            }
        },

        clear: {
            cls: 'x-form-clear-trigger',
            handler: function (obj) {

                if ( this.allowBlank == false) {
                    Terp.app.getController('TerpCommon').toastMessage('값을 반드시 선택해야 합니다','t');
                    return;
                }
                this.clear();
            }
        }
    },

    clear: function() {
        this.inputEl.dom.value = '';
        this.setDisplayValue('');
        this.setRealValue('');
        this.setRawValue('');
        this.setValue('');
        this.SelectedData = null;
        this.yr_sales = null;
        this.fg_sm200 = null;
        this.fg_sm210 = null;
        this.nm_site_sale = null;
        this.fg_sm220 = null;
        this.nm_p = null;
        this.fg_sm230 = null;
        this.ym_order = null;
        this.nb_orderweight = null;
        this.at_order  = null;
        this.cd_p  = null;
        this.fg_mtrl  = null;
        this.fireEvent('setcallbackvalue', this, null);
    },

    callbackPopup : function(params) {
        // console.log(params);
        this.setDisplayValue(params.nm_site_sale);
        this.setRealValue(params.cd_site_sale);
        this.setValue(params.cd_site_sale);
		this.setRawValue(params.nm_site_sale);
        this.SelectedData = params;
         this.yr_sales = params.yr_sales;
         this.fg_sm200 = params.fg_sm200;
         this.fg_sm210 = params.fg_sm210;
         this.nm_site_sale = params.nm_site_sale;
         this.fg_sm220 = params.fg_sm220;
         this.nm_p = params.nm_p;
         this.fg_mtrl = params.fg_mtrl;
        this.fg_sm230 = params.fg_sm230;
        this.ym_order = params.ym_order;
         this.nb_orderweight = params.nb_orderweight;
         this.at_order  =params.at_order;
         this.cd_p  =params.cd_p;
        this.fireEvent('setcallbackvalue', this, params);
    },

    initComponent:function(){
        var me = this;
        me.callParent(arguments);
    },

    listeners : {
        specialkey: function(field, e) {
            var me = this;
            if (field.getEditable() && !field.readOnly && (e.getKey() == e.ENTER)) {
                var fieldInputValue = field.inputEl.getValue();
                Ext.Ajax.request({
                    url: '/ServerPage/sm/sm_site_sale.jsp',
                    params: {
                        sendData: Ext.encode([{
                            'actiondata': 'help',
                            'loginIduser': Terp.app.getController('TerpCommon').getUserInfo('id_user'),
                            'loginCdc': Terp.app.getController('TerpCommon').getUserInfo('cd_c'),
                            'p_search': fieldInputValue
                        }])
                    },
                    success: function (res) {
                        var obj = Ext.JSON.decode(res.responseText);
                        if (obj.data.length === 1) {
                            field.callbackPopup(obj.data[0]);
                        }
                        else if (obj.data.length === 0) {
                            var pop = Ext.create('Terp.view.tsoft.help.sitesalehelp.TsoftSiteSaleHelp', {
                                popupParamThisView : me,
                                helpInitParams: { helpInitParam_h_search: '', autoSearch: true }
                            });
                            pop.show();
                            field.clear();
                        }
                        else {
                            var pop = Ext.create('Terp.view.tsoft.help.sitesalehelp.TsoftSiteSaleHelp', {
                                popupParamThisView : me,
                                helpInitParams: { helpInitParam_h_search: fieldInputValue, autoSearch: true }
                            });
                            pop.show();
                            field.clear();
                        }
                    },
                    fail: function () {
                        var pop = Ext.create('Terp.view.tsoft.help.sitesalehelp.TsoftSiteSaleHelp', {
                            popupParamThisView : me,
                            helpInitParams: { helpInitParam_h_search: '', autoSearch: true }
                        });
                        pop.show();
                        field.clear();
                    }
                });
            }
        }
    }

});