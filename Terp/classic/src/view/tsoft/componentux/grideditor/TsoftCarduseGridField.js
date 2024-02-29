/**
 * Created by jiscraft on 2017-07-04.
 */
Ext.define('Terp.view.tsoft.componentux.grideditor.TsoftCarduseGridField', {
    extend: 'Ext.form.TextField',
    xtype: 'tsoftcardusegridfield',

    requires: [
        'Terp.view.tsoft.help.cardusehelp.TsoftCarduseHelp'
    ],

    config :{
        displayValue: '',
        realValue: ''
    },

    width : 200 ,
    labelWidth: 60 ,
    labelSeparator: '' ,

    enableKeyEvents: true,
    editable: true,
    selectOnFocus: false,

    triggers: {
        search: {
            cls: 'x-form-search-trigger',
            handler: function () {
                // console.log(this.ownerCt);
                // console.log(this.getView());
                console.log(this.ownerCt.ownerCmp.ownerCt.items.items[2].items.items[1].rawValue);


                var pop = Ext.create('Terp.view.tsoft.help.cardusehelp.TsoftCarduseHelp',{
                    popupParamThisView : this ,
                    popupParams :this.ownerCt.ownerCmp.selection.data,
                    popupParamsHead : this.ownerCt.ownerCmp.ownerCt.items.items[2].items.items[1].rawValue
                });
                pop.show();

            }
        },
        clear: {
            cls: 'x-form-clear-trigger',
            handler: function () {
                this.setValue('');
                this.ownerCt.grid.selection.set(this.ownerCt.column.dataIndex , '') ;
                this.ownerCt.grid.selection.set('no_cardapply' , '') ;
                this.fireEvent('setcallbackvalue', this, null);
            }
        }
    },

    listeners : {

    },


    callbackPopup : function(params) {
        // console.log(this.ownerCt.grid.selection);
         console.log(params);
        this.ownerCt.grid.selection.set(this.ownerCt.column.dataIndex, '사용일시 :' + params.dc_c + ' ' + params.dc_d + ' 사용처 :' + params.dc_f + ' 금액 :' + params.dc_j +' 카드번호 :' + params.dc_b  );
        this.ownerCt.grid.selection.set('no_cardapply', params.dc_k);
        this.ownerCt.grid.selection.set('at_jc', params.dc_j);
        this.fireEvent('setcallbackvalue', this, params);
    }

});