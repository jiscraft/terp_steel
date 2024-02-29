/**
 * Created by jiscraft on 2023-10-08.
 */
Ext.define('Terp.view.mm.mm23j0701.Mm23j0701Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.mm23j0701',

    requires: [
        'Ext.util.Format'
    ],

    init: function() {
        var me = this;
        me.commonFn = Terp.app.getController('TerpCommon');
        me.mm23j0701_headbutton = me.lookupReference('mm23j0701_headbutton');
        me.mm23j0701_searchform = me.lookupReference('mm23j0701_searchform');
    
        me.mm23j0701_form1 = me.lookupReference('mm23j0701_form1');
        me.mm23j0701_form1_store =  me.getViewModel().getStore('mm23j0701_form1_store') ;
        
        me.mm23j0701_grid1 = me.lookupReference('mm23j0701_grid1');
        me.mm23j0701_grid1_store =  me.getViewModel().getStore('mm23j0701_grid1_store') ;

        me.btnAttachFiles = me.lookupReference('mm23j0701_functionform_btnAttachFiles');
        me.btnEaDraft = me.lookupReference('mm23j0701_functionform_btnEaDraft');
        me.btnEaDraftRe = me.lookupReference('mm23j0701_functionform_btnEaDraftRe');
        
        me.onInitValue();
    },
    
    onInitValue : function(){
        var me = this;
        //form helpform에는 콤보를 바인딩 해주어야함
        // me.commonFn.setCommonCode(me.lookupReference('mm23j0701_form1_fg_sm200') ,'SM200');
    },
    
    onBoxReady_mm23j0701_searchform : function(){
        var me = this;
        me.onSelect();
    },

    onSelect : function(){
        var me = this;
        
        var checkstring = me.mm23j0701_searchform.checkBlank();
        if (checkstring !='' && checkstring != undefined){
            me.commonFn.toastMessage(checkstring,'w');
            return;
        }
    
        var jsonData = {
            'actiondata': 'r',
            'loginIduser': me.commonFn.getUserInfo('id_user'),
            'loginCdc': me.commonFn.getUserInfo('cd_c'),
            'no_mr':  me.mm23j0701_searchform.down('[name=no_mr]').getValue()
        };

        var sendDataJson = [];
        sendDataJson.push(jsonData);
        var sendDataJsonEncode = Ext.encode(sendDataJson);
    
        me.mm23j0701_form1_store.load({
            params :{
                sendData : sendDataJsonEncode
            },
            callback : function(records, operation , success){
                var me = this;
                if (success == true) {
                    Ext.getBody().unmask();
                    if ( records.length > 0 ){
                        me.getViewModel().set('formData' , records[0].data);
                        me.setAttachFilesButton('0090' , me.getViewModel().data.formData.id_row );
                        //////////////////////
                        Ext.defer(function() {

                            me.onGrid1Load();
                            me.setEaDraftButton();
                        },500);

                    }
                    me.onEditControlMode('select');
                } else {
                    Ext.getBody().unmask();
                    var errorMsg = this.getViewModel().getStore('mm23j0701_form1_store').getProxy().getReader().rawData.msg;
                    me.commonFn.errorHandling(errorMsg);
                }        
            },
            scope : me
        });
    
    },


    onGrid1Load : function(){
        var me = this;
        var jsonData = {
            'actiondata': 'm',
            'loginIduser': me.commonFn.getUserInfo('id_user'),
            'loginCdc': me.commonFn.getUserInfo('cd_c'),
            'no_mr':  me.mm23j0701_searchform.down('[name=no_mr]').getValue()
        };

        var sendDataJson = [];
        sendDataJson.push(jsonData);
        var sendDataJsonEncode = Ext.encode(sendDataJson);

        me.mm23j0701_grid1_store.load({
            params :{
                sendData : sendDataJsonEncode
            },
            callback : function(records, operation , success){
                var me = this;
                if (success == true) {
                    Ext.getBody().unmask();
                    if ( records.length > 0 ){

                    }
                    me.onEditControlMode('select');
                } else {
                    Ext.getBody().unmask();
                    var errorMsg = this.getViewModel().getStore('me.mm23j0701_grid1_store').getProxy().getReader().rawData.msg;
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
            me.commonFn.toastMessage('결재진행중이거나 완료문서는 수정 할 수 없습니다', 'w');
    },

    onDelete : function(){
        var me = this;

        if (me.btnEaDraft.getText() != '미상신')
            me.commonFn.toastMessage('결재진행중이거나 완료문서는 수정 할 수 없습니다', 'w');

        Ext.MessageBox.confirm('확인', '선택한 불출 요청서를 삭제하시겠습니까?', function (btn) {
            if (btn == 'yes') {

                var sendDataJson = [];

                var gridData = me.mm23j0701_grid1_store.getData().items;

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
                me.commonFn.getTsoftAjaxRequest(sendDataJsonEncode , '../ServerPage/mm/mm_mr_h.jsp' , true , function (ajaxResult) {
                    if ( ajaxResult.success ){
                        me.commonFn.toastMessage('삭제 성공','t');
                        me.onEditControlMode('formClear');
                    }
                });
            } else {

            }
        });
    },

    onGridDelete_mm23j0701_grid1 : function(){
        var me = this;
        if (me.btnEaDraft.getText() != '미상신')
            me.commonFn.toastMessage('결재진행중이거나 완료문서는 삭제 할 수 없습니다', 'w');

        var gridSelection = me.mm23j0701_grid1.getSelectionModel().getLastSelected();
        var jsonData = {
            'actiondata': 'd',
            'loginIduser': me.commonFn.getUserInfo('id_user'),
            'loginCdc': me.commonFn.getUserInfo('cd_c'),
            'no_mr':  gridSelection.data.no_mr ,
            'ln_mr' : gridSelection.data.ln_mr
        };

        var sendDataJson = [];
        sendDataJson.push(jsonData);
        var sendDataJsonEncode = Ext.encode(sendDataJson);
        me.commonFn.getTsoftAjaxRequest(sendDataJsonEncode , '../ServerPage/mm/mm_mr_l.jsp' , true , function (ajaxResult) {
            if ( ajaxResult.success ){
                me.commonFn.toastMessage('삭제 성공','t');
                me.onGrid1Load();
            }
        });
    },

    setAttachFilesButton: function(sy210 , idRowSrc) {
        var me = this;
        var buttonParams = {
            id_row_src: idRowSrc,
            fg_sy210: sy210 ,
            fg_sy210_ll: '',
            enableModify: true,
            windowTitle: '불출요청서 첨부파일(0090)'
        };
        me.btnAttachFiles.setButtonParams(buttonParams);
    },

    setEaDraftButton: function() {
        var me = this;
        var buttonParams = {
            id_row_erp: me.getViewModel().data.formData.id_row,
            fg_ea040: '0017',
            windowTitle: '불출요청서 기안'
        };
        me.btnEaDraft.setButtonParams(buttonParams);
        me.btnEaDraftRe.setText('반려문서재상신');

    },

    onBtnclick_mm23j0701_functionform_btnEaDraft : function(){
        var me = this;
        if ( !me.mm23j0701_headbutton.down('[name=savebutton]').isHidden()){
            me.commonFn.toastMessage('수정상태에서는 전자결재를 진행 할 수 없습니다','w');
            return;
        }

        var ldata = me.mm23j0701_grid1_store.getData().items ;
        var sumFeature = me.mm23j0701_grid1.getView().findFeature('summary');
        var eaDocParams = {
            dc_cont_html: me.getEaDocContHtml(me.getViewModel().data.formData , ldata),
            cd_doc :'',
            fg_ea001: '00',
            dc_title: '불출 요청서' + '[' + me.getViewModel().data.formData.no_mr + ']',
            am_doc : sumFeature.summaryRecord.data.at_po ,
            cd_site: '',
            nm_site: '',
            fg_ea010: '1',	// 내외부문서구분 (1:내부문서,2:외부문서)
            fg_ea020: '1',	// 기안구분 (sy_codel 참조:없으면 추가 후 설정)
            fg_ea030: '1000',	// 양식구분 (sy_codel 참조:없으면 추가 후 설정)
            fg_ea040: '0017',	// 문서구분 (sy_codel 참조:없으면 추가 후 설정)
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

    onClick_mm23j0701_functionform_btnEaDraftRe : function(){
        var me = this;
        if ( !me.mm23j0701_headbutton.down('[name=savebutton]').isHidden()){
            me.commonFn.toastMessage('수정상태에서는 전자결재를 진행 할 수 없습니다','w');
            return;
        }

        var ldata = me.mm23j0701_grid1_store.getData().items ;
        if (me.btnEaDraft.buttonParams.fg_ea001 == '40' || me.btnEaDraft.buttonParams.fg_ea001 == '30' ){
            var buttonParams = {
                fg_ea001: '00',
                id_row_erp: me.getViewModel().data.formData.id_row,
                fg_ea040: '0017',
                windowTitle: '불출요청서 전자결재 재상신'

            };
            me.btnEaDraftRe.setButtonParams(buttonParams);

            var formDataCont = me.getViewModel().data.formData ;

            var eaDocParams = {
                dc_cont_html: me.getEaDocContHtml(formDataCont , ldata ),
                fg_ea001: '00',
                dc_title: '[재상신] ' +  '불출 요청서' + '[' + me.getViewModel().data.formData.no_mr + ']',
                am_doc: 0,
                cd_site: formDataCont.cd_site,
                nm_site: formDataCont.nm_site,
                fg_ea010: '1',	// 내외부문서구분 (1:내부문서,2:외부문서)
                fg_ea020: '1',	// 기안구분 (sy_codel 참조:없으면 추가 후 설정)
                fg_ea030: '1000',	// 양식구분 (sy_codel 참조:없으면 추가 후 설정)
                fg_ea040: '0017',	// 문서구분 (sy_codel 참조:없으면 추가 후 설정)
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
            me.commonFn.toastMessage('반려상태의 불출 요청서만 재상신 할 수 있습니다','t');
        }
    },

    getEaDocContHtml : function(hdata , ldata){
        var me = this;
        var contHtml = '';

        contHtml = contHtml +'<p style="text-align: center;"><span style="font-family: 돋움, sans-serif; font-size: 18pt;">불출요청서</span></p>\n' +
            '<table style="border-collapse: collapse; width: 780px; height: 77px;" align="center" border="1" cellspacing="0" cellpadding="5">\n' +
            '<tbody>\n' +
            '<tr>\n' +
            '<td style="width: 71px; text-align: center;"><strong>&nbsp;요청번호</strong></td>\n' +
            '<td style="width: 180px;">'+ hdata.no_mr +'</td>\n' +
            '<td style="width: 64px; text-align: center;"><strong>작성일</strong></td>\n' +
            '<td style="width: 168.188px;">&nbsp;'+ Ext.Date.format(Ext.Date.parse(hdata.dt_mr.substring(0,8),'Ymd'),'Y-m-d') +'</td>\n' +
            '<td style="width: 72.8125px; text-align: center;"><strong>출고요청일</strong></td>\n' +
            '<td style="width: 149px;">&nbsp;'+ Ext.Date.format(Ext.Date.parse(hdata.dt_issue.substring(0,8),'Ymd'),'Y-m-d') +'</td>\n' +
            '</tr>\n' +
            '<tr>\n' +
            '<td style="width: 71px; text-align: center;"><strong>&nbsp;출고창고</strong></td>\n' +
            '<td style="width: 180px;">&nbsp;'+hdata.nm_w_fr+'</td>\n' +
            '<td style="width: 64px; text-align: center;"><strong>입고창고</strong></td>\n' +
            '<td style="width: 168.188px;">&nbsp;'+hdata.nm_w_to+'</td>\n' +
            '<td style="width: 72.8125px; text-align: center;"><strong>담당</strong></td>\n' +
            '<td style="width: 149px;">&nbsp;'+hdata.nm_e+'</td>\n' +
            '</tr>\n' +
            '<tr>\n' +
            '<td style="width: 71px; text-align: center;"><strong>비고</strong></td>\n' +
            '<td style="width: 634px;" colspan="5">'+hdata.dc_remark+'</td>\n' +
            '</tr>\n' +
            '</tbody>\n' +
            '</table>';

        contHtml = contHtml + '<table class="xls-export-target" border="1" cellpadding="4"  cellspacing="0" width="780" align="center" style="border-collapse:collapse;margin-top: 5px">';
        contHtml = contHtml + '<tr>';
        contHtml = contHtml + '<td width="40"  style="text-align:center; font-size: small;background-color:#eee;">행번</td>';
        contHtml = contHtml + '<td width="50" style="text-align:center; font-size: small;background-color:#eee;">구분</td>';
        contHtml = contHtml + '<td width="100" style="text-align:left; font-size: small;background-color:#eee;">품명</td>';
        contHtml = contHtml + '<td width="70" style="text-align:center; font-size: smaller;background-color:#eee;">재질</td>';
        contHtml = contHtml + '<td width="80" style="text-align:center; font-size: small;background-color:#eee;">품목상세</td>';
        contHtml = contHtml + '<td width="70" style="text-align:center; font-size: small;background-color:#eee;">규격</td>';
        contHtml = contHtml + '<td width="90" style="text-align:center; font-size: small;background-color:#eee;">사이즈</td>';
        contHtml = contHtml + '<td width="40" style="text-align:center; font-size: small;background-color:#eee;">재고단위</td>';
        contHtml = contHtml + '<td width="50" style="text-align:center; font-size: small;background-color:#b0ee95;">수량</td>';
        contHtml = contHtml + '<td width="70" style="text-align:center; font-size: small;background-color:#b0ee95;">요청중량</td>';
        contHtml = contHtml + '<td width="80" style="text-align:center; font-size: small;background-color:#eee;">프로젝트</td>';
        contHtml = contHtml + '<td width="40" style="text-align:center; font-size: small;background-color:#eee;">비고</td>';
        contHtml = contHtml + '</tr>';


        for (var i = 0; i < ldata.length; i++) {
            contHtml = contHtml + '<tr>';
            contHtml = contHtml + '<td style="text-align:left;">' + ldata[i].data.ln_mr + '</td>';
            contHtml = contHtml + '<td style="text-align:left;">' + ( ldata[i].data.fg_po =='0' ? '도급':'사급' ) + '</td>';
            contHtml = contHtml + '<td style="text-align:left;">' + ldata[i].data.nm_i + '</td>';
            contHtml = contHtml + '<td style="text-align:center;">' + ldata[i].data.nm_mm090 + '</td>';
            contHtml = contHtml + '<td style="text-align:left;">' + ldata[i].data.nm_spec + '</td>';
            contHtml = contHtml + '<td style="text-align:left;">' + ldata[i].data.cd_spec + '</td>';
            contHtml = contHtml + '<td style="text-align:right;">'+ Ext.util.Format.number(ldata[i].data.nb_size , '0,000') + '</td>';
            contHtml = contHtml + '<td style="text-align:left;">' + ldata[i].data.fg_mm010 + '</td>';
            contHtml = contHtml + '<td style="text-align:right;">' + Ext.util.Format.number(ldata[i].data.qt_mr , '0,000') + '</td>';
            contHtml = contHtml + '<td style="text-align:right;">' + Ext.util.Format.number(ldata[i].data.qt_mr_spec , '0,000.0') + '</td>';
            contHtml = contHtml + '<td style="text-align:right;">' + ldata[i].data.nm_site + '</td>';
            contHtml = contHtml + '<td style="text-align:left;">' + ldata[i].data.dc_remark + '</td>';

            contHtml = contHtml + '</tr>';
        }
        contHtml = contHtml + '</table>';
        return contHtml;
    },
    
    onEditControlMode : function(controlModeType){
    //if ( !me.onRequirementCheck('addQu')) return;
        var me = this;
        if (controlModeType == 'select'){
            me.mm23j0701_form1.setReadOnly(true);
            me.mm23j0701_form1.blurForm();
            me.mm23j0701_grid1.setReadOnly(true);
            me.mm23j0701_headbutton.setActiveButton({modify :'Y' ,insert :'N' ,  delete:'N', save :'N' , print :'Y' , select :'Y'});
            me.mm23j0701_grid1.setActiveButton({insert :'N' , modify :'N' , delete:'N', save :'N', copy :'' , import :'N' , export :'Y'});
        }

        if (controlModeType == 'edit') {
            me.mm23j0701_grid1.setReadOnly(false);
            me.mm23j0701_headbutton.setActiveButton({modify :'N' , insert :'N' ,  delete:'Y', save :'Y' , print :'Y' , select :'Y'});
            me.mm23j0701_grid1.setActiveButton({insert :'N' , modify :'N' , delete:'Y', save :'N', copy :'N' , import :'N' , export :'Y'});
        }

        if (controlModeType == 'formClear') {
            me.mm23j0701_grid1.setReadOnly(false);
            me.mm23j0701_form1.clearForm();
            me.mm23j0701_searchform.down('[name=no_mr]').setValue('');
            me.mm23j0701_searchform.down('[name=no_mr]').setDisplayValue('');
            me.mm23j0701_grid1_store.removeAll();
            me.mm23j0701_grid1_store.commitChanges();
            me.mm23j0701_headbutton.setActiveButton({modify :'Y' ,insert :'N' ,  delete:'N', save :'N' , print :'Y' , select :'Y'});
            me.mm23j0701_grid1.setActiveButton({insert :'N' , modify :'N' , delete:'N', save :'N', copy :'' , import :'N' , export :'Y'});
        }
    }
});