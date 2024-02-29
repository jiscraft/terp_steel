/**
 * Created by Andrew on 2021-10-21.
 */
Ext.define('Terp.view.gw.ea.common.eaaprogridtptp.EaAproGridTpController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.eaaprogridtp',

    requires: [
        'Ext.grid.column.RowNumberer'
    ],

    control: {
        'eaaprogridtp': {
            boxready: 'onBoxReady_eaaprogridtp'
        }
    },

    init: function() {
        var me = this;
        me.commonFn = Terp.app.getController('TerpCommon');

        me.view = me.getView();
        me.apro_grid = me.lookupReference('eaaprogridtp_apro_grid');
        me.cmt_panel = me.lookupReference('eaaprogridtp_cmt_panel');

        if (me.view.aproType === '1') {
            me.apro_grid.setTitle('결재현황');
            me.cmt_panel.setTitle('결재의견');
        }
        else if (me.view.aproType === '2') {
            me.apro_grid.setTitle('합의현황');
            me.cmt_panel.setTitle('합의의견');
        }
        else if (me.view.aproType === '3') {
            me.apro_grid.setTitle('협의현황');
        }
        else if (me.view.aproType === '9') {
            me.apro_grid.setTitle('수신현황');
        }

        me.reconfigureGridColumns();
    },

    onBoxReady_eaaprogridtp: function(p) {
        var me = this;
        if ((me.view.aproType === '1') || (me.view.aproType === '2')) {
            me.cmt_panel.show();
        }
        else {
            me.cmt_panel.hide();
        }
    },

    reconfigureGridColumns: function() {
        var me = this;
        var label = '결재';
        switch (me.view.aproType) {
            case '2':
                label = '합의';
                break;
            case '3':
                label = '협의';
                break;
            case '9':
                label = '수신';
                break;
        }
        var columns = [];
        me.apro_grid.reconfigure(me.apro_grid.getStore(), columns);
        if ((me.view.aproType === '1') || (me.view.aproType === '2')) {
            columns = columns.concat([
                {
                    text: Ext.String.format('{0}순서', label),
                    dataIndex: 'sq_apro',
                    align: 'center',
                    width: 80
                }
            ]);
        }
        else {
            columns = columns.concat([
                {
                    xtype: 'rownumberer',
                    text: '순번',
                    dataIndex: 'sq',
                    align: 'center',
                    width: 60,
                    renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                        var nv = rowIndex + 1;
                        return nv;
                    }
                }
            ]);
        }
        columns = columns.concat([
            {
                text: Ext.String.format('{0}상태', label),
                dataIndex: 'fg_ea002',
                sortable: false,
                resizable: false,
                align: 'center',
                width: 100,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    var nm002 = Ext.isEmpty(value) ? '' : Terp.app.getController('TerpCommon').commonCodeRender(value , 'EA002');
                    if (record.get('fg_ea050') === '1') {
                        if ((record.get('sq_apro') === 1) && (record.get('cd_e_apro') === me.commonFn.getUserInfo().cd_e) && (record.get('fg_ea002') > '000') && (store.getCount() > 1)) {
                            nm002 = '상신';
                        }
                    }
                    else if (record.get('fg_ea050') === '3') {
                        if (Ext.isEmpty(value) || (value === '000')) {
                            nm002 = '미완료';
                        }
                    }
                    else if (record.get('fg_ea050') === '9') {
                        if (Ext.isEmpty(value) || (value === '000')) {
                            nm002 = '미확인';
                        }
                    }
                    return nm002;
                }
            },
            {
                text: Ext.String.format('{0}일시', label),
                dataIndex: 'dt_apro',
                sortable: false,
                resizable: false,
                align: 'center',
                width: 150,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    return Ext.Date.format(Ext.Date.parse(value,'YmdHisu'),'Y-m-d H:i:s');
                }
            },
            {
                text: Ext.String.format('{0}자명', label),
                dataIndex: 'nm_e_apro',
                sortable: false,
                width: 200,
                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                    return Ext.String.format('{0} ({1}{2})', value, record.get('nm_hr020_apro'), (Ext.isEmpty(record.get('nm_hr010_apro')) ? '' : '/'+record.get('nm_hr010_apro')));
                }
            },
            {
                text: '부서명',
                dataIndex: 'nm_o_apro',
                sortable: false,
                width: 200
            }
        ]);
        me.apro_grid.reconfigure(me.apro_grid.getStore(), columns);
    }

});