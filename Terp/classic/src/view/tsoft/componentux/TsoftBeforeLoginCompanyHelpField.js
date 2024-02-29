/**
 * Created by resh on 2016-02-11.
 */


Ext.define('Terp.view.tsoft.componentux.TsoftBeforeLoginCompanyHelpField', {
    extend: 'Terp.view.tsoft.componentbase.TsoftComboBox',
    xtype: 'beforelogincompanyhelpfield',
    store : Ext.getStore('BeforeLoginCompany'),
    displayField: 'nm_p',
    valueField: 'cd_p',
    queryMode: 'local',
    //autoShow: true ,
    listeners: {
        render: function(){
            //console.log(this);
        }

    }

});