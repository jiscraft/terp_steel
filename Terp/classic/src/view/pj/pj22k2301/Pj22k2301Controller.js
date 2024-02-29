/**
 * Created by jiscraft on 2022-11-23.
 */
Ext.define('Terp.view.pj.pj22k2301.Pj22k2301Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.pj22k2301',

    requires: [
        'Ext.util.Format'
    ],

    control: {
        'tsoftsearchform[reference=pj22k2301_searchform]': {
            boxready: 'onBoxReady_pj22k2301_searchform'
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
        me.pj22k2301_headbutton = me.lookupReference('pj22k2301_headbutton');
        me.pj22k2301_searchform = me.lookupReference('pj22k2301_searchform');

        me.pj22k2301_grid1 = me.lookupReference('pj22k2301_grid1');
        me.pj22k2301_grid1_store =  me.getViewModel().getStore('pj22k2301_grid1_store') ;

        me.pj22k2301_grid2 = me.lookupReference('pj22k2301_grid2');
        me.pj22k2301_grid2_store =  me.getViewModel().getStore('pj22k2301_grid2_store') ;

        me.pj22k2301_grid3 = me.lookupReference('pj22k2301_grid3');
        me.pj22k2301_grid3_store =  me.getViewModel().getStore('pj22k2301_grid3_store') ;

        me.pj22k2301_grid4 = me.lookupReference('pj22k2301_grid4');
        me.pj22k2301_grid4_store =  me.getViewModel().getStore('pj22k2301_grid4_store') ;

    },


    onBoxReady_pj22k2301_searchform : function(){
        var me = this;
        me.onSelect();
    },

    onSelect : function(){
        var me = this;

        var jsonData = {
            'loginIduser': me.commonFn.getUserInfo('id_user'),
            'loginCdc': me.commonFn.getUserInfo('cd_c'),
            'cd_site':  me.pj22k2301_searchform.down('[name=cd_site]').getValue(),
            'cd_p':  me.pj22k2301_searchform.down('[name=cd_p]').getValue(),
            'ym_fr':  me.pj22k2301_searchform.down('[name=ym_fr]').getValue(),
            'ym_to':  me.pj22k2301_searchform.down('[name=ym_to]').getValue()
        };

        me.onSelect_pj22k2301_grid1(jsonData ,'period');
        me.onSelect_pj22k2301_grid2(jsonData , 'site');
        me.onSelect_pj22k2301_grid3(jsonData , 'overgm');
        me.onSelect_pj22k2301_grid4(jsonData , 'm');

    },


    onSelect_pj22k2301_grid1 : function(jsonData , fgString){
        var me = this;

        jsonData.actiondata = fgString;
        jsonData.fg_statusString = me.pj22k2301_searchform.down('[name=fg_statusString]').getValue().cbg == '0' ? '0' : '1';
        jsonData.fg_statusString2 = me.pj22k2301_searchform.down('[name=fg_statusString2]').getValue().cbg == '0' ? '0' : '1';
        var sendDataJson = [];
        sendDataJson.push(jsonData);
        var sendDataJsonEncode = Ext.encode(sendDataJson);

        me.pj22k2301_grid1_store.removeAll();
        me.pj22k2301_grid1_store.load({
            params :{
                sendData : sendDataJsonEncode
            },
            callback : me.onSelctCallback_grid1,
            scope : me
        });
    },
    onSelctCallback_grid1 : function(records, operation , success){
        // console.log(records);
        var me = this;
        if(success == true && records.length > 0 ) {
            var data = records[0].data ;
            var names = [];
            for (var name in data)
            {
                names.push(name);
            }
            var model = [];
            model.push(
                {
                    text:  '구분' ,
                    width : 80,
                    align : 'center',
                    hideable: false,
                    dataIndex: 'fg_data',
                    tdCls: 'enforce-column-type1'
                },
                {
                    text:  '계' ,
                    width : 110,
                    align : 'right',
                    hideable: false,
                    dataIndex: 'at_gm_ttl',
                    renderer : function(value){
                        return value == 0 ? '' : Ext.util.Format.number(value, '0,000') ;
                    }
                }
            );


            for(var i=0; i < names.length; i++) {
                // console.log(names[i]);
                if (names[i] == 'cd_c' || names[i] == 'fg_data'  || names[i] == 'at_gm_ttl' || names[i] == 'id'
                )
                {
                    continue;
                }

                model.push(
                    {
                        //그리드 컬럼에 보여줄 컬럼명

                        text: names[i].substr(0,4) +'-' + names[i].substr(4,2),
                        align: 'right',
                        // flex : 1 ,
                        maxWidth : 150,
                        lockable: false,
                        dataIndex: names[i],
                        renderer : function(value , meta ){
                            if (meta.record.data.fg_data == '비율(%)')
                            {
                                meta.tdCls = 'custom-red-gridcell';
                                return value == 0 ? '' : Ext.util.Format.number(value, '0,000.0') ;
                            }

                            else
                                return value == 0 ? '' : Ext.util.Format.number(value, '0,000') ;
                        }

                    }
                )
            }




            me.pj22k2301_grid1.reconfigure(me.pj22k2301_grid1_store,model);
            me.pj22k2301_grid1 = this.lookupReference('pj22k2301_grid1');
        }else{
            me.pj22k2301_grid1_store.removeAll();
        }
    },

    onSelect_pj22k2301_grid2 : function(jsonData , fgString){
        var me = this;
        jsonData.actiondata = fgString;
        jsonData.fg_statusString = me.pj22k2301_searchform.down('[name=fg_statusString]').getValue().cbg == '0' ? '0' : '1';
        jsonData.fg_statusString2 = me.pj22k2301_searchform.down('[name=fg_statusString2]').getValue().cbg == '0' ? '0' : '1';
        var sendDataJson = [];
        sendDataJson.push(jsonData);
        var sendDataJsonEncode = Ext.encode(sendDataJson);
        me.pj22k2301_grid2_store.removeAll();
        me.pj22k2301_grid2_store.load({
            params :{
                sendData : sendDataJsonEncode
            },
            callback : me.onSelctCallback_grid2,
            scope : me
        });


    },
    onSelctCallback_grid2 : function(records, operation , success){
        // console.log(records);
        var me = this;
        if(success == true && records.length > 0 ) {
            var data = records[0].data ;
            var names = [];
            for (var name in data)
            {
                names.push(name);
            }
            var model = [];
            model.push(
                {
                    text:  '구분' ,
                    width : 80,
                    align : 'center',
                    hideable: false,
                    dataIndex: 'fg_data',
                    tdCls: 'enforce-column-type1'
                },
                // {
                //     text:  '계' ,
                //     width : 110,
                //     align : 'right',
                //     hideable: false,
                //     dataIndex: 'at_gs_ttl',
                //     renderer : function(value){
                //         return value == 0 ? '' : Ext.util.Format.number(value, '0,000') ;
                //     }
                // }
            );


            for(var i=0; i < names.length; i++) {
                // console.log(names[i]);
                if (names[i] == 'cd_c' || names[i] == 'fg_data'  || names[i] == 'at_gm_ttl' || names[i] == 'id'
                )
                {
                    continue;
                }

                model.push(
                    {
                        //그리드 컬럼에 보여줄 컬럼명

                        text: names[i],
                        align: 'right',
                        //flex : 1 ,
                        width : 150,
                        // maxWidth : 150,
                        lockable: false,
                        dataIndex: names[i],
                        renderer : function(value , meta ){
                            if (meta.record.data.fg_data == '비율(%)')
                            {
                                meta.tdCls = 'custom-red-gridcell';
                                return value == 0 ? '' : Ext.util.Format.number(value, '0,000.0') ;
                            }

                            else
                                return value == 0 ? '' : Ext.util.Format.number(value, '0,000') ;
                        }

                    }
                )
            }




            me.pj22k2301_grid2.reconfigure(me.pj22k2301_grid2_store,model);
            me.pj22k2301_grid2 = this.lookupReference('pj22k2301_grid2');
        }else{
            me.pj22k2301_grid2_store.removeAll();
        }
    },

    onSelect_pj22k2301_grid3 : function(jsonData , fgString){
        var me = this;
        jsonData.actiondata = fgString;
        jsonData.fg_statusString = me.pj22k2301_searchform.down('[name=fg_statusString]').getValue().cbg == '0' ? '0' : '1';
        jsonData.fg_statusString2 = me.pj22k2301_searchform.down('[name=fg_statusString2]').getValue().cbg == '0' ? '0' : '1';

        var sendDataJson = [];
        sendDataJson.push(jsonData);
        var sendDataJsonEncode = Ext.encode(sendDataJson);
        me.pj22k2301_grid3_store.removeAll();
        me.pj22k2301_grid3_store.load({
            params :{
                sendData : sendDataJsonEncode
            },
            callback : me.onSelctCallback_grid3,
            scope : me
        });


    },
    onSelctCallback_grid3 : function(records, operation , success){
        // console.log(records);
        var me = this;
        if(success == true && records.length > 0 ) {
            var data = records[0].data ;
            var names = [];
            for (var name in data)
            {
                names.push(name);
            }
            var model = [];
            model.push(
                {
                    text:  '구분' ,
                    width : 80,
                    align : 'center',
                    hideable: false,
                    dataIndex: 'fg_data',
                    tdCls: 'enforce-column-type1'
                },
                // {
                //     text:  '계' ,
                //     width : 110,
                //     align : 'right',
                //     hideable: false,
                //     dataIndex: 'at_gs_ttl',
                //     renderer : function(value){
                //         return value == 0 ? '' : Ext.util.Format.number(value, '0,000') ;
                //     }
                // }
            );


            for(var i=0; i < names.length; i++) {
                // console.log(names[i]);
                if (names[i] == 'cd_c' || names[i] == 'fg_data'  || names[i] == 'at_gs_ttl' || names[i] == 'id'
                )
                {
                    continue;
                }

                model.push(
                    {
                        //그리드 컬럼에 보여줄 컬럼명

                        text: names[i] ,
                        align: 'right',
                        flex : 1 ,
                        maxWidth : 150,
                        lockable: false,
                        dataIndex: names[i],
                        renderer : function(value , meta ){
                            if (meta.record.data.fg_data == '비율(%)')
                            {
                                meta.tdCls = 'custom-red-gridcell';
                                return value == 0 ? '' : Ext.util.Format.number(value, '0,000.0') ;
                            }

                            else
                                return value == 0 ? '' : Ext.util.Format.number(value, '0,000') ;
                        }

                    }
                )
            }

            me.pj22k2301_grid3.reconfigure(me.pj22k2301_grid3_store,model);
            me.pj22k2301_grid3 = this.lookupReference('pj22k2301_grid3');
        }else{
            me.pj22k2301_grid3_store.removeAll();
        }
    },

    onSelect_pj22k2301_grid4 : function(jsonData , fgString){
        var me = this;

        jsonData.actiondata = fgString;
        jsonData.fg_statusString = me.pj22k2301_searchform.down('[name=fg_statusString]').getValue().cbg == '0' ? '0' : '1';
        jsonData.fg_statusString2 = me.pj22k2301_searchform.down('[name=fg_statusString2]').getValue().cbg == '0' ? '0' : '1';

        var sendDataJson = [];
        sendDataJson.push(jsonData);
        var sendDataJsonEncode = Ext.encode(sendDataJson);

        me.pj22k2301_grid4_store.removeAll();
        me.pj22k2301_grid4_store.load({
            params :{
                sendData : sendDataJsonEncode
            },
            callback : function(records, operation , success){
                var me = this;
                if (success == true) {
                    Ext.getBody().unmask();
                    if ( records.length > 0 ){
                        me.pj22k2301_grid4.getSelectionModel().select(0);
                    }
                    // me.onEditControlMode('select');
                } else {
                    Ext.getBody().unmask();
                    var errorMsg = this.getViewModel().getStore('pj22k2301_grid4_store').getProxy().getReader().rawData.msg;
                    me.commonFn.errorHandling(errorMsg);
                }
            },
            scope : me
        });


    }

});