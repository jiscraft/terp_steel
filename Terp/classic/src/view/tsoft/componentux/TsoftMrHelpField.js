/**
 * Created by jiscraft on 2016-11-25.
 */
Ext.define('Terp.view.tsoft.componentux.TsoftMrHelpField', {
    extend: 'Terp.view.tsoft.componentux.TsoftHelpFieldBase',
    xtype: 'tsoftmrhelpfield',

    width: 240,
    labelWidth: 60,
    labelAlign :'right',

    openHelperWin: function() {
        var pop = this.getHelperWin('Terp.view.tsoft.help.mrhelp.TsoftMrHelp', true);
        pop.show();
    },

    callbackPopup: function(params) {
        this.bindValues(params.no_mr, params.no_mr);
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
        this.callHelpAjax('/ServerPage/mm/mm_mr_h.jsp', Ext.encode([sendDataJson]));
    },

    initComponent: function() {
        this.callParent(arguments);
    }
});