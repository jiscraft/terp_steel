/**
 * Created by Andrew on 2020-10-17.
 */
Ext.define('Terp.view.tsoft.common.erpmsgwin.ErpMsgWindowModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.erpmsgwin',
	requires: [
		'Ext.data.proxy.Ajax',
		'Ext.data.reader.Json'
	],

	stores: {
		ErpMsgWin_grid_store: {
			config:{
				proxy: {
					type :'ajax',
					url:'../ServerPage/sy/sy_erp_msg_selectdoc.jsp',
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
		/* This object holds the arbitrary data that populates the ViewModel and is then available for binding. */
	}
});