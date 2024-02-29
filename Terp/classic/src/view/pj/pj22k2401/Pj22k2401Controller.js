/**
 * Created by jiscraft on 2022-11-24.
 */
Ext.define('Terp.view.pj.pj22k2401.Pj22k2401Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.pj22k2401',

    requires: [
        'Ext.util.Format'
    ],

    control: {
        'tsoftgrid[reference=pj22k2401_grid1]': {
            boxready: 'onBoxReady_pj22k2401_grid1'
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
        me.pj22k2401_headbutton = me.lookupReference('pj22k2401_headbutton');
        me.pj22k2401_searchform = me.lookupReference('pj22k2401_searchform');

        me.pj22k2401_grid1 = me.lookupReference('pj22k2401_grid1');
        me.pj22k2401_grid1_store =  me.getViewModel().getStore('pj22k2401_grid1_store') ;

        me.pj22k2401_grid2 = me.lookupReference('pj22k2401_grid2');
        me.pj22k2401_grid2_store =  me.getViewModel().getStore('pj22k2401_grid2_store') ;

        me.pj22k2401_grid3 = me.lookupReference('pj22k2401_grid3');
        me.pj22k2401_grid3_store =  me.getViewModel().getStore('pj22k2401_grid3_store') ;

        me.pj22k2401_grid4 = me.lookupReference('pj22k2401_grid4');
        me.pj22k2401_grid4_store =  me.getViewModel().getStore('pj22k2401_grid4_store') ;

        me.pj22k2401_grid5 = me.lookupReference('pj22k2401_grid5');
        me.pj22k2401_grid5_store =  me.getViewModel().getStore('pj22k2401_grid5_store') ;

        me.pj22k2401_grid1.setReadOnly(true);

    },


    onBoxReady_pj22k2401_grid1 : function(){
        var me = this;

        me.onSelect();
    },

    onSelect : function(){
        var me = this;

        me.onSelect_pj22k2401_grid1();
        me.onSelect_pj22k2401_grid2();
        me.onSelect_pj22k2401_grid3();
        me.onSelect_pj22k2401_grid4();

    },

    onSelect_pj22k2401_grid1 : function(){
        var me = this;
        var jsonData = {
            'actiondata': 'site',
            'loginIduser': me.commonFn.getUserInfo('id_user'),
            'loginCdc': me.commonFn.getUserInfo('cd_c')
        };

        var sendDataJson = [];
        sendDataJson.push(jsonData);
        var sendDataJsonEncode = Ext.encode(sendDataJson);

        me.pj22k2401_grid1_store.removeAll();
        me.pj22k2401_grid1_store.load({
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
                    width : 120,
                    align : 'right',
                    hideable: false,
                    dataIndex: 'ttl',
                    renderer : function(value , meta){
                        if (meta.record.data.fg_data == '수주잔고')
                        {
                            meta.tdCls = 'custom-blue-gridcell';
                        }
                        return value == 0 ? '' : Ext.util.Format.number(value, '0,000') ;
                    }
                }
            );


            for(var i=0; i < names.length; i++) {
                // console.log(names[i]);
                if (names[i] == 'cd_c' || names[i] == 'fg_data'  || names[i] == 'ttl' || names[i] == 'id'
                )
                {
                    continue;
                }

                model.push(
                    {
                        //그리드 컬럼에 보여줄 컬럼명

                        text: names[i],
                        align: 'right',
                        width : 120 ,
                        //maxWidth : 180,
                        lockable: false,
                        dataIndex: names[i],
                        renderer : function(value , meta ){
                            if (meta.record.data.fg_data == '수주잔고')
                            {
                                meta.tdCls = 'custom-blue-gridcell';
                                return value == 0 ? '' : Ext.util.Format.number(value, '0,000') ;
                            }
                            else{
                                return value == 0 ? '' : Ext.util.Format.number(value, '0,000') ;
                            }
                        }
                    }
                )
            }

            //me.pj22k2401_grid1.reconfigure(me.pj22k2401_grid1_store,model);

            for (i = 0 ; i < me.pj22k2401_grid1_store.data.length ;i++){
                var data = me.pj22k2401_grid1_store.data.items[i].data;

                for ( var name in data){
                        if (!(name == 'ttl' || name == 'fg_data'  || name == 'id' || name == 'cd_c')){
                            me.pj22k2401_grid1_store.data.items[i].data.ttl = me.pj22k2401_grid1_store.data.items[i].data.ttl + (data[name] =="" ? 0 : data[name]);
                            // console.log(me.pj22k2401_grid1_store.data.items[i].data.ttl);
                        }
                }
            }
            // console.log(me.pj22k2401_grid1_store.data);
            me.pj22k2401_grid1.reconfigure(me.pj22k2401_grid1_store,model);
        }else{
            me.pj22k2401_grid1_store.removeAll();
        }
    },

    onSelect_pj22k2401_grid2 : function(){
        var me = this;
        var jsonData = {
            'actiondata': 'partner',
            'loginIduser': me.commonFn.getUserInfo('id_user'),
            'loginCdc': me.commonFn.getUserInfo('cd_c')
        };

        var sendDataJson = [];
        sendDataJson.push(jsonData);
        var sendDataJsonEncode = Ext.encode(sendDataJson);


        me.pj22k2401_grid2_store.removeAll();
        me.pj22k2401_grid2_store.load({
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

                {
                    text:  '계' ,
                    width : 120,
                    align : 'right',
                    hideable: false,
                    dataIndex: 'ttl',
                    renderer : function(value , meta){
                        if (meta.record.data.fg_data == '수주잔고')
                        {
                            meta.tdCls = 'custom-blue-gridcell';
                        }
                        return value == 0 ? '' : Ext.util.Format.number(value, '0,000') ;
                    }
                }
            );


            for(var i=0; i < names.length; i++) {
                // console.log(names[i]);
                if (names[i] == 'cd_c' || names[i] == 'fg_data'  || names[i] == 'ttl' || names[i] == 'id'
                )
                {
                    continue;
                }

                model.push(
                    {
                        //그리드 컬럼에 보여줄 컬럼명

                        text: names[i],
                        align: 'right',
                        width : 120,
                        lockable: false,
                        dataIndex: names[i],
                        renderer : function(value , meta ){
                            if (meta.record.data.fg_data == '수주잔고')
                            {
                                meta.tdCls = 'custom-blue-gridcell';
                                return value == 0 ? '' : Ext.util.Format.number(value, '0,000') ;
                            }

                            else
                                return value == 0 ? '' : Ext.util.Format.number(value, '0,000') ;
                        }

                    }
                )
            }


            for (i = 0 ; i < me.pj22k2401_grid2_store.data.length ;i++){
                var data = me.pj22k2401_grid2_store.data.items[i].data;

                for ( var name in data){
                    if (!(name == 'ttl' || name == 'fg_data'  || name == 'id' || name == 'cd_c')){
                        me.pj22k2401_grid2_store.data.items[i].data.ttl = me.pj22k2401_grid2_store.data.items[i].data.ttl + (data[name] =="" ? 0 : data[name]);
                    }
                }
            }
            console.log(me.pj22k2401_grid2_store.data);
            me.pj22k2401_grid2.reconfigure(me.pj22k2401_grid2_store,model);

        }else{
            me.pj22k2401_grid2_store.removeAll();
        }
    },

    onSelect_pj22k2401_grid3 : function(){
        var me = this;
        var jsonData = {
            'actiondata': 'pj020',
            'loginIduser': me.commonFn.getUserInfo('id_user'),
            'loginCdc': me.commonFn.getUserInfo('cd_c')
        };

        var sendDataJson = [];
        sendDataJson.push(jsonData);
        var sendDataJsonEncode = Ext.encode(sendDataJson);


        me.pj22k2401_grid3_store.removeAll();
        me.pj22k2401_grid3_store.load({
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
                {
                    text:  '계' ,
                    width : 120,
                    align : 'right',
                    hideable: false,
                    dataIndex: 'ttl',
                    renderer : function(value , meta){
                        if (meta.record.data.fg_data == '수주잔고')
                        {
                            meta.tdCls = 'custom-blue-gridcell';
                        }
                        return value == 0 ? '' : Ext.util.Format.number(value, '0,000') ;
                    }
                }
            );


            for(var i=0; i < names.length; i++) {
                // console.log(names[i]);
                if (names[i] == 'cd_c' || names[i] == 'fg_data'  || names[i] == 'ttl' || names[i] == 'id'
                )
                {
                    continue;
                }

                model.push(
                    {
                        //그리드 컬럼에 보여줄 컬럼명

                        text: names[i],
                        align: 'right',
                        flex : 1 ,
                        maxWidth : 120,
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



            for (i = 0 ; i < me.pj22k2401_grid3_store.data.length ;i++){
                var data = me.pj22k2401_grid3_store.data.items[i].data;

                for ( var name in data){
                    if (!(name == 'ttl' || name == 'fg_data'  || name == 'id' || name == 'cd_c')){
                        me.pj22k2401_grid3_store.data.items[i].data.ttl = me.pj22k2401_grid3_store.data.items[i].data.ttl + (data[name] =="" ? 0 : data[name]);
                    }
                }
            }
            me.pj22k2401_grid3.reconfigure(me.pj22k2401_grid3_store,model);

        }else{
            me.pj22k2401_grid3_store.removeAll();
        }
    },

    onSelect_pj22k2401_grid4 : function(){
        var me = this;
        var jsonData = {
            'actiondata': 'pj010',
            'loginIduser': me.commonFn.getUserInfo('id_user'),
            'loginCdc': me.commonFn.getUserInfo('cd_c')
        };

        var sendDataJson = [];
        sendDataJson.push(jsonData);
        var sendDataJsonEncode = Ext.encode(sendDataJson);


        me.pj22k2401_grid4_store.removeAll();
        me.pj22k2401_grid4_store.load({
            params :{
                sendData : sendDataJsonEncode
            },
            callback : me.onSelctCallback_grid4,
            scope : me
        });


    },
    onSelctCallback_grid4 : function(records, operation , success){
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
                    width : 120,
                    align : 'right',
                    hideable: false,
                    dataIndex: 'ttl',
                    renderer : function(value , meta){
                        if (meta.record.data.fg_data == '수주잔고')
                        {
                            meta.tdCls = 'custom-blue-gridcell';
                        }
                        return value == 0 ? '' : Ext.util.Format.number(value, '0,000') ;
                    }
                }
            );


            for(var i=0; i < names.length; i++) {
                // console.log(names[i]);
                if (names[i] == 'cd_c' || names[i] == 'fg_data'  || names[i] == 'ttl' || names[i] == 'id'
                )
                {
                    continue;
                }
                model.push(
                    {
                        //그리드 컬럼에 보여줄 컬럼명

                        text: names[i],
                        align: 'right',
                        flex : 1 ,
                        maxWidth : 120,
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

            for (i = 0 ; i < me.pj22k2401_grid4_store.data.length ;i++){
                var data = me.pj22k2401_grid4_store.data.items[i].data;

                for ( var name in data){
                    if (!(name == 'ttl' || name == 'fg_data'  || name == 'id' || name == 'cd_c')){
                        me.pj22k2401_grid4_store.data.items[i].data.ttl = me.pj22k2401_grid4_store.data.items[i].data.ttl + (data[name] =="" ? 0 : data[name]) ;
                    }
                }
            }
            me.pj22k2401_grid4.reconfigure(me.pj22k2401_grid4_store,model);
        }else{
            me.pj22k2401_grid4_store.removeAll();
        }
    }

});