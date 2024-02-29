/**
 * Created by jiscraft on 2016-01-18.
 */
Ext.define('Terp.view.tsoft.componentux.TsoftHeadButtons', {
    extend: 'Ext.Container',
    xtype: 'tsoftheadbuttons',
    requires: [
        'Ext.button.Button',
        'Ext.layout.container.HBox',
        'Ext.toolbar.Fill'
    ],
    layout:'hbox',
    width:'100%',
    padding : '4 4 4 0',
    // config :{
    //     menuRight :''
    // },
    name :'headButtons' ,
    items: [
        {
            xtype:'button',
            text : '  조 회',
            height : 24,
            width : 70 ,
            handler : 'onSelect',
            name: 'selectbutton',
            cls :'x-btn-default-small-custom',
            iconCls: 'fas fa-search',
            scale : 'small',
            iconAlign: 'left'

        },
        {
            xtype:'button',
            text : '  수 정',
            height : 24,
            width : 70 ,
            handler :'onModify',
            name: 'modifybutton',
            cls :'x-btn-default-small-custom',
            //iconCls: 'mymodifyimagebutton',
            iconCls: 'fas fa-edit',
            scale : 'small',
            iconAlign: 'left'
        },
        {
            xtype:'button',
            text : '  추 가',
            height : 24,
            width : 70 ,
            handler : 'onInsert',
            name: 'insertbutton',
            cls :'x-btn-default-small-custom',
            iconCls: 'fas fa-plus',
            //iconCls: 'myinsertimagebutton',
            scale : 'small',
            iconAlign: 'left',
            config : {
                yn_right : 'Y'
            }
        },
        {
            xtype:'button',
            text : '  삭 제',
            height : 24,
            width : 70 ,
            handler :'onDelete',
            name: 'deletebutton',
            cls :'x-btn-default-small-custom',
            iconCls: 'fas fa-trash',
            scale : 'small',
            iconAlign: 'left'
        },
		{
			xtype: 'tbfill'
		},
        {
            xtype:'button',
            text : '  저 장',
            height : 24,
            width : 70 ,
            handler : 'onSave',
            name: 'savebutton',
            cls :'x-btn-default-small-custom',
            iconCls: 'fas fa-check',
            //iconCls: 'mysaveimagebutton',
            scale : 'small',
            iconAlign: 'left'
        },
        {
            xtype:'button',
            text : '  인 쇄',
            height : 24,
            width : 70 ,
            handler :'onPrint',
            name: 'printbutton',
            cls :'x-btn-default-small-custom',
            iconCls: 'fas fa-print',
            //iconCls: 'myprintimagebutton',
            scale : 'small',
            iconAlign: 'left'
        },
        {
            xtype:'button',
            text : '  도움말',
            height : 24,
            width : 70 ,
            //handler :'onHelp',
            name: 'helpbutton',
            cls :'x-btn-default-small-custom',
            iconCls: 'fas fa-question-circle',
            //iconCls: 'myhelpimagebutton',
            scale : 'small',
            iconAlign: 'left'
        }

    ],

    setActiveButton : function( jsonValue  ){
        var me = this;
        var selectMenuData ='';

        if (!Ext.isEmpty(me.down('[name = savebutton]'))) {
            me.down('[name = savebutton]').setDisabled(false);
        }

        if ( Ext.isEmpty(me.up('[name=thisPage]').config.popupParamView)){
            selectMenuData = me.up('[name=thisPage]').config.selectMenuData;
        }else{
            if (!Ext.isEmpty(selectMenuData = me.up('[name=thisPage]').config.popupParamView.config.selectMenuData)){
                selectMenuData = me.up('[name=thisPage]').config.popupParamView.config.selectMenuData;
            }else{
                selectMenuData = me.up('[name=thisPage]').config.popupParamView.config.selectMenuData;
            }
        }

        if (!Ext.isEmpty(me.down('[name = insertbutton]'))) {
            if (selectMenuData.yn_insert =='Y'){
                if (jsonValue.insert =='Y'){
                    me.down('[name = insertbutton]').show();
                }else{
                    me.down('[name = insertbutton]').hide();
                }
            }else{
                me.down('[name = insertbutton]').hide();
            }
        }

        if (!Ext.isEmpty(me.down('[name = modifybutton]'))){
            if (selectMenuData.yn_modify =='Y'){
                if (jsonValue.modify =='Y'){
                    me.down('[name = modifybutton]').show();
                }else{
                    me.down('[name = modifybutton]').hide();
                }
            }else{
                me.down('[name = modifybutton]').hide();
            }
        }

        if (!Ext.isEmpty(me.down('[name = deletebutton]'))){
            if (selectMenuData.yn_delete =='Y'){
                if (jsonValue.delete =='Y'){
                    me.down('[name = deletebutton]').show();
                }else{
                    me.down('[name = deletebutton]').hide();
                }
            }else{
                me.down('[name = deletebutton]').hide();
            }
        }

        if (!Ext.isEmpty(me.down('[name = savebutton]'))){
            if (selectMenuData.yn_save =='Y'){
                if (jsonValue.save =='Y'){
                    me.down('[name = savebutton]').show();
                }else{
                    me.down('[name = savebutton]').hide();
                }
            }else{
                me.down('[name = savebutton]').hide();
            }
        }

        if (!Ext.isEmpty(me.down('[name = printbutton]'))){
            if (selectMenuData.yn_print =='Y'){
                if (jsonValue.print =='Y'){
                    me.down('[name = printbutton]').show();
                }else{
                    me.down('[name = printbutton]').hide();
                }
            }else{
                me.down('[name = printbutton]').hide();
            }
        }

        if (!Ext.isEmpty(me.down('[name = selectbutton]'))){
            if (!Ext.isEmpty(me.down('[name = selectbutton]'))){
                if (jsonValue.select =='Y'){
                    me.down('[name = selectbutton]').show();
                }else{
                    me.down('[name = selectbutton]').hide();
                }
            }else{
                me.down('[name = selectbutton]').hide();
            }
        }

        if (!Ext.isEmpty(me.down('[name = helpbutton]'))){
            if (!Ext.isEmpty(me.down('[name = helpbutton]'))){
                if (jsonValue.help =='Y'){
                    me.down('[name = helpbutton]').show();
                }else{
                    me.down('[name = helpbutton]').hide();
                }
            }else{
                me.down('[name = helpbutton]').hide();
            }
        }


    }





});