/**
 * Created by jiscraft on 2023-09-23.
 */
Ext.define('Terp.view.pm.pm22i2202.Pm22i2202Model', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.pm22i2202',

    requires: [
        'Ext.data.proxy.Ajax',
        'Ext.data.reader.Json'
    ],

    stores: {
        pm22i2202_form_store :{
            config:{
                proxy: {
                    type :'ajax',
                    url:'/ServerPage/pm/pm_po_h.jsp',
                    params:{
                        sendData :''
                    },
                    reader :{
                        type:'json',
                        rootProperty: 'data',
                        keepRawData: true
                    }
                },
                autoLoad: false
            }
        },
        pm22i2202_grid1_store :{
            config:{
                proxy: {
                    type :'ajax',
                    url:'/ServerPage/pm/pm_po_l.jsp',
                    params:{
                        sendData :''
                    },
                    reader :{
                        type:'json',
                        rootProperty: 'data',
                        keepRawData: true
                    }
                },
                autoLoad: false
            }
        },
        pm22i2202_grid2_store :{
            config:{
                proxy: {
                    type :'ajax',
                    url:'/ServerPage/mm/mm_rv_l.jsp',
                    params:{
                        sendData :''
                    },
                    reader :{
                        type:'json',
                        rootProperty: 'data',
                        keepRawData: true
                    }
                },
                autoLoad: false
            }
        },
        pm22i2202_con_store :{
            config:{
                proxy: {
                    type :'ajax',
                    url:'/ServerPage/ma/ma_contact.jsp',
                    actionMethods: {
                        create :'POST',
                        read :'POST',
                        update :'POST',
                        destroy :'POST'
                    },
                    params:{
                        sendData :''
                    },
                    reader :{
                        type:'json',
                        rootProperty: 'data',
                        keepRawData: true
                    }
                },
                autoLoad: false
            }
        }
    },

    data: {
        formData : null
        //
        //     {
        //     actiondata :'',
        //     actionDetailData : '',
        //     loginIduser : '',
        //     cd_c : '',
        //     no_po : '',
        //     dt_po :'',
        //     cd_o : '',
        //     cd_e : '',
        //     nm_o : '',
        //     nm_e : '',
        //     cd_p : '',
        //     cd_p_tax : '',
        //     dc_encharge : '',
        //     dc_tel : '',
        //     fg_pm010 : '',
        //     nm_pm020 : '',
        //     fg_po : '',
        //     cd_e_request : '',
        //     fg_tax :'',
        //     dc_remark : '',
        //     fg_pm020 : '',
        //     nm_pm020 : '',
        //     cd_site : '',
        //     no_so : '',
        //     no_pr : '',
        //     no_wo : '',
        //     id_row : ''
        //
        // }
    }
});