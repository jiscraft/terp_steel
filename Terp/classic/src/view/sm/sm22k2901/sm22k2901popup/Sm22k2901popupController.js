/**
 * Created by jiscraft on 2022-11-30.
 */
Ext.define('Terp.view.sm.sm22k2901.sm22k2901popup.Sm22k2901popupController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.sm22k2901popup',

    control: {

        'tsoftgrid[reference=sm22k2901popup_grid1]': {
            boxready: 'onBoxReady_sm22k2901popup_grid1'
        }
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
        me.sm22k2901popup_headbutton = me.lookupReference('sm22k2901popup_headbutton');
        me.sm22k2901popup_form1 = me.lookupReference('sm22k2901popup_form1');
        me.sm22k2901popup_grid1 = me.lookupReference('sm22k2901popup_grid1');
        me.sm22k2901popup_grid1_store = me.getViewModel().getStore('sm22k2901popup_grid1_store');
        me.popupParam = me.getView().popupParams ;

    },

    onBoxReady_sm22k2901popup_grid1 : function(){
        var me = this;
        me.onSelect()
    },

    onSelect : function() {
        var me = this;
        if (me.popupParam.fg_window == 'edit') {
            me.getViewModel().set('formData', me.popupParam.record.data);
            me.onSelect_sm22k2901popup_grid1();
            me.onEditControlMode('init');

        } else {
            me.sm22k2901popup_form1.clearForm();
            me.onEditControlMode('insert');
        }
    },

    onSelect_sm22k2901popup_grid1 : function(){
        var me = this;
        if (me.getViewModel().data.formData.cd_p == ''){
            me.commonFn.toastMessage('시공사코드가 없습니다','t')
        }

        var jsonData = {
            'actiondata': 'm',
            'loginIduser': me.commonFn.getUserInfo('id_user'),
            'loginCdc': me.commonFn.getUserInfo('cd_c'),
            'cd_p':  me.getViewModel().data.formData.cd_p

        };
        var sendDataJson = [];
        sendDataJson.push(jsonData);
        var sendDataJsonEncode = Ext.encode(sendDataJson);

        me.sm22k2901popup_grid1_store.load({
            params :{
                sendData : sendDataJsonEncode
            },
            callback : function(records, operation , success){
                var me = this;
                if (success == true) {
                    Ext.getBody().unmask();
                    if ( records.length > 0 ){
                        me.sm22k2901popup_grid1.getSelectionModel().select(0);
                    }
                } else {
                    Ext.getBody().unmask();
                    var errorMsg = this.getViewModel().getStore('sm22k2901popup_grid1_store').getProxy().getReader().rawData.msg;
                    me.commonFn.errorHandling(errorMsg);
                }
            },
            scope : me
        });
    },

    onModify : function(){
        var me = this;
        me.onEditControlMode('edit');
    },

    onDelete : function(){
        var me = this;
        Ext.MessageBox.confirm('확인', '시공사 정보를 삭제하시겠습니까?<br><br><span style=color:#cc4c3d;>삭제되는 시공사의 담당자 정보도 같이 삭제됩니다.</span>', function (btn) {
            if (btn == 'yes') {
                var jsonData = {
                    'actiondata': 'd',
                    'loginIduser': me.commonFn.getUserInfo('id_user'),
                    'loginCdc': me.commonFn.getUserInfo('cd_c'),
                    'cd_p' : me.getViewModel().data.formData.cd_p
                };

                var sendDataJson = [];
                sendDataJson.push(jsonData);
                var sendDataJsonEncode = Ext.encode(sendDataJson);
                me.commonFn.getTsoftAjaxRequest(sendDataJsonEncode , '../ServerPage/ma/ma_partner_con.jsp' , true , function (ajaxResult) {
                    if ( ajaxResult.success ){
                        me.commonFn.toastMessage('시공사 정보 삭제 성공','t');
                        //삭제되었으니 첫번째행으로 스크롤 시키기 위해 처리
                        me.getView().popupParamView.config.windowReturnData = '';
                        me.view.close();
                    }
                });
            } else {

            }
        });
    },

    onSave : function(){
        var me = this;
        // console.log(me.getViewModel().data.formData);
        if (me.getViewModel().data.formData.cd_p ==''){
            me.commonFn.toastMessage('시공사코드를 입력하세요','w');
            return;
        }

        if (me.getViewModel().data.formData.nm_p ==''){
            me.commonFn.toastMessage('시공사명을 입력하세요','w');
            return;
        }

        if (me.popupParam.fg_window == 'new'){
            var models = me.popupParam.constore.getRange();
            if ( me.popupParam.constore.find('cd_p', me.getViewModel().data.formData.cd_p) >= 0){
                me.commonFn.toastMessage('이미 등록되어 사용 할 수 없는 코드입니다<br> 다시 확인후 진행하세요','w');
                return;
            }

            if ( me.popupParam.constore.find('nm_p', me.getViewModel().data.formData.nm_p) >= 0){
                me.commonFn.toastMessage('이미 등록되어 사용 할 수 없는 시공사명입니다.<br> 다시 확인후 진행하세요','w');
                return;
            }
        }

        var sendDataJson = [];

        me.getViewModel().data.formData.yn_bldg = ((me.getViewModel().data.formData.yn_bldg === true) || (me.getViewModel().data.formData.yn_bldg === 'Y')) ? 'Y' : 'N';
        me.getViewModel().data.formData.yn_plant = ((me.getViewModel().data.formData.yn_plant === true) || (me.getViewModel().data.formData.yn_plant === 'Y')) ? 'Y' : 'N';
        me.getViewModel().data.formData.yn_env = ((me.getViewModel().data.formData.yn_env === true) || (me.getViewModel().data.formData.yn_env === 'Y')) ? 'Y' : 'N';
        me.getViewModel().data.formData.yn_etc = ((me.getViewModel().data.formData.yn_etc === true) || (me.getViewModel().data.formData.yn_etc === 'Y')) ? 'Y' : 'N';

        me.getViewModel().data.formData.actiondata = 'sall';
        me.getViewModel().data.formData.actionDetailData = 'hData';
        me.getViewModel().data.formData.loginIduser = me.commonFn.getUserInfo().id_user;
        me.getViewModel().data.formData.loginCdc = me.commonFn.getUserInfo().cd_c;

        sendDataJson.push(me.getViewModel().data.formData);

        me.sm22k2901popup_grid1.getPlugin('cellplugin').completeEdit();
        var gridData = me.sm22k2901popup_grid1_store.getModifiedRecords();  //getAllData() , getInsertedData() , getRemovedData()
        for (var i = 0; i < gridData.length; i++) {
            gridData[i].data.actiondata = 'sall';
            gridData[i].data.actionDetailData = 'lData';
            gridData[i].data.loginIduser = me.commonFn.getUserInfo().id_user;
            gridData[i].data.loginCdc = me.commonFn.getUserInfo().cd_c;
            sendDataJson.push(
                gridData[i].data
            );
        }

        var sendDataJsonEncode = Ext.encode(sendDataJson);
        me.commonFn.getTsoftAjaxRequest(sendDataJsonEncode , '../ServerPage/ma/ma_partner_con.jsp' , true , function (ajaxResult) {
            if ( ajaxResult.success ){
                me.commonFn.toastMessage('시공사 정보 저장 성공','t');
                me.getView().popupParamView.config.windowReturnData = me.getViewModel().data.formData.cd_p;
                me.view.close();
            }
        });
    },


    onGridInsert_sm22k2901popup_grid1 : function(gridSelection , gridRowindex){
        var me = this;
        var insertData ={
            cd_c: me.commonFn.getUserInfo().cd_c,
            cd_p: me.getViewModel().data.formData.cd_p ,
            dc_dept: '' ,
            dc_jc : '' ,
            dc_charge :'',
            dc_tel :'',
            dc_hp :'',
            dc_remark : '',
            id_row : me.commonFn.sqlRowId()
        };

        me.sm22k2901popup_grid1.getPlugin('cellplugin').completeEdit();

        me.sm22k2901popup_grid1_store.insert(0, insertData);
        me.sm22k2901popup_grid1.getSelectionModel().select(0);
        me.sm22k2901popup_grid1.getPlugin('cellplugin').startEditByPosition({
            row: 0,
            column: 0
        });
    },

    onGridDelete_sm22k2901popup_grid1 : function(){
        var me = this;

        var gridSelection = me.sm22k2901popup_grid1.getSelectionModel().getLastSelected();
        var jsonData = {
            'actiondata': 'd',
            'loginIduser': me.commonFn.getUserInfo('id_user'),
            'loginCdc': me.commonFn.getUserInfo('cd_c'),
            'cd_p' : gridSelection.data.cd_p ,
            'id_row' : gridSelection.data.id_row
        };

        var sendDataJson = [];
        sendDataJson.push(jsonData);
        var sendDataJsonEncode = Ext.encode(sendDataJson);
        me.commonFn.getTsoftAjaxRequest(sendDataJsonEncode , '../ServerPage/ma/ma_partner_con_dept.jsp' , true , function (ajaxResult) {
            if ( ajaxResult.success ){
                me.commonFn.toastMessage('시공사 담당자 정보 삭제 성공','t');
                me.onSelect_sm22k2901popup_grid1();
            }
        });
    },
    
    
    
    onEditControlMode : function(value){
        var me = this;
        if (value == 'init'){
            me.sm22k2901popup_form1.setReadOnly(true);
            me.sm22k2901popup_grid1.setReadOnly(true);
            me.sm22k2901popup_headbutton.setActiveButton({modify :'Y' ,insert :'N' ,  delete:'N', save :'N' , print :'N' , select :'N'});
            me.sm22k2901popup_grid1.setActiveButton({insert :'N' , modify :'N' , delete:'N', save :'N', copy :'N' , import :'N' , export :'Y'});
        }

        if (value == 'edit'){
            me.sm22k2901popup_form1.setReadOnly(false);
            me.sm22k2901popup_grid1.setReadOnly(false);
            me.sm22k2901popup_headbutton.setActiveButton({modify :'N' ,insert :'N' ,  delete:'Y', save :'Y' , print :'N' , select :'N'});
            me.sm22k2901popup_grid1.setActiveButton({insert :'Y' , modify :'N' , delete:'Y', save :'N', copy :'N' , import :'N' , export :'Y'});

            me.sm22k2901popup_form1.down('[name=cd_p]').setReadOnly(true);
        }

        if (value == 'insert'){
            me.sm22k2901popup_form1.setReadOnly(false);
            me.sm22k2901popup_grid1.setReadOnly(false);
            me.sm22k2901popup_headbutton.setActiveButton({modify :'N' ,insert :'N' ,  delete:'N', save :'Y' , print :'N' , select :'N'});
            me.sm22k2901popup_grid1.setActiveButton({insert :'Y' , modify :'N' , delete:'Y', save :'N', copy :'N' , import :'N' , export :'Y'});
        }
    }
});