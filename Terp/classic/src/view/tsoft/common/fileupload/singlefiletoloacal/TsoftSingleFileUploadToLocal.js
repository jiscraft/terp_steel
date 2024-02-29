/**
 * Created by jiscraft on 2016-03-06.
 */
Ext.define('Terp.view.tsoft.common.fileupload.singlefiletoloacal.TsoftSingleFileUploadToLocal', {
    extend: 'Ext.window.Window',
    xtype: 'tsoftsinglefileuploadtolocal',
    requires: [
        'Ext.button.Button',
        'Ext.form.field.File',
        'Ext.layout.container.Fit',
        'Ext.toolbar.Fill',
        'Terp.view.tsoft.common.fileupload.singlefiletoloacal.TsoftSingleFileUploadToLocalController',
        'Terp.view.tsoft.componentux.TsoftFuctionForm',
        'Terp.view.tsoft.componentux.TsoftSearchForm'
    ],
    controller:'tsoftsinglefileuploadtolocal',

    config :{
      saveType :'',  //emp 직원사진정보 .. 기타등등
      keyDataParam :''     //업로드를 처리하기 위한 키값등...
    },

    bind :{
        title :'{fileUploadTitle}'
    },

    layout :'fit',
    dockedItems: [
        {
            xtype: 'tsoftfuctionform',
            reference: 'main16e1601_toolbar',
            dock: 'bottom',
            items: [
                {
                    xtype: 'tbfill'
                },
                {
                    xtype: 'button',
                    text: '업로드',
                    name: 'uploadbutton',
                    cls :'x-btn-default-small-resh',
                    //disabled: true,
                    handler: 'onSubmit'
                }
            ]
        }
    ],
    width: 550,
    height: 120,

    items :[
        {
            xtype :'tsoftsearchform' ,
            name :'tsoftsearchform_emp',
            //layout :{
            //    type :'table',
            //    columns : 3
            //},
            layout: 'fit',

            items :[
                {
                    xtype: 'filefield',
                    name: 'document',
                    fieldLabel: '파일선택',
                    labelWidth: 55 ,
                    labelSeparator: '',
                    labelAlign: 'right',
                    msgTarget: 'side',
                    allowBlank: false,
                    //cls: 'field-margin',
                    width: 500
                }
                //{
                //    xtype :'tbspacer' ,
                //    width : 5,
                //    colspan : 1
                //},
                //{
                //    xtype :'button',
                //    text: '업로드',
                //    handler: 'onSubmit'
                //}
            ]
        }
    ]

});