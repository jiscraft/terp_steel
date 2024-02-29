/**
 * Created by Andrew on 2021-12-14.
 */
Ext.define('Terp.view.eaPreview.EaPreviewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.eapreview',

    requires: [
        'Ext.util.Format'
    ],

    /**
     * Called when the view is created
     */
    init: function() {
        var me = this;
        me.view = me.getView();
        me.MainCtrl = me.view.MainCtrl;
        me.MainView = me.MainCtrl.view;
        me.ListCtrl = me.view.ListCtrl;
        me.ListView = me.ListCtrl.view;

        me.preview_header = me.lookup('preview_header');
        me.preview_apro_tabs = me.lookup('preview_apro_tabs');
        me.preview_apro_stores = [];

        me.preview_apro1 = me.lookup('preview_apro1');
        me.preview_apro1_store = me.getViewModel().getStore('preview_apro1_store');
        me.preview_apro1.setStore(me.preview_apro1_store);
        me.preview_apro_stores.push(me.preview_apro1_store);

        me.preview_apro2 = me.lookup('preview_apro2');
        me.preview_apro2_store = me.getViewModel().getStore('preview_apro2_store');
        me.preview_apro2.setStore(me.preview_apro2_store);
        me.preview_apro_stores.push(me.preview_apro2_store);

        me.preview_apro3 = me.lookup('preview_apro3');
        me.preview_apro3_store = me.getViewModel().getStore('preview_apro3_store');
        me.preview_apro3.setStore(me.preview_apro3_store);
        me.preview_apro_stores.push(me.preview_apro3_store);

        me.preview_apro4 =  me.lookup('preview_apro4');
        me.preview_apro4_store = me.getViewModel().getStore('preview_apro4_store');
        me.preview_apro4.setStore(me.preview_apro4_store);
        me.preview_apro_stores.push(me.preview_apro4_store);

        me.preview_attach =  me.lookup('preview_attach');
        me.preview_attach_store = me.getViewModel().getStore('preview_attach_store');
        me.preview_attach.setStore(me.preview_attach_store);

        me.view.docData = me.view.SelectedRecord.data;
        me.view.lookup('preview_title').setHtml(me.view.docData.cd_doc);
        me.setHeaderHtml();

        me.view.aproData = {};
        for (var i = 0; i < me.preview_apro_stores.length; i++) {
            me.setAproItemTpl(i);
            if (i === 0) {
                me.loadAproData(0, function() {
                    me.loadAproData(1, function() {
                        me.setAproBtns();
                    });
                });
            }
            if (i > 1) me.loadAproData(i);
        }

        me.setAttachItemTpl();
        me.loadAttachData();

        me.preview_ref_store = me.getViewModel().getStore('preview_ref_store');
        me.loadRefDocData();
    },

    setHeaderHtml: function() {
        var me = this;
        var docData = me.view.docData;
        var html = '<div class="modern-ea-preview-header" style="border-bottom:1px solid silver;padding:10px;">';
        html = html + '<div class="clearfix">';
        html = html + '<div style="float:left;"><span class="nm">' + docData.nm_ea040  + '</span></div>';
        html = html + '<div style="float:right;">기안일: <span class="dt">' + Ext.Date.format(Ext.Date.parse(docData.dt_doc.substring(0, 8), 'Ymd'), 'Y-m-d') + '</span></div>';
        html = html + '</div>';
        html = html + '<div style="padding:5px auto;"><span class="title" style="font-size:16px;font-weight:bold;">' + docData.dc_title + '</span></div>';
        html = html + '<div class="clearfix">';
        html = html + '<div style="float:left;"><span class="nm">' + docData.nm_e + ((Ext.isEmpty(docData.nm_o)) ? '' : (' / '+docData.nm_o)) + '</span></div>';
        html = html + '<div style="float:right;"><span class="dt">' + ((Ext.isEmpty(docData.am_doc) || (docData.am_doc === 0)) ? '&nbsp;' : ('기안금액: '+Ext.util.Format.number(docData.am_doc, '0,000')+'원')) + '</span></div>';
        html = html + '</div>';
        html = html + '</div>';
        /*
        var html = '<table border="1" cellpadding="6" cellspacing="0" style="border-collapse:collapse;border-color:silver;">';
        html = html + '<tr>';
        html = html + '<td>제목</td>';
        html = html + '<td colspan="3"><b>' + docData.dc_title + '</b></td>';
        html = html + '</tr">';
        html = html + '<tr>';
        html = html + '<td>문서번호</td>';
        html = html + '<td>' + docData.cd_doc + '</td>';
        html = html + '<td>문서구분</td>';
        html = html + '<td>' + docData.nm_ea040 + '</td>';
        html = html + '</tr">';
        html = html + '<tr>';
        html = html + '<td>기안자명</td>';
        html = html + '<td>' + docData.nm_e + '</td>';
        html = html + '<td>기안부서</td>';
        html = html + '<td>' + docData.nm_o + '</td>';
        html = html + '</tr">';
        html = html + '<tr>';
        html = html + '<td>기안일자</td>';
        html = html + '<td>' + Ext.Date.format(Ext.Date.parse(docData.dt_doc.substring(0, 8), 'Ymd'), 'Y-m-d') + '</td>';
        html = html + '<td>기안금액</td>';
        html = html + '<td>' + ((Ext.isEmpty(docData.am_doc) || (docData.am_doc === 0)) ? '&nbsp;' : (Ext.util.Format.number(docData.am_doc, '0,000')+'원')) + '</td>';
        html = html + '</tr">';
        html = html + '<tr>';
        html = html + '<td>현장명</td>';
        html = html + '<td colspan="3">' + docData.nm_site + '</td>';
        html = html + '</tr">';
        html = html + '</table>';

         */
        me.preview_header.setHtml(html);
    },

    setAproItemTpl: function(idx) {
        var me = this;
        me.lookup('preview_apro'+(idx+1)).setItemTpl([
            '<tpl for=".">',
            '<div class="modern-ea-apro-item">',
            '<div class="clearfix">',
            '<div style="float:left;"><span class="nm">{nm_e_apro}{nm_hr020_apro:this.formatHr020}{nm_hr010_apro:this.formatHr010}</span></div>',
            '<div style="float:right;"><b><span class="stat {fg_ea002:this.setColor}">{nm_ea002}</span></b></div>',
            '</div>',
            '<tpl if="this.isNotEmpty(dt_apro)">',
            '<div>{fg_ea050:this.formatEa050}일시: <span class="dt">{dt_apro:this.formatDate}</span></div>',
            '</tpl>',
            '<tpl if="this.isNotEmpty(dc_apro)">',
            '<div style="border-top:1px solid silver;margin-top:5px;padding-top:5px;">{dc_apro:this.formatDcApro}</div>',
            '</tpl>',
            '</div>',
            '</tpl>',
            {
                isNotEmpty: function(v) {
                    return !Ext.isEmpty(v);
                },
                formatEa050: function(v) {
                    if (v === '2') return '합의';
                    else if (v === '3') return '협의';
                    else if (v === '9') return '수신';
                    else return '결재'
                },
                formatDate: function(v) {
                    return Ext.Date.format(Ext.Date.parse(v,'YmdHisu'),'Y-m-d H:i:s');
                },
                formatHr010: function(v) {
                    return Ext.isEmpty(v) ? '' : ' ('+v+')';
                },
                formatHr020: function(v) {
                    return Ext.isEmpty(v) ? '' : ' '+v;
                },
                formatDcApro: function(v) {
                    return Ext.isEmpty(v) ? '' : ' '+v;
                },
                setColor: function(v) {
                    var ret = '';
                    switch (v) {
                        case '120':
                            ret = 'blue';
                            break;
                        case '130':
                            ret = 'red';
                            break;
                        case '140':
                            ret = 'orange';
                            break;
                        case '220':
                            ret = 'green';
                            break;
                        case '230':
                            ret = 'orange';
                            break;
                        case '300':
                            ret = 'green';
                            break;
                        case '900':
                            ret = 'green';
                            break;
                    }
                    return ret;
                }
            }
        ]);
    },

    loadAproData: function(idx, callback) {
        var me = this;
        var fg050 = ((idx < 3) ? (idx+1) : '9').toString();
        me.preview_apro_stores[idx].load({
            params :{
                sendData : Ext.encode([{
                    actiondata: 'select',
                    loginIduser: me.MainView.userInfo.id_user,
                    loginCdc: me.MainView.userInfo.cd_c,
                    cd_doc: me.view.docData.cd_doc,
                    fg_ea050: fg050
                }])
            },
            callback: function (records, operation, success) {
                if (success == true) {
                    if (records.length > 0) {
                        me.view.aproData[fg050] = [];
                        Ext.Array.each(records, function (record) {
                            if (record.data.fg_ea050 === fg050) me.view.aproData[fg050].push(record.data);
                        });
                        me.view.aproData[fg050] = Ext.Array.sort(me.view.aproData[fg050], function (left, right) {
                            return (left.sq_apro < right.sq_apro) ? -1 : ((left.sq_apro > right.sq_apro) ? 1 : 0);
                        });
                    }
                    if (callback) callback(records);
                }
                else {
                    var errorMsg = me.preview_apro_stores[0].getProxy().getReader().rawData.msg;
                    Ext.toast(errorMsg);
                }
            },
            scope : me
        });
    },

    setAttachItemTpl: function() {
        var me = this;
        me.preview_attach.setItemTpl([
            '<tpl for=".">',
            '<div class="modern-ea-attach-item">',
            '<div><b><span class="nm">{dc_src_name}</span></b></div></div>',
            '<div><span class="size">{dc_src_size:this.formatSize}</span></div>',
            '</div>',
            '</tpl>',
            {
                formatSize: function(v) {
                    return Ext.util.Format.number(v, '0,000 바이트');
                }
            }
        ]);
    },

    loadAttachData: function() {
        var me = this;
        me.preview_attach_store.load({
            params :{
                sendData : Ext.encode([{
                    actiondata: 'selectmo',
                    loginIduser: me.MainView.userInfo.id_user,
                    loginCdc: me.MainView.userInfo.cd_c,
                    dc_key1: me.view.docData.cd_doc,
                    id_row_src : me.view.docData.id_row_src ,
                    nm_tbl: 'ea_doc',
                    fg_af: '2000'
                }])
            },
            callback: function (records, operation, success) {
                if (success == true) {
                    if (records.length > 0) {
                    }
                    else {
                    }
                }
                else {
                    var errorMsg = me.preview_apro_stores[0].getProxy().getReader().rawData.msg;
                    Ext.toast(errorMsg);
                }
            },
            scope : me
        });
    },

    loadRefDocData: function() {
        var me = this;
        me.RefDocRecord = null;
        me.lookup('preview_refdocview_btn').hide();
        me.preview_ref_store.load({
            params :{
                sendData : Ext.encode([{
                    actiondata: 'select',
                    loginIduser: me.MainView.userInfo.id_user,
                    loginCdc: me.MainView.userInfo.cd_c,
                    cd_doc: me.view.docData.cd_doc
                }])
            },
            callback: function (records, operation, success) {
                if (success == true) {
                    if (records.length > 0) {
                        Ext.Ajax.request({
                            url: '/ServerPage/gw/ea/ea_doc.jsp',
                            params :{
                                sendData : Ext.encode([{
                                    actiondata: 'select',
                                    loginIduser: me.MainView.userInfo.id_user,
                                    loginCdc: me.MainView.userInfo.cd_c,
                                    cd_doc: records[0].get('cd_doc_ref')
                                }])
                            },
                            success: function (res) {
                                var obj = Ext.JSON.decode(res.responseText);
                                if (obj.success) {
                                    if (obj.data.length > 0) {
                                        me.RefDocRecord = Ext.create('Ext.data.Model', obj.data[0]);
                                        me.lookup('preview_refdocview_btn').show();
                                    }
                                }
                            }
                        });
                    }
                }
            },
            scope : me
        });
    },

    setAproBtns: function() {
        var me = this;
        var aproData = [];
        aproData = aproData.concat(me.preview_apro1_store.data.items).concat(me.preview_apro2_store.data.items);
        aproData = Ext.Array.sort(aproData, function (left, right) {
            return (left.data.sq_apro < right.data.sq_apro) ? -1 : ((left.data.sq_apro > right.data.sq_apro) ? 1 : 0);
        });

        Ext.Array.each(me.view.getBbar().items.items, function(item) {
            if (item.xtype === 'button') item.hide();
        });
        switch (me.ListView.ListId) {
            case 'my':
            case 'apro':
                if ((me.view.docData.fg_ea001 === '10') && (me.view.docData.cd_e === me.MainView.userInfo.cd_e)) {
                    var cntApro = 0;
                    Ext.Array.each(aproData, function(record) {
                        if ((record.get('cd_e_apro') !== me.MainView.userInfo.cd_e) && !Ext.isEmpty(record.get('fg_ea002')) && (record.get('fg_ea002') > '000')) cntApro++;
                    });
                    if (cntApro === 0) {
                        me.lookup('apro_request_cancel_btn').show();
                    }
                }

                for (var i = 0; i < aproData.length; i++) {
                    var item = aproData[i].data;
                    var next = (i === aproData.length - 1) ? null : aproData[i + 1].data;
                    if ((item.cd_e_apro === me.MainView.userInfo.cd_e) && (me.view.docData.cd_e !== me.MainView.userInfo.cd_e)) {
                        if (item.fg_ea050 === '1') {
                            if (Ext.isEmpty(next) || (!Ext.isEmpty(next) && (Ext.isEmpty(next.fg_ea002) || (next.fg_ea002 === '000')))) {
                                if (Ext.isEmpty(item.fg_ea002) || (item.fg_ea002 === '000')) {
                                    me.lookup('apro_120_btn').show();
                                    me.lookup('apro_140_btn').show();
                                }
                                else if (item.fg_ea002 === '120') {
                                    me.lookup('apro_120_cancel_btn').show();
                                    me.lookup('apro_140_btn').show();
                                }
                                else if (item.fg_ea002 === '140') {
                                    me.lookup('apro_120_btn').show();
                                    me.lookup('apro_140_cancel_btn').show();
                                }
                            }
                        }
                        else if (item.fg_ea050 === '2') {
                            if (Ext.isEmpty(next) || (!Ext.isEmpty(next) && (Ext.isEmpty(next.fg_ea002) || (next.fg_ea002 === '000')))) {
                                if (Ext.isEmpty(item.fg_ea002) || (item.fg_ea002 === '000')) {
                                    me.lookup('apro_220_btn').show();
                                    me.lookup('apro_230_btn').show();
                                }
                                else if (item.fg_ea002 === '220') {
                                    me.lookup('apro_230_btn').show();
                                }
                                else if (item.fg_ea002 === '230') {
                                    me.lookup('apro_220_btn').show();
                                }
                            }
                        }
                    }
                }
                if ((me.view.docData.fg_ea050_my === '3') && (me.view.docData.fg_ea002_coo !== '300')) {
                    me.lookup('apro_300_btn').show();
                }
                if ((me.view.docData.fg_ea050_my === '9') && (me.view.docData.fg_ea002_cc !== '900')) {
                    me.lookup('apro_900_btn').show();
                }
                break;
            // case 'apro':
            //     if ((me.view.docData.fg_ea050_my === '1') && (me.view.docData.fg_ea002_apro === '000')) {
            //         me.lookup('apro_120_btn').show();
            //         me.lookup('apro_140_btn').show();
            //     }
            //     if ((me.view.docData.fg_ea050_my === '2') && (me.view.docData.fg_ea002_apro === '000')) {
            //         me.lookup('apro_220_btn').show();
            //         me.lookup('apro_230_btn').show();
            //     }
            //     break;
            case 'coo':
                if ((me.view.docData.fg_ea050_my === '3') && (me.view.docData.fg_ea002_coo !== '300')) {
                    me.lookup('apro_300_btn').show();
                }
                break;
            case 'cc':
                if ((me.view.docData.fg_ea050_my === '9') && (me.view.docData.fg_ea002_cc !== '900')) {
                    me.lookup('apro_900_btn').show();
                }
                break;
        }
    },

    onTap_BackBtn: function() {
        var me = this;
        me.MainCtrl.setCardAnim('slide', 'right', 500);
        if (me.view.PreviewCtrl) {
            me.MainView.setActiveItem(me.view.PreviewCtrl.view);
        }
        else {
            me.MainView.setActiveItem(me.ListView);
        }
        me.MainView.remove(me.view);
    },

    onTap_DocViewBtn: function() {
        var me = this;
        me.MainView.ea_docviewer_card = me.MainView.add({
            xtype: 'eadocviewer',
            reference: 'ea_docviewer_card' + me.view.docData.cd_doc,
            MainCtrl: me.MainCtrl,
            ListCtrl: me.ListCtrl,
            PreviewCtrl: me,
            SelectedRecord: Ext.create('Ext.data.Model', me.view.docData),
            listeners: {
                added: function(card, container, index) {
                    me.MainCtrl.setCardAnim('slide', 'left', 500);
                    me.MainView.setActiveItem(card);
                }
            }
        });
    },

    onTap_RefDocViewBtn: function() {
        var me = this;
        me.MainView.ea_refdoc_card = me.MainView.add({
            xtype: 'eapreview',
            reference: 'ea_preview_card_' + me.RefDocRecord.get('cd_doc'),
            MainCtrl: me.MainCtrl,
            ListCtrl: me.ListCtrl,
            PreviewCtrl: me,
            SelectedRecord: me.RefDocRecord,
            listeners: {
                added: function(card, container, index) {
                    me.MainCtrl.setCardAnim('slide', 'left', 500);
                    me.MainView.setActiveItem(card);
                }
            }
        });
    },

    onTap_AttachListItemDisclosure: function(record) {
        var me = this;
        var path = record.get('dc_save_path');
        var fn = record.get('no_af');

        var dfn = record.get('dc_src_name');
        if (!Ext.isEmpty(path) && !Ext.isEmpty(fn)) {
            if (path.substr(0,10) == 'files/OLD/'){
                fn = dfn;
            }else{
                fn = fn +'.'+dfn.split('.').pop();
            }
            window.downloadTerpFile(path, fn, dfn);
        }
    },

    onTap_AproBtn: function(btn) {
        var me = this;
        var fgApro = '000';
        var isCancel = false;
        var btnId = btn.reference.replaceAll('apro_','').replaceAll('_btn','').split('_');
        var fgApro = (btnId[0] === 'request') ? '100' : btnId[0];
        var isCancel = ((btnId.length > 1) && (btnId[1] === 'cancel'));
        me.procAproStatUpdate(fgApro, isCancel, function(sendDataJson) {
            me.saveUpdataAproData(sendDataJson, function(obj) {
                Ext.toast(me.getAproStatText('정상적으로 ' + sendDataJson.fg_ea002) + ' 처리 되었습니다.');
                me.view.docData.fg_ea00_my = '';
                switch (fgApro.substring(0,1)) {
                    case '1':
                    case '2':
                        me.view.docData.fg_ea001 = sendDataJson.fg_ea001;
                        me.view.docData.fg_ea002_apro = sendDataJson.fg_ea002;
                        break;
                    case '3':
                        me.view.docData.fg_ea002_coo = sendDataJson.fg_ea002;
                        break;
                    case '9':
                        me.view.docData.fg_ea00_cc = sendDataJson.fg_ea002;
                        break;
                }
                console.log(me.view.docData);
                me.view.SelectedRecord = Ext.create('Ext.data.Model', me.view.docData);
                me.setHeaderHtml();
                me.view.aproData = {};
                for (var i = 0; i < me.preview_apro_stores.length; i++) {
                    if (i === 0) {
                        me.loadAproData(0, function() {
                            me.loadAproData(1, function() {
                                me.setAproBtns();
                            });
                        });
                    }
                    if (i > 1) me.loadAproData(i);
                }
                me.loadAttachData();
                me.loadRefDocData();

                var listRecord = me.ListCtrl.list_store.findRecord('cd_doc', me.view.docData.cd_doc);
                if (me.view.ListId === 'my') {
                    listRecord.data.fg_ea001 = me.view.docData.fg_ea001;
                    listRecord.data.fg_ea00_my = me.view.docData.fg_ea00_my;
                    listRecord.data.fg_ea002_apro = me.view.docData.fg_ea002_apro;
                    listRecord.data.fg_ea002_coo = me.view.docData.fg_ea002_coo;
                    listRecord.data.fg_ea00_cc = me.view.docData.fg_ea002_cc;
                }
                else {
                    me.ListCtrl.list_store.remove(listRecord);
                    me.ListCtrl.list_store.commitChanges();
                    me.ListView.listCount = me.ListCtrl.list_store.getCount();
                    me.MainCtrl.getListCount(function(cntData) {
                        me.ListView.listTotalCount = cntData[me.ListView.ListId];
                        if (Ext.isEmpty(me.ListView.searchWord)) {
                            me.ListView.lookup('list_item_cnt').setHtml(Ext.String.format('{0} / {1}', Ext.util.Format.number(me.ListView.listCount, '0,000'), Ext.util.Format.number(me.ListView.listTotalCount, '0,000')));
                        }
                        else {
                            me.ListView.lookup('list_item_cnt').setHtml(Ext.String.format('{0} 건', Ext.util.Format.number(me.ListView.listCount, '0,000')));
                        }

                        if ((me.ListView.listCount === 0) || (me.ListView.listCount < me.ListView.listTotalCount)) {
                            me.ListCtrl.loadListData();
                        }
                    });
                }
                me.ListCtrl.list_view.refresh();
            });
        });
    },

    procAproStatUpdate: function(fgApro, isCancel, callback) {
        var me = this;
        var fg050 = fgApro.substring(0,1);
        var nmApro = me.getAproStatText(fgApro);
        var nmProc = (isCancel) ? '취소' : '진행';
        var myAproData = me.getMyAproData(fgApro);
        if (myAproData !== null) {
            var aproStateText = Ext.isEmpty(me.getAproStatText(myAproData.fg_ea002)) ? '' : ('현재 ' + me.getAproStatText(myAproData.fg_ea002) + ' 처리하신 상태입니다!<br>');
            var msg = Ext.String.format('{0}{1} 처리를 {2}하시겠습니까?', ((fgApro === '100') ? '' : aproStateText), nmApro, nmProc);
            Ext.Msg.confirm('확인', msg, function(choice) {
                if (choice === 'yes') {
                    var sendDataJson = {
                        loginIduser: me.MainView.userInfo.id_user,
                        loginCdc: me.MainView.userInfo.cd_c,
                        cd_doc: myAproData.cd_doc,
                        ln_apro: myAproData.ln_apro,
                        dt_apro: Ext.Date.format(new Date(),'YmdHisu')
                    };
                    if (isCancel) {
                        sendDataJson.fg_ea002 = '000';
                        sendDataJson.dc_apro = '';
                        if (fg050 === '1') sendDataJson.fg_ea001 = '10';
                        if (fgApro === '100') sendDataJson.fg_ea001 = '99';
                        if (callback) callback(sendDataJson);
                    }
                    else {
                        if (fg050 < '3') {
                            Ext.Msg.prompt(nmApro + '의견 입력', nmApro + '의견을 입력하세요...', function (choice, text) {
                                if (choice === 'ok') {
                                    sendDataJson.fg_ea002 = fgApro;
                                    sendDataJson.dc_apro = Ext.isEmpty(text) ? '' : text;
                                    if (fg050 === '1') {
                                        var isLast = me.view.aproData[fg050].indexOf(myAproData) === (me.view.aproData[fg050].length - 1);
                                        if (isLast) {
                                            sendDataJson.fg_ea001 = (fgApro === '140') ? '40' : '20';
                                        }
                                        else {
                                            if (fgApro === '140') {
                                                sendDataJson.fg_ea001 = '40';
                                            }
                                        }
                                    }
                                    if (callback) callback(sendDataJson);
                                }
                            }, me, true, null, {});
                        }
                        else {
                            sendDataJson.fg_ea002 = fgApro;
                            if (callback) callback(sendDataJson);
                        }
                    }
                }
            });
        }
    },

    saveUpdataAproData: function(sendDataJson, callback) {
        var me = this;
        Ext.Ajax.request({
            url: '/ServerPage/gw/ea/ea_apro_status_update.jsp',
            params: {
                sendData: Ext.encode([sendDataJson])
            },
            success: function (res) {
                var obj = Ext.JSON.decode(res.responseText);
                if (obj.success) {
                    if (callback) callback(obj);
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

    getMyAproData: function(fgApro) {
        var me = this;
        var fg050 = fgApro.substring(0,1);
        var myAproData = null;
        for (var i=0; i<me.view.aproData[fg050].length; i++) {
            var item = me.view.aproData[fg050][i];
            var next = me.view.aproData[fg050][i+1];
            if ((item.fg_ea050 === fg050) && (item.cd_e_apro === me.MainView.userInfo.cd_e)) {
                myAproData = item;
                break;
            }
        }
        return myAproData;
    },

    getAproStatText: function(fgApro) {
        var me = this;
        var statText = '';
        switch (fgApro) {
            case '100':
                statText = '상신';
                break;
            case '120':
                statText = '승인';
                break;
            case '130':
                statText = '부결';
                break;
            case '140':
                statText = '반려';
                break;
            case '220':
                statText = '동의';
                break;
            case '230':
                statText = '반의';
                break;
            case '300':
                statText = '협의확인';
                break;
            case '900':
                statText = '수신확인';
                break;
        }
        return statText;
    }

});