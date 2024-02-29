/**
 * Created by Andrew on 2021-10-05.
 */
Ext.define('Terp.view.tsoft.componentbase.TsoftSyCodellComboBox', {
    extend: 'Ext.form.field.ComboBox',
    xtype: 'tsoftsycodellcombobox',

    typeOfCodeL: 'grid',
    dataIndexOfCodeL: 'fg_sy080',
    textOfCodeL: '지불항목',

    width: 200,
    labelWidth: 80,
    labelAlign: 'right',
    labelSeparator: '',

    queryMode: 'local',
    displayField: 'nm_codel',
    valueField: 'cd_codel',

    editable: true,
    //selectOnFocus: true,
    enableKeyEvents: true,

    store :{
        fields: ['name', 'value']
    },

    triggers: {
        clear: {
            cls: 'x-form-clear-trigger',
            handler: function (obj) {
                if (!this.allowBlank) {
                    Terp.app.getController('TerpCommon').toastMessage('값을 반드시 선택해야 합니다','b');
                    return;
                }
                this.clearValue();
            }
        }
    },

    listeners: {
        afterrender: function (field, e) {
        },
        specialkey: function(field, e) {
            if (!field.readOnly && field.getEditable() && (e.getKey() == e.ENTER)) {
                Terp.app.getController('TerpCommon').gridCellEditPluginEnterKeyHandler(this, 'SkipEnterKeyCheck');
            }
        }
    },

    onFocus: function(fld){
        if (!Ext.isEmpty(this.ownerCt.context)) {
            this.setRawValue(this.ownerCt.context.record.get(this.ownerCt.context.field));
        }

        var val = null;
        if (this.typeOfCodeL === 'grid') {
            val = this.ownerCt.column.ownerCt.grid.getSelectionModel().getLastSelected().get(this.dataIndexOfCodeL);
        }
        else if (this.typeOfCodeL === 'form') {
            val = this.ownerCt.up('form').getForm().findField(this.dataIndexOfCodeL).getValue();
        }
        if (Ext.isEmpty(val)) {
            Terp.app.getController('TerpCommon').toastMessage(this.textOfCodeL + '을 먼저 선택해야 합니다','b');
            return false;
        }

        this.getStore().removeAll();
        this.getStore.commitChanges();
        var sendDataJson = {
            loginIduser: Terp.app.getController('TerpCommon').getUserInfo().id_user,
            loginCdc: Terp.app.getController('TerpCommon').getUserInfo().cd_c,
            cd_codeh: 'SY080',
            cd_codel: val,
            yn_use: 'Y',
            actiondata: 'm'
        };
        Ext.Ajax.request({
            async: false,
            url: '/ServerPage/sy/sy_codell.jsp',
            params: {
                sendData: Ext.encode([sendDataJson])
            },
            success: function (res) {
                var obj = Ext.JSON.decode(res.responseText);
                if (obj.success) {
                    if (obj.data.length > 0) {
                        // console.log( this.ownerCt.getStore())
                        this.getStore().add(obj.data);
                    }
                }
                else {
                    Terp.app.getController('TerpCommon').msgBox.alert('오류', obj.msg);
                }
            },
            fail: function () {
                Terp.app.getController('TerpCommon').msgBox.alert('오류', '데이타처리중 오류가 발생했습니다');
            }
        });
    },

    onBlur: function(fld){
        if (Ext.isEmpty(this.lastSelection)) {
            if (!this.allowBlank) {
                Terp.app.getController('TerpCommon').toastMessage('선택한 값이 없습니다.', 'b');
            }
            this.setValue(null);
            this.setRawValue(null);
            this.lastValue = null;
            this.lastQuery = null;
            this.lastMutatedValue = null;
        }
    },

    initComponent: function() {
        var me = this;
        me.callParent(arguments);
    }

});