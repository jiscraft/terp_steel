/**
 * Created by bkoh on 2016-09-05.
 */
Ext.define('Terp.view.tsoft.componentux.TsoftEsBudgetHelpField', {
    extend: 'Ext.form.TextField',
    xtype: 'tsoftesbudgethelpfield',
    requires: [
        'Terp.view.tsoft.help.esbudgethelp.TsoftEsBudgetHelp'
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
                var pop = Ext.create('Terp.view.tsoft.help.esbudgethelp.TsoftEsBudgetHelp', {
                    fgBudget: this.fgBudget,
                    cdSite: this.cdSite,
                    obj : this
                });
                pop.show();
                pop.getController().init(this);
            }
        },

        clear: {
            cls: 'x-form-clear-trigger',
            handler: function (obj) {
                if ( this.allowBlank == false) {
                    Terp.app.getController('TerpCommon').toastMessage('값을 반드시 선택해야 합니다','b');
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
        this.fireEvent('setcallbackvalue', this, null);
    },

    callbackPopup : function(esOpenPanel , params) {
        console.log(params);
        console.log(this);
        // this.setValue(params.cd_budget);
        // this.setRawValue(params.cd_budget);
        esOpenPanel.ownerCt.down('[name=cd_budget]').setValue(params.cd_budget);
        esOpenPanel.ownerCt.down('[name=cd_site]').setValue(params.cd_site);
        esOpenPanel.ownerCt.down('[name=nm_site]').setValue(params.nm_site);
        esOpenPanel.ownerCt.down('[name=nm_gwstatus]').setValue(params.nm_gwstatus);
        // esOpenPanel.ownerCt.down('[name=cd_budget_select]').setValue(params.cd_budget);
        esOpenPanel.SelectedData = params;
    },


    initComponent:function(){
        var me = this;
        //console.log('sitehelpfield',this);
        me.callParent(arguments);
    }
});