/**
 * Created by jiscraft on 2022-11-10.
 */
Ext.define('Terp.view.pj.pjcommon.pjbase.Pjbase', {
    extend: 'Ext.Container',
    xtype: 'pjbase',

    requires: [
        'Ext.layout.container.Table',
        'Terp.view.pj.pjcommon.pjbase.PjbaseController',
        'Terp.view.pj.pjcommon.pjbase.PjbaseModel',
        'Terp.view.tsoft.componentbase.TsoftCommonCodeComboBox',
        'Terp.view.tsoft.componentbase.TsoftDateField',
        'Terp.view.tsoft.componentbase.TsoftForm',
        'Terp.view.tsoft.componentbase.TsoftNumberField',
        'Terp.view.tsoft.componentbase.TsoftTextField',
        'Terp.view.tsoft.componentux.TsoftPartnerHelpField'
    ],
    controller : 'pjbase',
    viewModel: {
        type :'pjbase'
    },
    height : 193,
    items: [
        {
            xtype :'tsoftform',
            title : '변경계약내역',
            header : false,
            iconCls: 'fas fa-desktop',
            padding : '0 0 2 0',
            border: true ,
            reference: 'pjbaseform_head',
            height : 93,
            layout: {
                type: 'table',
                columns: 4
            },
            defaults: {
                labelWidth: 70 ,
                width : 280
            },
            items :[
                {
                    xtype :'tsoftpartnerhelpfield',
                    fieldLabel: '건설사',
                    name : 'cd_p',
                    editable: true,
                    allowBlank : true,
                    align :'center',
                    bind: {
                        disabled: '{!pjbaseFormData}',
                        value: '{pjbaseFormData.cd_p}',
                        realValue :'{pjbaseFormData.nm_p}',
                        displayValue :'{pjbaseFormData.nm_p}'
                    },
                    colspan : 1,
                    labelWidth: 60
                },

                {
                    xtype :'tsoftdatefield',
                    fieldLabel: '계약일',
                    name : 'dt_cont_first',
                    editable: true,
                    allowBlank : true,
                    // initValueType : 'today',
                    bind: {
                        disabled: '{!pjbaseFormData}',
                        value: '{pjbaseFormData.dt_cont_first}'
                    },
                    colspan : 1,
                    width : 220
                },
                {
                    xtype :'tsoftdatefield',
                    fieldLabel: '공사시작',
                    name : 'dt_fr',
                    editable: true,
                    allowBlank : true,
                    // initValueType : 'today',
                    bind: {
                        disabled: '{!pjbaseFormData}',
                        value: '{pjbaseFormData.dt_fr}'
                    },
                    colspan : 1,
                    width : 220
                },
                {
                    xtype :'tsoftdatefield',
                    fieldLabel: '공사종료',
                    name : 'dt_to',
                    editable: true,
                    allowBlank : true,
                    // initValueType : 'today',
                    bind: {
                        disabled: '{!pjbaseFormData}',
                        value: '{pjbaseFormData.dt_to}'
                    },
                    colspan : 1,
                    width : 220
                },

                {
                    xtype :'tsoftpartnerhelpfield',
                    fieldLabel: '시행사',
                    name : 'cd_p_owner',
                    editable: true,
                    allowBlank : true,
                    align :'center',
                    bind: {
                        disabled: '{!pjbaseFormData}',
                        value: '{pjbaseFormData.cd_p_owner}',
                        realValue :'{pjbaseFormData.nm_p_owner}',
                        displayValue :'{pjbaseFormData.nm_p_owner}'
                    },
                    colspan : 1,
                    labelWidth: 60
                },

                {
                    xtype: 'tsoftcommoncodecombobox',
                    fieldLabel: '결재',
                    name: 'fg_pj030',
                    reference: 'pjbase_fg_pj030',
                    editable: true,
                    allowBlank : true,
                    bind: {
                        disabled: '{!pjbaseFormData}',
                        value: '{pjbaseFormData.fg_pj030}'
                    },
                    colspan : 1,
                    width : 220
                    //controller initvalue에서 바인딩 해주세요 필수
                    //me.commonFn.setCommonCode(me.lookupReference('@xtype_fg_mm010') ,'FI010');
                },
                {
                    xtype: 'tsoftcommoncodecombobox',
                    fieldLabel: '구분1',
                    name: 'fg_pj070',
                    reference: 'pjbase_fg_pj070',
                    editable: true,
                    allowBlank : true,
                    bind: {
                        disabled: '{!pjbaseFormData}',
                        value: '{pjbaseFormData.fg_pj070}'
                    },
                    colspan : 1,
                    width : 220
                    //controller initvalue에서 바인딩 해주세요 필수
                    //me.commonFn.setCommonCode(me.lookupReference('@xtype_fg_mm010') ,'FI010');
                },
                {
                    xtype: 'tsoftcommoncodecombobox',
                    fieldLabel: '구분2',
                    name: 'fg_pj080',
                    reference: 'pjbase_fg_pj080',
                    editable: true,
                    allowBlank : true,
                    bind: {
                        disabled: '{!pjbaseFormData}',
                        value: '{pjbaseFormData.fg_pj080}'
                    },
                    colspan : 1,
                    width : 220
                    //controller initvalue에서 바인딩 해주세요 필수
                    //me.commonFn.setCommonCode(me.lookupReference('@xtype_fg_mm010') ,'FI010');
                },
                {
                    xtype :'tsofttextfield',
                    fieldLabel: '계약명',
                    name : 'nm_cont',
                    editable: true,
                    allowBlank : true,
                    bind: {
                        disabled: '{!pjbaseFormData}',
                        value: '{pjbaseFormData.nm_cont}'
                    },
                    colspan : 4,
                    labelWidth: 60 ,
                    width : 940
                },
            ]
        },
        {
            xtype :'tsoftform',
            reference: 'pjbaseform',
            height : 100,
            border : true,
            layout: {
                type: 'table',
                columns: 7
            },
            readOnly : true ,
            items :[
                {
                    html : '<p style="color:#1a36d4; text-align:center; margin-top: 0; margin-bottom: 0; ">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;과세</p>',
                    colspan : 1,
                    width :200
                },
                {
                    html : '<p style="color:#1a36d4; text-align:center; margin-top: 0; margin-bottom: 0; ">면세</p>',
                    colspan : 1,
                    width : 140
                },
                {
                    html : '<p style="color:#1a36d4; text-align:center; margin-top: 0; margin-bottom: 0;">부가세</p>',
                    colspan : 1,
                    width : 140
                },
                {
                    html : '<p style="color:#1a36d4; text-align:center; margin-top: 0; margin-bottom: 0; ">합계</p>',
                    colspan : 1,
                    width : 140
                },
                {
                    html : '<p style="color:#d4334b; text-align:center; margin-top: 0; margin-bottom: 0; ">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;실행</p>',
                    colspan : 1,
                    width : 180 ,

                },
                {
                    html : '<p style="color:#d4334b; text-align:center; margin-top: 0; margin-bottom: 0; ">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;기성</p>',
                    colspan : 1,
                    width : 180
                },
                {
                    html : '<p style="color:#d4334b; text-align:center; margin-top: 0; margin-bottom: 0; ">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;물량</p>',
                    colspan : 1,
                    width : 180
                },
                ////////////////////////////////////
                {
                    xtype :'tsoftnumberfield',
                    fieldLabel: '최초계약',
                    name :'at_cont_first_tax',
                    editable : false,
                    bind: {
                        disabled: '{!pjbaseFormData}',
                        value: '{pjbaseFormData.at_cont_tax_first}'
                    },
                    colspan : 1,
                    width : 200 ,
                    labelWidth: 60,
                    margin: '0 0 0 0',

                },
                {
                    xtype :'tsoftnumberfield',
                    fieldLabel: '',
                    name :'at_cont_first_free',
                    editable : false,
                    bind: {
                        disabled: '{!pjbaseFormData}',
                        value: '{pjbaseFormData.at_cont_free_first}'
                    },
                    colspan : 1,
                    width : 140,
                    margin: '0 0 0 0',
                },
                {
                    xtype :'tsoftnumberfield',
                    fieldLabel: '',
                    name :'at_cont_first_vat',
                    editable : false,
                    bind: {
                        disabled: '{!pjbaseFormData}',
                        value: '{pjbaseFormData.at_cont_vat_first}'
                    },
                    colspan : 1,
                    width : 140,
                    margin: '0 0 0 0'
                },
                {
                    xtype :'tsoftnumberfield',
                    fieldLabel: '',
                    name :'at_cont_first_ttl',
                    editable : false,
                    bind: {
                        disabled: '{!pjbaseFormData}',
                        value: '{pjbaseFormData.at_cont_ttl_first}'
                    },
                    colspan : 1,
                    width : 140,
                    margin: '0 0 0 0'
                },
                {
                    xtype :'tsoftnumberfield',
                    fieldLabel: '최초실행',
                    name :'at_budget_first',
                    editable : false,
                    bind: {
                        disabled: '{!pjbaseFormData}',
                        value: '{pjbaseFormData.at_budget_first}'
                    },
                    colspan : 1,
                    width : 180,
                    labelWidth : 80,
                    margin: '0 0 0 0'
                },
                {
                    xtype :'tsoftnumberfield',
                    fieldLabel: '                 ',
                    name :'at_gs_first',
                    editable : false,
                    bind: {
                        disabled: '{!pjbaseFormData}',
                        value: '{pjbaseFormData.at_gs_first}'
                    },
                    colspan : 1,
                    width : 180,
                    labelWidth : 80,
                    margin: '0 0 0 0',
                    style: 'border:0 hidden #ffffff;',
                    fieldStyle: 'border:0 hidden #ffffff;'
                },
                {
                    xtype :'tsoftnumberfield',
                    fieldLabel: '최초물량',
                    name :'qt_cont_first',
                    editable : false,
                    bind: {
                        disabled: '{!pjbaseFormData}',
                        value: '{pjbaseFormData.qt_cont_first}'
                    },
                    colspan : 1,
                    width : 180,
                    labelWidth : 80,
                    margin: '0 0 0 0'
                },
                ///////////////////////////////////////////////////////
                {
                    xtype :'tsoftnumberfield',
                    fieldLabel: '<span style="color: #fff; ">최종계약</span>',
                    name :'at_cont_last_tax',
                    editable : true,
                    bind: {
                        disabled: '{!pjbaseFormData}',
                        value: '{pjbaseFormData.at_cont_tax}'
                    },
                    colspan : 1,
                    width : 200 ,
                    labelWidth: 60 ,
                    border: 1,
                    style: 'background-color: #4c8bc1; borderColor: #dd3b5c; borderStyle: solid; ',
                    margin: '0 0 0 0'
                },
                {
                    xtype :'tsoftnumberfield',
                    fieldLabel: '',
                    name :'at_cont_last_free',
                    editable : true,
                    bind: {
                        disabled: '{!pjbaseFormData}',
                        value: '{pjbaseFormData.at_cont_free}'
                    },
                    colspan : 1,
                    width : 140,
                    border: 1,
                    style: 'background-color: #4c8bc1; borderColor: #dd3b5c; borderStyle: solid; ',
                    margin: '0 0 0 0'
                },
                {
                    xtype :'tsoftnumberfield',
                    fieldLabel: '',
                    name :'at_cont_last_vat',
                    editable : true,
                    bind: {
                        disabled: '{!pjbaseFormData}',
                        value: '{pjbaseFormData.at_cont_vat}'
                    },
                    colspan : 1,
                    width : 140,
                    border: 1,
                    style: 'background-color: #4c8bc1; borderColor: #dd3b5c; borderStyle: solid;  ',
                    margin: '0 0 0 0'
                },
                {
                    xtype :'tsoftnumberfield',
                    fieldLabel: '',
                    name :'at_cont_last_ttl',
                    editable : false,
                    bind: {
                        disabled: '{!pjbaseFormData}',
                        value: '{pjbaseFormData.at_cont_ttl}'
                    },
                    colspan : 1,
                    width : 140,
                    border: 1,
                    style: 'background-color: #4c8bc1; borderColor: #dd3b5c; borderStyle: solid; ',
                    margin: '0 0 0 0'
                },
                {
                    xtype :'tsoftnumberfield',
                    fieldLabel: '최종실행',
                    name :'at_budget_last',
                    editable : false,
                    bind: {
                        disabled: '{!pjbaseFormData}',
                        value: '{pjbaseFormData.at_budget_last}'
                    },
                    colspan : 1,
                    width : 180,
                    labelWidth : 80,
                    margin: '0 0 0 0',
                    format: '0,000.0'
                },
                {
                    xtype :'tsoftnumberfield',
                    fieldLabel: '원도급기성',
                    name :'at_gs_last',
                    editable : false,
                    bind: {
                        disabled: '{!pjbaseFormData}',
                        value: '{pjbaseFormData.at_gs_last}'
                    },
                    colspan : 1,
                    width : 180,
                    labelWidth : 80,
                    margin: '0 0 0 0',
                    format: '0,000.0'
                },
                {
                    xtype :'tsoftnumberfield',
                    fieldLabel: '최종물량',
                    name :'qt_cont_last',
                    editable : false,
                    bind: {
                        disabled: '{!pjbaseFormData}',
                        value: '{pjbaseFormData.qt_cont_last}'
                    },
                    colspan : 1,
                    width : 180,
                    labelWidth : 80,
                    margin: '0 0 0 0',
                    format: '0,000.0'
                },
                /////////////////////////////////////////////////

                {
                    xtype :'tsoftnumberfield',
                    fieldLabel: '증감',
                    name :'at_cont_tax_chg',
                    editable : false,
                    bind: {
                        disabled: '{!pjbaseFormData}',
                        value: '{pjbaseFormData.at_cont_tax_chg}'
                    },
                    colspan : 1,
                    width : 200 ,
                    labelWidth: 60,
                    margin: '0 0 0 0'
                },
                {
                    xtype :'tsoftnumberfield',
                    fieldLabel: '',
                    name :'at_cont_free_chg',
                    editable : false,
                    bind: {
                        disabled: '{!pjbaseFormData}',
                        value: '{pjbaseFormData.at_cont_free_chg}'
                    },
                    colspan : 1,
                    width : 140,
                    margin: '0 0 0 0'
                },
                {
                    xtype :'tsoftnumberfield',
                    fieldLabel: '',
                    name :'at_cont_vat_chg',
                    editable : false,
                    bind: {
                        disabled: '{!pjbaseFormData}',
                        value: '{pjbaseFormData.at_cont_vat_chg}'
                    },
                    colspan : 1,
                    width : 140,
                    margin: '0 0 0 0'
                },
                {
                    xtype :'tsoftnumberfield',
                    fieldLabel: '',
                    name :'at_cont_ttl_chg',
                    editable : false,
                    bind: {
                        disabled: '{!pjbaseFormData}',
                        value: '{pjbaseFormData.at_cont_ttl_chg}'
                    },
                    colspan : 1,
                    width : 140,
                    margin: '0 0 0 0',
                    border: 1,
                    style: 'borderColor: #192ae5; borderStyle: solid; '
                },
                {
                    xtype :'tsoftnumberfield',
                    fieldLabel: '실행율 (%)',
                    name :'rt_budget',
                    editable : false,
                    bind: {
                        disabled: '{!pjbaseFormData}',
                        value: '{pjbaseFormData.rt_budget}'
                    },
                    colspan : 1,
                    width : 180,
                    labelWidth : 80,
                    margin: '0 0 0 0',
                    format: '0,000.0'
                },
                {
                    xtype :'tsoftnumberfield',
                    fieldLabel: '기성율 (%)',
                    name :'rt_gs',
                    editable : false,
                    bind: {
                        disabled: '{!pjbaseFormData}',
                        value: '{pjbaseFormData.rt_gs}'
                    },
                    colspan : 1,
                    width : 180,
                    labelWidth : 80,
                    margin: '0 0 0 0',
                    format: '0,000.0'
                },
                {
                    xtype :'tsoftnumberfield',
                    fieldLabel: '계약/톤',
                    name :'up_cont',
                    editable : false,
                    bind: {
                        disabled: '{!pjbaseFormData}',
                        value: '{pjbaseFormData.up_cont}'
                    },
                    colspan : 1,
                    width : 180,
                    labelWidth : 80,
                    margin: '0 0 0 0',
                    format: '0,000'
                }
            ]

        }
    ]


});