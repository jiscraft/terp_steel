/**
 * Created by jiscr on 2021-10-09.
 */
Ext.define('Terp.view.ma.ma21j0901.Ma21j0901Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ma21j0901',

    control: {
        'tsoftsearchform[reference=ma21j0901_searchform]': {
            boxready: 'onBoxReady_ma21j0901_searchform'
        }
    },

    init: function() {
        var me = this;
        me.commonFn = Terp.app.getController('TerpCommon');
        me.ma21j0901_headbutton = me.lookupReference('ma21j0901_headbutton');
        me.ma21j0901_searchform = me.lookupReference('ma21j0901_searchform');

        me.ma21j0901_form1 = me.lookupReference('ma21j0901_form1');
        me.ma21j0901_form2 = me.lookupReference('ma21j0901_form2');
        me.ma21j0901_form_store = me.getViewModel().getStore('ma21j0901_form_store') ;


        me.ma21j0901_grid1 = me.lookupReference('ma21j0901_grid1');
        me.ma21j0901_grid1_store =  me.getViewModel().getStore('ma21j0901_grid1_store') ;

        me.btnAttachFiles = me.lookupReference('ma21j0901_functionform_btnAttachFiles');

        me.ma21j0901_functionform = me.lookupReference('ma21j0901_functionform');

        me.popupParam = me.getView().popupParams;
        me.onInitValue(me.popupParam);
    },


    onInitValue : function(popupParam){
        var me = this;

        //폼에 공통콤보코드 스터어를 바인딩
        me.commonFn.setCommonCode(me.lookupReference('ma21j0901_fg_mm010') ,'FI010');

    },

    onBoxReady_ma21j0901_searchform : function(){
        var me = this;
        me.onEditControlMode('init');

    },

    onSelect : function(){
        var me = this;

        var searchValue = me.ma21j0901_searchform.down('[name=cd_p]').getValue();
        if (searchValue  == '' ||  searchValue == null ){
            me.commonFn.toastMessage('거래처코드를 선택후 조회하세요','t')  ;
            return;
        }


        var jsonData = {
            'actiondata': 'r',
            'loginIduser': me.commonFn.getUserInfo('id_user'),
            'loginCdc': me.commonFn.getUserInfo('cd_c'),
            'cd_p' : searchValue
        };

        var sendDataJson = [];
        sendDataJson.push(jsonData);
        var sendDataJsonEncode = Ext.encode(sendDataJson);

        me.ma21j0901_form_store.load({
            params :{
                sendData : sendDataJsonEncode
            },
            callback : function(records, operation , success){
                var me = this;
                if (success == true) {
                    me.getViewModel().set('formData',me.ma21j0901_form_store.data.items[0].data );
                    me.setAttachFilesButton(me.getViewModel().data.formData.id_row );
                    me.ma21j0901_form1.blurForm();
                    me.ma21j0901_form2.blurForm();
                    me.onEditControlMode('select');
                    var jsonData = {
                        'actiondata': 'm',
                        'loginIduser': me.commonFn.getUserInfo('id_user'),
                        'loginCdc': me.commonFn.getUserInfo('cd_c'),
                        'cd_p' : me.ma21j0901_searchform.down('[name=cd_p]').getValue()
                    };

                    var sendDataJson = [];
                    sendDataJson.push(jsonData);
                    var sendDataJsonEncode = Ext.encode(sendDataJson);


                    me.ma21j0901_grid1_store.load({
                        params :{
                            sendData : sendDataJsonEncode
                        },
                        callback : function(records, operation , success){
                            var me = this;
                            if (success == true) {
                                me.onEditControlMode('select');

                            } else {
                                Ext.getBody().unmask();
                                var errorMsg = this.getViewModel().getStore('ma21j0901_grid1_store').getProxy().getReader().rawData.msg;
                                me.commonFn.errorHandling(errorMsg);
                            }
                        },
                        scope : me
                    });

                } else {
                    Ext.getBody().unmask();
                    var errorMsg = this.getViewModel().getStore('ma21j0901_grid1_store').getProxy().getReader().rawData.msg;
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


    onInsert : function(){
        var me = this;

        me.ma21j0901_form1.clearForm();
        me.ma21j0901_form2.clearForm();
        me.ma21j0901_searchform.clearForm();


        // var me = this;
        // var idRow = me.commonFn.sqlRowId();

        var insertData =
            {
                cd_c: me.commonFn.getUserInfo('cd_c'),
                cd_p: "",
                nm_p: "",
                id_row : me.commonFn.sqlRowId()
            };

        me.ma21j0901_form_store.insert(0, insertData);
        me.setAttachFilesButton(insertData.id_row);
        me.onEditControlMode('insert');
    },

    setAttachFilesButton: function(idRow) {
        var me = this;
        var buttonParams = {
            id_row_src: idRow ,
            fg_sy210: '3080',
            fg_sy210_ll: '',
            enableModify: true,
            windowTitle: '거래처 첨부파일',
            upload_folder: 'UploadFiles'
        };
        me.btnAttachFiles.setButtonParams(buttonParams);
    },

    onSave : function(){
        var me = this;

        var sendDataJson = [];

        var formData = me.getViewModel().data.formData;
        var alldatah = me.ma21j0901_form_store.getData();
        alldatah.items[0].data = formData ;
        alldatah.items[0].data.actiondata = 'sall';
        alldatah.items[0].data.detailactiondata = 'fdata';
        alldatah.items[0].data.loginIduser = me.commonFn.getUserInfo().id_user;
        alldatah.items[0].data.loginCdc = me.commonFn.getUserInfo().cd_c;
        sendDataJson.push(
            alldatah.items[0].data
        );

        var alldatal = me.ma21j0901_grid1_store.getModifiedRecords();
        for (var j = 0; j < alldatal.length; j++) {
            alldatal.items[j+1].data.actiondata = 'sall';
            alldatal.items[j+1].data.detailactiondata = 'edata';
            alldatal.items[j+1].data.loginIduser = me.commonFn.getUserInfo().id_user;
            alldatal.items[j+1].data.loginCdc = me.commonFn.getUserInfo().cd_c;
            sendDataJson.push(
                alldatal.items[j+1].data
            );
        }

        var sendDataJsonEncode = Ext.encode(sendDataJson);

        me.commonFn.getTsoftAjaxRequest(sendDataJsonEncode , '../ServerPage/ma/ma_partner.jsp' , true , function (ajaxResult) {
            // sendDataJsonEncode 보낼데이타 ,  url , async값(순서상관없이 받을시 true) , callback받을펑션
            if ( ajaxResult.success ){   // 결과가 성공일때
                me.commonFn.toastMessage('저장 성공',16,1);
                me.onSelect();
                me.onEditControlMode(false);
            }
        });
    },



    onDelete : function(){
        var me = this;
        Ext.MessageBox.confirm('확인', '선택한 거래처 정보를 삭제하시겠습니까? <br><br> 삭제하게되면 하단 고객정보도 같이 삭제됩니다. <br><br> 그리고 관련된 정보가 정상적으로 처리 안될수 있습니다.', function (btn) {
            if (btn == 'yes') {
                var jsonData = {
                    'actiondata': 'd',
                    'loginIduser': me.commonFn.getUserInfo('id_user'),
                    'loginCdc': me.commonFn.getUserInfo('cd_c'),
                    'cd_p' : me.getViewModel().get('formData.cd_p' )
                };

                var sendDataJson = [];
                sendDataJson.push(jsonData);
                var sendDataJsonEncode = Ext.encode(sendDataJson);

                me.commonFn.getTsoftAjaxRequest(sendDataJsonEncode , '../ServerPage/ma/ma_partner.jsp' , true , function (ajaxResult) {
                    if ( ajaxResult.success ){
                        me.commonFn.toastMessage('지출결의서 삭제성공','t');
                        me.onEditControlMode('delete');

                    }
                });
            } else {

            }
        });

    },

    onGridDelete_ma21j0901_grid1 : function(){
        var me = this;
        var gridSelection = me.ma21j0901_grid1.getSelectionModel().getSelection();
    
        var sendDataJson = [];
        for (var i = 0; i < gridSelection.length; i++) {
            gridSelection[i].data.actiondata = 'd';
            gridSelection[i].data.loginIduser = me.commonFn.getUserInfo().id_user;
            gridSelection[i].data.loginCdc = me.commonFn.getUserInfo().cd_c;
            sendDataJson.push(
                gridSelection[i].data
            );
        }
        var sendDataJsonEncode = Ext.encode(sendDataJson);
        me.commonFn.getTsoftAjaxRequest(sendDataJsonEncode , '../ServerPage/ma/ma_contact.jsp' , true , function (ajaxResult) {
            if ( ajaxResult.success ){
                me.commonFn.toastMessage('거래처 담당정보 삭제 성공','t');
                me.onGridSelect_ma21j0901_grid1();
            }
        });
    },

    onGridSave_ma21j0901_grid1 : function(){
        var me = this;
        me.ma21j0901_grid1.getPlugin('cellplugin').completeEdit();
        
        
        var sendData = me.ma21j0901_grid1.makeSendData();
    
        me.commonFn.getTsoftAjaxRequest(sendData , '../ServerPage/ma/ma_contact.jsp' , true , function (ajaxResult) {
            if ( ajaxResult.success ){
                me.commonFn.toastMessage('거래처 담당정보 저장 성공','t');
                me.onGridSelect_ma21j0901_grid1();
            }
        });
    },
    
    onGridInsert_ma21j0901_grid1 : function(gridSelection , gridRowindex){
        var me = this;
        me.ma21j0901_grid1.setReadOnly(false);
        var gridSelection_grid1 = me.ma21j0901_grid1.getGridSelection();
    
        var insertData ={
            cd_c: me.commonFn.getUserInfo().cd_c,
            cd_site : '' ,
            cd_p : me.getViewModel().get('formData.cd_p' ),
            nm_p : me.getViewModel().get('formData.nm_p' ) ,
            no_contact : me.commonFn.sqlNodocu('CU', me.commonFn.getUserInfo('cd_c'),me.commonFn.getTodayInfo())

        };
    
        me.ma21j0901_grid1.getPlugin('cellplugin').completeEdit();
    
    
        me.ma21j0901_grid1_store.insert(gridRowindex, insertData);
        me.ma21j0901_grid1.getSelectionModel().select(gridRowindex);
        me.ma21j0901_grid1.getPlugin('cellplugin').startEditByPosition({
            row: 0,
            column: 0
        });
    
    },
    
    
    onGridSelect_ma21j0901_grid1 : function(){
        var me = this;
        var gridSelection = me.ma21j0901_grid1.getGridSelection();
        var jsonData = {
            'actiondata': 'm',
            'loginIduser': me.commonFn.getUserInfo('id_user'),
            'loginCdc': me.commonFn.getUserInfo('cd_c'),
            'cd_p':  me.ma21j0901_searchform.down('[name=cd_p]').getValue()
        };
    
        var sendDataJson = [];
        sendDataJson.push(jsonData);
        var sendDataJsonEncode = Ext.encode(sendDataJson);
    
    
        me.ma21j0901_grid1_store.load({
            params :{
                sendData : sendDataJsonEncode
            },
            callback : function(records, operation , success){
                    var me = this;
                    if (success == true) {
                        Ext.getBody().unmask();
                        if ( records.length > 0 ){
                            me.ma21j0901_grid1.getSelectionModel().select(0);
                        }
                        me.onEditControlMode('select');
                    } else {
                        Ext.getBody().unmask();
                        var errorMsg = this.getViewModel().getStore('ma21j0901_grid1_store').getProxy().getReader().rawData.msg;
                        me.commonFn.errorHandling(errorMsg);
                    }        
                },
            scope : me
        });
    },

    onEditControlMode : function(value){
        var me = this;
        if (value == 'select') {
            me.ma21j0901_grid1.setReadOnly(true);
            me.ma21j0901_form1.setReadOnly(true);
            me.ma21j0901_form2.setReadOnly(true);
            me.ma21j0901_form1.down('[name = cd_p]').setKeyField(true);
            me.ma21j0901_headbutton.down('[name = savebutton]').hide();
        }else if (value == 'edit'){
            me.ma21j0901_grid1.setReadOnly(false);
            me.ma21j0901_form1.setReadOnly(false);
            me.ma21j0901_form2.setReadOnly(false);
            me.ma21j0901_form1.down('[name = cd_p]').setKeyField(true);
            me.ma21j0901_headbutton.down('[name = savebutton]').show();
            me.ma21j0901_headbutton.down('[name = savebutton]').enable();
        }else if(value == 'save'){
            me.ma21j0901_grid1.setReadOnly(true);
            me.ma21j0901_form1.setReadOnly(true);
            me.ma21j0901_form2.setReadOnly(true);
            me.ma21j0901_form1.down('[name = cd_p]').setKeyField(true);
            me.ma21j0901_headbutton.down('[name = savebutton]').hide();
        }else if(value =='delete'){
            me.ma21j0901_form1.clearForm();
            me.ma21j0901_form2.clearForm();
            me.ma21j0901_searchform.clearForm();
        }else if(value =='insert'){
            me.ma21j0901_grid1.setReadOnly(false);
            me.ma21j0901_form1.setReadOnly(false);
            me.ma21j0901_form2.setReadOnly(false);
            me.ma21j0901_form1.down('[name = cd_p]').setKeyField(false);
            me.ma21j0901_headbutton.down('[name = savebutton]').show();
            me.ma21j0901_headbutton.down('[name = savebutton]').enable();


        }else if(value =='init'){
            me.ma21j0901_grid1.setReadOnly(true);
            me.ma21j0901_form1.setReadOnly(true);
            me.ma21j0901_form2.setReadOnly(true);
            me.ma21j0901_form1.down('[name = cd_p]').setKeyField(true);
            me.ma21j0901_headbutton.down('[name = savebutton]').hide();
            me.ma21j0901_headbutton.down('[name = savebutton]').enable();
        }
    }
});