/**
 * Created by jiscraft on 2016-08-19.
 */
Ext.define('Terp.view.tsoft.common.contactUser.ContactUserController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.contactuser',

    init: function() {
        var me = this;
        commonFn = Terp.app.getController('TerpCommon');
        me.contactuser_form1 = this.lookupReference('contactuser_form1');
        me.contactuser_form1_store =  this.getViewModel().getStore('contactuser_form1_store') ;
        me.contactuser_grid1 = this.lookupReference('contactuser_grid1');
        me.contactuser_grid1_store =  this.getViewModel().getStore('contactuser_grid1_store') ;
        //var paramData = this.getView().popupParams;
        this.onSelect();
        //this.lookupReference('refDcRemark').setValue(this.getView().popupParams.data.dc_remark);
    },

    onSelect : function(){
        var me = this;

        var jsonData = {
            'actiondata': 'm',
            'loginIduser': commonFn.getUserInfo('id_user'),
            'loginCdc': commonFn.getUserInfo('cd_c'),
            'no_contact' : this.getView().popupParams.data.no_contact
        };
        var sendDataJson = [];
        sendDataJson.push(jsonData);
        var sendDataJsonEncode = Ext.encode(sendDataJson);


        var jsonDatar = {
            'actiondata': 'r',
            'loginIduser': commonFn.getUserInfo('id_user'),
            'loginCdc': commonFn.getUserInfo('cd_c'),
            'no_contact' : this.getView().popupParams.data.no_contact
        };
        var sendDataJsonr = [];
        sendDataJsonr.push(jsonDatar);
        var sendDataJsonEncoderr = Ext.encode(sendDataJsonr);

        contactuser_form1_store.load({
            params :{
                sendData : sendDataJsonEncoderr
            },
            callback : me.onSelectCallbackForm1,
            scope : me
        });


        contactuser_grid1_store.load({
            params :{
                sendData : sendDataJsonEncode
            },
            callback : me.onSelectCallback,
            scope : me
        });
    },


    onSelectCallback : function(records, operation , success){

        if(success == true ){

        }else{
            commonFn.toastMessage(this.getViewModel().getStore('contactuser_grid1_store').getProxy().getReader().rawData.msg , 'b');
        }
    },

    onSelectCallbackForm1 : function(records, operation , success){
        if(success == true ){
            if  ( records.length < 1 ){
                contactuser_form1.clearForm();
            }else {
                //데이타를 store에서 가져온다
                contactuser_form1.loadRecord(records[0]);
            }
        }else{
            var errorMsg = this.getViewModel().getStore('contactuser_grid1_store').getProxy().getReader().rawData.msg;
            Terp.app.getController('TerpCommon').errorHandling(errorMsg);
        }
    },

    onModify : function(){
        console.log('modify');
        this.lookupReference('refDcRemark').setReadOnly(false);
    },

    onSave : function(){
        console.log(this.lookupReference('refDcRemark'));

        var me = this;
        var jsonData = {
            'actiondata': 'urmk',
            'loginIduser': commonFn.getUserInfo('id_user'),
            'loginCdc': commonFn.getUserInfo('cd_c'),
            'no_contact' : this.getView().popupParams.data.no_contact,
            'dc_remark' : this.lookupReference('refDcRemark').value
        };

        var sendDataJson = [];
        sendDataJson.push(jsonData);
        var sendDataJsonEncode = Ext.encode(sendDataJson);

        Ext.Ajax.request({
            url :'../ServerPage/ma/ma_contact.jsp' ,
            method :'POST',
            params :{
                sendData : sendDataJsonEncode
            },
            success :function(res){
                var obj = Ext.JSON.decode(res.responseText);
                if(obj.success){
                    commonFn.toastMessage('저장성공','b');
                    me.onModify();

                }else{
                    var errorMsg = obj.msg;
                    Terp.app.getController('TerpCommon').errorHandling(errorMsg);
                }
            },
            fail : function(){
                commonFn.toastMessage("데이타처리중 오류가 발생했습니다",'b');
            }
        });
    }


});