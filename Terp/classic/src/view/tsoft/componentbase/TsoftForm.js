/**
 * Created by jiscraft on 2016-02-03.
 */
Ext.define('Terp.view.tsoft.componentbase.TsoftForm', {
    extend: 'Ext.form.Panel',
    xtype: 'tsoftform',

    requires: [
        'Ext.data.Model'
    ],

    cls: 'tsoft-component-form',
    //height : '100%',
    border : true ,
    bodyPadding: '5 5 5 5',
    trackResetOnLoad: true ,
    items: [
        /* include child components here */
    ],

    listeners:{
        boxready: function(form) {
            var thisForm = this;
            this.getForm().getFields().each(function(fld) {
                fld.defaultReadOnly = fld.readOnly;
                fld.on({
                    change: function(fld, nv, ov) {
                        var formRecord = thisForm.getRecord();
                        if (!Ext.isEmpty(formRecord) && formRecord.getData().hasOwnProperty(fld.getName())) {
                            formRecord.set(fld.getName(), fld.getValue());
                        }
                        // console.log(fld);
                    }
                });
            });
        },
        render:function(form){
            form.el.on('keypress', form.panelKeyHandler);
        }
    },

    panelKeyHandler:function(e) {
        var id = e.getTarget().id;
        var currentField = Ext.get(id).component;
        if (!currentField.id.toLowerCase().includes('textarea') && (e.getKey() === e.ENTER)) {
            currentField.blur();
            var nextField = currentField.nextSibling();
            if (nextField !== null) {
                if (nextField.xtype === 'label' || nextField.xtype === 'tbspacer') nextField = nextField.nextSibling();
            }
            else {
                if (currentField.ownerCt.xtype === 'tsoftdatefielddouble') {
                    nextField = currentField.ownerCt.nextSibling();
                    if (nextField.xtype === 'label' || nextField.xtype === 'tbspacer') nextField = nextField.nextSibling();
                }
            }
            if ((nextField !== null) && !(currentField.up('tsoftsearchform') && currentField.up('tsoftsearchform').autoSelectOnEnterKey)) {
                currentField.focus();
                Ext.defer(function () {
                    nextField.focus();
                },100);
            }
        }
    },

    setReadOnly : function( truefaseParma ){

        var formData = this.items.items;
        for(var i= 0 ; i < formData.length ; i++){

            if (!formData[i].hasOwnProperty('value')) {
                continue;
            }

            var t = Ext.ComponentQuery.query('#'+ formData[i].id)[0];
            if (formData[i].keyField == true  && formData[i].value != ''  ) {
                t.setReadOnly(true);
            }else{
                if (truefaseParma) {
                    t.setReadOnly(true);
                }else{
                    t.setReadOnly(false);
                }
            }
        }
    },

    makeSendData : function(actionData , encodeType ){
        //actionData 필수.. jsp에 넘겨줄 actionData
        if ( actionData == null  ){
            actionData = 's'
        }

        if ( encodeType != false ){
            encodeType = true;
        }

        var commonFn  = Terp.app.getController('TerpCommon');
        var loginCdc = commonFn.getUserInfo().cd_c;
        var loginIduser = commonFn.getUserInfo().id_user;

        var store = this.getValuesTsoft();
        //console.log('store',store);
        var sendDataJson = [];

        store.actiondata = actionData ;
        store.loginIduser = loginIduser ;
        store.loginCdc = loginCdc ;
        sendDataJson.push(store);

        if ( encodeType)
            return Ext.encode(sendDataJson);
        else
            return sendDataJson ;
    },


    getValuesTsoft : function(){
        //form안에 fieldset 이나 fieldcontainer가 있을경우 child value까지 처리하도록 개선 2016 06 22 jiscraft
        var formData = this.items.items;

        //console.log(formData);

        var returnData = new Ext.data.Model;
        for(var i= 0 ; i < formData.length ; i++){

            if (formData[i].value == undefined ){
                if (formData[i].xtype == "fieldcontainer" || formData[i].xtype == "fieldset"  || formData[i].xtype == 'tsoftdatefielddouble'){
                    var formDataChild = formData[i].items.items ;
                    var formType = formData[i].xtype ;
                    for(var j= 0 ; j < formDataChild.length ; j++) {
                        if (formDataChild[j].value == undefined) {

                        } else {
                            switch (formType ) {
                                case 'tsoftdatefielddouble' : returnData.set(formData[i].name + '_' + formDataChild[j].name, formDataChild[j].realValue == null || formDataChild[j].realValue == '' ? formDataChild[j].value : formDataChild[j].realValue);
                                //case 'tsofttextarea' : returnData.set(formDataChild[j].name, formData[i].realValue == null || formDataChild[j].realValue == '' ? formDataChild[j].value.toString().replace(/\n/gi, "\\r\\n") : formDataChild[j].realValue.toString().replace(/\n/gi, "\\r\\n"));
                                //case 'textareafield' : returnData.set(formDataChild[j].name, formData[i].realValue == null || formDataChild[j].realValue == '' ? formDataChild[j].value.toString().replace(/\n/gi, "\\r\\n") : formDataChild[j].realValue.toString().replace(/\n/gi, "\\r\\n"));
                                case 'textfield' : returnData.set(formDataChild[j].name, formDataChild[j].realValue == null || formDataChild[j].realValue == '' ? formDataChild[j].value.toString().replace(/'/gi,"''").replace(/\\t/gi," ") : formDataChild[j].realValue.toString().replace(/'/gi,"''").replace(/\\t/gi," "));
                                case 'tsofttextfield' : returnData.set(formDataChild[j].name, formDataChild[j].realValue == null || formDataChild[j].realValue == '' ? formDataChild[j].value.toString().replace(/'/gi,"''").replace(/\\t/gi," ") : formDataChild[j].realValue.toString().replace(/'/gi,"''").replace(/\\t/gi," "));
                                default : returnData.set(formDataChild[j].name, formDataChild[j].realValue == null || formDataChild[j].realValue == '' ? formDataChild[j].value : formDataChild[j].realValue);
                            }
                            //
                            //
                            //if (formType != 'tsoftdatefielddouble') {
                            //    returnData.set(formDataChild[j].name, formDataChild[j].realValue == null || formDataChild[j].realValue == '' ? formDataChild[j].value : formDataChild[j].realValue);
                            //} else {
                            //    returnData.set(formData[i].name + '_' + formDataChild[j].name, formDataChild[j].realValue == null || formDataChild[j].realValue == '' ? formDataChild[j].value : formDataChild[j].realValue);
                            //}

                        }
                    }
                }else{
                    continue;
                }
            }


            var formType = formData[i].xtype ;
            switch (formType ) {
                case 'tsofttextarea' : returnData.set(formData[i].name, formData[i].realValue == null || formData[i].realValue == '' ? formData[i].value.toString().replace(/\n/gi, "\\r\\n").replace(/'/gi,"''") : formData[i].realValue.toString().replace(/\n/gi, "\\r\\n").replace(/'/gi,"''"));
                //case 'textareafield' : returnData.set(formData[i].name, formData[i].realValue == null || formData[i].realValue == '' ? formData[i].value.toString().replace(/\n/gi, "\\r\\n").replace(/'/gi,"''") : formData[i].realValue.toString().replace(/\n/gi, "\\r\\n").replace(/'/gi,"''"));
                //case 'textfield' : returnData.set(formData[i].name, formData[i].realValue == null || formData[i].realValue == '' ? formData[i].value.toString().replace(/'/gi,"''").replace(/\\t/gi," ") : formData[i].realValue.toString().replace(/'/gi,"''").replace(/\\t/gi," "));
                case 'tsofttextfield' : returnData.set(formData[i].name, formData[i].realValue == null || formData[i].realValue == '' ? formData[i].value.toString().replace(/'/gi,"''").replace(/\\t/gi," ") : formData[i].realValue.toString().replace(/'/gi,"''").replace(/\\t/gi," "));
                default : returnData.set(formData[i].name, formData[i].realValue == null || formData[i].realValue == '' ? formData[i].value : formData[i].realValue );
            }



            //console.log(formData[i].xtype);

        }            //if (formData[i].xtype == 'tsofttextarea' || formData[i].xtype == "textareafield") {
        //    //console.log('어디로간거냐',formData[i].xtype);
        //    returnData.set(formData[i].name, formData[i].realValue == null || formData[i].realValue == '' ? formData[i].value.toString().replace(/\n/gi, "\\r\\n").replace(/'/gi,"''") : formData[i].realValue.toString().replace(/\n/gi, "\\r\\n").replace(/'/gi,"''"));
        //}else{
        //    returnData.set(formData[i].name, formData[i].realValue == null || formData[i].realValue == '' ? formData[i].value : formData[i].realValue );
        //}

        return returnData.data ;
    },

    blurForm : function() {
        var me = this;
        Ext.defer(function() {
            me.getForm().getFields().each(function (field) {
                // console.log(field);
                if (field.displayValue) {
                    field.setRawValue(field.getDisplayValue());
                }
            });
        }, 100);
    },

    clearForm : function() {
        this.getForm().getFields().each(function(field) {
            field.setValue('');
            if (field.realValue) {
                field.setRealValue('');
                field.setDisplayValue('');
            }
        });
        /*
        var formData = this.items.items;
        for(var i= 0 ; i < formData.length ; i++){

            if (formData[i].value == undefined ){
                continue;
            }

            var t = Ext.ComponentQuery.query('#'+ formData[i].id)[0];
            t.setValue('');
            if (t.realValue ){
                t.setRealValue('');
                t.setDisplayValue('');
            }
        }
        */

    },


    setReadOnlyAllFields: function(fg) {
        this.getForm().getFields().each(function(fld) {
            if (!fld.defaultReadOnly) {
                fld.setReadOnly(fg);
            }
        });
    },

    clearAllFieldValues: function() {
        this.getForm().getFields().each(function (fld) {
            fld.setValue(null);
        });
    },

    setAllFieldValuesByStoreData: function(data) {
        this.getForm().getFields().each(function(fld) {
            if (data.hasOwnProperty(fld.getName())) {
                fld.setValue(data[fld.getName()]);
            }
        });
    },


    checkBlank : function(){
        var checkString ='';
        this.getForm().getFields().each(function (fld) {
            //console.log(fld);
            if (!fld.allowBlank && ( fld.getValue() == '' || fld.getValue() == null))  {
                checkString = checkString + '[ ' +  fld.config.fieldLabel + ' ]';
            }
        });
        if (checkString !='' ){
            return checkString + ' 는 필수항목입니다. 반드시 입력하세요';
        }else{
            return '' ;
        }
    }

});