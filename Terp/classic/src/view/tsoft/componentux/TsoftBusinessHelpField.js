/**
 * Created by jiscraft on 2016-02-22.
 */
Ext.define('Terp.view.tsoft.componentux.TsoftBusinessHelpField', {
    extend: 'Ext.form.field.ComboBox',
    xtype: 'tsoftbusinesshelpfield',

    store :{
        fields :['name','value']
    },

    labelSeparator : '',
    labelWidth: 60 ,
    width : 200 ,
    displayField: 'nm_b',
    valueField: 'cd_b',
    queryMode : 'local',
    allowBlank: true ,
    labelAlign :'right',
    enableKeyEvents: true,
    editable: true,
    selectOnFocus: false,
    store : Ext.getStore('CommonBusiness'),
    triggers: {

        clear: {
            cls: 'x-form-clear-trigger',
            handler: function (obj) {

                if ( this.allowBlank == false) {
                    Terp.app.getController('TerpCommon').toastMessage('값을 반드시 선택해야 합니다','b');
                    return;
                }
                this.clearValue();
                this.fireEvent('setcallbackvalue', this, null);
            }
        }
    },

    initComponent:function(){
        var me = this;

        me.callParent(arguments);
    }
});