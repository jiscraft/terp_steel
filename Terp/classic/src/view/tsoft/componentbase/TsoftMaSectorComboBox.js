/**
 * Created by Andrew on 2016. 8. 12..
 */
Ext.define('Terp.view.tsoft.componentbase.TsoftMaSectorComboBox', {
    extend: 'Ext.form.field.ComboBox',
    xtype: 'tsoftmasectorcombobox',

    labelSeparator: '',
    labelWidth: 60 ,
    width: 200,
    displayField: 'nm_sector',
    valueField: 'cd_sector',
    queryMode: 'local',
    allowBlank: true ,

    editable: true,
    selectOnFocus: true,

    store: { fields: [] },

    triggers: {
        clear: {
            cls: 'x-form-clear-trigger',
            handler: function (obj) {
                if ( this.allowBlank == false) {
                    Terp.app.getController('TerpCommon').toastMessage('값을 반드시 선택해야 합니다','b');
                    return;
                }
                this.clearValue();
            }
        }
    },

    initComponent: function() {
        var me = this;
        me.callParent(arguments);
    },

    listeners: {
        render: function(field) {
            var sendDataJson = {
                loginIduser: Terp.app.getController('TerpCommon').getUserInfo().id_user,
                loginCdc: Terp.app.getController('TerpCommon').getUserInfo().cd_c,
                yn_use: 'Y'
            };
            Ext.Ajax.request({
                async: false,
                url: '/ServerPage/ma/ma_sector.jsp',
                params: {
                    sendData: Ext.encode([sendDataJson])
                },
                success: function (res) {
                    var obj = Ext.JSON.decode(res.responseText);
                    if (obj.success) {
                        if (obj.data.length > 0) {
                            field.getStore().removeAll();
                            field.getStore().add(obj.data);
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
        specialkey: function(field, e) {
            Terp.app.getController('TerpCommon').gridCellEditPluginEnterKeyHandler(field, e);
        }
    }

});