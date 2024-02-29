/**
 * Created by Andrew on 2021-09-06.
 */
Ext.define('Terp.view.sy.sy21i0605.Sy21i0605', {
    extend: 'Terp.view.tsoft.componentbase.TsoftPagePanel',
    xtype: 'sy21i0605',
    requires: [
        'Ext.form.Label',
        'Ext.layout.container.Table',
        'Ext.layout.container.VBox',
        'Terp.view.sy.sy21i0605.Sy21i0605Controller',
        'Terp.view.sy.sy21i0605.Sy21i0605Model',
        'Terp.view.tsoft.componentbase.TsoftForm',
        'Terp.view.tsoft.componentbase.TsoftNumberField',
        'Terp.view.tsoft.componentbase.TsoftTextField',
        'Terp.view.tsoft.componentux.TsoftHeadButtons'
    ],
    controller: 'sy21i0605',
    viewModel: {
        type: 'sy21i0605'
    },
    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    items: [
        {
            xtype :'tsoftheadbuttons',
            reference :'sy21i0605_headbutton'
        },
        {
            xtype : 'tsoftform',
            reference :'sy21i0605_form1',
            flex : 1,
            scrollable: true,
            layout : {
                type: 'table',
                columns: 2
            },
            defaults: {
                width : 300 ,
                labelWidth: 170,
                labelAlign: 'right',
                margin: '10 0 0 0'
            },
            items :[
                {
                    xtype :'tsoftnumberfield',
                    fieldLabel: 'pw change interval',
                    name :'dy_login_pwinterval',
                    fieldStyle: 'text-align: right',
                    textAlign : 'center'
                },
                {
                    xtype: 'label',
                    text: '비밀번호 변경주기를 설정합니다(일단위로 입력하세요)',
                    readOnly: true,
                    height: 50,
                    margin: '10 5 0 20'
                },


                {
                    xtype :'tsofttextfield',
                    fieldLabel: 'pw prefix ',
                    name :'dc_login_pwinit',
                    textAlign : 'center'
                },
                {
                    xtype: 'label',
                    text: '비밀번호 초기화 접두어 ( 입력안할시는 !Tsoft+id로 설정됩니다 )',
                    readOnly: true,
                    margin: '10 0 0 20'
                },
                {
                    xtype :'tsoftnumberfield',
                    fieldLabel: 'min length PW',
                    name :'nb_login_pwlength',
                    textAlign : 'center'

                },
                {
                    xtype: 'label',
                    text: '비밀번호 최소입력 글자수를 입력합니다',
                    readOnly: true,
                    margin: '10 0 0 20'
                }
            ]

        }
    ]
});