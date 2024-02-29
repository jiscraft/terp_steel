/**
 * Created by jiscraft on 2016-06-04.
 */
Ext.define('Terp.view.tsoft.help.goodsclasshelp.TsoftGoodsClassHelpController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.tsoftgoodsclasshelp',

    init: function(obj , params ) {
        this.openPanel = obj;

        if (params != undefined   ) {
            this.getViewModel().set('p_search',params.p_search);
            //this.getViewModel().set('realValue',params.cd_o);
            //this.getViewModel().set('displayValue',params.nm_o);
            //this.getViewModel().set('cdovalue',params.nm_o);
        }

        this.onSelect();

    } ,

    onSelect : function(){
        var me = this;
        var formData = this.getView().down('[name = tsoftsearchform_goodsclass]');
        //console.log(formData);
        var sendDataJsonEncode = formData.makeSendData('help');
        this.getViewModel().getStore('goodclasshelp_store').load({
            params :{
                sendData : sendDataJsonEncode
            },
            callback : me.onSelectCallback,
            scope : me
        })
    },

    onSelectCallback : function(records, operation , success){
        if(success != true ){
            Ext.Msg.alert('fail',this.getViewModel().getStore('goodclasshelp_store').getProxy().getReader().rawData.msg);
        }else{

        }
    },

    onItemDbclickGrid : function(obj, selected, eOpts){
        //console.log(selected);
        this.openPanel.callbackPopup(selected.data);
        this.view.close();

    },

    onGridInsert_tsoftgoodsclasshelp_grid1 : function(gridSelection , gridRowindex){
        var me = this;
        if (gridRowindex == 0 || gridRowindex == undefined ){
            gridRowindex = 0 ;
        }
        var tsoftgoodsclasshelp_grid1 = me.lookupReference('tsoftgoodsclasshelp_grid1');
        var tsoftgoodsclasshelp_grid1_store = me.getViewModel().getStore('goodclasshelp_store') ;

        var gridRowindex_grid1 = tsoftgoodsclasshelp_grid1.getGridRowIdx();
        var gridSelection_grid1 = tsoftgoodsclasshelp_grid1.getGridSelection();
        console.log(gridSelection_grid1);
        
        var insertData ={
            cd_goods_class: '',
            nm_goods_class : '',
            yn_use : 'Y'

        };

        tsoftgoodsclasshelp_grid1.setReadOnly(false);
        tsoftgoodsclasshelp_grid1.getPlugin('cellplugin').completeEdit();


        tsoftgoodsclasshelp_grid1_store.insert(gridRowindex_grid1, insertData);
        tsoftgoodsclasshelp_grid1.getPlugin('cellplugin').startEditByPosition({
            row: gridRowindex_grid1,
            column: 0
        });

    },

    onGridModify_tsoftgoodsclasshelp_grid1 : function(){
        var me = this;
        var tsoftgoodsclasshelp_grid1 = me.lookupReference('tsoftgoodsclasshelp_grid1');

        tsoftgoodsclasshelp_grid1.setReadOnly(false);

    },


    onGridDelete_tsoftgoodsclasshelp_grid1 : function(){
        var me = this;
        var tsoftgoodsclasshelp_grid1 = me.lookupReference('tsoftgoodsclasshelp_grid1');
        var tsoftgoodsclasshelp_grid1_store = me.getViewModel().getStore('goodclasshelp_store') ;
        var gridRowindex = tsoftgoodsclasshelp_grid1.getGridRowIdx();
        var gridSelection = tsoftgoodsclasshelp_grid1.getGridSelection();


        tsoftgoodsclasshelp_grid1_store.remove(gridSelection);
        tsoftgoodsclasshelp_grid1.getSelectionModel().select(gridRowindex);
    },

    onGridSave_tsoftgoodsclasshelp_grid1 : function(){
        var me = this;
        var tsoftgoodsclasshelp_grid1 = me.lookupReference('tsoftgoodsclasshelp_grid1');
        var tsoftgoodsclasshelp_grid1_store = me.getViewModel().getStore('goodclasshelp_store') ;
        tsoftgoodsclasshelp_grid1.getPlugin('cellplugin').completeEdit();
        var sendData = tsoftgoodsclasshelp_grid1.makeSendData();

        Ext.Ajax.request({
            url :'../ServerPage/ma/ma_goods_class.jsp' ,
            method :'POST',
            params :{
                sendData : sendData
            },

            success :function(res){
                var obj = Ext.JSON.decode(res.responseText);
                if(obj.success){
                    commonFn.toastMessage("저장성공",'t');
                    tsoftgoodsclasshelp_grid1.setReadOnly(true);

                }else{
                    var errorMsg = obj.msg;
                    commonFn.errorHandling(errorMsg);

                }
            },
            fail : function(){
                commonFn.toastMessage("데이타처리중 오류가 발생했습니다",'t');
            }
        })
    }

});