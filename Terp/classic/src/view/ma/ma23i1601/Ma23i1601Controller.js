/**
 * Created by jiscraft on 2023-09-16.
 */
Ext.define('Terp.view.ma.ma23i1601.Ma23i1601Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ma23i1601',

    requires: [
        'Terp.view.ma.ma23i1601.ma23i1601popup.Ma23i1601popup'
    ],

    control: {
        'tsoftsearchform[reference=ma23i1601_searchform]': {
            boxready: 'onBoxReady_ma23i1601_searchform'
        },
        'tsoftgrid[reference=ma23i1601_grid1]': {
            selectionchange: 'onSelectionchange_ma23i1601_grid1',
            rowdblclick : 'onRowDoubleClick_ma23i1601_grid1'
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
        me.ma23i1601_headbutton = me.lookupReference('ma23i1601_headbutton');
        me.ma23i1601_searchform = me.lookupReference('ma23i1601_searchform');
    
        me.ma23i1601_form1 = me.lookupReference('ma23i1601_form1');
        me.ma23i1601_form1_store =  me.getViewModel().getStore('ma23i1601_form1_store') ;

        me.ma23i1601_grid1 = me.lookupReference('ma23i1601_grid1');
        me.ma23i1601_grid1_store =  me.getViewModel().getStore('ma23i1601_grid1_store') ;

        me.onInitValue();
    },
    
    onInitValue : function(){
        var me = this;
        me.commonFn.setCommonCode(me.lookupReference('ma23i1601_fg_mm050') ,'MM050');
        me.commonFn.setCommonCode(me.lookupReference('ma23i1601_fg_mm060') ,'MM060');

        me.commonFn.setCommonCode(me.lookupReference('ma23i1601_form1_fg_mm010') ,'MM010');
        me.commonFn.setCommonCode(me.lookupReference('ma23i1601_form1_fg_mm010_spec') ,'MM010');
        me.commonFn.setCommonCode(me.lookupReference('ma23i1601_form1_fg_mm030') ,'MM030');
        me.commonFn.setCommonCode(me.lookupReference('ma23i1601_form1_fg_mm040') ,'MM040');
        me.commonFn.setCommonCode(me.lookupReference('ma23i1601_form1_fg_mm050') ,'MM050');
        me.commonFn.setCommonCode(me.lookupReference('ma23i1601_form1_fg_mm060') ,'MM060');
        // me.commonFn.setCommonCode(me.lookupReference('ma23i1601_form1_fg_sm200') ,'SM200');
    },
    
    onBoxReady_ma23i1601_searchform : function(){
        var me = this;
        me.onSelect();
    },
    
    onSelect : function(){
        var me = this;

    
        var jsonData = {
            'actiondata': 'm',
            'loginIduser': me.commonFn.getUserInfo('id_user'),
            'loginCdc': me.commonFn.getUserInfo('cd_c'),
            'fg_mm050':  me.ma23i1601_searchform.down('[name=fg_mm050]').getValue(),
            'fg_mm060':  me.ma23i1601_searchform.down('[name=fg_mm060]').getValue(),
            'p_search':  me.ma23i1601_searchform.down('[name=p_search]').getValue()
        };

        var sendDataJson = [];
        sendDataJson.push(jsonData);
        var sendDataJsonEncode = Ext.encode(sendDataJson);
    
        me.ma23i1601_grid1_store.load({
            params :{
                sendData : sendDataJsonEncode
            },
            callback : function(records, operation , success){
                var me = this;
                if (success == true) {
                    Ext.getBody().unmask();
                    if ( records.length > 0 ){
                        me.ma23i1601_grid1.getSelectionModel().select(0);

                    }else{
                        me.getViewModel().data.formData = null;
                    }
                    me.onEditControlMode('select');
                } else {
                    Ext.getBody().unmask();
                    var errorMsg = this.getViewModel().getStore('ma23i1601_grid1_store').getProxy().getReader().rawData.msg;
                    me.commonFn.errorHandling(errorMsg);
                }        
            },
            scope : me
        });
    
    },

    onSelectionchange_ma23i1601_grid1 : function  (obj , selected , eOpt){
        var me = this;
        if (selected.length == 1 ){
            me.getViewModel().data.formData = {};
            me.getViewModel().set('formData',selected[0].data );
        }

    },

    onRowDoubleClick_ma23i1601_grid1 : function(obj , record , tr , rowIndex , e , eOpts){
        var me = this;

        var pop = Ext.create('Terp.view.ma.ma23i1601.ma23i1601popup.Ma23i1601popup',{
            popupParamView : me.getView() ,   //부르는넘의 뷰
            popupParams : me.getViewModel().data.formData ,  //처리할파라미터
            autoShow: true
        });

        pop.on('close', function() {
            //me.ma23i1601_grid1.selectAndScrollIndex =  me.ma23i1601_grid1_store.find('cd_i', record.data.cd_i);
            me.onSelect();
        });
    },

    onInsert : function(){
        var me = this;

        var pop = Ext.create('Terp.view.ma.ma23i1601.ma23i1601popup.Ma23i1601popup',{
            popupParamView : me.getView() ,   //부르는넘의 뷰
            popupParams : null ,  //처리할파라미터
            autoShow: true
        });

        pop.on('close', function() {
            me.ma23i1601_grid1.selectAndScrollIndex =  me.ma23i1601_grid1_store.find('id_row', record.data.id_row);
            me.onSelect();
        });
    },

    onEditControlMode : function(value){
        var me = this;
        me.ma23i1601_form1.setReadOnly(true);


        if (value == 'select') {
            me.ma23i1601_grid1.setReadOnly(true);
            me.ma23i1601_form1.setReadOnly(true);
            //순서가중요함
            me.ma23i1601_form1.blurForm();
            me.ma23i1601_form1.down('[name=cd_w_rcv]').setReadOnly(true);
            me.ma23i1601_form1.down('[name=cd_w_issue]').setReadOnly(true);
            Ext.defer(function() {
                me.ma23i1601_form1.blurForm();
            },100);
            me.ma23i1601_headbutton.down('[name = savebutton]').hide();
            me.ma23i1601_headbutton.down('[name = modifybutton]').hide();
            me.ma23i1601_headbutton.down('[name = deletebutton]').hide();
        }
    }
    
    
    
});