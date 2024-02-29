/**
 * Created by Andrew on 2021-09-18.
 */
Ext.define('Terp.view.tsoft.componentux.TsoftEmpAsHelpField', {
    extend: 'Terp.view.tsoft.componentux.TsoftHelpFieldBase',
    xtype: 'tsoftempashelpfield',

    width: 200,
    labelWidth: 60,
    labelAlign :'right',

    // config: {
    //     displayValue: '',
    //     realValue: '',
    //     selectedData: null,
    //     cdSite :''
    // },

    openHelperWin: function() {
        var pop = this.getHelperWin('Terp.view.tsoft.help.empashelp.TsoftEmpAsHelp', true);
        pop.show();
    },

    callbackPopup: function(params) {
        this.bindValues(params.cd_e_as, params.nm_e_as);
        // searchform 및 grid cell edit plugin 이벤트 처리
        // 반드시 이 함수 마지막에 위치해야 함
        this.callParent(arguments);
    },

    onEnterKey: function(field, e) {
        var sendDataJson = {
            actiondata: 'help',
            loginIduser: Terp.app.getController('TerpCommon').getUserInfo('id_user'),
            loginCdc: Terp.app.getController('TerpCommon').getUserInfo('cd_c'),
            cd_site : this.getCdSite
        };
        // this.searchValues.p_search = field.inputEl.getValue();
        this.searchValues.p_search = this.getCdSite;
        Ext.Object.merge(sendDataJson, this.searchValues);
        this.callHelpAjax('/ServerPage/pj/pj_hdg.jsp', Ext.encode([sendDataJson]));
    },

    initComponent: function() {
        this.callParent(arguments);
    }

});
