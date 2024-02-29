/**
 * Created by Andrew on 2021-10-11.
 */
Ext.define('Terp.view.gw.ea.common.eadraftwin.EaDraftWinController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.eadraftwin',

    requires: [
        'Ext.menu.Menu',
        'Terp.view.gw.ea.common.eaalnwin.EaAlnWin',
        'Terp.view.gw.ea.common.eadraftwin.eadocformwin.EaDocFormWin',
        'Terp.view.gw.ea.common.eadraftwin.eatempdocwin.EaTempDocWin'
    ],

    control: {
        'eadraftwin': {
            boxready: 'onBoxReady_eadraftwin'
        },
        'button[reference^=eadraftwin_toolbtn_]': {
            boxready: 'onBoxReady_eadraftwin_toolbtn',
            click: 'onClick_eadraftwin_toolbtn'
        },
        'eadraftform[reference=eadraftwin_draft_form]': {
            boxready: 'onBoxReady_eadraftwin'
        }
    },

    init: function() {
        var me = this;
        me.view = me.getView();
        me.popupParams = me.view.popupParams || {};
        me.commonFn = Terp.app.getController('TerpCommon');

        me.toolbar = me.lookupReference('eadraftwin-toolbar');
        me.toolbtns = {};

        me.draft_form = me.lookupReference('eadraftwin_draft_form');
    },

    onBoxReady_eadraftwin: function(w) {
        var me = this;

        if (!Ext.isEmpty(me.popupParams.windowTitle)) {
            me.view.setTitle(me.popupParams.windowTitle);
        }

        me.toolbtns.Request.show();
        me.toolbtns.SetAln.show();

        if (me.popupParams.showMode.toUpperCase() === 'ERP') {
            // if (me.popupParams.reWriteMode) {
            //     me.toolbtns.Rewrite.show();
            // }
            // else {
            //     me.toolbtns.Request.show();
            // }
        }
        else {
            me.toolbtns.OpenTemp.show();
            me.toolbtns.SaveTemp.show();
        }
    },

    onBoxReady_eadraftwin_toolbtn: function(b) {
        var me = this;
        var btnId = b.getReference().replace('eadraftwin_toolbtn_','');
        if (!Object.keys(me.toolbtns).includes(btnId)) {
            me.toolbtns[btnId] = b;
        }
        b.hide();

        if (btnId === 'OpenTemp') {
            b.setMenu(new Ext.menu.Menu({
                items: [
                    { text: '임시보관문서', handler: function () { me.onMenuItemClick_OpenTemp('temp'); } },
                    { text: '결재완료문서', handler: function () { me.onMenuItemClick_OpenTemp('finish'); } },
                    { text: '기안양식', handler: function () { me.onMenuItemClick_OpenTemp('form'); } }
                ]
            }));
            b.show();
        }
    },

    onClick_eadraftwin_toolbtn: function(b) {
        var me = this;
        var btnId = b.getReference().replace('eadraftwin_toolbtn_','');
        if (!Ext.isEmpty(me['onToolBtnClick_'+btnId])) me['onToolBtnClick_'+btnId](b);
    },

    onMenuItemClick_OpenTemp: function(fg) {
        var me = this;
        if (fg.toLowerCase() === 'temp') {
            var eaTempDocWin = Ext.create('Terp.view.gw.ea.common.eadraftwin.eatempdocwin.EaTempDocWin', {
                autoShow: true,
                popupParams: {
                    showMode: 'temp',
                    windowTitle: '임시보관문서 불러오기',
                    openerController: me.draft_form.getController(),
                    callback: function(record) {
                        me.toolbtns.OpenTemp.hide();
                        me.draft_form.getController().setTempDocData(record);
                    }
                }
            });
        }
        else if (fg.toLowerCase() === 'finish') {
            var eaFinishDocWin = Ext.create('Terp.view.gw.ea.common.eadraftwin.eatempdocwin.EaTempDocWin', {
                autoShow: true,
                popupParams: {
                    showMode: 'finish',
                    windowTitle: '결재완료문서 불러오기',
                    openerController: me.draft_form.getController(),
                    callback: function(record) {
                        me.toolbtns.OpenTemp.hide();
                        me.draft_form.getController().setFinishDocData(record);
                    }
                }
            });
        }
        else if (fg.toLowerCase() === 'form') {
            var eaDocFormWin = Ext.create('Terp.view.gw.ea.common.eadraftwin.eadocformwin.EaDocFormWin', {
                autoShow: true,
                popupParams: {
                    showMode: 'form',
                    windowTitle: '기안양식 불러오기',
                    openerController: me.draft_form.getController(),
                    callback: function(record) {
                        me.toolbtns.OpenTemp.hide();
                        me.draft_form.getController().setDocFormData(record);
                    }
                }
            });
        }
    },

    onToolBtnClick_OpenTemp: function(b) {
        var me = this;
    },

    onToolBtnClick_Modify: function(b) {
        var me = this;

        /*
        me.draft_form.getForm().getFields().each(function(fld) {
            fld.setReadOnly((fld.getName() === 'cd_doc'));
            if (fld.getName() === 'dc_cont_html') {
                fld.el.query('.mce-toolbar-grp')[0].style.display = 'block';
                console.log(fld.el.query('.mce-edit-area')[0]);
                console.log(fld.el.query('.mce-toolbar-grp')[0].offsetHeight);
                console.log(fld.el.query('.mce-edit-area')[0].offsetHeight);
                fld.el.query('.mce-edit-area')[0].offsetHeight = fld.el.query('.mce-edit-area')[0].offsetHeight - fld.el.query('.mce-toolbar-grp')[0].offsetHeight;
            }
            me.view.down('#EaDraftForm_AttachFile_Grid').hideTools(false);
        });
        */
    },

    onToolBtnClick_Delete: function(b) {
        var me = this;
    },

    onToolBtnClick_Rewrite: function(b) {
        var me = this;
    },

    onToolBtnClick_SetAln: function(b) {
        var me = this;
        var eaAlnWin = Ext.create('Terp.view.gw.ea.common.eaalnwin.EaAlnWin', {
            openerController: me.draft_form.getController(),
            autoShow: true,
            mode : me.view.showMode
        });
    },

    onToolBtnClick_SaveTemp: function(b) {
        var me = this;
        me.draft_form.getController().saveTempDoc();
    },

    onToolBtnClick_Request: function(b) {
        var me = this;
        me.draft_form.getController().requestApro();
    },

    onToolBtnClick_RequestCancel: function(b) {
        var me = this;
    },

    onToolBtnClick_Apro120: function(b) {
        var me = this;
    },

    onToolBtnClick_Apro120Cancel: function(b) {
        var me = this;
    },

    onToolBtnClick_Apro121: function(b) {
        var me = this;
    },

    onToolBtnClick_Apro121Cancel: function(b) {
        var me = this;
    },

    onToolBtnClick_Apro122: function(b) {
        var me = this;
    },

    onToolBtnClick_Apro122Cancel: function(b) {
        var me = this;
    },

    onToolBtnClick_Apro123: function(b) {
        var me = this;
    },

    onToolBtnClick_Apro123Cancel: function(b) {
        var me = this;
    },

    onToolBtnClick_Apro130: function(b) {
        var me = this;
    },

    onToolBtnClick_Apro130Cancel: function(b) {
        var me = this;
    },

    onToolBtnClick_Apro140: function(b) {
        var me = this;
    },

    onToolBtnClick_Apro140Cancel: function(b) {
        var me = this;
    },

    onToolBtnClick_Apro220: function(b) {
        var me = this;
    },

    onToolBtnClick_Apro220Cancel: function(b) {
        var me = this;
    },

    onToolBtnClick_Apro230: function(b) {
        var me = this;
    },

    onToolBtnClick_Apro230Cancel: function(b) {
        var me = this;
    },

    onToolBtnClick_Apro240: function(b) {
    	var me = this;
    },

    onToolBtnClick_Apro240Cancel: function(b) {
    	var me = this;
    },

    onToolBtnClick_Preview: function(b) {
        var me = this;
        var eaDocs = {
            docData: {},
            aproData: [],
            attachData: [],
            docAttachData: [],
            erpAttachData: [],
            refData: [],
            erpData: {}
        };
        me.commonFn.openEaPreviewWin(eaDocs, function(data) {
            console.log(data);
        });
    },

    onToolBtnClick_Print: function(b) {
        var me = this;
    },

    onGridInsert_eadraftform_cc_grid: function(selection, rowIdx) {
        var me = this;
        me.draft_form.getController().onGridInsert_eadraftform_cc_grid(selection, rowIdx);
    },

    onGridDelete_eadraftform_cc_grid: function(selection, rowIdx) {
        var me = this;
        me.draft_form.getController().onGridDelete_eadraftform_cc_grid(selection, rowIdx);
    },

    onGridInsert_eadraftform_rcv_grid: function(selection, rowIdx) {
        var me = this;
        me.draft_form.getController().onGridInsert_eadraftform_rcv_grid(selection, rowIdx);
    },

    onGridDelete_eadraftform_rcv_grid: function(selection, rowIdx) {
        var me = this;
        me.draft_form.getController().onGridDelete_eadraftform_rcv_grid(selection, rowIdx);
    }

});