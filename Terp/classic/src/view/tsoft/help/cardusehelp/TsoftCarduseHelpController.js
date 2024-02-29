/**
 * Created by jiscraft on 2017-07-04.
 */
Ext.define('Terp.view.tsoft.help.cardusehelp.TsoftCarduseHelpController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.tsoftcardusehelp',

    init: function(obj) {
        var me = this;
        me.openPanel = obj;
        me.tsoftcardusehelp_grid1 = this.lookupReference('tsoftcardusehelp_grid1');
        me.tsoftcardusehelp_grid1_store = this.getViewModel().getStore('tsoftcardusehelp_grid1_store');
        //console.log(obj.popupParams.dt_jc);
        //console.log(obj.popupParams.nm_fi030);
        this.lookupReference('searchForm').down('[name=dt_fr]').setValue(obj.popupParams.dt_jc == undefined ? '' :obj.popupParams.dt_jc.substring(0,8));
        this.lookupReference('searchForm').down('[name=dt_to]').setValue(obj.popupParams.dt_jc == undefined ? '' :obj.popupParams.dt_jc.substring(0,8 ));
        // this.lookupReference('searchForm').down('[name=h_search]').setValue(obj.popupParams.nm_fi030 == undefined ? '' : obj.popupParams.nm_fi030.substring(obj.popupParams.nm_fi030.length-5 , obj.popupParams.nm_fi030.length-1));
        this.lookupReference('searchForm').down('[name=h_search]').setValue(obj.popupParams.nm_fi030 == undefined ? obj.popupParamsHead.substring(obj.popupParamsHead.length-5 , obj.popupParamsHead.length-1) : obj.popupParams.nm_fi030.substring(obj.popupParams.nm_fi030.length-5 , obj.popupParams.nm_fi030.length-1));



        this.onSelect();
    },

    onSelect : function(){
        var me = this;

        searchForm = me.lookupReference('searchForm');
        console.log(searchForm)   ;

        if (searchForm.down('[name=dt_fr]').getValue().substring(0,6) !== searchForm.down('[name=dt_to]').getValue().substring(0,6)){
            commonFn.toastMessage('조회 시작일과 종료일은 같은 월이어야 합니다','t');
            return;
        }
        var sendDataJsonEncode = searchForm.makeSendData('help');

        this.getViewModel().getStore('tsoftcardusehelp_grid1_store').load({
            params :{
                sendData : sendDataJsonEncode

            },
            callback : me.onSelectCallback,
            scope : me
        })
    },

    onSelectCallback : function(records, operation , success){
        //console.log(records );
        if(success != true ){
            Ext.Msg.alert('fail',this.getViewModel().getStore('tsoftcardusehelp_grid1_store').getProxy().getReader().rawData.msg);
        }else{
            //this.onPageEditable(false);
        }
    },

    onItemDbclickGrid1 : function(obj, selected, eOpts){
        // console.log(selected.data);

        if ( selected.data.jc == '작성' ){
            commonFn.toastMessage('작성된 카드 사용은 선택할 수 없습니다','t');
            return;
        }

        this.openPanel.popupParamThisView.callbackPopup(selected.data);
        this.view.close();
        //this.closeView();



    }
});