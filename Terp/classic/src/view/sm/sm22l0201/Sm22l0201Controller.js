/**
 * Created by jiscraft on 2022-12-02.
 */
Ext.define('Terp.view.sm.sm22l0201.Sm22l0201Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.sm22l0201',

    requires: [
        'Terp.view.sm.sm22l0201.sm22l0201popup.Sm22l0201popup'
    ],

    control: {
        'tsoftsearchform[reference=sm22l0201_searchform]': {
            boxready: 'onBoxReady_sm22l0201_searchform'
        },
        'tsoftgrid[reference=sm22l0201_grid1]': {
            itemdblclick: 'onItemdblclick_sm22l0201_grid1'
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
        me.sm22l0201_headbutton = me.lookupReference('sm22l0201_headbutton');
        me.sm22l0201_searchform = me.lookupReference('sm22l0201_searchform');

        me.sm22l0201_grid1 = me.lookupReference('sm22l0201_grid1');
        me.sm22l0201_grid1_store =  me.getViewModel().getStore('sm22l0201_grid1_store') ;

        me.onInitValue();
    },

    onInitValue : function(){
        var me = this;
        //form helpform에는 콤보를 바인딩 해주어야함
        // me.commonFn.setCommonCode(me.lookupReference('sm22l0201_form1_fg_sm200') ,'SM200');
    },

    onBoxReady_sm22l0201_searchform : function(){
        var me = this;
        me.onSelect();
    },

    onSelect : function(){
        var me = this;
        me.onSelect_sm22l0201_grid1();

    },

    onSelect_sm22l0201_grid1 : function () {
        var me = this;

        var fgStatus = me.sm22l0201_searchform.down('[name=fg_statusString]').getValue().cbg;

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
            'cd_site_sale':  me.sm22l0201_searchform.down('[name=cd_site_sale]').getValue(),
            'cd_p_con':  me.sm22l0201_searchform.down('[name=cd_p_con]').getValue(),
            'fg_statusString':  fgStatusVar ,//me.sm22l0201_searchform.down('[name=fg_status]').getValue(),
        };

        var sendDataJson = [];
        sendDataJson.push(jsonData);
        var sendDataJsonEncode = Ext.encode(sendDataJson);

        me.sm22l0201_grid1_store.load({
            params :{
                sendData : sendDataJsonEncode
            },
            callback : function(records, operation , success){
                var me = this;
                if (success == true) {
                    Ext.getBody().unmask();
                    if ( records.length > 0 ){
                        //조회한뒤 원하는 데이타로 포커스를 이동시키기 위해 처리 이경우는 팝업을 호출하고 return key를 돌려주었을경우
                        var focusKey = me.getView().config.windowReturnData;
                        if (Ext.isEmpty(focusKey) || focusKey == '') {
                            me.sm22l0201_grid1.getSelectionModel().select(0);
                            me.sm22l0201_grid1.getView().bufferedRenderer.scrollTo(0, true);
                        } else {
                            var row = me.sm22l0201_grid1_store.find('cd_site_sale', focusKey);
                            me.sm22l0201_grid1.getSelectionModel().select(row);
                            me.sm22l0201_grid1.getView().bufferedRenderer.scrollTo(row, true);
                            //팝업에서 리턴이 돌아왔을 경우만 사용
                            me.getView().config.windowReturnData = '';
                        }
                    }
                    me.onEditControlMode('select');
                } else {
                    Ext.getBody().unmask();
                    var errorMsg = this.getViewModel().getStore('sm22l0201_grid1_store').getProxy().getReader().rawData.msg;
                    me.commonFn.errorHandling(errorMsg);
                }
            },
            scope : me
        });
    },

    onInsert : function(){
        var me = this;
        var paramjsonData = {
            'sitestore' : me.sm22l0201_grid1_store,
            'record' : '' ,
            'cd_site_sale' : '',
            'id_row' : me.commonFn.sqlRowId(),
            'fg_window':'new'
        };

        var pop = Ext.create('Terp.view.sm.sm22l0201.sm22l0201popup.Sm22l0201popup',{
            popupParamView : me.getView() ,
            popupParams : paramjsonData ,
            autoShow: true
        });

        pop.on('close', function(popupView) {

            me.onPopupCallback_sm22l0201(popupView);
        });

    },

    onItemdblclick_sm22l0201_grid1 : function(obj , record , tr , rowIndex , e , eOpts){
        var me = this;
        me.getView().config.windowReturnData = record.data.cd_site_sale;
        var paramjsonData = {
            'constore' : me.sm22l0201_grid1_store,
            'record' : record ,
            'cd_site_sale' :record.data.cd_site_sale,
            'id_row' : record.data.id_row,
            'fg_window':'edit'
        };

        var pop = Ext.create('Terp.view.sm.sm22l0201.sm22l0201popup.Sm22l0201popup',{
            popupParamView : me.getView() ,
            popupParams : paramjsonData ,
            autoShow: true
        });

        pop.on('close', function() {
            me.onPopupCallback_sm22l0201();
        });

    },

    onPopupCallback_sm22l0201 : function(){
        var me = this;

        me.onSelect();

    },

    onDcFilter_SpecialKey_Enter : function (fld) {
        var me = this;
        var searchValuesFilter =   me.sm22l0201_searchform.down('[name=dc_filter]').getValue().toUpperCase();
        me.sm22l0201_grid1_store.clearFilter();



        me.sm22l0201_grid1_store.filterBy(function(rec) {
            return (Ext.isEmpty(searchValuesFilter) ? true : ((rec.get('nm_site_sale').indexOf(searchValuesFilter) != -1) || (rec.get('cd_site_sale').indexOf(searchValuesFilter) != -1)  || (rec.get('nm_p_con').indexOf(searchValuesFilter) != -1)));
        });

        me.sm22l0201_grid1.getSelectionModel().select(0);
    },

    onEditControlMode : function(value){
        var me = this;
        if (value == 'select'){
            me.sm22l0201_grid1.setReadOnly(true);
            me.sm22l0201_headbutton.setActiveButton({modify :'N' ,insert :'Y' ,  delete:'N', save :'N' , print :'N' , select :'Y'});
            me.sm22l0201_grid1.setActiveButton({insert :'N' , modify :'N' , delete:'N', save :'N', copy :'' , import :'N' , export :'Y'});
        }

    }
    
});