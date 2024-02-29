/**
 * Created by Andrew on 2021-10-21.
 */
Ext.define('Terp.view.gw.ea.common.eadocgrid.EaDocGrid', {
    extend: 'Terp.view.tsoft.componentbase.TsoftGrid',
    xtype: 'eadocgrid',

    requires: [
        'Ext.grid.column.RowNumberer',
        'Terp.view.gw.ea.common.eadocgrid.EaDocGridController',
        'Terp.view.gw.ea.common.eadocgrid.EaDocGridModel'
    ],

    controller: 'eadocgrid',
    viewModel: {
        type: 'eadocgrid'
    },

    title: '기안목록',
    hiddenTools: 'all',
    //selModel: 'checkboxmodel',

    store: { fields: [] },

    columns: [
        {
            text: '순번',
            dataIndex: 'sq',
            xtype: 'rownumberer',
            align: 'center',
            width: 60,
            renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                var nv = rowIndex + 1;
                return nv;
            }
        },
        {
            text: '결재상태',
            dataIndex: 'fg_ea001',
            hideable: false,
            align: 'center',
            width: 80,
            renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                if(value == '40' || value == '30')
                {
                    metaData.style = "color:red;";
                }
                if(value == '20')
                {
                    metaData.style = "color:blue;";
                }
                return Ext.isEmpty(value) ? '' : ((value === '10') ? '진행' : Terp.app.getController('TerpCommon').commonCodeRender(value , 'EA001'));



            }
        },
        {
            text: '결재번호',
            dataIndex: 'cd_doc',
            resizable: false,
            align: 'center',
            width: 120
        },
        {
            text: '기안일자',
            dataIndex: 'dt_doc',
            resizable: false,
            align: 'center',
            width: 100,
            renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                return Ext.Date.format(Ext.Date.parse(value.substring(0,8),'Ymd'),'Y-m-d');
            }
        },
        {
            text: '서식구분',
            dataIndex: 'nm_ea040',
            width: 120
        },


        {
            text: '협의상태',
            dataIndex: 'yn_cc_read',
            hideable: false,
            resizable: false,
            align: 'center',
            width: 100,
            hidden: true,
            renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                return Ext.isEmpty(value) ? 'N' : ((value === 'Y') ? '협의완료' : '협의미완료');
            }
        },
        {
            text: '수신상태',
            dataIndex: 'yn_rcv_read',
            hideable: false,
            resizable: false,
            align: 'center',
            width: 100,
            hidden: true,
            renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                return Ext.isEmpty(value) ? 'N' : ((value === 'Y') ? '수신확인' : '수신미확인');
            }
        },

        {
            text: '기안제목',
            dataIndex: 'dc_title',
            width: 380
        },
        {
            text: '기안자',
            dataIndex: 'nm_e',
            width: 160,
            renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                return Ext.String.format('{0} ({1}{2})', value, record.get('nm_hr020'), (Ext.isEmpty(record.get('nm_hr010')) ? '' : '/'+record.get('nm_hr010')));
            }
        },
        {
            text: '현장',
            dataIndex: 'cd_site',
            width: 120
        },
        {
            text: '현장명',
            dataIndex: 'nm_site',
            width: 280
        },
        {
            text: '기안부서',
            dataIndex: 'nm_o',
            width: 100
        },
        {
            text: 'ERP문서',
            dataIndex: 'yn_erp',
            align: 'center',
            width: 80,
            renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                return (value === 'Y') ? 'Y' : 'N';
            }
        },
        {
            text: '재작성',
            dataIndex: 'yn_re',
            align: 'center',
            width: 80,
            renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                return (value === 'Y') ? 'Y' : 'N';
            }
        },

        {
            text: '기안구분',
            dataIndex: 'nm_ea010',
            width: 100
        },
        {
            text: '문서구분',
            dataIndex: 'nm_ea030',
            width: 100
        },
        {
            text: '우선순위',
            dataIndex: 'fg_prior',
            align: 'center',
            width: 80,
            renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                return (value === '9') ? '긴급' : '일반';
            }
        }

    ]

});
