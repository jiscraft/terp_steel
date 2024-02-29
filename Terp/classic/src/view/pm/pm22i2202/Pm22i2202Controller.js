/**
 * Created by jiscraft on 2023-09-23.
 */
Ext.define('Terp.view.pm.pm22i2202.Pm22i2202Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.pm22i2202',

    requires: [
        'Ext.util.Format'
    ],

    control: {
        'tsoftsearchform[reference=pm22i2202_searchform]': {
            boxready: 'onBoxReady_pm22i2202_searchform'
        },
        'tsoftgrid[reference=pm22i2202_grid1]': {
            boxready: 'pm22i2202_grid1_BoxReady',
            selectionchange :'onGridSelect_pm22i2202_grid1'
        },
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
        me.pm22i2202_headbutton = me.lookupReference('pm22i2202_headbutton');
        me.pm22i2202_searchform = me.lookupReference('pm22i2202_searchform');
    
        me.pm22i2202_form1 = me.lookupReference('pm22i2202_form1');
        me.pm22i2202_form2 = me.lookupReference('pm22i2202_form2');
        me.pm22i2202_form_store = me.getViewModel().getStore('pm22i2202_form_store') ;

        me.pm22i2202_grid1 = me.lookupReference('pm22i2202_grid1');
        me.pm22i2202_grid1_store =  me.getViewModel().getStore('pm22i2202_grid1_store') ;

        me.pm22i2202_grid2 = me.lookupReference('pm22i2202_grid2');
        me.pm22i2202_grid2_store =  me.getViewModel().getStore('pm22i2202_grid2_store') ;

        me.pm22i2202_con_store = me.getViewModel().getStore('pm22i2202_con_store');

        me.btnAttachFiles = me.lookupReference('pm22i2202_functionform_btnAttachFiles');
        me.btnEaDraft = me.lookupReference('pm22i2202_functionform_btnEaDraft');
        me.btnEaDraftRe = me.lookupReference('pm22i2202_functionform_btnEaDraftRe');
        me.onInitValue();
    },
    
    onInitValue : function(){
        var me = this;
        //form helpform에는 콤보를 바인딩 해주어야함
        me.commonFn.setCommonCode(me.lookupReference('pm22i2202_fg_pm010') ,'PM010');
        me.commonFn.setCommonCode(me.lookupReference('pm22i2202_fg_pm020') ,'PM020');

    },
    
    onBoxReady_pm22i2202_searchform : function(){
        var me = this;
        me.onSelect();
    },

    pm22i2202_grid1_BoxReady : function() {
        var me = this;
        me.pm22i2202_grid1.getPlugin('cellplugin').on({
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
                // if (context.originalValue !== context.value) {
                if (context.field === 'cd_i') {
                    context.record.set('cd_spec', '');
                    context.record.set('nb_size', 0);
                    context.record.set('qt_po', 0);
                    context.record.set('qt_po_spec', 0);
                    context.record.set('up_po', 0);
                    context.record.set('at_po', 0);
                    context.record.set('at_po_vat', 0);
                    context.record.set('at_po_ttl', 0);
                }
                if (context.field === 'cd_spec' || context.field === 'nb_size' ||  context.field === 'qt_po') {
                    if ((context.field == 'nb_size') && (context.record.get('yn_size') !== 'Y')) {
                        context.record.set('nb_size',0);
                    }
                    context.record.set('qt_po_spec', me.commonFn.getQtSpec(context.record.get('fg_mm030') , context.record.get('cd_spec') , context.record.get('nb_size') , context.record.get('qt_po') , context.record.get('nb_convert') ));
                    context.record.set('at_po', me.commonFn.getAmount(context.record.get('fg_mm040'), context.record.get('qt_po_spec') , context.record.get('qt_po') , context.record.get('up_po')  ));
                    context.record.set('at_po_vat', Math.round(context.record.get('at_po') * 0.1));
                    context.record.set('at_po_ttl', Math.round(context.record.get('at_po') + context.record.get('at_po_vat') ));
                }
                else if (context.field === 'qt_po_spec' || context.field === 'up_po') {
                    context.record.set('at_po', me.commonFn.getAmount(context.record.get('fg_mm040'), context.record.get('qt_po_spec') , context.record.get('qt_po') , context.record.get('up_po')  ));
                    context.record.set('at_po_vat', Math.round(context.record.get('at_po') * 0.1));
                    context.record.set('at_po_ttl', Math.round(context.record.get('at_po') + context.record.get('at_po_vat') ));
                }
                else if (context.field === 'at_po') {
                    context.record.set('at_po_vat', Math.round(context.record.get('at_po') * 0.1));
                    context.record.set('at_po_ttl', Math.round(context.record.get('at_po') + context.record.get('at_po_vat') ));
                }
                else if (context.field === 'at_po_vat') {
                    context.record.set('at_po_ttl', Math.round(context.record.get('at_po') + context.record.get('at_po_vat') ));
                }

            },


            canceledit: function(editor, context) {
            }
        });

    },

    onMakeStore_encharge : function(){
        var me = this;
        if ( me.pm22i2202_form1.down('[name=cd_p]').getValue() ==''){
            me.commonFn.toastMessage('거래처를 먼저 선택후 진행하세요','w');
            return;
        }
        me.pm22i2202_form1.down('[name=dc_p_encharge]').value = '';

        var jsonData = {
            'actiondata': 'combo',
            'loginIduser': me.commonFn.getUserInfo('id_user'),
            'loginCdc': me.commonFn.getUserInfo('cd_c'),
            'cd_p':  me.pm22i2202_form1.down('[name=cd_p]').getValue()
        };

        var sendDataJson = [];
        sendDataJson.push(jsonData);
        var sendDataJsonEncode = Ext.encode(sendDataJson);

        me.pm22i2202_con_store.load({
            params :{
                sendData : sendDataJsonEncode
            },
            callback : function(records, operation , success){
                var me = this;
                if (success == true) {
                    Ext.getBody().unmask();
                    if ( records.length > 0 ){
                    }

                } else {
                    Ext.getBody().unmask();
                    var errorMsg = this.getViewModel().getStore('me.pm22i2202_con_store').getProxy().getReader().rawData.msg;
                    me.commonFn.errorHandling(errorMsg);
                }
            },
            scope : me
        });
    },

    onMakeStoreBind_pm22i2202_searchform_con : function(){
        var me = this;
        if ( me.pm22i2202_form1.down('[name=cd_p]').getValue() =='')
            return;

        me.pm22i2202_form1.down('[name=dc_p_encharge]').value = '';

        var jsonData = {
            'actiondata': 'combo',
            'loginIduser': me.commonFn.getUserInfo('id_user'),
            'loginCdc': me.commonFn.getUserInfo('cd_c'),
            'cd_p':  me.pm22i2202_form1.down('[name=cd_p]').getValue()
        };

        var sendDataJson = [];
        sendDataJson.push(jsonData);
        var sendDataJsonEncode = Ext.encode(sendDataJson);

        me.pm22i2202_con_store.load({
            params :{
                sendData : sendDataJsonEncode
            },
            callback : function(records, operation , success){
                var me = this;
                if (success == true) {
                    Ext.getBody().unmask();
                    if ( records.length > 0 ){
                    }

                } else {
                    Ext.getBody().unmask();
                    var errorMsg = this.getViewModel().getStore('me.pm22i2202_con_store').getProxy().getReader().rawData.msg;
                    me.commonFn.errorHandling(errorMsg);
                }
            },
            scope : me
        });
    },
    
    onSelect : function(){
        var me = this;
        me.pm22i2202_form1.clearForm();
        me.pm22i2202_form2.clearForm();


        me.formDataInit();

        if (me.pm22i2202_searchform.down('[name=no_po]').getValue() == '' ){
            me.commonFn.toastMessage('발주번호를 입력하고 조회하세요','t');
            return
        }
        var jsonData = {
            'actiondata': 'r',
            'loginIduser': me.commonFn.getUserInfo('id_user'),
            'loginCdc': me.commonFn.getUserInfo('cd_c'),
            'no_po':  me.pm22i2202_searchform.down('[name=no_po]').getValue()
        };

        var sendDataJson = [];
        sendDataJson.push(jsonData);
        var sendDataJsonEncode = Ext.encode(sendDataJson);

        me.pm22i2202_form_store.load({
            params :{
                sendData : sendDataJsonEncode
            },
            callback : function(records, operation , success){
                var me = this;
                if (success == true) {
                    Ext.getBody().unmask();
                    if ( records.length > 0 ){

                        me.getViewModel().set('formData' , records[0].data);
                        me.setAttachFilesButton('0060' , me.getViewModel().data.formData.id_row );
                        //////////////////////
                        Ext.defer(function() {
                            me.onMakeStoreBind_pm22i2202_searchform_con();
                            me.onGrid1Load();
                            me.setEaDraftButton();
                        },500);

                    }

                } else {
                    Ext.getBody().unmask();
                    var errorMsg = this.getViewModel().getStore('pm22i2202_form_store').getProxy().getReader().rawData.msg;
                    me.commonFn.errorHandling(errorMsg);
                }
            },
            scope : me
        });        
        
        
    },

    onGrid1Load : function(){
        var me = this;
        me.pm22i2202_grid1_store.removeAll();
        me.pm22i2202_grid2_store.removeAll();
        me.pm22i2202_grid1_store.commitChanges();
        me.pm22i2202_grid2_store.commitChanges();
        var jsonData = {
            'actiondata': 'm',
            'loginIduser': me.commonFn.getUserInfo('id_user'),
            'loginCdc': me.commonFn.getUserInfo('cd_c'),
            'no_po':  me.pm22i2202_searchform.down('[name=no_po]').getValue()
        };

        var sendDataJson = [];
        sendDataJson.push(jsonData);
        var sendDataJsonEncode = Ext.encode(sendDataJson);

        me.pm22i2202_grid1_store.load({
            params :{
                sendData : sendDataJsonEncode
            },
            callback : function(records, operation , success){
                var me = this;
                if (success == true) {
                    Ext.getBody().unmask();
                    if ( records.length > 0 ){
                        me.pm22i2202_grid1.getSelectionModel().select(0);
                    }

                    me.onEditControlMode('select');

                } else {
                    Ext.getBody().unmask();
                    var errorMsg = this.getViewModel().getStore('pm22i2202_grid1_store').getProxy().getReader().rawData.msg;
                    me.commonFn.errorHandling(errorMsg);
                }
            },
            scope : me
        });

    },

    onModify : function(){
        var me = this;
        if (me.btnEaDraft.getText() == '미상신')
            me.onEditControlMode('edit');
        else
            me.commonFn.toastMessage('결재진행중이거나 승인문서는 수정 할 수 없습니다', 'w');
    },

    onInsert : function(){
        var me = this;
        me.pm22i2202_searchform.down('[name=no_po]').setValue('');
        me.onEditControlMode('new');
    },

    onSave : function(){
        var me = this;

        var checkstring = me.pm22i2202_form1.checkBlank();
        if (checkstring !='' && checkstring != undefined){
            me.commonFn.toastMessage(checkstring,'w');
            return;
        }

        var sendDataJson = [];
        me.pm22i2202_grid1.getPlugin('cellplugin').completeEdit();
        me.getViewModel().data.formData.actiondata = 'sall';
        me.getViewModel().data.formData.actionDetailData = 'hData';
        me.getViewModel().data.formData.loginIduser = me.commonFn.getUserInfo().id_user;
        me.getViewModel().data.formData.dc_p_encharge = me.pm22i2202_form1.down('[name=dc_p_encharge]').getValue();

        sendDataJson.push(me.getViewModel().data.formData);

        var gridData = me.pm22i2202_grid1_store.getModifiedRecords();  //getAllData() , getInsertedData() , getRemovedData()
        var sendLineDataJson = [];
        for (var i = 0; i < gridData.length; i++) {
            gridData[i].data.actiondata = 'sall';
            gridData[i].data.actionDetailData = 'lData';
            gridData[i].data.loginIduser = me.commonFn.getUserInfo().id_user;
            gridData[i].data.loginCdc = me.commonFn.getUserInfo().cd_c;
            gridData[i].data.no_po = me.pm22i2202_form1.down('[name=no_po]').getValue();
            gridData[i].data.id_row = me.commonFn.sqlRowId();
            sendDataJson.push(
                gridData[i].data
            );
        }

        var sendDataJsonEncode = Ext.encode(sendDataJson);
        me.commonFn.getTsoftAjaxRequest(sendDataJsonEncode , '../ServerPage/pm/pm_po_h.jsp' , true , function (ajaxResult) {
            if ( ajaxResult.success ){
                me.commonFn.toastMessage('저장 성공','t');
                me.pm22i2202_searchform.down('[name=no_po]').setValue(me.getViewModel().data.formData.no_po);
                me.onSelect();
            }
        });
    },

    onDelete : function(){
        var me = this;
        Ext.MessageBox.confirm('확인', '선택한 구매발주서를 삭제하시겠습니까?', function (btn) {
            if (btn == 'yes') {

                var sendDataJson = [];

                var gridData = me.pm22i2202_grid1_store.getData().items;

                for (var i = 0; i < gridData.length; i++) {
                    gridData[i].data.actiondata = 'dall';
                    gridData[i].data.actionDetailData = 'lData';
                    gridData[i].data.loginIduser = me.commonFn.getUserInfo().id_user;
                    gridData[i].data.loginCdc = me.commonFn.getUserInfo().cd_c;
                    sendDataJson.push(
                        gridData[i].data
                    );
                }

                me.getViewModel().data.formData.actiondata = 'dall';
                me.getViewModel().data.formData.actionDetailData = 'hData';
                me.getViewModel().data.formData.loginIduser = me.commonFn.getUserInfo().id_user;
                sendDataJson.push(me.getViewModel().data.formData);

                var sendDataJsonEncode = Ext.encode(sendDataJson);
                me.commonFn.getTsoftAjaxRequest(sendDataJsonEncode , '../ServerPage/pm/pm_po_h.jsp' , true , function (ajaxResult) {
                    if ( ajaxResult.success ){
                        me.commonFn.toastMessage('삭제 성공','t');
                        me.onEditControlMode('formClear');
                    }
                });
            } else {

            }
        });
    },

    onPrint : function(){
        var me = this;

        var sendDataJson = {
            'actiondata': 'print',
            'loginIduser': me.commonFn.getUserInfo('id_user'),
            'loginCdc': me.commonFn.getUserInfo('cd_c'),
            'no_po' : me.pm22i2202_searchform.down('[name=no_po]').getValue()
        };

        var sendDataJsonEncode = Ext.encode(sendDataJson);

        Ext.Ajax.request({
            async: false,
            url: '/ServerPage/pm/pm_po_print.jsp',
            params: {
                sendData: sendDataJsonEncode
            },
            success: function (res) {
                var obj = Ext.JSON.decode(res.responseText);
                console.log(obj);
                if (obj.success) {
                    var dnFileInfo = obj.data[0];



                    dnFileInfo.path = dnFileInfo.path.split('C:\\TERP\\Files\\terp_files\\').join('/files/').split('\\').join('/');
                    window.pdfViewer(dnFileInfo.path+'/'+dnFileInfo.pdf);

                }
                else {
                    Terp.app.getController('TerpCommon').msgBox.alert('오류', obj.msg);
                }
            },
            fail: function () {
                Terp.app.getController('TerpCommon').msgBox.alert('오류', '데이타처리중 오류가 발생했습니다');
            }
        });

    },

    onGridSelect_pm22i2202_grid1 : function(obj , selected , eOpt){
        var me = this;
        var gridSelection = me.pm22i2202_grid1.getGridSelection();
        var jsonData = {
            'actiondata': 'po',
            'loginIduser': me.commonFn.getUserInfo('id_user'),
            'loginCdc': me.commonFn.getUserInfo('cd_c'),
            'no_po':  gridSelection.data.no_po,
            'ln_po':  gridSelection.data.ln_po
        };
    
        var sendDataJson = [];
        sendDataJson.push(jsonData);
        var sendDataJsonEncode = Ext.encode(sendDataJson);
    
    
        me.pm22i2202_grid2_store.load({
            params :{
                sendData : sendDataJsonEncode
            },
            callback : function(records, operation , success){
                    var me = this;
                    if (success == true) {
                        Ext.getBody().unmask();
                        if ( records.length > 0 ){
                            me.pm22i2202_grid2.getSelectionModel().select(0);
                        }

                    } else {
                        Ext.getBody().unmask();
                        var errorMsg = this.getViewModel().getStore('pm22i2202_grid1_store').getProxy().getReader().rawData.msg;
                        me.commonFn.errorHandling(errorMsg);
                    }        
                },
            scope : me
        });
    },
    
    
    onGridInsert_pm22i2202_grid1 : function(gridSelection , gridRowindex){
        var me = this;

        var insertData ={
            cd_c: me.commonFn.getUserInfo().cd_c,
            cd_i:''
        };

        me.pm22i2202_grid1.getPlugin('cellplugin').completeEdit();


        me.pm22i2202_grid1_store.insert(0, insertData);
        me.pm22i2202_grid1.getSelectionModel().select(0);
        me.pm22i2202_grid1.getPlugin('cellplugin').startEditByPosition({
            row: 0,
            column: 0
        });

    },

    onGridDelete_pm22i2202_grid1 : function(){
        var me = this;
        var gridSelection = me.pm22i2202_grid1.getSelectionModel().getLastSelected();
        var jsonData = {
            'actiondata': 'd',
            'loginIduser': me.commonFn.getUserInfo('id_user'),
            'loginCdc': me.commonFn.getUserInfo('cd_c'),
            'no_po':  gridSelection.data.no_po ,
            'ln_po' : gridSelection.data.ln_po
        };
    
        var sendDataJson = [];
        sendDataJson.push(jsonData);
        var sendDataJsonEncode = Ext.encode(sendDataJson);
        me.commonFn.getTsoftAjaxRequest(sendDataJsonEncode , '../ServerPage/pm/pm_po_l.jsp' , true , function (ajaxResult) {
            if ( ajaxResult.success ){
                me.commonFn.toastMessage('발주 품목 삭제성공','t');
                me.onGrid1Load();
            }
        });
    },



    setAttachFilesButton: function(sy210 , idRowSrc) {
        var me = this;
        // if (sy210 =='' || idRowSrc ==''){
        //     me.commonFn.toastMessage('첨부문서타입,소스번호가 없습니다. 정보를 저장후 진행하세요','w');
        //     return;
        // }
        var me = this;
        var buttonParams = {
            id_row_src: idRowSrc,
            fg_sy210: sy210 ,
            fg_sy210_ll: '',
            enableModify: true,
            windowTitle: '구매발주서 첨부파일(0060)'
        };
        me.btnAttachFiles.setButtonParams(buttonParams);
    },

    setEaDraftButton: function() {
        var me = this;
        var buttonParams = {
            id_row_erp: me.getViewModel().data.formData.id_row,
            fg_ea040: '0016',
            windowTitle: '구매발주서 기안'
        };
        me.btnEaDraft.setButtonParams(buttonParams);
        me.btnEaDraftRe.setText('반려문서재상신');

    },

    onBtnclick_pm22i2202_functionform_btnEaDraft : function(){
        var me = this;
        if ( !me.pm22i2202_headbutton.down('[name=savebutton]').isHidden()){
            me.commonFn.toastMessage('수정상태에서는 전자결재를 진행 할 수 없습니다','w');
            return;
        }

        var ldata = me.pm22i2202_grid1_store.getData().items ;
        var sumFeature = me.pm22i2202_grid1.getView().findFeature('summary');
        var eaDocParams = {
            dc_cont_html: me.getEaDocContHtml(me.getViewModel().data.formData , ldata),
            cd_doc :'',
            fg_ea001: '00',
            dc_title: me.getViewModel().data.formData.nm_p +  ' 구매발주서' + '[' + me.getViewModel().data.formData.no_po + ']',
            am_doc : sumFeature.summaryRecord.data.at_po ,
            cd_site: '',
            nm_site: '',
            fg_ea010: '1',	// 내외부문서구분 (1:내부문서,2:외부문서)
            fg_ea020: '1',	// 기안구분 (sy_codel 참조:없으면 추가 후 설정)
            fg_ea030: '1000',	// 양식구분 (sy_codel 참조:없으면 추가 후 설정)
            fg_ea040: '0016',	// 문서구분 (sy_codel 참조:없으면 추가 후 설정)
            fg_prior: '0',
            dc_remark: '',
            cd_doc_ref: '' ,
            cd_doc_re :''
        };

        me.btnEaDraft.getController().onGwStatusButtonClick(eaDocParams, function(data) {
            me.popupParam.cd_doc = data.docData.cd_doc;
            me.popupParam.fg_ea001 = data.docData.fg_ea001;
        });
    },

    onClick_pm22i2202_functionform_btnEaDraftRe : function(){
        var me = this;
        if ( !me.pm22i2202_headbutton.down('[name=savebutton]').isHidden()){
            me.commonFn.toastMessage('수정상태에서는 전자결재를 진행 할 수 없습니다','w');
            return;
        }

        var ldata = me.pm22i2202_grid1_store.getData().items ;
        if (me.btnEaDraft.buttonParams.fg_ea001 == '40' || me.btnEaDraft.buttonParams.fg_ea001 == '30' ){
            var buttonParams = {
                fg_ea001: '00',
                id_row_erp: me.getViewModel().data.formData.id_row,
                fg_ea040: '0016',
                windowTitle: '구매발주서 전자결재 재상신'

            };
            me.btnEaDraftRe.setButtonParams(buttonParams);

            var formDataCont = me.getViewModel().data.formData ;

            var eaDocParams = {
                dc_cont_html: me.getEaDocContHtml(formDataCont , ldata ),
                fg_ea001: '00',
                dc_title: '[재상신] ' + me.getViewModel().data.formData.nm_p +  ' 구매발주서' + '[' + me.getViewModel().data.formData.no_po + ']',
                am_doc: 0,
                cd_site: formDataCont.cd_site,
                nm_site: formDataCont.nm_site,
                fg_ea010: '1',	// 내외부문서구분 (1:내부문서,2:외부문서)
                fg_ea020: '1',	// 기안구분 (sy_codel 참조:없으면 추가 후 설정)
                fg_ea030: '1000',	// 양식구분 (sy_codel 참조:없으면 추가 후 설정)
                fg_ea040: '0016',	// 문서구분 (sy_codel 참조:없으면 추가 후 설정)
                fg_prior: '0',
                dc_remark: '',
                cd_doc_ref: me.btnEaDraft.buttonParams.cd_doc ,
                cd_doc_re :''
            };

            me.btnEaDraftRe.getController().onGwStatusButtonClick(eaDocParams, function(data) {

                if (data.docData.cd_doc_ref != ''){
                    var jsonData = {
                        'actiondata': 'addref',
                        'loginIduser': me.commonFn.getUserInfo('id_user'),
                        'loginCdc': me.commonFn.getUserInfo('cd_c'),
                        'cd_doc' : data.docData.cd_doc,
                        'cd_doc_ref' : data.docData.cd_doc_ref
                    };

                    var sendDataJson = [];
                    sendDataJson.push(jsonData);
                    var sendDataJsonEncode = Ext.encode(sendDataJson);

                    me.commonFn.getTsoftAjaxRequest(sendDataJsonEncode , '../ServerPage/gw/ea/ea_doc_ref.jsp' , true , function (ajaxResult) {
                        if ( ajaxResult.success ){
                        }
                    });
                }

            });
        }else{
            me.commonFn.toastMessage('반려상태의 수주보고서만 재상신 할 수 있습니다','t');
        }
    },

    getEaDocContHtml : function(hdata , ldata){
        var me = this;
        var contHtml = '';



        contHtml = contHtml +'<p style="text-align: center;"><strong><span style="font-family: 돋움, sans-serif; font-size: 20pt;">구매 발주서</span></strong></p>\n' +
            '<table style="border-collapse: collapse; height: 98px; width: 790px; "align="center" border="1" cellspacing="0" cellpadding="5">\n' +
            '<tbody>\n' +
            '<tr>\n' +
            '<td style="width: 65px;"><strong>&nbsp;발주번호</strong></td>\n' +
            '<td style="width: 109px; text-align: center;">&nbsp;'+ hdata.no_po +'</td>\n' +
            '<td style="width: 57px; text-align: center;"><strong>&nbsp;발주일</strong></td>\n' +
            '<td style="width: 116px; text-align: center;">&nbsp;'+ Ext.Date.format(Ext.Date.parse(hdata.dt_po.substring(0,8),'Ymd'),'Y-m-d') +'</td>\n' +
            '<td style="width: 63.0312px; text-align: center;"><strong>&nbsp;공급회사</strong></td>\n' +
            '<td style="width: 109.969px;">&nbsp;'+ hdata.nm_p +'</td>\n' +
            '<td style="width: 49px; text-align: right;"><strong>담당자</strong></td>\n' +
            '<td style="width: 124px;">&nbsp;'+ ( hdata.dc_name == undefined ?'':hdata.dc_name )+'</td>\n' +
            '</tr>\n' +
            '<tr>\n' +
            '<td style="width: 65px;"><strong>&nbsp;프로젝트</strong></td>\n' +
            '<td style="width: 109px; text-align: left;">&nbsp;'+ ( hdata.nm_site == undefined ?'':hdata.nm_site ) +'</td>\n' +
            '<td style="width: 57px; text-align: center;"><strong>&nbsp;구간</strong></td>\n' +
            '<td style="width: 116px;">&nbsp;</td>\n' +
            '<td style="width: 63.0312px; text-align: center;"><strong>&nbsp;주소</strong></td>\n' +
            '<td style="width: 282.969px;" colspan="3">&nbsp;'+ hdata.dc_p_address +'</td>\n' +
            '</tr>\n' +
            '<tr>\n' +
            '<td style="width: 65px;"><strong>&nbsp;발주부서</strong></td>\n' +
            '<td style="width: 109px; text-align: center;">&nbsp;'+ hdata.nm_o +'</td>\n' +
            '<td style="width: 57px; text-align: center;" rowspan="2"><strong>&nbsp;발주자&nbsp;</strong></td>\n' +
            '<td style="width: 116px; text-align: center;">&nbsp;'+ hdata.nm_e +'</td>\n' +
            '<td style="width: 63.0312px; text-align: center;"><strong>&nbsp;전화번호</strong></td>\n' +
            '<td style="width: 109.969px;">&nbsp;'+ ( hdata.dc_tel1 == undefined ? '' : hdata.dc_tel1 ) +'</td>\n' +
            '<td style="width: 49px; text-align: center;"><strong>&nbsp;FAX</strong></td>\n' +
            '<td style="width: 124px;">&nbsp;'+ ( hdata.dc_fax == undefined ? '' : hdata.dc_fax ) +'</td>\n' +
            '</tr>\n' +
            '<tr>\n' +
            '<td style="width: 65px;"><strong>&nbsp;발주금액</strong></td>\n' +
            '<td style="width: 109px; text-align: center;">&nbsp;'+'￦' + Ext.util.Format.number(hdata.at_po_sum, '0,000')+ '</td>\n' +
            '<td style="width: 116px; text-align: center;">&nbsp;02-388-8975</td>\n' +
            '<td style="width: 63.0312px; text-align: center;"><strong>&nbsp;EMAIL</strong></td>\n' +
            '<td style="width: 109.969px;" colspan="3">'+ ( hdata.dc_mail == undefined ? '' : hdata.dc_mail ) +'&nbsp;</td>\n' +
            '</tr>\n' +
            '</tbody>\n' +
            '</table>\n' +
            '<table style="border-collapse: collapse; height: 53px; width: 788px;" align="center" border="1" cellspacing="0" cellpadding="5">\n' +
            '<tbody>\n' +
            '<tr>\n' +
            '<td style="width: 63px; text-align: center;"><strong>&nbsp;납기일자</strong></td>\n' +
            '<td style="width: 110px; text-align: center;">&nbsp;'+ Ext.Date.format(Ext.Date.parse(hdata.dt_rcv_default.substring(0,8),'Ymd'),'Y-m-d') +'</td>\n' +
            '<td style="width: 59px; text-align: center;"><strong>&nbsp;분할납부</strong></td>\n' +
            '<td style="width: 114px; text-align: center;">&nbsp;'+ hdata.nm_split +'</td>\n' +
            '<td style="width: 66px; text-align: center;"><strong>&nbsp;착지</strong></td>\n' +
            '<td style="width: 280px;" colspan="3">&nbsp;</td>\n' +
            '</tr>\n' +
            '<tr>\n' +
            '<td style="width: 63px; text-align: center;"><strong>&nbsp;대금지급</strong></td>\n' +
            '<td style="width: 110px;">&nbsp;'+ hdata.nm_pm010 +'</td>\n' +
            '<td style="width: 59px; text-align: center;"><strong>&nbsp;운반비</strong></td>\n' +
            '<td style="width: 114px; text-align: center;">&nbsp;'+ hdata.nm_trans +'</td>\n' +
            '<td style="width: 66px; text-align: center;"><strong>&nbsp;물품담당</strong></td>\n' +
            '<td style="width: 107px;">&nbsp;</td>\n' +
            '<td style="width: 59.1875px; text-align: right;"><strong>&nbsp;전화번호</strong></td>\n' +
            '<td style="width: 113.812px;">&nbsp;</td>\n' +
            '</tr>\n' +
            '</tbody>\n' +
            '</table>\n' +
            '<p>&nbsp;</p>';

        contHtml = contHtml + '<table class="xls-export-target" border="1" cellpadding="4"  cellspacing="0" width="790" align="center" style="border-collapse:collapse;margin-top: 5px">';
        contHtml = contHtml + '<tr>';
        contHtml = contHtml + '<td width="60"  style="text-align:center; font-size: small;background-color:#eee;">번호</td>';
        contHtml = contHtml + '<td width="80" style="text-align:center; font-size: small;background-color:#eee;">품명</td>';
        contHtml = contHtml + '<td width="90" style="text-align:center; font-size: small;background-color:#eee;">상세</td>';
        contHtml = contHtml + '<td width="100" style="text-align:center; font-size: small;background-color:#eee;">규격</td>';
        contHtml = contHtml + '<td width="60" style="text-align:center; font-size: smaller;background-color:#eee;">사이즈</td>';
        contHtml = contHtml + '<td width="60" style="text-align:center; font-size: small;background-color:#eee;">수량</td>';
        contHtml = contHtml + '<td width="80" style="text-align:center; font-size: small;background-color:#b0ee95;">중량</td>';
        contHtml = contHtml + '<td width="90" style="text-align:center; font-size: small;background-color:#b0ee95;">단가</td>';
        contHtml = contHtml + '<td width="100" style="text-align:center; font-size: small;background-color:#b0ee95;">금액</td>';
        contHtml = contHtml + '<td width="70" style="text-align:center; font-size: small;background-color:#b0ee95;">비고</td>';
        contHtml = contHtml + '</tr>';


        for (var i = 0; i < ldata.length; i++) {
            contHtml = contHtml + '<tr>';
            contHtml = contHtml + '<td style="text-align:left;">' + ldata[i].data.ln_po + '</td>';
            contHtml = contHtml + '<td style="text-align:left;">' + ldata[i].data.nm_i + '</td>';
            contHtml = contHtml + '<td style="text-align:right;">' + ldata[i].data.nm_spec + '</td>';
            contHtml = contHtml + '<td style="text-align:right;">' + ldata[i].data.cd_spec + '</td>';
            contHtml = contHtml + '<td style="text-align:center;">'+ Ext.util.Format.number(ldata[i].data.nb_size , '0,000') + '</td>';
            contHtml = contHtml + '<td style="text-align:right;">' + Ext.util.Format.number(ldata[i].data.qt_po , '0,000') + '</td>';
            contHtml = contHtml + '<td style="text-align:right;">' + Ext.util.Format.number(ldata[i].data.qt_po_spec , '0,000.0') + '</td>';
            contHtml = contHtml + '<td style="text-align:right;">' + Ext.util.Format.number(ldata[i].data.up_po , '0,000') + '</td>';
            contHtml = contHtml + '<td style="text-align:right;">' + Ext.util.Format.number(ldata[i].data.at_po , '0,000') + '</td>';
            contHtml = contHtml + '<td style="text-align:right;">' + '' + '</td>';
            contHtml = contHtml + '</tr>';
        }
        contHtml = contHtml + '</table>';
        return contHtml;
    },

    onEditControlMode : function (value) {
        var me = this;
        if (value == 'select'){
            me.pm22i2202_form1.setReadOnly(true);
            me.pm22i2202_form1.blurForm();
            me.pm22i2202_form1.down('[name=dc_p_encharge]').setValue(me.getViewModel().data.formData.dc_p_encharge);
            me.pm22i2202_form2.setReadOnly(true);
            me.pm22i2202_grid1.setReadOnly(true);
            me.pm22i2202_headbutton.setActiveButton({modify :'Y' ,insert :'N' ,  delete:'N', save :'N' , print :'Y' , select :'Y'});
            me.pm22i2202_grid1.setActiveButton({insert :'N' , modify :'N' , delete:'N', save :'N', copy :'N' , import :'N' , export :'Y'});
        }

        if (value == 'edit'){
            me.pm22i2202_form1.setReadOnly(false);
            me.pm22i2202_form2.setReadOnly(true);
            me.pm22i2202_grid1.setReadOnly(false);
            me.pm22i2202_headbutton.setActiveButton({modify :'N' ,insert :'Y' ,  delete:'Y', save :'Y' , print :'N' , select :'Y'});
            me.pm22i2202_grid1.setActiveButton({insert :'Y' , modify :'N' , delete:'Y', save :'N', copy :'N' , import :'N' , export :'Y'});
        }

        if (value == 'new'){
            me.pm22i2202_form1.setReadOnly(false);
            me.pm22i2202_form2.setReadOnly(true);
            me.pm22i2202_form1.clearForm();
            me.pm22i2202_form2.clearForm();
            me.formDataInit();
            //form data를 초기화 하기 위해서는 defer를 적용해야함
            Ext.defer(function() {
                var insertData = {
                    actiondata :'sall',
                    actionDetailData : 'hData',
                    loginIduser : me.commonFn.getUserInfo().id_user,
                    cd_c : me.commonFn.getUserInfo('cd_c'),
                    no_po : me.commonFn.sqlNodocu('PO'),
                    dt_po : me.commonFn.getTodayInfo(),
                    cd_o : me.commonFn.getUserInfo('cd_o'),
                    cd_e : me.commonFn.getUserInfo('cd_e') ,
                    nm_o : me.commonFn.getUserInfo('nm_o') ,
                    nm_e : me.commonFn.getUserInfo('nm_e') ,
                    cd_p : '',
                    cd_p_tax : '',
                    dc_encharge : '',
                    dc_tel : '',
                    fg_pm010 : '',
                    nm_pm020 : '',
                    fg_po : '0',
                    cd_e_request : '',
                    fg_tax :'0',
                    dc_remark : '',
                    fg_pm020 : '',
                    nm_pm020 : '',
                    cd_site : '',
                    no_so : '',
                    no_pr : '',
                    no_wo : '',
                    id_row : me.commonFn.sqlRowId()

                };
                me.getViewModel().set('formData', insertData);
                me.pm22i2202_form1.blurForm();
                me.setAttachFilesButton('0060' , me.getViewModel().data.formData.id_row );
            },1000);




            me.pm22i2202_grid1.setReadOnly(false);
            me.pm22i2202_grid1_store.removeAll();
            me.pm22i2202_grid1_store.commitChanges();

            me.pm22i2202_headbutton.setActiveButton({modify :'N' ,insert :'N' ,  delete:'N', save :'Y' , print :'N' , select :'Y'});
            me.pm22i2202_grid1.setActiveButton({insert :'Y' , modify :'N' , delete:'Y', save :'N', copy :'N' , import :'N' , export :'Y'});
        }

        if (value == 'formClear'){
            me.pm22i2202_form1.clearForm();
            me.pm22i2202_form2.clearForm();
            me.pm22i2202_searchform.down('[name=no_po]').setValue('');
            me.formDataInit();
            //form data를 초기화 하기 위해서는 defer를 적용해야함
            Ext.defer(function() {
                me.pm22i2202_form1.blurForm();
                me.setAttachFilesButton('0060' , '' );
            },1000);




            me.pm22i2202_grid1.setReadOnly(false);
            me.pm22i2202_grid1_store.removeAll();
            me.pm22i2202_grid1_store.commitChanges();

            me.pm22i2202_headbutton.setActiveButton({modify :'Y' ,insert :'N' ,  delete:'N', save :'N' , print :'N' , select :'Y'});
            me.pm22i2202_grid1.setActiveButton({insert :'N' , modify :'N' , delete:'Y', save :'N', copy :'N' , import :'N' , export :'Y'});
        }
    },

    formDataInit : function(){
        var me = this;
        me.getViewModel().set('formData' ,  {
                actiondata :'',
                actionDetailData : '',
                loginIduser : '',
                cd_c : '',
                no_po : '',
                dt_po :'',
                cd_o : '',
                cd_e : '',
                nm_o : '',
                nm_e : '',
                cd_p : '',
                cd_p_tax : '',
                dc_encharge : '',
                dc_tel : '',
                fg_pm010 : '',
                nm_pm020 : '',
                fg_po : '',
                cd_e_request : '',
                fg_tax :'',
                dc_remark : '',
                fg_pm020 : '',
                cd_site : '',
                no_so : '',
                no_pr : '',
                no_wo : '',
                id_row : '',
                fg_split :'0',
                fg_trans :'0'

        })
    }
});