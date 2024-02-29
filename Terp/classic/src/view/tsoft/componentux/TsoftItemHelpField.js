/**
 * Created by jiscraft on 2023-09-24.
 */
Ext.define('Terp.view.tsoft.componentux.TsoftItemHelpField', {
    extend: 'Terp.view.tsoft.componentux.TsoftHelpFieldBase',
    xtype: 'tsoftitemhelpfield',

    width: 250,
    labelWidth: 70,
    labelAlign :'right',

    openHelperWin: function() {
        var pop = this.getHelperWin('Terp.view.tsoft.help.itemhelp.TsoftItemHelp', true);
        pop.show();
    },

    callbackPopup: function(params) {
        this.bindValues(params.cd_i, params.nm_i , params.nm_spec , params.yn_size , params.yn_spec , params.fg_mm030 , params.fg_mm040);
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
        this.searchValues.p_search = field.inputEl.getValue();
        Ext.Object.merge(sendDataJson, this.searchValues);
        this.callHelpAjax('/ServerPage/ma/ma_item.jsp', Ext.encode([sendDataJson]));
    },

    initComponent: function() {
        this.callParent(arguments);
    }
});