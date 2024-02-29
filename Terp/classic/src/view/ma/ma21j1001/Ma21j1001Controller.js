/**
 * Created by jiscr on 2021-10-11.
 */
Ext.define('Terp.view.ma.ma21j1001.Ma21j1001Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ma21j1001',

    requires: [
        'Terp.view.ma.ma21j1001.ma21j1001popup.Ma21j1001popup'
    ],

    control: {
        'tsoftsearchform[reference=ma21j1001_searchform]': {
            boxready: 'onBoxReady_ma21j1001_searchform'
        },
        'tsoftgrid[reference=ma21j1001_grid1]': {
            rowdblclick: 'onRowDoubleClick_ma21j1001_grid1'
        }
    },


    init: function() {
        var me = this;
        me.commonFn = Terp.app.getController('TerpCommon');
        me.ma21j1001_headbutton = me.lookupReference('ma21j1001_headbutton');
        me.ma21j1001_searchform = me.lookupReference('ma21j1001_searchform');

        me.ma21j1001_grid1 = me.lookupReference('ma21j1001_grid1');
        me.ma21j1001_grid1_store =  me.getViewModel().getStore('ma21j1001_grid1_store') ;

        me.onInitValue();


    },


    onInitValue : function(){
        var me = this;
        me.onSelect();

    },

    onBoxReady_ma21j1001_searchform : function(){
        var me = this;
        // me.onSelect();
    },

    onSelect : function(){
        var me = this;

        var jsonData = {
            'actiondata': 'm',
            'loginIduser': me.commonFn.getUserInfo('id_user'),
            'loginCdc': me.commonFn.getUserInfo('cd_c'),
            'fg_workstatus':  me.ma21j1001_searchform.down('[name=fg_workstatus]').getValue()
        };

        var sendDataJson = [];
        sendDataJson.push(jsonData);
        var sendDataJsonEncode = Ext.encode(sendDataJson);

        Ext.getBody().mask("Loading...");
        me.ma21j1001_grid1_store.load({
            params :{
                sendData : sendDataJsonEncode
            },
            callback : me.onSelectCallback,
            scope : me
        });
    },

    onSelectCallback : function(records, operation , success) {
        var me = this;

        if (success == true) {
            Ext.getBody().unmask();
            me.ma21j1001_grid1.setReadOnly(true);
            if ( records.length > 0 ){
                // me.ma21j1001_grid1.getSelectionModel().select(me.ma21j1001_grid1.focusRowIndex);
                // me.ma21j1001_grid1.getView().getRow(me.ma21j1001_grid1.focusRowIndex).scrollIntoView();
                me.ma21j1001_grid1.selectAndScroll();
            }


        } else {
            Ext.getBody().unmask();
            var errorMsg = this.getViewModel().getStore('ma21j1001_grid1_store').getProxy().getReader().rawData.msg;
            me.commonFn.errorHandling(errorMsg);
        }
    },

    onInsert : function(){
        var me = this;
        var idRow = me.commonFn.sqlRowId();

        var paramjsonData = {
            'cd_e': '',
            'id_row' : idRow,
            'fg_window':'new'
        };


        var pop = Ext.create('Terp.view.ma.ma21j1001.ma21j1001popup.Ma21j1001popup',{
            popupParamView : me.getView() ,   //부르는넘의 뷰
            popupParams : paramjsonData ,  //처리할파라미터
            autoShow: true
        });

        pop.on('close', function() {
            me.onSelect();
        });

    },


    onRowDoubleClick_ma21j1001_grid1 : function(obj , record , tr , rowIndex , e , eOpts){
        var me = this;

        var paramjsonData = {
            'cd_e': record.data.cd_e,
            'id_row' : record.data.id_row,
            'fg_window':'edit'
        };


        var pop = Ext.create('Terp.view.ma.ma21j1001.ma21j1001popup.Ma21j1001popup',{
            popupParamView : me.getView() ,   //부르는넘의 뷰
            popupParams : paramjsonData ,  //처리할파라미터
            autoShow: true
        });

        pop.on('close', function() {
            me.ma21j1001_grid1.selectAndScrollIndex =  me.ma21j1001_grid1_store.find('id_row', record.data.id_row);
            me.onSelect();
        });
    }


});