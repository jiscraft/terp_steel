/**
 * Created by jiscraft on 2016-01-08.
 */
Ext.define('Terp.controller.TerpController', {
    extend: 'Ext.app.Controller',

    config: {
        refs:{
            mainBar: 'main tabpanel[name=mainbar]'
        }
    },

    setMainBar:function(selectMenu , initSelectValue){
        // console.log(selectMenu ,initSelectValue );
        if (!this.getMainBar()) {
            Terp.app.getController('TerpCommon').setSystemInit();
            return;
        }
        var mainBar = this.getMainBar();
        var findTitle = false;
        for (var i=0; i<mainBar.getTabBar().items.items.length; i++) {
            if (selectMenu.text === mainBar.getTabBar(i).items.items[i].text) {
                mainBar.getLayout().setActiveItem(i);
                findTitle = true;

                if(!Ext.isEmpty(initSelectValue)){
                    var panel = Ext.create(selectMenu.dc_url, {
                        title: selectMenu.text,
                        closable: true,
                        reorderable: true,
                        autoShow: true,
                        autoDestroy: true,
                        selectMenuData: selectMenu ,
                        initSelectValue : initSelectValue ,
                        widowReturnData :''
                    });
                    mainBar.add(panel);
                    mainBar.getLayout().setActiveItem(panel);
                    this.onPanelInit(mainBar , selectMenu ); // 선택한메뉴를 생성한뒤 타이틀 및 메뉴등등을 셋팅한다
                }

                break;
            }
        }
        if (!findTitle) {
            var panel = Ext.create(selectMenu.dc_url, {
                title: selectMenu.text,
                closable: true,
                reorderable: true,
                autoShow: true,
                autoDestroy: true,
                selectMenuData: selectMenu ,
                initSelectValue : initSelectValue,
                widowReturnData :''
            });
            mainBar.add(panel);
            mainBar.getLayout().setActiveItem(panel);
            this.onPanelInit(mainBar , selectMenu ); // 선택한메뉴를 생성한뒤 타이틀 및 메뉴등등을 셋팅한다

        }
    },

    movePage:function(selectMenu, params){
        var mainBar = this.getMainBar();
        var findTitle = false;
        var panel;
        for(i=0; i< mainBar.getTabBar().items.items.length; i++){
            if(selectMenu.nm_menu == mainBar.getTabBar(i).items.items[i].text){
                mainBar.getLayout().setActiveItem(i);
                panel = mainBar.getLayout().getActiveItem();
                findTitle = true;
                break;
            }
        }
        if(findTitle == false){
            panel = Ext.create(selectMenu.dc_url,{
                autoShow:true
            });
            mainBar.add(panel);
            mainBar.getLayout().setActiveItem(panel);
            this.onPanelInit(mainBar , selectMenu );
        }
        panel.getController().calledByOther(params);


    },

    onPanelInit : function(mainBar , selectMenu){
        mainBar.getLayout().getActiveItem().getViewModel().set('pageTitle', selectMenu.text);

        var menu = mainBar.getLayout().getActiveItem();
        var buttonform = menu.down('[name = headButtons]');

        if(buttonform != null) {

            buttonform.down('[name = selectbutton]').setDisabled(false);
            // buttonform.setMenuRight(selectMenu);

            if (selectMenu.yn_insert == 'Y') {
                buttonform.down('[name = insertbutton]').setDisabled(false);
            } else {
                buttonform.remove(buttonform.down('[name = insertbutton]'));
            }
            if (selectMenu.yn_modify == 'Y') {
                buttonform.down('[name = modifybutton]').setDisabled(false);
            } else {
                buttonform.remove(buttonform.down('[name = modifybutton]'));
            }
            if (selectMenu.yn_delete == 'Y') {
                buttonform.down('[name = deletebutton]').setDisabled(false);
            } else {
                buttonform.remove(buttonform.down('[name = deletebutton]'));
            }
            if (selectMenu.yn_save == 'Y') {
                buttonform.down('[name = savebutton]').setDisabled(true);
            } else {
                buttonform.remove(buttonform.down('[name = savebutton]'));
            }
            if (selectMenu.yn_print == 'Y') {
                buttonform.down('[name = printbutton]').setDisabled(false);
            } else {
                buttonform.remove(buttonform.down('[name = printbutton]'));
            }

            buttonform.down('[name=helpbutton]').setDisabled(false);
            buttonform.down('[name=helpbutton]').on('click', function(b) {
                //var path = '/ServerPage/common/pdfViewer.jsp?path=/Manual/' + selectMenu.id_menu_original + '.pdf';
                //var pdfviewerwin = window.open(path, 'pdfviewer', 'left=0,top=0,width=1024,height=768,location=no,menubar=no,resizable=yes,scrollbars=yes,status=no,toolbar=no', true);
                var path = '/erpfiles/Manual/' + selectMenu.dc_url + '.pdf';
                var pdfviewerwin = window.open(path, 'pdfviewer', 'left=0,top=0,width=820,height=750,location=no,menubar=no,resizable=yes,scrollbars=yes,status=no,toolbar=no', true);
                pdfviewerwin.focus();
            });

            buttonform.fireEvent('panelinit', buttonform);  // 20160714 bkoh
        }

        this.getMainBar().on('tabchange', function(tp, newCard, oldCard) {
            var appMain = Ext.ComponentQuery.query('main')[0];
            var leftMenu = appMain.getController().MainLeftMenu;
            leftMenu.getSelectionModel().deselectAll();
            var parentNode = null;
            if (!Ext.isEmpty(newCard.selectMenuData) && !Ext.isEmpty(newCard.selectMenuData.id)) {
                leftMenu.getStore().findBy(function(record, id) {
                    if (newCard.selectMenuData.id_menu.substring(0,3) === record.get('id_menu')) {
                        leftMenu.expandNode(record, true, function() {
                            leftMenu.getStore().findBy(function(record, id) {
                                if (newCard.selectMenuData.id === id) {
                                    leftMenu.getSelectionModel().select(record);
                                    return true;
                                }
                            });
                        });
                        return true;
                    }
                });
            }
        });
    },

    // 20160617 bkoh
    getActiveMenuData: function() {
        var me = this;
        //console.log(this.getMainBar().getLayout().getActiveItem().selectMenuData);
        return this.getMainBar().getLayout().getActiveItem().selectMenuData;
    }


});