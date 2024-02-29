/**
 * Created by jiscraft on 2016-02-23.
 */
Ext.define('Terp.view.tsoft.messagebox.TsoftMessageBox', {
    extend: 'Ext.window.Window',
    xtype: 'tsoftmessagebox',

    requires: [
        'Ext.form.Panel'
    ],

    config :{
      type :''
    },

    title: '',
    closable: false,
    items: [{
        xtype: 'form',
        reference: 'loginform',
        defaultType: 'textfield',
        defaults: {
            labelWidth: 80
        },
        items: [
            {
            allowBlank: true,
            fieldLabel: 'User ID',
            name: 'id_user',
            bind: {
                value: '{id_user}'
            },
            emptyText: 'user id'
            }
        ]
    }],
    
    width: 320,
    bodyPadding: 10,


    buttons: [
    ],

    initComponent: function () {
        this.defaults = {
            anchor: '100%',
            labelWidth: 120
        };

        if (type == 'OK'){
            this.addDocked();
        }
        this.callParent();
    }

});