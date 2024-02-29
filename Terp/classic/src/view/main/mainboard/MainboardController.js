/**
 * Created by jiscr on 2022-01-17.
 */
Ext.define('Terp.view.main.mainboard.MainboardController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.mainboard',

    requires: [
        'Terp.view.bb.bb22a2001.bb22a2001popup.Bb22a2001popup',
        'Terp.view.main.mainboard.mainboardpopup.Mainboardpopup'
    ],

    control: {
        'mainboard': {
            boxready: 'onMainBoard_BoxReady'
        },
        'tsoftform[reference=mainboard_headform]': {
            boxready: 'onBoxReady_mainboard_headform'
        },
        'tsoftgrid[reference=mainboard_grid1]': {
            boxready: 'onBoxReady_mainboard_grid1'
        },
        'tsoftgrid[reference=mainboard_grid3]': {
            rowdblclick: 'onRowdblclick_mainboard_grid3'
        }
    },



    init: function() {
        var me = this;
        me.commonFn = Terp.app.getController('TerpCommon');
        me.mainboard_headform = me.lookupReference('mainboard_headform');
    
        me.mainboard_form1 = me.lookupReference('mainboard_form1');
        me.mainboard_form1_store =  me.getViewModel().getStore('mainboard_form1_store') ;

        me.mainboard_grid1 = me.lookupReference('mainboard_grid1');
        me.mainboard_grid1_store =  me.getViewModel().getStore('mainboard_grid1_store') ;

        me.mainboard_grid3 = me.lookupReference('mainboard_grid3');
        me.mainboard_grid3_store =  me.getViewModel().getStore('mainboard_grid3_store') ;
        me.mainboard_grid1_info_store=  me.getViewModel().getStore('mainboard_grid1_info_store') ;

        me.onInitValue();
    },
    
    onInitValue : function(){
        var me = this;
        var obj = me.commonFn.sqlSelect('sql' , "exec usp_sy_dateinfo 'thisweek' ");
        // console.log(obj);
        var insertData ={
            cd_e: me.commonFn.getUserInfo('cd_e'),
            nm_e :me.commonFn.getUserInfo('nm_e'),
            dt_fr : obj[0].dt_fr,
            dt_to : obj[0].dt_to
        };
        me.getViewModel().set('headFormData',insertData );
        var dtFr = me.getViewModel().getData().headFormData.dt_fr ;
        var dtTo = me.getViewModel().getData().headFormData.dt_to ;
        me.onSelect_form1( me.commonFn.getUserInfo('cd_c') , dtFr , dtTo , me.commonFn.getUserInfo('id_user'));
        me.onSelect_grid1( me.commonFn.getUserInfo('cd_c') , dtFr , dtTo , me.commonFn.getUserInfo('cd_e'));
        me.onSelect_grid3( me.commonFn.getUserInfo('cd_c') , dtFr , dtTo , me.commonFn.getUserInfo('cd_e'));


    },
    onMainBoard_BoxReady: function(p) {
        var me = this;
        me.getMainBoardMore();
    },


    onBoxReady_mainboard_grid1 : function(){
        var me = this;
        me.mainboard_grid1.getPlugin('cellplugin').on({

            beforeedit: function(editor, context) {
                console.log(context);
            },
            validateedit: function(editor, context) {
                //값이 맞는지 체크
            },
            edit: function(editor, context) {
            },
            canceledit: function(editor, context) {
            }

        });

    },

    getMainBoardMore : function(){
        var me = this;
        Ext.select('.board-more').each(function(item) {
            var me = this;
            Ext.get(item).on('click', function(e, t) {
                var eaMenuData = Terp.app.getStore('CommonMenu').findNode('dc_url', 'Terp.view.bb.bb22a2001.Bb22a2001').getData();
                if (!Ext.isEmpty(eaMenuData)) Terp.app.getController('TerpController').setMainBar(eaMenuData);
            });
        });
        Ext.select('.eawait-more').each(function(item) {
            var me = this;
            Ext.get(item).on('click', function(e, t) {
                var eaMenuData = Terp.app.getStore('CommonMenu').findNode('dc_url', 'Terp.view.gw.ea.ea21j2002.Ea21j2002').getData();
                if (!Ext.isEmpty(eaMenuData)) Terp.app.getController('TerpController').setMainBar(eaMenuData);
            });
        });

        Ext.select('.eawprocessing-more').each(function(item) {
            var me = this;
            Ext.get(item).on('click', function(e, t) {
                var eaMenuData = Terp.app.getStore('CommonMenu').findNode('dc_url', 'Terp.view.gw.ea.ea21j2003.Ea21j2003').getData();
                if (!Ext.isEmpty(eaMenuData)) Terp.app.getController('TerpController').setMainBar(eaMenuData);
            });
        });

        Ext.select('.eacc-more').each(function(item) {
            var me = this;
            Ext.get(item).on('click', function(e, t) {
                var eaMenuData = Terp.app.getStore('CommonMenu').findNode('dc_url', 'Terp.view.gw.ea.ea21j2006.Ea21j2006').getData();
                if (!Ext.isEmpty(eaMenuData)) Terp.app.getController('TerpController').setMainBar(eaMenuData);
            });
        });
    },

    onBoxReady_mainboard_headform : function(){
        var me = this;

    },

    prevButton : function(){
        var me = this;
        var obj = me.commonFn.sqlSelect('sql' , "exec usp_sy_dateinfo 'prevweek' , @p_dt = '" + me.mainboard_headform.down('[name = dt_fr]').getValue() +"'"  );
        console.log(obj);
        var insertData ={
            cd_e: me.commonFn.getUserInfo('cd_e'),
            nm_e :me.commonFn.getUserInfo('nm_e'),
            dt_fr : obj[0].dt_fr,
            dt_to : obj[0].dt_to
        };
        me.getViewModel().set('headFormData',insertData );
        var dtFr = me.getViewModel().getData().headFormData.dt_fr ;
        var dtTo = me.getViewModel().getData().headFormData.dt_to ;
        me.onSelect_grid1( me.commonFn.getUserInfo('cd_c') , dtFr , dtTo , me.commonFn.getUserInfo('cd_e'));
        // me.onSelect_grid1_info( me.commonFn.getUserInfo('cd_c') , dtFr , dtTo , me.commonFn.getUserInfo('cd_e'));
    },

    nextButton : function(){
        var me = this;
        var obj = me.commonFn.sqlSelect('sql' , "exec usp_sy_dateinfo 'nextweek' , @p_dt = '" + me.mainboard_headform.down('[name = dt_to]').getValue() +"'"  );
        // console.log(obj);
        var insertData ={
            cd_e: me.commonFn.getUserInfo('cd_e'),
            nm_e :me.commonFn.getUserInfo('nm_e'),
            dt_fr : obj[0].dt_fr,
            dt_to : obj[0].dt_to
        };
        me.getViewModel().set('headFormData',insertData );
        var dtFr = me.getViewModel().getData().headFormData.dt_fr ;
        var dtTo = me.getViewModel().getData().headFormData.dt_to ;
        me.onSelect_grid1( me.commonFn.getUserInfo('cd_c') , dtFr , dtTo , me.commonFn.getUserInfo('cd_e'));
        // me.onSelect_grid1_info( me.commonFn.getUserInfo('cd_c') , dtFr , dtTo , me.commonFn.getUserInfo('cd_e'));

    },



    onSelect_form1 : function(cdC , dtFr , dtTo , idUser){
        var me = this;
        var jsonData = {
            'actiondata': 'cntmainboard',
            'loginIduser': me.commonFn.getUserInfo('id_user'),
            'loginCdc':cdC,
            'dt_fr':  dtFr ,
            'dt_to':  dtTo

        };

        var sendDataJson = [];
        sendDataJson.push(jsonData);
        var sendDataJsonEncode = Ext.encode(sendDataJson);

        me.mainboard_form1_store.load({
            params :{
                sendData : sendDataJsonEncode
            },
            callback : function(records, operation , success){
                var me = this;
                if (success == true) {
                    Ext.getBody().unmask();
                    me.getViewModel().set('formData',me.mainboard_form1_store.data.items[0].data );
                } else {
                    Ext.getBody().unmask();
                    var errorMsg = this.getViewModel().getStore('mainboard_form1_store').getProxy().getReader().rawData.msg;
                    me.commonFn.errorHandling(errorMsg);
                }
            },
            scope : me
        });
    },

    onSelect_grid1 : function(cdC , dtFr , dtTo , cdE){
        var me = this;
        var jsonData = {
            'actiondata': 'mainboard',
            'loginIduser': me.commonFn.getUserInfo('id_user'),
            'loginCdc':cdC,
            'dt_fr':  dtFr ,
            'dt_to':  dtTo

        };

        var sendDataJson = [];
        sendDataJson.push(jsonData);
        var sendDataJsonEncode = Ext.encode(sendDataJson);

        me.mainboard_grid1_store.load({
            params :{
                sendData : sendDataJsonEncode
            },
            callback : function(records, operation , success){
                var me = this;
                if (success == true && records.length > 0) {
                    Ext.getBody().unmask();
                    var data = records[0].data ;
                    var names = [];
                    for (var name in data)
                    {
                        names.push(name);
                    }
                    // names.reverse();
                    var model = [];

                    model.push(
                        {
                            text:'구분',
                            dataIndex:'fg',
                            width:100,
                            align :'left',
                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view){
                                if (record.data.fg == ''){
                                    return view.grid.getMergeValue(value, metaData, record, rowIndex, colIndex, store, view);
                                }else if(record.data.fg == '2.현설'){
                                    metaData.tdCls = 'custom-red-gridcell';
                                    return view.grid.getMergeValue(value, metaData, record, rowIndex, colIndex, store, view);
                                }else if(record.data.fg == '3.입찰'){
                                    metaData.tdCls = 'custom-green-gridcell';
                                    return view.grid.getMergeValue(value, metaData, record, rowIndex, colIndex, store, view);
                                }else{
                                    return view.grid.getMergeValue(value, metaData, record, rowIndex, colIndex, store, view);
                                }
                            },
                            // renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            //     return view.grid.getMergeValue(value, metaData, record, rowIndex, colIndex, store, view);
                            // }
                        }
                    );

                    for(var i=0; i < names.length; i++) {
                        // console.log(names[i]);
                        if (names[i] == 'id' ||names[i] == 'sq' || names[i] == 'fg' )
                        {
                            continue;
                        }

                        model.push(
                            {
                                text: names[i].substr(0,4) +'-' + names[i].substr(4,2)+ '-' + names[i].substr(6, 2),
                                align: 'left',
                                width : 210 ,
                                heght : 25 ,
                                dataIndex: names[i],
                                // renderer: function(value, metaData, record, rowIndex, colIndex, store, view){
                                //     if (record.data.fg == ''){
                                //         return value;
                                //     }else if(record.data.fg == '2.현설'){
                                //
                                //         if (value != ''){
                                //             var models;
                                //             var models = me.mainboard_grid1_info_store.getRange();
                                //             var findRecordIndexconsole = me.mainboard_grid1_info_store.find('dc' , value );
                                //             var vartip = models[findRecordIndexconsole].get('dc_info');
                                //             // console.log(vartip);
                                //         }
                                //
                                //         metaData.tdCls = 'custom-red-gridcell';
                                //         if(vartip != undefined){
                                //             metaData.tdAttr = 'data-qtip="' + vartip +'"';
                                //         }
                                //
                                //         return value;
                                //     }else if(record.data.fg == '3.입찰'){
                                //         if (value != ''){
                                //             var models;
                                //             var models = me.mainboard_grid1_info_store.getRange();
                                //             var findRecordIndexconsole = me.mainboard_grid1_info_store.find('dc' , value );
                                //             var vartip = models[findRecordIndexconsole].get('dc_info');
                                //             // console.log(vartip);
                                //         }
                                //
                                //         metaData.tdCls = 'custom-green-gridcell';
                                //         if(vartip != undefined){
                                //             metaData.tdAttr = 'data-qtip="' + vartip +'"';
                                //         }
                                //
                                //         return value;
                                //     }else{
                                //         return value;
                                //     }
                                // }
                            }
                        )
                    }
                    me.mainboard_grid1.reconfigure(me.mainboard_grid1_store,model);




                } else {
                    Ext.getBody().unmask();
                    var errorMsg = this.getViewModel().getStore('mainboard_grid1_store').getProxy().getReader().rawData.msg;
                    me.commonFn.errorHandling(errorMsg);
                }
            },
            scope : me
        });

    },
    onSelect_grid3 : function(cdC , dtFr , dtTo , cdE){
        var me = this;
        var jsonData = {
            'actiondata': 'mainboardm',
            'loginIduser': me.commonFn.getUserInfo('id_user'),
            'loginCdc':cdC,
            'dt_fr':  dtFr ,
            'dt_to':  dtTo

        };

        var sendDataJson = [];
        sendDataJson.push(jsonData);
        var sendDataJsonEncode = Ext.encode(sendDataJson);

        me.mainboard_grid3_store.load({
            params :{
                sendData : sendDataJsonEncode
            },
            callback : function(records, operation , success){
                var me = this;
                if (success == true) {
                    Ext.getBody().unmask();


                } else {
                    Ext.getBody().unmask();
                    var errorMsg = this.getViewModel().getStore('mainboard_grid3_store').getProxy().getReader().rawData.msg;
                    me.commonFn.errorHandling(errorMsg);
                }
            },
            scope : me
        });

    },


    onRowdblclick_mainboard_grid3 : function(obj , record , tr , rowIndex , e , eOpts){
        var me = this;

        var paramjsonData = {
            'cd_ntc': record.data.cd_ntc,
            'fg_window':'edit'
        };


        var pop = Ext.create('Terp.view.bb.bb22a2001.bb22a2001popup.Bb22a2001popup',{
            popupParamView : me.getView() ,
            popupParams : paramjsonData ,
            autoShow: true
        });

        pop.on('close', function() {
            var dtFr = me.getViewModel().getData().headFormData.dt_fr ;
            var dtTo = me.getViewModel().getData().headFormData.dt_to ;
            me.onSelect_grid3( me.commonFn.getUserInfo('cd_c') , dtFr , dtTo , me.commonFn.getUserInfo('cd_e'));
        });

    },

    onButtonClik_mainboard_submit : function(){
        var me = this;
        var paramjsonData = {
        };


        var pop = Ext.create('Terp.view.main.mainboard.mainboardpopup.Mainboardpopup',{
            popupParamView : me.getView() ,
            popupParams : paramjsonData ,
            autoShow: true
        });

        pop.on('close', function() {
            var dtFr = me.getViewModel().getData().headFormData.dt_fr ;
            var dtTo = me.getViewModel().getData().headFormData.dt_to ;
            me.onSelect_grid1( me.commonFn.getUserInfo('cd_c') , dtFr , dtTo , me.commonFn.getUserInfo('cd_e'));
        });
    },

    onButtonClik_mainboard_reload : function () {
        var me = this;
        me.onInitValue();
    }

});