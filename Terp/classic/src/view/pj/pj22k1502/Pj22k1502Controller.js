/**
 * Created by jiscraft on 2022-11-15.
 */
Ext.define('Terp.view.pj.pj22k1502.Pj22k1502Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.pj22k1502',

    requires: [
        'Terp.view.pj.pj22k1502.pk22k1502popup.Pk22k1502popup'
    ],

    control: {
        // 'tsoftsearchform[reference=pj22k1502_searchform]': {
        //     boxready: 'onBoxReady_pj22k1502_searchform'
        // },
        'tsoftgrid[reference=pj22k1502_grid1]': {
            itemdblclick: 'onItemdblclick_pj22k1502_grid1'
        },
        'tsoftgrid[reference=pj22k1502_grid2]': {
            itemdblclick: 'onItemdblclick_pj22k1502_grid2'
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
        me.pj22k1502_headbutton = me.lookupReference('pj22k1502_headbutton');
        me.pj22k1502_searchform = me.lookupReference('pj22k1502_searchform');

        me.pj22k1502_pjbase = me.lookupReference('pj22k1502_pjbase');
        me.pj22k1502_searchform = me.lookupReference('pj22k1502_searchform');

        me.pj22k1502_grid1 = me.lookupReference('pj22k1502_grid1');
        me.pj22k1502_grid1_store = me.getViewModel().getStore('pj22k1502_grid1_store') ;

        me.pj22k1502_grid2 = me.lookupReference('pj22k1502_grid2');
        me.pj22k1502_grid2_store = me.getViewModel().getStore('pj22k1502_grid2_store') ;
    },

    onSelect : function () {
        var me = this;
        me.pj22k1502_pjbase.getController().onLoadDataPjBase(me.pj22k1502_searchform.down('[name=cd_site]').getValue());
        me.onSelect_pj22k1502_grid1();
        me.onSelect_pj22k1502_grid2();
    },

    onSelect_pj22k1502_grid1 : function () {
        var me = this;

        var jsonData = {
            'actiondata': 'msite',
            'loginIduser': me.commonFn.getUserInfo('id_user'),
            'loginCdc': me.commonFn.getUserInfo('cd_c'),
            'cd_site':  me.pj22k1502_searchform.down('[name=cd_site]').getValue()
        };

        var sendDataJson = [];
        sendDataJson.push(jsonData);
        var sendDataJsonEncode = Ext.encode(sendDataJson);

        me.pj22k1502_grid1_store.load({
            params :{
                sendData : sendDataJsonEncode
            },
            callback : function(records, operation , success){
                var me = this;
                if (success == true) {
                    Ext.getBody().unmask();
                    if ( records.length > 0 ){
                        me.pj22k1502_grid1.getSelectionModel().select(0);
                    }
                    me.onEditControlMode('select');
                } else {
                    Ext.getBody().unmask();
                    var errorMsg = this.getViewModel().getStore('pj22k1502_grid1_store').getProxy().getReader().rawData.msg;
                    me.commonFn.errorHandling(errorMsg);
                }
            },
            scope : me
        });
    },

    onSelect_pj22k1502_grid2 : function () {
        var me = this;

        var jsonData = {
            'actiondata': 'msitePlan',
            'loginIduser': me.commonFn.getUserInfo('id_user'),
            'loginCdc': me.commonFn.getUserInfo('cd_c'),
            'cd_site':  me.pj22k1502_searchform.down('[name=cd_site]').getValue()
        };

        var sendDataJson = [];
        sendDataJson.push(jsonData);
        var sendDataJsonEncode = Ext.encode(sendDataJson);

        me.pj22k1502_grid2_store.load({
            params :{
                sendData : sendDataJsonEncode
            },
            callback : function(records, operation , success){
                var me = this;
                if (success == true) {
                    Ext.getBody().unmask();
                    if ( records.length > 0 ){
                        me.pj22k1502_grid2.getSelectionModel().select(0);
                    }
                    me.onEditControlMode('select');
                } else {
                    Ext.getBody().unmask();
                    var errorMsg = this.getViewModel().getStore('pj22k1502_grid2_store').getProxy().getReader().rawData.msg;
                    me.commonFn.errorHandling(errorMsg);
                }
            },
            scope : me
        });
    },

    onInsert : function(){
        var me = this;

        if (Ext.isEmpty(me.pj22k1502_pjbase.getViewModel().data.pjbaseFormData)){
            me.commonFn.toastMessage('계약이 등록된후 기성을 청구할 수 있습니다.<br>정식계약이 안되어있으면 가계약상태로 등록바랍니다.','w');
            return;
        }

        var cdSite = me.pj22k1502_searchform.down('[name=cd_site]').getValue();
        var noGs = me.commonFn.sqlNodocu('GS',me.commonFn.getUserInfo('cd_c'),'');
        var idRow = me.commonFn.sqlRowId();
        me.onPopupWindow( '','new' , cdSite , noGs , idRow ,'0');

    },

    onButtonClik_pj22k1502_functionform_planInsert : function(){
        var me = this;

        if (Ext.isEmpty(me.pj22k1502_pjbase.getViewModel().data.pjbaseFormData)){
            me.commonFn.toastMessage('계약이 등록된후 매출계획을 등록 할 수 있습니다.','w');
            return;
        }

        var cdSite = me.pj22k1502_searchform.down('[name=cd_site]').getValue();
        var noGs = me.commonFn.sqlNodocu('GS',me.commonFn.getUserInfo('cd_c'),'');
        var idRow = me.commonFn.sqlRowId();
        me.onPopupWindow( '','new' , cdSite , noGs , idRow ,'1');

    },

    onItemdblclick_pj22k1502_grid1 : function(obj , record , tr , rowIndex , e , eOpts){
        var me = this;
        var cdSite = me.pj22k1502_searchform.down('[name=cd_site]').getValue();
        var noGs = record.data.no_gs;
        var idRow = record.data.id_row;
        me.onPopupWindow( record.data,'edit' , cdSite , noGs , idRow , '0');
    },

    onItemdblclick_pj22k1502_grid2 : function(obj , record , tr , rowIndex , e , eOpts){
        var me = this;
        var cdSite = me.pj22k1502_searchform.down('[name=cd_site]').getValue();
        var noGs = record.data.no_gs;
        var idRow = record.data.id_row;
        me.onPopupWindow( record.data,'edit' , cdSite , noGs , idRow ,'1');
    },

    onPopupWindow : function(contRecord , windowMode , cdSite , noGs , idRow , fgDocu){
        var me = this;

        var paramjsonData = {
            'contRecord': contRecord,
            'cdSite' : cdSite ,
            'no_gs' : noGs ,
            'id_row' : idRow ,
            'fg_docu' : fgDocu ,
            'fg_window':windowMode
        };

        var pop = Ext.create('Terp.view.pj.pj22k1502.pk22k1502popup.Pk22k1502popup',{
            popupParamView : me.getView() ,
            popupParams : paramjsonData ,
            autoShow: true
        });

        pop.on('close', function() {
            me.onPopupCallback_pj22k1502();
        });
    },

    onPopupCallback_pj22k1502 : function(){
        var me = this;
        me.onSelect();
    },


    onEditControlMode : function(value){
        var me = this;
        if (value == 'select'){
            me.pj22k1502_grid1.setReadOnly(true);
            me.pj22k1502_headbutton.setActiveButton({modify :'N' ,insert :'Y' ,  delete:'N', save :'N' , print :'N' , select :'Y'});
            me.pj22k1502_grid1.setActiveButton({insert :'N' , modify :'N' , delete:'N', save :'N', copy :'' , import :'N' , export :'Y'});
        }

    }
});