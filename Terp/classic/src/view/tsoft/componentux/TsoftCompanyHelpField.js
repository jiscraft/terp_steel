/**
 * Created by jiscraft on 2016-02-11.
 */
Ext.define('Terp.view.tsoft.componentux.TsoftCompanyHelpField', {
    extend: 'Terp.view.tsoft.componentbase.TsoftComboBox',
    xtype: 'tsoftcompanyhelpfield',
    store : Ext.getStore('CommonCompany'),
    displayField: 'nm_c',
    valueField: 'cd_c',
    queryMode: 'local',
    //autoShow: true ,
    listeners: {
       render: function(){
           //console.log(this);
       }

    }

});