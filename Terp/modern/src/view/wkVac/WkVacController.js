/**
 * Created by Andrew on 2021-12-21.
 */
Ext.define('Terp.view.wkVac.WkVacController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.wkvac',

    requires: [
        'Ext.field.File',
        'Ext.layout.HBox'
    ],

    init: function() {
        var me = this;
        me.commonFn = Terp.app.getController('TerpCommon');
        me.view = me.getView();
        me.MainCtrl = me.view.MainCtrl;
        me.MainView = me.MainCtrl.view;
        me.attachFiles = [];

        me.mCommonFn = Terp.app.getController('ModernCommon');
        me.mCommonFn.UserInfo = me.MainView.userInfo;
    },

    onPainted_fg_wk020: function(fld) {
        var me = this;
        Ext.Ajax.request({
            async: false,
            url:'/ServerPage/sy/sy_codel.jsp',
            params: {
                sendData: Ext.encode([{
                    actiondata: 'm',
                    loginIduser: me.MainView.userInfo.id_user,
                    loginCdc: me.MainView.userInfo.cd_c,
                    cd_codeh: 'WK020'
                }])
            },
            success: function (res) {
                var obj = Ext.JSON.decode(res.responseText);
                if (obj.success) {
                    if (obj.data.length > 0) {
                        var codes = [];
                        Ext.Array.each(obj.data, function(item) {
                            codes.push({ name: item.nm_codel, value: item.cd_codel });
                        });
                        fld.getStore().add(codes);
                    }
                    else {
                        Ext.toast('휴가종류 데이터가 없습니다!');
                    }
                }
                else {
                    Ext.toast(obj.msg);
                }
            },
            fail: function () {
                Ext.toast('데이타처리중 오류가 발생했습니다.');
            }
        });
    },

    onPainted_fg_wk060: function(fld) {
        var me = this;
        Ext.Ajax.request({
            async: false,
            url:'/ServerPage/sy/sy_codel.jsp',
            params: {
                sendData: Ext.encode([{
                    actiondata: 'm',
                    loginIduser: me.MainView.userInfo.id_user,
                    loginCdc: me.MainView.userInfo.cd_c,
                    cd_codeh: 'WK060'
                }])
            },
            success: function (res) {
                var obj = Ext.JSON.decode(res.responseText);
                if (obj.success) {
                    if (obj.data.length > 0) {
                        var codes = [];
                        Ext.Array.each(obj.data, function(item) {
                            codes.push({ name: item.nm_codel, value: item.cd_codel });
                        });
                        fld.getStore().add(codes);
                    }
                    else {
                        Ext.toast('휴가기간 데이터가 없습니다!');
                    }
                }
                else {
                    Ext.toast(obj.msg);
                }
            },
            fail: function () {
                Ext.toast('데이타처리중 오류가 발생했습니다.');
            }
        });
    },

    onPainted_cd_aln: function(fld) {
        var me = this;
        Ext.Ajax.request({
            async: false,
            url:'/ServerPage/gw/ea/ea_def_alnh.jsp',
            params: {
                sendData: Ext.encode([{
                    actiondata: 'select',
                    loginIduser: me.MainView.userInfo.id_user,
                    loginCdc: me.MainView.userInfo.cd_c,
                    yn_use: 'Y'
                }])
            },
            success: function (res) {
                var obj = Ext.JSON.decode(res.responseText);
                if (obj.success) {
                    if (obj.data.length > 0) {
                        var codes = [];
                        Ext.Array.each(obj.data, function(item) {
                            codes.push({ name: item.nm_aln, value: item.cd_aln });
                        });
                        fld.getStore().add(codes);
                    }
                    else {
                        Ext.toast('휴가종류 데이터가 없습니다!');
                    }
                }
                else {
                    Ext.toast(obj.msg);
                }
            },
            fail: function () {
                Ext.toast('데이타처리중 오류가 발생했습니다.');
            }
        });
    },

    onTap_BackBtn: function() {
        var me = this;
        me.MainCtrl.setCardAnim('slide', 'right', 500);
        me.MainView.setActiveItem(me.MainCtrl.main_menu_card);
        me.MainView.remove(me.view);
    },

    onTap_AddAttachBtn: function(btn) {
        var me = this;
        me.lookup('attach_file_fields').add(
            {
                xtype: 'container',
                layout: {
                    type: 'hbox',
                    align: 'stretch'
                },
                items: [
                    {
                        xtype: 'filefield',
                        name: 'attach_file',
                        style: 'width: calc(100% - 72px)',
                        listeners: {
                            change: 'onChange_attach_file'
                        }
                    },
                    {
                        xtype: 'button',
                        reference: 'add_attach_btn',
                        iconCls: 'x-fas fa-plus',
                        handler: 'onTap_AddAttachBtn'
                    },
                    {
                        xtype: 'button',
                        iconCls: 'x-fas fa-minus',
                        handler: 'onTap_RemoveAttachBtn'
                    }
                ]
            }
        );
    },

    onTap_RemoveAttachBtn: function(btn) {
        var me = this;
        me.lookup('attach_file_fields').remove(btn.parent);
    },

    onChange_attach_file: function(fld, nv, ov) {
        var me = this;
    },

    onTap_RequestBtn: function() {
        var me = this;
        var formValues = me.view.getValues();
        if (Ext.isEmpty(formValues.fg_wk020)) {
            Ext.toast('휴가종류를 선택하세요.');
            return;
        }
        if (Ext.isEmpty(formValues.dt_fr)) {
            Ext.toast('휴가기간(부터)를 선택하세요.');
            return;
        }
        if (Ext.isEmpty(formValues.dt_to)) {
            Ext.toast('휴가기간(까지)를 선택하세요.');
            return;
        }
        if (Ext.isEmpty(formValues.dc_tel)) {
            Ext.toast('비상연락을 입력하세요.');
            return;
        }
        if (Ext.isEmpty(formValues.dc_reason.replaceAll('\r', '').replaceAll('\n', ''))) {
            Ext.toast('휴가사유를 입력하세요.');
            return;
        }
        if (Ext.isEmpty(formValues.cd_aln)) {
            Ext.toast('결재선 선택하세요.');
            return;
        }

        var vacData = {
            actiondata: 's',
            loginIduser: me.MainView.userInfo.id_user,
            loginCdc: me.MainView.userInfo.cd_c,
            cd_e: me.MainView.userInfo.cd_e,
            cd_o : me.MainView.userInfo.cd_o,
            no_vc: me.commonFn.sqlNodocu('VC', me.MainView.userInfo.cd_c, me.commonFn.getTodayInfo()),
            id_row: me.mCommonFn.sqlRowId(),
            fg_wk020: formValues.fg_wk020,
            dt_vc: Ext.Date.format(new Date(),'Ymd'),
            dt_fr: Ext.Date.format(formValues.dt_fr,'Ymd'),
            dt_to: Ext.Date.format(formValues.dt_to,'Ymd'),
            dc_tel: formValues.dc_tel,
            dc_reason: formValues.dc_reason
        };
        me.attachFiles = [];
        Ext.Array.each(me.lookup('attach_file_fields').items.items, function(item) {
            if (item.xtype === 'container') {
                if (!Ext.isEmpty(item.down('filefield')) && (item.down('filefield').getFiles().length > 0)) {
                    var file = item.down('filefield').getFiles()[0];
                    file.id_row_src = vacData.id_row;
                    file.fg_sy210 = '0004';
                    file.fg_sy210_ll = '';
                    me.attachFiles.push(file);
                }
            }
        });
        Ext.Ajax.request({
            url: '/ServerPage/wk/wk_vac.jsp',
            params: {
                sendData: Ext.encode([vacData])
            },
            success: function (res) {
                var obj = Ext.JSON.decode(res.responseText);
                if (obj.success) {
                    if (me.attachFiles.length > 0) {
                        me.mCommonFn.uploadAttachFiles(me.attachFiles, function () {
                            me.requestApro(vacData.no_vc);
                        });
                    }
                    else {
                        me.requestApro(vacData.no_vc);
                    }
                }
                else {
                    Ext.toast(obj.msg);
                }
            },
            fail: function () {
                Ext.toast('데이타처리중 오류가 발생했습니다.');
            }
        });
    },

    requestApro: function(noVc) {
        var me = this;
        var formValues = me.view.getValues();
        var eaData = {
            loginIduser: me.MainView.userInfo.id_user,
            loginCdc: me.MainView.userInfo.cd_c,
            cd_doc: me.commonFn.sqlNodocu('EA', me.MainView.userInfo.cd_c, me.commonFn.getTodayInfo()),
            fg_ea001: '10',
            dt_doc: Ext.Date.format(new Date(),'Ymd'),
            dc_title: me.MainView.userInfo.nm_e + ' 휴가신청서 [' + noVc + ' ]',
            dc_cont_html: me.getEaDocContHtml(noVc),
            am_doc: 0,
            cd_site: '',
            fg_ea010: '1',	// 내외부문서구분 (1:내부문서,2:외부문서)
            fg_ea020: '1',	// 기안구분 (sy_codel 참조:없으면 추가 후 설정)
            fg_ea030: '1000',	// 양식구분 (sy_codel 참조:없으면 추가 후 설정)
            fg_ea040: '0004',	// 문서구분 (sy_codel 참조:없으면 추가 후 설정)
            cd_e: me.MainView.userInfo.cd_e,
            nm_e: me.MainView.userInfo.nm_e,
            cd_o : me.MainView.userInfo.cd_o,
            nm_o : me.MainView.userInfo.nm_o,
            fg_hr010: me.MainView.userInfo.fg_hr010,
            nm_hr010: me.MainView.userInfo.nm_hr010,
            fg_hr020: me.MainView.userInfo.fg_hr020,
            nm_hr020: me.MainView.userInfo.nm_hr020,
            fg_prior: '0',
            yn_erp: 'Y',	// ERP연동 여부
            yn_re: 'N',	// 재작성 여부
            dc_remark: '',
            cd_doc_ref: '' ,
            cd_doc_re :'',
            id_row: me.mCommonFn.sqlRowId(),
            cd_aln: formValues.cd_aln,
            id_row_erp: noVc,
        };
        me.mCommonFn.uploadEaHtmlFile(eaData, function() {
            me.mCommonFn.saveEaData(eaData, function() {
                Ext.toast('휴가신청서를 상신했습니다.');
                me.onTap_BackBtn();
            });
        });
    },

    getEaDocContHtml: function(noVc) {
        var me = this;
        var formValues = me.view.getValues();
        var wk020Store = me.view.getFields().fg_wk020.getStore();
        var nmWk020 = wk020Store.getAt(wk020Store.find('value',formValues.fg_wk020)).get('name');
        var contHtml = '<p style="text-align:center;font-size:22px;font-family:sans-serif;">' + '휴  가  신  청  서'  + '</p>';
        contHtml = contHtml+  '<table class="xls-export-target" border="1" cellpadding="4" cellspacing="0" width="750" align="center" style="border-collapse:collapse;">';
        contHtml = contHtml + '<tr>';
        contHtml = contHtml + '<td width="70" style="text-align:center; background-color:#eee;"colspan="1">신청번호</td>';
        contHtml = contHtml + '<td style="text-align:center; colspan="1">&nbsp;' + noVc + '</td>';
        contHtml = contHtml + '<td width="70" style="text-align:center; background-color:#eee;"colspan="1">작성일</td>';
        contHtml = contHtml + '<td style="text-align:center; colspan="1">&nbsp;' + Ext.Date.format(new Date(),'Y-m-d') + '</td>';
        contHtml = contHtml + '<td width="70" style="text-align:center; background-color:#eee;"colspan="1">신청자</td>';
        contHtml = contHtml + '<td style="text-align:center; colspan="1">&nbsp;' + me.MainView.userInfo.nm_e + '</td>';
        contHtml = contHtml + '</tr>';

        contHtml = contHtml + '<tr>';
        contHtml = contHtml + '<td width="70" style="text-align:center; background-color:#eee;"colspan="1">구분</td>';
        contHtml = contHtml + '<td style="width:190px"colspan="1">&nbsp;' + nmWk020 + '</td>';
        contHtml = contHtml + '<td width="70" style="text-align:center; background-color:#eee;"colspan="1">부터</td>';
        contHtml = contHtml + '<td style="text-align:center; colspan="1">&nbsp;' + Ext.Date.format(formValues.dt_fr,'Y-m-d') + '</td>';
        contHtml = contHtml + '<td width="70" style="text-align:center; background-color:#eee;"colspan="1">까지</td>';
        contHtml = contHtml + '<td style="text-align:center; colspan="1">&nbsp;' + Ext.Date.format(formValues.dt_fr,'Y-m-d') + '</td>';
        contHtml = contHtml + '</tr>';

        contHtml = contHtml + '<tr>';
        contHtml = contHtml + '<td width="70" style="text-align:center; background-color:#eee;"colspan="1">업무대행</td>';
        contHtml = contHtml + '<td style="width:190px"colspan="1">&nbsp;</td>';
        contHtml = contHtml + '<td width="70" style="text-align:center; background-color:#eee;"colspan="1">비상연락</td>';
        contHtml = contHtml + '<td style="text-align:left; colspan="1">&nbsp;' +  formValues.dc_tel + '</td>';
        contHtml = contHtml + '<td width="70" style="text-align:center; background-color:#eee;"colspan="1">휴가기간</td>';
        contHtml = contHtml + '<td style="text-align:left; colspan="1">&nbsp;</td>';
        contHtml = contHtml + '</tr>';

        contHtml = contHtml + '<tr>';
        contHtml = contHtml + '<td width="60" style="text-align:center; background-color:#eee;"colspan="1">내용</td>';
        contHtml = contHtml + '<td style="width:190px"colspan="5">&nbsp;' + formValues.dc_reason.replaceAll('\r', '').replaceAll('\n', ' ') + '</td>' + '</td>';
        contHtml = contHtml + '</tr>';

        contHtml = contHtml + '</table>';

        return contHtml;
    }

});