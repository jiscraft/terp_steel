/**
 * Created by jiscr on 2021-03-22.
 */
Ext.define('Terp.view.tsoft.componentux.TsoftSiteUserHelpFeild', {
    extend: 'Ext.form.TextField',
    xtype: 'tsoftsiteuserhelpfield',
    requires: [
        'Terp.view.tsoft.help.siteuserhelp.TsoftSiteUserHelp'
    ],

    config: {
        displayValue: '',
        realValue: '',
        helpParams: {},             //핼프윈도우 초기값
        helpParamFuctionName: ''  //헬프윈도우에 초기값을 넘겨주기 호출하는 함수 이름
    },

    labelSeparator: '',
    labelWidth: 60,
    width: 200,

    enableKeyEvents: true,
    editable: true,
    selectOnFocus: false,

    onFocus: function () {
        this.callParent(arguments);
        this.setRawValue(this.getRealValue());
        this.selectText();
    },

    onBlur: function () {
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

    getValue: function () {
        return this.getRealValue();
    },

    getRawValue: function () {
        return this.getRealValue();
    },

    triggers: {
        search: {
            cls: 'x-form-search-trigger',
            handler: function () {
                // 20160812 bkoh
                if (this.checkSectorCode && Ext.isEmpty(this.sectorCode)) {
                    Terp.app.getController('TerpCommon').toastMessage('귀속부문을 먼저 선택해야 합니다', 't');
                    return;
                }

                var pop = Ext.create('Terp.view.tsoft.help.siteuserhelp.TsoftSiteUserHelp', {
                    CheckSectorCode: this.checkSectorCode,
                    SectorCode: this.sectorCode
                });
                pop.show();
                pop.getController().init(this);
            }
        },

        clear: {
            cls: 'x-form-clear-trigger',
            handler: function (obj) {

                if (this.allowBlank == false) {
                    Terp.app.getController('TerpCommon').toastMessage('값을 반드시 선택해야 합니다', 't');
                    return;
                }
                this.clear();
            }
        }

    },
    listeners: {
        change: function (field) {
            var val = null;
            if (this.typeOf === 'grid') {
                field.column.ownerCt.grid.getSelectionModel().getLastSelected().get(this.dataIndexOfZone).getStore().removeAll();
                field.column.ownerCt.grid.getSelectionModel().getLastSelected().get(this.dataIndexOfZone).clearValue();
            } else if (this.typeOf === 'form') {
                field.up('form').getForm().findField(this.dataIndexOfZone).clearValue();
                field.up('form').getForm().findField(this.dataIndexOfZone).getStore().removeAll();
            }

        }
    },
    clear: function () {
        this.inputEl.dom.value = '';
        this.setDisplayValue('');
        this.setRealValue('');
        this.setRawValue('');
        this.setValue('');
        this.SelectedData = null;
        this.fireEvent('setcallbackvalue', this, null);
    },

    callbackPopup: function (params) {
        this.setDisplayValue(params.nm_site);
        this.setRealValue(params.cd_site);
        this.setValue(params.cd_site);
        this.setRawValue(params.nm_site);
        this.SelectedData = params;
        this.fireEvent('setcallbackvalue', this, params);
    },


    initComponent: function () {
        var me = this;
        //console.log('sitehelpfield',this);
        me.callParent(arguments);
    }
});