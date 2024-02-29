/**
 * Created by Andrew on 2016. 8. 9..
 */
Ext.define('Terp.view.tsoft.help.contracthelp.TsoftContractHelp', {
	extend: 'Terp.view.tsoft.componentbase.TsoftWindow',
	xtype: 'tsoftcontracthelp',
	requires: [
		'Ext.button.Button',
		'Ext.grid.column.Column',
		'Ext.grid.column.Number',
		'Ext.layout.container.Table',
		'Ext.layout.container.VBox',
		'Ext.toolbar.Spacer',
		'Terp.view.tsoft.componentbase.TsoftComboBox',
		'Terp.view.tsoft.componentbase.TsoftDateFieldDouble',
		'Terp.view.tsoft.componentbase.TsoftGrid',
		'Terp.view.tsoft.componentbase.TsoftPanel',
		'Terp.view.tsoft.componentux.TsoftPartnerHelpField',
		'Terp.view.tsoft.componentux.TsoftSearchForm',
		'Terp.view.tsoft.componentux.TsoftSiteHelpField'
	],
	controller: 'tsoftcontracthelp',
	viewModel: {
		type:'tsoftcontracthelp'
	},

	width: 900 ,
	height: 600,
	padding: '5 5 5 5',
	title: '현장 계약정보 선택 도우미',

	layout: {
		type: 'vbox',
		align: 'stretch'
	},

	items: [
		{
			xtype: 'tsoftpanel',
			items:[
				{
					xtype: 'button',
					text: '  조 회',
					height: 26,
					width: 80,
					handler: 'onSelect',
					cls: 'x-btn-default-small-custom',
					iconCls: 'myselectimagebutton',
					scale: 'small',
					iconAlign: 'left'
				}
			]

		},
		{
			xtype: 'tbspacer',
			height: 5
		},
		{
			xtype: 'tsoftsearchform' ,
			name: 'tsoftsearchform_contract',
			layout: {
				type: 'table',
				columns: 2
			},
			defaults: {
				width: 240,
				labelSeparator: ' ',
				labelAlign: 'right',
				labelWidth: 60,
				validateOnChange: false,
				validateOnBlur: false,
				enableKeyEvents: true,
				msgTarget: 'title'
			},
			bodyPadding: '5 5 0 5',
			scrollable: true,
			items:[
				{
					xtype: 'tsoftsitehelpfield',
					fieldLabel: '현장',
					name: 'cd_site',
					tabIndex: 3
				}
			]
		},
		{
			xtype: 'tsoftgrid',
			name: 'contracthelp_grid',
			bind: {
				store: '{contracthelp_store}'
			},
			flex: 1,
			columnLines: true,
			scrollable: true,
			header: false,
			columns: [
				{
					xtype: 'gridcolumn',
					dataIndex: 'cd_site',
					text: '현장코드'
				},
				{
					xtype: 'gridcolumn',
					dataIndex: 'nm_site',
					text: '현장명',
					width: 200
				},
				{
					xtype: 'gridcolumn',
					dataIndex: 'ln_contract',
					text: '계약번호'
				},
				{
					xtype: 'gridcolumn',
					dataIndex: 'nm_contract',
					text: '계약명',
					width: 300
				},
				{
					xtype: 'gridcolumn',
					dataIndex: 'nm_sector',
					text: '부문',
					width: 150
				}
			],
			listeners:{
				itemdblclick:  'onItemDbclickGrid1'
			}
		}
	]
});