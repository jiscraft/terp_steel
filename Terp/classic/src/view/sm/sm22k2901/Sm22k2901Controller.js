/**
 * Created by jiscraft on 2022-11-29.
 */
Ext.define('Terp.view.sm.sm22k2901.Sm22k2901Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.sm22k2901',

    requires: [
        'Terp.view.sm.sm22k2901.sm22k2901popup.Sm22k2901popup'
    ],

    control: {
        'tsoftsearchform[reference=sm22k2901_searchform]': {
            boxready: 'onBoxReady_sm22k2901_searchform'
        },
        'tsoftgrid[reference=sm22k2901_grid1]': {
            selectionchange: 'onSelectionchange_sm22k2901_grid1',
            rowdblclick : 'onRowdblclick_sm22k2901_grid1',
            boxready: 'onBoxReady_sm22k2901_grid1'
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
        me.sm22k2901_headbutton = me.lookupReference('sm22k2901_headbutton');
        me.sm22k2901_searchform = me.lookupReference('sm22k2901_searchform');

        me.sm22k2901_form1 = me.lookupReference('sm22k2901_form1');

        me.sm22k2901_grid1 = me.lookupReference('sm22k2901_grid1');
        me.sm22k2901_grid1_store = me.getViewModel().getStore('sm22k2901_grid1_store');

        me.sm22k2901_grid2 = me.lookupReference('sm22k2901_grid2');
        me.sm22k2901_grid2_store = me.getViewModel().getStore('sm22k2901_grid2_store');

    },


    onBoxReady_sm22k2901_searchform : function(){
        var me = this;
        me.onSelect();
    },

    onBoxReady_sm22k2901_grid1: function(){
        var me = this;
        // me.onEditControlMode('init');
    },

    onSelect : function(){
        var me = this;
        me.sm22k2901_searchform.down('[name=dc_filter]').setValue('');
        me.sm22k2901_grid1_store.clearFilter();

        me.onSelect_sm22k2901_grid1();
        // me.onEditControlMode('select');
    },


    onSelect_sm22k2901_grid1 : function(){
        var me = this;
    
        var jsonData = {
            'actiondata': 'm',
            'loginIduser': me.commonFn.getUserInfo('id_user'),
            'loginCdc': me.commonFn.getUserInfo('cd_c')
        };

        var sendDataJson = [];
        sendDataJson.push(jsonData);
        var sendDataJsonEncode = Ext.encode(sendDataJson);
    
        me.sm22k2901_grid1_store.load({
            params :{
                sendData : sendDataJsonEncode
            },
            callback : function(records, operation , success){
                var me = this;
                if (success == true) {
                    Ext.getBody().unmask();
                    if (records.length > 0) {
                        //조회한뒤 원하는 데이타로 포커스를 이동시키기 위해 처리 이경우는 팝업을 호출하고 return key를 돌려주었을경우
                        var focusKey = me.getView().config.windowReturnData;
                        if (Ext.isEmpty(focusKey) || focusKey == '') {
                            me.sm22k2901_grid1.getSelectionModel().select(0);
                            me.sm22k2901_grid1.getView().bufferedRenderer.scrollTo(0, true);
                        } else {
                            var row = me.sm22k2901_grid1_store.find('cd_p', focusKey);
                            me.sm22k2901_grid1.getSelectionModel().select(row);
                            me.sm22k2901_grid1.getView().bufferedRenderer.scrollTo(row, true);
                            //팝업에서 리턴이 돌아왔을 경우만 사용
                            me.getView().config.windowReturnData = '';
                        }
                    }
                    me.onEditControlMode('select');
                } else {
                    Ext.getBody().unmask();
                    var errorMsg = this.getViewModel().getStore('sm22k2901_grid1_store').getProxy().getReader().rawData.msg;
                    me.commonFn.errorHandling(errorMsg);
                }        
            },
            scope : me
        });
    },

    onSelectionchange_sm22k2901_grid1 : function(obj , selected , eOpt){
        var me = this;
        if (!Ext.isEmpty(selected)){
            var jsonData = {
                'actiondata': 'select',
                'loginIduser': me.commonFn.getUserInfo('id_user'),
                'loginCdc': me.commonFn.getUserInfo('cd_c'),
                'cd_p': selected[0].data.cd_p
            };
            me.onSelect_sm22k2902_grid2(jsonData);
        }

    },



    onSelect_sm22k2902_grid2 : function(jsonData){
        var me = this;

        var sendDataJson = [];
        sendDataJson.push(jsonData);
        var sendDataJsonEncode = Ext.encode(sendDataJson);

        me.sm22k2901_grid2_store.load({
            params :{
                sendData : sendDataJsonEncode
            },
            callback : function(records, operation , success){
                var me = this;
                if (success == true) {
                    Ext.getBody().unmask();
                    if ( records.length > 0 ){
                        me.sm22k2901_grid2.getSelectionModel().select(0);
                    }


                    me.onEditControlMode('select');
                } else {
                    Ext.getBody().unmask();
                    var errorMsg = this.getViewModel().getStore('sm22k2901_grid2_store').getProxy().getReader().rawData.msg;
                    me.commonFn.errorHandling(errorMsg);
                }
            },
            scope : me
        });
    },

    onInsert : function(){
        var me = this;
        var paramjsonData = {
            'constore' : me.sm22k2901_grid1_store,
            'cd_p' :'',
            'id_row' : me.commonFn.sqlRowId(),
            'fg_window':'new'
        };

        var pop = Ext.create('Terp.view.sm.sm22k2901.sm22k2901popup.Sm22k2901popup',{
            popupParamView : me.getView() ,
            popupParams : paramjsonData ,
            autoShow: true
        });

        pop.on('close', function(popupView) {

            me.onPopupCallback_sm22k2901(popupView);
        });
    
    },

    onRowdblclick_sm22k2901_grid1 : function(obj , record , tr , rowIndex , e , eOpts){
        var me = this;
        var paramjsonData = {
            'constore' : me.sm22k2901_grid1_store,
            'record' : record ,
            'cd_p' :record.data.cd_p,
            'id_row' : record.data.id_row,
            'fg_window':'edit'
        };
        me.getView().config.windowReturnData = record.data.cd_p;
        var pop = Ext.create('Terp.view.sm.sm22k2901.sm22k2901popup.Sm22k2901popup',{
            popupParamView : me.getView() ,
            popupParams : paramjsonData ,
            autoShow: true
        });

        pop.on('close', function() {
            me.onPopupCallback_sm22k2901();
        });

    },
    
    
    onPopupCallback_sm22k2901 : function(){
        var me = this;

        me.onSelect();

    },

    onDcFiler_SpecialKey_Enter : function (fld) {
        var me = this;
        var searchValuesFilter =   me.sm22k2901_searchform.down('[name=dc_filter]').getValue().toUpperCase();
        me.sm22k2901_grid1_store.clearFilter();



        me.sm22k2901_grid1_store.filterBy(function(rec) {
            return (Ext.isEmpty(searchValuesFilter) ? true : ((rec.get('nm_p').indexOf(searchValuesFilter) != -1) || (rec.get('cd_p').indexOf(searchValuesFilter) != -1)));
        });

        me.sm22k2901_grid1.getSelectionModel().select(0);
    },
    
    onEditControlMode : function(value){
        var me = this;

        if (value == 'init') {
            me.sm22k2901_grid1.setReadOnly(true);
            me.sm22k2901_grid2.setReadOnly(true);
            me.sm22k2901_form1.setReadOnly(true);
            me.sm22k2901_headbutton.setActiveButton({modify :'N' , insert :'Y' ,  delete:'N', save :'Y' , print :'N' , select :'Y'});
            me.sm22k2901_grid1.setActiveButton({insert :'N' , modify :'N' , delete:'N', save :'N', copy :'N' , import :'N' , export :'Y'});
            me.sm22k2901_grid2.setActiveButton({insert :'N' , modify :'N' , delete:'N', save :'N', copy :'N' , import :'N' , export :'Y'});
        }

        if (value == 'select') {
            me.sm22k2901_grid1.setReadOnly(true);
            me.sm22k2901_grid2.setReadOnly(true);
            me.sm22k2901_form1.setReadOnly(true);
            me.sm22k2901_headbutton.setActiveButton({modify :'N' , insert :'Y' ,  delete:'N', save :'Y' , print :'N' , select :'Y'});
            me.sm22k2901_grid1.setActiveButton({insert :'N' , modify :'N' , delete:'N', save :'N', copy :'N' , import :'N' , export :'Y'});
            me.sm22k2901_grid2.setActiveButton({insert :'N' , modify :'N' , delete:'N', save :'N', copy :'N' , import :'N' , export :'Y'});
        }
    }

});
