/**
 * Created by Andrew on 2021-09-16.
 */
Ext.define('Terp.view.tsoft.componentux.TsoftOrgHelpField', {
    extend: 'Terp.view.tsoft.componentux.TsoftHelpFieldBase',
    xtype: 'tsoftorghelpfield',

    width: 200,
    labelWidth: 60,
    labelAlign :'right',
    openHelperWin: function() {
        var pop = this.getHelperWin('Terp.view.tsoft.help.orghelp.TsoftOrgHelp', true);
        pop.show();
    },

    callbackPopup: function(params) {
        this.bindValues(params.cd_o, params.nm_o);
        // searchform 및 grid cell edit plugin 이벤트 처리
        // 반드시 이 함수 마지막에 위치해야 함
        this.callParent(arguments);
    },

    onEnterKey: function(field, e) {
        var sendDataJson = {
            actiondata: 'm',
            loginIduser: Terp.app.getController('TerpCommon').getUserInfo('id_user'),
            loginCdc: Terp.app.getController('TerpCommon').getUserInfo('cd_c'),
            p_search: fieldInputValue
        };
        this.searchValues.h_search = field.inputEl.getValue();
        if (!this.searchValues.hasOwnProperty('dt_apply') || Ext.isEmpty(this.searchValues.dt_apply)) {
            this.searchValues.dt_appy = Terp.app.getController('TerpCommon').getDateToString('','today','');
        }
        Ext.Object.merge(sendDataJson, this.searchValues);
        this.callHelpAjax('/ServerPage/ma/ma_org.jsp', Ext.encode([sendDataJson]));
    },

    initComponent: function() {
        this.callParent(arguments);
    }

});
