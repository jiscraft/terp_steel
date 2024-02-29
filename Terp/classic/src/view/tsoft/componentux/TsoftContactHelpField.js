/**
 * Created by dhgid on 2021-01-12.
 */

Ext.define('Terp.view.tsoft.componentux.TsoftContactHelpField', {
    extend: 'Ext.form.TextField',
    xtype: 'tsoftcontacthelpfield',

    requires: [
        'Terp.view.tsoft.help.contacthelp.TsoftContactHelp'
    ],

    config:{
        displayValue :'' ,
        realValue :'' ,
        helpParams :{},             //핼프윈도우 초기값
        helpParamFuctionName :''  //헬프윈도우에 초기값을 넘겨주기 호출하는 함수 이름
    },

    labelSeparator : '',
    labelWidth: 60 ,
    width : 200 ,

    enableKeyEvents: true,
    editable: true,
    selectOnFocus: false,

    onFocus: function() {
        this.callParent(arguments);
        this.setRawValue(this.getDisplayValue());
        this.selectText();
    },

    onBlur: function() {
        this.callParent(arguments);
        if (Ext.isEmpty(this.getDisplayValue())) {
            this.inputEl.dom.value = '';
            this.setDisplayValue('');
            this.setRealValue('');
            this.setValue('');
            this.setRawValue('');
        }
        else {
            this.setRawValue(this.getDisplayValue());
        }
    },

    getValue : function(){
        return this.getRealValue();
    },

    getRawValue : function(){
        return this.getRealValue();
    },

    triggers: {
        search: {
            cls: 'x-form-search-trigger',
            handler: function () {
                //이위젯이 속한 최상위 객체를 넘겨준다..( xtype 이 tsoftPagePanel로 되있어야 찾는다 )
                var menuPage = Terp.app.getController('TerpCommon').getTopOwnerCt(this).getController();
                var helpParams = '';
                if ( menuPage[this.getHelpParamFuctionName()] != undefined ) {
                     helpParams = menuPage[this.getHelpParamFuctionName()].apply();
                }
                if(menuPage.view.popupParams != undefined) {
                    helpParams = menuPage.view.popupParams
                }
                var pop = Ext.create('Terp.view.tsoft.help.contacthelp.TsoftContactHelp');
                pop.show();
                pop.getController().init(this , helpParams  );
            }
        },



        clear: {
            cls: 'x-form-clear-trigger',
            handler: function (obj) {

                if ( this.allowBlank == false) {
                    Terp.app.getController('TerpCommon').toastMessage('값을 반드시 선택해야 합니다','b');
                    return;
                }

                this.inputEl.dom.value = '';
                this.setDisplayValue('');
                this.setRealValue('');
                this.setRawValue('');
                this.setValue('');
                this.SelectedData = null;
                this.fireEvent('setcallbackvalue', this, null);
            }
        }
    },

    callbackPopup : function(params) {
        this.setDisplayValue(params.a_dc_name);
        this.setRawValue(params.a_dc_name);
        this.setRealValue(params.a_no_contact);
        this.setValue(params.a_no_contact);
        this.SelectedData = params;
        this.fireEvent('setcallbackvalue', this, params);
    },


    initComponent:function(){
        var me = this;
        //console.log('emphelpfield',this);
        me.callParent(arguments);
    }


});

