/**
 * Created by jiscraft on 2017-06-29.
 */
Ext.define('Terp.view.tsoft.componentux.grideditor.TsoftCardGridField', {
    extend: 'Ext.form.TextField',
    xtype: 'tsoftcardgridfield',

    requires: [
        'Terp.view.tsoft.help.cardhelp.TsoftCardHelp'
    ],

    config :{
        displayValue: '',
        realValue: ''
    },

    width : 200 ,
    labelWidth: 60 ,
    labelSeparator: '' ,

    triggers: {
        search: {
            cls: 'x-form-search-trigger',
            handler: function () {
                console.log(this.popupParams);
                var pop = Ext.create('Terp.view.tsoft.help.cardhelp.TsoftCardHelp',{
                    popupParamThisView : this ,
                    popupParams :this.popupParams

                });
                pop.show();

            }
        },
        clear: {
            cls: 'x-form-clear-trigger',
            handler: function () {
                this.setValue('');
                this.ownerCt.grid.selection.set(this.ownerCt.column.dataIndex , '') ;
                this.ownerCt.grid.selection.set(this.ownerCt.column.nmIndex , '') ;
                this.fireEvent('setcallbackvalue', this, null);
            }
        }
    },

    listeners : {

    },


    callbackPopup : function(params) {
        // console.log(this.ownerCt.grid.selection);
        // console.log(this);
        this.ownerCt.grid.selection.set(this.ownerCt.column.dataIndex, params.cd_codel);
        this.ownerCt.grid.selection.set(this.ownerCt.column.nmIndex, params.nm_codel);
        this.fireEvent('setcallbackvalue', this, params);
    }

});