/**
 * Created by jiscraft on 2016-11-02.
 */
Ext.define('Terp.view.tsoft.componentux.TsoftPartnerConHelpField', {
    extend: 'Terp.view.tsoft.componentux.TsoftHelpFieldBase',

    requires: [],


    xtype: 'tsoftpartnerconhelpfield',

    width: 240,
    labelWidth: 60,
    labelAlign :'right',

    openHelperWin: function() {
        var pop = this.getHelperWin('Terp.view.tsoft.help.partnerconhelp.TsoftPartnerConHelp', true);
        pop.show();
    },

    callbackPopup: function(params) {
        this.bindValues(params.cd_p, params.nm_p);
        // searchform 및 grid cell edit plugin 이벤트 처리
        // 반드시 이 함수 마지막에 위치해야 함
        this.callParent(arguments);
    },

    onEnterKey: function(field, e) {
        var sendDataJson = {
            actiondata: 'help',
            loginIduser: Terp.app.getController('TerpCommon').getUserInfo('id_user'),
            loginCdc: Terp.app.getController('TerpCommon').getUserInfo('cd_c')
        };
        this.searchValues.h_search = field.inputEl.getValue();
        Ext.Object.merge(sendDataJson, this.searchValues);
        this.callHelpAjax('/ServerPage/ma/ma_partner_con.jsp', Ext.encode([sendDataJson]));
    },

    initComponent: function() {
        this.callParent(arguments);
    }

});
