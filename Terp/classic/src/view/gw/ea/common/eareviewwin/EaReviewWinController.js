/**
 * Created by Andrew on 2021-10-18.
 */
Ext.define('Terp.view.gw.ea.common.eareviewwin.EaReviewWinController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.eareviewwin',

    requires: [
        'Ext.util.Format',
        'Terp.view.tsoft.common.orgempwin.OrgEmpWin'
    ],

    control: {
        'eareviewwin': {
            boxready: 'onBoxReady_eareviewwin'
        },
        'tsoftpanel[reference=eareviewwin_doc_panel]': {
            boxready: 'onBoxReady_eareviewwin_doc_panel'
        },
        'tsoftpanel[reference=eareviewwin_apro_panel]': {
            boxready: 'onBoxReady_eareviewwin_apro_panel'
        },
        'dataview[reference=eareviewwin_apro_dataview]': {
            boxready: 'onBoxReady_eareviewwin_apro_dataview'
        },
        'button[reference^=eareviewwin_toolbtn_]': {
            boxready: 'onBoxReady_eareviewwin_toolbtn',
            click: 'onClick_eareviewwin_toolbtn'
        }
    },

    init: function() {
        var me = this;
        me.popupParams = me.view.popupParams || {};
        me.commonFn = Terp.app.getController('TerpCommon');
        me.eaCommonFn = Terp.app.getController('EaCommon');

        me.view = me.getView();
        me.toolbar = me.lookupReference('eareviewwin-toolbar');
        me.toolbtns = {};

        me.doc_panel = me.lookupReference('eareviewwin_doc_panel');
        me.apro_panel = me.lookupReference('eareviewwin_apro_panel');
        me.apro_dataview = me.lookupReference('eareviewwin_apro_dataview');

        me.eaDocs = {
            docData: {},
            aproData: [],
            attachData: [],
            docAttachData: [],
            erpAttachData: [],
            refData: [],
            erpData: {}
        };
    },

    onBoxReady_eareviewwin: function (w) {
        var me = this;

        if (me.popupParams.showMode.toUpperCase() === 'FORM') {
            me.view.setTitle('기안양식 보기');
        }
        else if (me.popupParams.showMode.toUpperCase() === 'TEMP') {
            me.view.setTitle('임시보관문서 보기');
        }
        else {
            if (!Ext.isEmpty(me.popupParams.windowTitle)) {
                me.view.setTitle(me.popupParams.windowTitle);
            }
        }

        if ((me.popupParams.showMode.toUpperCase() === 'TEMP') || (me.popupParams.showMode.toUpperCase() === 'PREVIEW') || (me.popupParams.showMode.toUpperCase() === 'FORM')) {
            me.view.setX(me.view.getX() + me.apro_panel.getWidth()/2);
            me.view.setY(me.view.getY() + 50);
            me.view.setWidth(me.view.getWidth() );
            // jiscraft 20220706 미리보기에서 의견 항상 보이게 처리
            // me.view.setWidth(me.view.getWidth() - me.apro_panel.getWidth());
            me.view.setHeight(me.view.getHeight() - 100);
            // me.apro_panel.hide();
        }

        if (me.popupParams.showMode.toUpperCase() !== 'ERP') {
            if (!me.popupParams.hasOwnProperty('erpKeyParams')) {
                me.popupParams.erpKeyParams = {};
            }
            me.popupParams.erpKeyParams.cd_doc = me.popupParams.cd_doc;
            me.eaCommonFn.getDocErpData(me.popupParams.erpKeyParams, function(data) {
                me.popupParams.erpKeyParams.id_row_erp = data.id_row_erp;
                me.popupParams.erpKeyParams.fg_ea040 = data.fg_ea040;
            });
        }

        if (!Ext.isEmpty(me.popupParams.erpKeyParams.id_row_erp) && !Ext.isEmpty(me.popupParams.erpKeyParams.fg_ea040)) {
            me.loadDocErpData();
            me.loadErpAttachData();
        }

        if (me.popupParams.showMode.toUpperCase() !== 'FORM') {
            me.loadDocData();
            me.loadDocAttachData();
            me.loadAproData();
            me.loadDocRefData();
            me.setReviewButtons();
            me.updateDocPanel();
            me.updateAproDataView();
        }
        else {
            me.loadDocFormData();
        }
    },

    onBoxReady_eareviewwin_doc_panel: function (p) {
        var me = this;
    },

    onBoxReady_eareviewwin_apro_panel: function (p) {
        var me = this;
    },

    onBoxReady_eareviewwin_apro_dataview: function (v) {
        var me = this;
    },

    onBoxReady_eareviewwin_toolbtn: function(b) {
        var me = this;
        var btnId = b.getReference().replace('eareviewwin_toolbtn_','');
        if (!Object.keys(me.toolbtns).includes(btnId)) {
            me.toolbtns[btnId] = b;
        }
        b.hide();
    },

    onClick_eareviewwin_toolbtn: function(b) {
        var me = this;
        var btnId = b.getReference().replace('eareviewwin_toolbtn_','');
        if (!Ext.isEmpty(me['onToolBtnClick_'+btnId])) me['onToolBtnClick_'+btnId](b);
    },

    // onToolBtnClick_Rewrite: function(b) {
    //     var me = this;
    //     me.commonFn.msgBox.confirm('확인', '임시보관한 기안문서를 재작성한 후 상신하시겠습니까?', function (choice) {
    //         if (choice === 'yes') {
    //         }
    //     });
    // },

    onToolBtnClick_Delete: function(b) {
        var me = this;
        me.commonFn.msgBox.confirm('확인', '임시보관한 기안문서를 삭제하시면 복원할 수 없습니다!<br>지금 삭제하시겠습니까?', function (choice) {
            if (choice === 'yes') {
                var sendDataJson = {
                    loginIduser: me.commonFn.getUserInfo().id_user,
                    loginCdc: me.commonFn.getUserInfo().cd_c,
                    cd_doc: me.eaDocs.docData.cd_doc,
                    id_row: me.eaDocs.docData.id_row
                };
                Ext.Ajax.request({
                    async: false,
                    url: '/ServerPage/gw/ea/ea_doc_info_delete.jsp',
                    params: {
                        sendData: Ext.encode([sendDataJson])
                    },
                    success: function (res) {
                        var obj = Ext.JSON.decode(res.responseText);
                        if (obj.success) {
                            me.commonFn.toastMessage('정상적으로 삭제하였습니다.','t');
                            if (me.popupParams.callback) me.popupParams.callback('Delete',sendDataJson);
                            me.view.close();
                        }
                        else {
                            me.commonFn.msgBox.alert('오류', obj.msg);
                        }
                    },
                    fail: function () {
                        me.commonFn.msgBox.alert('오류', '데이타처리중 오류가 발생했습니다');
                    }
                });
            }
        });
    },

    onToolBtnClick_RequestCancel: function(b) {
        var me = this;
        me.procAproBtn(b, '100', true);
    },

    onToolBtnClick_Apro120: function(b) {
        var me = this;
        me.procAproBtn(b, '120', false);
    },

    onToolBtnClick_Apro120Cancel: function(b) {
        var me = this;
        me.procAproBtn(b, '120', true);
    },

    onToolBtnClick_Apro140: function(b) {
        var me = this;
        me.procAproBtn(b, '140', false);
    },

    onToolBtnClick_Apro140Cancel: function(b) {
        var me = this;
        me.procAproBtn(b, '140', true);
    },

    onToolBtnClick_Apro220: function(b) {
        var me = this;
        me.procAproBtn(b, '220', false);
    },

    onToolBtnClick_Apro230: function(b) {
        var me = this;
        me.procAproBtn(b, '230', false);
    },

    onToolBtnClick_Apro220Cancel: function(b) {
        var me = this;
        me.procAproBtn(b, '220', true);
    },

    onToolBtnClick_Apro230Cancel: function(b) {
        var me = this;
        me.procAproBtn(b, '230', true);
    },

    onToolBtnClick_Apro300: function(b) {
        var me = this;
        me.procAproBtn(b, '300', false);
    },

    onToolBtnClick_Apro900: function(b) {
        var me = this;
        me.procAproBtn(b, '900', false);
    },

    onToolBtnClick_AddRcv: function(b) {
        var me = this;
        var rcvData = [];
        console.clear();
        console.log(me.eaDocs.aproData);
        Ext.Array.each(me.eaDocs.aproData, function(item) {
            console.log(item);
            if (item.fg_ea050 === '9') {
                rcvData.push(item);
            }
        });
        console.log(rcvData);
        var orgEmpWin = Ext.create('Terp.view.tsoft.common.orgempwin.OrgEmpWin', {
            autoShow: true,
            openerController: me,
            sourceData: rcvData,
            closeOnApply: false,
            selectedCallback: function(selectedData) {
                console.log(selectedData, me.eaDocs.aproData);
                var revData = [];
                Ext.Array.each(selectedData, function(item) {
                    var isExists = false;
                    for (var i=0; i<me.eaDocs.aproData.length; i++) {
                        var aproData = me.eaDocs.aproData[i];
                        if ((aproData.fg_ea050 === '9') && (item.cd_e === aproData.cd_e)) {
                            isExists = true;
                            break;
                        }
                    }
                    if (!isExists) {
                        revData.push({
                            actiondata: 's',
                            loginIduser: me.commonFn.getUserInfo().id_user,
                            loginCdc: me.commonFn.getUserInfo().cd_c,
                            cd_doc: me.eaDocs.docData.cd_doc,
                            id_row: me.commonFn.sqlRowId(),
                            fg_ea050: '9',
                            fg_ea002: '000',
                            id_user_apro: item.id_user || '',
                            cd_e_apro: item.cd_e || '',
                            nm_e_apro: item.nm_e || '',
                            cd_o_apro: item.cd_o || '',
                            nm_o_apro: item.nm_o || '',
                            fg_hr010_apro: item.fg_hr010 || '',
                            nm_hr010_apro: item.nm_hr010 || '',
                            fg_hr020_apro: item.fg_hr020 || '',
                            nm_hr020_apro: item.nm_hr020 || '',
                            sq_apro: 1
                        });
                    }
                });
                console.log(revData);
                Ext.Ajax.request({
                    async: false,
                    url: '/ServerPage/gw/ea/ea_doc_apro.jsp',
                    params: {
                        sendData: Ext.encode(revData)
                    },
                    success: function (res) {
                        var obj = Ext.JSON.decode(res.responseText);
                        if (obj.success) {
                            me.loadAproData();
                            me.updateDocPanel();
                        }
                        else {
                            me.commonFn.msgBox.alert('오류', obj.msg);
                        }
                    },
                    fail: function () {
                        me.commonFn.msgBox.alert('오류', '데이타처리중 오류가 발생했습니다');
                    }
                });
            },
            getSourceData: function() {
                var retData = [];
                Ext.Array.each(me.eaDocs.aproData, function(item) {
                    console.log(item);
                    if (item.fg_ea050 === '9') {
                        retData.push(item);
                    }
                });
                return retData;
            }
        });
    },

    onToolBtnClick_Share: function(b) {
        var me = this;
    },

    onToolBtnClick_ToExcel: function(b) {
        var me = this;
    },

    onToolBtnClick_Print: function(b) {
        var me = this;
        window.EaDocViewerParams = {
            openerController: me,
            isPrintMode: true,
            docHtml: me.doc_panel.html
        };
        var cmtHtml = me.getAproCmtHtml();
        if (Ext.isEmpty(cmtHtml)) {
            var win = window.open('/ServerPage/common/eaDocViewer.jsp', 'eadocviewer-'+((new Date()).getTime()), 'left=0,top=0,width=850,height=800,location=no,menubar=no,resizable=yes,scrollbars=yes,status=no,Toolbar=no');
            win.focus();
        }
        else {
            Ext.Msg.confirm('확인', '결재자 의견을 인쇄하시겠습니까?', function(btn) {
                if (btn === 'yes') {
                    window.EaDocViewerParams.docHtml = window.EaDocViewerParams.docHtml + cmtHtml;
                    var win = window.open('/ServerPage/common/eaDocViewer.jsp', 'eadocviewer-'+((new Date()).getTime()), 'left=0,top=0,width=820,height=800,location=no,menubar=no,resizable=yes,scrollbars=yes,status=no,Toolbar=no');
                    win.focus();
                }
                else {
                    var win = window.open('/ServerPage/common/eaDocViewer.jsp', 'eadocviewer-'+((new Date()).getTime()), 'left=0,top=0,width=820,height=800,location=no,menubar=no,resizable=yes,scrollbars=yes,status=no,Toolbar=no');
                    win.focus();
                }
            });
        }
    },


    loadDocErpData: function() {
        var me = this;
        if (Ext.isEmpty(me.popupParams.erpKeyParams.id_row_erp)) {
            me.commonFn.toastMessage('ERP 연동번호가 전달되지 않았습니다.','t');
            me.view.close();
            return;
        }
        if (Ext.isEmpty(me.popupParams.erpKeyParams.fg_ea040)) {
            me.commonFn.toastMessage('서식구분이 전달되지 않았습니다.','t');
            me.view.close();
            return;
        }
        me.eaCommonFn.getDocErpData(me.popupParams.erpKeyParams, function(data) {
            me.eaDocs.erpData = data;
        });
    },

    loadErpAttachData: function() {
        var me = this;
        if (Ext.isEmpty(me.popupParams.erpKeyParams.id_row_erp)) {
            me.commonFn.toastMessage('연결 아이디가 전달되지 않았습니다.','t');
            me.view.close();
            return;
        }
        if (Ext.isEmpty(me.popupParams.erpKeyParams.fg_ea040)) {
            me.commonFn.toastMessage('ERP 구분이 전달되지 않았습니다.','t');
            me.view.close();
            return;
        }
        me.eaCommonFn.getErpAttachData(me.popupParams.erpKeyParams, function(data) {
            me.eaDocs.erpAttachData = data;
            me.eaDocs.attachData = me.eaDocs.attachData.concat(me.eaDocs.erpAttachData);
        });
    },

    loadDocData: function() {
        var me = this;
        var cdDoc = (me.popupParams.showMode.toUpperCase() === 'ERP') ? me.eaDocs.erpData.cd_doc : me.popupParams.cd_doc;
        if (Ext.isEmpty(cdDoc)) {
            me.commonFn.toastMessage('전자결재 문서번호가 전달되지 않았습니다.','t');
            me.view.close();
            return;
        }
        me.eaCommonFn.getDocData(cdDoc, function(data) {
            me.eaDocs.docData = data;
            me.eaDocs.docData.dc_cont_html = '<p>&nbsp;</p>';
        });
    },

    loadDocAttachData: function() {
        var me = this;
        if (Ext.isEmpty(me.eaDocs.docData.id_row)) {
            me.commonFn.toastMessage('연결 아이디가 전달되지 않았습니다.','t');
            me.view.close();
            return;
        }
        me.eaCommonFn.getDocAttachData(me.eaDocs.docData.id_row, me.eaDocs.docData.fg_ea040 , function(data) {
            me.eaDocs.docAttachData = data;
            Ext.Array.each(me.eaDocs.docAttachData, function(item) {
                if (item.fg_sy210 !== '1000') {
                    me.eaDocs.attachData.push(item);
                }
            });
            var contFileData = null;
            for (var i=0; i<me.eaDocs.docAttachData.length; i++) {
                if (me.eaDocs.docAttachData[i].fg_sy210 === '1000') {
                    contFileData = me.eaDocs.docAttachData[i];
                    break;
                }
            }
            if (!Ext.isEmpty(contFileData) && !Ext.isEmpty(contFileData.dc_save_path)) {
                Ext.Ajax.request({
                    async: false,
                    url: Ext.String.format('{0}/{1}_{2}.html', contFileData.dc_save_path, contFileData.no_af, contFileData.id_row_src),
                    success: function (res) {
                        me.eaDocs.docData.dc_cont_html = res.responseText;
                    }
                });
            }
        });
    },

    loadAproData: function() {
        var me = this;
        if (Ext.isEmpty(me.eaDocs.docData.cd_doc)) {
            me.commonFn.toastMessage('전자결재 문서번호가 전달되지 않았습니다.', 't');
            me.view.close();
            return;
        }
        me.eaCommonFn.getAproData(me.eaDocs.docData.cd_doc, function(data) {
            me.eaDocs.aproData = data;
        });
    },

    loadDocRefData: function () {
        var me = this;
        if (Ext.isEmpty(me.eaDocs.docData.cd_doc)) {
            me.commonFn.toastMessage('전자결재 문서번호가 전달되지 않았습니다.', 't');
            me.view.close();
            return;
        }
        me.eaCommonFn.getDocRefData(me.eaDocs.docData.cd_doc, function(data) {
            me.eaDocs.refData = data;
        });
    },

    setReviewButtons: function() {
        var me = this;

        me.toolbtns.AddRcv.show();
        //me.toolbtns.ToExcel.show();
        me.toolbtns.Print.show();
        if (me.popupParams.showMode.toUpperCase() === 'ERP') {
            return;
        }

        // if ((me.eaDocs.docData.cd_e === me.commonFn.getUserInfo().cd_e) && (me.eaDocs.docData.fg_ea001 === '40')) {
        //     me.toolbtns.Rewrite.show();
        // }
        // if ((me.eaDocs.docData.fg_ea001 === '20') || (me.eaDocs.docData.fg_ea001 === '40')) {
        //     me.toolbtns.Share.show();
        // }

        if (me.eaDocs.docData.cd_e === me.commonFn.getUserInfo().cd_e) {
            if (me.eaDocs.docData.fg_ea001 === '99' || me.popupParams.showMode.toUpperCase() === 'PREVIEW' ) {
                if(me.eaDocs.docData.fg_ea001 === '99'){
                    me.toolbtns.Delete.show();
                }

                if(me.popupParams.showMode.toUpperCase() === 'PREVIEW'){
                    me.toolbtns.RequestCancel.hide();
                }

            }
            else {
                var cntApro = 0;
                Ext.Array.each(me.eaDocs.aproData, function(item) {
                    if ((item.fg_ea050 === '1') || (item.fg_ea050 === '2')) {
                        if ((item.sq_apro > 1) && !Ext.isEmpty(item.fg_ea002) && (item.fg_ea002 > '000')) {
                            cntApro++;
                        }
                    }
                });
                if (cntApro === 0) {
                    me.toolbtns.RequestCancel.show();
                }
            }
            //return;
        }

        if (me.popupParams.showMode.toUpperCase() === 'GW') {
            var aproData12 = [];
            var aproData3 = [];
            var aproData9 = [];
            Ext.Array.each(me.eaDocs.aproData, function (item) {
                if ((item.fg_ea050 === '1') || (item.fg_ea050 === '2')) {
                    aproData12.push(item);
                }
                else if (item.fg_ea050 === '3') {
                    aproData3.push(item);
                }
                else if (item.fg_ea050 === '9') {
                    aproData9.push(item);
                }
            });

            aproData12 = Ext.Array.sort(aproData12, function (left, right) {
                return (left.sq_apro < right.sq_apro) ? -1 : ((left.sq_apro > right.sq_apro) ? 1 : 0);
            });
            aproData3 = Ext.Array.sort(aproData3, function (left, right) {
                return (left.cd_e_apro < right.cd_e_apro) ? -1 : ((left.cd_e_apro > right.cd_e_apro) ? 1 : 0);
            });
            aproData9 = Ext.Array.sort(aproData9, function (left, right) {
                return (left.cd_e_apro < right.cd_e_apro) ? -1 : ((left.cd_e_apro > right.cd_e_apro) ? 1 : 0);
            });

            if (me.eaDocs.docData.cd_e !== me.commonFn.getUserInfo().cd_e) {
                for (var i = 0; i < aproData12.length; i++) {
                    var item = aproData12[i];
                    var next = (i === aproData12.length - 1) ? null : aproData12[i + 1];
                    if (Ext.isEmpty(next) || Ext.isEmpty(next.fg_ea002) || (next.fg_ea002 === '000')) {
                        if ((item.cd_e_apro === me.commonFn.getUserInfo().cd_e)) {
                            if (item.fg_ea050 === '1') {
                                if (Ext.isEmpty(item.fg_ea002) || (item.fg_ea002 === '000')) {
                                    me.toolbtns.Apro120.show();
                                    me.toolbtns.Apro140.show();
                                }
                                else if (item.fg_ea002 === '120') {
                                    me.toolbtns.Apro120Cancel.show();
                                    // me.toolbtns.Apro140.show();
                                }
                                else if (item.fg_ea002 === '140') {
                                    me.toolbtns.Apro120.show();
                                    me.toolbtns.Apro140Cancel.show();
                                }
                            }
                            else if (item.fg_ea050 === '2') {
                                if (Ext.isEmpty(item.fg_ea002) || (item.fg_ea002 === '000')) {
                                    me.toolbtns.Apro220.show();
                                    me.toolbtns.Apro230.show();
                                }

                                if ( next.fg_ea002 =='000'  && item.fg_ea002 == '220' ){
                                    me.toolbtns.Apro220Cancel.show();
                                    // me.toolbtns.Apro230Cancel.show();
                                }

                                if ( next.fg_ea002 =='000'  && (item.fg_ea002 == '230' || item.fg_ea002 == '240')){
                                    // me.toolbtns.Apro220Cancel.show();
                                    me.toolbtns.Apro230Cancel.show();
                                }
                            }
                        }
                    }
                }
            }

            if ((me.eaDocs.docData.fg_ea001 >= '10') && (me.eaDocs.docData.fg_ea001 < '20')) {
                for (var i = 0; i < aproData3.length; i++) {
                    var item = aproData3[i];
                    if (item.cd_e_apro === me.commonFn.getUserInfo().cd_e) {
                        if (Ext.isEmpty(item.fg_ea002) || (item.fg_ea002 === '000')) {
                            me.toolbtns.Apro300.show();
                            break;
                        }
                    }
                }
            }
            else if (me.eaDocs.docData.fg_ea001 >= '20') {
                for (var i = 0; i < aproData9.length; i++) {
                    var item = aproData9[i];
                    if (item.cd_e_apro === me.commonFn.getUserInfo().cd_e) {
                        if (Ext.isEmpty(item.fg_ea002) || (item.fg_ea002 === '000')) {
                            me.toolbtns.Apro900.show();
                            break;
                        }
                    }
                }
            }
        }
    },

    updateDocPanel: function() {
        var me = this;
        me.doc_panel.update(me.getEaDocHtml());
        var alnBoxDomElem = me.doc_panel.el.select('.tsoft-ea-apro-line-box').item(0);
        var docHeadDomElem = me.doc_panel.el.select('.tsoft-ea-apro-doc-head').item(0);
        var docTitleTdDomElem = me.doc_panel.el.select('.tsoft-ea-apro-doc-title td');
        if (!Ext.isEmpty(alnBoxDomElem) && !Ext.isEmpty(docHeadDomElem) && !Ext.isEmpty(docTitleTdDomElem)) {
            alnBoxDomElem.parent().setWidth(alnBoxDomElem.getWidth());
            docHeadDomElem.setHeight(alnBoxDomElem.getHeight());
            docTitleTdDomElem.setHeight(docHeadDomElem.last().last().getHeight());
        }
        var refAnchors = me.doc_panel.el.select('ul.tsoft-ea-apro-ref-list li a');
        refAnchors.each(function (el) {
            Ext.get(el).on('click', function (event, target) {
                if (!Ext.isEmpty(target.getAttribute('data-ref-doc-cd'))) {
                    me.eaCommonFn.openEaReviewWin(target.getAttribute('data-ref-doc-cd'), 'PREVIEW', function (action, data) {
                        console.log(action, data);
                    });
                }
            });
        });
    },

    updateAproDataView: function() {
        var me = this;
        var cmtData = [];
        Ext.Array.each(me.eaDocs.aproData, function(item) {
            if (item.fg_ea050 !== '9') {
                cmtData.push(item);
            }
        });
        me.apro_dataview.getStore().add(cmtData);
    },

    getEaDocHtml: function() {
        var me = this;
        var headerHtml = '<table border="0" cellpadding="0" cellspacing="0" class="tsoft-ea-apro-doc-head">';
        headerHtml = headerHtml + '<tr>';
        headerHtml = headerHtml + '<td class="label" width="80">문서번호</th>';
        headerHtml = headerHtml + '<td class="value cd-doc">' + me.eaDocs.docData.cd_doc + '</td>';
        headerHtml = headerHtml + '</tr>';
        headerHtml = headerHtml + '<tr>';
        headerHtml = headerHtml + '<td class="label" width="80">서식구분</th>';
        headerHtml = headerHtml + '<td class="value nm-ea040">' + me.eaDocs.docData.nm_ea040 + ' [' +  me.eaDocs.docData.nm_ea010 + ']' + '</td>';
        headerHtml = headerHtml + '</tr>';
        headerHtml = headerHtml + '<tr>';
        headerHtml = headerHtml + '<td class="label">기안일자</th>';
        headerHtml = headerHtml + '<td class="value dt-doc">' + Ext.Date.format(Ext.Date.parse(me.eaDocs.docData.dt_doc.substring(0,8),'Ymd'),'Y-m-d') + '</td>';
        headerHtml = headerHtml + '</tr>';
        headerHtml = headerHtml + '<tr>';
        headerHtml = headerHtml + '<td class="label">기안자명</th>';
        headerHtml = headerHtml + '<td class="value nm-e">' + me.eaDocs.docData.nm_e + '</td>';
        headerHtml = headerHtml + '</tr>';
        headerHtml = headerHtml + '<tr>';
        headerHtml = headerHtml + '<td class="label">기안부서</th>';
        headerHtml = headerHtml + '<td class="value nm-o">' + me.eaDocs.docData.nm_o + '</td>';
        headerHtml = headerHtml + '</tr>';
        headerHtml = headerHtml + '</table>';

        var titleHtml = '<table border="0" cellpadding="0" cellspacing="0" class="tsoft-ea-apro-doc-title">';
        titleHtml = titleHtml + '<tr>';
        titleHtml = titleHtml + '<td class="label dc-title" width="80">제&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;목</th>';
        titleHtml = titleHtml + '<td class="value dc-title" colspan="5">' + me.eaDocs.docData.dc_title + '</td>';
        titleHtml = titleHtml + '</tr>';
        titleHtml = titleHtml + '<tr>';
        titleHtml = titleHtml + '<td class="label">기안금액</th>';
        titleHtml = titleHtml + '<td class="value am-doc"  colspan="1">' + ((Ext.isEmpty(me.eaDocs.docData.am_doc) || (me.eaDocs.docData.am_doc === 0)) ? '&nbsp;' : (Ext.util.Format.number(me.eaDocs.docData.am_doc, '0,000')+'원')) + '</td>';
        titleHtml = titleHtml + '<td class="label" width="80">현&nbsp;장&nbsp;명</th>';
        titleHtml = titleHtml + '<td class="value nm-site"  colspan="3">' + (me.eaDocs.docData.cd_site == '' ?  '' : '[ ' + me.eaDocs.docData.cd_site +' ]' + me.eaDocs.docData.nm_site )+ '</td>';
        titleHtml = titleHtml + '</tr>';
        titleHtml = titleHtml + '<tr>';
        titleHtml = titleHtml + '<td class="label">추가정산</th>';
        titleHtml = titleHtml + '<td class="value am-doc">' + ((me.eaDocs.docData.yn_add === 'Y') ? '<i class="fas fa-check"></i>' : '&nbsp;') + '</td>';
        titleHtml = titleHtml + '<td class="label">공통수주</th>';
        titleHtml = titleHtml + '<td class="value nm-site" style="border-right:1px solid gray;">' + ((me.eaDocs.docData.yn_single === 'Y') ? '<i class="fas fa-check"></i>' : '&nbsp;') + '</td>';
        titleHtml = titleHtml + '<td class="label" style="width:80px;">안전</th>';
        titleHtml = titleHtml + '<td class="value nm-site">' + ((me.eaDocs.docData.yn_safe === 'Y') ? '<i class="fas fa-check"></i>' : '&nbsp;') + '</td>';
        titleHtml = titleHtml + '</tr>';
        titleHtml = titleHtml + '</table>';

        var retHtml = '<table border="0" cellpadding="0" cellspacing="0" align="center" class="tsoft-ea-apro-doc-wrap">';
        retHtml = retHtml + '<tr>';
        retHtml = retHtml + '<td>' + headerHtml + '</td>';
        retHtml = retHtml + '<td valign="top">' + me.eaCommonFn.getEaAlnBoxHtml(me.eaDocs.aproData) + '</td>';
        retHtml = retHtml + '</tr>';
        retHtml = retHtml + '<tr>';
        retHtml = retHtml + '<td colspan="2">' + titleHtml + '</td>';
        retHtml = retHtml + '</tr>';
        retHtml = retHtml + '<tr>';
        retHtml = retHtml + '<td class="dc-cont-html" colspan="4">' + me.eaDocs.docData.dc_cont_html + '</td>';
        retHtml = retHtml + '</tr>';
        retHtml = retHtml + '</table>';

        retHtml = retHtml + '<table border="0" cellpadding="0" cellspacing="0" align="center" class="tsoft-ea-apro-ref-wrap">';
        retHtml = retHtml + me.getRefDocHtml();
        retHtml = retHtml + me.getAttachHtml();
        retHtml = retHtml + me.getCcRcvHtml();
        retHtml = retHtml + '</table>';

        return retHtml;
    },

    getRefDocHtml: function() {
        var me = this;
        var retHtml = '';
        if (!Ext.isEmpty(me.eaDocs.refData)) {
            retHtml = retHtml + '<tr>';
            retHtml = retHtml + '<td class="label dc-title" width="80">관련문서</td>';
            retHtml = retHtml + '<td class="value">';
            retHtml = retHtml + '<ul class="tsoft-ea-apro-ref-list">';
            Ext.Array.each(me.eaDocs.refData, function (item) {
                // var dtDoc = Ext.Date.format(Ext.Date.parse(( Ext.isEmpty(item.dt_doc)  ? docData.dt_doc : item.dt_doc.substring(0,8)) , 'Ymd'), 'Y-m-d');
                var dtDoc = Ext.Date.format(Ext.Date.parse(( Ext.isEmpty(item.dt_doc)  ? '' : item.dt_doc.substring(0,8)) , 'Ymd'), 'Y-m-d');
                var nmHr020 = Ext.isEmpty(item.nm_hr020) ? '' : item.nm_hr020;
                var nmHr010 = Ext.isEmpty(item.nm_hr010) ? '' : item.nm_hr010;
                var nmHr = Ext.String.format('{0}{1}', nmHr020, (Ext.isEmpty(nmHr020) ? '' : '/' + nmHr010));
                var nm = Ext.String.format('{0}{1}', item.nm_e, (Ext.isEmpty(nmHr) ? '' : ' (' + nmHr + ')'));
                retHtml = retHtml + '<li>';
                retHtml = retHtml + '<a href="#" data-ref-doc-cd="' + item.cd_doc_ref + '" title="기안일자 : ' + dtDoc + '\n기안자명 : ' + nm + '\n기안부서 : ' + item.nm_o + '">' + item.dc_title + '</a>';
                retHtml = retHtml + '</li>';
            });
            retHtml = retHtml + '</ul>';
            retHtml = retHtml + '</td>';
            retHtml = retHtml + '</tr>';
        }

        return retHtml;
    },

    getAttachHtml: function() {
        var me = this;
        var retHtml = '';
        if (!Ext.isEmpty(me.eaDocs.attachData)) {
            retHtml = retHtml + '<tr>';
            retHtml = retHtml + '<td class="label dc-title" width="80">첨부파일</td>';
            retHtml = retHtml + '<td class="value">';
            retHtml = retHtml + '<ul class="tsoft-ea-apro-ref-list">';
            Ext.Array.each(me.eaDocs.attachData, function (item) {
                retHtml = retHtml + '<li>';
                if (item.dc_save_path.substr(0,10) == 'files/OLD/'){
                    var dn = Ext.String.format('downloadTerpFileFromUrl(\'{0}/{1}\',\'{4}\');', item.dc_save_path, item.dc_src_name, item.dc_src_name, '', item.dc_src_name);
                }else{
                    var dn = Ext.String.format('downloadTerpFileFromUrl(\'{0}/{1}.{3}\',\'{4}\');', item.dc_save_path, item.no_af, item.id_row_src, item.dc_src_name.split('.').pop(), item.dc_src_name);
                }
                // var dn = Ext.String.format('downloadTerpFileFromUrl(\'{0}/{1}.{3}\',\'{4}\');', item.dc_save_path, item.no_af, item.id_row_src, item.dc_src_name.split('.').pop(), item.dc_src_name);
                // 20220222 var dn = Ext.String.format('downloadTerpFileFromUrl(\'{0}/{1}_{2}.{3}\',\'{4}\');', item.dc_save_path, item.no_af, item.id_row_src, item.dc_src_name.split('.').pop(), item.dc_src_name);
                retHtml = retHtml + '<a href="#" onclick="' + dn + '" title="' + Ext.util.Format.number(item.dc_src_size, '0,000 바이트') + '">' + item.dc_src_name + '</a>';
                retHtml = retHtml + '</li>';
            });
            retHtml = retHtml + '</ul>';
            retHtml = retHtml + '</td>';
            retHtml = retHtml + '</tr>';
        }

        return retHtml;
    },
    
    getCcRcvHtml: function() {
        var me = this;
        var retHtml = '';
        var ccData = [];
        var rcvData = [];
        Ext.Array.each(me.eaDocs.aproData, function(item) {
            if (item.fg_ea050 === '3') ccData.push(item);
            else if (item.fg_ea050 === '9') rcvData.push(item);
        });
        if (!Ext.isEmpty(ccData)) {
            var ccNmList = [];
            Ext.Array.each(ccData, function (item) {
                var nmHr020 = Ext.isEmpty(item.nm_hr020_apro) ? '' : item.nm_hr020_apro;
                var nmHr010 = Ext.isEmpty(item.nm_hr010_apro) ? '' : item.nm_hr010_apro;
                var nmHr = Ext.String.format('{0}{1}', nmHr020, (Ext.isEmpty(nmHr020) ? '' : '/' + nmHr010));
                var nm = Ext.String.format('{0}{1}', item.nm_e_apro, (Ext.isEmpty(nmHr) ? '' : ' (' + nmHr + ')'));
                ccNmList.push(nm);
            });
            retHtml = retHtml + '<tr>';
            retHtml = retHtml + '<td class="label dc-title" width="80">협의자</td>';
            retHtml = retHtml + '<td class="value">' + ccNmList.join(', ') + '</td>';
            // retHtml = retHtml + '<td class="value">';
            // retHtml = retHtml + '<ul class="tsoft-ea-apro-ref-list">';
            // Ext.Array.each(ccNmList, function (nm) {
            //     retHtml = retHtml + '<li>' + nm + '</li>';
            // });
            // retHtml = retHtml + '</ul>';
            // retHtml = retHtml + '</td>';
            retHtml = retHtml + '</tr>';
        }
        if (!Ext.isEmpty(rcvData)) {
            var rcvNmList = [];
            Ext.Array.each(rcvData, function (item) {
                var nmHr020 = Ext.isEmpty(item.nm_hr020_apro) ? '' : item.nm_hr020_apro;
                var nmHr010 = Ext.isEmpty(item.nm_hr010_apro) ? '' : item.nm_hr010_apro;
                var nmHr = Ext.String.format('{0}{1}', nmHr020, (Ext.isEmpty(nmHr020) ? '' : '/' + nmHr010));
                var nm = Ext.String.format('{0}{1}', item.nm_e_apro, (Ext.isEmpty(nmHr) ? '' : ' (' + nmHr + ')'));
                rcvNmList.push(nm);
            });
            retHtml = retHtml + '<tr>';
            retHtml = retHtml + '<td class="label dc-title" width="80">수신자</td>';
            retHtml = retHtml + '<td class="value">' + rcvNmList.join(', ') + '</td>';
            // retHtml = retHtml + '<td class="value">';
            // retHtml = retHtml + '<ul class="tsoft-ea-apro-ref-list">';
            // Ext.Array.each(rcvNmList, function (nm) {
            //     retHtml = retHtml + '<li>' + nm + '</li>';
            // });
            // retHtml = retHtml + '</ul>';
            // retHtml = retHtml + '</td>';
            retHtml = retHtml + '</tr>';
        }

        return retHtml;
    },

    getAproCmtHtml: function() {
        var me = this;
        var retHtml = '';
        var cmtData = [];
        Ext.Array.each(me.eaDocs.aproData, function(item) {
            if ((item.fg_ea050 !== '9') && !Ext.isEmpty(item.fg_ea002) && (item.fg_ea002 > '000') && !Ext.isEmpty(item.dc_apro)) {
                cmtData.push(item);
            }
        });
        if (!Ext.isEmpty(cmtData)) {
            var nmList = [];
            Ext.Array.each(cmtData, function (item) {
                var nmHr020 = Ext.isEmpty(item.nm_hr020_apro) ? '' : item.nm_hr020_apro;
                var nmHr010 = Ext.isEmpty(item.nm_hr010_apro) ? '' : item.nm_hr010_apro;
                var nmHr = Ext.String.format('{0}{1}', nmHr020, (Ext.isEmpty(nmHr020) ? '' : '/' + nmHr010));
                var nm = Ext.String.format('{0}{1}', item.nm_e_apro, (Ext.isEmpty(nmHr) ? '' : ' (' + nmHr + ')'));
                nmList.push({ nm: nm, dc_apro: item.dc_apro});
            });
            if (nmList.length > 0) {
                retHtml = retHtml + '<table border="0" cellpadding="0" cellspacing="0" align="center" class="tsoft-ea-apro-ref-wrap">';
                retHtml = retHtml + '<tr height="30" class="label dc-title" style="background-color:#eee; border-right:none;">';
                retHtml = retHtml + '<td colspan=2 style="border-top:1px solid; text-align:center";>' + '결재 의견' + '</td>';
                retHtml = retHtml + '</tr>';
                Ext.Array.each(nmList, function (item) {
                    retHtml = retHtml + '<tr>';
                    retHtml = retHtml + '<td class="label dc-title" width="200">' + item.nm + '</td>';
                    retHtml = retHtml + '<td class="value">' + item.dc_apro + '</td>';
                    retHtml = retHtml + '</tr>';
                });
                retHtml = retHtml + '</table>';
            }
        }
        return retHtml;
    },

    procAproBtn: function(btn, fg002, ynCancel) {
        var me = this;
        var btnId = btn.getReference().replace('eareviewwin_toolbtn_','');
        me.eaCommonFn.updateAproStatus(me.eaDocs, fg002, btn.text.replaceAll(' ',''), ynCancel, function(data) {
            //console.log(data);
            if (me.popupParams.callback) me.popupParams.callback(btnId, data);
            me.view.close();
        });
    },

    loadDocFormData: function() {
        var me = this;
        var cdForm = me.popupParams.cd_doc;
        if (Ext.isEmpty(cdForm)) {
            me.commonFn.toastMessage('기안양식코드가 전달되지 않았습니다.','t');
            me.view.close();
            return;
        }
        me.eaCommonFn.getDocFormData(cdForm, function(data) {
            me.doc_panel.update(data.dc_cont_html);
        });
    }

});