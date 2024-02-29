/**
 * Created by jiscraft on 2018-02-04.
 */
Ext.define('Terp.view.tsoft.componentux.TsoftBudgetHelpField', {
    extend: 'Ext.form.TextField',
    xtype: 'tsoftbudgethelpfield',

    requires: [
        'Terp.view.tsoft.help.eshelp.TsoftEsHelp'
    ],

    config:{
        displayValue :'' ,
        realValue :'' ,
        helpParams :{},             //핼프윈도우 초기값
        helpParamFuctionName :''  //헬프윈도우에 초기값을 넘겨주기 호출하는 함수 이름
    },

    labelSeparator : '',
    labelWidth: 60 ,
    width : 400 ,

    enableKeyEvents: true,
    editable: true,
    selectOnFocus: false,

    triggers: {
        search: {
            cls: 'x-form-search-trigger',
            handler: function () {

                //이위젯이 속한 최상위 객체를 넘겨준다..( xtype 이 tsoftPagePanel로 되있어야 찾는다 )
                var menuPage = Terp.app.getController('TerpCommon').getTopOwnerCt(this).getController();

                if ( menuPage[this.getHelpParamFuctionName()] != undefined ) {
                    var helpParams = menuPage[this.getHelpParamFuctionName()].apply();
                }

                var pop = Ext.create('Terp.view.tsoft.help.eshelp.TsoftEsHelp');
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

                this.setRawValue('');
                this.setValue('');
                this.fireEvent('setcallbackvalue', this, null);
            }
        }
    },

    callbackPopup : function(params) {
        //console.log(params);
        this.setValue(params.no_es);
        this.setRawValue(params.no_es);
        this.fireEvent('setcallbackvalue', this, params);
    },


    initComponent:function(){
        var me = this;
        me.callParent(arguments);
    }


});