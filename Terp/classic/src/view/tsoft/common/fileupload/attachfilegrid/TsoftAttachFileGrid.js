/**
 * Created by Andrew on 2016-06-09.
 */
Ext.define('Terp.view.tsoft.common.fileupload.attachfilegrid.TsoftAttachFileGrid', {
    extend: 'Terp.view.tsoft.componentbase.TsoftGrid',
	xtype: 'tsoftattachfilegrid',
	requires: [
		'Ext.form.field.File',
		'Ext.grid.column.Boolean',
		'Ext.grid.column.Number',
		'Ext.grid.column.RowNumberer',
		'Ext.grid.column.Widget',
		'Terp.view.tsoft.common.fileupload.attachfilegrid.TsoftAttachFileGridController',
		'Terp.view.tsoft.common.fileupload.attachfilegrid.TsoftAttachFileGridModel',
		'Terp.view.tsoft.componentux.plugin.TsoftFileDropperPlugin'
	],

	controller: 'tsoftattachfilegrid',
	viewModel: {
		type: 'tsoftattachfilegrid'
	},

	title : '첨부파일',
	iconCls: 'far fa-file',
	rowLines: true,
	hiddenTools: [ 'edit', 'save', 'copy', 'export', 'import', 'cancel' ],
	headerOverCls: { borderColor: '#3036c1', borderStyle: 'solid' , backgroundColor : '#3036c1'  },
	// headerOverCls:
	cls: 'tsoft-component-attach-file-grid',
	selModel: 'checkboxmodel',
	maxUploadFiles: 20,
	enableDownload: true,

	// bind: {
	// 	store: '{tsoftattachfilegrid_store}'
	// },
	store: { fields: [] },

	plugins: [{
		ptype: 'tsoftfiledropperplugin',
		callback: function(files) {
			this.target.getController().onDropFiles(files);
		}
	}],

	columns:[
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
			text: '파일명',
			dataIndex: 'dc_src_name',
			width : 300,
			renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
				var grid = view.grid;
				if (grid.enableDownload) {
					var uri = '/ServerPage/common/download.jsp';
					var path = record.get('dc_save_path');
					var originalFile = record.get('originalFile');
					// if (path == 'files/OLD/DOCU_REF'){
					// console.log(path.substr(0,10));
					if ( originalFile !='' ){
						var fn = Ext.String.format('{0}', record.get('originalFile'));
					} else if (path.substr(0,10) == 'files/OLD/') {
						var fn = Ext.String.format('{0}', record.get('dc_src_name'));
					} else{
						var fn = Ext.String.format('{0}.{1}', record.get('no_af'), record.get('dc_src_name').split('.').pop());
						// 20220222 var fn = Ext.String.format('{0}_{1}.{2}', record.get('no_af'), record.get('id_row_src'), record.get('dc_src_name').split('.').pop());
					}
					// var fn = Ext.String.format('{0}_{1}.{2}', record.get('no_af'), record.get('id_row_src'), record.get('dc_src_name').split('.').pop());
					var dfn = record.get('dc_src_name');
					value = Ext.String.format('<a href="javascript:downloadTerpFileFromUrl(\'{0}/{1}\', \'{3}\');">{3}</a>', path, fn, dfn.split('\'').join('\\\''), value);
					//value = Ext.String.format('<a href="javascript:downloadTerpFile(\'{0}\',\'{1}\',\'{2}\');">{3}</a>', path, fn, dfn.split('\'').join('\\\''), value);
				}
				return value;
			}
		},
		{
			xtype: 'numbercolumn',
			text: '크기',
			dataIndex: 'dc_src_size',
			format: '0,000 바이트',
			width : 150,
			align: 'right'
		},
		{
			xtype: 'booleancolumn',
			text: '결과',
			hidden: true,
			dataIndex: 'completed'
		},
		{
			xtype: 'widgetcolumn',
			text: '진행율',
			dataIndex: 'progress',
			width    : 120,
			hidden: true,
			widget: {
				xtype: 'progressbarwidget',
				textTpl: [
					'{percent:number("0")}%'
				]
			}
		}
	],

	dockedItems: [
		{
			xtype: 'toolbar',
			hidden: true,
			dock: 'bottom',
			items: [
				{
					xtype: 'filefield',
					buttonOnly: true,
					buttonText: '파일선택'
				}
			]
		}
	]

});