/**
 * Created by jiscraft on 2022-12-14.
 */
Ext.define('Terp.view.wk.wk22l1402.Wk22l1402Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.wk22l1402',

    control: {
        'tsoftsearchform[reference=wk22l1402_searchform]': {
            boxready: 'onBoxready_wk22l1402_searchform'
        },
        'tsoftgrid[reference=wk22l1402_grid1]': {
            itemdblclick: 'onItemdblclick_wk22l1402_grid1'
        }

        /*
            rowdblclick (obj , record , tr , rowIndex , e , eOpts)
            selectionchange (obj , selected , eOpt)
            change (obj, newValue, oldValue, eOpts )
            reconfigure
            itemdblclick(obj , record , tr , rowIndex , e , eOpts)
            beforecellclick (obj, td, cellIndex, record, tr, rowIndex, e, eOpts)
            boxready (obj, width, height, eOpts ) -- grid
        */
    },
    
    init: function() {
        var me = this;
        me.commonFn = Terp.app.getController('TerpCommon');

        me.wk22l1402_headbutton = me.lookupReference('wk22l1402_headbutton');
        me.wk22l1402_searchform= me.lookupReference('wk22l1402_searchform');

        me.wk22l1402_grid1 = me.lookupReference('wk22l1402_grid1');
        me.wk22l1402_grid1_store = me.getViewModel().getStore('wk22l1402_grid1_store');


    },

    onBoxready_wk22l1402_searchform : function(){
        var me = this;
        var insertData ={
            cd_e: me.commonFn.getUserInfo('cd_e'),
            nm_e :me.commonFn.getUserInfo('nm_e')
        };
        me.getViewModel().set('formData',insertData );
        me.wk22l1402_searchform.blurForm();

        me.onEditControlMode('init');
        
        me.onSelect();

    },

    onItemdblclick_wk22l1402_grid1 : function(){
        var me  = this;
    },

    
    onSelect : function(){
        var me = this;
        if (me.wk22l1402_searchform.down('[name=cd_site]').getValue() == ''){
            me.commonFn.toastMessage('현장코드를 선택해야 합니다','t')
        }
    
        var jsonData = {
            'actiondata': 'm',
            'loginIduser': me.commonFn.getUserInfo('id_user'),
            'loginCdc': me.commonFn.getUserInfo('cd_c'),
            'cd_e':  me.wk22l1402_searchform.down('[name=cd_e]').getValue(),
            'dt_fr':  me.wk22l1402_searchform.down('[name=dt_fr]').getValue(),
            'dt_to':  me.wk22l1402_searchform.down('[name=dt_to]').getValue()

        };
        var sendDataJson = [];
        sendDataJson.push(jsonData);
        var sendDataJsonEncode = Ext.encode(sendDataJson);
    
        me.wk22l1402_grid1_store.load({
            params :{
                sendData : sendDataJsonEncode
            },
            callback : function(records, operation , success){
                var me = this;
                if (success == true) {
                    Ext.getBody().unmask();
                    if ( records.length > 0 ){
                        me.wk22l1402_grid1.getSelectionModel().select(0);
                    }
                    me.onEditControlMode('select');
                } else {
                    Ext.getBody().unmask();
                    var errorMsg = this.getViewModel().getStore('wk22l1402_grid1_store').getProxy().getReader().rawData.msg;
                    me.commonFn.errorHandling(errorMsg);
                }        
            },
            scope : me
        });
    
    },
    
    onEditControlMode : function(value){
        var me = this;
        if (value == 'init'){
            me.wk22l1402_grid1.setReadOnly(true);
            me.wk22l1402_headbutton.setActiveButton({modify :'Y' ,insert :'N' ,  delete:'N', save :'N' , print :'N' , select :'Y'});
            me.wk22l1402_grid1.setActiveButton({insert :'N' , modify :'N' , delete:'N', save :'N', copy :'N' , import :'N' , export :'Y'});
        }

    }
    
    
});