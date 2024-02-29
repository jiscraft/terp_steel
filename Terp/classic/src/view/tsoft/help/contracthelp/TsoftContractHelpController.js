/**
 * Created by Andrew on 2016. 8. 9..
 */
Ext.define('Terp.view.tsoft.help.contracthelp.TsoftContractHelpController', {
	extend: 'Ext.app.ViewController',
	alias: 'controller.tsoftcontracthelp',

	init: function(obj , params ) {
		var me = this;
		me.openPanel = obj;
		me.commonFn = Terp.app.getController('TerpCommon');
		me.onSelect();
	} ,

	onSelect : function(){
		var me = this;
		var formData = this.getView().down('[name = tsoftsearchform_contract]');
		var sendDataJsonEncode = formData.makeSendData('help');
		this.getViewModel().getStore('contracthelp_store').load({
			params :{
				sendData : sendDataJsonEncode
			},
			callback : me.onSelectCallback,
			scope : me
		})
	},

	onSelectCallback : function(records, operation , success){
		if(success != true ){
			Ext.Msg.alert('fail',this.getViewModel().getStore('contracthelp_store').getProxy().getReader().rawData.msg);
		}else{

		}
	},

	onItemDbclickGrid1 : function(obj, selected, eOpts){
		if (this.getView().showMode === 'POP') {
			if (this.getView().callback) this.getView().callback(selected.data);
		}
		else {
			if (this.openPanel) this.openPanel.callbackPopup(selected.data);
		}
		this.view.close();
	}
});