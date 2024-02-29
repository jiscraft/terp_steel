/**
 * Created by jiscraft on 2019-01-25.
 */
Ext.define('Terp.view.tsoft.componentux.TsoftVacationHelp2Field', {
    extend: 'Ext.form.TextField',
    xtype: 'tsoftvacationhelp2field',

    requires: [
        'Terp.view.tsoft.help.vacationhelp2.TsoftVacationHelp2'
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
        this.setRawValue(this.getRealValue());
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

                if ( menuPage[this.getHelpParamFuctionName()] != undefined ) {
                    var helpParams = menuPage[this.getHelpParamFuctionName()].apply();
                }

                var pop = Ext.create('Terp.view.tsoft.help.vacationhelp2.TsoftVacationHelp2');
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
                this.fireEvent('setcallbackvalue', this, null);
            }
        }
    },

    callbackPopup : function(params) {
        this.setDisplayValue(params.no_vc);
        this.setRealValue(params.no_vc);
        this.setValue(params.no_vc);
        this.setRawValue(params.no_vc);
        this.fireEvent('setcallbackvalue', this, params);
    },


    initComponent:function(){
        var me = this;
        //console.log('workerhelpfield',this);
        me.callParent(arguments);
    }

});