/**
 * Created by jiscraft on 2016-09-13.
 */
Ext.define('Terp.view.tsoft.common.gridTextarea.GridTextareaController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.gridtextarea',

    commonFn: '',
    gridtextarea_form1 :'',

    init: function() {
        commonFn = Terp.app.getController('TerpCommon');
        gridtextarea_form1 = this.lookupReference('gridtextarea_form1');
        this.onInitValue();
        gridtextarea_form1.down('[name=editTextarea]').readOnly = true ;
    },



    onInitValue : function(){
        //console.log(this.getView().popupParams.remark);
        gridtextarea_form1.down('[name=editTextarea]').setValue(this.getView().popupParams.remark) ;
    },


    onModify_gridtextarea : function(){
        gridtextarea_form1.setReadOnly(false) ;
    },


    onClose_gridtextarea : function(){
        var parentController = this.getView().popupParamView.getController();
        parentController[this.getView().popupParamCallback](gridtextarea_form1.down('[name=editTextarea]').getValue() );
    },

    onHelp_bbviewwin : function(){

    }
});