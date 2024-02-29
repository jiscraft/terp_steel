/**
 * Created by jiscr on 2022-01-17.
 */
Ext.define('Terp.view.main.mainboard.MainboardModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.mainboard',

    requires: [
        'Ext.data.proxy.Ajax',
        'Ext.data.reader.Json'
    ],

    stores: {
        mainboard_form1_store :{
            config:{
                proxy: {
                    type :'ajax',
                    url:'/ServerPage/bb/bb_ntc.jsp',
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
        mainboard_grid1_store :{
            config:{
                proxy: {
                    type :'ajax',
                    url:'/ServerPage/bb/bb_ntc.jsp',
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

        mainboard_grid1_info_store :{
            config:{
                proxy: {
                    type :'ajax',
                    url:'/ServerPage/bb/bb_ntc.jsp',
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

        // mainboard_grid2_store :{
        //     config:{
        //         proxy: {
        //             type :'ajax',
        //             url:'/ServerPage/bb/bb_ntc.jsp',
        //             params:{
        //                 sendData :''
        //             },
        //             reader :{
        //                 type:'json',
        //                 rootProperty: 'data',
        //                 keepRawData: true
        //             }
        //         },
        //         autoLoad: false
        //     }
        // }

        mainboard_grid3_store :{
            config:{
                proxy: {
                    type :'ajax',
                    url:'/ServerPage/bb/bb_ntc.jsp',
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
        headFormData : null ,
        formData : null
    }
});