/**
 * Created by jiscraft on 2016-09-23.
 */
Ext.define('Terp.view.tsoft.componentux.functionButton.gwButton.TsoftGwButtonController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.tsoftgwbutton',

    requires: [
        'Terp.view.gw.ea.common.eadraftwin.EaDraftWin',
        'Terp.view.gw.ea.common.eareviewwin.EaReviewWin'
    ],

    init: function() {
        var me = this;
        me.commonFn = Terp.app.getController('TerpCommon');
    },

    onGwStatusButtonClick: function(eaDocParams, callback){
        var me = this ;
        me.view = this.getView();

        if (Ext.isEmpty(eaDocParams.beforeEaDocData)) {
            eaDocParams.beforeEaDocData = { cd_doc: '', dt_doc: '', dc_title: '' };
        }
        me.view.eaDocParams = eaDocParams;
        console.log(me.view.buttonParams);
        if (me.view.buttonParams.fg_ea001 === '00' ) {
            //commonFn.toastMessage('상신할 문서를 작성합니다','t');
            //me.openEaReviewWin(callback);
            me.openEaDraftWin(callback);
        }
        else {
            if (me.view.buttonParams.enableReWrite && (me.view.buttonParams.fg_ea001 === '30' || me.view.buttonParams.fg_ea001 === '40')) {
                me.onCustomButtonText(eaDocParams);
            }
            else{
                me.openEaReviewWin(callback);
            }
        }
    },

    openEaDraftWin: function(callback) {
        var me = this;
        var idRow = me.commonFn.sqlRowId();
        var cdDoc = me.commonFn.sqlNodocu('EA');
        var eaDraftWin = Ext.create('Terp.view.gw.ea.common.eadraftwin.EaDraftWin', {
            autoShow: true,
            popupParams: {
                showMode: 'ERP',
                windowTitle: me.view.buttonParams.windowTitle,
                reWriteMode: (Ext.isEmpty(me.view.eaDocParams.beforeEaDocData.cd_doc) ? false : true),
                id_row_src: idRow,
                upload_folder: 'EA/attach',
                eaDocParams: {
                    id_row: idRow,
                    cd_doc: cdDoc,
                    dt_doc: Ext.Date.format(new Date(), 'Ymd'),
                    dc_title: me.view.eaDocParams.dc_title,
                    dc_cont_html: me.view.eaDocParams.dc_cont_html,	// 기안내용 HTML
                    am_doc: me.view.eaDocParams.am_doc,
                    cd_site: me.view.eaDocParams.cd_site,
                    nm_site: me.view.eaDocParams.nm_site,
                    fg_ea010: me.view.eaDocParams.fg_ea010,	// 내외부문서구분 (1:내부문서,2:외부문서)
                    fg_ea020: me.view.eaDocParams.fg_ea020,// 기안구분 (sy_codel 참조:없으면 추가 후 설정)
                    fg_ea030: me.view.eaDocParams.fg_ea030,	// 양식구분 (sy_codel 참조:없으면 추가 후 설정)
                    fg_ea040: me.view.eaDocParams.fg_ea040,	// 문서구분 (sy_codel 참조:없으면 추가 후 설정)
                    fg_prior: Ext.isEmpty(me.view.eaDocParams.fg_prior) ? '0' : me.view.eaDocParams.fg_prior,   // 긴급여부(0:일반/9:긴급)
                    yn_erp: 'Y',	// ERP연동 여부
                    yn_re: (Ext.isEmpty(me.view.eaDocParams.beforeEaDocData.cd_doc) ? 'N' : 'Y'),	// 재작성 여부
                    dc_remark: me.view.eaDocParams.dc_remark,
                    cd_doc_ref: me.view.eaDocParams.cd_doc_ref,
                    cd_doc_re: (Ext.isEmpty(me.view.eaDocParams.beforeEaDocData.cd_doc) ? '' : me.view.eaDocParams.beforeEaDocData.cd_doc),
                    yn_add: 'N',
                    yn_single: 'N',
                    yn_safe: 'N'
                },
                erpKeyParams: {
                    id_row_erp: me.view.buttonParams.id_row_erp,
                    fg_ea040: me.view.buttonParams.fg_ea040,
                    dc_key1: me.view.buttonParams.dc_key1,
                    dc_key2: me.view.buttonParams.dc_key2,
                    dc_key3: me.view.buttonParams.dc_key3
                },
                callback: function (data) {
                    me.view.buttonParams.cd_doc = data.docData.cd_doc;
                    me.view.buttonParams.fg_ea001 = data.docData.fg_ea001;
                    me.getView().getGwStatus(me.getView().buttonParams);
                    if (callback) callback(data);
                }
            }
        });
    },

    onCustomButtonText: function() {
        var me = this;
        Ext.MessageBox.show({
            title: '확인',
            msg: '   진행할 작업을 선택하세요   ',
            buttons: Ext.MessageBox.YESNOCANCEL,
            buttonText:{
                yes: "부결문서보기",
                no: "재작성",
                cancel : "취소"
            },
            scope: this,
            fn: this.showResult
        });
    },

    showResult: function(btn, text) {
        var me = this;
        if (btn == 'yes') {
            this.openEaReviewWin();
        }
        else if (btn == 'no') {
            commonFn.toastMessage('상신할 문서를 작성합니다','t');
            var sendDataJson = {
                actiondata: 'select',
                loginCdc : commonFn.getUserInfo().cd_c,
                loginIduser : commonFn.getUserInfo().id_user,
                cd_doc: me.view.buttonParams.cd_doc
            };
            // console.log(sendDataJson);
            Ext.Ajax.request({
                async: false,
                url: '/ServerPage/gw/ea/ea_doc.jsp',
                params: {
                    sendData: Ext.encode([sendDataJson])
                },
                success: function (res) {
                    var obj = Ext.JSON.decode(res.responseText);
                    if (obj.success) {
                        // if (callback) callback(true);
                        me.view.eaDocParams.beforeEaDocData = obj.data[0];
                    }
                    else {
                        commonFn.msgBox.alert('오류', obj.msg, function() {
                            // me.view.refData.yn_read_html = 'X';
                            // if (callback) callback(false);
                        });
                    }
                },
                fail: function () {
                    commonFn.msgBox.alert('오류', '데이타처리중 오류가 발생했습니다', function() {
                        // me.view.refData.yn_read_html = 'X';
                        // if (callback) callback(false);
                    });
                }
            });
            me.openEaDraftWin();
        }
        else{
        }
        //this.showToast(Ext.String.format('You clicked the {0} button', btn));
    },

    openEaReviewWin: function(callback) {
        var me = this;
        var eaReviewWin = Ext.create('Terp.view.gw.ea.common.eareviewwin.EaReviewWin', {
            autoShow: true,
            popupParams: {
                showMode: 'ERP',
                windowTitle: me.view.buttonParams.windowTitle,
                erpKeyParams: {
                    cd_doc: me.view.buttonParams.cd_doc,
                    id_row_erp: me.view.buttonParams.id_row_erp,
                    fg_ea040: me.view.buttonParams.fg_ea040,
                    dc_key1: me.view.buttonParams.dc_key1,
                    dc_key2: me.view.buttonParams.dc_key2,
                    dc_key3: me.view.buttonParams.dc_key3
                },
                callback: function (data) {
                    me.view.buttonParams.cd_doc = data.docData.cd_doc;
                    me.view.buttonParams.fg_ea001 = data.docData.fg_ea001;
                    me.getView().getGwStatus(me.getView().buttonParams);
                    if (callback) callback(data);
                }
            }
        });
    }

});