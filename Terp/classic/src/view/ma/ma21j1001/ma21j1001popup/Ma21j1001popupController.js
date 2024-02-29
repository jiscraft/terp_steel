/**
 * Created by jiscr on 2021-10-11.
 */
Ext.define('Terp.view.ma.ma21j1001.ma21j1001popup.Ma21j1001popupController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ma21j1001popup',

    control: {
        'tsoftform[reference=ma21j1001popup_form1]': {
            boxready: 'onBoxReady_ma21j1001popup_form1'
        },
        'tsoftgrid[reference=ma21j1001popup_grid1]': {
            boxready: 'onBoxReady_ma21j1001popup_grid1'
        }

    },

    init: function() {
        var me = this;
        me.commonFn = Terp.app.getController('TerpCommon');
        me.ma21j1001popup_headform = me.lookupReference('ma21j1001popup_headform');

        me.ma21j1001popup_form1 = me.lookupReference('ma21j1001popup_form1');
        me.ma21j1001popup_form2 = me.lookupReference('ma21j1001popup_form2');
        me.ma21j1001popup_form_store = me.getViewModel().getStore('ma21j1001popup_form_store') ;

        me.ma21j1001popup_grid1 = me.lookupReference('ma21j1001popup_grid1');
        me.ma21j1001popup_grid1_store =  me.getViewModel().getStore('ma21j1001popup_grid1_store') ;


        me.ma21j1001popup_functionform = me.lookupReference('ma21j1001popup_functionform');
        me.btnAttachFiles = me.lookupReference('ma21j1001popup_functionform_btnAttachFiles');

        me.popupParam = me.getView().popupParams;
        me.onInitValue(me.popupParam);


    },

    onInitValue : function(popupParam){
        var me = this;

        //폼에 공통콤보코드 스터어를 바인딩
        me.commonFn.setCommonCode(me.lookupReference('ma21j1001popup_fg_sy010') ,'SY010');
        // me.commonFn.setCommonBusiness(this.lookupReference('wk21f0501mainform_cd_b'));


        if ( popupParam.fg_window =='new' ){

            var insertData ={
                cd_c: me.commonFn.getUserInfo().cd_c,
                cd_e : '',
                nm_e: '',
                no_e:'',
                dt_birth:'',
                fg_sex:'',
                fg_sy010:'KO',
                nm_sy010:'대한민국',
                nm_e_eng:'',
                dc_tel:'',
                dc_hp:'',
                dc_companymail:'',
                dc_personalmail:'',
                dc_addr:'',
                dc_remark:'',
                id_row : me.popupParam.id_row

            };

            me.ma21j1001popup_form_store.insert(0, insertData);

            //뷰모델에 폼에 값을 바인딩 해주기 위해 set
            me.getViewModel().set('formData',me.ma21j1001popup_form_store.data.items[0].data );
            //폼헬프윈도우들에 값을 셋팅하고 이름으로 디스플레이해주기 위해 값셋팅후 호출필요
            me.ma21j1001popup_form1.blurForm();
            //폼에 헬프필드들은 반드시 처리해주어야 함 ( store bind로 처리할시 안해주어도 됨 )
            // me.commonFn.setDataBindHelpBox(me.ma21j1001popup_form1, 'cd_e', me.ma21j1001popup_form1_store.data.items[0].data.cd_e , me.ma21j1001popup_form1_store.data.items[0].data.nm_e);
            // me.commonFn.setDataBindHelpBox(me.ma21j1001popup_form1, 'cd_o', me.ma21j1001popup_form1_store.data.items[0].data.cd_o , me.ma21j1001popup_form1_store.data.items[0].data.nm_o);

            setTimeout(function() {
                me.onEditControlMode(true);
            }, 100);
        }else{
            me.onSelect();
        }


    },

    onBoxReady_ma21j1001popup_form1: function(f) {
        var me = this;
        me.setAttachFileButtons()
    },

    onBoxReady_ma21j1001popup_grid1 : function() {
        var me = this;
    },

    onSelect : function(){
        var me = this;

        var jsonData = {
            'actiondata': 'r',
            'loginIduser': me.commonFn.getUserInfo('id_user'),
            'loginCdc': me.commonFn.getUserInfo('cd_c'),
            'cd_e' : me.popupParam.cd_e
        };

        var sendDataJson = [];
        sendDataJson.push(jsonData);
        var sendDataJsonEncode = Ext.encode(sendDataJson);

        me.ma21j1001popup_form_store.load({
            params :{
                sendData : sendDataJsonEncode
            },
            callback : me.onSelectCallback,
            scope : me
        });
    },

    onSelectCallback : function(records, operation , success){
        var me = this;
        if (success == true) {
            me.getViewModel().set('formData',me.ma21j1001popup_form_store.data.items[0].data );
            me.ma21j1001popup_form1.blurForm();
            me.onEditControlMode(false);

            var jsonData = {
                'actiondata': 'm',
                'loginIduser': me.commonFn.getUserInfo('id_user'),
                'loginCdc': me.commonFn.getUserInfo('cd_c'),
                'cd_e' :  me.popupParam.cd_e
            };

            var sendDataJson = [];
            sendDataJson.push(jsonData);
            var sendDataJsonEncode = Ext.encode(sendDataJson);


            me.ma21j1001popup_grid1_store.load({
                params :{
                    sendData : sendDataJsonEncode
                },
                callback : me.onSelectCallback_grid,
                scope : me
            });

        }
        else {
            Ext.getBody().unmask();
            var errorMsg = this.getViewModel().getStore('ma21j1001popup_form_store').getProxy().getReader().rawData.msg;
            commonFn.errorHandling(errorMsg);
        }
    },

    onSelectCallback_grid : function(records, operation , success){
        var me = this;
        if (success == true) {

            me.onEditControlMode(false);

        }
        else {
            Ext.getBody().unmask();
            var errorMsg = this.getViewModel().getStore('ma21j1001popup_grid1_store').getProxy().getReader().rawData.msg;
            commonFn.errorHandling(errorMsg);
        }
    },

    onModify : function(){
        var me = this;
        me.onEditControlMode(true);
    },

    onSave : function(){
        var me = this;

        var sendDataJson = [];

        var alldatal = me.ma21j1001popup_grid1_store.getModifiedRecords();
        for (var i = 0; i < alldatal.length; i++) {
            alldatal[i].data.actiondata = 'sall';
            alldatal[i].data.detailactiondata = 'ldata';
            alldatal[i].data.loginIduser = me.commonFn.getUserInfo().id_user;
            alldatal[i].data.loginCdc = me.commonFn.getUserInfo().cd_c;
            sendDataJson.push(
                alldatal[i].data
            );
        }

        var alldatah = me.ma21j1001popup_form_store.getData();
        for (var j = 0; j < alldatah.length; j++) {
            alldatah.items[j].data.actiondata = 'sall';
            alldatah.items[j].data.detailactiondata = 'hdata';
            alldatah.items[j].data.loginIduser = me.commonFn.getUserInfo().id_user;
            alldatah.items[j].data.loginCdc = me.commonFn.getUserInfo().cd_c;
            sendDataJson.push(
                alldatah.items[j].data
            );
        }

        var sendDataJsonEncode = Ext.encode(sendDataJson);

        me.commonFn.getTsoftAjaxRequest(sendDataJsonEncode , '../ServerPage/ma/ma_emp.jsp' , true , function (ajaxResult) {
            // sendDataJsonEncode 보낼데이타 ,  url , async값(순서상관없이 받을시 true) , callback받을펑션
            if ( ajaxResult.success ){   // 결과가 성공일때
                me.commonFn.toastMessage('저장 성공','t');
                me.onSelect();
                me.onEditControlMode(false);
            }
        });
    },

    onDelete : function(){
        var me = this;
        Ext.MessageBox.confirm('확인', '선택한 직원정보를 삭제하시겠습니까? <br><br> 삭제하게되면 직원관련 정보까지 일괄 삭제됩니다.', function (btn) {
            if (btn == 'yes') {
                var jsonData = {
                    'actiondata': 'd',
                    'loginIduser': me.commonFn.getUserInfo('id_user'),
                    'loginCdc': me.commonFn.getUserInfo('cd_c'),
                    'cd_e' : me.ma21j1001popup_form1.down('[name=cd_e]').getValue()
                };

                var sendDataJson = [];
                sendDataJson.push(jsonData);
                var sendDataJsonEncode = Ext.encode(sendDataJson);

                me.commonFn.getTsoftAjaxRequest(sendDataJsonEncode , '../ServerPage/ma/ma_emp.jsp' , true , function (ajaxResult) {
                    if ( ajaxResult.success ){
                        me.commonFn.toastMessage('직원정보 삭제성공','t');
                        me.view.close();
                    }
                });
            }
            else {

            }
        });

    },

    onGridInsert_ma21j1001popup_grid1 : function(selection , rowIdx){
        var me = this;
        var insertData ={
            cd_c: me.commonFn.getUserInfo().cd_c,
            cd_e : me.ma21j1001popup_form1.down('[name=cd_e]').getValue(),
            dt_apply : me.commonFn.getTodayInfo(),
            fg_hr030 :'',
            fg_hr010 :'',
            fg_hr020 :'',
            cd_b :'',
            yn_boss :'N',
            dc_remark :''


        };

        //edit하던 내용을 컴플릿시킴..
        me.ma21j1001popup_grid1.getPlugin('cellplugin').completeEdit();
        me.ma21j1001popup_grid1.getStore('ma21j1001popup_grid1_store').insert(rowIdx, insertData);
        me.ma21j1001popup_grid1.getSelectionModel().select(rowIdx);

        //row selection한뒤 에디트를 시작할 셀로 이동
        me.ma21j1001popup_grid1.getPlugin('cellplugin').startEditByPosition({
            row: rowIdx,
            column: 1  //가고자하는 컬럼번호
        });

    },


    onGridCopy_ma21j1001popup_grid1 : function(selection , rowIdx){
        var me = this;
        var sel = selection;
        Ext.MessageBox.confirm('확인', '선택한행을 복사하시겠습니까?', function (btn) {
            if (btn == 'yes') {
                var selectionData ={
                    cd_c: me.commonFn.getUserInfo().cd_c,
                    dt_apply : me.commonFn.getTodayInfo(),
                    fg_hr030 :selection.data.fg_hr030,
                    fg_hr010 :selection.data.fg_hr010,
                    fg_hr020 :selection.data.fg_hr020,
                    cd_b :selection.data.cd_b,
                    yn_boss :'N',
                    dc_remark :''

                };

                me.ma21j1001popup_grid1.getPlugin('cellplugin').completeEdit();
                me.ma21j1001popup_grid1.getStore('ma21j1001popup_grid1_store').insert(rowIdx, selectionData);
                me.ma21j1001popup_grid1.getSelectionModel().select(rowIdx);
                me.ma21j1001popup_grid1.getPlugin('cellplugin').startEditByPosition({
                    row: rowIdx,
                    column: 1  //가고자하는 컬럼번호
                });
            }
            else {

            }
        });

    },


    onGridDelete_ma21j1001popup_grid1 : function(selection , rowIdx){
        var me = this;
        me.ma21j1001popup_grid1_store.remove(selection);

        var jsonData = {
            'actiondata': 'd',
            'loginIduser': me.commonFn.getUserInfo('id_user'),
            'loginCdc': me.commonFn.getUserInfo('cd_c'),
            'dt_apply' : selection.data.dt_apply ,
            'cd_e' : selection.data.cd_e
        };

        var sendDataJson = [];
        sendDataJson.push(jsonData);
        var sendDataJsonEncode = Ext.encode(sendDataJson);

        me.commonFn.getTsoftAjaxRequest(sendDataJsonEncode , '../ServerPage/ma/ma_emp_history.jsp' , true , function (ajaxResult) {
            if ( ajaxResult.success ){
                me.commonFn.toastMessage('인사명령정보 삭제 성공','t');
                me.ma21j1001popup_grid1_store.commitChanges();
            }
        });

    },

    setAttachFileButtons: function() {
        var me = this;
        var buttonParams = {
            id_row_src: me.popupParam.id_row,
            fg_sy210: '3020',
            fg_sy210_ll: '',
            enableModify: true,
            windowTitle: '직원관련 첨부파일'
        };
        me.btnAttachFiles.setButtonParams(buttonParams);
    },

    onEditControlMode : function(value){
        var me = this;
        if (value){
            me.ma21j1001popup_form1.setReadOnly(false)   ;
            me.ma21j1001popup_form2.setReadOnly(false)   ;
            me.ma21j1001popup_grid1.setReadOnly(false)   ;
            me.ma21j1001popup_headform.down('[text = 저장]').show();
            if (me.popupParam.fg_window == 'new'){
                me.ma21j1001popup_headform.down('[text = 삭제]').hide();
            }
            else{
                me.ma21j1001popup_headform.down('[text = 삭제]').show();
            }
            me.ma21j1001popup_headform.down('[text = 입력]').hide();
            me.ma21j1001popup_grid1.tools['plus'].show();
            me.ma21j1001popup_grid1.tools['minus'].show();
            me.ma21j1001popup_grid1.tools['copy'].show();
            me.ma21j1001popup_functionform.down('[xtype=tsoftfilebutton]').setDisabled(false);
        }
        else{
            me.ma21j1001popup_form1.setReadOnly(true)   ;
            me.ma21j1001popup_form2.setReadOnly(true)   ;
            me.ma21j1001popup_grid1.setReadOnly(true)   ;

            me.ma21j1001popup_headform.down('[text = 저장]').hide();
            me.ma21j1001popup_headform.down('[text = 삭제]').hide();
            me.ma21j1001popup_headform.down('[text = 입력]').show();
            me.ma21j1001popup_grid1.tools['plus'].hide();
            me.ma21j1001popup_grid1.tools['minus'].hide();
            me.ma21j1001popup_grid1.tools['copy'].hide();
            me.ma21j1001popup_functionform.down('[xtype=tsoftfilebutton]').setDisabled(true);
        }
    }

});