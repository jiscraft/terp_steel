/**
 * Created by jiscr on 2022-01-29.
 */
Ext.define('Terp.view.bb.bb22a2901.Bb22a2901Model', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.bb22a2901',

    requires: [
        'Ext.data.proxy.Ajax',
        'Ext.data.reader.Json'
    ],

    stores: {
        bb22a2901_grid1_store :{
            config:{
                proxy: {
                    type :'ajax',
                    url:'/ServerPage/bb/bb_archive.jsp',
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
        bb22a2901_grid2_store :{
            config:{
                proxy: {
                    type :'ajax',
                    url:'/ServerPage/sy/sy_files.jsp',
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

    }
});