/**
 * Created by Andrew on 2021-09-18.
 */
Ext.define('Terp.view.tsoft.componentux.TsoftSiteHelpField', {
    extend: 'Terp.view.tsoft.componentux.TsoftHelpFieldBase',
    xtype: 'tsoftsitehelpfield',

    requires: [
        'Terp.view.tsoft.help.sitehelp.TsoftSiteHelp'
    ],

    checkSectorCode: false,
    sectorCode: '',

    width: 350,
    labelWidth: 60,
    labelAlign :'right',
    openHelperWin: function() {
        var pop = Ext.create('Terp.view.tsoft.help.sitehelp.TsoftSiteHelp', {
            helpOpts: {
                opener: this,
                searchValues: this.searchValues,
                autoSearch: true,
                CheckSectorCode: this.checkSectorCode,
                SectorCode: this.sectorCode
            }
        });
        pop.show();
    },

    callbackPopup: function(params) {
        this.bindValues(params.cd_site, params.nm_site);
        // searchform 및 grid cell edit plugin 이벤트 처리
        // 반드시 이 함수 마지막에 위치해야 함
        this.callParent(arguments);
    },

    onSearch: function() {
        if (this.checkSectorCode && Ext.isEmpty(this.sectorCode)) {
            Terp.app.getController('TerpCommon').toastMessage('귀속부문을 먼저 선택해야 합니다', 't');
            return;
        }
        this.openHelperWin();
    },

    onEnterKey: function(field, e) {
        var fieldInputValue = field.inputEl.getValue();
        var sendDataJson = {
            actiondata: 'help',
            loginIduser: Terp.app.getController('TerpCommon').getUserInfo('id_user'),
            loginCdc: Terp.app.getController('TerpCommon').getUserInfo('cd_c')
        };
        this.searchValues.p_search = field.inputEl.getValue();
        Ext.Object.merge(sendDataJson, this.searchValues);
        this.callHelpAjax('/ServerPage/ma/ma_site.jsp', Ext.encode([sendDataJson]));
    },

    initComponent: function() {
        this.callParent(arguments);
    }

});
