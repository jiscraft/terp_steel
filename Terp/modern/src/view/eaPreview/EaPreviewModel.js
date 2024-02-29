/**
 * Created by Andrew on 2021-12-14.
 */
Ext.define('Terp.view.eaPreview.EaPreviewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.eapreview',

    stores: {
        preview_apro1_store: {
            config: {
                proxy: {
                    type: 'ajax',
                    url: '/ServerPage/gw/ea/ea_doc_apro.jsp',
                    method: 'POST',
                    reader: {
                        type: 'json',
                        rootProperty: 'data',
                        keepRawData: true
                    }
                },
                autoLoad: false
            }
        },
        preview_apro2_store: {
            config: {
                proxy: {
                    type: 'ajax',
                    url: '/ServerPage/gw/ea/ea_doc_apro.jsp',
                    method: 'POST',
                    reader: {
                        type: 'json',
                        rootProperty: 'data',
                        keepRawData: true
                    }
                },
                autoLoad: false
            }
        },
        preview_apro3_store: {
            config: {
                proxy: {
                    type: 'ajax',
                    url: '/ServerPage/gw/ea/ea_doc_apro.jsp',
                    method: 'POST',
                    reader: {
                        type: 'json',
                        rootProperty: 'data',
                        keepRawData: true
                    }
                },
                autoLoad: false
            }
        },
        preview_apro4_store: {
            config: {
                proxy: {
                    type: 'ajax',
                    url: '/ServerPage/gw/ea/ea_doc_apro.jsp',
                    method: 'POST',
                    reader: {
                        type: 'json',
                        rootProperty: 'data',
                        keepRawData: true
                    }
                },
                autoLoad: false
            }
        },
        preview_attach_store: {
            config: {
                proxy: {
                    type: 'ajax',
                    url: '/ServerPage/sy/sy_files.jsp',
                    method: 'POST',
                    reader: {
                        type: 'json',
                        rootProperty: 'data',
                        keepRawData: true
                    }
                },
                autoLoad: false
            }
        },
        preview_ref_store: {
            config: {
                proxy: {
                    type: 'ajax',
                    url: '/ServerPage/gw/ea/ea_doc_ref.jsp',
                    method: 'POST',
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
        /* This object holds the arbitrary data that populates the ViewModel and is then available for binding. */
    }
});