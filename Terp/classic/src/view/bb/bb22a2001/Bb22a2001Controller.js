/**
 * Created by jiscr on 2022-01-20.
 */
Ext.define('Terp.view.bb.bb22a2001.Bb22a2001Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.bb22a2001',

    requires: [
        'Terp.view.bb.bb22a2001.bb22a2001popup.Bb22a2001popup'
    ],

    control: {
        'tsoftsearchform[reference=bb22a2001_searchform]': {
            boxready: 'onBoxReady_bb22a2001_searchform'
        },
        'tsoftgrid[reference=bb22a2001_grid1]': {
            selectionchange: 'onSelectionchange_bb22a2001_grid1',
            rowdblclick: 'onRowdblclick_bb22a2001_grid1'
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
        me.bb22a2001_headbutton = me.lookupReference('bb22a2001_headbutton');
        me.bb22a2001_searchform = me.lookupReference('bb22a2001_searchform');

        
        me.bb22a2001_grid1 = me.lookupReference('bb22a2001_grid1');
        me.bb22a2001_grid1_store =  me.getViewModel().getStore('bb22a2001_grid1_store') ;

        me.btnAttachFiles = me.lookupReference('bb22a2001_functionform_btnAttachFiles');
    
        me.onInitValue();
    },
    
    onInitValue : function(){
        var me = this;
        //form helpform에는 콤보를 바인딩 해주어야함
        // me.commonFn.setCommonCode(me.lookupReference('bb22a2001_form1_fg_sm200') ,'SM200');
    },
    
    onBoxReady_bb22a2001_searchform : function(){
        var me = this;
        me.onSelect();
    },
    
    onSelect : function(){
        var me = this;

        var jsonData = {
            'actiondata': 'm',
            'loginIduser': me.commonFn.getUserInfo('id_user'),
            'loginCdc': me.commonFn.getUserInfo('cd_c'),
            'dt_fr':  me.bb22a2001_searchform.down('[name=bb22a2001_searchform_datedouble]').down('[name=dt_fr]').getValue(),
            'dt_to':  me.bb22a2001_searchform.down('[name=bb22a2001_searchform_datedouble]').down('[name=dt_to]').getValue(),
            'p_search' : me.bb22a2001_searchform.down('[name=p_search]').getValue()
        };
        var sendDataJson = [];
        sendDataJson.push(jsonData);
        var sendDataJsonEncode = Ext.encode(sendDataJson);
    
        me.bb22a2001_grid1_store.load({
            params :{
                sendData : sendDataJsonEncode
            },
            callback : function(records, operation , success){
                var me = this;
                if (success == true) {
                    Ext.getBody().unmask();
                    if ( records.length > 0 ){
                        me.bb22a2001_grid1.getSelectionModel().select(0);
                    }
                    me.onEditControlMode('select');
                } else {
                    Ext.getBody().unmask();
                    var errorMsg = this.getViewModel().getStore('bb22a2001_grid1_store').getProxy().getReader().rawData.msg;
                    me.commonFn.errorHandling(errorMsg);
                }        
            },
            scope : me
        });
    
    },

    setAttachFilesButton: function(idRow) {
        var me = this;
        var buttonParams = {
            id_row_src: idRow,
            fg_sy210: '0901' ,
            fg_sy210_ll: '',
            enableModify: true,
            windowTitle: '게시판 첨부파일'
        };
        me.btnAttachFiles.setButtonParams(buttonParams);
    },

    onSelectionchange_bb22a2001_grid1 : function (obj , selected , eOpt) {
        var me = this;
        if (Ext.isEmpty(selected[0])){
            return;
        }
        me.getViewModel().set('formData',selected[0].data.dc_cont_sch );
        me.setAttachFilesButton(selected[0].data.id_row);

    },

    onInsert : function(){
        var me = this;

        var paramjsonData = {
            'cd_ntc': me.commonFn.sqlNodocu('BB', me.commonFn.getUserInfo('cd_c'),me.commonFn.getTodayInfo()),
            'id_row' : me.commonFn.sqlRowId(),
            'fg_window':'new'
        };


        var pop = Ext.create('Terp.view.bb.bb22a2001.bb22a2001popup.Bb22a2001popup',{
            popupParamView : me.getView() ,
            popupParams : paramjsonData ,
            autoShow: true
        });

        pop.on('close', function() {
            me.onSelect();
        });

    },

    onModify : function(){
        var me = this;
        me.onEditControlMode('modify');
    },


    onRowdblclick_bb22a2001_grid1 : function(obj , record , tr , rowIndex , e , eOpts){
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
            me.onSelect();
        });

    },


    onEditControlMode : function(value){
        var me = this;
        if (value == 'select'){
            me.bb22a2001_grid1.setReadOnly(true);
            me.bb22a2001_headbutton.setActiveButton({modify :'N' ,insert :'Y' ,  delete:'N', save :'N' , print :'N' , select :'Y'});
            me.bb22a2001_grid1.setActiveButton({insert :'N' , modify :'N' , delete:'N', save :'N', copy :'' , import :'N' , export :'Y'});
        }
        if (value == 'modify'){
            me.bb22a2001_grid1.setReadOnly(true);
            me.bb22a2001_headbutton.setActiveButton({modify :'N' ,insert :'Y' ,  delete:'N', save :'N' , print :'N' , select :'Y'});
            me.bb22a2001_grid1.setActiveButton({insert :'N' , modify :'N' , delete:'N', save :'N', copy :'' , import :'N' , export :'Y'});
        }

    }


    
});