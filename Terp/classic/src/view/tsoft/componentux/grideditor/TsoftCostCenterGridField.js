/**
 * Created by Andrew on 2016. 8. 12..
 */
Ext.define('Terp.view.tsoft.componentux.grideditor.TsoftCostCenterGridField', {
    extend: 'Ext.form.TextField',
    xtype: 'tsoftcostcentergridfield',
    requires: [
        'Terp.view.tsoft.help.costcenterhelp.TsoftCostCenterHelp'
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

    triggers: {
        search: {
            cls: 'x-form-search-trigger',
            handler: function () {
                var pop = Ext.create('Terp.view.tsoft.help.costcenterhelp.TsoftCostCenterHelp', {
                    popupParamThisView: this
                });
                pop.show();
                //pop.getController().init(this);
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
        this.setValue('');
        this.ownerCt.grid.selection.set(this.ownerCt.column.dataIndex , '') ;
        this.ownerCt.grid.selection.set(this.ownerCt.column.nmIndex , '') ;
        this.fireEvent('setcallbackvalue', this, null);
    },

    listeners : {
        specialkey: function(field, e) {
            if (!field.readOnly && (e.getKey() == e.ENTER)) {
                var fieldInputValue = field.inputEl.getValue();
                Ext.Ajax.request({
                    url: '/ServerPage/sy/sy_costcenter.jsp',
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
                        else {
                            var pop = Ext.create('Terp.view.tsoft.help.costcenterhelp.TsoftCostCenterHelp', {
                                popupParamThisView: field,
                                helpInitParams: { helpInitParam_h_search: fieldInputValue, autoSearch: true }
                            });
                            pop.show();
                            field.clear();
                        }
                    },
                    fail: function () {
                        var pop = Ext.create('Terp.view.tsoft.help.costcenterhelp.TsoftCostCenterHelp', {
                            popupParamThisView: field,
                            helpInitParams: { helpInitParam_h_search: fieldInputValue, autoSearch: true }
                        });
                        pop.show();
                        field.clear();
                    }
                });
            }
        }
    },


    callbackPopup : function(params) {
        //console.log(params);
        this.ownerCt.grid.selection.set(this.ownerCt.column.dataIndex, params.cd_costcenter);
        this.ownerCt.grid.selection.set(this.ownerCt.column.nmIndex, params.nm_costcenter);
        this.fireEvent('setcallbackvalue', this, params);
        Terp.app.getController('TerpCommon').gridCellEditPluginEnterKeyHandler(this, 'SkipEnterKeyCheck');
    }

});