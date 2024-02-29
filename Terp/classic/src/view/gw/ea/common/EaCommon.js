/**
 * Created by Andrew on 2021-10-23.
 */
Ext.define('Terp.controller.EaCommon', {
    extend: 'Ext.app.Controller',

    requires: [
        'Terp.view.gw.ea.common.eadraftwin.EaDraftWin',
        'Terp.view.gw.ea.common.eareviewwin.EaReviewWin'
    ],

    init: function() {
        var me = this;
        me.commonFn = Terp.app.getController('TerpCommon');
    },

    getDocErpData: function(erpKeyParams, callback) {
        var me = this;
        Ext.Ajax.request({
            async: false,
            url: '/ServerPage/gw/ea/ea_doc_erp.jsp',
            params: {
                sendData: Ext.encode([{
                    loginIduser: me.commonFn.getUserInfo().id_user,
                    loginCdc: me.commonFn.getUserInfo().cd_c,
                    cd_doc: erpKeyParams.cd_doc || '',
                    id_row_erp: erpKeyParams.id_row_erp,
                    fg_ea040: erpKeyParams.fg_ea040,
                    actiondata: 'select'
                }])
            },
            success: function (res) {
                var obj = Ext.JSON.decode(res.responseText);
                if (obj.success) {
                    if (obj.data.length > 0) {
                        if (callback) callback(obj.data[0]);
                    }
                    else {
                        //me.commonFn.toastMessage('ERP 문서정보를 찾지 못했습니다.','t');
                    }
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

    getErpAttachData: function(erpKeyParams, callback) {
        var me = this;
        Ext.Ajax.request({
            async: false,
            url: '/ServerPage/sy/sy_files.jsp',
            params: {
                sendData: Ext.encode([{
                    loginIduser: me.commonFn.getUserInfo().id_user,
                    loginCdc: me.commonFn.getUserInfo().cd_c,
                    id_row_src: erpKeyParams.id_row_erp,
                    fg_ea040: erpKeyParams.fg_ea040 ,
                    actiondata: 'select'
                }])
            },
            success: function (res) {
                var obj = Ext.JSON.decode(res.responseText);
                if (obj.success) {
                    if (callback) callback(obj.data);
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

    getDocData: function(cdDoc, callback) {
        var me = this;
        Ext.Ajax.request({
            async: false,
            url: '/ServerPage/gw/ea/ea_doc.jsp',
            params: {
                sendData: Ext.encode([{
                    loginIduser: me.commonFn.getUserInfo().id_user,
                    loginCdc: me.commonFn.getUserInfo().cd_c,
                    cd_doc: cdDoc,
                    actiondata: 'select'
                }])
            },
            success: function (res) {
                var obj = Ext.JSON.decode(res.responseText);
                if (obj.success) {
                    if (obj.data.length > 0) {
                        if (callback) callback(obj.data[0]);
                    }
                    else {
                        me.commonFn.toastMessage('전자결재 문서정보를 찾지 못했습니다.','t');
                    }
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

    getDocAttachData: function(idRow, fgEa040 , callback) {
        var me = this;
        Ext.Ajax.request({
            async: false,
            url: '/ServerPage/sy/sy_files.jsp',
            params: {
                sendData: Ext.encode([{
                    loginIduser: me.commonFn.getUserInfo().id_user,
                    loginCdc: me.commonFn.getUserInfo().cd_c,
                    id_row_src: idRow,
                    fg_ea040: fgEa040 ,
                    actiondata: 'select'
                }])
            },
            success: function (res) {
                var obj = Ext.JSON.decode(res.responseText);
                if (obj.success) {
                    if (callback) callback(obj.data);
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

    getAproData: function(cdDoc, callback) {
        var me = this;
        Ext.Ajax.request({
            async: false,
            url: '/ServerPage/gw/ea/ea_doc_apro.jsp',
            params: {
                sendData: Ext.encode([{
                    loginIduser: me.commonFn.getUserInfo().id_user,
                    loginCdc: me.commonFn.getUserInfo().cd_c,
                    cd_doc: cdDoc,
                    actiondata: 'select'
                }])
            },
            success: function (res) {
                var obj = Ext.JSON.decode(res.responseText);
                if (obj.success) {
                    if (obj.data.length > 0) {
                        if (callback) callback(obj.data);
                    }
                    else {
                        me.commonFn.toastMessage('결재선 정보를 찾지 못했습니다.','t');
                    }
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

    getDocRefData: function(cdDoc, callback) {
        var me = this;
        Ext.Ajax.request({
            async: false,
            url: '/ServerPage/gw/ea/ea_doc_ref.jsp',
            params: {
                sendData: Ext.encode([{
                    loginIduser: me.commonFn.getUserInfo().id_user,
                    loginCdc: me.commonFn.getUserInfo().cd_c,
                    cd_doc: cdDoc,
                    actiondata: 'select'
                }])
            },
            success: function (res) {
                var obj = Ext.JSON.decode(res.responseText);
                if (obj.success) {
                    if (callback) callback(obj.data);
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

    getDocFormData: function(cdForm, callback) {
        var me = this;
        Ext.Ajax.request({
            async: false,
            url: '/ServerPage/gw/ea/ea_def_form.jsp',
            params: {
                sendData: Ext.encode([{
                    loginIduser: me.commonFn.getUserInfo().id_user,
                    loginCdc: me.commonFn.getUserInfo().cd_c,
                    cd_form: cdForm,
                    actiondata: 'list'
                }])
            },
            success: function (res) {
                var obj = Ext.JSON.decode(res.responseText);
                if (obj.success) {
                    if (obj.data.length > 0) {
                        var data = obj.data[0];
                        if (!Ext.isEmpty(data.dc_save_path)) {
                            Ext.Ajax.request({
                                async: false,
                                url: Ext.String.format('{0}/{1}_{2}.html', data.dc_save_path, data.no_af, data.id_row_src),
                                success: function (res) {
                                    data.dc_cont_html = res.responseText;
                                }
                            });
                        }
                        if (callback) callback(data);
                    }
                    else {
                        me.commonFn.toastMessage('기안양식 정보를 찾지 못했습니다.','t');
                    }
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

    getEaAlnBoxHtml: function (aproData, tableAlign) {
        if (Ext.isEmpty(aproData)) return '';

        var alnData1 = [];
        var alnData2 = [];
        Ext.Array.each(aproData, function (data) {
            if (data.fg_ea050 === '1') alnData1.push(data);
            else if (data.fg_ea050 === '2') alnData2.push(data);
        });

        alnData1 = Ext.Array.sort(alnData1, function (left, right) {
            return (left.sq_apro < right.sq_apro) ? -1 : ((left.sq_apro > right.sq_apro) ? 1 : 0);
        });
        alnData2 = Ext.Array.sort(alnData2, function (left, right) {
            return (left.sq_apro < right.sq_apro) ? -1 : ((left.sq_apro > right.sq_apro) ? 1 : 0);
        });

        var alnData = Ext.Array.merge(alnData1, alnData2);
        var lineData = [[], []];
        for (var i = 0; i < alnData.length; i++) {
            var aln = alnData[i];
            if (i === 0) lineData[0].push(aln);
            else lineData[parseInt(aln.fg_ea050, 10) - 1].push(aln);
        }

        var cntLineFg = 0;
        if (!Ext.isEmpty(lineData[0])) cntLineFg++;
        if (!Ext.isEmpty(lineData[1])) cntLineFg++;

        if (cntLineFg > 0) {
            if (!Ext.isEmpty(lineData[1])) {
                var diff = lineData[0].length - lineData[1].length;
                if (diff > 0) {
                    for (var i = 0; i < diff; i++) lineData[1].push(null);
                }
                else if (diff < 0) {
                    var lastAln = lineData[0][lineData[0].length - 1];
                    lineData[0][lineData[0].length - 1] = null;
                    for (var i = 0; i < Math.abs(diff); i++) lineData[0].push(null);
                    lineData[0].push(lastAln);
                    lineData[1].push(null);
                }
                else if (diff === 0) {
                    var lastAln = lineData[0][lineData[0].length - 1];
                    lineData[0][lineData[0].length - 1] = null;
                    lineData[0].push(lastAln);
                    lineData[1].push(null);
                }
            }
            //console.log(lineData);

            var attrTableAlign = Ext.isEmpty(tableAlign) ? '' : Ext.String.format('align="{0}"', tableAlign);
            var html = '<table border="1" cellpadding="0" cellspacing="0" class="tsoft-ea-apro-line-box"' + attrTableAlign + '>';

            for (var r = 0; r < cntLineFg; r++) {
                for (var t = 0; t < 3; t++) lineData[r]['tr' + (t + 1)] = [];
                for (var c = 0; c < lineData[r].length; c++) {
                    var aln = lineData[r][c];
                    //console.log(aln);
                    if (Ext.isEmpty(aln)) {
                        lineData[r].tr1.push(null);
                        lineData[r].tr2.push(null);
                        lineData[r].tr3.push(null);
                    }
                    else {
                        lineData[r].tr1.push({
                            cd_o_apro: Ext.isEmpty(aln.cd_o_apro) ? '&nbsp;' : aln.cd_o_apro,
                            nm_o_apro: Ext.isEmpty(aln.nm_o_apro) ? '&nbsp;' : aln.nm_o_apro,
                            fg_hr010_apro: Ext.isEmpty(aln.fg_hr010_apro) ? '&nbsp;' : aln.fg_hr010_apro,
                            nm_hr010_apro: Ext.isEmpty(aln.nm_hr010_apro) ? '&nbsp;' : aln.nm_hr010_apro,
                            fg_hr020_apro: Ext.isEmpty(aln.fg_hr020_apro) ? '&nbsp;' : aln.fg_hr020_apro,
                            nm_hr020_apro: Ext.isEmpty(aln.nm_hr020_apro) ? '&nbsp;' : aln.nm_hr020_apro
                        });
                        lineData[r].tr2.push({
                            sq_apro: Ext.isEmpty(aln.sq_apro) ? '&nbsp;' : aln.sq_apro,
                            fg_ea050: aln.fg_ea050,
                            fg_ea002: Ext.isEmpty(aln.fg_ea002) ? '000' : aln.fg_ea002,
                            cd_e_apro: Ext.isEmpty(aln.cd_e_apro) ? '&nbsp;' : aln.cd_e_apro,
                            nm_e_apro: Ext.isEmpty(aln.nm_e_apro) ? '&nbsp;' : aln.nm_e_apro,
                            id_user_apro: Ext.isEmpty(aln.id_user_apro) ? '&nbsp;' : aln.id_user_apro
                        });
                        lineData[r].tr3.push({
                            //dt_apro: Ext.isEmpty(aln.dt_apro) ? '&nbsp;' : Ext.Date.format(Ext.Date.parse(aln.dt_apro,'YmdHisu'),'Y-m-d<BR>H:i:s')
                            dt_apro: Ext.isEmpty(aln.dt_apro) ? '&nbsp;' : Ext.Date.format(Ext.Date.parse(aln.dt_apro,'YmdHisu'), 'Y-m-d')
                        });
                    }
                }
                // console.log(lineData[r]);

                var cellCls = [ ' jt', ' nm', ' dt' ];
                var cellDataIndex = [ 'nm_hr010_apro', 'nm_e_apro', 'dt_apro' ];
                var aproTypeLabel = (r == 0) ? '결<br>&nbsp;<br>재' : '합<br>&nbsp;<br>의';
                for (var t = 0; t < 3; t++) {
                    lineTr = lineData[r]['tr' + (t + 1)];
                    html = html + '<tr>';
                    for (var c = 0; c < lineTr.length; c++) {
                        var item = lineTr[c];
                        var fg050Cls = (!Ext.isEmpty(item) && (t === 1)) ? ' fg050' + (Ext.isEmpty(item.fg_ea050) ? '' : '-'+item.fg_ea050) : '';
                        var fg002Cls = (!Ext.isEmpty(item) && (t === 1)) ? ' fg002' + (Ext.isEmpty(item.fg_ea002) ? '' : '-'+item.fg_ea002) : '';
                        var isFirst = (t === 0) && (c === 0);
                        var isLast = (c === (lineTr.length - 1));
                        var firstCls = (isFirst) ? ' first' : '';
                        var lastCls = (isLast) ? (' last lc'+cntLineFg) : '';
                        var blankCls = Ext.isEmpty(item) ? ' blank' : '';
                        var tdCls = cellCls[t] + fg002Cls + firstCls + lastCls + blankCls;
                        var cellData = Ext.isEmpty(item) ? '&nbsp;' : item[cellDataIndex[t]];

                        if (isFirst) {
                            html = html + '<td class="apro-cell fg" rowspan="3">' + aproTypeLabel + '</td>';
                        }
                        if (isLast) {
                            if (r === 0) {
                                if (t === 0) {
                                    html = html + Ext.String.format('<td class="apro-cell{0}">{1}</td>', tdCls, cellData);
                                }
                                else if (t === 1) {
                                    var cntRowSpan = (cntLineFg > 1) ? (cntLineFg * 3 - 2) : 0;
                                    var attrRowSpan = (cntRowSpan > 0) ? ' rowspan="' + cntRowSpan + '"' : '';
                                    html = html + Ext.String.format('<td class="apro-cell{0}"{1}>{2}</td>', tdCls, attrRowSpan, cellData);
                                }
                                else if (t === 2) {
                                    if (cntLineFg === 1) {
                                        html = html + Ext.String.format('<td class="apro-cell{0}">{1}</td>', tdCls, cellData);
                                    }
                                }
                            }
                            else if (r === (cntLineFg - 1)) {
                                if (t === 2) {
                                    var lastDtApro = lineData[0].tr3[lineData[0].tr3.length - 1].dt_apro;
                                    html = html + Ext.String.format('<td class="apro-cell{0}">{1}</td>', tdCls, lastDtApro);
                                }
                            }
                        }
                        else {
                            html = html + Ext.String.format('<td class="apro-cell{0}">{1}</td>', tdCls, cellData);
                        }
                    }
                    html = html + '</tr>';
                }
            }
            html = html + '</table>';
        }
        return html;
    },

    openEaDraftWin: function(callback) {
        var me = this;
        var idRow = me.commonFn.sqlRowId();
        var cdDoc = me.commonFn.sqlNodocu('EA');
        var eaDraftWin = Ext.create('Terp.view.gw.ea.common.eadraftwin.EaDraftWin', {
            autoShow: true,
            id_row_src: idRow,
            popupParams: {
                showMode: 'GW',
                windowTitle: '새로운 기안 작성',
                upload_folder: 'EA/attach',
                eaDocParams: {
                    id_row: idRow,
                    cd_doc: cdDoc,
                    dt_doc: Ext.Date.format(new Date(), 'Ymd'),
                    dc_title: '',
                    dc_cont_html: '',
                    am_doc: 0,
                    cd_site: '',
                    nm_site: '',
                    fg_ea010: '1',
                    fg_ea020: '',
                    fg_ea030: '1000',
                    fg_ea040: '1000',
                    fg_prior: '0',
                    yn_erp: 'N',
                    yn_re: 'N',
                    dc_remark: '',
                    cd_doc_ref: '',
                    cd_doc_re: '',
                    yn_add: 'N',
                    yn_single: 'N',
                    yn_safe: 'N'
                },
                callback: function(data) {
                    if (callback) callback(data);
                }
            }
        });
    },

    openEaReviewWin: function(cdDoc, showMode, callback) {
        var me = this;
        var eaReviewWin = Ext.create('Terp.view.gw.ea.common.eareviewwin.EaReviewWin', {
            autoShow: true,
            popupParams: {
                showMode: showMode,
                windowTitle: '기안문서 보기',
                cd_doc: cdDoc,
                callback: function(action, data) {
                    if (callback) callback(action, data);
                }
            }
        });
    },

    updateAproStatus: function(eaDocs, fg002, nm002, ynCancel, callback) {
        var me = this;
        var fg050 = fg002.substring(0,1);
        if (ynCancel) {
            if (!me.checkCancelable(eaDocs.aproData)) {
                me.commonFn.toastMessage('다음 결재자가 결재를 진행하여 취소할 수 없습니다','t');
                return;
            }
        }

        var myAproData = me.getMyAproData(eaDocs.aproData, fg050);
        if (Ext.isEmpty(myAproData)) {
            me.commonFn.toastMessage('결재할 정보를 찾지 못했습니다.', 't');
            return;
        }

        var msg = Ext.String.format('{0} 처리를 진행하시겠습니까?', nm002);
        if (fg002 === '100') {
            msg = Ext.String.format('상신을 취소하시면 임시보관문서로 처리됩니다.<br>ERP에서 자동 작성된 문서는 임시보관이 안됩니다<br>{0}', msg);
        }
        me.commonFn.msgBox.confirm('확인', msg, function (choice) {
            if (choice === 'yes') {
                var sendDataJson = {
                    loginIduser: me.commonFn.getUserInfo().id_user,
                    loginCdc: me.commonFn.getUserInfo().cd_c,
                    cd_doc: myAproData.cd_doc,
                    ln_apro: myAproData.ln_apro,
                    dt_apro: Ext.Date.format(new Date(),'YmdHisu')
                };
                if (ynCancel) {
                    sendDataJson.fg_ea002 = '000';
                    sendDataJson.dc_apro = '';
                    if (fg050 === '1') {
                        sendDataJson.fg_ea001 = (fg002 === '100') ? '99' : '10';
                    }
                    me.saveUpdateAproData(sendDataJson, callback);
                }
                else {
                    if (fg050 < '3') {
                        me.commonFn.msgBox.prompt(nm002 + '의견 입력', nm002 + '의견을 입력하세요...', function (btn, text) {
                            if (btn === 'ok') {
                                sendDataJson.fg_ea002 = fg002;
                                sendDataJson.dc_apro = Ext.isEmpty(text) ? '' : text;
                                if (fg050 === '1') {
                                    if (myAproData.isLast) {
                                        sendDataJson.fg_ea001 = ((fg002 === '140') ? '40' : '20');
                                    }
                                    else {
                                        if (fg002 === '140') {
                                            sendDataJson.fg_ea001 = '40';
                                        }
                                    }
                                }
                                me.saveUpdateAproData(sendDataJson, callback);
                            }
                        }, me, true);
                    }
                    else {
                        sendDataJson.fg_ea002 = fg002;
                        me.saveUpdateAproData(sendDataJson, callback);
                    }
                }
            }
        });

    },

    checkCancelable: function(aproData) {
        var me = this;
        var isCancelable = false;
        var aproData12 = [];
        Ext.Array.each(aproData, function(item) {
            if ((item.fg_ea050 === '1') || (item.fg_ea050 === '2')) {
                aproData12.push(item);
            }
        });
        aproData12 = Ext.Array.sort(aproData12, function(left, right) {
            return (left.sq_apro < right.sq_apro) ? -1 : ((left.sq_apro > right.sq_apro) ? 1 : 0);
        });
        for (var i=0; i<aproData12.length; i++) {
            var item = aproData12[i];
            var next = aproData12[i + 1];
            if ((item.fg_ea050 === '1' || item.fg_ea050 === '2') && (item.cd_e_apro === me.commonFn.getUserInfo().cd_e)) {
                isCancelable = (Ext.isEmpty(next) || (next.fg_ea002 === '000'));
                break;
            }
        }
        return isCancelable;
    },

    getMyAproData: function(aproData, fg050) {
        var me = this;
        var myAproData = null;
        var aproData1239 = [];
        Ext.Array.each(aproData, function(item) {
            if (item.fg_ea050 === fg050) {
                aproData1239.push(item);
            }
        });
        aproData1239 = Ext.Array.sort(aproData1239, function(left, right) {
            return (left.sq_apro < right.sq_apro) ? -1 : ((left.sq_apro > right.sq_apro) ? 1 : 0);
        });
        for (var i=0; i<aproData1239.length; i++) {
            var item = aproData1239[i];
            var next = aproData1239[i + 1];
            if ((item.fg_ea050 === fg050) && (item.cd_e_apro === me.commonFn.getUserInfo().cd_e)) {
                myAproData = item;
                myAproData.isLast = ((fg050 === '1')  && Ext.isEmpty(next));
                break;
            }
        }
        return myAproData;
    },

    saveUpdateAproData: function(sendDataJson, callback) {
        var me = this;
        Ext.Ajax.request({
            url: '/ServerPage/gw/ea/ea_apro_status_update.jsp',
            params: {
                sendData: Ext.encode([sendDataJson])
            },
            success: function (res) {
                var obj = Ext.JSON.decode(res.responseText);
                if (obj.success) {
                    if (callback) callback(sendDataJson);
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