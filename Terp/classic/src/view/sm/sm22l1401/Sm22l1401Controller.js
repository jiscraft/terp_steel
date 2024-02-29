/**
 * Created by jiscraft on 2022-12-14.
 */
Ext.define('Terp.view.sm.sm22l1401.Sm22l1401Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.sm22l1401',

    control: {
        'tsoftheadbuttons[reference=sm22l1401_headbutton]': {
            panelinit: 'onSm22l1401_headbutton_PanelInit'
        },
        'tsoftform[reference=sm22l1401_searchform]': {
            boxready: 'onSm22l1401_searchform_BoxReady'
        },
        'tsoftgrid[reference=sm22l1401_grid1]': {
            boxready: 'onSm22l1401_grid1_BoxReady',
            beforeselect: 'onSm22l1401_grid1_BeforeSelect',
            selectionchange: 'onSm22l1401_grid1_SelectionChange',
            lastenterkeydown: 'onSm22l1401_grid1_LastEnterKeyDown'
        }
    },

    init: function() {
        var me = this;
        me.view = me.getView();
        me.view.dirty = false;
        me.commonFn = Terp.app.getController('TerpCommon');

        me.sm22l1401_headbutton = me.lookupReference('sm22l1401_headbutton');
        me.sm22l1401_searchform= me.lookupReference('sm22l1401_searchform');

        me.sm22l1401_grid1 = me.lookupReference('sm22l1401_grid1');
        me.sm22l1401_grid1_store = me.getViewModel().getStore('sm22l1401_grid1_store');
    },

    onSm22l1401_headbutton_PanelInit: function(panel) {
        var me = this;
        if (me.sm22l1401_headbutton.down('[name=savebutton]')) {
            me.sm22l1401_headbutton.down('[name=savebutton]').setDisabled(false);
        }

        me.onSelect();
    },

    onSm22l1401_searchform_BoxReady: function(form) {
        var me = this;
    },

    onSm22l1401_grid1_BoxReady: function(grid) {
        var me = this;
        me.sm22l1401_grid1.setReadOnly(true);
        me.sm22l1401_grid1_store.on({
            datachanged: function(store) {
                me.view.dirty = true;
            },
            update: function(store, record, operation, modifiedFieldNames, details) {
                me.view.dirty = true;
            }
        });
        me.sm22l1401_grid1.getPlugin('cellplugin').on({
            validateedit: function(editor, context) {
            },
            edit: function(editor, context) {
                if (context.originalValue !== context.value) {
                }
            },
            canceledit: function(editor, context) {
            }
        });
    },

    onSm22l1401_grid1_BeforeSelect: function(rowModel, record, index, eOpts) {
        var me = this;
    },

    onSm22l1401_grid1_SelectionChange: function(selModel, selected) {
        var me = this;
    },

    onSm22l1401_grid1_LastEnterKeyDown: function(grid, record, context, latestEditedFieldName, editableColumnNames) {
        var me = this;
        if (context.isLastRenderedRow()) {
        }
        else {
            grid.getSelectionModel().select(context.rowIdx + 1);
        }
        Ext.defer(function() {
            grid.startEdit(grid.getSelectionModel().getLastSelected(), editableColumnNames[0]);
        },100);
    },

    onSelect: function() {
        var me = this;
        me.loadData();
    },

    loadData: function() {
        var me = this;
        var searchValues = me.sm22l1401_searchform.getValues();

        me.sm22l1401_grid1.setReadOnly(true);
        me.sm22l1401_grid1_store.clearFilter();
        me.sm22l1401_grid1_store.removeAll();
        me.sm22l1401_grid1_store.commitChanges();

        var sendDataJson = {
            loginIduser: me.commonFn.getUserInfo().id_user,
            loginCdc: me.commonFn.getUserInfo().cd_c,
            cd_p: searchValues.cd_p,
            cd_site_sale: searchValues.cd_site_sale,
            dt_sale_act_fr: searchValues.dt_fr.replaceAll('-', ''),
            dt_sale_act_to: searchValues.dt_to.replaceAll('-', ''),
            id_user_insert: searchValues.id_user_insert,
            actiondata: 'select'
        };
        me.sm22l1401_grid1_store.load({
            params: {
                sendData: Ext.encode([sendDataJson])
            },
            callback: function(records, operation , success) {
                me.view.dirty = false;
                if (success == true) {
                    if (records.length > 0) {
                    }
                    me.onEditControlMode('select');
                }
                else {
                    var errorMsg = me.sm22l1401_grid1_store.getProxy().getReader().rawData.msg;
                    me.commonFn.errorHandling(errorMsg);
                }
            },
            scope: me
        });
    },

    onInsert : function() {
        var me = this;
        var searchValues = me.sm22l1401_searchform.getValues();
        var newRecord = me.sm22l1401_grid1_store.add({
            loginIduser: me.commonFn.getUserInfo().id_user,
            loginCdc: me.commonFn.getUserInfo().cd_c,
            cd_site_sale: (!Ext.isEmpty(searchValues.cd_site_sale)) ? searchValues.cd_site_sale : '',
            cd_sale_act: me.commonFn.sqlNodocu('SA'),
            dt_sale_act: Ext.Date.format(new Date(), 'Ymd'),
            dc_jc: '',
            dc_charge: '',
            dc_tel: '',
            dc_remark: ''
        });
        me.sm22l1401_grid1.setReadOnly(false);

        var lastSel = me.sm22l1401_grid1.getSelectionModel().getLastSelected();
        var newRowIdx = me.sm22l1401_grid1_store.getCount() + 1;
        // if (Ext.isEmpty(lastSel)) {
        //     me.sm22l1401_grid1_store.add(0);
        // }
        // else {
        //     newRowIdx = me.sm22l1401_grid1_store.indexOf(lastSel) + 1;
        me.sm22l1401_grid1_store.insert(0, newRecord);
        // }
        me.sm22l1401_grid1.getSelectionModel().select(0);
        me.sm22l1401_grid1.getPlugin('cellplugin').startEditByPosition({
            row: 0,
            column: 0
        });
    },

    onModify : function() {
        var me = this;
        me.onEditControlMode('modify');
    },

    onDelete : function() {
        var me = this;

        Ext.MessageBox.confirm('확인', '<span style="color:#ff1f2e">선택 영업활동 정보를 삭제 하시겠습니까?', function (btn) {
            if (btn == 'yes') {
                var jsonData = {
                    'actiondata': 'd',
                    'loginIduser': me.commonFn.getUserInfo('id_user'),
                    'loginCdc': me.commonFn.getUserInfo('cd_c'),
                    'cd_sale_act':  me.sm22l1401_grid1.getSelectionModel().getLastSelected().data.cd_sale_act
                };

                var sendDataJson = [];
                sendDataJson.push(jsonData);
                var sendDataJsonEncode = Ext.encode(sendDataJson);
                me.commonFn.getTsoftAjaxRequest(sendDataJsonEncode , '../ServerPage/sm/sm_sale_act.jsp' , true , function (ajaxResult) {
                    if ( ajaxResult.success ){
                        me.commonFn.toastMessage('영업활동 정보 삭제성공','t');
                        me.onSelect();
                    }
                });
            } else {

            }
        });

    },

    onSave : function() {
        var me = this;
        var cntDirty = me.sm22l1401_grid1_store.getModifiedRecords().length + me.sm22l1401_grid1_store.getRemovedRecords().length;
        if (cntDirty === 0) {
            me.commonFn.toastMessage('저장할 데이터가 하나도 없습니다!', 'b');
            me.view.dirty = false;
        }
        else {
            var isValid = true;
            for (var i=0; i<me.sm22l1401_grid1_store.getCount(); i++) {
                var record = me.sm22l1401_grid1_store.getAt(i);
                if (Ext.isEmpty(record.get('dt_sale_act'))) {
                    isValid = false;
                    me.commonFn.msgBox.alert('오류', '활동일자를 선택하세요!', function() {
                        me.sm22l1401_grid1.getSelectionModel().select(i);
                    });
                    break;
                }
                else if (Ext.isEmpty(record.get('cd_site_sale'))) {
                    isValid = false;
                    me.commonFn.msgBox.alert('오류', '소속현장을 선택하세요!', function() {
                        me.sm22l1401_grid1.getSelectionModel().select(i);
                    });
                    break;
                }
            }

            if (isValid) {
                me.saveData();
            }
        }
    },

    saveData: function(action) {
        var me = this;
        var sendDataJson = [];

        Ext.Array.each(me.sm22l1401_grid1_store.getModifiedRecords(), function(record) {
            var data = record.getData();
            data.loginIduser = me.commonFn.getUserInfo().id_user;
            data.loginCdc = me.commonFn.getUserInfo().cd_c;
            data.actiondata = 's';
            sendDataJson.push(data);

        });
        Ext.Array.each(me.sm22l1401_grid1_store.getRemovedRecords(), function(record) {
            var data = record.getData();
            data.loginIduser = me.commonFn.getUserInfo().id_user;
            data.loginCdc = me.commonFn.getUserInfo().cd_c;
            data.actiondata = 'delete';
            sendDataJson.push(data);
        });

        Ext.Ajax.request({
            url: '/ServerPage/sm/sm_sale_act.jsp',
            params: {
                sendData: Ext.encode(sendDataJson)
            },
            success: function (res) {
                var obj = Ext.JSON.decode(res.responseText);
                if (obj.success) {
                    me.commonFn.toastMessage('저장하였습니다.', 't');
                    me.view.dirty = false;
                    me.onSelect();
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

    onDcFilter_SpecialKey_Enter : function (fld) {
        var me = this;
        var searchValuesFilter =   me.sm22l1401_searchform.down('[name=dc_filter]').getValue().toUpperCase();
        me.sm22l1401_grid1_store.clearFilter();



        me.sm22l1401_grid1_store.filterBy(function(rec) {
            return (Ext.isEmpty(searchValuesFilter) ? true : ((rec.get('nm_site_sale').indexOf(searchValuesFilter) != -1) || (rec.get('cd_site_sale').indexOf(searchValuesFilter) != -1)  || (rec.get('nm_p').indexOf(searchValuesFilter) != -1)  || (rec.get('dc_charge').indexOf(searchValuesFilter) != -1) ));
        });
        me.sm22l1401_searchform.down('[name=dc_filter]').setValue('');
        me.sm22l1401_grid1.getSelectionModel().select(0);
    },
    
    onEditControlMode : function(value){
        var me = this;
        if (value == 'select'){
            me.sm22l1401_grid1.setReadOnly(true);
            me.sm22l1401_headbutton.setActiveButton({modify :'Y' ,insert :'N' ,  delete:'N', save :'N' , print :'N' , select :'Y'});
            me.sm22l1401_grid1.setActiveButton({insert :'N' , modify :'N' , delete:'N', save :'N', copy :'N' , import :'N' , export :'Y'});
        }
        if (value == 'modify') {
            me.sm22l1401_grid1.setReadOnly(false);
            me.sm22l1401_headbutton.setActiveButton({modify :'N' , insert :'Y' ,  delete:'Y', save :'Y' , print :'N' , select :'Y'});
            me.sm22l1401_grid1.setActiveButton({insert :'N' , modify :'N' , delete:'N', save :'N', copy :'N' , import :'N' , export :'Y'});
        }
        if (value == 'insert') {
            me.sm22l1401_grid1.setReadOnly(false);
            me.sm22l1401_headbutton.setActiveButton({modify :'N' , insert :'N' ,  delete:'N', save :'Y' , print :'N' , select :'Y'});
            me.sm22l1401_grid1.setActiveButton({insert :'N' , modify :'N' , delete:'N', save :'N', copy :'N' , import :'N' , export :'Y'});
        }
    },

    onButtonClik_sm22l0201_fuctionform_pdf : function () {

        var sendDataJson = {
            'actiondata': 'pdf'
        };

        var sendDataJsonEncode = Ext.encode(sendDataJson);

        Ext.Ajax.request({
            async: false,
            url: '/ServerPage/sm/sm_sale_pdf.jsp',
            params: {
                sendData: sendDataJsonEncode
            },
            success: function (res) {
                // var obj = Ext.JSON.decode(res.responseText);
                // // console.log(obj);
                // if (obj.success) {
                //     // Ext.getBody().unmask();
                //     var dnFileInfo = obj.data[0];
                //     dnFileInfo.path = dnFileInfo.path.split('C:\\TERP\\Files\\erpfiles\\').join('/erpfiles/').split('\\').join('/');
                //     window.pdfViewer(dnFileInfo.path+'/'+dnFileInfo.pdf);
                // }
                // else {
                //     // Ext.getBody().unmask();
                //     Terp.app.getController('TerpCommon').msgBox.alert('오류', obj.msg);
                // }
            },
            fail: function () {
                // Ext.getBody().unmask();
                // Terp.app.getController('TerpCommon').msgBox.alert('오류', '데이타처리중 오류가 발생했습니다');
            }/*,
            callback:'printCallback'*/
        });

    }

});