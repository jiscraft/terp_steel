/**
 * Created by resh on 2016-05-30.
 */
Ext.define('Terp.view.tsoft.componentux.grideditor.TsoftSiteSaleGridField', {
    extend: 'Ext.form.TextField',
    xtype: 'tsoftsitesalegridfield',
    requires: [
        'Terp.view.tsoft.help.sitesalehelp.TsoftSiteSaleHelp'
    ],

    config:{
        displayValue :'' ,
        realValue :'' ,
    },

    labelSeparator : '',
    labelWidth: 60 ,
    width : 200 ,

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
        this.setDisplayValue('');
        this.setRealValue('');
        this.setRawValue('');
        this.setValue('');
        this.ownerCt.grid.selection.set(this.ownerCt.column.nm_site_sale, null);
        this.ownerCt.grid.selection.set(this.ownerCt.column.yr_sales, null);
        this.ownerCt.grid.selection.set(this.ownerCt.column.fg_sm200, null);
        this.ownerCt.grid.selection.set(this.ownerCt.column.fg_sm210, null);
        this.ownerCt.grid.selection.set(this.ownerCt.column.nm_site_sale, null);
        this.ownerCt.grid.selection.set(this.ownerCt.column.fg_sm220, null);
        this.ownerCt.grid.selection.set(this.ownerCt.column.nm_p, null);
        this.ownerCt.grid.selection.set(this.ownerCt.column.fg_sm230, null);
        this.ownerCt.grid.selection.set(this.ownerCt.column.ym_order, null);
        this.ownerCt.grid.selection.set(this.ownerCt.column.nb_orderweight, null);
        this.ownerCt.grid.selection.set(this.ownerCt.column.at_order, null);
        this.ownerCt.grid.selection.set(this.ownerCt.column.cd_p, null);
        this.fireEvent('setcallbackvalue', this, null);
    },

    callbackPopup : function(params) {
        console.log(params);
        this.setDisplayValue(params.nm_site_sale);
        this.setRealValue(params.cd_site_sale);
        this.setValue(params.cd_site_sale);
		this.setRawValue(params.nm_site_sale);
        this.SelectedData = params;
        this.ownerCt.grid.selection.set(this.ownerCt.column.dataIndex, params.cd_site_sale);
        this.ownerCt.grid.selection.set(this.ownerCt.column.nm_site_sale, params.nm_site_sale);
        this.ownerCt.grid.selection.set(this.ownerCt.column.yr_sales, params.yr_sales);
        this.ownerCt.grid.selection.set(this.ownerCt.column.fg_sm200, params.fg_sm200);
        this.ownerCt.grid.selection.set(this.ownerCt.column.fg_sm210, params.fg_sm210);
        this.ownerCt.grid.selection.set(this.ownerCt.column.nm_site_sale, params.nm_site_sale);
        this.ownerCt.grid.selection.set(this.ownerCt.column.fg_sm220, params.fg_sm220);
        this.ownerCt.grid.selection.set(this.ownerCt.column.nm_p, params.nm_p);
        this.ownerCt.grid.selection.set(this.ownerCt.column.fg_sm230, params.fg_sm230);
        this.ownerCt.grid.selection.set(this.ownerCt.column.ym_order, params.ym_order);
        this.ownerCt.grid.selection.set(this.ownerCt.column.nb_orderweight, params.nb_orderweight);
        this.ownerCt.grid.selection.set(this.ownerCt.column.at_order, params.at_order);
        this.ownerCt.grid.selection.set(this.ownerCt.column.cd_p, params.cd_p);
        this.fireEvent('setcallbackvalue', this, params);
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