/**
 * Created by jiscraft on 2022-11-15.
 */
Ext.define('Terp.view.pj.pj22k1501.Pj22k1501Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.pj22k1501',

    control: {
        'tsoftsearchform[reference=pj22k1501_searchform]': {
            boxready: 'onBoxReady_pj22k1501_searchform'
        }
        /*
            rowdblclick (obj , record , tr , rowIndex , e , eOpts)
            selectionchange (obj , selected , eOpt)
            change (obj, newValue, oldValue, eOpts )
            reconfigure 
            itemdblclick(obj , record , tr , rowIndex , e , eOpts)
            beforecellclick (obj, td, cellIndex, record, tr, rowIndex, e, eOpts)
            boxready (obj, width, height, eOpts ) -- grid
        */
    },
    
    init: function() {
        var me = this;
        me.commonFn = Terp.app.getController('TerpCommon');
        me.pj22k1501_headbutton = me.lookupReference('pj22k1501_headbutton');
        me.pj22k1501_searchform = me.lookupReference('pj22k1501_searchform');

        me.pj22k1501_grid1 = me.lookupReference('pj22k1501_grid1');
        me.pj22k1501_grid1_store =  me.getViewModel().getStore('pj22k1501_grid1_store') ;

        me.onInitValue();
    },

    onInitValue : function(){
        var me = this;
        //form helpform에는 콤보를 바인딩 해주어야함
        // me.commonFn.setCommonCode(me.lookupReference('pj22k1501_form1_fg_sm200') ,'SM200');
    },

    onBoxReady_pj22k1501_searchform : function(){
        var me = this;
        me.onSelect();
    },

    onSelect : function(){
        var me = this;
        me.onSelect_pj22k1501_grid1();

    },

    onSelect_pj22k1501_grid1 : function () {
        var me = this;

        var fgStatus = me.pj22k1501_searchform.down('[name=fg_statusString]').getValue().cbg;

        var fgStatusVar = '';
        if (Ext.isEmpty(fgStatus)){
            fgStatusVar ='';
        }else{
            if (Ext.isString(fgStatus) ){
                fgStatusVar = fgStatus ;
            } else{
                for (var i = 0; i < fgStatus.length; i++) {
                    fgStatusVar = fgStatusVar + fgStatus[i] + ',';
                }
            }


        }

        var jsonData = {
            'actiondata': 'm',
            'loginIduser': me.commonFn.getUserInfo('id_user'),
            'loginCdc': me.commonFn.getUserInfo('cd_c'),
            'cd_site':  me.pj22k1501_searchform.down('[name=cd_site]').getValue(),
            'cd_p':  me.pj22k1501_searchform.down('[name=cd_p]').getValue(),
            'fg_statusString':  fgStatusVar ,//me.pj22k1501_searchform.down('[name=fg_status]').getValue(),
            'dt_fr':  me.pj22k1501_searchform.down('[name=dt_fr]').getValue(),
            'dt_to':  me.pj22k1501_searchform.down('[name=dt_to]').getValue()

        };
        var sendDataJson = [];
        sendDataJson.push(jsonData);
        var sendDataJsonEncode = Ext.encode(sendDataJson);

        me.pj22k1501_grid1_store.load({
            params :{
                sendData : sendDataJsonEncode
            },
            callback : function(records, operation , success){
                var me = this;
                if (success == true) {
                    Ext.getBody().unmask();
                    if ( records.length > 0 ){
                        me.pj22k1501_grid1.getSelectionModel().select(0);
                    }
                    // me.onEditControlMode('select');
                } else {
                    Ext.getBody().unmask();
                    var errorMsg = this.getViewModel().getStore('pj22k1501_grid1_store').getProxy().getReader().rawData.msg;
                    me.commonFn.errorHandling(errorMsg);
                }
            },
            scope : me
        });
    },
});