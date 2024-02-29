/**
 * Created by Andrew on 2021-12-31.
 */
Ext.define('Terp.view.jcList.JcList', {
    extend: 'Ext.Panel',
    alias: 'widget.jclist',
    xtype: 'jclist',

    requires: [
        'Ext.dataview.List',
        'Ext.layout.VBox',
        'Terp.view.jcList.JcListController',
        'Terp.view.jcList.JcListModel'
    ],

    controller: 'jclist',
    viewModel: {
        type: 'jclist'
    },

    tbar: [
        {
            xtype: 'button',
            reference: 'list_back_btn',
            iconCls: 'x-fas fa-chevron-left',
            handler: 'onTap_BackBtn'
        },
        {
            xtype: 'spacer'
        },
        {
            xtype: 'component',
            reference: 'list_title',
            html: '지출결의서'
        },
        {
            xtype: 'spacer'
        },
        {
            xtype: 'button',
            reference: 'list_search_btn',
            text: '',
            iconCls: 'x-fas fa-search',
            handler: 'onTap_SearchBtn'
        },
        {
            xtype: 'button',
            reference: 'list_add_btn',
            text: '',
            iconCls: 'x-fas fa-plus-circle',
            handler: 'onTap_AddBtn'
        }
    ],

    bbar: [
        {
            xtype: 'button',
            reference: 'clear_search_word_btn',
            text: '',
            textAlign: 'left',
            iconCls: 'x-fas fa-times',
            ui: 'decline round',
            maxWidth: 240,
            hidden: true,
            handler: 'onTap_ClearSearchWordBtn'
        },
        {
            xtype: 'spacer'
        },
        {
            xtype: 'component',
            reference: 'list_item_cnt',
            html: ''
        },
        {
            xtype: 'button',
            reference: 'list_refresh_btn',
            text: '',
            iconCls: 'x-fas fa-sync-alt',
            handler: 'onTap_RefreshBtn'
        }
    ],

    scrollable: true,
    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    items: [
        {
            xtype: 'list',
            reference: 'list_view',
            cls: 'modern-ea-list',
            masked: false,
            striped: true,
            onItemDisclosure: 'onTap_ListItemDisclosure'
        }
    ]

});