/**
 * Created by jiscraft on 2022-11-22.
 */
Ext.define('Terp.view.pj.pj22k2201.Pj22k2201Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.pj22k2201',

    requires: [
        'Terp.view.pj.pj22k2201.pj22k2201popup.Pj22k2201popup'
    ],

    control: {
        'tsoftsearchform[reference=pj22k2201_searchform]': {
            boxready: 'onBoxReady_pj22k2201_searchform'
        },
        'tsoftgrid[reference=pj22k2201_grid1]': {
            rowdblclick: 'onItemdblclick_pj22k2201_grid1',
            selectionchange: 'onSelectionchange_pj22k2201_grid1'
        },
        /*
        onItemdblclick_pj22k2201_grid1
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
        me.pj22k2201_headbutton = me.lookupReference('pj22k2201_headbutton');
        me.pj22k2201_searchform = me.lookupReference('pj22k2201_searchform');


        me.pj22k2201_grid1 = me.lookupReference('pj22k2201_grid1');
        me.pj22k2201_grid1_store =  me.getViewModel().getStore('pj22k2201_grid1_store') ;

        me.pj22k2201_functionform = me.lookupReference('pj22k2201_functionform');

        me.onInitValue();
    },

    onInitValue : function(){
        var me = this;
        //form helpform에는 콤보를 바인딩 해주어야함
        // me.commonFn.setCommonCode(me.lookupReference('pj22k2201_form1_fg_sm200') ,'SM200');
    },

    onBoxReady_pj22k2201_searchform : function(){
        var me = this;
        me.onSelect();
    },

    onSelect : function(){
        var me = this;
        me.onSelect_pj22k2201_grid1();
        Ext.defer(function() {
            me.onEditControlMode('select');
        },300);        
    },

    onSelect_pj22k2201_grid1 : function () {
        var me = this;

        var fgStatus = me.pj22k2201_searchform.down('[name=fg_statusString]').getValue();

        var jsonData = {
            'actiondata': 'gmlist',
            'loginIduser': me.commonFn.getUserInfo('id_user'),
            'loginCdc': me.commonFn.getUserInfo('cd_c'),
            'cd_site':  me.pj22k2201_searchform.down('[name=cd_site]').getValue(),
            'cd_p':  me.pj22k2201_searchform.down('[name=cd_p]').getValue(),
            'fg_statusString':  fgStatus ,//me.pj22k2201_searchform.down('[name=fg_status]').getValue(),
            'ym_fr':  me.pj22k2201_searchform.down('[name=ym_fr]').getValue(),
            'ym_to':  me.pj22k2201_searchform.down('[name=ym_to]').getValue()

        };
        var sendDataJson = [];
        sendDataJson.push(jsonData);
        var sendDataJsonEncode = Ext.encode(sendDataJson);

        me.pj22k2201_grid1_store.load({
            params :{
                sendData : sendDataJsonEncode
            },
            callback : function(records, operation , success){
                var me = this;
                if (success == true) {
                    Ext.getBody().unmask();
                    if ( records.length > 0 ){
                        me.pj22k2201_grid1.getSelectionModel().select(0);
                    }
                    // me.onEditControlMode('select');
                } else {
                    Ext.getBody().unmask();
                    var errorMsg = this.getViewModel().getStore('pj22k2201_grid1_store').getProxy().getReader().rawData.msg;
                    me.commonFn.errorHandling(errorMsg);
                }
            },
            scope : me
        });
    },

    onItemdblclick_pj22k2201_grid1 : function(obj , record , tr , rowIndex , e , eOpts){
        var me = this;
        var cdSite = me.pj22k2201_searchform.down('[name=cd_site]').getValue();
        var noGs = record.data.no_gs;
        var idRow = record.data.id_row;
        me.onPopupWindow( record.data,'edit' , cdSite , noGs , idRow , '0');
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

        var pop = Ext.create('Terp.view.pj.pj22k2201.pj22k2201popup.Pj22k2201popup',{
            popupParamView : me.getView() ,
            popupParams : paramjsonData ,
            autoShow: true
        });

        pop.on('close', function() {
            me.onPopupCallback_pj22k2201();
        });
    },

    onPopupCallback_pj22k2201 : function(){
        var me = this;
        me.onSelect();
    },


    onSelectionchange_pj22k2201_grid1 : function(obj , selected , eOpt){
        var me = this;
        if (Ext.isEmpty(selected)){
            me.pj22k2201_functionform.down('[name=no_gs]').setValue('');
            me.pj22k2201_functionform.down('[name=dt_inmoney]').setValue('');
            me.pj22k2201_functionform.down('[name=dt_inmoney_modify]').setValue('');
            return;
        }
        me.pj22k2201_functionform.down('[name=no_gs]').setValue(selected[0].data.no_gs);
        me.pj22k2201_functionform.down('[name=dt_inmoney]').setValue(selected[0].data.dt_inmoney_modify =='' ? selected[0].data.dt_inmoney : selected[0].data.dt_inmoney_modify);

    },


    onButtonClik_pj22k2201_form1_planmodify : function(){
        var me = this;
        var selData = me.pj22k2201_grid1.getSelectionModel().getSelection()[0].data;
        if ( selData.at_gm_rem == 0 ){
            me.commonFn.toastMessage('입금이 완료되어 예정일을 변경 할 수 없습니다','w');
            return;
        }

        if ( selData.no_gs == ''){
            me.commonFn.toastMessage('선택된 기성정보가 없습니다','w');
            return;
        }

        if ( me.pj22k2201_functionform.down('[name=dt_inmoney_modify]').getValue() =='' ){
            me.commonFn.toastMessage('변경 입금예정일을 입력하세요','w');
            return;
        }

        Ext.MessageBox.confirm('확인', '선택한 기성청구서의 입금예정일을 변경하시겠습니까?', function (btn) {
            if (btn == 'yes') {
                var jsonData = {
                    'actiondata': 'modifyInMoney',
                    'loginIduser': me.commonFn.getUserInfo('id_user'),
                    'loginCdc': me.commonFn.getUserInfo('cd_c'),
                    'no_gs':  selData.no_gs ,
                    'dt_inmoney_modify' : me.pj22k2201_functionform.down('[name=dt_inmoney_modify]').getValue()
                };
                var sendDataJson = [];
                sendDataJson.push(jsonData);
                var sendDataJsonEncode = Ext.encode(sendDataJson);
                me.commonFn.getTsoftAjaxRequest(sendDataJsonEncode , '../ServerPage/pj/pj_gs.jsp' , true , function (ajaxResult) {
                    if ( ajaxResult.success ){
                        me.commonFn.toastMessage('입금예정일 변경 성공','t');
                        me.pj22k2201_functionform.down('[name=no_gs]').setValue('');
                        me.pj22k2201_functionform.down('[name=dt_inmoney]').setValue('');
                        me.pj22k2201_functionform.down('[name=dt_inmoney_modify]').setValue('');
                        me.onSelect();
                    }
                });


            } else {
                me.pj22k2201_functionform.down('[name=dt_inmoney_modify]').setValue('');
                return;
            }
        });
    },


    onEditControlMode : function(value){
        var me = this;
        if (value == 'select'){
            me.pj22k2201_grid1.setReadOnly(true);
            me.pj22k2201_headbutton.setActiveButton({modify :'N' ,insert :'N' ,  delete:'N', save :'N' , print :'Y' , select :'Y'});
            me.pj22k2201_grid1.setActiveButton({insert :'N' , modify :'N' , delete:'N', save :'N', copy :'' , import :'N' , export :'Y'});
        }

    }
});