/**
 * Created by Andrew on 2021-10-21.
 */
Ext.define('Terp.view.gw.ea.common.eaaprogridtptp.EaAproGridTp', {
    extend: 'Terp.view.tsoft.componentbase.TsoftPanel',
    xtype: 'eaaprogridtp',

    requires: [
        'Terp.view.gw.ea.common.eaaprogridtptp.EaAproGridTpModel',
		'Terp.view.gw.ea.common.eaaprogridtptp.EaAproGridTpController'
    ],

    controller: 'eaaprogridtp',
    viewModel: {
        type: 'eaaprogridtp'
    },
    layout: {
        type: 'hbox',
        align: 'stretch'
    },

    items: [
        {
            xtype: 'tsoftgrid',
            reference: 'eaaprogridtp_apro_grid',
            title: '현황',
            hiddenTools: 'all',
            flex: 2,
            store: { fields: [] },
            columns: [
            ]
        },
        {
            xtype: 'tsoftpanel',
            reference: 'eaaprogridtp_cmt_panel',
            title: '의견',
            border: true,
            margin: '0 0 0 5',
            bodyPadding: 10,
            flex: 1,
            hidden: true
        }
    ]

});