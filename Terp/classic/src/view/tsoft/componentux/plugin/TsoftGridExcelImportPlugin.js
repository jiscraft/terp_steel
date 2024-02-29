/**
 * Created by Andrew on 2016. 8. 4..
 */
Ext.define('Terp.view.tsoft.componentux.plugin.TsoftGridExcelImportPlugin', {
	extend: 'Ext.grid.plugin.Clipboard',
	alias: 'plugin.tsoftgridexcelimportplugin',
	requires: [
		'Ext.data.Store'
	],

	putCellData: function(data, format) {
		var me = this;
		var values = Ext.util.TSV.decode(data);
		console.log(values);
		var colMaxLength = 0;
		for (var r=0; r<values.length; r++) {
			if (values[r].length > colMaxLength) colMaxLength = values[r].length;
		}
		var cols = [];
		for (var c=0; c<colMaxLength; c++) {
			var colHeaderText = me.getColumnHeaderText(c);
			cols.push({
				dataIndex: colHeaderText,
				text: colHeaderText,
				draggable: false
			});
		}
		var storeData = [];
		for (var r=0; r<values.length; r++) {
			var rowData = {};
			for (var c=0; c<values[r].length; c++) {
				var colHeaderText = me.getColumnHeaderText(c);
				rowData[colHeaderText] = values[r][c];
			}
			storeData.push(rowData);
		}
		console.log(storeData);
		var store = Ext.create('Ext.data.Store', {
			storeId: 'test',
			data: storeData,
			autoLoad: true
		});
		me.cmp.reconfigure(store, cols);
	},

	getColumnHeaderText: function(idx) {
		var me = this;
		var mod = idx % 26;
		var str = String.fromCharCode(65 + mod);
		var num = parseInt((idx / 26), 10);
		return (num > 0) ? me.getColumnHeaderText(num - 1) + str : str;
	}

});

