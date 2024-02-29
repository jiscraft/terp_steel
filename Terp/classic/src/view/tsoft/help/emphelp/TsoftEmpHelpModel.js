/**
 * Created by Andrew on 2021-09-18.
 */
Ext.define('Terp.view.tsoft.help.emphelp.TsoftEmpHelpModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.tsoftemphelp',

    requires: [
        'Ext.data.proxy.Ajax',
        'Ext.data.reader.Json'
    ],

    stores: {
        tsoftemphelp_grid_store: {
            config: {
                proxy: {
                    type: 'ajax',
                    url: '/ServerPage/ma/ma_emp.jsp',
                    params: {
                    },
                    reader: {
                        type: 'json',
                        rootProperty: 'data',
                        keepRawData: true
                    }
                },
                autoLoad: false
            }
        }
    },

    data: {
        p_search: '',
        fg_workstatus: '1',
        realValue: '',
        displayValue: '',
        cdovalue: ''
    }

});