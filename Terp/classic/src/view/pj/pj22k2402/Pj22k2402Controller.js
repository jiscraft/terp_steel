/**
 * Created by jiscraft on 2022-11-25.
 */
Ext.define('Terp.view.pj.pj22k2402.Pj22k2402Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.pj22k2402',

    requires: [
        'Ext.util.Format'
    ],

    control: {
        'tsoftgrid[reference=pj22k2402_grid1]': {
            boxready: 'onBoxReady_pj22k2402_grid1'
        }
    },

    init: function() {
        var me = this;
        me.commonFn = Terp.app.getController('TerpCommon');
        me.pj22k2402_headbutton = me.lookupReference('pj22k2402_headbutton');
        me.pj22k2402_searchform = me.lookupReference('pj22k2402_searchform');

        me.pj22k2402_grid1 = me.lookupReference('pj22k2402_grid1');
        me.pj22k2402_grid1_store =  me.getViewModel().getStore('pj22k2402_grid1_store') ;


        me.pj22k2402_grid2 = me.lookupReference('pj22k2402_grid2');
        me.pj22k2402_grid2_store =  me.getViewModel().getStore('pj22k2402_grid2_store') ;

    },


    onBoxReady_pj22k2402_grid1 : function(){
        var me = this;

        me.onSelect();
    },

    onSelect : function(){
        var me = this;

        me.onSelect_pj22k2402_grid1();
        me.onSelect_pj22k2402_grid2();
    },

    onSelect_pj22k2402_grid1 : function(){
        var me = this;
        var jsonData = {
            'actiondata': 'm',
            'loginIduser': me.commonFn.getUserInfo('id_user'),
            'loginCdc': me.commonFn.getUserInfo('cd_c')
        };

        var sendDataJson = [];
        sendDataJson.push(jsonData);
        var sendDataJsonEncode = Ext.encode(sendDataJson);

        me.pj22k2402_grid1_store.removeAll();
        me.pj22k2402_grid1_store.load({
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
                    text:  '현장' ,
                    width : 200,
                    align : 'center',
                    hideable: false,
                    dataIndex: 'nm_site',
                    tdCls: 'enforce-column-type1'
                },
                {
                    text:  '계' ,
                    width : 120,
                    align : 'right',
                    hideable: false,
                    dataIndex: 'ttl',
                    renderer : function(value , meta){
                        return value == 0 ? '' : Ext.util.Format.number(value, '0,000') ;
                    },
                    summaryType :'sum',
                    summaryRenderer: function (value, summaryData, dataIndex, rowIndex, colIndex, store, view) {
                        return Ext.util.Format.number((Ext.isNumeric(value) ? value : 0 ), '0,000');
                    }
                },
                {
                    text:  '금월입금' ,
                    width : 120,
                    align : 'right',
                    hideable: false,
                    dataIndex: '000000',
                    editor :'tsoftnumberfield',
                    renderer : function(value , meta){
                        meta.tdCls = 'custom-blue-gridcell';
                        return value == 0 ? '' : Ext.util.Format.number(value, '0,000') ;
                    },
                    summaryType :'sum',
                    summaryRenderer: function (value, summaryData, dataIndex, rowIndex, colIndex, store, view) {
                        return Ext.util.Format.number((Ext.isNumeric(value) ? value : 0 ), '0,000');
                    }
                }
            );


            for(var i=0; i < names.length; i++) {
                // console.log(names[i]);
                if (names[i] == 'cd_c' || names[i] == 'nm_site' || names[i] == 'cd_site'  || names[i] == 'ttl' || names[i] == 'id' || names[i] == '000000'
                )
                {
                    continue;
                }

                model.push(
                    {
                        //그리드 컬럼에 보여줄 컬럼명

                        text: names[i] == '999999' ? '미수' : (names[i] == '000000' ? '금월' : (names[i].substr(0,4) +'-' + names[i].substr(4,2))),
                        align: 'right',
                        width : 120 ,
                        //maxWidth : 180,
                        lockable: false,
                        dataIndex: names[i],
                        editor :'tsoftnumberfield',
                        renderer : function(value , meta ){
                            return value == 0 ? '' : Ext.util.Format.number(value, '0,000') ;
                        },
                        summaryType :'sum',
                        summaryRenderer: function (value, summaryData, dataIndex, rowIndex, colIndex, store, view) {
                            return Ext.util.Format.number((Ext.isNumeric(value) ? parseInt(value) : 0 ), '0,000');
                        }
                    }
                )
            }


            for (var i = 0 ; i < me.pj22k2402_grid1_store.data.length ; i++) {
                var selectdata = me.pj22k2402_grid1_store.data.items[i].data;

                for (var name in selectdata) {
                    if ((name === "ttl" || name === "nm_site" || name === "cd_site" || name === "id" || name === "cd_c")) {
                        continue;
                    }
                    if (!Ext.isNumeric(selectdata[name])){
                        me.pj22k2402_grid1_store.data.items[i].data[name] = 0;
                    }
                    me.pj22k2402_grid1_store.data.items[i].data.ttl = me.pj22k2402_grid1_store.data.items[i].data.ttl + (Ext.isNumeric(selectdata[name]) ? selectdata[name] : 0);
                }


            }
            me.pj22k2402_grid1.reconfigure(me.pj22k2402_grid1_store,model);
        }else{
            me.pj22k2402_grid1_store.removeAll();
        }
    },

    onSelect_pj22k2402_grid2 : function(){
        var me = this;
        var jsonData = {
            'actiondata': 'mpartner',
            'loginIduser': me.commonFn.getUserInfo('id_user'),
            'loginCdc': me.commonFn.getUserInfo('cd_c')
        };

        var sendDataJson = [];
        sendDataJson.push(jsonData);
        var sendDataJsonEncode = Ext.encode(sendDataJson);

        me.pj22k2402_grid2_store.removeAll();
        me.pj22k2402_grid2_store.load({
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
                    text:  '건설사' ,
                    width : 200,
                    align : 'center',
                    hideable: false,
                    dataIndex: 'nm_p',
                    tdCls: 'enforce-column-type1'
                },
                {
                    text:  '계' ,
                    width : 120,
                    align : 'right',
                    hideable: false,
                    dataIndex: 'ttl',
                    renderer : function(value , meta){
                        return value == 0 ? '' : Ext.util.Format.number(value, '0,000') ;
                    },
                    summaryType :'sum',
                    summaryRenderer: function (value, summaryData, dataIndex, rowIndex, colIndex, store, view) {
                        return Ext.util.Format.number((Ext.isNumeric(value) ? value : 0 ), '0,000');
                    }
                },
                {
                    text:  '금월입금' ,
                    width : 120,
                    align : 'right',
                    hideable: false,
                    dataIndex: '000000',
                    editor :'tsoftnumberfield',
                    renderer : function(value , meta){
                        meta.tdCls = 'custom-blue-gridcell';
                        return value == 0 ? '' : Ext.util.Format.number(value, '0,000') ;
                    },
                    summaryType :'sum',
                    summaryRenderer: function (value, summaryData, dataIndex, rowIndex, colIndex, store, view) {
                        return Ext.util.Format.number((Ext.isNumeric(value) ? value : 0 ), '0,000');
                    }
                }
            );


            for(var i=0; i < names.length; i++) {
                // console.log(names[i]);
                if (names[i] == 'cd_c' || names[i] == 'nm_p' || names[i] == 'cd_site'  || names[i] == 'ttl' || names[i] == 'id' || names[i] == '000000'
                )
                {
                    continue;
                }

                model.push(
                    {
                        //그리드 컬럼에 보여줄 컬럼명

                        text: names[i] == '999999' ? '미수' : (names[i] == '000000' ? '금월' : (names[i].substr(0,4) +'-' + names[i].substr(4,2))),
                        align: 'right',
                        width : 120 ,
                        //maxWidth : 180,
                        lockable: false,
                        dataIndex: names[i],
                        editor :'tsoftnumberfield',
                        renderer : function(value , meta ){
                            return value == 0 ? '' : Ext.util.Format.number(value, '0,000') ;
                        },
                        summaryType :'sum',
                        summaryRenderer: function (value, summaryData, dataIndex, rowIndex, colIndex, store, view) {
                            return Ext.util.Format.number((Ext.isNumeric(value) ? parseInt(value) : 0 ), '0,000');
                        }
                    }
                )
            }


            for (var i = 0 ; i < me.pj22k2402_grid2_store.data.length ; i++) {
                var selectdata = me.pj22k2402_grid2_store.data.items[i].data;

                for (var name in selectdata) {
                    if ((name === "ttl" || name === "nm_p" || name === "cd_site" || name === "id" || name === "cd_c")) {
                        continue;
                    }
                    if (!Ext.isNumeric(selectdata[name])){
                        me.pj22k2402_grid2_store.data.items[i].data[name] = 0;
                    }
                    me.pj22k2402_grid2_store.data.items[i].data.ttl = me.pj22k2402_grid2_store.data.items[i].data.ttl + (Ext.isNumeric(selectdata[name]) ? selectdata[name] : 0);
                }


            }
            me.pj22k2402_grid2.reconfigure(me.pj22k2402_grid2_store,model);
        }else{
            me.pj22k2402_grid2_store.removeAll();
        }
    },


});