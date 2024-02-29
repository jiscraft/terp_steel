/**
 * Created by Andrew on 2021-12-21.
 */
Ext.define('Terp.view.wkOt.WkOtController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.wkot',

    requires: [
        'Ext.field.File',
        'Ext.layout.HBox',
        'Ext.picker.Picker'
    ],

    init: function() {
        var me = this;
        me.commonFn = Terp.app.getController('TerpCommon');
        me.view = me.getView();
        me.MainCtrl = me.view.MainCtrl;
        me.MainView = me.MainCtrl.view;
        me.sitePickerData = [];
        me.attachFiles = [];

        me.mCommonFn = Terp.app.getController('ModernCommon');
        me.mCommonFn.UserInfo = me.MainView.userInfo;
    },

    onPainted_fg_wk040: function(fld) {
        var me = this;
        Ext.Ajax.request({
            async: false,
            url:'/ServerPage/sy/sy_codel.jsp',
            params: {
                sendData: Ext.encode([{
                    actiondata: 'm',
                    loginIduser: me.MainView.userInfo.id_user,
                    loginCdc: me.MainView.userInfo.cd_c,
                    cd_codeh: 'WK040'
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
                        Ext.toast('특근구분 데이터가 없습니다!');
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

    onPainted_site_wrap: function(fld) {
        var me = this;
        Ext.Ajax.request({
            async: false,
            url:'/ServerPage//ma/ma_site.jsp',
            params: {
                sendData: Ext.encode([{
                    actiondata: 'help',
                    loginIduser: me.MainView.userInfo.id_user,
                    loginCdc: me.MainView.userInfo.cd_c,
                    yn_use: 'Y'
                }])
            },
            success: function (res) {
                var obj = Ext.JSON.decode(res.responseText);
                if (obj.success) {
                    if (obj.data.length > 0) {
                        console.log(obj);
                        me.sitePickerData = [];
                        Ext.Array.each(obj.data, function(item) {
                            me.sitePickerData.push({ text: item.nm_site, value: item.cd_site });
                        });
                    }
                    else {
                        Ext.toast('현장 데이터가 없습니다!');
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
                        Ext.toast('특근종류 데이터가 없습니다!');
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

    onChange_nm_site: function(fld, nv, ov) {
        var me = this;
        if (Ext.isEmpty(nv)) {
            me.view.getFields('cd_site').setValue('');
            console.log(fld, me.view.getFields('cd_site'), me.view.getValues());
        }
    },

    onTap_SearchSiteBtn: function() {
        var me = this;
        var formValues = me.view.getValues();
        var sitePickerData = [];
        if (Ext.isEmpty(formValues.cd_site)) {
            Ext.Array.each(me.sitePickerData, function(item) {
                if (item.text.replaceAll(' ','').indexOf(formValues.nm_site.replaceAll(' ','')) > -1) {
                    sitePickerData.push(item);
                }
            });
        }
        else {
            Ext.Array.each(me.sitePickerData, function(item) {
                if (item.value !== formValues.cd_site) {
                    sitePickerData.push(item);
                }
            });
        }
        var sitePicker = Ext.create('Ext.Picker', {
            slots: [
                {
                    name : 'ma_site_slot',
                    bodyCls: 'modern-picker-slot-body',
                    data : sitePickerData
                }
            ],
            height: 350,
            doneButton: '선택',
            cancelButton: '취소',
            listeners: {
                change: function(picker, values) {
                    var selectedItem = null;
                    Ext.Array.each(sitePickerData, function(item) {
                        if (item.value === values.ma_site_slot) {
                            selectedItem = item;

                        }
                    });
                    me.view.getFields('cd_site').setValue(selectedItem.value);
                    me.view.getFields('nm_site').setValue(selectedItem.text);
                    console.log(selectedItem, me.view.getValues());
                }
            }
        });
        me.view.add(sitePicker);
        sitePicker.show();
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
        if (Ext.isEmpty(formValues.fg_wk040)) {
            Ext.toast('특근구분을 선택하세요.');
            return;
        }
        if (Ext.isEmpty(formValues.dt_fr)) {
            Ext.toast('특근기간(부터)를 선택하세요.');
            return;
        }
        if (Ext.isEmpty(formValues.dt_to)) {
            Ext.toast('특근기간(까지)를 선택하세요.');
            return;
        }
        if (Ext.isEmpty(formValues.cd_site)) {
            Ext.toast('현장을 선택하세요.');
            return;
        }
        if (Ext.isEmpty(formValues.dc_period)) {
            Ext.toast('특근시간을 선택하세요.');
            return;
        }
        if (Ext.isEmpty(formValues.dc_ot.replaceAll('\r', '').replaceAll('\n', ''))) {
            Ext.toast('작업내용을 입력하세요.');
            return;
        }
        if (Ext.isEmpty(formValues.dc_reason.replaceAll('\r', '').replaceAll('\n', ''))) {
            Ext.toast('특근사유를 입력하세요.');
            return;
        }
        if (Ext.isEmpty(formValues.cd_aln)) {
            Ext.toast('결재선 선택하세요.');
            return;
        }

        var otData = {
            actiondata: 's',
            loginIduser: me.MainView.userInfo.id_user,
            loginCdc: me.MainView.userInfo.cd_c,
            cd_e: me.MainView.userInfo.cd_e,
            cd_o : me.MainView.userInfo.cd_o,
            no_ot: me.commonFn.sqlNodocu('OT', me.MainView.userInfo.cd_c, me.commonFn.getTodayInfo()),
            id_row: me.mCommonFn.sqlRowId(),
            fg_wk040: formValues.fg_wk040,
            dt_ot: Ext.Date.format(new Date(),'Ymd'),
            dt_fr: Ext.Date.format(formValues.dt_fr,'Ymd'),
            dt_to: Ext.Date.format(formValues.dt_to,'Ymd'),
            cd_site: formValues.cd_site,
            dc_period: formValues.dc_period,
            dc_ot: formValues.dc_ot,
            dc_reason: formValues.dc_reason
        };
        me.attachFiles = [];
        Ext.Array.each(me.lookup('attach_file_fields').items.items, function(item) {
            if (item.xtype === 'container') {
                if (!Ext.isEmpty(item.down('filefield')) && (item.down('filefield').getFiles().length > 0)) {
                    var file = item.down('filefield').getFiles()[0];
                    file.id_row_src = otData.id_row;
                    file.fg_sy210 = '0012';
                    file.fg_sy210_ll = '';
                    me.attachFiles.push(file);
                }
            }
        });
        console.log(otData, me.attachFiles);
        Ext.Ajax.request({
            url: '/ServerPage/wk/wk_ot.jsp',
            params: {
                sendData: Ext.encode([otData])
            },
            success: function (res) {
                var obj = Ext.JSON.decode(res.responseText);
                if (obj.success) {
                    if (me.attachFiles.length > 0) {
                        me.mCommonFn.uploadAttachFiles(me.attachFiles, function () {
                            me.requestApro(otData.no_ot);
                        });
                    }
                    else {
                        me.requestApro(otData.no_ot);
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

    requestApro: function(noOt) {
        var me = this;
        var formValues = me.view.getValues();
        var eaData = {
            loginIduser: me.MainView.userInfo.id_user,
            loginCdc: me.MainView.userInfo.cd_c,
            cd_doc: me.commonFn.sqlNodocu('EA', me.MainView.userInfo.cd_c, me.commonFn.getTodayInfo()),
            fg_ea001: '10',
            dt_doc: Ext.Date.format(new Date(),'Ymd'),
            dc_title: me.MainView.userInfo.nm_e + ' 특근신청서 [' + noOt + ' ]',
            dc_cont_html: me.getEaDocContHtml(noOt),
            am_doc: 0,
            cd_site: '',
            fg_ea010: '1',	// 내외부문서구분 (1:내부문서,2:외부문서)
            fg_ea020: '1',	// 기안구분 (sy_codel 참조:없으면 추가 후 설정)
            fg_ea030: '1000',	// 양식구분 (sy_codel 참조:없으면 추가 후 설정)
            fg_ea040: '0012',	// 문서구분 (sy_codel 참조:없으면 추가 후 설정)
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
            id_row_erp: noOt,
        };
        me.mCommonFn.uploadEaHtmlFile(eaData, function() {
            me.mCommonFn.saveEaData(eaData, function() {
                Ext.toast('특근신청서를 상신했습니다.');
                me.onTap_BackBtn();
            });
        });
    },

    getEaDocContHtml: function(noOt) {
        var me = this;
        var formValues = me.view.getValues();
        var wk040Store = me.view.getFields().fg_wk040.getStore();
        var nmWk040 = wk040Store.getAt(wk040Store.find('value',formValues.fg_wk040)).get('name');

        var contHtml = '<p style="text-align:center;font-size:22px;font-family:sans-serif;">' + '특  근  신  청  서'  + '</p>';
        contHtml = contHtml+  '<table class="xls-export-target" border="1" cellpadding="4" cellspacing="0" width="750" align="center" style="border-collapse:collapse;">';
        contHtml = contHtml + '<tr>';
        contHtml = contHtml + '<td width="70" style="text-align:center; background-color:#eee;"colspan="1">신청번호</td>';
        contHtml = contHtml + '<td style="text-align:center; colspan="1">&nbsp;' + noOt + '</td>';
        contHtml = contHtml + '<td width="70" style="text-align:center; background-color:#eee;"colspan="1">작성일</td>';
        contHtml = contHtml + '<td style="text-align:center; colspan="1">&nbsp;' + Ext.Date.format(new Date(),'Y-m-d') + '</td>';
        contHtml = contHtml + '<td width="70" style="text-align:center; background-color:#eee;"colspan="1">신청자</td>';
        contHtml = contHtml + '<td style="text-align:center; colspan="1">&nbsp;' + me.MainView.userInfo.nm_e + '</td>';
        contHtml = contHtml + '</tr>';

        contHtml = contHtml + '<tr>';
        contHtml = contHtml + '<td width="70" style="text-align:center; background-color:#eee;"colspan="1">구분</td>';
        contHtml = contHtml + '<td style="width:190px"colspan="1">&nbsp;' + nmWk040 + '</td>';
        contHtml = contHtml + '<td width="70" style="text-align:center; background-color:#eee;"colspan="1">부터</td>';
        contHtml = contHtml + '<td style="text-align:center; colspan="1">&nbsp;' + Ext.Date.format(formValues.dt_fr,'Y-m-d') + '</td>';
        contHtml = contHtml + '<td width="70" style="text-align:center; background-color:#eee;"colspan="1">까지</td>';
        contHtml = contHtml + '<td style="text-align:center; colspan="1">&nbsp;' + Ext.Date.format(formValues.dt_fr,'Y-m-d') + '</td>';
        contHtml = contHtml + '</tr>';

        contHtml = contHtml + '<tr>';
        contHtml = contHtml + '<td width="70" style="text-align:center; background-color:#eee;"colspan="1">현장</td>';
        contHtml = contHtml + '<td style="width:190px"colspan="3">&nbsp;' + formValues.nm_site + '</td>';
        contHtml = contHtml + '<td width="70" style="text-align:center; background-color:#eee;"colspan="1">특근기간</td>';
        contHtml = contHtml + '<td style="text-align:left; colspan="1">&nbsp;' + formValues.dc_period + '</td>';
        contHtml = contHtml + '</tr>';

        contHtml = contHtml + '<tr>';
        contHtml = contHtml + '<td width="60" style="text-align:center; background-color:#eee;"colspan="1">내용</td>';
        contHtml = contHtml + '<td style="width:190px"colspan="5">&nbsp;' + formValues.dc_ot.replaceAll('\r', '').replaceAll('\n', ' ') + '</td>' + '</td>';
        contHtml = contHtml + '</tr>';

        contHtml = contHtml + '<tr>';
        contHtml = contHtml + '<td width="60" style="text-align:center; background-color:#eee;"colspan="1">사유</td>';
        contHtml = contHtml + '<td style="width:190px"colspan="5">&nbsp;' + formValues.dc_reason.replaceAll('\r', '').replaceAll('\n', ' ') + '</td>' + '</td>';
        contHtml = contHtml + '</tr>';

        contHtml = contHtml + '</table>';

        return contHtml;
    }


});