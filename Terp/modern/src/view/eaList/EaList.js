/**
 * Created by Andrew on 2021-12-14.
 */
Ext.define('Terp.view.eaList.EaList', {
    extend: 'Ext.Panel',
    alias: 'widget.eaist',
    xtype: 'ealist',

    requires: [
        'Terp.view.eaList.EaListModel',
		'Terp.view.eaList.EaListController'
    ],

    controller: 'ealist',
    viewModel: {
        type: 'ealist'
    },

    tbar: [
        {
            xtype: 'button',
            reference: 'list_back_btn',
            iconCls: 'x-far fa-caret-square-left',
            // iconCls: '<i class="x-far fa-caret-square-left fa-2xl" ></i>',
            handler: 'onTap_BackBtn'
        },
        {
            xtype: 'spacer'
        },
        {
            xtype: 'component',
            reference: 'list_title',
            html: ''
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
            hidden: true,
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
            // plugins: {
            //     listpaging: {
            //         autoPaging: true,
            //         bufferZone: 10
            //     }
            // },
            cls: 'modern-ea-list',
            masked: false,
            striped: true,
            onItemDisclosure: 'onTap_EaListItemDisclosure'
        }
    ]

});