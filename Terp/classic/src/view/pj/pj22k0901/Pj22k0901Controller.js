/**
 * Created by jiscraft on 2022-11-09.
 */
Ext.define('Terp.view.pj.pj22k0901.Pj22k0901Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.pj22k0901',

    requires: [
        'Terp.view.pj.pj22k0901.pj22k0901popup.Pj22k0901popup'
    ],

    control: {
        // 'tsoftsearchform[reference=pj22k0901_searchform]': {
        //     boxready: 'onBoxReady_pj22k0901_searchform'
        // },
        'tsoftgrid[reference=pj22k0901_grid1]': {
            itemdblclick: 'onItemdblclick_pj22k0901_grid1'
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
        me.pj22k0901_headbutton = me.lookupReference('pj22k0901_headbutton');
        me.pj22k0901_searchform = me.lookupReference('pj22k0901_searchform');

        me.pj22k0901_pjbase = me.lookupReference('pj22k0901_pjbase');
        me.pj22k0901_searchform = me.lookupReference('pj22k0901_searchform');
        
        me.pj22k0901_grid1 = me.lookupReference('pj22k0901_grid1');
        me.pj22k0901_grid1_store = me.getViewModel().getStore('pj22k0901_grid1_store') ;
    },

    onSelect : function () {
        var me = this;
        me.pj22k0901_pjbase.getController().onLoadDataPjBase(me.pj22k0901_searchform.down('[name=cd_site]').getValue());
        Ext.defer(function(){
            me.onSelect_pj22k0901_grid1();
        },500);
    },

    onSelect_pj22k0901_grid1 : function () {
        var me = this;

        var jsonData = {
            'actiondata': 'm',
            'loginIduser': me.commonFn.getUserInfo('id_user'),
            'loginCdc': me.commonFn.getUserInfo('cd_c'),
            'cd_site':  me.pj22k0901_searchform.down('[name=cd_site]').getValue(),
        };

        var sendDataJson = [];
        sendDataJson.push(jsonData);
        var sendDataJsonEncode = Ext.encode(sendDataJson);

        me.pj22k0901_grid1_store.load({
            params :{
                sendData : sendDataJsonEncode
            },
            callback : function(records, operation , success){
                var me = this;
                if (success == true) {
                    Ext.getBody().unmask();
                    if ( records.length > 0 ){
                        me.pj22k0901_grid1.getSelectionModel().select(0);
                    }
                    me.onEditControlMode('select');
                } else {
                    Ext.getBody().unmask();
                    var errorMsg = this.getViewModel().getStore('pj22k0901_grid1_store').getProxy().getReader().rawData.msg;
                    me.commonFn.errorHandling(errorMsg);
                }
            },
            scope : me
        });
    },

    onInsert : function(){
        var me = this;
        var cdSite = me.pj22k0901_searchform.down('[name=cd_site]').getValue();

        me.onPopupWindow( '','new' , cdSite , 0);
    },

    onItemdblclick_pj22k0901_grid1 : function(obj , record , tr , rowIndex , e , eOpts){
        var me = this;
        var cdSite = me.pj22k0901_searchform.down('[name=cd_site]').getValue();
        var lastSeq = me.pj22k0901_grid1_store.data.length - 1;
        lastSeq = me.pj22k0901_grid1_store.data.items[lastSeq].data.sq_rev ;
        me.onPopupWindow( record.data,'edit' , cdSite , lastSeq);
    },

    onPopupWindow : function(contRecord , windowMode , cdSite , lastSeq){
        var me = this;

        var paramjsonData = {
            'contRecord': contRecord,
            'cdSite' : cdSite ,
            'lastSeq' : lastSeq ,
            'fg_window':windowMode
        };

        var pop = Ext.create('Terp.view.pj.pj22k0901.pj22k0901popup.Pj22k0901popup',{
            popupParamView : me.getView() ,
            popupParams : paramjsonData ,
            autoShow: true
        });

        pop.on('close', function() {
            me.onPopupCallback_pj22k0901();
        });
    },

    onPopupCallback_pj22k0901 : function(){
        var me = this;
        me.onSelect();
    },


    onEditControlMode : function(value){
        var me = this;
        if (value == 'select'){
            me.pj22k0901_grid1.setReadOnly(true);
            me.pj22k0901_headbutton.setActiveButton({modify :'N' ,insert :'Y' ,  delete:'N', save :'N' , print :'N' , select :'Y'});
            me.pj22k0901_grid1.setActiveButton({insert :'N' , modify :'N' , delete:'N', save :'N', copy :'' , import :'N' , export :'Y'});
        }

    }
});