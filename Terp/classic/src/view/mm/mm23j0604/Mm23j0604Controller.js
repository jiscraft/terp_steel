/**
 * Created by jiscraft on 2023-10-06.
 */
Ext.define('Terp.view.mm.mm23j0604.Mm23j0604Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.mm23j0604',

    control: {
        'tsoftsearchform[reference=mm23j0604_searchform]': {
            boxready: 'onBoxReady_mm23j0604_searchform'
        },
        'tsoftgrid[reference=mm23j0604_grid1]': {
            beforecellclick: 'onBoxReady_mm23j0604_grid1'
        },
        'tsoftgrid[reference=mm23j0604_grid2]': {
            boxready: 'onBoxReady_mm23j0604_grid2'
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
        me.mm23j0604_headbutton = me.lookupReference('mm23j0604_headbutton');
        me.mm23j0604_searchform = me.lookupReference('mm23j0604_searchform');

        me.mm23j0604_form1 = me.lookupReference('mm23j0604_form1');
        me.mm23j0604_form1_store =  me.getViewModel().getStore('mm23j0604_form1_store') ;
        
        me.mm23j0604_grid1 = me.lookupReference('mm23j0604_grid1');
        me.mm23j0604_grid1_store =  me.getViewModel().getStore('mm23j0604_grid1_store') ;
    
        me.mm23j0604_grid2 = me.lookupReference('mm23j0604_grid2');
        me.mm23j0604_grid2_store =  me.getViewModel().getStore('mm23j0604_grid2_store') ;
    
        me.onInitValue();
    },
    
    onInitValue : function(){
        var me = this;
        //form helpform에는 콤보를 바인딩 해주어야함
        // me.commonFn.setCommonCode(me.lookupReference('mm23j0604_form1_fg_sm200') ,'SM200');
    },
    
    onBoxReady_mm23j0604_searchform : function(){
        var me = this;

    },
    onBoxReady_mm23j0604_grid1 : function(obj, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        var me = this;
        if(record.data.qt_available == 0){
            me.commonFn.toastMessage('불출 가능한 수량이 없습니다' ,'w');
            return false;
        }
    },


    onBoxReady_mm23j0604_grid2 : function() {
        var me = this;
        me.mm23j0604_grid2.getPlugin('cellplugin').on({
            validateedit: function(editor, context) {
                //20210831 jiscraft remark bh beam입력시 숫자만 입력메시지 제거
                // if (context.field == 'dc_spec') {
                //     if (isNaN(parseFloat(context.record.get('dc_spec'))) && context.record.get('dc_spec') != '') {
                //         commonFn.toastMessage("규격에는 숫자만 입력해주세요", 'b');
                //         return false;
                //     }
                // }
                // if ((context.field == 'nb_width') && (context.record.get('yn_width') !== 'Y' ) &&  (context.record.get('nb_width') !== 0 ) ){
                //
                //         // commonFn.toastMessage("규격에는 숫자만 입력해주세요", 'b');
                //         return false;
                //
                // }
            },
            edit: function(editor, context) {
                if (context.field === 'qt_mr') {
                    if ( context.record.get('qt_mr') > context.record.get('qt_available')){
                        me.commonFn.toastMessage('불출 가능한 수량보다 요청수량이 큽니다' ,'w');
                        context.record.set('qt_mr' , context.record.get('qt_available'));
                        return ;
                    }
                    if ((context.field == 'nb_size') && (context.record.get('yn_size') !== 'Y')) {
                        context.record.set('nb_size',0);
                    }
                    context.record.set('qt_mr_spec', (context.record.get('unit_spec') * context.record.get('qt_mr')).toFixed(1)) ;
                    me.mm23j0604_grid2.getPlugin('cellplugin').completeEdit();
                }

            },
            canceledit: function(editor, context) {
            }
        });

    },
    
    onSelect : function(){
        var me = this;

        var checkstring = me.mm23j0604_searchform.checkBlank();
        if (checkstring !='' && checkstring != undefined){
            me.commonFn.toastMessage(checkstring,'w');
            return;
        }
        
        var jsonData = {
            'actiondata': 'mr',
            'loginIduser': me.commonFn.getUserInfo('id_user'),
            'loginCdc': me.commonFn.getUserInfo('cd_c'),
            'cd_site':  me.mm23j0604_searchform.down('[name=cd_site]').getValue(),
            'cd_w':  me.mm23j0604_searchform.down('[name=cd_w]').getValue(),
            'fg_mm060':  me.mm23j0604_searchform.down('[name=fg_mm060]').getValue()
    
        };
        var sendDataJson = [];
        sendDataJson.push(jsonData);
        var sendDataJsonEncode = Ext.encode(sendDataJson);
    
        me.mm23j0604_grid1_store.load({
            params :{
                sendData : sendDataJsonEncode
            },
            callback : function(records, operation , success){
                var me = this;
                if (success == true) {
                    Ext.getBody().unmask();
                    if ( records.length > 0 ){
                        me.mm23j0604_grid2_store.removeAll();
                        me.mm23j0604_grid2_store.commitChanges();
                        me.mm23j0604_form1.clearForm();
                    }
                    me.onEditControlMode('select');
                } else {
                    Ext.getBody().unmask();
                    var errorMsg = this.getViewModel().getStore('me.mm23j0604_grid1_store').getProxy().getReader().rawData.msg;
                    me.commonFn.errorHandling(errorMsg);
                }        
            },
            scope : me
        });
    
    },

    onInsertGrid : function(gridSelection , gridRowindex){
        var me = this;
        me.mm23j0604_grid2.setReadOnly(false);
        var selected = me.mm23j0604_grid1.getSelectionModel().getSelection();

        if (selected.length == 0){
            me.commonFn.toastMessage('요청할 항목을 선택후 진행하세요' , 'w');
            return;
        }

        if(Ext.isEmpty(me.mm23j0604_form1.down('[name=no_mr]').getValue() )) {
            me.mm23j0604_form1.down('[name=no_mr]').setValue(me.commonFn.sqlNodocu('MR', me.commonFn.getUserInfo().cd_c, me.commonFn.getTodayInfo()));
            me.commonFn.setDataBindHelpBox(me.mm23j0604_form1, 'cd_e', me.commonFn.getUserInfo().cd_e, me.commonFn.getUserInfo().nm_e);
            me.mm23j0604_form1.down('[name=dt_mr]').setValue(Ext.Date.format(new Date(), 'Ymd'));
            me.mm23j0604_form1.down('[name=dt_issue]').setValue(Ext.Date.format(new Date(), 'Ymd'));
            me.mm23j0604_form1.down('[name=cd_w_fr]').setValue(me.mm23j0604_searchform.down('[name=cd_w]').getValue());
            me.commonFn.setDataBindHelpBox(me.mm23j0604_form1, 'cd_w_fr', me.mm23j0604_searchform.down('[name=cd_w]').getValue() , me.mm23j0604_searchform.down('[name=cd_w]').getDisplayValue());
            var idRow = me.commonFn.sqlRowId();
            me.mm23j0604_form1.down('[name=id_row]').setValue(idRow);
        }


        for (var i = 0; i < selected.length; i++) {
            rowIdx  = me.mm23j0604_grid2.getGridRowIdx();
            if (rowIdx == 0 || rowIdx == undefined) {
                rowIdx = 0;
            }
            selected[i].data.qt_mr = selected[i].data.qt_available;
            selected[i].data.qt_mr_spec = selected[i].data.qt_available_spec;

            me.mm23j0604_grid2.getPlugin('cellplugin').completeEdit();
            me.mm23j0604_grid2.getStore('mm21d2101popup_grid2_store').insert(rowIdx, selected[i].data);
            me.mm23j0604_grid1_store.remove(selected[i]);
            me.mm23j0604_grid1_store.commitChanges();
            me.mm23j0604_grid2_store.commitChanges();
        }

    },

    onDeleteGrid : function(gridSelection , gridRowindex){
        var me = this;

        var selected = me.mm23j0604_grid2.getSelectionModel().getSelection();
        if (selected.length == 0){
            me.commonFn.toastMessage('삭제할 항목을 선택후 진행하세요' , 'w');
            return;
        }


        for (var i = 0; i < selected.length; i++) {
            rowIdx  = me.mm23j0604_grid1.getGridRowIdx();
            if (rowIdx == 0 || rowIdx == undefined) {
                rowIdx = 0;
            }
            selected[i].data.qt_mr = 0;
            selected[i].data.qt_mr_spec = 0;
            selected[i].data.dc_remark = '';
            me.mm23j0604_grid1.getPlugin('cellplugin').completeEdit();
            me.mm23j0604_grid1.getStore('mm21d2101popup_grid1_store').insert(rowIdx, selected[i].data);
            me.mm23j0604_grid2_store.remove(selected[i]);
            me.mm23j0604_grid2_store.commitChanges();
            me.mm23j0604_grid1_store.commitChanges();
        }

    },


    onSave : function(){
        var me = this;

        var checkstring = me.mm23j0604_form1.checkBlank();
        if (checkstring !='' && checkstring != undefined){
            me.commonFn.toastMessage(checkstring,'w');
            return;
        }

        var sendDataJson = [];
        me.mm23j0604_grid1.getPlugin('cellplugin').completeEdit();
        var formData ={
            actiondata : 'sall',
            actionDetailData : 'hData',
            loginIduser : me.commonFn.getUserInfo().id_user,
            loginCdc : me.commonFn.getUserInfo().cd_c,
            no_mr : me.mm23j0604_form1.down('[name=no_mr]').getValue(),
            dt_mr : me.mm23j0604_form1.down('[name=dt_mr]').getValue(),
            dt_issue : me.mm23j0604_form1.down('[name=dt_issue]').getValue(),
            cd_w_fr : me.mm23j0604_form1.down('[name=cd_w_fr]').getValue(),
            cd_w_to : me.mm23j0604_form1.down('[name=cd_w_to]').getValue(),
            cd_e : me.mm23j0604_form1.down('[name=cd_e]').getValue(),
            dc_remark : me.mm23j0604_form1.down('[name=dc_remark]').getValue(),
            id_row : me.mm23j0604_form1.down('[name=id_row]').getValue()
        };

        sendDataJson.push(formData);

        var gridData = me.mm23j0604_grid2_store.getData().items;
        var sendLineDataJson = [];
        for (var i = 0; i < gridData.length; i++) {
            gridData[i].data.actiondata = 'sall';
            gridData[i].data.actionDetailData = 'lData';
            gridData[i].data.loginIduser = me.commonFn.getUserInfo().id_user;
            gridData[i].data.loginCdc = me.commonFn.getUserInfo().cd_c;
            gridData[i].data.no_mr = me.mm23j0604_form1.down('[name=no_mr]').getValue();
            sendDataJson.push(
                gridData[i].data
            );
        }

        var sendDataJsonEncode = Ext.encode(sendDataJson);
        me.commonFn.getTsoftAjaxRequest(sendDataJsonEncode , '../ServerPage/mm/mm_mr_h.jsp' , true , function (ajaxResult) {
            if ( ajaxResult.success ){
                me.commonFn.toastMessage('저장 성공','t');
                me.onSelect();
            }
        });
    },

    onEditControlMode : function (value) {
        var me = this;
        if (value == 'select'){
            me.mm23j0604_headbutton.setActiveButton({modify :'N' ,insert :'N' ,  delete:'N', save :'Y' , print :'N' , select :'Y'});
            me.mm23j0604_grid1.setActiveButton({insert :'N' , modify :'N' , delete:'N', save :'N', copy :'N' , import :'N' , export :'N'});
        }


    },

});