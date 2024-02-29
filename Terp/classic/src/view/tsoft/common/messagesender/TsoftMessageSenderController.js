/**
 * Created by bkoh on 2016-05-27.
 */
Ext.define('Terp.view.tsoft.messagesender.TsoftMessageSenderController', {
	extend: 'Ext.app.ViewController',
	alias: 'controller.tsoftmessagesender',

	init: function () {
		var me = this;
		me.initRecvTagFldData();
	},

	initRecvTagFldData: function() {
		var me = this;
		var form = this.lookupReference('MsgInputForm');
		var recvUserInfo = me.getView().RecvUserInfo;
		var recvFld = this.lookupReference('MsgRecvTagFld');
		var recvStore = recvFld.getStore();
		var recvStoreData = [];
		var recvValues = [];

		console.clear();
		console.log(recvFld, recvUserInfo, recvUserInfo.get('fg_o'));
		if ((recvUserInfo.get('fg_o') === '1') || (recvUserInfo.get('fg_o') === '3')) {
			recvStoreData.push(recvUserInfo.getData());
			recvValues.push(recvUserInfo.get('id_user'));
		}
		else {
			recvUserInfo.cascadeBy(function(node) {
				if ((node.get('fg_o') === '1') || (node.get('fg_o') === '3')) {
					recvStoreData.push(node.getData());
					recvValues.push(node.get('id_user'));
				}
				console.log(node.get('text'));
			})
		}
		recvFld.getStore().loadData(recvStoreData);
		recvFld.setValue(recvValues);
		console.log(recvValues, recvStoreData, recvFld.getStore());
		console.log(recvFld);
	},

	onSendClick: function () {
		// var me = this;
		// var form = this.lookupReference('MsgInputForm');
		// var values = form.getValues();
		// console.clear();
		// console.log(values);
		//
		// if (Ext.isEmpty(values.RECV)) {
		// 	Ext.Msg.alert('오류', '메시지를 받을 사용자를 선택하세요!', function () {
		// 		form.getForm().findField('RECV').focus();
		// 	});
		// 	return false;
		// }
		// if (Ext.isEmpty(values.DC_TITLE)) {
		// 	Ext.Msg.alert('오류', '보내실 메시지 제목을 입력하세요!', function () {
		// 		form.getForm().findField('DC_TITLE').focus();
		// 	});
		// 	return false;
		// }
		// if (Ext.isEmpty(values.DC_MSG)) {
		// 	Ext.Msg.alert('오류', '보내실 메시지 내용을 입력하세요!', function () {
		// 		form.getForm().findField('DC_MSG').focus();
		// 	});
		// 	return false;
		// }
		//
		// var commonFn = Terp.app.getController('TerpCommon');
		// var loginUserInfo = commonFn.getUserInfo();
		// var recvUserInfo = me.getView().RecvUserInfo;
		// var recvFld = this.lookupReference('MsgRecvTagFld');
		// var recvValueStore = recvFld.valueStore;
		// console.log(form, loginUserInfo, recvUserInfo, values, recvValueStore);
		//
		// var recvTargets = [];
		// recvValueStore.each(function(rec) {
		// 	recvTargets.push({
		// 		ID_USER: rec.get('id_user'),
		// 		NM_USER: rec.get('nm_o')
		// 	});
		// });
		// console.log(recvTargets);
		//
		// var sendDataJson = [
		// 	{
		// 		ID_USER: loginUserInfo.id_user,
		// 		NM_USER: loginUserInfo.nm_user,
		// 		DC_TITLE: values.DC_TITLE,
		// 		DC_MSG: values.DC_MSG,
		// 		DTS_ACT: values.DTS_ACT,
		// 		RECV_TARGETS: recvTargets
		// 	}
		// ];
		// console.log(sendDataJson);
		//
		// sendDataJson[0].ID_MSG = commonFn.sqlRowId();
		// console.log(sendDataJson);
		//
		// me.getView().mask('메시지를 보내고 있습니다...');
		// Ext.Ajax.request({
		// 	url: '/ServerPage/msg/sendTerpMessage.jsp',
		// 	params: {
		// 		sendData: Ext.encode(sendDataJson)
		// 	},
		// 	success: function (res) {
		// 		me.getView().unmask();
		// 		var obj = Ext.JSON.decode(res.responseText);
		// 		if (obj.success) {
		// 			me.getView().close();
		// 			commonFn.toastMessage('정상적으로 메시지를 보냈습니다', 'b');
		// 		}
		// 		else {
		// 			Ext.Msg.alert('오류', '정상적으로 메시지를 보내지 못했습니다');
		// 		}
		// 	},
		// 	fail: function () {
		// 		me.getView().unmask();
		// 		Ext.Msg.alert('오류', '데이타처리중 오류가 발생했습니다');
		// 	}
		// });
	}

});