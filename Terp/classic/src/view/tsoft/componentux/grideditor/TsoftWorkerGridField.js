/**
 * Created by resh on 2016-10-11.
 */
Ext.define('Terp.view.tsoft.componentux.grideditor.TsoftWorkerGridField', {
    extend: 'Ext.form.TextField',
    xtype: 'tsoftworkergridfield',

    requires: [
        'Terp.view.tsoft.help.workerhelp.TsoftWorkerHelp'
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
                var pop = Ext.create('Terp.view.tsoft.help.workerhelp.TsoftWorkerHelp', {
                    opener: this.up('tsoftgrid').reference
                });
                pop.show();
                pop.getController().init(this);
            }
        },
        clear: {
            cls: 'x-form-clear-trigger',
            handler: function () {
                if ( this.allowBlank == false) {
                    Terp.app.getController('TerpCommon').toastMessage('값을 반드시 선택해야 합니다','t');
                    return;
                }

                this.setValue('');
                this.ownerCt.grid.selection.set(this.ownerCt.column.dataIndex , '') ;
                this.ownerCt.grid.selection.set(this.ownerCt.column.nmIndex , '') ;
                this.fireEvent('setcallbackvalue', this, null);

                if (this.ownerCt.ownerCmp.reference === 'wk16j1001_grid1') {
                    var col = this.up('tsoftgrid').getColumns();
                    for (i=0; i<col.length; i++) {
                        if (col[i].dataIndex == 'fg_fi010') this.ownerCt.grid.selection.set(col[i].dataIndex, '');
                        if (col[i].dataIndex == 'dc_account') this.ownerCt.grid.selection.set(col[i].dataIndex, '');
                    }
                }
            }
        }
    },

    listeners : {

    },


    callbackPopup : function(params, opener) {
        this.ownerCt.grid.selection.set(this.ownerCt.column.dataIndex, params.cd_w);
        this.ownerCt.grid.selection.set(this.ownerCt.column.nmIndex, params.nm_w);

        if (opener === 'wk16j1001_grid1') {
            var col = this.up('tsoftgrid').getColumns();
            for (i=0; i<col.length; i++) {
                if (col[i].dataIndex == 'at_dailypay') this.ownerCt.grid.selection.set(col[i].dataIndex, params.at_dailypay);
                if (col[i].dataIndex == 'no_w') this.ownerCt.grid.selection.set(col[i].dataIndex, params.no_w);
                if (col[i].dataIndex == 'fg_hr070') this.ownerCt.grid.selection.set(col[i].dataIndex, params.fg_hr070);
                if (col[i].dataIndex == 'dc_addr') this.ownerCt.grid.selection.set(col[i].dataIndex, params.dc_addr);
                if (col[i].dataIndex == 'dc_hp') this.ownerCt.grid.selection.set(col[i].dataIndex, params.dc_hp);
                if (col[i].dataIndex == 'fg_fi010') this.ownerCt.grid.selection.set(col[i].dataIndex, params.fg_fi010);
                if (col[i].dataIndex == 'dc_account') this.ownerCt.grid.selection.set(col[i].dataIndex, params.dc_bank_account);
            }
        }

        this.fireEvent('setcallbackvalue', this, params);
    }
});