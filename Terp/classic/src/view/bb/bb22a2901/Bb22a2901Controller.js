/**
 * Created by jiscr on 2022-01-29.
 */
Ext.define('Terp.view.bb.bb22a2901.Bb22a2901Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.bb22a2901',

    control: {
        'tsoftsearchform[reference=bb22a2901_searchform]': {
            boxready: 'onBoxReady_bb22a2901_searchform'
        },
        'tsoftgrid[reference = bb22a2901_grid1]': {
            selectionchange: 'onSelectionchanage_bb22a2901_grid1'
        },

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
        me.bb22a2901_headbutton = me.lookupReference('bb22a2901_headbutton');
        me.bb22a2901_searchform = me.lookupReference('bb22a2901_searchform');


        me.bb22a2901_grid1 = me.lookupReference('bb22a2901_grid1');
        me.bb22a2901_grid1_store =  me.getViewModel().getStore('bb22a2901_grid1_store') ;


        me.bb22a2901_attachfileinnergrid = me.lookupReference('bb22a2901_attachfileinnergrid');
        me.bb22a2901_attachfileinnergrid_store =  me.getViewModel().getStore('attachfileinnergrid_store') ;

        me.btnAttachFiles = me.lookupReference('bb22a2901_functionform_btnAttachFiles');
        me.onInitValue();
    },
    
    onInitValue : function(){
        var me = this;
        //form helpform에는 콤보를 바인딩 해주어야함
        me.commonFn.setCommonCode(me.lookupReference('bb22a2901_fg_sy220') ,'SY220');
    },
    
    onBoxReady_bb22a2901_searchform : function(){
        var me = this;
        me.onSelect();
    },

    onSelect : function(){
        var me = this;
        if (me.commonFn.getUserInfo('cd_p') == ''){
            var fgFile = '0'
        }else{
            var fgFile = '2'
        }

        var jsonData = {
            'actiondata': 'm',
            'loginIduser': me.commonFn.getUserInfo('id_user'),
            'loginCdc': me.commonFn.getUserInfo('cd_c'),
            'fg_file':  fgFile,
            'fg_sy220' : me.bb22a2901_searchform.down('[name=fg_sy220]').getValue(),
            'p_search': me.bb22a2901_searchform.down('[name=p_search]').getValue()
        };
        var sendDataJson = [];
        sendDataJson.push(jsonData);
        var sendDataJsonEncode = Ext.encode(sendDataJson);
    
        me.bb22a2901_grid1_store.load({
            params :{
                sendData : sendDataJsonEncode
            },
            callback : function(records, operation , success){
                var me = this;
                if (success == true) {
                    Ext.getBody().unmask();
                    if ( records.length > 0 ){
                        me.bb22a2901_grid1.getSelectionModel().select(0);
                    }
                    me.onEditControlMode('select');
                } else {
                    Ext.getBody().unmask();
                    var errorMsg = this.getViewModel().getStore('bb22a2901_grid1_store').getProxy().getReader().rawData.msg;
                    me.commonFn.errorHandling(errorMsg);
                }        
            },
            scope : me
        });
    
    },


    onSelectionchanage_bb22a2901_grid1 : function(obj, selected, eOpts){
        var me = this ;
        if (Ext.isEmpty(selected)){

        }else{
            // me.setAttachFilesButton(selected[0].data.id_row);
            me.bb22a2901_attachfileinnergrid.getController().refresh('0902',selected[0].data.id_row);
        }

        // if (selected.length == 0 || selected == undefined ){
        //     return;
        // }
        //
        // var jsonData = {
        //     'actiondata': 'file',
        //     'loginIduser': me.commonFn.getUserInfo('id_user'),
        //     'loginCdc': me.commonFn.getUserInfo('cd_c'),
        //     'id_row': selected[0].data.id_row
        // };
        //
        // var sendDataJson = [];
        // sendDataJson.push(jsonData);
        // var sendDataJsonEncode = Ext.encode(sendDataJson);
        //
        //
        // me.bb22a2901_grid2_store.load({
        //     params :{
        //         sendData : sendDataJsonEncode
        //     },
        //     callback : me.onSelectCallback_grid2,
        //     scope : me
        // });
    },

    setAttachFilesButton: function(idRow) {
        var me = this;
        var buttonParams = {
            id_row_src: idRow,
            fg_sy210: '0902' ,
            fg_sy210_ll: '',
            enableModify: true,
            windowTitle: '자료실 첨부파일'
        };
        me.btnAttachFiles.setButtonParams(buttonParams);
    },
    
    onModify : function(){
        var me = this;
        me.onEditControlMode('modify');
    },
    
    onInsert : function(){
        var me = this;

        var insertData ={
            cd_c: me.commonFn.getUserInfo().cd_c,
            fg_sy220:'' ,
            fg_file : '0',
            no_ac : me.commonFn.sqlNodocu('AC', me.commonFn.getUserInfo('cd_c'),me.commonFn.getTodayInfo()) ,
            id_row :me.commonFn.sqlRowId() ,
            dc_title :'',
            cd_e : me.commonFn.getUserInfo('cd_e') ,
            nm_e : me.commonFn.getUserInfo('nm_e')
        };
    
        me.bb22a2901_grid1.getPlugin('cellplugin').completeEdit();
    
    
        me.bb22a2901_grid1_store.insert(0, insertData);
        me.bb22a2901_grid1.getSelectionModel().select(0);
        me.bb22a2901_grid1.getPlugin('cellplugin').startEditByPosition({
            row: 0,
            column: 0
        });
        me.onEditControlMode('insert');
    
    },
    
    onSave : function(){
        var me = this;
        me.bb22a2901_grid1.getPlugin('cellplugin').completeEdit();
        
        
        var sendData = me.bb22a2901_grid1.makeSendData();
    
        me.commonFn.getTsoftAjaxRequest(sendData , '../ServerPage/bb/bb_archive.jsp' , true , function (ajaxResult) {
            if ( ajaxResult.success ){
                me.commonFn.toastMessage('저장 성공','t');
                me.onSelect();
            }
        });
    },

    onDelete : function(){
        var me = this;
        var gridSelection = me.bb22a2901_grid1.getSelectionModel().getLastSelected();
        var jsonData = {
            'actiondata': 'd',
            'loginIduser': me.commonFn.getUserInfo('id_user'),
            'loginCdc': me.commonFn.getUserInfo('cd_c'),
            'no_ac':  gridSelection.data.no_ac

        };

        var sendDataJson = [];
        sendDataJson.push(jsonData);
        var sendDataJsonEncode = Ext.encode(sendDataJson);
        me.commonFn.getTsoftAjaxRequest(sendDataJsonEncode , '../ServerPage/bb/bb_archive.jsp' , true , function (ajaxResult) {
            if ( ajaxResult.success ){
                me.commonFn.toastMessage('자료실 데이타 삭제성공','t');
                me.onSelect()
            }
        });
    },
    
    onEditControlMode : function(value){
        var me = this;
        if (value == 'select'){
            me.bb22a2901_grid1.setReadOnly(true);
            me.bb22a2901_headbutton.setActiveButton({modify :'Y' ,insert :'N' ,  delete:'N', save :'N' , print :'N' , select :'Y'});
            me.bb22a2901_grid1.setActiveButton({insert :'N' , modify :'N' , delete:'N', save :'N', copy :'N' , import :'N' , export :'Y'});
            me.bb22a2901_attachfileinnergrid.setActiveButton({insert :'N' , modify :'N' , delete:'N', save :'N', copy :'N' , import :'N' , export :'N'});
        }
        else if (value == 'modify') {
            me.bb22a2901_grid1.setReadOnly(false);
            me.bb22a2901_headbutton.setActiveButton({modify :'N' , insert :'Y' ,  delete:'Y', save :'Y' , print :'N' , select :'Y'});
            me.bb22a2901_grid1.setActiveButton({insert :'N' , modify :'N' , delete:'N', save :'N', copy :'N' , import :'N' , export :'Y'});
            me.bb22a2901_attachfileinnergrid.setActiveButton({insert :'Y' , modify :'N' , delete:'N', save :'N', copy :'N' , import :'N' , export :'N'});
        }
        else if (value == 'insert') {
            me.bb22a2901_grid1.setReadOnly(false);
            me.bb22a2901_headbutton.setActiveButton({modify :'N' , insert :'N' ,  delete:'N', save :'Y' , print :'N' , select :'Y'});
            me.bb22a2901_grid1.setActiveButton({insert :'N' , modify :'N' , delete:'N', save :'N', copy :'N' , import :'N' , export :'Y'});
            me.bb22a2901_attachfileinnergrid.setActiveButton({insert :'Y' , modify :'N' , delete:'Y', save :'Y', copy :'N' , import :'N' , export :'N'});
        }
    }
});