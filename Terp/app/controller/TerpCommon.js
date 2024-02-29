/**
 * Created by jiscraft on 2016-01-15.
 */
Ext.define('Terp.controller.TerpCommon', {
	extend: 'Ext.app.Controller',

	id: 'terpcommon',

	config: {
		id_user: '',
		nm_user: '',
		dc_pw: ''
	},

	loadCommonStores: function() {
		var me = this;
		var sendDataJson = [{
			'actiondata': 'all',
			'loginIduser': me.getUserInfo().id_user || '',
			'loginCdc': me.getUserInfo().cd_c || '',
			'dt_apply': me.getDateToString('','today',''),
			'fg_sy030': me.getUserInfo().fg_sy030
		}];

		me.clearCommonStores();

		me.loadCommonStore('CommonCode', sendDataJson);
		me.loadCommonStore('CommonCodel', sendDataJson);

		me.loadCommonStore('CommonMenu', sendDataJson, '/ServerPage/sy/sy_menutree.jsp');
		me.loadCommonStore('CommonUsers', sendDataJson, '/ServerPage/sy/sy_usertree.jsp');
		me.loadCommonStore('CommonOrg', sendDataJson, '/ServerPage/ma/ma_orgtree.jsp');

		me.loadCommonStore('CommonCompany', sendDataJson, '/ServerPage/ma/ma_company.jsp');
		me.loadCommonStore('CommonBusiness', sendDataJson, '/ServerPage/ma/ma_business.jsp');
		me.loadCommonStore('CommonSector', sendDataJson, '/ServerPage/ma/ma_sector.jsp');

		me.loadCommonStore('CommonPartner', sendDataJson, '/ServerPage/ma/ma_partner.jsp');
		me.loadCommonStore('CommonItem', sendDataJson, '/ServerPage/ma/ma_item.jsp');
		me.loadCommonStore('CommonWh', sendDataJson, '/ServerPage/ma/ma_wh.jsp');
		me.loadCommonStore('CommonSite', sendDataJson, '/ServerPage/ma/cn_site.jsp');
	},

	loadCommonStore: function(storeName, sendDataJson, proxyUrl, callback) {
		var me = this;
		var store = Terp.app.getStore(storeName);
		if (store.type === 'tree') {
			store.setProxy({
				type: 'ajax',
				url: proxyUrl
			});
		}
		store.load({
			params: {
				sendData: Ext.encode(sendDataJson)
			},
			callback: function(records, operation, success) {
				// console.log(storeName, store.data.items, store);
				if (callback) callback(records, operation, success);
			},
			scope: me
		});

	},

	clearCommonStores: function() {
		var me = this;

		me.clearCommonStore('CommonCode');
		me.clearCommonStore('CommonCodel');

		me.clearCommonStore('CommonMenu');
		me.clearCommonStore('CommonUsers');
		me.clearCommonStore('CommonOrg');

		me.clearCommonStore('CommonCompany');
		me.clearCommonStore('CommonBusiness');
		me.clearCommonStore('CommonSector');

		me.clearCommonStore('CommonPartner');
		me.clearCommonStore('CommonItem');
		me.clearCommonStore('CommonWh');
		me.clearCommonStore('CommonSite');
	},

	clearCommonStore: function(storeName) {
		var me = this;
		var store = Terp.app.getStore(storeName);
		if (store.type === 'tree') {
			store.getRoot().removeAll();
		}
		else {
			store.removeAll();
		}
		store.commitChanges();
	},

	getStoreItemData: function(store) {
		var retData = [];
		if (!Ext.isEmpty(store) && (store.getCount() > 0)) {
			Ext.Array.each(store.data.items, function(item) {
				retData.push(item.data);
			});
		}
		return retData;
	},



	//그리드내에서 공통코드값을 랜더하기 위해 사용한다..
	//kind는 공통코드값 MM010 , SY020등

	commonCodeRender: function (value, kind, nmKind) {
		//console.log(value , kind , nmKind);
		if (value == '' || value == null) {
			return '';
		}
		if (value == '소계' || value == '합계') {
			return value;
		}
		var store = Ext.getStore('CommonCode');
		var v = store.queryBy(function (record, id) {
			return (record.get('cd_codeh') == kind && record.get('cd_codel') == value);
		});
		if (v.length > 0 && v != undefined) {
			return v.items[0].data.nm_codel
		}
		else {
			return '';
		}
	},
	commonCodelRender: function (value, kind, key, nmKind) {
		if (value == '' || value == null || kind =='' || kind == null || key == '' || key == null) {
			return '';
		}
		var store = Ext.getStore('CommonCodel');

		var v = store.queryBy(function (record, id) {
			return (record.get('cd_codeh') == kind && record.get('cd_codel') == value && record.get('cd_codell') == key );
		});
		if (v.length > 0 && v != undefined) {
			return v.items[0].data.nm_codell
		}
		else {
			return '';
		}
	},
	commonBusinessRender: function (value) {
		//console.log(value , kind , nmKind);
		if (value == '' || value == null) {
			return '';
		}
		var store = Ext.getStore('CommonBusiness');
		var v = store.queryBy(function (record, id) {
			return (record.get('cd_b') == value);
		});
		if (v.length > 0 && v != undefined) {
			return v.items[0].data.nm_b;
		}
		else {
			return '';
		}
	},
	commonPartnerRender: function (value) {
		//console.log(value , kind , nmKind);
		if (value == '' || value == null) {
			return '';
		}
		var store = Ext.getStore('CommonPartner');
		var v = store.queryBy(function (record, id) {
			return (record.get('cd_p') == value);
		});
		if (v.length > 0 && v != undefined) {
			return v.items[0].data.nm_p;
		}
		else {
			return '';
		}
	},
	commonItemRender: function (value) {
		//console.log(value , kind , nmKind);
		if (value == '' || value == null) {
			return '';
		}
		var store = Ext.getStore('CommonItem');
		var v = store.queryBy(function (record, id) {
			return (record.get('cd_i') == value);
		});
		if (v.length > 0 && v != undefined) {
			return v.items[0].data.nm_i;
		}
		else {
			return '';
		}
	},
	commonSiteRender: function (value) {
		if (value == '' || value == null) {
			return '';
		}
		var store = Ext.getStore('CommonSite');
		var v = store.queryBy(function (record, id) {
			return (record.get('cd_site') == value);
		});
		if (v.length > 0 && v != undefined) {
			return v.items[0].data.nm_site;
		}
		else {
			return '';
		}
	},
	commonWhRender: function (value) {
		if (value == '' || value == null) {
			return '';
		}
		var store = Ext.getStore('CommonWh');
		var v = store.queryBy(function (record, id) {
			return (record.get('cd_w') == value);
		});
		if (v.length > 0 && v != undefined) {
			return v.items[0].data.nm_w;
		}
		else {
			return '';
		}
	},
	commonSiteZoneRender: function (value) {
		if (value == '' || value == null) {
			return '';
		}
		var store = Ext.getStore('CommonSiteZone');
		var v = store.queryBy(function (record, id) {
			return (record.get('cd_zone') == value);
		});
		if (v.length > 0 && v != undefined) {
			return v.items[0].data.nm_zone;
		}
		else {
			return '';
		}
	},
	//그리드내에서 직접value 콤보박스의 값을 렌더하기 위해 사용한다
	valueComboRender: function (store, value, colIdx) {

		if (value == '') {
			return '';
		}
		if (store.data.length == 0) {
			return "";
		}
		else {
			var i = store.find('field1', value);
			if (i >= 0) {
				return store.getAt(i).data.field2;
			}
			else {
				return ''
			}
		}
	},

	dzicubeAcct: function (value) {
		if (value == '' || value == null) {
			return '';
		}
		var store = Ext.getStore('DzicubeAcct');
		var v = store.queryBy(function (record, id) {
			return (record.get('acct_cd') == value);
		});
		if (v.length > 0 && v != undefined) {
			return v.items[0].data.acct_nm;
		}
		else {
			return '';
		}
	},

	//그리드내에서 데이트형식의 값을 랜더하기 위해 사용한다.
	dateRender: function (value) {
		if (value != '' && value != null) {
			return value.substr(0, 4) + '-' + value.substr(4, 2) + '-' + value.substr(6, 2);
		}
		else {
			return '';
		}
	},

	//그리드내에서 yearmonth의 값을 랜더하기 위해 사용한다.
	yearMonthRender: function (value) {
		if (value != '' && value != null) {
			return value.substr(0, 4) + '-' + value.substr(4, 2) ;
		}
		else {
			return '';
		}
	},


	//그리드내에서 yesno콤보 값을 랜더하기 위해 사용한다.
	yesnoRender: function (value) {
		if (value == 'Y' || value == 'y') {
			return '예';
		}
		else if (value == 'N' || value == 'n') {
			return '아니오';
		}
		else {
			return '';
		}
	},

	//로그인한 유저의 정보를 돌려준다
	getUserInfo: function (param) {
		var appmain = Ext.ComponentQuery.query('main')[0];
		var loginUserData = appmain.getViewModel().getData().loginUser || {};
		if (Ext.isEmpty(param)) {
			return loginUserData;
		}
		else {
			return (loginUserData.hasOwnProperty(param)) ? loginUserData[param] : '';
		}
	},

	getTodayInfo: function () {
		var result = '';
		var tdy = new Date();
		result = tdy.getFullYear().toString() + this.zeroPadding((tdy.getMonth() + 1).toString(), 2) + this.zeroPadding(tdy.getDate().toString(), 2);
		return result;
	},

	//date type 을 받아서 스트링으로 변환
	getDateToString: function (date, parameter, separator) {
		//parameter   today : 20150106  month : 01  year : 2015 date 06
		// date : '' 오늘일자를  값을주면 준값을
		//seperator  '' 없이
		var result = '';
		//console.log('변환되기전의값은',date);
		if (separator = null || separator == '') {
			separator = '';
		}
		else {
			separator = '-';
		}
		if (date == null || date == '') {
			var date = new Date();
		}
		if (parameter == null || parameter == '') {
			var parameter = 'today';
		}
		switch (parameter) {
			case 'year' :
				result = date.getFullYear().toString();
				break;
			case 'month' :
				result = this.zeroPadding((date.getMonth() + 1).toString(), 2);
				break;
			case 'date' :
				result = date.getDate().toString();
				break;
			case 'today' :
				result = date.getFullYear().toString() + separator + this.zeroPadding((date.getMonth() + 1).toString(), 2) + separator + this.zeroPadding(date.getDate().toString(), 2);
				break;
			case 'yearmonth' :
				result = date.getFullYear().toString() + separator + this.zeroPadding((date.getMonth() + 1).toString(), 2);
				break;
			default :
				result = date.getFullYear().toString() + separator + this.zeroPadding((date.getMonth() + 1).toString(), 2) + separator + this.zeroPadding(date.getDate().toString(), 2);
				break;
		}
		//console.log('변환된 후의값은',result);
		return result;
	},

	//현재페이지의 최상위 객체값을 돌려준다..( controller나 view모델을 사용하기 위해 )
	getTopOwnerCt: function (obj) {
		return obj.up('[name=thisPage]');
	},

	//date type 을 받아서 스트링으로 변환
	getStringToDate: function (dateString) {
		var result = '';
		var result = new Date(dateString.substr(0, 4), dateString.substr(4, 2) - 1, dateString.substr(6, 2));
		//console.log('stringTodate 변환된후의값은',result);
		return result;
	},

	//유저의 로그인 상태를 체크한다...
	onLoginStatusCheck: function () {
		var commonFn = Terp.app.getController('TerpCommon');
		//var rData = '';
		var formData = {
			'loginIduser': commonFn.getUserInfo().id_user
		};
		var sendDataJson = [];
		sendDataJson.push(formData);
		var sendDataJsonEncode = Ext.encode(sendDataJson);
		this.loginStatusRequest(sendDataJsonEncode, function (value) {
			//console.log('ajax결과',value);
			rData = value;
		});
		//console.log('return 결과',rData);
		return rData;
	},

	loginStatusRequest: function (sendDataJsonEncode, callback) {
		var me = this;
		var record;
		Ext.Ajax.request({
			url: '../ServerPage/login/userLoginStatus.jsp',
			params: {
				sendData: sendDataJsonEncode
			},
			async: false,
			failure: function (response) {
				var returnData = false;
				callback(returnData);
			},
			success: function (response) {
				var response = Ext.decode(response.responseText);
				//console.log(response);
				var returnData = response.success;
				callback(returnData);
			}
		});
	},
	setCommonSiteZone: function (obj,cdSite) {
		if (Ext.isEmpty(obj)) {
			// Terp.app.getController('TerpCommon').toastMessage('데이타를 처리할 스토어가 없습니다', 'b');
			return;
		}
		Ext.getStore('CommonSiteZone').suspendEvent();
		Ext.getStore('CommonSiteZone').filter('cd_site', cdSite);
		Ext.getStore('CommonSiteZone').each(function (record) {
			obj.getStore().add(record.copy());
		});
		Ext.getStore('CommonSiteZone').resumeEvent();


		// if (value == '' || value == null) {
		// 	return '';
		// }
		// var store = Ext.getStore('CommonSiteZone');
		// console.log(store)
		// var v = store.queryBy(function (record, id) {
		// 	return (record.get('cd_zone') == value);
		// });
		// if (v.length > 0 && v != undefined) {
		// 	return v.items[0].data.nm_zone;
		// }
		// else {
		// 	return '';
		// }
	},
	//공통코드를 스토어에 바인딩 ( 파라미터(obj) 를스토어를 가지고 있는 객체를 넘김 )
	//공통코드가 사용중인것만 사용하기 위해서는 fiterYn에 'Y'
	setCommonCode: function (obj, cdCodeH, filtertYn) {

		//OBJ 콤보박스를 가지고 있는 컴포넌트
		//console.log(obj);
		if (Ext.isEmpty(filtertYn)) {
			//모든코드를 다 가져와
			filtertYn = 'N'
		}
		if (Ext.isEmpty(obj)) {
			// Terp.app.getController('TerpCommon').toastMessage('데이타를 처리할 스토어가 없습니다', 'b');
			return;
		}
        Ext.getStore('CommonCode').suspendEvent();
		if (filtertYn === 'N') {
			Ext.getStore('CommonCode').filter('cd_codeh', cdCodeH);
		}
		else {
			Ext.getStore('CommonCode').filter('cd_codeh', cdCodeH);
			Ext.getStore('CommonCode').filter('yn_use', 'Y');
		}
		Ext.getStore('CommonCode').each(function (record) {
			obj.getStore().add(record.copy());
		});
		Ext.getStore('CommonCode').resumeEvent();
	},
	setCommonBusiness: function (obj , filtertYn) {

		//OBJ 콤보박스를 가지고 있는 컴포넌트
		//console.log(obj);
		if (Ext.isEmpty(filterYn)) {
			//모든코드를 다 가져와
			filtertYn = 'N'
		}
		if (Ext.isEmpty(obj)) {
			// Terp.app.getController('TerpCommon').toastMessage('데이타를 처리할 스토어가 없습니다', 'b');
			return;
		}
		Ext.getStore('CommonBusiness').suspendEvent();
		if (filtertYn === 'N') {
		}
		else {
			Ext.getStore('CommonBusiness').filter('yn_use', 'Y');
		}
		Ext.getStore('CommonBusiness').each(function (record) {
			obj.getStore().add(record.copy());
		});
		Ext.getStore('CommonBusiness').resumeEvent();
	},
	//공통코드를 스토어에 직접바인딩해줌 ( 파라미터를 스터어를 넘김 )
	setCommonCodeStore: function (obj, cdKind) {
		//obj = store임...( 상기는 컴포넌트 )
		Ext.getStore('CommonCode').suspendEvent();
		Ext.getStore('CommonCode').filter('cd_codeh', cdKind);
		Ext.getStore('CommonCode').each(function (record) {
			obj.add(record.copy());
		});
		Ext.getStore('CommonCode').resumeEvent();
	},
	setBidStore: function (obj, store) {
		Ext.getStore(store).suspendEvent();
		//Ext.getStore('CommonCode').filter('cd_codeh' , cdKind);
		Ext.getStore(store).each(function (record) {
			obj.add(record.copy());
		});
		Ext.getStore(obj).resumeEvent();
	},
	setDataBindComboBox: function (form, fieldName, value, name) {
		//form 변경할form , fieldName 변경할 폼네에 필드 name속성   , vale , name
		if (form == null || fieldName == null) {
			return;
		}
		var f = form.query('[name = ' + fieldName + ']')[0];
		f.getStore().removeAll();
		f.getStore().add({value: value, name: name});
		f.setValue(value);

	},
	setCommonPartner: function (obj , filtertYn) {

		//OBJ 콤보박스를 가지고 있는 컴포넌트
		//console.log(obj);
		if (Ext.isEmpty(filterYn)) {
			//모든코드를 다 가져와
			filtertYn = 'N'
		}
		if (Ext.isEmpty(obj)) {
			// Terp.app.getController('TerpCommon').toastMessage('데이타를 처리할 스토어가 없습니다', 'b');
			return;
		}
		Ext.getStore('CommonPartner').suspendEvent();
		if (filtertYn === 'N') {
		}
		else {
			Ext.getStore('CommonPartner').filter('yn_use', 'Y');
		}
		Ext.getStore('CommonPartner').each(function (record) {
			obj.getStore().add(record.copy());
		});
		Ext.getStore('CommonPartner').resumeEvent();
	},
	//시스템을 초기 로그인 상태로 돌린다...
	setSystemInit: function () {
		var appmain = Ext.ComponentQuery.query('main')[0];

		appmain.remove(appmain.down('[name=leftmenu]'));
		appmain.remove(appmain.down('[name=mainbar]'));
		appmain.down('[name=southmenu]').down('[name=loginText]').setText('Login');
		appmain.down('[name=southmenu]').down('[name=loginName]').setValue('');

		Ext.MessageBox.alert('알림', '다른 디바이스에서 접속했거나 사용시간이 초과되어 로그아웃되었습니다.<br> 다시 로그인후 사용하세요', this.logOutshowResult, this);

	},

	setSystemInitNormal: function () {
		var appmain = Ext.ComponentQuery.query('main')[0];

		appmain.remove(appmain.down('[name=leftmenu]'));
		appmain.remove(appmain.down('[name=mainbar]'));
		appmain.down('[name=southmenu]').down('[name=loginText]').setText('Login');
		appmain.down('[name=southmenu]').down('[name=loginName]').setValue('');
		//this.logOutshowResult();
		//Ext.MessageBox.alert('알림', '다른 디바이스에서 접속했거나 사용시간이 초과되어 로그아웃되었습니다.<br> 다시 로그인후 사용하세요', this.logOutshowResult, this);

	},



	//로그아웃 버튼 눌릴시 초기화...
	setSystemLogout : function () {
		var appmain = Ext.ComponentQuery.query('main')[0];

		appmain.remove(appmain.down('[name=leftmenu]'));
		appmain.remove(appmain.down('[name=mainbar]'));
		appmain.down('[name=southmenu]').down('[name=loginText]').setText('Login');
		appmain.down('[name=southmenu]').down('[name=loginName]').setValue('');
		this.logOutshowResult();
		//Ext.MessageBox.alert('알림', '다른 디바이스에서 접속했거나 사용시간이 초과되어 로그아웃되었습니다.<br> 다시 로그인후 사용하세요', this.logOutshowResult, this);

	},




	logOutshowResult : function(){
		window.location.reload();
	},


	//폼에서 핼프박스에 네임값과 벨류를 셋팅해준다...( 반드시 핼프박스 )
	setDataBindHelpBox: function (form, fieldName, value, name) {
		//form 변경할form , fieldName 변경할 폼네에 필드 name속성   , vale , name
		if (form == null || fieldName == null) {
			return;
		}
		var f = form.query('[name = ' + fieldName + ']')[0];
		// if (f.xtype == 'tsoftpartnerhelpfield' ||  f.xtype ==  'tsoftorghelpfield'||  f.xtype ==  'tsoftemphelpfield'||  f.xtype ==  'tsoftwhhelpfield') {
		f.setDisplayValue(name);
		f.setRawValue(name);
		f.setRealValue(value);
		f.setValue(value);
		setTimeout(function () {
			f.onBlur();
		},1)
		// f.setValue(value);
		// f.setRawValue(name);
		//
		// }

	},

	//SQL문을 처리해준다 ( select 리턴이 없을경우 )
	sqlExtcute: function (excuteType, param) {
		//console.log(param);
		var commonFn = Terp.app.getController('TerpCommon');
		var sendData = null;
		loginCdc = commonFn.getUserInfo().cd_c;
		loginIduser = commonFn.getUserInfo().id_user;
		loginCde = commonFn.getUserInfo().cd_e;
		if (excuteType == 'addFavorite') {
			sendData = {'sqlData': "insert into sy_menufavorite values ( '" + loginIduser + "', '0' , '" + param + "') "};
		}
		if (excuteType == 'deleteFavorite') {
			sendData = {'sqlData': "delete from sy_menufavorite where id_user = '" + loginIduser + "' and  fg_favorite = '0' and id_menu = '" + param + "'  "};
		}
		if (excuteType == 'insertUseMenu') {
			sendData = {'sqlData': "exec usp_sy_menu 'log' , @p_cd_c = '" + loginCdc + "' , @p_id_user = '" + loginIduser + "' ,  @p_id_menu = '" + param.id_menu + "'  , @p_nm_menu = '" + param.text + "' , @p_dc_url = '" + param.dc_url + "'"};
		}
		if (excuteType == 'uploadSingleFile') {
			var data = '/erpfiles/' + loginCdc + '/' + param.uploadType + '/' + param.newFileName;
			if (param.uploadType == 'emp') {
				sendData = {'sqlData': "update ma_emp set img_url = '" + data + "'  where cd_c = '" + loginCdc + "' and  cd_e ='" + param.keyData + "' "};
			}
			else if (param.uploadType == 'sign') {
				sendData = {'sqlData': "update sy_user set sign_url = '" + data + "'  where cd_c = '" + loginCdc + "' and  id_user ='" + param.keyData + "' "};
			}
			else if (param.uploadType == 'bom') {
				sendData = {'sqlData': "update ma_bom set img_url = '" + data + "'  where cd_c = '" + loginCdc + "' and  cd_bom ='" + param.keyData + "' "};
			}
			else if (param.uploadType == 'item') {
				sendData = {'sqlData': "update ma_item set img_url = '" + data + "'  where cd_c = '" + loginCdc + "' and  cd_i ='" + param.keyData + "' "};
			}
			else if (param.uploadType == 'worker') {
				sendData = {'sqlData': "update hr_worker set url_img = '" + data + "'  where cd_c = '" + loginCdc + "' and  cd_w ='" + param.keyData + "' "};
			}
            else if (param.uploadType == 'material') {
                sendData = {'sqlData': "update ma_material set url_img = '" + data + "'  where cd_c = '" + loginCdc + "' and  cd_m ='" + param.keyData + "' "};
            }
			else if (param.uploadType == 'eaform') {
				sendData = {'sqlData': "update ea_def_form set url_file = '" + data + "'  where cd_c = '" + loginCdc + "' and  cd_form ='" + param.keyData + "' "};
			}
		}
		if (excuteType == 'sql') {
			sendData = {'sqlData': param};
		}
		var sendDataJson = [];
		sendDataJson.push(sendData);
		var sendDataJsonEncode = Ext.encode(sendDataJson);
		var returnTrueFalse = false;
		this.sqlExcuteAjaxRequest(sendDataJsonEncode, function (value) {
			returnTrueFalse = value;
		});
		return returnTrueFalse;
	},

	//SQLexcute의 ajax request문을 처리해준다
	sqlExcuteAjaxRequest: function (sendDataJsonEncode, callback) {
		var me = this;
		var record;
		Ext.Ajax.request({
			url: '../ServerPage/sy/sy_sqlexcute.jsp',
			params: {
				sendData: sendDataJsonEncode
			},
			async: false,
			success: function (response) {
				var response = Ext.decode(response.responseText);
				if (!response.success) {
					Ext.Msg.alert("오류", response.msg);
				}
				callback(response.success);
			},
			fail: function () {
				callback(false);
			}
		});
	},

	//SQL문을 처리해준다 ( select 리턴이 있을 경우 )
	sqlSelect: function (excuteType, param) {
		//console.log(excuteType , param );
		var commonFn = Terp.app.getController('TerpCommon');
		var formData = null;
		loginCdc = commonFn.getUserInfo().cd_c;
		loginIduser = commonFn.getUserInfo().id_user;
		if (excuteType == 'existFavorite') {
			sendData = {'sqlData': "select * from sy_menufavorite where id_user = '" + loginIduser + "' and  fg_favorite = '0' and id_menu = '" + param + "'  "};
		}
		if (excuteType == 'sql') {
			sendData = {'sqlData': param};
		}
		var sendDataJson = [];
		sendDataJson.push(sendData);
		var sendDataJsonEncode = Ext.encode(sendDataJson);
		this.sqlSelectAjaxRequest(sendDataJsonEncode, function (value) {
			returnDatas = value;
		});
		return returnDatas;
	},

	//SQLselect의 ajax request문을 처리해준다
	sqlSelectAjaxRequest: function (sendDataJsonEncode, callback) {
		var me = this;
		var record;
		Ext.Ajax.request({
			url: '../ServerPage/sy/sy_sqlexcute.jsp',
			params: {
				sendData: sendDataJsonEncode
			},
			async: false,
			success: function (response) {
				var response = Ext.decode(response.responseText);
				if (!response.success) {
					Ext.Msg.alert("오류", response.msg);
				}
				callback(response.data);
			},
			fail: function () {
				callback(false);
			}
		});
	},

	//문서번호를 돌려준다
	sqlNodocu: function (docuType, cdCompany, docuDate) {
		//    문서번호를 자동으로 발행해서 리턴해준다
		//    cdCompany 회사코드   docuType  문서타입 ex 'PO' 반드시 영문두자리 대문자로 사용  date 문서발행일 ( '' 로 주면 오늘일자로 발행함 )
		var me = this;
		var commonFn = Terp.app.getController('TerpCommon');
		var noDocu = '';
		if (cdCompany == '' || cdCompany == null) {
			cdCompany = commonFn.getUserInfo('cd_c');
		}
		if (docuDate == '' || docuDate == null) {
			docuDate = commonFn.getDateToString('', 'today', '');
		}
		var sendData = {
			'cdCompany': cdCompany,
			'docuType': docuType,
			'docuDate': docuDate
		};
		var sendDataJson = [];
		sendDataJson.push(sendData);
		var sendDataJsonEncode = Ext.encode(sendDataJson);
		this.noDocuRequest(sendDataJsonEncode, function (value) {
			noDocu = value;
		});
		return noDocu;
	},

	//문서번호를 돌려주는 AJAX처리 펑션
	noDocuRequest: function (sendDataJsonEncode, callback) {
		//console.log(sendDataJsonEncode);
		var me = this;
		var record;
		Ext.Ajax.request({
			url: '../ServerPage/sy/sy_sqlnodocu.jsp',
			params: {
				sendData: sendDataJsonEncode
			},
			async: false,
			success: function (response) {
				var response = Ext.decode(response.responseText);
				var returnData = response.data[0].no_docu;
				if (returnData == '' || returnData == null) {
					Ext.Msg.alert("오류", response.msg);
				}
				callback(returnData);
			},
			fail: function () {
				Ext.Msg.alert("오류", "데이타처리중 오류가 발생했습니다");
			}
		});
	},
	sqlNoGscode: function (docuType, cdCompany, docuDate, p) {
		//    문서번호를 자동으로 발행해서 리턴해준다
		//    cdCompany 회사코드   docuType  문서타입 ex 'PO' 반드시 영문두자리 대문자로 사용  date 문서발행일 ( '' 로 주면 오늘일자로 발행함 )
		var me = this;
		var commonFn = Terp.app.getController('TerpCommon');
		var noDocu = '';
		if (cdCompany == '' || cdCompany == null) {
			cdCompany = commonFn.getUserInfo('cd_c');
		}
		if (docuDate == '' || docuDate == null) {
			docuDate = commonFn.getDateToString('', 'today', '');
		}
		var sendData = {
			'cdCompany': cdCompany,
			'docuType': docuType,
			'docuDate': docuDate,
			'p' : p
		};
		var sendDataJson = [];
		sendDataJson.push(sendData);
		var sendDataJsonEncode = Ext.encode(sendDataJson);
		this.noGscodeRequest(sendDataJsonEncode, function (value) {
			noDocu = value;
		});
		return noDocu;
	},
	noGscodeRequest: function (sendDataJsonEncode, callback) {
		var me = this;
		var record;
		Ext.Ajax.request({
			url: '../ServerPage/sy/sy_sqlnogscode.jsp',
			params: {
				sendData: sendDataJsonEncode
			},
			async: false,
			success: function (response) {
				var response = Ext.decode(response.responseText);
				var returnData = response.data[0].no_docu;
				if (returnData == '' || returnData == null) {
					Ext.Msg.alert("오류", response.msg);
				}
				callback(returnData);
			},
			fail: function () {
				Ext.Msg.alert("오류", "데이타처리중 오류가 발생했습니다");
			}
		});
	},
	//rowid를 돌려준다
	sqlRowId: function () {
		//    rowid번호를 자동으로 발행해서 리턴해준다
		var me = this;
		var commonFn = Terp.app.getController('TerpCommon');
		var noRowId = '';
		var sendData = {
			'loginIduser': this.getUserInfo('id_user')
		};
		var sendDataJson = [];
		sendDataJson.push(sendData);
		var sendDataJsonEncode = Ext.encode(sendDataJson);
		this.rowIdRequest(sendDataJsonEncode, function (value) {
			noRowId = value;
		});
		return noRowId;
	},

	//문서번호를 돌려주는 AJAX처리 펑션
	rowIdRequest: function (sendDataJsonEncode, callback) {
		var me = this;
		var record;
		Ext.Ajax.request({
			url: '../ServerPage/sy/sy_sqlrowid.jsp',
			params: {
				sendData: sendDataJsonEncode
			},
			async: false,
			success: function (response) {
				var response = Ext.decode(response.responseText);
				var returnData = response.data[0].no_rowid;
				if (returnData == '' || returnData == null) {
					Ext.Msg.alert("오류", response.msg);
				}
				callback(returnData);
			},
			fail: function () {
				Ext.Msg.alert("오류", "데이타처리중 오류가 발생했습니다");
			}
		});
	},

	//문서일련번호를 돌려준다 ( 예 0001 0002.. )
	sqlNodocuSeq: function (cdCompany, noDocu) {
		//    문서번호를 자동으로 발행해서 리턴해준다
		//    cdCompany 회사코드   noDocu  문서번호
		var me = this;
		var commonFn = Terp.app.getController('TerpCommon');
		var noDocuSeq = '';
		if (cdCompany == '' || cdCompany == null) {
			cdCompany = commonFn.getUserInfo('cd_c');
		}
		var sendData = {
			'cdCompany': cdCompany,
			'noDocu': noDocu
		};
		var sendDataJson = [];
		sendDataJson.push(sendData);
		var sendDataJsonEncode = Ext.encode(sendDataJson);
		this.noDocuSeqRequest(sendDataJsonEncode, function (value) {
			noDocuSeq = value;
		});
		return noDocuSeq;
	},

	//문서일련번호를 돌려주는 AJAX처리 펑션
	noDocuSeqRequest: function (sendDataJsonEncode, callback) {
		var me = this;
		var record;
		Ext.Ajax.request({
			url: '../ServerPage/sy/sy_sqlnodocuseq.jsp',
			params: {
				sendData: sendDataJsonEncode
			},
			async: false,
			success: function (response) {
				var response = Ext.decode(response.responseText);
				var returnData = response.data[0].noDocuSeq;
				if (returnData == '' || returnData == null) {
					Ext.Msg.alert("오류", response.msg);
				}
				callback(returnData);
			},
			fail: function () {
				Ext.Msg.alert("오류", "데이타처리중 오류가 발생했습니다");
			}
		});
	},

	//토스트메시지를 띄운다
	toastMessage: function (t, a) {
		if (a !== 'w'){
			Ext.toast({
				html: t,
				title: 'Message',
				width: 400,
				align: 't'
			});
		}else{
			Ext.toast({
				html: t,
				title: 'Message',
				width: 500,
				align: 't',
				cls :'toastmessage-warning'
			});
		}

	},


	//토스트메시지를 하단 우측에 띄운다 erp메시지를 보여주기위한 용도로 사용됨 20210617 jiscraft
	toastMessageInstance: function (t, a) {
		// console.log(getCls());
		if ( a !== "e" ){
			Ext.toast({
				html: t,
				// title: 'Message',
				width: 400,
				align: 'br'
			});
		} else{
			Ext.toast({
				html: t,
				// title: 'Message',

				width: 500,
				align: 'br'
			});
		}

	},



	//텍스트문자를 0 으로 채워준다
	zeroPadding: function (targetString, len) {
		//padding숫자는 20자리까지 입니다..
		var result = '00000000000000000000' + targetString.toString();
		result = result.substring(20 - len + targetString.length, 20 + targetString.toString().length);
		return result;
	},

	//url이 존재하는지 체크한다
	existUrl: function (url) {
		var http_status = "";
		var http = new XMLHttpRequest();
		http.open('HEAD', window.location.origin + "/" + url, false);
		http.send();
		http_status = http.status;
		if (http_status == 404) {
			return false;
		}
		else {
			return true;
		}
	},

	// 메시지박스 20160630 bkoh
	msgBox: ((Ext.manifest.profile === 'classic') ? Ext.create('Ext.window.MessageBox', {
		alwaysOnTop: 30000
	}) : null),

	//디비사용후 에러가 돌아왔을때 처리하는 공통펑션
	errorHandling : function(errMsg){
		var errorType = errMsg.substr(1,1);
		// console.log(errMsg);
		if ( errMsg !=''){
            if ( errorType == 's'){
                this.setSystemInit();
            }else{
                this.toastMessage(errMsg ,'w');
                // Ext.Msg.alert('Error', errMsg);
            }
		}

	},

	// 인쇄 미리보기 팝업 오픈 20160926 bkoh
	openHtmlPrinter: function(title, html, isPrintMode) {
		self.HtmlPrinterParams = {
			title: title,
			html: html,
			isPrintMode: Ext.isEmpty(isPrintMode) ? false : true
		};
		var win = window.open('/ServerPage/common/printHtml.jsp', 'HtmlPrinter-'+((new Date()).getTime()), 'left=100,top=100,width=800,height=800,location=no,menubar=no,resizable=yes,scrollbars=yes,status=no,Toolbar=no', true);
		// win.focus();
	},

	//부가세계산공식
	getVat : function(value , type){
		/*type : '' or '1' 소숫점버리고 반올림
		* '2' : 소숫점버림
		*
		* */
		if (type == '' || type == '1'){
			return Math.round(value * 0.1);
		}
		if (type == '' || type == '1'){
			return Math.floor(value * 0.1);
		}
	},




	getTsoftAjaxRequest : function (sendDataJsonEncode , ajaxUrl , async , callback)  {
		var me = this;
		Ext.Ajax.request({
			url : ajaxUrl,
			method :'POST',
			params :{
				sendData : sendDataJsonEncode
			},
            timeout: 480000,
			async: async,
			success :function(res){
				var ajaxResult = Ext.JSON.decode(res.responseText);
				if(ajaxResult.success == true){
					callback(ajaxResult);

				}else{
					var errorMsg = ajaxResult.msg;
					me.errorHandling(errorMsg);
					callback(ajaxResult);
				}
			},
			fail : function(){
				me.toastMessage("데이타처리중 오류가 발생했습니다",'t');
			}
		})
	},

	isNum :function(s){
		s += ''; // 문자열로 변환
		s = s.replace(/^\s*|\s*$/g, ''); // 좌우 공백 제거
		if (s == '' || isNaN(s)) return false;
		return true;
	},


	getQtSpec : function(codel , cdspec , nbsize ,  qt , nbconvert){
		var me = this;
		me.commonFn = Terp.app.getController('TerpCommon');
		switch (codel) {
			case "0010": {
				returnValue = (nbconvert * qt * nbsize)/1000;
				break;
			}
			case "0020": {
				returnValue = (qt * 54) / 132;
				break;
			}
			case "0030": {
				size = cdspec.split('*');
				size.forEach(function(number){
					if(isNaN(Number(number))){
						me.commonFn('스펙입력자료가 문제가 있습니다. 다시 확인하세요');

					}
				});

				returnValue = (size[0] * size[1]   * nbsize *  nbconvert * qt ) / 1000000;
				break;
			}
			case "0040": {
				returnValue = (nbconvert * qt * nbsize * width) / 1000000;
				break;
			}
			case "9000": {
				returnValue = 0;
				break;
			}
			case "0090": {
				returnValue = 1;
				break;
			}
			default: {
				returnValue = 0;
				break;
			}
		}
		returnValue = Math.round(returnValue * 10)/10;
		return returnValue;
	},

	getAmount : function(codel , qtspec , 	qt ,  up){
		var returnValue = 0;

		switch (codel) {
			case "0010": {
				returnValue = Math.floor(up * qt);
				break;
			}
			case "0020": {
				returnValue = Math.floor(up * qtspec);
				break;
			}
			default: {
				returnValue = 0;
				break;
			}
		returnValue = Math.round(returnValue)
		}
		returnValue = Math.round(returnValue * 10)/10;
		return returnValue;
	},

	getCalculation : function( codeh, type,  length,  width,  qt, weight , up , uniweight,dc_spec) {
		var returnValue = 0;
		if (codeh == "MA200") {
			switch (type) {
				case "0010": {
					returnValue = Math.floor(up * qt);
					break;
				}
				case "0020": {
					returnValue = Math.floor(up * weight);
					break;
				}
				default: {
					returnValue = 0;
					break;
				}
			}
			returnValue = Math.round(returnValue)

		}
		else if (codeh == "MA210") {
			// console.log(type)
			// console.log(uniweight,qt,length,width,dc_spec,type);
			// if(!(dc_spec == undefined || dc_spec == ''))
			// {
			//
			//
			// 	if(isNaN(dc_spec))
			// 	{
			// 		commonFn.toastMessage("규격에는 숫자만 입력해주세요",'b');
			// 		dc_spec = 0
			// 	}
			// 	else
			// 	{
			// 		dc_spec = parseFloat(dc_spec);
			// 	}
			// }
			switch (type) {
				case "0010": {
					returnValue = (uniweight * qt * length)/1000;
					break;
				}
				case "0020": {
					returnValue = (qt * 54) / 132;
					break;
				}
				case "0030": {
					returnValue = (dc_spec*uniweight * qt * (length) * (width)) / 1000000;
					break;
				}
				case "0040": {
					returnValue = (uniweight * qt * length * width) / 1000000;
					break;
				}
				case "9000": {
					//returnValue = (dc_spec*uniweight * qt * (length) * (width)) / 1000000;
					returnValue = 0;
					break;
				}
				case "0090": {
					returnValue = 1;
					break;
				}
				default: {
					returnValue = 0;
					break;
				}
			}
			returnValue = Math.round(returnValue * 10)/10
		}
		return returnValue;

	},

	setConvertCommaCode: function (value,table) {
		var displayValue ='';
		//OBJ 콤보박스를 가지고 있는 컴포넌트
		//console.log(obj);
		if (table == '' || table == 'ma_contact') {
			var jsonData = {
				'actiondata': ',',
				'loginIduser': commonFn.getUserInfo('id_user'),
				'loginCdc': commonFn.getUserInfo('cd_c'),
				'a_no_contact'  : value
			};
			var sendDataJson = [];
			sendDataJson.push(jsonData);
			var sendDataJsonEncode = Ext.encode(sendDataJson);
			Ext.Ajax.request({
				url :'../ServerPage/ma/ma_contact.jsp' ,
				method :'POST',
				params :{
					sendData : sendDataJsonEncode
				},
				success :function(res){
					var obj = Ext.JSON.decode(res.responseText);
					if(obj.success == true){
						// console.log(obj);
					}else{
						var errorMsg = obj.msg;
						Terp.app.getController('TerpCommon').errorHandling(errorMsg);
					}
				},
				fail : function(){
					commonFn.toastMessage("데이타처리중 오류가 발생했습니다",'b');
				}
			});
		}
		return displayValue;
	},

	gridCellEditPluginEnterKeyHandler: function(field, e) {
		if (field && ((e === 'SkipEnterKeyCheck') || (e.getKey() === e.ENTER)) && field.up('tsoftgrid')) {
			var gridCellEditPlugin = field.up('tsoftgrid').getPlugin('cellplugin');
			if (gridCellEditPlugin && gridCellEditPlugin.context) {
				gridCellEditPlugin.completeEdit();
				var visibleCols = gridCellEditPlugin.context.grid.visibleColumnManager.columns;
				var editableColumnNames = [];
				var currentColumnIdx = [];
				Ext.Array.each(visibleCols, function (col) {
					if (col.config.editor && !col.getEditor().disabled) {
						editableColumnNames.push(col.dataIndex);
					}
				});
				Ext.Array.each(editableColumnNames, function (colName) {
					if (colName === gridCellEditPlugin.context.field) {
						currentColumnIdx = Ext.Array.indexOf(editableColumnNames, colName);
					}
				});
				var nextColumnIdx = currentColumnIdx + 1;
				if (nextColumnIdx === editableColumnNames.length) {
					gridCellEditPlugin.context.grid.fireEvent('lastenterkeydown', gridCellEditPlugin.context.grid, gridCellEditPlugin.context.record, gridCellEditPlugin.context, field.name, editableColumnNames);
				}
				else {
					Ext.defer(function () {
						gridCellEditPlugin.context.grid.fireEvent('enterkeydown', gridCellEditPlugin.context.grid, gridCellEditPlugin.context.record, gridCellEditPlugin.context, field.name, editableColumnNames);
						gridCellEditPlugin.grid.startEdit(gridCellEditPlugin.context.record, editableColumnNames[nextColumnIdx]);
					}, 100);
				}
			}
		}
	},

	validatePassword: function (pw) {
		var num = pw.search(/[0-9]/g);
		var eng = pw.search(/[a-z]/ig);
		var spe = pw.search(/[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi);
		if (pw.length < 8){
			Terp.app.getController('TerpCommon').toastMessage('비밀번호는 8자리이상으로 입력하세요.', 'b');
			return false;
		}
		else if(pw.search(/\s/) != -1){
			Terp.app.getController('TerpCommon').toastMessage('비밀번호는 공백 없이 입력하세요.', 'b');
			return false;
		}
		else if(num < 0 || eng < 0 || spe < 0 ){
			Terp.app.getController('TerpCommon').toastMessage('비밀번호는 영문, 숫자, 특수문자를 혼합하여 입력하세요.', 'b');
			return false;
		}
		else {
			return true;
		}
	}

});


