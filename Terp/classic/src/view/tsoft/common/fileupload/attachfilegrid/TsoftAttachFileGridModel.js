/**
 * Created by Andrew on 2016-06-10.
 */
Ext.define('Terp.view.tsoft.common.fileupload.attachfilegrid.TsoftAttachFileGridModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.tsoftattachfilegrid',
	requires: [
		'Ext.data.proxy.Ajax',
		'Ext.data.reader.Json'
	],

	stores: {
		tsoftattachfilegrid_store: {
			config: {
				fields: [
					{ name: 'started', type: 'boolean' },
					{ name: 'progress', type: 'int' },
					{ name: 'completed', type: 'boolean' },
					{ name: 'success', type: 'boolean' },
					{ name: 'file_data', type: 'auto' },
					{ name: 'file_info', type: 'string' }
				],
				proxy: {
					type:'ajax',
					url: '/ServerPage/sy/sy_files.jsp',
					method: 'POST',
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
        /* This object holds the arbitrary data that populates the ViewModel and is then available for binding. */
    }
});