/**
 * Created by jiscraft on 2023-09-21.
 */
Ext.define('Terp.view.ma.ma23i2101.Ma23i2101Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ma23i2101',

    requires: [
        'Terp.view.ma.ma23i2101.ma23i2101popup.Ma23i2101popup'
    ],

    control: {
        'tsoftsearchform[reference=ma23i2101_searchform]': {
            boxready: 'onBoxReady_ma23i2101_searchform'
        },
        'tsoftgrid[reference=ma23i2101_grid1]': {
            rowdblclick: 'onRowDoubleClick_ma23i2101_grid1'
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
        me.ma23i2101_headbutton = me.lookupReference('ma23i2101_headbutton');
        me.ma23i2101_searchform = me.lookupReference('ma23i2101_searchform');

        me.ma23i2101_grid1 = me.lookupReference('ma23i2101_grid1');
        me.ma23i2101_grid1_store =  me.getViewModel().getStore('ma23i2101_grid1_store') ;

        me.onInitValue();
    },
    
    onInitValue : function(){
        var me = this;
        //form helpform에는 콤보를 바인딩 해주어야함
        // me.commonFn.setCommonCode(me.lookupReference('ma23i2101_form1_fg_sm200') ,'SM200');
    },
    
    onBoxReady_ma23i2101_searchform : function(){
        var me = this;
        me.onSelect();
    },
    
    

    onSelect : function(){
        var me = this;

        var jsonData = {
            'actiondata': 'm',
            'loginIduser': me.commonFn.getUserInfo('id_user'),
            'loginCdc': me.commonFn.getUserInfo('cd_c'),
            'fg_w':  me.ma23i2101_searchform.down('[name=fg_w]').getValue(),
            'yn_use':  me.ma23i2101_searchform.down('[name=yn_use]').getValue()
        };
        var sendDataJson = [];
        sendDataJson.push(jsonData);
        var sendDataJsonEncode = Ext.encode(sendDataJson);
    
        me.ma23i2101_grid1_store.load({
            params :{
                sendData : sendDataJsonEncode
            },
            callback : function(records, operation , success){
                var me = this;
                if (success == true) {
                    Ext.getBody().unmask();
                    if ( records.length > 0 ){
                        me.ma23i2101_grid1.getSelectionModel().select(0);
                    }
                    me.onEditControlMode('select');
                } else {
                    Ext.getBody().unmask();
                    var errorMsg = this.getViewModel().getStore('ma23i2101_grid1_store').getProxy().getReader().rawData.msg;
                    me.commonFn.errorHandling(errorMsg);
                }        
            },
            scope : me
        });
    
    },


    onInsert : function(){
        var me = this;

        var pop = Ext.create('Terp.view.ma.ma23i2101.ma23i2101popup.Ma23i2101popup',{
            popupParamView : me.getView() ,   //부르는넘의 뷰
            popupParams : null ,  //처리할파라미터
            autoShow: true
        });

        pop.on('close', function() {
            //me.ma23i1601_grid1.selectAndScrollIndex =  me.ma23i1601_grid1_store.find('cd_i', record.data.cd_i);
            me.onSelect();
        });
    },

    onRowDoubleClick_ma23i2101_grid1 : function(obj , record , tr , rowIndex , e , eOpts){
        var me = this;

        var pop = Ext.create('Terp.view.ma.ma23i2101.ma23i2101popup.Ma23i2101popup',{
            popupParamView : me.getView() ,   //부르는넘의 뷰
            popupParams : record.data ,  //처리할파라미터
            autoShow: true
        });

        pop.on('close', function() {
            //me.ma23i1601_grid1.selectAndScrollIndex =  me.ma23i1601_grid1_store.find('cd_i', record.data.cd_i);
            me.onSelect();
        });
    },


    onEditControlMode : function (value) {
        var me = this;
        if (value == 'select'){
            me.ma23i2101_grid1.setReadOnly(true);
            me.ma23i2101_headbutton.setActiveButton({modify :'N' ,insert :'Y' ,  delete:'N', save :'N' , print :'N' , select :'Y'});
            me.ma23i2101_grid1.setActiveButton({insert :'N' , modify :'N' , delete:'N', save :'N', copy :'N' , import :'N' , export :'Y'});
        }

    }
    
});