/**
 * Created by jiscraft on 2023-10-04.
 */
Ext.define('Terp.view.mm.mm23j0401.Mm23j0401Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.mm23j0401',

    control: {
        'tsoftsearchform[reference=mm23j0401_searchform]': {
            boxready: 'onBoxReady_mm23j0401_searchform'
        },
        'tsoftgrid[reference=mm23j0401_grid2]': {
            boxready: 'onBoxReady_mm23j0401_grid2'
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
        me.mm23j0401_headbutton = me.lookupReference('mm23j0401_headbutton');
        me.mm23j0401_searchform = me.lookupReference('mm23j0401_searchform');
    
        me.mm23j0401_form1 = me.lookupReference('mm23j0401_form1');
        me.mm23j0401_form1_store =  me.getViewModel().getStore('mm23j0401_form1_store') ;
        
        me.mm23j0401_grid1 = me.lookupReference('mm23j0401_grid1');
        me.mm23j0401_grid1_store =  me.getViewModel().getStore('mm23j0401_grid1_store') ;
    
        me.mm23j0401_grid2 = me.lookupReference('mm23j0401_grid2');
        me.mm23j0401_grid2_store =  me.getViewModel().getStore('mm23j0401_grid2_store') ;

        me.btnAttachFiles1 = me.lookupReference('mm23j0401_buttonform_btnAttachFiles1');
        me.btnAttachFiles2 = me.lookupReference('mm23j0401_buttonform_btnAttachFiles2');
        me.onInitValue();
    },
    
    onInitValue : function(){
        var me = this;
        //form helpform에는 콤보를 바인딩 해주어야함
        // me.commonFn.setCommonCode(me.lookupReference('mm23j0401_form1_fg_sm200') ,'SM200');
    },

    onBoxReady_mm23j0401_searchform : function(){
        var me = this;
        // me.onSelect();
    },

    onBoxReady_mm23j0401_grid2 : function() {
        var me = this;
        me.mm23j0401_grid2.getPlugin('cellplugin').on({
            beforeedit: function(editor, context) {
                if ((context.field == 'cd_spec') && (context.record.get('yn_spec') !== 'Y')) {
                    context.record.set('yn_spec','');
                    return false;
                }
                if ((context.field == 'nb_size') && (context.record.get('yn_size') !== 'Y')) {
                    context.record.set('nb_size',0);
                    return false;
                }

            },
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
                if (context.field === 'qt_rcv') {
                    if ((context.field == 'nb_size') && (context.record.get('yn_size') !== 'Y')) {
                        context.record.set('nb_size',0);
                    }
                    context.record.set('qt_rcv_spec', (context.record.get('qt_po_spec_unit') * context.record.get('qt_rcv')).toFixed(1)) ;
                    context.record.set('at_rv', me.commonFn.getAmount(context.record.get('fg_mm040'), context.record.get('qt_rcv_spec') , context.record.get('qt_rcv') , context.record.get('up_rv')  ));
                    context.record.set('at_rv_vat', Math.round(context.record.get('at_rv') * 0.1));
                    context.record.set('at_rv_ttl', Math.round(context.record.get('at_rv') + context.record.get('at_rv_vat') ));
                }
                if (context.field === 'qt_rcv_spec' ) {
                    if ((context.field == 'nb_size') && (context.record.get('yn_size') !== 'Y')) {
                        context.record.set('nb_size',0);
                    }
                    context.record.set('at_rv', me.commonFn.getAmount(context.record.get('fg_mm040'), context.record.get('qt_rcv_spec') , context.record.get('qt_rcv') , context.record.get('up_rv')  ));
                    context.record.set('at_rv_vat', Math.round(context.record.get('at_rv') * 0.1));
                    context.record.set('at_rv_ttl', Math.round(context.record.get('at_rv') + context.record.get('at_rv_vat') ));
                }
                if (context.field === 'up_rv' ) {
                    if ((context.field == 'nb_size') && (context.record.get('yn_size') !== 'Y')) {
                        context.record.set('nb_size',0);
                    }
                    context.record.set('at_rv', me.commonFn.getAmount(context.record.get('fg_mm040'), context.record.get('qt_rcv_spec') , context.record.get('qt_rcv') , context.record.get('up_rv')  ));
                    context.record.set('at_rv_vat', Math.round(context.record.get('at_rv') * 0.1));
                    context.record.set('at_rv_ttl', Math.round(context.record.get('at_rv') + context.record.get('at_rv_vat') ));
                }
                if (context.field === 'at_rv' ) {
                    if ((context.field == 'nb_size') && (context.record.get('yn_size') !== 'Y')) {
                        context.record.set('nb_size',0);
                    }
                    context.record.set('at_rv_vat', Math.round(context.record.get('at_rv') * 0.1));
                    context.record.set('at_rv_ttl', Math.round(context.record.get('at_rv') + context.record.get('at_rv_vat') ));
                }
                if (context.field === 'at_rv_vat' ) {
                    if ((context.field == 'nb_size') && (context.record.get('yn_size') !== 'Y')) {
                        context.record.set('nb_size',0);
                    }
                    context.record.set('at_rv_ttl', Math.round(context.record.get('at_rv') + context.record.get('at_rv_vat') ));
                }

            },
            canceledit: function(editor, context) {
            }
        });

    },

    onSelect : function(){
        var me = this;

        var checkstring = me.mm23j0401_searchform.checkBlank();
        if (checkstring !='' ){
            me.commonFn.toastMessage(checkstring,'w');
            return;
        }
    
        var jsonData = {
            'actiondata': 'm',
            'loginIduser': me.commonFn.getUserInfo('id_user'),
            'loginCdc': me.commonFn.getUserInfo('cd_c'),
            'cd_p':  me.mm23j0401_searchform.down('[name=cd_p]').getValue(),
            'cd_w':  me.mm23j0401_searchform.down('[name=cd_w]').getValue(),
            'cd_site':  me.mm23j0401_searchform.down('[name=cd_site]').getValue()
    
        };
        var sendDataJson = [];
        sendDataJson.push(jsonData);
        var sendDataJsonEncode = Ext.encode(sendDataJson);
    
        me.mm23j0401_grid1_store.load({
            params :{
                sendData : sendDataJsonEncode
            },
            callback : function(records, operation , success){
                var me = this;
                if (success == true) {
                    Ext.getBody().unmask();

                    me.mm23j0401_grid2_store.removeAll();
                    me.mm23j0401_grid2_store.commitChanges();
                    me.mm23j0401_form1.clearForm();

                    me.onEditControlMode('select');
                } else {
                    Ext.getBody().unmask();
                    var errorMsg = this.getViewModel().getStore('me.mm23j0401_grid1_store').getProxy().getReader().rawData.msg;
                    me.commonFn.errorHandling(errorMsg);
                }        
            },
            scope : me
        });
    
    },

    onInsertGrid : function(gridSelection , gridRowindex){
        var me = this;
        me.mm23j0401_grid2.setReadOnly(false);
        var selected = me.mm23j0401_grid1.getSelectionModel().getSelection();

        if (selected.length == 0){
            me.commonFn.toastMessage('입고할 항목을 선택후 진행하세요' , 'w');
            return;
        }

        if(Ext.isEmpty(me.mm23j0401_form1.down('[name=no_rv]').getValue() )) {
            me.mm23j0401_form1.down('[name=no_rv]').setValue(me.commonFn.sqlNodocu('RV', me.commonFn.getUserInfo().cd_c, me.commonFn.getTodayInfo()));
            me.commonFn.setDataBindHelpBox(me.mm23j0401_form1, 'cd_p', me.mm23j0401_searchform.down('[name=cd_p]').getValue(), me.mm23j0401_searchform.down('[name=cd_p]').getDisplayValue());
            me.commonFn.setDataBindHelpBox(me.mm23j0401_form1, 'cd_e_rcv', me.commonFn.getUserInfo().cd_e, me.commonFn.getUserInfo().nm_e);
            me.mm23j0401_form1.down('[name=dt_rv]').setValue(Ext.Date.format(new Date(), 'Ymd'));
            var idRow = me.commonFn.sqlRowId();
            me.mm23j0401_form1.down('[name=id_row]').setValue(idRow);

            me.setAttachFilesButton1(idRow);
            me.setAttachFilesButton2(idRow);
        }


        for (var i = 0; i < selected.length; i++) {
            rowIdx  = me.mm23j0401_grid2.getGridRowIdx();
            if (rowIdx == 0 || rowIdx == undefined) {
                rowIdx = 0;
            }
            selected[i].data.qt_rcv = selected[i].data.qt_po_rem;
            selected[i].data.qt_rcv_spec = selected[i].data.qt_po_spec_rem;
            selected[i].data.up_rv = selected[i].data.up_po;

            selected[i].data.at_rv = me.commonFn.getAmount(selected[i].data.fg_mm040 , selected[i].data.qt_rcv_spec , selected[i].data.qt_rcv , selected[i].data.up_rv  );
            selected[i].data.at_rv_vat= Math.round(selected[i].data.at_rv * 0.1);
            selected[i].data.at_rv_ttl= Math.round(selected[i].data.at_rv + selected[i].data.at_rv_vat );


            me.mm23j0401_grid2.getPlugin('cellplugin').completeEdit();
            me.mm23j0401_grid2.getStore('mm21d2101popup_grid2_store').insert(rowIdx, selected[i].data);
            me.mm23j0401_grid1_store.remove(selected[i]);
            me.mm23j0401_grid1_store.commitChanges();
            me.mm23j0401_grid2_store.commitChanges();
        }

    },


    onDeleteGrid : function(gridSelection , gridRowindex){
        var me = this;

        var selected = me.mm23j0401_grid2.getSelectionModel().getSelection();
        if (selected.length == 0){
            me.commonFn.toastMessage('삭제할 항목을 선택후 진행하세요' , 'w');
            return;
        }


        for (var i = 0; i < selected.length; i++) {
            rowIdx  = me.mm23j0401_grid1.getGridRowIdx();
            if (rowIdx == 0 || rowIdx == undefined) {
                rowIdx = 0;
            }
            selected[i].data.qt_rcv = 0;
            selected[i].data.qt_rcv_spec = 0;
            selected[i].data.dc_remark = '';
            me.mm23j0401_grid1.getPlugin('cellplugin').completeEdit();
            me.mm23j0401_grid1.getStore('mm21d2101popup_grid1_store').insert(rowIdx, selected[i].data);
            me.mm23j0401_grid2_store.remove(selected[i]);
            me.mm23j0401_grid2_store.commitChanges();
            me.mm23j0401_grid1_store.commitChanges();
        }

    },

    onSave : function(){
        var me = this;

        var checkstring = me.mm23j0401_form1.checkBlank();
        if (checkstring !='' && checkstring != undefined){
            me.commonFn.toastMessage(checkstring,'w');
            return;
        }

        var sendDataJson = [];
        me.mm23j0401_grid1.getPlugin('cellplugin').completeEdit();
        var formData ={
            actiondata : 'sall',
            actionDetailData : 'hData',
            loginIduser : me.commonFn.getUserInfo().id_user,
            loginCdc : me.commonFn.getUserInfo().cd_c,
            no_rv : me.mm23j0401_form1.down('[name=no_rv]').getValue(),
            cd_p : me.mm23j0401_form1.down('[name=cd_p]').getValue(),
            dt_rv : me.mm23j0401_form1.down('[name=dt_rv]').getValue(),
            cd_w_rcv : me.mm23j0401_form1.down('[name=cd_w_rcv]').getValue(),
            dc_carno : me.mm23j0401_form1.down('[name=dc_carno]').getValue(),
            cd_e_rcv : me.mm23j0401_form1.down('[name=cd_e_rcv]').getValue(),
            dc_remark : me.mm23j0401_form1.down('[name=dc_remark]').getValue(),
            id_row : me.mm23j0401_form1.down('[name=id_row]').getValue()
        };

        sendDataJson.push(formData);

        var gridData = me.mm23j0401_grid2_store.getData().items;
        var sendLineDataJson = [];
        for (var i = 0; i < gridData.length; i++) {
            gridData[i].data.actiondata = 'sall';
            gridData[i].data.actionDetailData = 'lData';
            gridData[i].data.loginIduser = me.commonFn.getUserInfo().id_user;
            gridData[i].data.loginCdc = me.commonFn.getUserInfo().cd_c;
            gridData[i].data.no_rv = me.mm23j0401_form1.down('[name=no_rv]').getValue();
            sendDataJson.push(
                gridData[i].data
            );
        }

        var sendDataJsonEncode = Ext.encode(sendDataJson);
        me.commonFn.getTsoftAjaxRequest(sendDataJsonEncode , '../ServerPage/mm/mm_rv_h.jsp' , true , function (ajaxResult) {
            if ( ajaxResult.success ){
                me.commonFn.toastMessage('저장 성공','t');
                me.onSelect();
            }
        });
    },

    setAttachFilesButton1: function(idRow) {
        var me = this;
        var buttonParams = {
            id_row_src: idRow,
            fg_sy210: '0070',
            fg_sy210_ll: '',
            enableModify: true,
            windowTitle: '거래명세서 첨부파일',
            upload_folder: 'UploadFiles'
        };
        me.btnAttachFiles1.setButtonParams(buttonParams);
    },

    setAttachFilesButton2: function(idRow) {
        var me = this;
        var buttonParams = {
            id_row_src: idRow,
            fg_sy210: '0080',
            fg_sy210_ll: '',
            enableModify: true,
            windowTitle: '시험성적서 첨부파일',
            upload_folder: 'UploadFiles'
        };
        me.btnAttachFiles2.setButtonParams(buttonParams);
    },


    onEditControlMode : function (value) {
        var me = this;
        if (value == 'select'){
           me.mm23j0401_headbutton.setActiveButton({modify :'N' ,insert :'N' ,  delete:'N', save :'Y' , print :'N' , select :'Y'});
           me.mm23j0401_grid1.setActiveButton({insert :'N' , modify :'N' , delete:'N', save :'N', copy :'N' , import :'N' , export :'N'});
        }


    },
});