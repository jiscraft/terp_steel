/**
 * Created by jiscr on 2021-08-24.
 */
Ext.define('Terp.view.sy.sy21h2401.Sy21h2401Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.sy21h2401',

    init: function() {
        var me = this;
        me.commonFn = Terp.app.getController('TerpCommon');
        me.sy21h2401_headbutton = this.lookupReference('sy21h2401_headbutton');
        me.sy21h2401_searchform = this.lookupReference('sy21h2401_searchform');

        me.sy21h2401_grid1 = this.lookupReference('sy21h2401_grid1');
        me.sy21h2401_grid1_store =  this.getViewModel().getStore('sy21h2401_grid1_store') ;
        
        me.onInitValue();
        me.onSelect();
    },
    
    onInitValue : function(){
        var me = this;
        me.sy21h2401_grid1.setReadOnly(true);
    },
    
    onSelect : function(){
        var me = this;
        
        //조회조건에 값이 입력되었는지 체크
        // var searchValue = me.sy21h2401_searchform.down('[name=cd_site]').getValue();
        // if (searchValue  == '' ||  searchValue == null ){
        //     commonFn.toastMessage('현장코드를 선택후 조회하세요','t')  ;
        //     return;
        // };

        var sendDataJsonEncode = me.sy21h2401_searchform.makeSendData('r');

        Ext.getBody().mask('Loading...');
        me.sy21h2401_grid1_store.load({
            params :{
                sendData : sendDataJsonEncode
            },
            callback : me.onSelectCallback,
            scope : me
        });
    },


    onSelectCallback : function (records, operation , success) {
        var me = this;
        Ext.getBody().unmask();
        if (success) {
            me.sy21h2401_grid1.setReadOnly(true);
            me.sy21h2401_grid1.getSelectionModel().select(0);
            console.log(me.commonFn);
        }
        else {
            var errorMsg = this.getViewModel().getStore('sy21h2401_grid1_store').getProxy().getReader().rawData.msg;
            me.commonFn.errorHandling(errorMsg);
        }       
    }
});