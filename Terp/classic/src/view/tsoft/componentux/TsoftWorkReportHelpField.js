/**
 * Created by resh on 2016-07-04.
 */
Ext.define('Terp.view.tsoft.componentux.TsoftWorkReportHelpField', {

    extend: 'Ext.form.TextField',
    xtype: 'tsoftworkreporthelpfield',
    requires: [
        'Terp.view.tsoft.help.workreporthelp.TsoftWokrReportHelp'
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

        //onFocus: function() {
        //    this.callParent(arguments);
        //    this.setRawValue(this.getRealValue());
        //},

        //onBlur: function() {
        //    this.callParent(arguments);
        //    if (this.value !== undefined) {
        //        this.setRawValue(this.getDisplayValue());
        //    } else {
        //        return;
        //    }
        //
        //
        //},

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
                    var pop = Ext.create('Terp.view.tsoft.help.workreporthelp.TsoftWokrReportHelp');
                    pop.show();
                    pop.getController().init(this);
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
            this.setDisplayValue(params.no_wk);
            this.setRealValue(params.no_wk);
            this.setValue(params.no_wk);
            this.setRawValue(params.no_wk);
            this.fireEvent('setcallbackvalue', this, params);
        },


        initComponent:function(){
            var me = this;
            //console.log('sitehelpfield',this);
            me.callParent(arguments);
        }
    });