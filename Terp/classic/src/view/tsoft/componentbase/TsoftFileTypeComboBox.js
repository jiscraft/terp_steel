/**
 * Created by resh on 2016-07-08.
 */
Ext.define('Terp.view.tsoft.componentbase.TsoftFileTypeComboBox', {
    extend: 'Ext.form.field.ComboBox',
    xtype :'tsoftfiletypecombobox' ,


    labelSeparator : '',
    //labelWidth: 60 ,
    width : 150 ,
    displayField: 'nm_type',
    valueField: 'cd_type',
    queryMode : 'local',
    allowBlank: true ,

    editable: true,
    selectOnFocus: true,

    store :{
        fields :['name','value']
    },
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

    initComponent:function(){
        var me = this;

        me.callParent(arguments);
    },

    listeners: {
        specialkey: function(field, e) {
            Terp.app.getController('TerpCommon').gridCellEditPluginEnterKeyHandler(field, e);
        }
    }

});