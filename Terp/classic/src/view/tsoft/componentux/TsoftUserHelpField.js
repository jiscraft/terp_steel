/**
 * Created by Andrew on 2021-09-16.
 */
Ext.define('Terp.view.tsoft.componentux.TsoftUserHelpField', {
    extend: 'Terp.view.tsoft.componentux.TsoftHelpFieldBase',
    xtype: 'tsoftuserhelpfield',

    width: 200,
    labelWidth: 60,

    openHelperWin: function(searchValues) {
        var pop = this.getHelperWin('Terp.view.tsoft.help.userhelp.TsoftUserHelp', true);
        pop.show();
    },

    callbackPopup: function(params) {
        this.bindValues(params.id_user, params.nm_user);
        // searchform 및 grid cell edit plugin 이벤트 처리
        // 반드시 이 함수 마지막에 위치해야 함
        this.callParent(arguments);
    },

    onEnterKey: function(field, e) {
        var sendDataJson = {
            actiondata: 'm',
            loginIduser: Terp.app.getController('TerpCommon').getUserInfo('id_user'),
            loginCdc: Terp.app.getController('TerpCommon').getUserInfo('cd_c')
        };
        this.searchValues.h_search = field.inputEl.getValue();
        Ext.Object.merge(sendDataJson, this.searchValues);
        this.callHelpAjax('/ServerPage/sy/sy_user.jsp', Ext.encode([sendDataJson]));
    },

    initComponent: function() {
        this.callParent(arguments);
    }

});
