/**
 * Created by bkoh on 2016-05-27.
 */
Ext.define('Terp.view.tsoft.messagesender.TsoftMessageSender', {
	extend: 'Ext.window.Window',
	xtype: 'tsoftmessagesender',
	requires: [
		'Ext.form.field.Tag',
		'Ext.form.field.TextArea',
		'Ext.layout.container.VBox',
		'Terp.view.tsoft.componentbase.TsoftForm',
		'Terp.view.tsoft.componentbase.TsoftTextField',
		'Terp.view.tsoft.messagesender.TsoftMessageSenderController'
	],
	controller: 'tsoftmessagesender',

	title: '메시지 작성',
	closable: true,
	items: [{
		xtype: 'tsoftform',
		reference: 'MsgInputForm',
		layout :{
			type : 'vbox',
			align : 'stretch'
		},
		defaults: {
			labelWidth: 60,
			labelSeparator: ''
		},
		defaultType: 'textfield',
		items: [
			{
				xtype: 'tagfield',
				reference: 'MsgRecvTagFld',
				name: 'RECV',
				fieldLabel: '받을 사람',
				store: { fields: [ 'text', 'nm_o', 'id_user' ] },
				displayField: 'nm_o',
				valueField: 'id_user',
				inputType: 'hidden',
				queryMode: 'local',
				filterPickList: true,
				tabIndex: 201,
				listeners: {
					expand: Ext.emptyFn
				}
			},
			{
				xtype: 'tsofttextfield',
				fieldLabel: '메시지 제목',
				name: 'DC_TITLE',
				allowBlank: false,
				enforceMaxLength: true,
				maxLength: 50,
				emptyText: '보내실 메시지 제목을 입력하세요...',
				tabIndex: 202
			},
			{
				xtype: 'textareafield',
				name: 'DC_MSG',
				fieldLabel: '메시지 내용',
				labelAlign: 'top',
				enforceMaxLength: true,
				maxLength: 1000,
				height: 200,
				allowBlank: false,
				emptyText: '보내실 메시지 내용을 입력하세요...',
				//value: '사용자 검색에서 보내는 테스트 메시지입니다.',
				tabIndex: 203,
				listeners: {
					boxready: function(fld) {
						fld.focus();
					}
				}
			}
		]
	}],
	width: 400,
	bodyPadding: 10,
	alwaysOnTop: true ,
	modal: true ,

	buttons: [{
		text: '보내기',
		listeners: {
			click: 'onSendClick'
		}
	}],

	initComponent: function () {
		this.defaults = {
			anchor: '100%',
			labelWidth: 120
		};
		this.callParent();
	}
});