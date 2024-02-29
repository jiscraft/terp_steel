/**
 * Created by jiscraft on 2022-11-07.
 */
Ext.define('Terp.view.pj.pj22k0701.Pj22k0701Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.pj22k0701',

    requires: [
        'Terp.view.pj.pj22k0701.pj22k0701popup.Pj22k0701popup'
    ],

    control: {
        'tsoftsearchform[reference=pj22k0701_searchform]': {
            boxready: 'onBoxReady_pj22k0701_searchform'
        },
        'tsoftgrid[reference=pj22k0701_grid1]': {
            itemdblclick: 'onItemdblclick_pj22k0701_grid1'
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
        me.pj22k0701_headbutton = me.lookupReference('pj22k0701_headbutton');
        me.pj22k0701_searchform = me.lookupReference('pj22k0701_searchform');

        me.pj22k0701_grid1 = me.lookupReference('pj22k0701_grid1');
        me.pj22k0701_grid1_store =  me.getViewModel().getStore('pj22k0701_grid1_store') ;

        me.onInitValue();
    },
    
    onInitValue : function(){
        var me = this;
        //form helpform에는 콤보를 바인딩 해주어야함
        // me.commonFn.setCommonCode(me.lookupReference('pj22k0701_form1_fg_sm200') ,'SM200');
    },
    
    onBoxReady_pj22k0701_searchform : function(){
        var me = this;
        me.onSelect();
    },

    onSelect : function(){
        var me = this;
        me.onSelect_pj22k0701_grid1();
    
    },
    
    onSelect_pj22k0701_grid1 : function () {
        var me = this;

        var fgStatus = me.pj22k0701_searchform.down('[name=fg_statusString]').getValue().cbg;

        var fgStatusVar = '';
        if (Ext.isEmpty(fgStatus)){
            fgStatusVar ='';
        }else{
            if (Ext.isString(fgStatus) ){
                fgStatusVar = fgStatus ;
            } else{
                for (var i = 0; i < fgStatus.length; i++) {
                    fgStatusVar = fgStatusVar + fgStatus[i] + ',';
                }
            }


        }

        var jsonData = {
            'actiondata': 'm',
            'loginIduser': me.commonFn.getUserInfo('id_user'),
            'loginCdc': me.commonFn.getUserInfo('cd_c'),
            'cd_site':  me.pj22k0701_searchform.down('[name=cd_site]').getValue(),
            'cd_p':  me.pj22k0701_searchform.down('[name=cd_p]').getValue(),
            'fg_statusString':  fgStatusVar ,//me.pj22k0701_searchform.down('[name=fg_status]').getValue(),
            'p_search':  me.pj22k0701_searchform.down('[name=p_search]').getValue()

        };
        var sendDataJson = [];
        sendDataJson.push(jsonData);
        var sendDataJsonEncode = Ext.encode(sendDataJson);

        me.pj22k0701_grid1_store.load({
            params :{
                sendData : sendDataJsonEncode
            },
            callback : function(records, operation , success){
                var me = this;
                if (success == true) {
                    Ext.getBody().unmask();
                    if ( records.length > 0 ){
                        me.pj22k0701_grid1.getSelectionModel().select(0);
                    }
                    me.onEditControlMode('select');
                } else {
                    Ext.getBody().unmask();
                    var errorMsg = this.getViewModel().getStore('pj22k0701_grid1_store').getProxy().getReader().rawData.msg;
                    me.commonFn.errorHandling(errorMsg);
                }
            },
            scope : me
        });       
    },

    onItemdblclick_pj22k0701_grid1 : function(obj , record , tr , rowIndex , e , eOpts){
        var me = this;
        me.onPopupWindow( record.data.cd_site,'edit');
    },


    onInsert : function(){
       var me = this;
       me.onPopupWindow( '','new');
    },


    onPopupWindow : function(cdSite , edidMode){
        var me = this;

        var paramjsonData = {
            'cd_site': cdSite,
            'fg_window':edidMode
        };

        var pop = Ext.create('Terp.view.pj.pj22k0701.pj22k0701popup.Pj22k0701popup',{
            popupParamView : me.getView() ,
            popupParams : paramjsonData ,
            autoShow: true
        });

        pop.on('close', function() {
            me.onPopupCallback_pj22k0701();
        });
    },

    onPopupCallback_pj22k0701 : function(){
        var me = this;
        me.onSelect();
    },
    
    onEditControlMode : function(value){
        var me = this;
        if (value == 'select'){
            me.pj22k0701_grid1.setReadOnly(true);
            me.pj22k0701_headbutton.setActiveButton({modify :'N' ,insert :'Y' ,  delete:'N', save :'N' , print :'N' , select :'Y'});
            me.pj22k0701_grid1.setActiveButton({insert :'N' , modify :'N' , delete:'N', save :'N', copy :'' , import :'N' , export :'Y'});
        }

    }
    
});