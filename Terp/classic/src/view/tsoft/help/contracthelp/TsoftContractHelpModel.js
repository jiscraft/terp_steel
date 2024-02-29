/**
 * Created by Andrew on 2016. 8. 9..
 */
Ext.define('Terp.view.tsoft.help.contracthelp.TsoftContactHelpModel', {
	extend: 'Ext.app.ViewModel',
	alias: 'viewmodel.tsoftcontracthelp',

	requires: [
		'Ext.data.proxy.Ajax',
		'Ext.data.reader.Json'
	],

	stores: {
		contracthelp_store :{
			config:{
				proxy: {
					type :'ajax',
					url:'../ServerPage/cn/cn_site_contract_help.jsp',
					params:{
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
		p_search :''
	}
});