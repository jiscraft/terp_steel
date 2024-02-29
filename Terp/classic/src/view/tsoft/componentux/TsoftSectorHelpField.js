/**
 * Created by jiscraft on 2016-08-18.
 */
Ext.define('Terp.view.tsoft.componentux.TsoftSectorHelpField', {
    extend: 'Terp.view.tsoft.componentbase.TsoftComboBox',
    xtype: 'tsoftsectorhelpfield',

    store : Ext.getStore('CommonSector'),
    displayField: 'nm_sector',
    valueField: 'cd_sector',
    queryMode: 'local',
    //autoShow: true ,
    listeners: {
        render: function(){
            //console.log(this);
        }
    }
});